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
import { sendText, watiConfigured } from "@/lib/server/wati";
import {
  aiMessage,
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

type UserState = { lang: Lang | null; history: ChatTurn[] };

const DAY = 24 * 60 * 60;
const MAX_PER_HOUR = 30;

const ok = (status = "ok") => Response.json({ status });

function authorized(req: Request) {
  const secret = process.env.WATI_WEBHOOK_SECRET ?? "";
  const given = new URL(req.url).searchParams.get("token") ?? req.headers.get("x-webhook-token") ?? "";
  const a = Buffer.from(secret);
  const b = Buffer.from(given);
  return a.length > 0 && a.length === b.length && timingSafeEqual(a, b);
}

// Phone numbers are never stored as keys; only a salted hash.
const userKey = (waId: string) => createHash("sha256").update(`aadhi:${process.env.WATI_WEBHOOK_SECRET}:${waId}`).digest("hex").slice(0, 32);

const GREETING = /^(hi+|hel+o+|hey+|hlo|namaste|namaskar|start|menu|help|नमस्कार|नमस्ते|राम राम|जय महाराष्ट्र|मदत|मेनू)[\s!.,।]*(\s+[^\s]+){0,2}[\s!.,।]*$/i;

const LANG_WORDS: Record<string, Lang> = {
  english: "en",
  marathi: "mr",
  "मराठी": "mr",
  hindi: "hi",
  "हिंदी": "hi",
  "हिन्दी": "hi",
};

export async function GET() {
  // Lets you check the route is deployed; reveals nothing else.
  return ok("AADHI TI WhatsApp webhook");
}

export async function POST(req: Request) {
  if (!process.env.WATI_WEBHOOK_SECRET || !watiConfigured()) return Response.json({ error: "WhatsApp is not configured" }, { status: 503 });
  if (!authorized(req)) return Response.json({ error: "Unauthorized" }, { status: 401 });

  let msg: WatiMessage;
  try {
    msg = await req.json();
  } catch {
    return ok("ignored"); // malformed: acknowledge so WATI doesn't retry it
  }

  // Only messages from women writing in; never our own replies (owner: true).
  if (msg.eventType !== "message" || msg.owner === true || !msg.waId) return ok("ignored");

  const messageId = msg.whatsappMessageId || msg.id;
  if (!messageId) return ok("ignored");
  try {
    if (!(await setOnce(`wati:seen:${messageId}`, 2 * DAY))) return ok("duplicate");
  } catch (e) {
    console.error("WATI dedupe store failed", e instanceof Error ? e.message : "");
  }

  after(() => handle(msg).catch((e) => console.error("WATI handler failed", e instanceof Error ? e.message : "")));
  return ok();
}

async function handle(msg: WatiMessage) {
  const waId = msg.waId!;
  const target = msg.conversationId || waId;
  const key = userKey(waId);
  const state: UserState = (await getJSON<UserState>(`wati:user:${key}`).catch(() => null)) ?? { lang: null, history: [] };
  const uiLang: Lang = state.lang ?? "mr";

  // Per-number limit protects the AI budget; tell her once, then stay quiet for the hour.
  const count = await bump(`wati:rate:${key}`, 60 * 60).catch(() => 0);
  if (count > MAX_PER_HOUR) {
    if (count === MAX_PER_HOUR + 1) await sendText(target, slowDownMessage(uiLang));
    return;
  }

  const raw =
    msg.type === "text"
      ? msg.text
      : msg.listReply?.title || msg.buttonReply?.text || msg.interactiveButtonReply?.title || (msg.type === "interactive" || msg.type === "button" ? msg.text : null);
  const text = (raw ?? "").trim().slice(0, 800);
  if (!text) {
    await sendText(target, textOnlyMessage(uiLang));
    return;
  }

  // "English" / "मराठी" / "Hindi" switches her language.
  const switchTo = LANG_WORDS[text.toLowerCase()];
  if (switchTo) {
    await sendText(target, welcomeMessage(switchTo));
    await setJSON(`wati:user:${key}`, { ...state, lang: switchTo }, DAY);
    return;
  }

  const lang = detectLang(text, uiLang);
  let reply: string;
  let summary: string;

  // 1. Fixed safety rules first — approved scripts, never AI.
  const rule = safetyRule(text);
  const local = understand(text, null);
  if (rule) {
    reply = scriptMessage(rule, lang);
    summary = reply.slice(0, 400);
  } else if (local.kind === "greeting" || GREETING.test(text)) {
    reply = welcomeMessage(lang);
    summary = "Welcome message";
  } else {
    // 2. AI grounded in reviewed content, with the last few turns as memory. 3. Written answer if AI fails.
    const ai = await answerQuestion({ message: text, uiLang: lang, age: null, history: state.history });
    if (ai) {
      reply = aiMessage(ai);
      summary = [ai.understand, ...ai.answer, ai.nextStep].join(" ");
    } else if (local.kind === "topic") {
      reply = topicMessage(local.topic, lang);
      summary = local.topic.understand[lang];
    } else {
      reply = unknownMessage(lang);
      summary = "Asked her to say more";
    }
  }

  await sendText(target, reply);

  const history: ChatTurn[] = [...state.history, { role: "user" as const, text }, { role: "assistant" as const, text: summary.slice(0, 600) }].slice(-6);
  await setJSON(`wati:user:${key}`, { lang, history }, DAY).catch(() => {});
}
