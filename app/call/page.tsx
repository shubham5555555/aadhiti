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
import {
  callReplies,
  defaultCaller,
  fakeCallFillers,
  fakeCallScript,
  safetyCallScript,
  said,
  type VoiceGender,
} from "@/lib/callScripts";
import { LANGS, useLang } from "@/lib/i18n";
import type { L } from "@/lib/kb";

type Mode = "safety" | "fake";
type Stage =
  "select" | "scheduled" | "dialing" | "incoming" | "connected" | "ended";
type Line = { id: number; from: "bot" | "user"; text: L };

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const fmt = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

const copy = {
  eyebrow: { mr: "कॉल बॉट", en: "Call Bot", hi: "कॉल बॉट" },
  title: {
    mr: "तुमच्यासोबत चालणारा आवाज",
    en: "A voice that walks with you",
    hi: "आपके साथ चलने वाली आवाज़",
  },
  body: {
    mr: "प्रवासात AI ला फोनवर सोबत ठेवा, किंवा अवघड परिस्थितीतून बाहेर पडण्यासाठी खरा वाटणारा fake call मिळवा.",
    en: "Keep our AI on the line while you travel, or trigger a realistic fake call to get out of an uncomfortable situation.",
    hi: "सफ़र में AI को फ़ोन पर साथ रखें, या असहज स्थिति से निकलने के लिए असली जैसी fake call पाएँ।",
  },
  safetyTitle: {
    mr: "AI सुरक्षा कॉल",
    en: "AI Safety Call",
    hi: "AI सुरक्षा कॉल",
  },
  safetyDesc: {
    mr: "AADHI TI तुमच्याशी बोलते, प्रवासावर लक्ष ठेवते आणि गरज पडल्यास माणसांना कळवते.",
    en: "AADHI TI talks to you, tracks your journey and can alert your contacts.",
    hi: "AADHI TI आपसे बात करती है, सफ़र पर नज़र रखती है और ज़रूरत पर लोगों को सूचना देती है।",
  },
  fakeTitle: {
    mr: "Fake येणारा कॉल",
    en: "Fake Incoming Call",
    hi: "Fake आने वाली कॉल",
  },
  fakeDesc: {
    mr: "'घरच्यांचा' खरा वाटणारा कॉल — तिथून निघण्यासाठी कारण.",
    en: "A realistic call from 'family' — an excuse to leave.",
    hi: "'घरवालों' की असली जैसी कॉल — वहाँ से निकलने का बहाना।",
  },
  callerName: {
    mr: "कॉल करणाऱ्याचं नाव",
    en: "Caller name",
    hi: "कॉल करने वाले का नाम",
  },
  voice: { mr: "आवाज", en: "Voice", hi: "आवाज़" },
  female: { mr: "स्त्री", en: "Female", hi: "महिला" },
  male: { mr: "पुरुष", en: "Male", hi: "पुरुष" },
  fakeGuideTitle: {
    mr: "कॉल कसा वापरायचा",
    en: "How to use it",
    hi: "कॉल कैसे इस्तेमाल करें",
  },
  fakeGuide: [
    {
      mr: "कॉल उचला आणि फोन कानाला लावा.",
      en: "Answer and hold the phone to your ear.",
      hi: "कॉल उठाएँ और फ़ोन कान पर लगाएँ।",
    },
    {
      mr: 'फक्त समोरची व्यक्ती बोलते. प्रत्येक वाक्यानंतर थांबते, तेव्हा तुम्ही मोठ्याने उत्तर द्या: "हो आई, येते".',
      en: 'Only the caller speaks. They pause after each line, so answer out loud: "Yes, I\'m coming".',
      hi: 'सिर्फ़ सामने वाला बोलता है। हर बात के बाद रुकता है, तब आप ज़ोर से जवाब दें: "हाँ माँ, आ रही हूँ"।',
    },
    {
      mr: '"घरून फोन आलाय, निघते" असं सांगून तिथून निघा.',
      en: 'Say "Family\'s calling, I have to go" and leave.',
      hi: '"घर से फ़ोन है, जाना होगा" कहकर वहाँ से निकलें।',
    },
    {
      mr: "तुम्ही फोन ठेवेपर्यंत कॉल चालू राहतो.",
      en: "The call stays on until you hang up.",
      hi: "जब तक आप फ़ोन नहीं रखतीं, कॉल चलती रहती है।",
    },
  ],
  fakeLive: {
    mr: "कॉल चालू आहे · उत्तर देत राहा",
    en: "Call in progress · keep answering",
    hi: "कॉल चालू है · जवाब देती रहें",
  },
  realDanger: {
    mr: "खरा धोका असेल तर fake call नको. लगेच 112.",
    en: "If you're in real danger, skip the fake call. Call 112.",
    hi: "असली ख़तरा हो तो fake call नहीं। तुरंत 112।",
  },
  ringAfter: {
    mr: "किती वेळाने वाजेल",
    en: "Ring after",
    hi: "कितनी देर बाद बजे",
  },
  now: { mr: "आत्ता", en: "Now", hi: "अभी" },
  botVoice: { mr: "बॉटचा आवाज", en: "Bot voice", hi: "बॉट की आवाज़" },
  arriving: {
    mr: "Fake call येईल",
    en: "Fake call arriving in",
    hi: "Fake call आएगी",
  },
  putAway: {
    mr: "फोन बाजूला ठेवा — थोड्याच वेळात वाजेल.",
    en: "Put your phone away — it will ring soon.",
    hi: "फ़ोन रख दीजिए — थोड़ी देर में बजेगा।",
  },
  cancel: { mr: "रद्द करा", en: "Cancel", hi: "रद्द करें" },
  connecting: { mr: "जोडत आहे…", en: "Connecting…", hi: "जोड़ रहे हैं…" },
  incoming: {
    mr: "येणारा कॉल · मोबाइल",
    en: "Incoming call · mobile",
    hi: "आने वाली कॉल · मोबाइल",
  },
  decline: { mr: "नाकारा", en: "Decline", hi: "मना करें" },
  accept: { mr: "उचला", en: "Accept", hi: "उठाएँ" },
  mute: { mr: "Mute", en: "Mute", hi: "Mute" },
  unmute: { mr: "Unmute", en: "Unmute", hi: "Unmute" },
  keypad: { mr: "Keypad", en: "Keypad", hi: "Keypad" },
  speaker: { mr: "Speaker", en: "Speaker", hi: "Speaker" },
  transcript: { mr: "थेट संवाद", en: "Live transcript", hi: "लाइव बातचीत" },
  speaking: { mr: "बोलत आहे…", en: "is speaking…", hi: "बोल रही है…" },
  speakingM: { mr: "बोलत आहे…", en: "is speaking…", hi: "बोल रहा है…" },
  listening: { mr: "ऐकत आहे…", en: "Listening…", hi: "सुन रही है…" },
  startToSee: {
    mr: "संवाद पाहण्यासाठी कॉल सुरू करा",
    en: "Start a call to see the conversation",
    hi: "बातचीत देखने के लिए कॉल शुरू करें",
  },
  noCall: {
    mr: "सध्या कॉल नाही",
    en: "No active call",
    hi: "अभी कोई कॉल नहीं",
  },
  tapReply: {
    mr: "उत्तर देण्यासाठी दाबा (खऱ्या app मध्ये आवाजाने)",
    en: "Tap to reply (by voice in the real app)",
    hi: "जवाब के लिए दबाएँ (असली app में आवाज़ से)",
  },
  ended: { mr: "कॉल संपला", en: "Call ended", hi: "कॉल ख़त्म" },
  safetyIdle: {
    mr: "तुम्ही सुरक्षित पोहोचेपर्यंत फोनवर सोबत राहणारी AI.",
    en: "An AI companion that stays on the line until you're safe.",
    hi: "जब तक आप सुरक्षित न हों, फ़ोन पर साथ रहने वाली AI।",
  },
  fakeIdle: {
    mr: "निघण्यासाठी खरा वाटणारा येणारा कॉल.",
    en: "Get a realistic incoming call to excuse yourself.",
    hi: "निकलने के लिए असली जैसी आने वाली कॉल।",
  },
  again: { mr: "पुन्हा कॉल करा", en: "Call again", hi: "फिर से कॉल करें" },
  startSafety: {
    mr: "सुरक्षा कॉल सुरू करा",
    en: "Start safety call",
    hi: "सुरक्षा कॉल शुरू करें",
  },
  startFake: {
    mr: "Fake call सुरू करा",
    en: "Trigger fake call",
    hi: "Fake call शुरू करें",
  },
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
  const [mode, setMode] = useState<Mode>(
    params.get("mode") === "fake" ? "fake" : "safety",
  );
  const [stage, setStage] = useState<Stage>("select");
  const [lines, setLines] = useState<Line[]>([]);
  const [seconds, setSeconds] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [muted, setMuted] = useState(false);
  const [callerName, setCallerName] = useState<string | null>(null);
  const [delay, setDelay] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [gender, setGender] = useState<VoiceGender>("female");
  const genderRef = useRef(gender);
  genderRef.current = gender;

  // Remember her voice choice on this phone.
  useEffect(() => {
    try {
      if (localStorage.getItem("aadhi-call-voice") === "male")
        setGender("male");
    } catch {}
  }, []);
  const chooseGender = (g: VoiceGender) => {
    setGender(g);
    try {
      localStorage.setItem("aadhi-call-voice", g);
    } catch {}
  };

  // Bumped on every new call / hang-up so in-flight scripts stop.
  const session = useRef(0);
  const lineId = useRef(0);
  const voiceOnRef = useRef(voiceOn);
  const langRef = useRef(lang);
  const ring = useRef<{
    ctx: AudioContext;
    timer: ReturnType<typeof setInterval>;
  } | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    langRef.current = lang;
  }, [lang]);

  useEffect(() => {
    voiceOnRef.current = voiceOn;
    if (!voiceOn) stopAudio();
  }, [voiceOn]);

  useEffect(() => {
    transcriptRef.current?.scrollTo({
      top: transcriptRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines]);

  // Call timer
  useEffect(() => {
    if (stage !== "connected") return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [stage]);

  // ---- audio helpers ----
  // Human voice from ElevenLabs via /api/tts, fetched once per line and kept as a blob URL.
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const voiceCache = useRef(new Map<string, Promise<string | null>>());

  const fetchVoice = useCallback(
    (text: string, lang: string, voice: VoiceGender) => {
      const key = `${voice}:${lang}:${text}`;
      let p = voiceCache.current.get(key);
      if (!p) {
        p = fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, lang, voice }),
        })
          .then((r) => (r.ok ? r.blob() : null))
          .then((b) => (b ? URL.createObjectURL(b) : null))
          .catch(() => null)
          .then((url) => {
            // Don't remember failures, so the line is tried again when it's about to be spoken.
            if (!url) voiceCache.current.delete(key);
            return url;
          });
        voiceCache.current.set(key, p);
      }
      return p;
    },
    [],
  );

  /** Start fetching a script's audio early (e.g. while the phone is ringing) so lines play without a pause. */
  const prefetch = useCallback(
    (script: L[]) => {
      const lang = langRef.current;
      const voice = genderRef.current;
      // One after another — the voice service limits parallel requests.
      script.reduce<Promise<unknown>>(
        (chain, l) => chain.then(() => fetchVoice(l[lang], lang, voice)),
        Promise.resolve(),
      );
    },
    [fetchVoice],
  );

  const stopAudio = useCallback(() => {
    audioRef.current?.pause();
    window.speechSynthesis?.cancel();
  }, []);

  const speakDevice = useCallback((said: string, pitch: number) => {
    const synth =
      typeof window !== "undefined" ? window.speechSynthesis : undefined;
    if (!synth) return wait(Math.max(1800, said.length * 55));
    return new Promise<void>((resolve) => {
      const u = new SpeechSynthesisUtterance(said);
      const speechLang = LANGS.find((l) => l.id === langRef.current)!.speech;
      const voices = synth.getVoices();
      u.lang = speechLang;
      const wanted =
        genderRef.current === "male"
          ? /\bmale|rishi|hemant|ravi|aarav|madhur|prabhat/i
          : /female|veena|isha|lekha|kalpana|swara/i;
      u.voice =
        voices.find((v) => v.lang === speechLang && wanted.test(v.name)) ??
        voices.find((v) => v.lang === speechLang) ??
        null;
      u.pitch = genderRef.current === "male" ? Math.min(pitch, 0.85) : pitch;
      u.rate = 1;
      u.onend = () => resolve();
      u.onerror = () => resolve();
      synth.speak(u);
    });
  }, []);

  const speak = useCallback(
    async (text: L, pitch: number) => {
      const lang = langRef.current;
      const said = text[lang];
      if (!voiceOnRef.current) return wait(Math.max(1800, said.length * 55));
      const url = await fetchVoice(said, lang, genderRef.current);
      if (!voiceOnRef.current) return;
      if (!url) return speakDevice(said, pitch); // ElevenLabs unavailable: fall back to the device voice
      const audio = audioRef.current ?? (audioRef.current = new Audio());
      audio.src = url;
      return new Promise<void>((resolve) => {
        audio.onended = () => resolve();
        audio.onerror = () => resolve();
        audio.onpause = () => resolve();
        audio
          .play()
          .catch(() => speakDevice(said, pitch).then(() => resolve()));
      });
    },
    [fetchVoice, speakDevice],
  );

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
          gain.gain.exponentialRampToValueAtTime(
            0.001,
            ctx.currentTime + offset + 0.4,
          );
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
      stopAudio();
      stopRing();
    },
    [stopRing],
  );

  // ---- call flow ----
  const playLines = useCallback(
    async (
      script: Parameters<typeof said>[0][],
      s: number,
      pitch: number,
      gap: number,
    ) => {
      for (const line of script) {
        if (session.current !== s) return;
        const text = said(line, genderRef.current);
        setLines((l) => [...l, { id: lineId.current++, from: "bot", text }]);
        setSpeaking(true);
        await speak(text, pitch);
        setSpeaking(false);
        await wait(gap);
      }
    },
    [speak],
  );

  // Fake call: only the caller speaks. Pauses leave room for her to answer out loud;
  // after the script, short check-ins keep the line alive until she hangs up.
  const playFake = useCallback(
    async (s: number) => {
      const g = genderRef.current;
      for (const line of fakeCallScript[g]) {
        if (session.current !== s) return;
        setSpeaking(true);
        await speak(line.text, 1.15);
        setSpeaking(false);
        await wait(line.pause);
      }
      const fillers = fakeCallFillers[g];
      for (let i = 0; i < 12; i++) {
        if (session.current !== s) return;
        await wait(5000 + Math.random() * 4000);
        if (session.current !== s) return;
        setSpeaking(true);
        await speak(fillers[i % fillers.length], 1.15);
        setSpeaking(false);
      }
    },
    [speak],
  );

  const prefetchFake = useCallback(() => {
    const g = genderRef.current;
    prefetch([...fakeCallScript[g].map((l) => l.text), ...fakeCallFillers[g]]);
  }, [prefetch]);

  const connect = useCallback(
    (m: Mode) => {
      stopRing();
      const s = session.current;
      setStage("connected");
      if (m === "safety") {
        prefetch(callReplies.map((r) => said(r.reply, genderRef.current)));
        playLines(safetyCallScript, s, 1.1, 400);
      } else {
        playFake(s);
      }
    },
    [playLines, playFake, stopRing, prefetch],
  );

  const startCall = (m: Mode) => {
    session.current++;
    stopAudio();
    setMode(m);
    setLines([]);
    setSeconds(0);
    setMuted(false);
    if (m === "safety") {
      prefetch(safetyCallScript.map((l) => said(l, genderRef.current)));
      setStage("dialing");
      const s = session.current;
      setTimeout(() => session.current === s && connect("safety"), 2200);
    } else if (delay > 0) {
      prefetchFake();
      setCountdown(delay);
      setStage("scheduled");
    } else {
      prefetchFake();
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
    stopAudio();
    stopRing();
    setSpeaking(false);
    setStage(
      stage === "incoming" || stage === "scheduled" || stage === "dialing"
        ? "select"
        : "ended",
    );
  };

  const respond = async (r: (typeof callReplies)[number]) => {
    if (speaking) return;
    const s = session.current;
    setLines((l) => [
      ...l,
      { id: lineId.current++, from: "user", text: r.option },
    ]);
    await wait(600);
    playLines([r.reply], s, 1.1, 300);
  };

  const inCall =
    stage === "dialing" ||
    stage === "incoming" ||
    stage === "connected" ||
    stage === "scheduled";

  const pickMode = (m: Mode) => {
    if (inCall) return;
    setMode(m);
    setStage("select");
    setLines([]);
  };

  const caller = callerName ?? t(defaultCaller[gender]);
  const name = mode === "safety" ? "AADHI TI" : caller || "Unknown";

  return (
    <div className="pb-6">
      {/* Opening */}
      <section className="grid gap-8 border-b border-ink/10 pt-10 pb-12 md:grid-cols-[1.25fr_1fr] md:items-center">
        <div>
          <p className="text-sm font-semibold tracking-wide text-sea-700">
            {t(copy.eyebrow)}
          </p>
          <h1 className="mt-3 font-serif text-[3rem] leading-[1] font-normal text-kokum-600 sm:text-[4.25rem]">
            {t(copy.title)}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink">
            {t(copy.body)}
          </p>
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
                <p className="text-sm font-bold text-ink">
                  {t(copy.ringAfter)}
                </p>
                <div className="mt-2 flex gap-2">
                  {[0, 5, 10, 30].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDelay(d)}
                      disabled={inCall}
                      className={`flex-1 border py-2 text-sm font-bold transition disabled:opacity-60 ${
                        delay === d
                          ? "border-ink bg-ink text-white"
                          : "border-ink/20 bg-white text-ink hover:border-ink"
                      }`}
                    >
                      {d === 0 ? t(copy.now) : `${d}s`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-4 border-b border-ink/15 py-4">
            <p className="text-[15px] font-bold text-ink">{t(copy.voice)}</p>
            <div
              role="radiogroup"
              aria-label={t(copy.voice)}
              className="flex border-2 border-ink"
            >
              {(["female", "male"] as const).map((g) => (
                <button
                  key={g}
                  role="radio"
                  aria-checked={gender === g}
                  onClick={() => chooseGender(g)}
                  disabled={inCall}
                  className={`px-4 py-1.5 text-sm font-bold transition disabled:opacity-60 ${gender === g ? "bg-ink text-white" : "bg-white text-ink hover:bg-sand-100"}`}
                >
                  {t(copy[g])}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setVoiceOn(!voiceOn)}
            role="switch"
            aria-checked={voiceOn}
            className="flex w-full items-center justify-between border-b border-ink/15 py-4 text-[15px] font-bold text-ink"
          >
            <span className="flex items-center gap-2">
              {voiceOn ? (
                <Volume2 size={18} className="text-kokum-600" />
              ) : (
                <VolumeX size={18} className="text-ink-soft" />
              )}{" "}
              {t(copy.botVoice)}
            </span>
            <span
              className={`relative h-6 w-11 rounded-sm border-2 transition ${voiceOn ? "border-ink bg-ink" : "border-ink/30 bg-sand-200"}`}
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-[2px] bg-white transition-all ${voiceOn ? "left-[20px]" : "left-0.5"}`}
              />
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
                      <p className="mt-6 font-display text-xl font-bold">
                        {t(copy.ended)}
                      </p>
                      <p className="mt-1 text-sm text-sea-100">
                        {name} · {fmt(seconds)}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="mt-6 font-display text-xl font-bold">
                        {mode === "safety"
                          ? t(copy.safetyTitle)
                          : t(copy.fakeTitle)}
                      </p>
                      <p className="mt-2 max-w-[15rem] text-sm text-sea-100">
                        {mode === "safety"
                          ? t(copy.safetyIdle)
                          : t(copy.fakeIdle)}
                      </p>
                    </>
                  )}
                  <button
                    onClick={() => startCall(mode)}
                    className="mt-10 flex items-center gap-2 rounded-full bg-leaf-600 px-7 py-3.5 font-bold text-white transition hover:bg-leaf-500 active:scale-95"
                  >
                    <Phone size={20} />{" "}
                    {stage === "ended"
                      ? t(copy.again)
                      : mode === "safety"
                        ? t(copy.startSafety)
                        : t(copy.startFake)}
                  </button>
                </div>
              ) : stage === "scheduled" ? (
                <div className="flex flex-1 flex-col items-center justify-center text-center">
                  <p className="text-sm text-sea-100">{t(copy.arriving)}</p>
                  <p className="mt-2 font-serif text-7xl font-normal tabular-nums">
                    {countdown}
                  </p>
                  <p className="mt-4 max-w-[14rem] text-sm text-sea-100">
                    {t(copy.putAway)}
                  </p>
                  <button
                    onClick={endCall}
                    className="mt-10 border border-white/40 px-6 py-2.5 text-sm font-bold hover:bg-white/10"
                  >
                    {t(copy.cancel)}
                  </button>
                </div>
              ) : (
                <>
                  <Avatar
                    mode={mode}
                    ringing={stage === "incoming" || stage === "dialing"}
                  />
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
                      <CallAction
                        label={t(copy.decline)}
                        color="bg-red-600"
                        onClick={endCall}
                      >
                        <PhoneOff size={28} />
                      </CallAction>
                      <CallAction
                        label={t(copy.accept)}
                        color="bg-leaf-600 animate-bounce"
                        onClick={() => connect("fake")}
                      >
                        <Phone size={28} />
                      </CallAction>
                    </div>
                  ) : (
                    <>
                      <div className="grid w-full grid-cols-3 gap-4">
                        <SmallAction
                          label={muted ? t(copy.unmute) : t(copy.mute)}
                          active={muted}
                          onClick={() => setMuted(!muted)}
                        >
                          {muted ? <MicOff size={22} /> : <Mic size={22} />}
                        </SmallAction>
                        <SmallAction label={t(copy.keypad)}>
                          <Grid3x3 size={22} />
                        </SmallAction>
                        <SmallAction
                          label={t(copy.speaker)}
                          active={voiceOn}
                          onClick={() => setVoiceOn(!voiceOn)}
                        >
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

        {/* Transcript + replies (safety call) or how-to (fake call, which is one-sided) */}
        {mode === "fake" ? (
          <div className="flex flex-col border-2 border-ink bg-white lg:h-[580px]">
            <div className="border-b border-ink/15 px-4 py-3.5">
              <h2 className="font-serif text-2xl font-normal text-ink">
                {t(copy.fakeGuideTitle)}
              </h2>
              <p className="mt-0.5 flex items-center gap-2 text-sm text-ink-soft">
                {stage === "connected" && (
                  <span className="h-2 w-2 animate-pulse rounded-full bg-leaf-600" />
                )}
                {stage === "connected" ? t(copy.fakeLive) : t(copy.fakeIdle)}
              </p>
            </div>
            <ol className="flex-1 space-y-4 p-4">
              {copy.fakeGuide.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-[15px] leading-relaxed text-ink"
                >
                  <span className="w-5 shrink-0 font-serif text-xl leading-6 text-kokum-500 tabular-nums">
                    {i + 1}
                  </span>
                  <span>{t(step)}</span>
                </li>
              ))}
            </ol>
            <a
              href="tel:112"
              className="flex items-center justify-between gap-3 border-t-2 border-ink bg-red-50 px-4 py-3 text-sm font-bold text-red-700 hover:bg-red-100"
            >
              {t(copy.realDanger)}
              <span className="bg-red-600 px-3 py-1 font-serif text-lg font-normal text-white">
                112
              </span>
            </a>
          </div>
        ) : (
          <div className="flex h-[580px] flex-col overflow-hidden border-2 border-ink bg-white">
            <div className="border-b border-ink/15 px-4 py-3.5">
              <h2 className="font-serif text-2xl font-normal text-ink">
                {t(copy.transcript)}
              </h2>
              <p className="mt-0.5 text-sm text-ink-soft">
                {stage === "connected"
                  ? speaking
                    ? `${name} ${t(gender === "male" ? copy.speakingM : copy.speaking)}`
                    : t(copy.listening)
                  : t(copy.startToSee)}
              </p>
            </div>

            <div
              ref={transcriptRef}
              className="scrollbar-thin flex-1 space-y-4 overflow-y-auto p-4"
            >
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
                    <p className="max-w-[85%] rounded-md bg-ink px-3.5 py-2.5 text-[15px] text-white">
                      {t(l.text)}
                    </p>
                  </div>
                ) : (
                  <div key={l.id} className="max-w-[92%] animate-fade-up">
                    <p className="text-xs font-bold tracking-wide text-sea-700">
                      {name}
                    </p>
                    <p className="mt-0.5 text-[15px] leading-relaxed text-ink">
                      {t(l.text)}
                    </p>
                  </div>
                ),
              )}
            </div>

            {stage === "connected" && (
              <div className="border-t-2 border-ink p-3">
                <p className="mb-2 text-xs font-semibold text-ink-soft">
                  {t(copy.tapReply)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {callReplies.map((r) => (
                    <button
                      key={r.option.en}
                      onClick={() => respond(r)}
                      disabled={speaking}
                      className="flex items-center gap-1 border border-ink/20 bg-white px-3 py-1.5 text-sm font-bold text-ink transition hover:border-ink hover:bg-ink hover:text-white disabled:opacity-40"
                    >
                      {r.option.en === "Share my location" && (
                        <MapPin size={13} />
                      )}
                      {t(r.option)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
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
        <span
          className={`relative grid h-28 w-28 place-items-center rounded-full bg-turmeric-300 text-ink ${ringing ? "animate-shake" : ""}`}
        >
          <UserRound size={52} />
        </span>
      )}
    </div>
  );
}

function ModeRow({
  n,
  active,
  onClick,
  title,
  desc,
}: {
  n: number;
  active: boolean;
  onClick: () => void;
  title: string;
  desc: string;
}) {
  return (
    <li className="border-b border-ink/15">
      <button
        onClick={onClick}
        aria-pressed={active}
        className={`group flex w-full items-baseline gap-4 py-5 text-left transition-[padding] ${active ? "border-l-4 border-kokum-500 pl-4" : "border-l-4 border-transparent pl-0"}`}
      >
        <span className="w-6 shrink-0 font-serif text-2xl font-normal text-kokum-500 tabular-nums">
          {n}
        </span>
        <span className="min-w-0 flex-1">
          <span
            className={`block font-display text-xl font-bold ${active ? "text-kokum-600" : "text-ink group-hover:text-kokum-600"}`}
          >
            {title}
          </span>
          <span className="mt-0.5 block text-[15px] leading-relaxed text-ink-soft">
            {desc}
          </span>
        </span>
      </button>
    </li>
  );
}

function CallAction({
  label,
  color,
  onClick,
  children,
}: {
  label: string;
  color: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={onClick}
        className={`grid h-16 w-16 place-items-center rounded-full ${color}`}
        aria-label={label}
      >
        {children}
      </button>
      <span className="text-xs text-sea-100">{label}</span>
    </div>
  );
}

function SmallAction({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
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
