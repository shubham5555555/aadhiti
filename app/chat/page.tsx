"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  ChevronLeft,
  Info,
  LayoutGrid,
  Lock,
  UtensilsCrossed,
  Mic,
  MicOff,
  PhoneCall,
  RotateCcw,
  Send,
  Volume2,
  Sparkles,
  UserRound,
} from "lucide-react";
import {
  categoriesFor,
  categoryGroups,
  describeExamples,
  getTopic,
  understand,
  type AgeGroup,
  type Category,
  type L,
  type Topic,
} from "@/lib/kb";
import { LANGS, useLang } from "@/lib/i18n";
import { ageLabels, chat, intentLabels, limits } from "@/lib/ui";
import { helplines } from "@/lib/data";
import CategoryIcon from "@/components/CategoryIcon";
import SOSButton from "@/components/SOSButton";
import type { AiAnswer, ChatTurn } from "@/lib/ai";
import { SAFETY_SCRIPTS, safetyRule } from "@/lib/safetyScripts";
import { detectLang } from "@/lib/detectLang";
import Onboarding from "@/components/Onboarding";
import {
  TALUKAS,
  profileContext,
  useProfile,
  type Profile,
} from "@/lib/profile";
import type { Lang } from "@/lib/kb/types";

type Msg =
  | { id: number; from: "user"; text: L | string }
  | { id: number; from: "bot"; kind: "menu" }
  | { id: number; from: "bot"; kind: "category"; catId: string }
  | {
      id: number;
      from: "bot";
      kind: "topic";
      topicId: string;
      related: string[];
    }
  | { id: number; from: "bot"; kind: "describe" }
  | { id: number; from: "bot"; kind: "unknown" }
  | { id: number; from: "bot"; kind: "ai"; data: AiAnswer; related: string[] }
  | { id: number; from: "bot"; kind: "script"; scriptId: string; lang: Lang };

type DistOmit<T> = T extends unknown ? Omit<T, "id" | "from"> : never;
type BotPayload = DistOmit<Extract<Msg, { from: "bot" }>>;

export default function ChatPage() {
  return (
    <Suspense>
      <Chat />
    </Suspense>
  );
}

function Chat() {
  const { t, lang, age } = useLang();
  const router = useRouter();
  const params = useSearchParams();
  // Basic information first (age, taluka, home, how she wants answers). A message about danger never waits for it.
  const { profile, save: saveProfile, ready } = useProfile();
  const [editingProfile, setEditingProfile] = useState(false);
  const [bypass, setBypass] = useState(false);
  const pendingQ = useRef<string | null>(null);
  const deepLinked = useRef(false);
  const profileRef = useRef<Profile>(profile);
  profileRef.current = profile;
  const gated = ready && !bypass && (!profile.onboarded || editingProfile);
  // The answer to read aloud when she chose voice answers.
  const [autoSpeakId, setAutoSpeakId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  // Latest values for async callbacks.
  const langRef = useRef(lang);
  const ageRef = useRef(age);
  const typingRef = useRef(false);
  const messagesRef = useRef<Msg[]>([]);
  langRef.current = lang;
  ageRef.current = age;
  messagesRef.current = messages;

  const bot = useCallback(
    (p: BotPayload): Msg =>
      ({ id: nextId.current++, from: "bot", ...p }) as Msg,
    [],
  );
  const user = useCallback(
    (text: L | string): Msg => ({ id: nextId.current++, from: "user", text }),
    [],
  );

  // Initial conversation — optionally deep-linked with ?q=, ?topic= or ?cat=.
  useEffect(() => {
    const start: Msg[] = [bot({ kind: "menu" })];
    const q = params.get("q")?.trim();
    const topic = getTopic(params.get("topic") ?? "");
    const catId = params.get("cat");
    deepLinked.current = !!(q || params.get("topic") || params.get("cat"));
    if (q) {
      if (safetyRule(q)) {
        // Danger: answer straight away, the basic questions can wait.
        setBypass(true);
        window.setTimeout(() => askRef.current(q), 0);
      } else pendingQ.current = q; // asked once the basic information is in
    } else if (topic)
      start.push(
        user(topic.title),
        bot({ kind: "topic", topicId: topic.id, related: [] }),
      );
    else if (catId) {
      const cat = [...categoriesFor(null), ...categoriesFor("girl")].find(
        (c) => c.id === catId,
      );
      if (cat)
        start.push(
          user(cat.title),
          bot(
            cat.id === "unsure"
              ? { kind: "describe" }
              : { kind: "category", catId },
          ),
        );
    }
    setMessages(start);
    // Only on first load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A question from the home page is asked as soon as onboarding is done (or right away if it already was).
  useEffect(() => {
    if (!ready || gated || !pendingQ.current) return;
    const q = pendingQ.current;
    pendingQ.current = null;
    window.setTimeout(() => askRef.current(q), 0);
  }, [ready, gated]);

  // "Remember my conversations": restore the last chat on this phone, and keep it saved.
  const restored = useRef(false);
  useEffect(() => {
    if (!ready || restored.current) return;
    restored.current = true;
    if (!profile.remember || deepLinked.current) return;
    try {
      const saved = JSON.parse(localStorage.getItem("aadhi-chat") ?? "null") as
        Msg[] | null;
      if (Array.isArray(saved) && saved.length > 1) {
        nextId.current = Math.max(...saved.map((m) => m.id)) + 1;
        setMessages(saved);
      }
    } catch {}
  }, [ready, profile.remember]);
  useEffect(() => {
    if (!ready) return;
    try {
      if (profile.remember)
        localStorage.setItem("aadhi-chat", JSON.stringify(messages.slice(-40)));
      else localStorage.removeItem("aadhi-chat");
    } catch {}
  }, [messages, ready, profile.remember]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    // Wait a tick for layout, then show the latest question at the top so its answer reads from the start.
    const timer = window.setTimeout(() => {
      const questions = el.querySelectorAll<HTMLElement>("[data-user-msg]");
      const last = questions[questions.length - 1];
      const top = typing || !last ? el.scrollHeight : last.offsetTop - 12;
      el.scrollTo({ top, behavior: "smooth" });
    }, 60);
    return () => window.clearTimeout(timer);
  }, [messages, typing]);

  const respond = (userText: L | string, reply: BotPayload) => {
    if (typing) return;
    setMessages((m) => [...m, user(userText)]);
    setTyping(true);
    setTimeout(
      () => {
        const msg = bot(reply);
        setMessages((m) => [...m, msg]);
        if (reply.kind === "script" && profileRef.current.answerMode !== "text")
          setAutoSpeakId(msg.id);
        setTyping(false);
      },
      650 + Math.random() * 400,
    );
  };

  const openCategory = (cat: Category) =>
    respond(
      cat.title,
      cat.id === "unsure"
        ? { kind: "describe" }
        : { kind: "category", catId: cat.id },
    );

  const openTopic = (topic: Topic, userText?: L) =>
    respond(userText ?? topic.title, {
      kind: "topic",
      topicId: topic.id,
      related: [],
    });

  // The written knowledge base's best guess — used as the offline/failure fallback.
  const localReply = (text: string): BotPayload => {
    const u = understand(text, ageRef.current);
    if (u.kind === "topic")
      return {
        kind: "topic",
        topicId: u.topic.id,
        related: u.alternatives.map((a) => a.id),
      };
    return u.kind === "greeting" ? { kind: "menu" } : { kind: "unknown" };
  };

  // Free-text questions go to Gemini (grounded in the knowledge base); menu taps stay on the written answers.
  // Conversation memory for the AI: what she asked and the gist of each answer.
  const historyFor = (msgs: Msg[]): ChatTurn[] =>
    msgs
      .map((m): ChatTurn | null => {
        if (m.from === "user")
          return {
            role: "user",
            text: typeof m.text === "string" ? m.text : m.text[langRef.current],
          };
        if (m.kind === "ai")
          return {
            role: "assistant",
            text: [m.data.understand, ...m.data.answer, m.data.nextStep].join(
              " ",
            ),
          };
        if (m.kind === "topic") {
          const tp = getTopic(m.topicId);
          return tp
            ? {
                role: "assistant",
                text: [
                  tp.understand[langRef.current],
                  tp.next[langRef.current],
                ].join(" "),
              }
            : null;
        }
        if (m.kind === "script") {
          const sc = SAFETY_SCRIPTS[m.scriptId]?.text[m.lang];
          return sc
            ? { role: "assistant", text: [sc.ack, sc.n].join(" ") }
            : null;
        }
        return null;
      })
      .filter((x): x is ChatTurn => !!x)
      .slice(-6);

  // 1. Fixed safety rules (approved scripts, never AI). 2. AI grounded in reviewed content. 3. Reviewed answer if AI fails.
  const ask = async (raw: string) => {
    const text = raw.trim();
    if (!text || typingRef.current) return;
    setInput("");
    const local = localReply(text);
    if (local.kind === "menu") return respond(text, local);

    const rule = safetyRule(text);
    if (rule)
      return respond(text, {
        kind: "script",
        scriptId: rule,
        lang: detectLang(text, langRef.current),
      });

    const history = historyFor(messagesRef.current);
    setMessages((m) => [...m, user(text)]);
    setTyping(true);
    typingRef.current = true;
    let reply: BotPayload = local;
    try {
      const ctrl = new AbortController();
      const timer = window.setTimeout(() => ctrl.abort(), 20_000);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          lang: langRef.current,
          age: ageRef.current,
          history,
          profile: profileContext(profileRef.current),
        }),
        signal: ctrl.signal,
      });
      window.clearTimeout(timer);
      if (res.ok) {
        const data = (await res.json()) as AiAnswer;
        const related =
          local.kind === "topic"
            ? [local.topicId, ...local.related]
                .filter((id) => id !== data.topicId)
                .slice(0, 3)
            : [];
        reply = { kind: "ai", data, related };
      }
    } catch {
      // Network error or timeout: keep the reviewed answer.
    }
    const msg = bot(reply);
    setMessages((m) => [...m, msg]);
    if (reply.kind === "ai" && profileRef.current.answerMode !== "text")
      setAutoSpeakId(msg.id);
    setTyping(false);
    typingRef.current = false;
  };
  const askRef = useRef(ask);
  askRef.current = ask;

  const showMenu = () => respond(chat.menu, { kind: "menu" });

  const restart = () => {
    nextId.current = 0;
    setMessages([bot({ kind: "menu" })]);
  };

  return (
    <div className="grid gap-8 sm:py-6 lg:grid-cols-[1fr_280px]">
      <section className="-mx-4 flex h-[calc(100dvh-10rem)] min-h-[520px] flex-col bg-sand-100 sm:mx-0 sm:h-[calc(100dvh-12rem)] sm:border sm:border-ink/15 lg:h-[calc(100dvh-9.5rem)]">
        {/* Slim toolbar — the site header above already carries the logo and name. */}
        <div className="flex items-center justify-between border-b border-ink/15 bg-sand-50 px-4 py-1.5 sm:px-5">
          <p className="flex items-center gap-2 text-sm text-ink-soft">
            <span
              className={`h-2 w-2 rounded-full ${typing ? "bg-turmeric-500" : "bg-leaf-500"}`}
            />
            {typing ? t(chat.typing) : t(chat.online)}
          </p>
          <div className="flex items-center gap-0.5">
            {profile.onboarded && !gated && (
              <button
                onClick={() => setEditingProfile(true)}
                title={t({
                  mr: "माझी माहिती बदला",
                  en: "Edit my details",
                  hi: "मेरी जानकारी बदलें",
                })}
                className="mr-1 hidden max-w-[16rem] items-center gap-1.5 truncate border border-ink/15 px-2.5 py-1 text-[13px] font-semibold text-ink hover:border-ink sm:inline-flex"
              >
                <UserRound size={14} className="shrink-0 text-kokum-600" />
                <span className="truncate">
                  {[
                    profile.name,
                    age ? t(ageLabels[age]) : null,
                    t(
                      TALUKAS.find((x) => x.id === profile.taluka)?.name ??
                        TALUKAS[0].name,
                    ),
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </button>
            )}
            {profile.onboarded && !gated && (
              <span className="sm:hidden">
                <IconBtn
                  title={t({
                    mr: "माझी माहिती",
                    en: "My details",
                    hi: "मेरी जानकारी",
                  })}
                  onClick={() => setEditingProfile(true)}
                >
                  <UserRound size={18} />
                </IconBtn>
              </span>
            )}
            <IconBtn title={t(chat.menu)} onClick={showMenu}>
              <LayoutGrid size={18} />
            </IconBtn>
            <IconBtn title="Call" onClick={() => router.push("/call")}>
              <PhoneCall size={18} />
            </IconBtn>
            <IconBtn title={t(chat.restart)} onClick={restart}>
              <RotateCcw size={18} />
            </IconBtn>
            <div className="ml-1.5 sm:hidden">
              <SOSButton compact />
            </div>
          </div>
        </div>

        {!ready ? (
          <div className="flex-1" />
        ) : gated ? (
          <div className="scrollbar-thin flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <Onboarding
              initial={{ ...profile, age: profile.age ?? age }}
              editing={profile.onboarded}
              onDone={(p) => {
                saveProfile(p);
                setEditingProfile(false);
              }}
            />
          </div>
        ) : (
          <div
            ref={listRef}
            className="scrollbar-thin relative flex-1 space-y-6 overflow-y-auto px-4 py-6 sm:px-6"
          >
            {messages.map((m) =>
              m.from === "user" ? (
                <div
                  key={m.id}
                  data-user-msg
                  className="flex animate-fade-up justify-end"
                >
                  <p className="max-w-[85%] rounded-md bg-ink px-4 py-2.5 text-[15.5px] leading-relaxed text-white">
                    {typeof m.text === "string" ? m.text : t(m.text)}
                  </p>
                </div>
              ) : (
                <BotRow key={m.id}>
                  {m.kind === "menu" && (
                    <MenuMessage
                      onCategory={openCategory}
                      name={profile.name}
                    />
                  )}
                  {m.kind === "category" && (
                    <CategoryMessage
                      catId={m.catId}
                      onTopic={openTopic}
                      onMenu={showMenu}
                    />
                  )}
                  {m.kind === "topic" && (
                    <TopicCard
                      topicId={m.topicId}
                      related={m.related}
                      onTopic={openTopic}
                      onMenu={showMenu}
                    />
                  )}
                  {m.kind === "describe" && (
                    <DescribeMessage
                      onExample={(ex) => {
                        const topic = getTopic(ex.topic);
                        if (topic) openTopic(topic, ex.text);
                      }}
                    />
                  )}
                  {m.kind === "unknown" && (
                    <UnknownMessage onCategory={openCategory} />
                  )}
                  {m.kind === "ai" && (
                    <AiCard
                      data={m.data}
                      related={m.related}
                      onTopic={openTopic}
                      onMenu={showMenu}
                      onAsk={ask}
                      autoSpeak={autoSpeakId === m.id}
                    />
                  )}
                  {m.kind === "script" && (
                    <ScriptCard
                      scriptId={m.scriptId}
                      lang={m.lang}
                      onMenu={showMenu}
                      onAsk={ask}
                      autoSpeak={autoSpeakId === m.id}
                    />
                  )}
                </BotRow>
              ),
            )}

            {typing && (
              <BotRow>
                <div className="flex w-fit gap-1.5 rounded-md border border-ink/10 bg-white px-4 py-3.5">
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-soft"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              </BotRow>
            )}
          </div>
        )}

        {!gated && ready && (
          <Composer
            input={input}
            setInput={setInput}
            onSend={ask}
            disabled={typing}
            langSpeech={LANGS.find((l) => l.id === lang)!.speech}
          />
        )}
      </section>

      <aside className="hidden space-y-8 lg:block">
        <div className="border-2 border-red-600 bg-white p-5">
          <p className="flex items-center gap-2 font-display text-lg font-bold text-red-700">
            <AlertTriangle size={18} /> {t(chat.emergencyTitle)}
          </p>
          <p className="mt-1 text-sm text-ink-soft">{t(chat.emergencyBody)}</p>
          <a
            href="tel:112"
            className="mt-4 flex items-center justify-between bg-red-600 px-4 py-2.5 font-bold text-white hover:bg-red-700"
          >
            {t(chat.call112)}{" "}
            <span className="font-serif text-2xl font-normal">112</span>
          </a>
        </div>

        <ul className="border-t border-ink/15">
          {helplines.slice(1).map((h) => (
            <li key={h.number} className="border-b border-ink/15">
              <a
                href={`tel:${h.number}`}
                className="flex items-baseline justify-between gap-2 py-2.5 text-sm hover:text-kokum-600"
              >
                <span className="text-ink">{t(h.name)}</span>
                <span className="font-serif text-lg text-kokum-600 tabular-nums">
                  {h.number}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="flex gap-2 text-sm leading-relaxed text-ink-soft">
          <Lock size={15} className="mt-0.5 shrink-0 text-sea-600" />{" "}
          {t(chat.privacy)}
        </p>
      </aside>
    </div>
  );
}

// ---------- message types ----------

function BotRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-fade-up">
      <p className="mb-1.5 text-[11px] font-bold tracking-[0.12em] text-sea-700">
        AADHI TI
      </p>
      <div className="max-w-full sm:max-w-[88%]">{children}</div>
    </div>
  );
}

const panel = "border border-ink/15 bg-white";
const textLink =
  "inline-flex items-center gap-1.5 font-bold text-kokum-600 underline decoration-kokum-200 underline-offset-4 hover:decoration-kokum-500";

function MenuMessage({
  onCategory,
  name,
}: {
  onCategory: (c: Category) => void;
  name?: string;
}) {
  const { t, age, setAge } = useLang();
  const cats = categoriesFor(age);
  return (
    <div className="space-y-4">
      <Bubble>
        {name
          ? t(chat.greeting).replace(/^([^!]+)!/, `$1 ${name}!`)
          : t(chat.greeting)}
      </Bubble>

      <div className={`${panel} p-4`}>
        <p className="text-sm font-semibold text-ink-soft">
          {t(chat.whoAreYou)}
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {(Object.keys(ageLabels) as AgeGroup[]).map((a) => (
            <button
              key={a}
              onClick={() => setAge(a)}
              aria-pressed={age === a}
              className={`border px-3 py-1.5 text-sm font-bold transition ${
                age === a
                  ? "border-ink bg-ink text-white"
                  : "border-ink/20 text-ink hover:border-ink"
              }`}
            >
              {t(ageLabels[a])}
            </button>
          ))}
        </div>
      </div>

      <div className={panel}>
        <p className="px-4 pt-4 font-serif text-xl">{t(chat.menuQuestion)}</p>
        <ol className="mt-2 grid sm:grid-cols-2">
          {cats.map((c, i) => (
            <li key={c.id} className="border-t border-ink/10 sm:odd:border-r">
              <button
                onClick={() => onCategory(c)}
                className="group flex w-full items-baseline gap-3 px-4 py-3 text-left hover:bg-sand-50"
              >
                <span className="w-5 shrink-0 font-serif text-lg text-kokum-500">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[15.5px] leading-tight font-bold text-ink group-hover:text-kokum-600">
                    {t(c.title)}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-ink-soft">
                    {t(c.subtitle)}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>
        <Link
          href="/everyday"
          className="flex items-center justify-between border-t border-ink/10 px-4 py-3 text-sm font-bold text-turmeric-600 hover:bg-turmeric-50"
        >
          <span className="flex items-center gap-2">
            <UtensilsCrossed size={15} /> {t(chat.everydayStrip)}
          </span>
          <ArrowRight size={15} />
        </Link>
      </div>

      <p className="text-sm text-ink-soft">
        <b className="text-ink">{t(chat.askTitle)}.</b> {t(chat.askHint)}
      </p>
    </div>
  );
}

function CategoryMessage({
  catId,
  onTopic,
  onMenu,
}: {
  catId: string;
  onTopic: (t: Topic) => void;
  onMenu: () => void;
}) {
  const { t, age } = useLang();
  const cat = [
    ...categoriesFor(age),
    ...categoriesFor(age === "girl" ? null : "girl"),
  ].find((c) => c.id === catId);
  if (!cat) return null;
  const groups = categoryGroups(cat, age);
  return (
    <div>
      <div className={panel}>
        <p className="flex items-center gap-2.5 px-4 pt-4 font-serif text-xl">
          <CategoryIcon icon={cat.icon} size={19} className="text-sea-600" />
          {t(cat.title)}
        </p>
        <div className="mt-3 space-y-4 pb-2">
          {groups.map((g) => (
            <div key={g.title.en}>
              <p className="px-4 pb-1 text-xs font-bold text-ink-soft">
                {t(g.title)}
              </p>
              <ul>
                {g.topics.map((tp) => (
                  <li key={tp.id} className="border-t border-ink/10">
                    <button
                      onClick={() => onTopic(tp)}
                      className={`group flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-[15px] font-semibold hover:bg-sand-50 ${
                        tp.emergency ? "text-red-700" : "text-ink"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {tp.emergency && (
                          <AlertTriangle size={14} className="shrink-0" />
                        )}
                        {t(tp.title)}
                      </span>
                      <ArrowRight
                        size={15}
                        className="shrink-0 text-ink/25 group-hover:text-kokum-600"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <BackToMenu onMenu={onMenu} />
    </div>
  );
}

function TopicCard({
  topicId,
  related,
  onTopic,
  onMenu,
}: {
  topicId: string;
  related: string[];
  onTopic: (t: Topic) => void;
  onMenu: () => void;
}) {
  const { t, age, lang } = useLang();
  const topic = getTopic(topicId);
  if (!topic) return null;
  const relatedTopics = related.map(getTopic).filter((x): x is Topic => !!x);

  const readAloud = () => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const text = [
      t(topic.understand),
      ...topic.answer.map(t),
      t(topic.next),
    ].join(". ");
    const u = new SpeechSynthesisUtterance(text);
    u.lang = LANGS.find((l) => l.id === lang)!.speech;
    synth.speak(u);
  };

  return (
    <div className="space-y-3">
      {topic.emergency && (
        <div className="flex items-center justify-between gap-3 border-2 border-red-600 bg-red-50 px-4 py-3">
          <p className="flex items-center gap-2 text-[15px] font-bold text-red-700">
            <AlertTriangle size={18} className="shrink-0" />{" "}
            {t(chat.emergencyBody)}
          </p>
          <a
            href="tel:112"
            className="shrink-0 bg-red-600 px-4 py-2 font-serif text-xl text-white hover:bg-red-700"
          >
            112
          </a>
        </div>
      )}

      <article className={panel}>
        <header className="flex items-start justify-between gap-3 border-b border-ink/10 px-4 py-3.5 sm:px-5">
          <div>
            <p className="text-xs font-bold text-sea-700">
              {t(intentLabels[topic.intent])}
            </p>
            <h3 className="mt-0.5 font-serif text-[1.35rem] leading-snug font-normal">
              {t(topic.title)}
            </h3>
          </div>
          <button
            onClick={readAloud}
            title="Read aloud"
            aria-label="Read aloud"
            className="mt-1 shrink-0 p-1.5 text-ink-soft hover:text-kokum-600"
          >
            <Volume2 size={18} />
          </button>
        </header>

        <ol className="space-y-5 px-4 py-5 sm:px-5">
          <Step n={1} label={t(chat.understand)}>
            <p>{t(topic.understand)}</p>
          </Step>
          <Step n={2} label={t(chat.answer)}>
            <ul className="space-y-2">
              {topic.answer.map((a, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 bg-kokum-500" />
                  <span>{t(a)}</span>
                </li>
              ))}
            </ul>
            {age === "girl" && topic.girlNote && (
              <p className="mt-3 border-l-4 border-turmeric-400 bg-turmeric-50 px-3 py-2 text-[15px]">
                <b>{t(chat.forGirls)}:</b> {t(topic.girlNote)}
              </p>
            )}
          </Step>
          <Step n={3} label={t(chat.next)}>
            <p className="font-semibold">{t(topic.next)}</p>
            {topic.actions && topic.actions.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2.5">
                {topic.actions.map((a) => (
                  <ActionButton
                    key={a.href + a.label.en}
                    href={a.href}
                    label={t(a.label)}
                  />
                ))}
              </div>
            )}
          </Step>
        </ol>

        {topic.sensitive && (
          <p className="flex gap-2 border-t border-ink/10 px-4 py-3 text-[13px] leading-relaxed text-ink-soft sm:px-5">
            <Info size={14} className="mt-0.5 shrink-0" />{" "}
            {t(limits[topic.sensitive])}
          </p>
        )}
      </article>

      {relatedTopics.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
          {relatedTopics.map((r) => (
            <button
              key={r.id}
              onClick={() => onTopic(r)}
              className="font-semibold text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-kokum-500"
            >
              {t(r.title)}
            </button>
          ))}
        </div>
      )}
      <BackToMenu onMenu={onMenu} />
    </div>
  );
}

// ---------- AI and safety-script answers (the prototype's card: risk, safety check, contacts, follow-ups, source) ----------

const t3 = (lang: Lang, mr: string, hi: string, en: string) =>
  lang === "en" ? en : lang === "hi" ? hi : mr;
const helplineName = (n: number, t: (l: L) => string) => {
  const h = helplines.find((x) => Number(x.number) === n);
  return h ? t(h.name) : String(n);
};

function RiskRow({
  risk,
  intent,
  engine,
  lang,
}: {
  risk: string;
  intent: string;
  engine: "ai" | "reviewed" | "script";
  lang: Lang;
}) {
  const tone =
    risk === "P0" || risk === "P1"
      ? "border-red-600 text-red-700"
      : risk === "P2"
        ? "border-turmeric-500 text-turmeric-600"
        : "border-leaf-600 text-leaf-700";
  const engineLabel =
    engine === "script"
      ? t3(
          lang,
          "मंजूर सुरक्षा स्क्रिप्ट",
          "स्वीकृत सुरक्षा स्क्रिप्ट",
          "Approved safety script",
        )
      : engine === "reviewed"
        ? t3(
            lang,
            "तपासलेल्या उत्तरावर आधारित AI",
            "जाँचे हुए जवाब पर आधारित AI",
            "AI based on a reviewed answer",
          )
        : "AI";
  return (
    <p className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold tracking-wide">
      <span className={`border px-1.5 py-0.5 ${tone}`}>{risk}</span>
      <span className="border border-ink/20 px-1.5 py-0.5 text-ink-soft">
        {intent}
      </span>
      <span className="border border-ink/20 px-1.5 py-0.5 text-sea-700">
        {engineLabel}
      </span>
    </p>
  );
}

function SafetyCheck({ question, lang }: { question: string; lang: Lang }) {
  const [answer, setAnswer] = useState<"safe" | null>(null);
  return (
    <div className="border-l-4 border-kokum-500 bg-kokum-50 px-4 py-3">
      <p className="text-xs font-bold text-kokum-700">
        {t3(lang, "सुरक्षा प्रश्न", "सुरक्षा सवाल", "Safety check")}
      </p>
      <p className="mt-0.5 font-semibold text-ink">{question}</p>
      {answer === "safe" ? (
        <p className="mt-2 text-sm font-semibold text-leaf-700">
          {t3(
            lang,
            "छान. काही बदललं तर लगेच 112.",
            "अच्छा। कुछ बदले तो तुरंत 112।",
            "Good. If anything changes, call 112 straight away.",
          )}
        </p>
      ) : (
        <div className="mt-2.5 flex flex-wrap gap-2">
          <button
            onClick={() => setAnswer("safe")}
            className="border-2 border-leaf-600 bg-white px-3 py-1.5 text-sm font-bold text-leaf-700 hover:bg-leaf-50"
          >
            {t3(
              lang,
              "हो, मी सुरक्षित आहे",
              "हाँ, मैं सुरक्षित हूँ",
              "Yes, I'm safe",
            )}
          </button>
          <a
            href="tel:112"
            className="bg-red-600 px-3 py-1.5 text-sm font-bold text-white hover:bg-red-700"
          >
            {t3(
              lang,
              "नाही, मला मदत हवी — 112",
              "नहीं, मुझे मदद चाहिए — 112",
              "No, I need help — 112",
            )}
          </a>
        </div>
      )}
    </div>
  );
}

function Contacts({
  numbers,
  links,
  lang,
}: {
  numbers: number[];
  links: { href: string; label: string }[];
  lang: Lang;
}) {
  const { t } = useLang();
  if (numbers.length === 0 && links.length === 0) return null;
  return (
    <div>
      <p className="text-xs font-bold text-sea-700">
        {t3(lang, "संपर्क", "संपर्क", "Contact")}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {numbers.map((n) => (
          <a
            key={n}
            href={`tel:${n}`}
            className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-bold text-white ${n === 112 || n === 108 ? "bg-red-600 hover:bg-red-700" : "bg-ink hover:bg-kokum-600"}`}
          >
            <PhoneCall size={13} />{" "}
            <span className="font-serif text-base font-normal">{n}</span>
            <span className="font-semibold opacity-85">
              {helplineName(n, t)}
            </span>
          </a>
        ))}
        {links.map((l) =>
          l.href.startsWith("http") ? (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${textLink} text-sm`}
            >
              {l.label} <ArrowRight size={14} />
            </a>
          ) : (
            <Link key={l.href} href={l.href} className={`${textLink} text-sm`}>
              {l.label} <ArrowRight size={14} />
            </Link>
          ),
        )}
      </div>
    </div>
  );
}

function FollowUps({
  options,
  onAsk,
}: {
  options: string[];
  onAsk: (q: string) => void;
}) {
  if (options.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onAsk(o)}
          className="border border-ink/25 bg-white px-3 py-1.5 text-left text-sm font-semibold text-ink hover:border-ink"
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function ListenButton({
  text,
  lang,
  autoPlay,
}: {
  text: string;
  lang: Lang;
  autoPlay?: boolean;
}) {
  const [state, setState] = useState<"idle" | "loading" | "playing">("idle");
  const audio = useRef<HTMLAudioElement | null>(null);
  const play = async () => {
    if (state === "playing") {
      audio.current?.pause();
      window.speechSynthesis?.cancel();
      setState("idle");
      return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.slice(0, 500), lang }),
      });
      if (!res.ok) throw new Error("tts");
      const url = URL.createObjectURL(await res.blob());
      const a = audio.current ?? (audio.current = new Audio());
      a.src = url;
      a.onended = () => setState("idle");
      await a.play();
      setState("playing");
    } catch {
      // Fall back to the phone's own voice.
      const u = new SpeechSynthesisUtterance(text);
      u.lang = LANGS.find((l) => l.id === lang)!.speech;
      u.onend = () => setState("idle");
      window.speechSynthesis?.speak(u);
      setState("playing");
    }
  };
  // Voice answers: read the new answer aloud once, as soon as it appears.
  const played = useRef(false);
  useEffect(() => {
    if (autoPlay && !played.current) {
      played.current = true;
      play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay]);

  return (
    <button
      onClick={play}
      className="inline-flex items-center gap-1 font-semibold text-ink-soft hover:text-kokum-600"
    >
      <Volume2 size={14} />{" "}
      {state === "playing"
        ? t3(lang, "थांबवा", "रोकें", "Stop")
        : state === "loading"
          ? "…"
          : t3(lang, "ऐका", "सुनें", "Listen")}
    </button>
  );
}

const moduleLink: Record<
  string,
  { href: string; label: [string, string, string] }
> = {
  scheme: {
    href: "/schemes#scheme-finder",
    label: ["योजना शोधा", "योजना खोजें", "Find schemes"],
  },
  income: {
    href: "/schemes#income-finder",
    label: ["उत्पन्न शोधक", "कमाई खोजक", "Income Finder"],
  },
  health: {
    href: "/poshan",
    label: ["आरोग्य आणि पोषण", "सेहत और पोषण", "Health & nutrition"],
  },
  wellbeing: {
    href: "/chat?cat=mind",
    label: ["मनाचं आरोग्य", "मन की सेहत", "Wellbeing"],
  },
  safety: {
    href: "/#safety-plan",
    label: ["सुरक्षा योजना", "सुरक्षा योजना", "Safety plan"],
  },
};

function AiCard({
  data,
  related,
  onTopic,
  onMenu,
  onAsk,
  autoSpeak,
}: {
  data: AiAnswer;
  related: string[];
  onTopic: (t: Topic) => void;
  onMenu: () => void;
  onAsk: (q: string) => void;
  autoSpeak?: boolean;
}) {
  const { t } = useLang();
  const lang = data.lang;
  // Buttons and limits notices come from the matching written topic, never from the model.
  const topic = data.topicId ? getTopic(data.topicId) : undefined;
  const relatedTopics = related.map(getTopic).filter((x): x is Topic => !!x);
  const mod = moduleLink[data.module];
  const links = [
    ...(mod ? [{ href: mod.href, label: t3(lang, ...mod.label) }] : []),
    ...(topic?.actions ?? [])
      .filter((a) => !a.href.startsWith("tel:"))
      .map((a) => ({ href: a.href, label: t(a.label) })),
  ].filter((l, i, arr) => arr.findIndex((x) => x.href === l.href) === i);
  const urgent = data.risk === "P0" || data.risk === "P1";
  const spoken = [
    data.understand,
    data.safetyCheck,
    ...data.answer,
    data.nextStep,
  ]
    .filter(Boolean)
    .join(". ");

  return (
    <div className="space-y-3">
      {data.risk === "P0" && (
        <a
          href="tel:112"
          className="flex items-center justify-between gap-3 border-2 border-red-600 bg-red-50 px-4 py-3 font-bold text-red-700"
        >
          <span className="flex items-center gap-2">
            <AlertTriangle size={18} className="shrink-0" />{" "}
            {t(chat.emergencyBody)}
          </span>
          <span className="bg-red-600 px-4 py-2 font-serif text-xl font-normal text-white">
            112
          </span>
        </a>
      )}

      <article className={`${panel} ${urgent ? "border-red-300" : ""}`}>
        <div className="space-y-4 px-4 py-4 sm:px-5">
          <RiskRow
            risk={data.risk}
            intent={data.intent}
            engine={data.topicId ? "reviewed" : "ai"}
            lang={lang}
          />
          <p className="font-serif text-[1.2rem] leading-snug text-ink">
            {data.understand}
          </p>
          {data.safetyCheck && (
            <SafetyCheck question={data.safetyCheck} lang={lang} />
          )}
          <ul className="space-y-2 text-[15.5px] leading-relaxed text-ink">
            {data.answer.map((a, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 bg-kokum-500" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
          {data.nextStep && (
            <div>
              <p className="text-xs font-bold text-kokum-700">{t(chat.next)}</p>
              <p className="mt-0.5 font-semibold text-ink">{data.nextStep}</p>
            </div>
          )}
          <Contacts numbers={data.helplines} links={links} lang={lang} />
          <FollowUps options={data.options} onAsk={onAsk} />
        </div>
        {topic?.sensitive && (
          <p className="flex gap-2 border-t border-ink/10 px-4 py-3 text-[13px] leading-relaxed text-ink-soft sm:px-5">
            <Info size={14} className="mt-0.5 shrink-0" />{" "}
            {t(limits[topic.sensitive])}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-ink/10 px-4 py-2.5 text-[12.5px] text-ink-soft sm:px-5">
          <span>
            {t3(lang, "स्रोत", "स्रोत", "Source")}: {data.source} ·{" "}
            {data.topicId
              ? t3(
                  lang,
                  "तपासलेल्या उत्तरावर आधारित",
                  "जाँचे हुए जवाब पर आधारित",
                  "based on a reviewed answer",
                )
              : t3(
                  lang,
                  "AI उत्तर (अजून तपासलेलं नाही)",
                  "AI जवाब (अभी जाँचा नहीं गया)",
                  "AI answer (not reviewed yet)",
                )}
          </span>
          {data.verify && <span>· {data.verify}</span>}
          <span className="flex-1" />
          <ListenButton text={spoken} lang={lang} autoPlay={autoSpeak} />
        </div>
      </article>

      {relatedTopics.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
          {relatedTopics.map((r) => (
            <button
              key={r.id}
              onClick={() => onTopic(r)}
              className="font-semibold text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-kokum-500"
            >
              {t(r.title)}
            </button>
          ))}
        </div>
      )}
      <BackToMenu onMenu={onMenu} />
    </div>
  );
}

// Evidence guidance maps onto written topics in the knowledge base.
const evidenceTopic: Record<string, string> = {
  stalk: "document_abuse",
  dv: "document_abuse",
  cyber: "evidence_screenshot",
  medical: "after_assault",
};

function ScriptCard({
  scriptId,
  lang,
  onMenu,
  onAsk,
  autoSpeak,
}: {
  scriptId: string;
  lang: Lang;
  onMenu: () => void;
  onAsk: (q: string) => void;
  autoSpeak?: boolean;
}) {
  const { age } = useLang();
  const script = SAFETY_SCRIPTS[scriptId];
  if (!script) return null;
  const al: Lang = script.text[lang] ? lang : "mr";
  const text = script.text[al]!;
  const minor = age === "girl";
  // For girls 13–17: tell a trusted adult first, and always include Childline.
  const points = minor
    ? [
        t3(
          al,
          "आई, शाळेतल्या बाई किंवा अंगणवाडी ताई अशा विश्वासाच्या मोठ्या व्यक्तीला लगेच सांगा.",
          "अभी किसी भरोसेमंद बड़े को बताएँ, जैसे माँ, टीचर या आंगनवाड़ी दीदी।",
          "Tell an adult you trust right away, like your mother, a teacher or the Anganwadi tai.",
        ),
        ...text.a,
      ]
    : text.a;
  const numbers =
    minor && !script.hl.includes(1098) ? [...script.hl, 1098] : script.hl;
  const links = [
    ...(script.plan
      ? [
          {
            href: "/#safety-plan",
            label: t3(al, "सुरक्षा योजना", "सुरक्षा योजना", "Safety plan"),
          },
        ]
      : []),
    ...(script.evidence && evidenceTopic[script.evidence]
      ? [
          {
            href: `/chat?topic=${evidenceTopic[script.evidence]}`,
            label: t3(
              al,
              "पुरावा कसा जपायचा",
              "सबूत कैसे रखें",
              "How to keep evidence",
            ),
          },
        ]
      : []),
    ...(script.url
      ? [{ href: script.url, label: script.url.replace("https://", "") }]
      : []),
  ];
  const spoken = [text.ack, text.fu, ...points, text.n]
    .filter(Boolean)
    .join(". ");
  const p0 = script.risk === "P0";

  return (
    <div className="space-y-3">
      <article
        className={`border-2 bg-white ${p0 ? "border-red-600" : "border-red-300"}`}
      >
        <div className="space-y-4 px-4 py-4 sm:px-5">
          <RiskRow
            risk={script.risk}
            intent={script.intent}
            engine="script"
            lang={al}
          />
          <p
            className={`font-serif text-[1.25rem] leading-snug ${p0 ? "text-red-700" : "text-ink"}`}
          >
            {text.ack}
          </p>
          {text.fu && <SafetyCheck question={text.fu} lang={al} />}
          <ul className="space-y-2 text-[15.5px] leading-relaxed text-ink">
            {points.map((a, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 bg-red-600" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
          <div>
            <p className="text-xs font-bold text-kokum-700">
              {t3(al, "पुढचं पाऊल", "अगला कदम", "Next step")}
            </p>
            <p className="mt-0.5 font-semibold text-ink">{text.n}</p>
          </div>
          <Contacts numbers={numbers} links={links} lang={al} />
          <FollowUps options={text.o} onAsk={onAsk} />
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-ink/10 px-4 py-2.5 text-[12.5px] text-ink-soft sm:px-5">
          <span>
            {t3(
              al,
              "मंजूर सुरक्षा स्क्रिप्ट · तपासले 29-09-2026",
              "स्वीकृत सुरक्षा स्क्रिप्ट · जाँचा 29-09-2026",
              "Approved safety script · checked 29-09-2026",
            )}
          </span>
          <span className="flex-1" />
          <ListenButton text={spoken} lang={al} autoPlay={autoSpeak} />
        </div>
      </article>
      <BackToMenu onMenu={onMenu} />
    </div>
  );
}

function DescribeMessage({
  onExample,
}: {
  onExample: (ex: (typeof describeExamples)[number]) => void;
}) {
  const { t } = useLang();
  return (
    <div className={`${panel} p-4 sm:p-5`}>
      <p className="font-serif text-xl">{t(chat.describeTitle)}</p>
      <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">
        {t(chat.describeBody)}
      </p>
      <ul className="mt-4 border-t border-ink/10">
        {describeExamples.map((ex) => (
          <li key={ex.topic} className="border-b border-ink/10">
            <button
              onClick={() => onExample(ex)}
              className="block w-full py-2.5 text-left font-serif text-[16px] text-ink italic hover:text-kokum-600"
            >
              “{t(ex.text)}”
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UnknownMessage({ onCategory }: { onCategory: (c: Category) => void }) {
  const { t, age } = useLang();
  return (
    <div className="space-y-3">
      <Bubble>{t(chat.notSure)}</Bubble>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
        {categoriesFor(age).map((c) => (
          <button
            key={c.id}
            onClick={() => onCategory(c)}
            className="font-semibold text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-kokum-500"
          >
            {t(c.title)}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------- small pieces ----------

function Bubble({ children }: { children: React.ReactNode }) {
  return (
    <p className="w-fit rounded-md border border-ink/10 bg-white px-4 py-3 text-[15.5px] leading-relaxed text-ink">
      {children}
    </p>
  );
}

function Step({
  n,
  label,
  children,
}: {
  n: number;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="grid grid-cols-[1.75rem_1fr] gap-2">
      <span className="font-serif text-xl leading-6 text-sea-600">{n}.</span>
      <div>
        <p className="text-xs font-bold text-sea-700">{label}</p>
        <div className="mt-1 text-[15.5px] leading-relaxed text-ink">
          {children}
        </div>
      </div>
    </li>
  );
}

function ActionButton({ href, label }: { href: string; label: string }) {
  if (href.startsWith("tel:")) {
    const emergency = href === "tel:112" || href === "tel:108";
    return (
      <a
        href={href}
        className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white ${emergency ? "bg-red-600 hover:bg-red-700" : "bg-ink hover:bg-kokum-600"}`}
      >
        <PhoneCall size={14} /> {label}
      </a>
    );
  }
  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${textLink} text-sm`}
      >
        {label} <ArrowRight size={14} />
      </a>
    );
  }
  return (
    <Link href={href} className={`${textLink} text-sm`}>
      {label} <ArrowRight size={14} />
    </Link>
  );
}

function BackToMenu({ onMenu }: { onMenu: () => void }) {
  const { t } = useLang();
  return (
    <button
      onClick={onMenu}
      className="mt-2.5 inline-flex items-center gap-1 text-sm font-semibold text-ink-soft hover:text-kokum-600"
    >
      <ChevronLeft size={15} /> {t(chat.menu)}
    </button>
  );
}

function IconBtn({
  title,
  onClick,
  children,
}: {
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      className="p-2.5 text-ink-soft hover:text-kokum-600"
    >
      {children}
    </button>
  );
}

// Minimal typing for the Web Speech recognition API (not in TS DOM lib).
type Recognition = {
  lang: string;
  interimResults: boolean;
  onresult: (e: {
    results: ArrayLike<ArrayLike<{ transcript: string }>>;
  }) => void;
  onend: () => void;
  onerror: () => void;
  start: () => void;
  stop: () => void;
};

function Composer({
  input,
  setInput,
  onSend,
  disabled,
  langSpeech,
}: {
  input: string;
  setInput: (s: string) => void;
  onSend: (s: string) => void;
  disabled: boolean;
  langSpeech: string;
}) {
  const { t } = useLang();
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const rec = useRef<Recognition | null>(null);

  useEffect(() => {
    const w = window as unknown as {
      SpeechRecognition?: new () => Recognition;
      webkitSpeechRecognition?: new () => Recognition;
    };
    setSupported(!!(w.SpeechRecognition || w.webkitSpeechRecognition));
  }, []);

  const toggleVoice = () => {
    if (listening) {
      rec.current?.stop();
      return;
    }
    const w = window as unknown as {
      SpeechRecognition?: new () => Recognition;
      webkitSpeechRecognition?: new () => Recognition;
    };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) return;
    const r = new Ctor();
    r.lang = langSpeech;
    r.interimResults = true;
    r.onresult = (e) =>
      setInput(Array.from(e.results, (res) => res[0].transcript).join(""));
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    rec.current = r;
    r.start();
    setListening(true);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSend(input);
      }}
      className="flex items-stretch gap-2 border-t border-ink/15 bg-sand-50 p-2.5 sm:p-3"
    >
      <button
        type="button"
        onClick={toggleVoice}
        disabled={!supported}
        title={supported ? t(chat.askHint) : t(chat.voiceSoon)}
        className={`grid w-12 shrink-0 place-items-center border-2 transition disabled:opacity-40 ${listening ? "animate-pulse border-red-600 bg-red-600 text-white" : "border-ink bg-white text-ink hover:bg-sand-100"}`}
      >
        {listening ? <MicOff size={20} /> : <Mic size={20} />}
      </button>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t(chat.placeholder)}
        className="min-w-0 flex-1 border-2 border-ink bg-white px-3.5 py-3 text-[16px] outline-none placeholder:text-ink-soft/60 focus:border-kokum-600"
      />
      <button
        type="submit"
        disabled={!input.trim() || disabled}
        className="grid w-12 shrink-0 place-items-center bg-ink text-white transition hover:bg-kokum-600 disabled:opacity-40"
      >
        <Send size={20} />
      </button>
    </form>
  );
}
