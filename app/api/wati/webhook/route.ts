// WhatsApp via WATI: receives "Message Received" webhooks and replies with AADHI TI's answers.
// Set this URL in WATI → Webhooks (event: Message Received):
//   https://<your-domain>/api/wati/webhook?token=<WATI_WEBHOOK_SECRET>
// WATI retries any non-200 response (up to 144 times), so we acknowledge at once, drop duplicates,
// and do the slow work (AI + sending) after the response.
import { after } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import type { ChatTurn } from "@/lib/ai";
import { detectLang } from "@/lib/detectLang";
import { understand, type Lang } from "@/lib/kb";
import { safetyRule } from "@/lib/safetyScripts";
import { answerQuestion } from "@/lib/server/answer";
import { bump, getJSON, setJSON, setOnce } from "@/lib/server/store";
import { sendInteractive, sendText, watiConfigured } from "@/lib/server/wati";
import { hasAbuse } from "@/lib/server/langGuard";
import {
  categoryMenu,
  helplinesMessage,
  languageMenu,
  mainMenu,
  menuAsText,
  menuHint,
  offeredOf,
  schemeMessage,
  schemesMenu,
  topicById,
  type Menu,
  type Offered,
} from "@/lib/server/waMenu";
import {
  aiMessage,
  calmMessage,
  scriptMessage,
  slowDownMessage,
  textOnlyMessage,
  topicMessage,
  unknownMessage,
  welcomeMessage,
} from "@/lib/server/whatsappText";

export const maxDuration = 60;

type WatiMessage = {
  id?: string;
  whatsappMessageId?: string;
  conversationId?: string;
  waId?: string;
  text?: string | null;
  type?: string;
  owner?: boolean;
  eventType?: string;
  listReply?: { title?: string } | null;
  buttonReply?: { text?: string } | null;
  interactiveButtonReply?: { title?: string } | null;
};

type UserState = {
  lang: Lang | null;
  history: ChatTurn[];
  offered?: Offered | null;
};

const DAY = 24 * 60 * 60;
const MAX_PER_HOUR = 30;

const ok = (status = "ok") => Response.json({ status });

function authorized(req: Request) {
  const secret = process.env.WATI_WEBHOOK_SECRET ?? "";
  const given =
    new URL(req.url).searchParams.get("token") ??
    req.headers.get("x-webhook-token") ??
    "";
  const a = Buffer.from(secret);
  const b = Buffer.from(given);
  return a.length > 0 && a.length === b.length && timingSafeEqual(a, b);
}

// Phone numbers are never stored as keys; only a salted hash.
const userKey = (waId: string) =>
  createHash("sha256")
    .update(`aadhi:${process.env.WATI_WEBHOOK_SECRET}:${waId}`)
    .digest("hex")
    .slice(0, 32);

const GREETING =
  /^(hi+|hel+o+|hey+|hlo|namaste|namaskar|start|menu|help|नमस्कार|नमस्ते|राम राम|जय महाराष्ट्र|मदत|मेनू)[\s!.,।]*(\s+[^\s]+){0,2}[\s!.,।]*$/i;

const LANG_WORDS: Record<string, Lang> = {
  english: "en",
  marathi: "mr",
  मराठी: "mr",
  hindi: "hi",
  हिंदी: "hi",
  हिन्दी: "hi",
};

export async function GET() {
  // Lets you check the route is deployed; reveals nothing else.
  return ok("AADHI TI WhatsApp webhook");
}

export async function POST(req: Request) {
  if (!process.env.WATI_WEBHOOK_SECRET || !watiConfigured())
    return Response.json(
      { error: "WhatsApp is not configured" },
      { status: 503 },
    );
  if (!authorized(req))
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  let msg: WatiMessage;
  try {
    msg = await req.json();
  } catch {
    return ok("ignored"); // malformed: acknowledge so WATI doesn't retry it
  }

  // Only messages from women writing in; never our own replies (owner: true).
  if (msg.eventType !== "message" || msg.owner === true || !msg.waId)
    return ok("ignored");

  const messageId = msg.whatsappMessageId || msg.id;
  if (!messageId) return ok("ignored");
  try {
    if (!(await setOnce(`wati:seen:${messageId}`, 2 * DAY)))
      return ok("duplicate");
  } catch (e) {
    console.error(
      "WATI dedupe store failed",
      e instanceof Error ? e.message : "",
    );
  }

  after(() =>
    handle(msg).catch((e) =>
      console.error("WATI handler failed", e instanceof Error ? e.message : ""),
    ),
  );
  return ok();
}

const MENU_WORDS =
  /^(menu|main menu|मेनू|मेन्यू|मुख्य मेनू|0|options?|topics?|विषय)[\s!.,।]*$/i;
const LANGUAGE_WORDS =
  /^(language|lang|bhasha|भाषा|change language|भाषा बदला|भाषा बदलें)[\s!.,।]*$/i;
const HELPLINE_WORDS =
  /^(helplines?|helpline numbers?|numbers?|हेल्पलाइन|हेल्पलाईन|नंबर|मदत क्रमांक|क्रमांक)[\s!.,।]*$/i;

const norm = (s: string) =>
  s.trim().toLowerCase().replace(/…$/, "").replace(/\s+/g, " ");

/** Matches a tap (row/button title) or a typed number against the menu we last sent. */
function chosen(
  text: string,
  offered: Offered | null | undefined,
): string | null {
  if (!offered) return null;
  const n = Number(text.trim());
  if (Number.isInteger(n) && n >= 1 && n <= offered.ids.length)
    return offered.ids[n - 1];
  const i = offered.titles.findIndex((t) => norm(t) === norm(text));
  return i >= 0 ? offered.ids[i] : null;
}

async function handle(msg: WatiMessage) {
  const waId = msg.waId!;
  const target = msg.conversationId || waId;
  const key = userKey(waId);
  const saved = await getJSON<UserState>(`wati:user:${key}`).catch(() => null);
  const state: UserState = {
    lang: saved?.lang ?? null,
    history: saved?.history ?? [],
    offered: saved?.offered ?? null,
  };
  const uiLang: Lang = state.lang ?? "mr";
  const save = (patch: Partial<UserState>) =>
    setJSON(`wati:user:${key}`, { ...state, ...patch }, DAY).catch(() => {});

  // Sends a menu as WhatsApp buttons/list, or numbered text if interactive messages fail; remembers what was offered.
  const offer = async (
    menu: Menu,
    lang: Lang,
    patch: Partial<UserState> = {},
  ) => {
    if (!(await sendInteractive(target, menu)))
      await sendText(target, menuAsText(menu, lang));
    await save({ ...patch, offered: offeredOf(menu) });
  };

  // Per-number limit protects the AI budget; tell her once, then stay quiet for the hour.
  const count = await bump(`wati:rate:${key}`, 60 * 60).catch(() => 0);
  if (count > MAX_PER_HOUR) {
    if (count === MAX_PER_HOUR + 1)
      await sendText(target, slowDownMessage(uiLang));
    return;
  }

  const raw =
    msg.type === "text"
      ? msg.text
      : msg.listReply?.title ||
        msg.buttonReply?.text ||
        msg.interactiveButtonReply?.title ||
        (msg.type === "interactive" || msg.type === "button" ? msg.text : null);
  const text = (raw ?? "").trim().slice(0, 800);
  if (!text) {
    await sendText(target, textOnlyMessage(uiLang));
    return;
  }

  // 1. Danger first, always: approved scripts, never AI, before any menu logic.
  const rule = safetyRule(text);
  if (rule) {
    const lang = state.lang ?? detectLang(text, uiLang);
    const reply = scriptMessage(rule, lang);
    await sendText(target, reply);
    await save({
      lang,
      offered: null,
      history: remember(state.history, text, reply),
    });
    return;
  }

  // 2. A tap or number from the menu we just sent.
  const pickId = chosen(text, state.offered);
  if (pickId) {
    await handleChoice(pickId);
    return;
  }

  // 3. Commands, in any of the three languages.
  const switchTo = LANG_WORDS[norm(text)];
  if (switchTo) return handleChoice(`lang:${switchTo}`);
  if (LANGUAGE_WORDS.test(text)) return offer(languageMenu(), uiLang);
  if (MENU_WORDS.test(text)) return offer(mainMenu(uiLang), uiLang);
  if (HELPLINE_WORDS.test(text)) {
    await sendText(target, helplinesMessage(uiLang));
    return;
  }

  // 4. Greetings: new women choose a language first; others get the welcome and the menu.
  const local = understand(text, null);
  if (local.kind === "greeting" || GREETING.test(text)) {
    if (!state.lang) return offer(languageMenu(), uiLang);
    await sendText(target, welcomeMessage(state.lang));
    return offer(mainMenu(state.lang), state.lang);
  }

  // 5. Her own question: AI grounded in reviewed content, with memory; reviewed answer if AI fails.
  const lang = detectLang(text, uiLang);
  let reply: string;
  let summary: string;
  const ai = await answerQuestion({
    message: text,
    uiLang: lang,
    age: null,
    history: state.history,
  });
  if (ai) {
    reply = aiMessage(ai);
    summary = [ai.understand, ...ai.answer, ai.nextStep].join(" ");
  } else if (local.kind === "topic") {
    reply = topicMessage(local.topic, lang);
    summary = local.topic.understand[lang];
  } else {
    reply = hasAbuse(text) ? calmMessage(lang) : unknownMessage(lang);
    summary = "Asked her to say more";
  }
  await sendText(target, `${reply}\n\n${menuHint(lang)}`);

  const firstTime = !state.lang;
  await save({
    lang,
    offered: null,
    history: remember(state.history, text, summary),
  });
  // First message was a real question: answer it, then offer the language choice once.
  if (firstTime)
    await offer(languageMenu(), lang, {
      lang,
      history: remember(state.history, text, summary),
    });

  async function handleChoice(id: string) {
    const lang = id.startsWith("lang:") ? (id.slice(5) as Lang) : uiLang;
    if (id.startsWith("lang:")) {
      await sendText(target, welcomeMessage(lang));
      return offer(mainMenu(lang), lang, { lang });
    }
    if (id === "language") return offer(languageMenu(), lang);
    if (id === "helplines") {
      await sendText(target, `${helplinesMessage(lang)}\n\n${menuHint(lang)}`);
      return save({ offered: null });
    }
    if (id === "schemes") return offer(schemesMenu(lang), lang);
    if (id.startsWith("cat:")) {
      const menu = categoryMenu(id.slice(4), lang);
      return menu ? offer(menu, lang) : offer(mainMenu(lang), lang);
    }
    if (id.startsWith("topic:")) {
      const topic = topicById(id.slice(6));
      if (topic) {
        await sendText(
          target,
          `${topicMessage(topic, lang)}\n\n${menuHint(lang)}`,
        );
        return save({
          offered: null,
          history: remember(
            state.history,
            topic.title[lang],
            topic.understand[lang],
          ),
        });
      }
    }
    if (id.startsWith("scheme:")) {
      const msgText = schemeMessage(id.slice(7), lang);
      if (msgText) {
        await sendText(target, `${msgText}\n\n${menuHint(lang)}`);
        return save({ offered: null });
      }
    }
    return offer(mainMenu(lang), lang);
  }
}

function remember(
  history: ChatTurn[],
  user: string,
  assistant: string,
): ChatTurn[] {
  return [
    ...history,
    { role: "user" as const, text: user },
    { role: "assistant" as const, text: assistant.slice(0, 600) },
  ].slice(-6);
}
