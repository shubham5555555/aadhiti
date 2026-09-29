"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Grid3x3,
  MapPin,
  Mic,
  MicOff,
  Phone,
  PhoneCall,
  PhoneOff,
  UserRound,
  Volume2,
  VolumeX,
} from "lucide-react";
import Logo from "@/components/Logo";
import { CallRings } from "@/components/PageArt";
import { callReplies, fakeCallScript, safetyCallScript } from "@/lib/callScripts";
import { LANGS, useLang } from "@/lib/i18n";
import type { L } from "@/lib/kb";

type Mode = "safety" | "fake";
type Stage = "select" | "scheduled" | "dialing" | "incoming" | "connected" | "ended";
type Line = { id: number; from: "bot" | "user"; text: L };

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

const copy = {
  eyebrow: { mr: "कॉल बॉट", en: "Call Bot", hi: "कॉल बॉट" },
  title: { mr: "तुमच्यासोबत चालणारा आवाज", en: "A voice that walks with you", hi: "आपके साथ चलने वाली आवाज़" },
  body: {
    mr: "प्रवासात AI ला फोनवर सोबत ठेवा, किंवा अवघड परिस्थितीतून बाहेर पडण्यासाठी खरा वाटणारा fake call मिळवा.",
    en: "Keep our AI on the line while you travel, or trigger a realistic fake call to get out of an uncomfortable situation.",
    hi: "सफ़र में AI को फ़ोन पर साथ रखें, या असहज स्थिति से निकलने के लिए असली जैसी fake call पाएँ।",
  },
  safetyTitle: { mr: "AI सुरक्षा कॉल", en: "AI Safety Call", hi: "AI सुरक्षा कॉल" },
  safetyDesc: { mr: "AADHI TI तुमच्याशी बोलते, प्रवासावर लक्ष ठेवते आणि गरज पडल्यास माणसांना कळवते.", en: "AADHI TI talks to you, tracks your journey and can alert your contacts.", hi: "AADHI TI आपसे बात करती है, सफ़र पर नज़र रखती है और ज़रूरत पर लोगों को सूचना देती है।" },
  fakeTitle: { mr: "Fake येणारा कॉल", en: "Fake Incoming Call", hi: "Fake आने वाली कॉल" },
  fakeDesc: { mr: "'घरच्यांचा' खरा वाटणारा कॉल — तिथून निघण्यासाठी कारण.", en: "A realistic call from 'family' — an excuse to leave.", hi: "'घरवालों' की असली जैसी कॉल — वहाँ से निकलने का बहाना।" },
  callerName: { mr: "कॉल करणाऱ्याचं नाव", en: "Caller name", hi: "कॉल करने वाले का नाम" },
  defaultCaller: { mr: "आई", en: "Maa", hi: "माँ" },
  ringAfter: { mr: "किती वेळाने वाजेल", en: "Ring after", hi: "कितनी देर बाद बजे" },
  now: { mr: "आत्ता", en: "Now", hi: "अभी" },
  botVoice: { mr: "बॉटचा आवाज", en: "Bot voice", hi: "बॉट की आवाज़" },
  arriving: { mr: "Fake call येईल", en: "Fake call arriving in", hi: "Fake call आएगी" },
  putAway: { mr: "फोन बाजूला ठेवा — थोड्याच वेळात वाजेल.", en: "Put your phone away — it will ring soon.", hi: "फ़ोन रख दीजिए — थोड़ी देर में बजेगा।" },
  cancel: { mr: "रद्द करा", en: "Cancel", hi: "रद्द करें" },
  connecting: { mr: "जोडत आहे…", en: "Connecting…", hi: "जोड़ रहे हैं…" },
  incoming: { mr: "येणारा कॉल · मोबाइल", en: "Incoming call · mobile", hi: "आने वाली कॉल · मोबाइल" },
  decline: { mr: "नाकारा", en: "Decline", hi: "मना करें" },
  accept: { mr: "उचला", en: "Accept", hi: "उठाएँ" },
  mute: { mr: "Mute", en: "Mute", hi: "Mute" },
  unmute: { mr: "Unmute", en: "Unmute", hi: "Unmute" },
  keypad: { mr: "Keypad", en: "Keypad", hi: "Keypad" },
  speaker: { mr: "Speaker", en: "Speaker", hi: "Speaker" },
  transcript: { mr: "थेट संवाद", en: "Live transcript", hi: "लाइव बातचीत" },
  speaking: { mr: "बोलत आहे…", en: "is speaking…", hi: "बोल रही है…" },
  listening: { mr: "ऐकत आहे…", en: "Listening…", hi: "सुन रही है…" },
  startToSee: { mr: "संवाद पाहण्यासाठी कॉल सुरू करा", en: "Start a call to see the conversation", hi: "बातचीत देखने के लिए कॉल शुरू करें" },
  noCall: { mr: "सध्या कॉल नाही", en: "No active call", hi: "अभी कोई कॉल नहीं" },
  tapReply: { mr: "उत्तर देण्यासाठी दाबा (खऱ्या app मध्ये आवाजाने)", en: "Tap to reply (by voice in the real app)", hi: "जवाब के लिए दबाएँ (असली app में आवाज़ से)" },
  ended: { mr: "कॉल संपला", en: "Call ended", hi: "कॉल ख़त्म" },
  safetyIdle: { mr: "तुम्ही सुरक्षित पोहोचेपर्यंत फोनवर सोबत राहणारी AI.", en: "An AI companion that stays on the line until you're safe.", hi: "जब तक आप सुरक्षित न हों, फ़ोन पर साथ रहने वाली AI।" },
  fakeIdle: { mr: "निघण्यासाठी खरा वाटणारा येणारा कॉल.", en: "Get a realistic incoming call to excuse yourself.", hi: "निकलने के लिए असली जैसी आने वाली कॉल।" },
  again: { mr: "पुन्हा कॉल करा", en: "Call again", hi: "फिर से कॉल करें" },
  startSafety: { mr: "सुरक्षा कॉल सुरू करा", en: "Start safety call", hi: "सुरक्षा कॉल शुरू करें" },
  startFake: { mr: "Fake call सुरू करा", en: "Trigger fake call", hi: "Fake call शुरू करें" },
};

export default function CallPage() {
  return (
    <Suspense>
      <CallBot />
    </Suspense>
  );
}

function CallBot() {
  const { t, lang } = useLang();
  const params = useSearchParams();
  const [mode, setMode] = useState<Mode>(params.get("mode") === "fake" ? "fake" : "safety");
  const [stage, setStage] = useState<Stage>("select");
  const [lines, setLines] = useState<Line[]>([]);
  const [seconds, setSeconds] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [muted, setMuted] = useState(false);
  const [callerName, setCallerName] = useState<string | null>(null);
  const [delay, setDelay] = useState(0);
  const [countdown, setCountdown] = useState(0);

  // Bumped on every new call / hang-up so in-flight scripts stop.
  const session = useRef(0);
  const lineId = useRef(0);
  const voiceOnRef = useRef(voiceOn);
  const langRef = useRef(lang);
  const ring = useRef<{ ctx: AudioContext; timer: ReturnType<typeof setInterval> } | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    langRef.current = lang;
  }, [lang]);

  useEffect(() => {
    voiceOnRef.current = voiceOn;
    if (!voiceOn) window.speechSynthesis?.cancel();
  }, [voiceOn]);

  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  // Call timer
  useEffect(() => {
    if (stage !== "connected") return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [stage]);

  // ---- audio helpers ----
  const speak = useCallback((text: L, pitch: number) => {
    const synth = typeof window !== "undefined" ? window.speechSynthesis : undefined;
    const said = text[langRef.current];
    if (!voiceOnRef.current || !synth) return wait(Math.max(1800, said.length * 55));
    return new Promise<void>((resolve) => {
      const u = new SpeechSynthesisUtterance(said);
      const speechLang = LANGS.find((l) => l.id === langRef.current)!.speech;
      const voices = synth.getVoices();
      u.lang = speechLang;
      u.voice =
        voices.find((v) => v.lang === speechLang && /female|veena|isha|lekha|kalpana/i.test(v.name)) ??
        voices.find((v) => v.lang === speechLang) ??
        null;
      u.pitch = pitch;
      u.rate = 1;
      u.onend = () => resolve();
      u.onerror = () => resolve();
      synth.speak(u);
    });
  }, []);

  const stopRing = useCallback(() => {
    if (!ring.current) return;
    clearInterval(ring.current.timer);
    ring.current.ctx.close();
    ring.current = null;
    navigator.vibrate?.(0);
  }, []);

  const startRing = useCallback(() => {
    stopRing();
    try {
      const ctx = new AudioContext();
      const tone = () => {
        [0, 0.45].forEach((offset) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.frequency.value = offset ? 620 : 480;
          gain.gain.setValueAtTime(0.12, ctx.currentTime + offset);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.4);
          osc.connect(gain).connect(ctx.destination);
          osc.start(ctx.currentTime + offset);
          osc.stop(ctx.currentTime + offset + 0.4);
        });
        navigator.vibrate?.([400, 200, 400]);
      };
      tone();
      ring.current = { ctx, timer: setInterval(tone, 2000) };
    } catch {
      // Audio not available — the visual ring still works.
    }
  }, [stopRing]);

  useEffect(
    () => () => {
      session.current++;
      window.speechSynthesis?.cancel();
      stopRing();
    },
    [stopRing]
  );

  // ---- call flow ----
  const playLines = useCallback(
    async (script: L[], s: number, pitch: number, gap: number) => {
      for (const text of script) {
        if (session.current !== s) return;
        setLines((l) => [...l, { id: lineId.current++, from: "bot", text }]);
        setSpeaking(true);
        await speak(text, pitch);
        setSpeaking(false);
        await wait(gap);
      }
    },
    [speak]
  );

  const connect = useCallback(
    (m: Mode) => {
      stopRing();
      const s = session.current;
      setStage("connected");
      if (m === "safety") playLines(safetyCallScript, s, 1.1, 400);
      else playLines(fakeCallScript, s, 1.2, 2200); // pause as if you're replying
    },
    [playLines, stopRing]
  );

  const startCall = (m: Mode) => {
    session.current++;
    window.speechSynthesis?.cancel();
    setMode(m);
    setLines([]);
    setSeconds(0);
    setMuted(false);
    if (m === "safety") {
      setStage("dialing");
      const s = session.current;
      setTimeout(() => session.current === s && connect("safety"), 2200);
    } else if (delay > 0) {
      setCountdown(delay);
      setStage("scheduled");
    } else {
      setStage("incoming");
      startRing();
    }
  };

  // Fake-call delay countdown
  useEffect(() => {
    if (stage !== "scheduled") return;
    if (countdown <= 0) {
      setStage("incoming");
      startRing();
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [stage, countdown, startRing]);

  const endCall = () => {
    session.current++;
    window.speechSynthesis?.cancel();
    stopRing();
    setSpeaking(false);
    setStage(stage === "incoming" || stage === "scheduled" || stage === "dialing" ? "select" : "ended");
  };

  const respond = async (r: (typeof callReplies)[number]) => {
    if (speaking) return;
    const s = session.current;
    setLines((l) => [...l, { id: lineId.current++, from: "user", text: r.option }]);
    await wait(600);
    playLines([r.reply], s, 1.1, 300);
  };

  const inCall = stage === "dialing" || stage === "incoming" || stage === "connected" || stage === "scheduled";

  const pickMode = (m: Mode) => {
    if (inCall) return;
    setMode(m);
    setStage("select");
    setLines([]);
  };

  const caller = callerName ?? t(copy.defaultCaller);
  const name = mode === "safety" ? "AADHI TI" : caller || "Unknown";

  return (
    <div className="pb-6">
      {/* Opening */}
      <section className="grid gap-8 border-b border-ink/10 pt-10 pb-12 md:grid-cols-[1.25fr_1fr] md:items-center">
        <div>
          <p className="text-sm font-semibold tracking-wide text-sea-700">{t(copy.eyebrow)}</p>
          <h1 className="mt-3 font-serif text-[3rem] leading-[1] font-normal text-kokum-600 sm:text-[4.25rem]">{t(copy.title)}</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink">{t(copy.body)}</p>
        </div>
        <figure className="hidden w-full md:block md:max-w-[15rem] md:justify-self-end">
          <CallRings />
        </figure>
      </section>

      <div className="grid items-start gap-10 py-10 lg:grid-cols-[1fr_340px_1fr] lg:gap-8">
        {/* Mode picker */}
        <div>
          <ol className="border-t border-ink/15">
            <ModeRow
              n={1}
              active={mode === "safety"}
              onClick={() => pickMode("safety")}
              title={t(copy.safetyTitle)}
              desc={t(copy.safetyDesc)}
            />
            <ModeRow
              n={2}
              active={mode === "fake"}
              onClick={() => pickMode("fake")}
              title={t(copy.fakeTitle)}
              desc={t(copy.fakeDesc)}
            />
          </ol>

          {mode === "fake" && (
            <div className="animate-fade-up space-y-5 border-b border-ink/15 py-5">
              <label className="block text-sm font-bold text-ink">
                {t(copy.callerName)}
                <input
                  value={caller}
                  onChange={(e) => setCallerName(e.target.value)}
                  disabled={inCall}
                  className="mt-2 w-full border-2 border-ink bg-white px-3 py-2.5 text-[16px] font-medium outline-none focus:border-kokum-600 disabled:opacity-60"
                />
              </label>
              <div>
                <p className="text-sm font-bold text-ink">{t(copy.ringAfter)}</p>
                <div className="mt-2 flex gap-2">
                  {[0, 5, 10, 30].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDelay(d)}
                      disabled={inCall}
                      className={`flex-1 border py-2 text-sm font-bold transition disabled:opacity-60 ${
                        delay === d ? "border-ink bg-ink text-white" : "border-ink/20 bg-white text-ink hover:border-ink"
                      }`}
                    >
                      {d === 0 ? t(copy.now) : `${d}s`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => setVoiceOn(!voiceOn)}
            role="switch"
            aria-checked={voiceOn}
            className="flex w-full items-center justify-between border-b border-ink/15 py-4 text-[15px] font-bold text-ink"
          >
            <span className="flex items-center gap-2">
              {voiceOn ? <Volume2 size={18} className="text-kokum-600" /> : <VolumeX size={18} className="text-ink-soft" />} {t(copy.botVoice)}
            </span>
            <span className={`relative h-6 w-11 rounded-sm border-2 transition ${voiceOn ? "border-ink bg-ink" : "border-ink/30 bg-sand-200"}`}>
              <span className={`absolute top-0.5 h-4 w-4 rounded-[2px] bg-white transition-all ${voiceOn ? "left-[20px]" : "left-0.5"}`} />
            </span>
          </button>
        </div>

        {/* Phone */}
        <div className="mx-auto w-full max-w-[340px]">
          <div className="relative overflow-hidden rounded-[2rem] border-[8px] border-ink bg-sea-900 text-white">
            <div className="absolute top-2 left-1/2 h-5 w-24 -translate-x-1/2 rounded-full bg-ink" />
            <div className="flex h-[580px] flex-col items-center px-5 pt-14 pb-9">
              {stage === "select" || stage === "ended" ? (
                <div className="flex flex-1 flex-col items-center justify-center text-center">
                  <Avatar mode={mode} ringing={false} />
                  {stage === "ended" ? (
                    <>
                      <p className="mt-6 font-display text-xl font-bold">{t(copy.ended)}</p>
                      <p className="mt-1 text-sm text-sea-100">
                        {name} · {fmt(seconds)}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="mt-6 font-display text-xl font-bold">{mode === "safety" ? t(copy.safetyTitle) : t(copy.fakeTitle)}</p>
                      <p className="mt-2 max-w-[15rem] text-sm text-sea-100">{mode === "safety" ? t(copy.safetyIdle) : t(copy.fakeIdle)}</p>
                    </>
                  )}
                  <button
                    onClick={() => startCall(mode)}
                    className="mt-10 flex items-center gap-2 rounded-full bg-leaf-600 px-7 py-3.5 font-bold text-white transition hover:bg-leaf-500 active:scale-95"
                  >
                    <Phone size={20} /> {stage === "ended" ? t(copy.again) : mode === "safety" ? t(copy.startSafety) : t(copy.startFake)}
                  </button>
                </div>
              ) : stage === "scheduled" ? (
                <div className="flex flex-1 flex-col items-center justify-center text-center">
                  <p className="text-sm text-sea-100">{t(copy.arriving)}</p>
                  <p className="mt-2 font-serif text-7xl font-normal tabular-nums">{countdown}</p>
                  <p className="mt-4 max-w-[14rem] text-sm text-sea-100">{t(copy.putAway)}</p>
                  <button onClick={endCall} className="mt-10 border border-white/40 px-6 py-2.5 text-sm font-bold hover:bg-white/10">
                    {t(copy.cancel)}
                  </button>
                </div>
              ) : (
                <>
                  <Avatar mode={mode} ringing={stage === "incoming" || stage === "dialing"} />
                  <p className="mt-6 font-display text-2xl font-bold">{name}</p>
                  <p className="mt-1 text-sm text-sea-100 tabular-nums">
                    {stage === "dialing" && t(copy.connecting)}
                    {stage === "incoming" && t(copy.incoming)}
                    {stage === "connected" && fmt(seconds)}
                  </p>

                  <div className="mt-8 flex h-12 items-center gap-1">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <span
                        key={i}
                        className={`w-1 origin-center bg-turmeric-300 ${speaking ? "animate-wave" : ""}`}
                        style={{
                          height: `${20 + ((i * 37) % 28)}px`,
                          animationDelay: `${(i % 6) * 0.1}s`,
                          transform: speaking ? undefined : "scaleY(0.15)",
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex-1" />

                  {stage === "incoming" ? (
                    <div className="flex w-full justify-around">
                      <CallAction label={t(copy.decline)} color="bg-red-600" onClick={endCall}>
                        <PhoneOff size={28} />
                      </CallAction>
                      <CallAction label={t(copy.accept)} color="bg-leaf-600 animate-bounce" onClick={() => connect("fake")}>
                        <Phone size={28} />
                      </CallAction>
                    </div>
                  ) : (
                    <>
                      <div className="grid w-full grid-cols-3 gap-4">
                        <SmallAction label={muted ? t(copy.unmute) : t(copy.mute)} active={muted} onClick={() => setMuted(!muted)}>
                          {muted ? <MicOff size={22} /> : <Mic size={22} />}
                        </SmallAction>
                        <SmallAction label={t(copy.keypad)}>
                          <Grid3x3 size={22} />
                        </SmallAction>
                        <SmallAction label={t(copy.speaker)} active={voiceOn} onClick={() => setVoiceOn(!voiceOn)}>
                          <Volume2 size={22} />
                        </SmallAction>
                      </div>
                      <button
                        onClick={endCall}
                        className="mt-8 grid h-16 w-16 place-items-center rounded-full bg-red-600 transition hover:bg-red-700 active:scale-95"
                        aria-label="End call"
                      >
                        <PhoneOff size={28} />
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Transcript + replies */}
        <div className="flex h-[580px] flex-col overflow-hidden border-2 border-ink bg-white">
          <div className="border-b border-ink/15 px-4 py-3.5">
            <h2 className="font-serif text-2xl font-normal text-ink">{t(copy.transcript)}</h2>
            <p className="mt-0.5 text-sm text-ink-soft">
              {stage === "connected" ? (speaking ? `${name} ${t(copy.speaking)}` : t(copy.listening)) : t(copy.startToSee)}
            </p>
          </div>

          <div ref={transcriptRef} className="scrollbar-thin flex-1 space-y-4 overflow-y-auto p-4">
            {lines.length === 0 && (
              <div className="grid h-full place-items-center text-center text-sm text-ink-soft">
                <div>
                  <PhoneCall className="mx-auto mb-2 text-ink/25" size={32} />
                  {t(copy.noCall)}
                </div>
              </div>
            )}
            {lines.map((l) =>
              l.from === "user" ? (
                <div key={l.id} className="flex animate-fade-up justify-end">
                  <p className="max-w-[85%] rounded-md bg-ink px-3.5 py-2.5 text-[15px] text-white">{t(l.text)}</p>
                </div>
              ) : (
                <div key={l.id} className="max-w-[92%] animate-fade-up">
                  <p className="text-xs font-bold tracking-wide text-sea-700">{name}</p>
                  <p className="mt-0.5 text-[15px] leading-relaxed text-ink">{t(l.text)}</p>
                </div>
              )
            )}
          </div>

          {mode === "safety" && stage === "connected" && (
            <div className="border-t-2 border-ink p-3">
              <p className="mb-2 text-xs font-semibold text-ink-soft">{t(copy.tapReply)}</p>
              <div className="flex flex-wrap gap-2">
                {callReplies.map((r) => (
                  <button
                    key={r.option.en}
                    onClick={() => respond(r)}
                    disabled={speaking}
                    className="flex items-center gap-1 border border-ink/20 bg-white px-3 py-1.5 text-sm font-bold text-ink transition hover:border-ink hover:bg-ink hover:text-white disabled:opacity-40"
                  >
                    {r.option.en === "Share my location" && <MapPin size={13} />}
                    {t(r.option)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Avatar({ mode, ringing }: { mode: Mode; ringing: boolean }) {
  return (
    <div className="relative grid h-28 w-28 place-items-center">
      {ringing && (
        <>
          <span className="absolute inset-0 animate-ring rounded-full bg-sea-300/50" />
          <span className="absolute inset-0 animate-ring rounded-full bg-turmeric-300/40 [animation-delay:1s]" />
        </>
      )}
      {mode === "safety" ? (
        <Logo size={112} className="relative" />
      ) : (
        <span className={`relative grid h-28 w-28 place-items-center rounded-full bg-turmeric-300 text-ink ${ringing ? "animate-shake" : ""}`}>
          <UserRound size={52} />
        </span>
      )}
    </div>
  );
}

function ModeRow({ n, active, onClick, title, desc }: { n: number; active: boolean; onClick: () => void; title: string; desc: string }) {
  return (
    <li className="border-b border-ink/15">
      <button
        onClick={onClick}
        aria-pressed={active}
        className={`group flex w-full items-baseline gap-4 py-5 text-left transition-[padding] ${active ? "border-l-4 border-kokum-500 pl-4" : "border-l-4 border-transparent pl-0"}`}
      >
        <span className="w-6 shrink-0 font-serif text-2xl font-normal text-kokum-500 tabular-nums">{n}</span>
        <span className="min-w-0 flex-1">
          <span className={`block font-display text-xl font-bold ${active ? "text-kokum-600" : "text-ink group-hover:text-kokum-600"}`}>{title}</span>
          <span className="mt-0.5 block text-[15px] leading-relaxed text-ink-soft">{desc}</span>
        </span>
      </button>
    </li>
  );
}

function CallAction({ label, color, onClick, children }: { label: string; color: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button onClick={onClick} className={`grid h-16 w-16 place-items-center rounded-full ${color}`} aria-label={label}>
        {children}
      </button>
      <span className="text-xs text-sea-100">{label}</span>
    </div>
  );
}

function SmallAction({ label, active, onClick, children }: { label: string; active?: boolean; onClick?: () => void; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={onClick}
        className={`grid h-14 w-14 place-items-center rounded-full transition ${active ? "bg-white text-sea-900" : "bg-white/15 hover:bg-white/25"}`}
        aria-label={label}
      >
        {children}
      </button>
      <span className="text-xs text-sea-100">{label}</span>
    </div>
  );
}
