"use client";
import AuthGate from "@/components/AuthGate";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Send,
  Mic,
  MicOff,
  Phone,
  PhoneCall,
  PhoneOff,
  UserRound,
  Volume2,
  VolumeX,
} from "lucide-react";
import Leaf from "@/components/Leaf";
import Logo from "@/components/Logo";
import { CallRings } from "@/components/PageArt";
import {
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
    mr: "मराठी, हिंदी किंवा इंग्रजीत AADHI TI शी बोला. AI मार्गदर्शन; लोकेशन ट्रॅकिंग किंवा आपत्कालीन मदत पाठवण्याची सुविधा नाही.",
    en: "Speak with AADHI TI in Marathi, Hindi or English. AI guidance only; location tracking and emergency dispatch are not available.",
    hi: "मराठी, हिंदी या अंग्रेज़ी में AADHI TI से बात करें। AI मार्गदर्शन; लोकेशन ट्रैकिंग या आपातकालीन सहायता भेजने की सुविधा नहीं है।",
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
      <AuthGate><CallBot /></AuthGate>
    </Suspense>
  );
}

function CallBot() {
  const { t, lang, age } = useLang();
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
  const [recording, setRecording] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [callError, setCallError] = useState("");
  const [draft, setDraft] = useState("");
  const [emergency, setEmergency] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const recordingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const request = useRef<AbortController | null>(null);
  const busy = useRef(false);
  const micPending = useRef(false);
  const history = useRef<{role: "user" | "assistant"; text: string}[]>([]);
  const stopMic = useCallback((discard = false) => {
    if (recordingTimer.current) clearTimeout(recordingTimer.current);
    if (recorder.current && recorder.current.state !== "inactive") {
      if (discard) recorder.current.onstop = null;
      recorder.current.stop();
    }
    stream.current?.getTracks().forEach(track => track.stop());
    stream.current = null;
    setRecording(false);
  }, []);
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
          signal: AbortSignal.timeout(20_000),
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
    async (text: L, pitch: number, spokenLang = langRef.current) => {
      const activeSession = session.current;
      const lang = spokenLang;
      const said = text[lang];
      if (!voiceOnRef.current) return wait(Math.max(1800, said.length * 55));
      const url = await fetchVoice(said, lang, genderRef.current);
      if (!voiceOnRef.current || session.current !== activeSession) return;
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
      stopMic(true);
      request.current?.abort();
      voiceCache.current.forEach(p => p.then(url => { if (url) URL.revokeObjectURL(url); }));
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
        if (session.current !== s) return;
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
    history.current = [];
    setCallError("");
    setEmergency(false);
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
    stopMic(true);
    request.current?.abort();
    busy.current = false;
    setThinking(false);
    stopAudio();
    stopRing();
    setSpeaking(false);
    setStage(
      stage === "incoming" || stage === "scheduled" || stage === "dialing"
        ? "select"
        : "ended",
    );
  };

  const sendTurn = async (message?: string, audio?: Blob) => {
    if (busy.current || stage !== "connected") return;
    busy.current = true;
    const current = session.current;
    setThinking(true);
    setCallError("");
    const controller = new AbortController();
    request.current = controller;
    const timeout = setTimeout(() => controller.abort(), 55_000);
    try {
      const form = new FormData();
      form.set("lang", lang);
      form.set("age", age || "");
      form.set("voice", genderRef.current);
      form.set("history", JSON.stringify(history.current.slice(-6)));
      if (audio) form.set("audio", audio, "turn.audio");
      else form.set("message", message || "");
      const response = await fetch("/api/call", {method:"POST", body:form, signal:controller.signal});
      if(response.status===401)window.dispatchEvent(new Event("aadhi-auth-required"));
      const result = await response.json();
      if (current !== session.current) return;
      if (!response.ok) throw new Error(result.error);
      const asLine = (text: string): L => ({mr:text, hi:text, en:text});
      setLines(previous => [...previous,
        {id:lineId.current++, from:"user", text:asLine(result.message)},
        {id:lineId.current++, from:"bot", text:asLine(result.reply)}]);
      history.current = [...history.current, {role:"user",text:result.message}, {role:"assistant",text:result.reply}].slice(-6) as typeof history.current;
      setEmergency(result.emergency);
      setThinking(false);
      setSpeaking(true);
      // Speak complete sentences in chunks within the TTS endpoint's 500-character limit.
      const chunks = result.reply.match(/.{1,450}(?:\s|$)|.{1,450}/g) || [result.reply];
      for (const chunk of chunks) {
        if (current !== session.current) break;
        await speak(asLine(chunk), 1, result.lang);
      }
    } catch {
      if (current === session.current) setCallError(t({en:"I couldn't hear or answer that. Please try again, or type below.", mr:"आवाज समजला नाही किंवा उत्तर मिळाले नाही. पुन्हा बोला किंवा खाली लिहा.", hi:"आवाज़ समझ नहीं आई या जवाब नहीं मिला। फिर बोलें या नीचे लिखें।"}));
    } finally {
      clearTimeout(timeout);
      if (current === session.current) { busy.current = false; setThinking(false); setSpeaking(false); }
    }
  };

  const toggleRecording = async () => {
    if (recording) { stopMic(); return; }
    if (busy.current || micPending.current || speaking || muted || stage !== "connected") return;
    micPending.current = true;
    const current = session.current;
    setCallError("");
    try {
      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") throw new Error("unsupported");
      const media = await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true, noiseSuppression:true, autoGainControl:true}});
      if (current !== session.current) { media.getTracks().forEach(track => track.stop()); return; }
      stream.current = media;
      const mimeType = ["audio/webm;codecs=opus", "audio/mp4", "audio/webm"].find(type => MediaRecorder.isTypeSupported(type));
      const rec = new MediaRecorder(media, mimeType ? {mimeType} : undefined);
      recorder.current = rec;
      const chunks: Blob[] = [];
      rec.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
      rec.onerror = () => { stopMic(true); setCallError(t({en:"Recording failed. Please type your reply.",mr:"रेकॉर्डिंग झाले नाही. उत्तर लिहा.",hi:"रिकॉर्डिंग नहीं हुई। जवाब लिखें।"})); };
      rec.onstop = () => {
        media.getTracks().forEach(track => track.stop());
        setRecording(false);
        if (current === session.current) void sendTurn(undefined, new Blob(chunks, {type:rec.mimeType}));
      };
      rec.start();
      setRecording(true);
      recordingTimer.current = setTimeout(() => stopMic(), 30_000);
    } catch {
      stopMic(true);
      setCallError(t({en:"Allow microphone access to speak, or type your reply below.",mr:"बोलण्यासाठी मायक्रोफोनची परवानगी द्या किंवा खाली उत्तर लिहा.",hi:"बोलने के लिए माइक्रोफ़ोन की अनुमति दें या नीचे जवाब लिखें।"}));
    } finally { micPending.current = false; }
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
      <section className="relative mt-6 grid gap-8 overflow-hidden rounded-3xl border border-kokum-100 bg-gradient-to-br from-kokum-50 via-sand-50 to-white p-6 text-center shadow-[0_10px_30px_-18px_rgba(126,23,56,0.35)] sm:p-10 md:grid-cols-[1.25fr_1fr] md:items-center md:text-left">
        <Leaf className="absolute -top-4 -right-6 h-44 w-auto text-kokum-200" />
        <Leaf className="absolute -bottom-10 -left-8 h-40 w-auto -scale-x-100 text-kokum-100 md:hidden" />
        <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1 text-sm font-semibold tracking-wide text-kokum-600 shadow-[0_6px_16px_-12px_rgba(126,23,56,0.6)]">
            <span className="h-2 w-2 rounded-full bg-leaf-500" />
            {t(copy.eyebrow)}
          </p>
          <h1 className="mx-auto mt-4 max-w-md font-serif text-[2.6rem] leading-[1.05] font-normal text-kokum-700 sm:text-[4rem] md:mx-0 md:max-w-none">
            {t(copy.title)}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft md:mx-0">
            {t(copy.body)}
          </p>
        </div>
        <figure className="relative hidden w-full md:block md:max-w-[15rem] md:justify-self-end">
          <CallRings />
        </figure>
      </section>

      <div className="grid items-start gap-8 py-8 lg:grid-cols-[1fr_340px_1fr] lg:gap-6">
        {/* Mode picker */}
        <div className="space-y-4">
          <ol className="space-y-3">
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
            <div className="soft-card animate-fade-up space-y-5 p-5">
              <label className="block text-sm font-bold text-kokum-700">
                {t(copy.callerName)}
                <input
                  value={caller}
                  onChange={(e) => setCallerName(e.target.value)}
                  disabled={inCall}
                  className="soft-input mt-2 w-full font-medium text-ink disabled:opacity-60"
                />
              </label>
              <div>
                <p className="text-sm font-bold text-kokum-700">
                  {t(copy.ringAfter)}
                </p>
                <div className="mt-2 flex gap-1 rounded-full bg-kokum-50 p-1">
                  {[0, 5, 10, 30].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDelay(d)}
                      disabled={inCall}
                      className={`flex-1 rounded-full py-2 text-sm font-bold transition disabled:opacity-60 ${
                        delay === d
                          ? "bg-kokum-700 text-white shadow-[0_6px_14px_-8px_rgba(126,23,56,0.8)]"
                          : "text-ink hover:bg-white hover:text-kokum-700"
                      }`}
                    >
                      {d === 0 ? t(copy.now) : `${d}s`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="soft-card flex items-center justify-between gap-4 px-5 py-3.5">
            <p className="text-[15px] font-bold text-ink">{t(copy.voice)}</p>
            <div
              role="radiogroup"
              aria-label={t(copy.voice)}
              className="flex gap-1 rounded-full bg-kokum-50 p-1"
            >
              {(["female", "male"] as const).map((g) => (
                <button
                  key={g}
                  role="radio"
                  aria-checked={gender === g}
                  onClick={() => chooseGender(g)}
                  disabled={inCall}
                  className={`rounded-full px-4 py-1.5 text-sm font-bold transition disabled:opacity-60 ${gender === g ? "bg-kokum-700 text-white shadow-[0_6px_14px_-8px_rgba(126,23,56,0.8)]" : "text-ink hover:bg-white hover:text-kokum-700"}`}
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
            className="soft-card flex w-full items-center justify-between px-5 py-3.5 text-[15px] font-bold text-ink"
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
              className={`relative h-6 w-11 rounded-full transition ${voiceOn ? "bg-kokum-700" : "bg-kokum-100"}`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all ${voiceOn ? "left-[24px]" : "left-1"}`}
              />
            </span>
          </button>
        </div>

        {/* Phone */}
        <div className="mx-auto w-full max-w-[340px]">
          <div className="relative overflow-hidden rounded-[2.5rem] border-[6px] border-white bg-gradient-to-b from-kokum-600 via-kokum-700 to-kokum-900 text-white shadow-[0_24px_50px_-24px_rgba(126,23,56,0.7)] ring-1 ring-kokum-100">
            <div className="absolute top-2 left-1/2 h-5 w-24 -translate-x-1/2 rounded-full bg-kokum-900/70" />
            <div className="flex h-[580px] flex-col items-center px-5 pt-14 pb-9">
              {stage === "select" || stage === "ended" ? (
                <div className="flex flex-1 flex-col items-center justify-center text-center">
                  <Avatar mode={mode} ringing={false} />
                  {stage === "ended" ? (
                    <>
                      <p className="mt-6 font-display text-xl font-bold">
                        {t(copy.ended)}
                      </p>
                      <p className="mt-1 text-sm text-kokum-100">
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
                      <p className="mt-2 max-w-[15rem] text-sm text-kokum-100">
                        {mode === "safety"
                          ? t(copy.safetyIdle)
                          : t(copy.fakeIdle)}
                      </p>
                    </>
                  )}
                  <button
                    onClick={() => startCall(mode)}
                    className="mt-10 flex items-center gap-2 rounded-full bg-leaf-600 px-7 py-3.5 font-bold text-white shadow-[0_10px_22px_-10px_rgba(0,0,0,0.5)] transition hover:bg-leaf-500 active:scale-95"
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
                  <p className="text-sm text-kokum-100">{t(copy.arriving)}</p>
                  <p className="mt-2 font-serif text-7xl font-normal tabular-nums">
                    {countdown}
                  </p>
                  <p className="mt-4 max-w-[14rem] text-sm text-kokum-100">
                    {t(copy.putAway)}
                  </p>
                  <button
                    onClick={endCall}
                    className="mt-10 rounded-full border border-white/40 px-6 py-2.5 text-sm font-bold hover:bg-white/10"
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
                  <p className="mt-1 text-sm text-kokum-100 tabular-nums">
                    {stage === "dialing" && t(copy.connecting)}
                    {stage === "incoming" && t(copy.incoming)}
                    {stage === "connected" && fmt(seconds)}
                  </p>

                  <div className="mt-8 flex h-12 items-center gap-1">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <span
                        key={i}
                        className={`w-1 origin-center rounded-full bg-kokum-200 ${speaking ? "animate-wave" : ""}`}
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
                          onClick={() => { stopMic(true); setMuted(!muted); }}
                        >
                          {muted ? <MicOff size={22} /> : <Mic size={22} />}
                        </SmallAction>
                        <SmallAction label={t({en:"Talk",mr:"बोला",hi:"बोलें"})} active={recording} onClick={mode === "safety" ? toggleRecording : undefined}>
                          <Mic size={22} />
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
          <div className="soft-card flex flex-col overflow-hidden lg:h-[580px]">
            <div className="border-b border-kokum-100 px-5 py-4">
              <h2 className="font-serif text-2xl font-normal text-kokum-700">
                {t(copy.fakeGuideTitle)}
              </h2>
              <p className="mt-0.5 flex items-center gap-2 text-sm text-ink-soft">
                {stage === "connected" && (
                  <span className="h-2 w-2 animate-pulse rounded-full bg-leaf-600" />
                )}
                {stage === "connected" ? t(copy.fakeLive) : t(copy.fakeIdle)}
              </p>
            </div>
            <ol className="flex-1 space-y-4 p-5">
              {copy.fakeGuide.map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[15px] leading-relaxed text-ink"
                >
                  <span className="icon-circle h-8 w-8 font-serif text-lg text-kokum-600 tabular-nums">
                    {i + 1}
                  </span>
                  <span>{t(step)}</span>
                </li>
              ))}
            </ol>
            <a
              href="tel:112"
              className="m-4 mt-0 flex items-center justify-between gap-3 rounded-3xl border border-red-200 bg-red-50 py-2 pr-2 pl-5 text-sm font-bold text-red-700 transition hover:bg-red-100"
            >
              {t(copy.realDanger)}
              <span className="shrink-0 rounded-full bg-red-600 px-4 py-1 font-serif text-lg font-normal text-white">
                112
              </span>
            </a>
          </div>
        ) : (
          <div className="soft-card flex h-[580px] flex-col overflow-hidden">
            <div className="border-b border-kokum-100 px-5 py-4">
              <h2 className="font-serif text-2xl font-normal text-kokum-700">
                {t(copy.transcript)}
              </h2>
              <p className="mt-0.5 text-sm text-ink-soft">
                {stage === "connected"
                  ? speaking
                    ? `${name} ${t(gender === "male" ? copy.speakingM : copy.speaking)}`
                    : thinking ? t({en:"Thinking…",mr:"उत्तर तयार करत आहे…",hi:"जवाब तैयार हो रहा है…"}) : recording ? t(copy.listening) : t({en:"Tap the microphone to speak",mr:"बोलण्यासाठी मायक्रोफोन दाबा",hi:"बोलने के लिए माइक्रोफ़ोन दबाएँ"})
                  : t(copy.startToSee)}
              </p>
            </div>

            <div
              ref={transcriptRef}
              className="scrollbar-thin flex-1 space-y-4 overflow-y-auto bg-sand-50/60 p-4"
            >
              {lines.length === 0 && (
                <div className="grid h-full place-items-center text-center text-sm text-ink-soft">
                  <div>
                    <span className="icon-circle mx-auto mb-3 h-14 w-14">
                      <PhoneCall size={26} />
                    </span>
                    {t(copy.noCall)}
                  </div>
                </div>
              )}
              {lines.map((l) =>
                l.from === "user" ? (
                  <div key={l.id} className="flex animate-fade-up justify-end">
                    <p className="max-w-[85%] rounded-2xl rounded-br-md bg-kokum-700 px-3.5 py-2.5 text-[15px] text-white">
                      {t(l.text)}
                    </p>
                  </div>
                ) : (
                  <div key={l.id} className="max-w-[92%] animate-fade-up">
                    <p className="text-xs font-bold tracking-wide text-kokum-600">
                      {name}
                    </p>
                    <p className="mt-1 rounded-2xl rounded-tl-md border border-kokum-100 bg-white px-3.5 py-2.5 text-[15px] leading-relaxed text-ink">
                      {t(l.text)}
                    </p>
                  </div>
                ),
              )}
            </div>

            {stage === "connected" && (
              <div className="border-t border-kokum-100 p-4">
                <p className="mb-2 text-xs text-ink-soft">{t({en:"Tap to speak, then tap Send. Audio is sent to Gemini to answer you.",mr:"बोलण्यासाठी दाबा, मग पाठवा दाबा. उत्तरासाठी आवाज Gemini कडे पाठवला जातो.",hi:"बोलने के लिए दबाएँ, फिर भेजें दबाएँ। जवाब के लिए आवाज़ Gemini को भेजी जाती है।"})}</p>
                <button className="soft-btn w-full" onClick={toggleRecording} disabled={thinking || speaking || muted}>
                  {recording ? <Send size={18}/> : <Mic size={18}/>}
                  {recording ? t({en:"Send voice reply",mr:"आवाज पाठवा",hi:"आवाज़ भेजें"}) : t({en:"Speak · up to 30 seconds",mr:"बोला · ३० सेकंदांपर्यंत",hi:"बोलें · ३० सेकंड तक"})}
                </button>
                {callError && <p role="alert" className="mt-2 text-sm text-red-700">{callError}</p>}
                <form className="mt-3 flex gap-2" onSubmit={event => {event.preventDefault(); if (draft.trim() && !recording) {void sendTurn(draft.trim()); setDraft("");}}}>
                  <input aria-label="Type a reply" className="soft-input min-w-0 flex-1" maxLength={800} value={draft} onChange={event => setDraft(event.target.value)} placeholder={t({en:"Or type a reply",mr:"किंवा उत्तर लिहा",hi:"या जवाब लिखें"})}/>
                  <button aria-label="Send reply" className="soft-chip" disabled={thinking || speaking || recording || !draft.trim()}><Send size={18}/></button>
                </form>
                {emergency && <a href="tel:112" className="mt-2 block font-bold text-red-700">{t({en:"Call emergency help · 112",mr:"आपत्कालीन मदत · 112",hi:"आपातकालीन मदद · 112"})}</a>}

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
          <span className="absolute inset-0 animate-ring rounded-full bg-kokum-300/50" />
          <span className="absolute inset-0 animate-ring rounded-full bg-kokum-100/40 [animation-delay:1s]" />
        </>
      )}
      {mode === "safety" ? (
        <Logo size={112} className="relative" />
      ) : (
        <span
          className={`relative grid h-28 w-28 place-items-center rounded-full bg-kokum-50 text-kokum-700 ring-4 ring-white/30 ${ringing ? "animate-shake" : ""}`}
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
    <li>
      <button
        onClick={onClick}
        aria-pressed={active}
        className={`group flex w-full items-start gap-3.5 rounded-3xl border p-4 text-left transition ${active ? "border-kokum-400 bg-kokum-50 shadow-[0_12px_28px_-18px_rgba(126,23,56,0.6)] ring-2 ring-kokum-100" : "border-kokum-100 bg-white shadow-[0_8px_20px_-16px_rgba(126,23,56,0.45)] hover:border-kokum-300"}`}
      >
        <span
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-serif text-xl font-normal tabular-nums ${active ? "bg-kokum-700 text-white" : "bg-kokum-50 text-kokum-600"}`}
        >
          {n}
        </span>
        <span className="min-w-0 flex-1">
          <span
            className={`block font-display text-lg font-bold ${active ? "text-kokum-700" : "text-ink group-hover:text-kokum-600"}`}
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
      <span className="text-xs text-kokum-100">{label}</span>
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
        className={`grid h-14 w-14 place-items-center rounded-full transition ${active ? "bg-white text-kokum-800" : "bg-white/15 hover:bg-white/25"}`}
        aria-label={label}
      >
        {children}
      </button>
      <span className="text-xs text-kokum-100">{label}</span>
    </div>
  );
}
