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
import Logo from "@/components/Logo";
import CategoryIcon from "@/components/CategoryIcon";
import SOSButton from "@/components/SOSButton";
import { WarliWelcome } from "@/components/WarliArt";

type Msg =
  | { id: number; from: "user"; text: L | string }
  | { id: number; from: "bot"; kind: "menu" }
  | { id: number; from: "bot"; kind: "category"; catId: string }
  | { id: number; from: "bot"; kind: "topic"; topicId: string; related: string[] }
  | { id: number; from: "bot"; kind: "describe" }
  | { id: number; from: "bot"; kind: "unknown" };

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
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  const bot = useCallback((p: BotPayload): Msg => ({ id: nextId.current++, from: "bot", ...p }) as Msg, []);
  const user = useCallback((text: L | string): Msg => ({ id: nextId.current++, from: "user", text }), []);

  // Initial conversation — optionally deep-linked with ?q=, ?topic= or ?cat=.
  useEffect(() => {
    const start: Msg[] = [bot({ kind: "menu" })];
    const q = params.get("q")?.trim();
    const topic = getTopic(params.get("topic") ?? "");
    const catId = params.get("cat");
    if (q) {
      const u = understand(q, null);
      start.push(
        user(q),
        bot(
          u.kind === "topic"
            ? { kind: "topic", topicId: u.topic.id, related: u.alternatives.map((a) => a.id) }
            : u.kind === "greeting"
              ? { kind: "menu" }
              : { kind: "unknown" }
        )
      );
    } else if (topic) start.push(user(topic.title), bot({ kind: "topic", topicId: topic.id, related: [] }));
    else if (catId) {
      const cat = [...categoriesFor(null), ...categoriesFor("girl")].find((c) => c.id === catId);
      if (cat) start.push(user(cat.title), bot(cat.id === "unsure" ? { kind: "describe" } : { kind: "category", catId }));
    }
    setMessages(start);
    // Only on first load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setTimeout(() => {
      setMessages((m) => [...m, bot(reply)]);
      setTyping(false);
    }, 650 + Math.random() * 400);
  };

  const openCategory = (cat: Category) =>
    respond(cat.title, cat.id === "unsure" ? { kind: "describe" } : { kind: "category", catId: cat.id });

  const openTopic = (topic: Topic, userText?: L) => respond(userText ?? topic.title, { kind: "topic", topicId: topic.id, related: [] });

  const ask = (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    setInput("");
    const u = understand(text, age);
    if (u.kind === "topic") respond(text, { kind: "topic", topicId: u.topic.id, related: u.alternatives.map((a) => a.id) });
    else if (u.kind === "greeting") respond(text, { kind: "menu" });
    else respond(text, { kind: "unknown" });
  };

  const showMenu = () => respond(chat.menu, { kind: "menu" });

  const restart = () => {
    nextId.current = 0;
    setMessages([bot({ kind: "menu" })]);
  };

  return (
    <div className="grid gap-8 sm:py-6 lg:grid-cols-[1fr_280px]">
      <section className="-mx-4 flex h-[calc(100dvh-10.5rem)] min-h-[520px] flex-col bg-sand-100 sm:mx-0 sm:h-[calc(100dvh-12rem)] sm:border sm:border-ink/15 lg:h-[calc(100dvh-9.5rem)]">
        <header className="flex items-center justify-between border-b border-ink/15 bg-sand-50 px-4 py-2.5 sm:px-5">
          <div className="flex items-center gap-3">
            <Logo size={34} />
            <div>
              <p className="font-display text-[17px] leading-tight font-extrabold tracking-wide">AADHI TI</p>
              <p className="flex items-center gap-1.5 text-xs text-ink-soft">
                <span className={`h-1.5 w-1.5 rounded-full ${typing ? "bg-turmeric-500" : "bg-leaf-500"}`} />
                {typing ? t(chat.typing) : t(chat.online)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-0.5">
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
        </header>

        <div ref={listRef} className="scrollbar-thin relative flex-1 space-y-6 overflow-y-auto px-4 py-6 sm:px-6">
          {messages.map((m) =>
            m.from === "user" ? (
              <div key={m.id} data-user-msg className="flex animate-fade-up justify-end">
                <p className="max-w-[85%] rounded-md bg-ink px-4 py-2.5 text-[15.5px] leading-relaxed text-white">
                  {typeof m.text === "string" ? m.text : t(m.text)}
                </p>
              </div>
            ) : (
              <BotRow key={m.id}>
                {m.kind === "menu" && <MenuMessage onCategory={openCategory} />}
                {m.kind === "category" && <CategoryMessage catId={m.catId} onTopic={openTopic} onMenu={showMenu} />}
                {m.kind === "topic" && <TopicCard topicId={m.topicId} related={m.related} onTopic={openTopic} onMenu={showMenu} />}
                {m.kind === "describe" && (
                  <DescribeMessage
                    onExample={(ex) => {
                      const topic = getTopic(ex.topic);
                      if (topic) openTopic(topic, ex.text);
                    }}
                  />
                )}
                {m.kind === "unknown" && <UnknownMessage onCategory={openCategory} />}
              </BotRow>
            )
          )}

          {typing && (
            <BotRow>
              <div className="flex w-fit gap-1.5 rounded-md border border-ink/10 bg-white px-4 py-3.5">
                {[0, 150, 300].map((d) => (
                  <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-soft" style={{ animationDelay: `${d}ms` }} />
                ))}
              </div>
            </BotRow>
          )}
        </div>

        <Composer input={input} setInput={setInput} onSend={ask} disabled={typing} langSpeech={LANGS.find((l) => l.id === lang)!.speech} />
      </section>

      <aside className="hidden space-y-8 lg:block">
        <WarliWelcome className="w-full max-w-[15rem] text-kokum-500" />

        <div className="border-2 border-red-600 bg-white p-5">
          <p className="flex items-center gap-2 font-display text-lg font-bold text-red-700">
            <AlertTriangle size={18} /> {t(chat.emergencyTitle)}
          </p>
          <p className="mt-1 text-sm text-ink-soft">{t(chat.emergencyBody)}</p>
          <a href="tel:112" className="mt-4 flex items-center justify-between bg-red-600 px-4 py-2.5 font-bold text-white hover:bg-red-700">
            {t(chat.call112)} <span className="font-serif text-2xl font-normal">112</span>
          </a>
        </div>

        <ul className="border-t border-ink/15">
          {helplines.slice(1).map((h) => (
            <li key={h.number} className="border-b border-ink/15">
              <a href={`tel:${h.number}`} className="flex items-baseline justify-between gap-2 py-2.5 text-sm hover:text-kokum-600">
                <span className="text-ink">{t(h.name)}</span>
                <span className="font-serif text-lg text-kokum-600 tabular-nums">{h.number}</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="flex gap-2 text-sm leading-relaxed text-ink-soft">
          <Lock size={15} className="mt-0.5 shrink-0 text-sea-600" /> {t(chat.privacy)}
        </p>
      </aside>
    </div>
  );
}

// ---------- message types ----------

function BotRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-fade-up">
      <p className="mb-1.5 text-[11px] font-bold tracking-[0.12em] text-sea-700">AADHI TI</p>
      <div className="max-w-full sm:max-w-[88%]">{children}</div>
    </div>
  );
}

const panel = "border border-ink/15 bg-white";
const textLink = "inline-flex items-center gap-1.5 font-bold text-kokum-600 underline decoration-kokum-200 underline-offset-4 hover:decoration-kokum-500";

function MenuMessage({ onCategory }: { onCategory: (c: Category) => void }) {
  const { t, age, setAge } = useLang();
  const cats = categoriesFor(age);
  return (
    <div className="space-y-4">
      <Bubble>{t(chat.greeting)}</Bubble>

      <div className={`${panel} p-4`}>
        <p className="text-sm font-semibold text-ink-soft">{t(chat.whoAreYou)}</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {(Object.keys(ageLabels) as AgeGroup[]).map((a) => (
            <button
              key={a}
              onClick={() => setAge(a)}
              aria-pressed={age === a}
              className={`border px-3 py-1.5 text-sm font-bold transition ${
                age === a ? "border-ink bg-ink text-white" : "border-ink/20 text-ink hover:border-ink"
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
              <button onClick={() => onCategory(c)} className="group flex w-full items-baseline gap-3 px-4 py-3 text-left hover:bg-sand-50">
                <span className="w-5 shrink-0 font-serif text-lg text-kokum-500">{i + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[15.5px] leading-tight font-bold text-ink group-hover:text-kokum-600">{t(c.title)}</span>
                  <span className="mt-0.5 block truncate text-xs text-ink-soft">{t(c.subtitle)}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
        <Link href="/everyday" className="flex items-center justify-between border-t border-ink/10 px-4 py-3 text-sm font-bold text-turmeric-600 hover:bg-turmeric-50">
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

function CategoryMessage({ catId, onTopic, onMenu }: { catId: string; onTopic: (t: Topic) => void; onMenu: () => void }) {
  const { t, age } = useLang();
  const cat = [...categoriesFor(age), ...categoriesFor(age === "girl" ? null : "girl")].find((c) => c.id === catId);
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
              <p className="px-4 pb-1 text-xs font-bold text-ink-soft">{t(g.title)}</p>
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
                        {tp.emergency && <AlertTriangle size={14} className="shrink-0" />}
                        {t(tp.title)}
                      </span>
                      <ArrowRight size={15} className="shrink-0 text-ink/25 group-hover:text-kokum-600" />
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
    const text = [t(topic.understand), ...topic.answer.map(t), t(topic.next)].join(". ");
    const u = new SpeechSynthesisUtterance(text);
    u.lang = LANGS.find((l) => l.id === lang)!.speech;
    synth.speak(u);
  };

  return (
    <div className="space-y-3">
      {topic.emergency && (
        <div className="flex items-center justify-between gap-3 border-2 border-red-600 bg-red-50 px-4 py-3">
          <p className="flex items-center gap-2 text-[15px] font-bold text-red-700">
            <AlertTriangle size={18} className="shrink-0" /> {t(chat.emergencyBody)}
          </p>
          <a href="tel:112" className="shrink-0 bg-red-600 px-4 py-2 font-serif text-xl text-white hover:bg-red-700">
            112
          </a>
        </div>
      )}

      <article className={panel}>
        <header className="flex items-start justify-between gap-3 border-b border-ink/10 px-4 py-3.5 sm:px-5">
          <div>
            <p className="text-xs font-bold text-sea-700">{t(intentLabels[topic.intent])}</p>
            <h3 className="mt-0.5 font-serif text-[1.35rem] leading-snug font-normal">{t(topic.title)}</h3>
          </div>
          <button onClick={readAloud} title="Read aloud" aria-label="Read aloud" className="mt-1 shrink-0 p-1.5 text-ink-soft hover:text-kokum-600">
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
                  <ActionButton key={a.href + a.label.en} href={a.href} label={t(a.label)} />
                ))}
              </div>
            )}
          </Step>
        </ol>

        {topic.sensitive && (
          <p className="flex gap-2 border-t border-ink/10 px-4 py-3 text-[13px] leading-relaxed text-ink-soft sm:px-5">
            <Info size={14} className="mt-0.5 shrink-0" /> {t(limits[topic.sensitive])}
          </p>
        )}
      </article>

      {relatedTopics.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
          {relatedTopics.map((r) => (
            <button key={r.id} onClick={() => onTopic(r)} className="font-semibold text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-kokum-500">
              {t(r.title)}
            </button>
          ))}
        </div>
      )}
      <BackToMenu onMenu={onMenu} />
    </div>
  );
}

function DescribeMessage({ onExample }: { onExample: (ex: (typeof describeExamples)[number]) => void }) {
  const { t } = useLang();
  return (
    <div className={`${panel} p-4 sm:p-5`}>
      <p className="font-serif text-xl">{t(chat.describeTitle)}</p>
      <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{t(chat.describeBody)}</p>
      <ul className="mt-4 border-t border-ink/10">
        {describeExamples.map((ex) => (
          <li key={ex.topic} className="border-b border-ink/10">
            <button onClick={() => onExample(ex)} className="block w-full py-2.5 text-left font-serif text-[16px] text-ink italic hover:text-kokum-600">
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
          <button key={c.id} onClick={() => onCategory(c)} className="font-semibold text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-kokum-500">
            {t(c.title)}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------- small pieces ----------

function Bubble({ children }: { children: React.ReactNode }) {
  return <p className="w-fit rounded-md border border-ink/10 bg-white px-4 py-3 text-[15.5px] leading-relaxed text-ink">{children}</p>;
}

function Step({ n, label, children }: { n: number; label: string; children: React.ReactNode }) {
  return (
    <li className="grid grid-cols-[1.75rem_1fr] gap-2">
      <span className="font-serif text-xl leading-6 text-sea-600">{n}.</span>
      <div>
        <p className="text-xs font-bold text-sea-700">{label}</p>
        <div className="mt-1 text-[15.5px] leading-relaxed text-ink">{children}</div>
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
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${textLink} text-sm`}>
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
    <button onClick={onMenu} className="mt-2.5 inline-flex items-center gap-1 text-sm font-semibold text-ink-soft hover:text-kokum-600">
      <ChevronLeft size={15} /> {t(chat.menu)}
    </button>
  );
}

function IconBtn({ title, onClick, children }: { title: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} title={title} aria-label={title} className="p-2.5 text-ink-soft hover:text-kokum-600">
      {children}
    </button>
  );
}

// Minimal typing for the Web Speech recognition API (not in TS DOM lib).
type Recognition = {
  lang: string;
  interimResults: boolean;
  onresult: (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void;
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
    const w = window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
    setSupported(!!(w.SpeechRecognition || w.webkitSpeechRecognition));
  }, []);

  const toggleVoice = () => {
    if (listening) {
      rec.current?.stop();
      return;
    }
    const w = window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) return;
    const r = new Ctor();
    r.lang = langSpeech;
    r.interimResults = true;
    r.onresult = (e) => setInput(Array.from(e.results, (res) => res[0].transcript).join(""));
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
