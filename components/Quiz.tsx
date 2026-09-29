"use client";

import { useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import type { L } from "@/lib/kb";

const questions: { q: L; options: L[]; answer: number; explain: L }[] = [
  {
    q: { mr: "Zero FIR कुठे दाखल करता येते?", en: "Where can you file a Zero FIR?", hi: "Zero FIR कहाँ दर्ज हो सकती है?" },
    options: [
      { mr: "फक्त गुन्हा घडलेल्या ठिकाणी", en: "Only where the crime happened", hi: "सिर्फ़ जहाँ अपराध हुआ" },
      { mr: "कोणत्याही पोलीस स्टेशनमध्ये", en: "At any police station", hi: "किसी भी पुलिस स्टेशन में" },
      { mr: "फक्त online", en: "Only online", hi: "सिर्फ़ ऑनलाइन" },
      { mr: "फक्त महिला पोलीस स्टेशनमध्ये", en: "Only at a women's police station", hi: "सिर्फ़ महिला थाने में" },
    ],
    answer: 1,
    explain: {
      mr: "Zero FIR कोणत्याही पोलीस स्टेशनमध्ये दाखल करता येते; नंतर ती योग्य स्टेशनकडे पाठवली जाते.",
      en: "A Zero FIR can be filed at any police station and is later transferred to the right one.",
      hi: "Zero FIR किसी भी थाने में दर्ज हो सकती है; बाद में सही थाने को भेजी जाती है।",
    },
  },
  {
    q: {
      mr: "कोणीतरी पैसे दिले नाहीत तर तुमचे फोटो पसरवण्याची धमकी देतोय. काय कराल?",
      en: "Someone threatens to leak your photos unless you pay. What should you do?",
      hi: "कोई पैसे न देने पर आपकी फ़ोटो फैलाने की धमकी दे रहा है। क्या करेंगी?",
    },
    options: [
      { mr: "लगेच पैसे देऊन टाकू", en: "Pay quickly to end it", hi: "जल्दी पैसे दे दूँ" },
      { mr: "सगळी accounts delete करू", en: "Delete all my accounts", hi: "सारे accounts delete कर दूँ" },
      { mr: "पुरावे जपून 1930 वर तक्रार करू", en: "Save evidence and report on 1930", hi: "सबूत संभालकर 1930 पर शिकायत करूँ" },
      { mr: "काहीच करणार नाही", en: "Do nothing", hi: "कुछ नहीं करूँगी" },
    ],
    answer: 2,
    explain: {
      mr: "blackmail करणाऱ्याला कधीच पैसे देऊ नका. पुरावे ठेवा आणि cybercrime.gov.in किंवा 1930 वर तक्रार करा.",
      en: "Never pay a blackmailer. Keep evidence and report at cybercrime.gov.in or call 1930.",
      hi: "blackmail करने वाले को कभी पैसे न दें। सबूत रखें और cybercrime.gov.in या 1930 पर शिकायत करें।",
    },
  },
  {
    q: { mr: "भारतात सर्व आणीबाणीसाठी एकच नंबर कोणता?", en: "What's the all-India emergency number?", hi: "पूरे भारत का आपातकालीन नंबर कौन-सा है?" },
    options: [
      { mr: "100", en: "100", hi: "100" },
      { mr: "112", en: "112", hi: "112" },
      { mr: "108", en: "108", hi: "108" },
      { mr: "1091", en: "1091", hi: "1091" },
    ],
    answer: 1,
    explain: {
      mr: "112 वर पोलीस, अग्निशमन आणि ॲम्ब्युलन्स — सगळ्या सेवा मिळतात.",
      en: "112 connects you to police, fire and ambulance services.",
      hi: "112 पर पुलिस, फ़ायर और एम्बुलेंस — सभी सेवाएँ मिलती हैं।",
    },
  },
  {
    q: {
      mr: "कामाच्या ठिकाणी छळाची तक्रार (POSH) साधारण किती दिवसांत करावी?",
      en: "Within how long should a workplace harassment (POSH) complaint be filed?",
      hi: "कार्यस्थल पर उत्पीड़न (POSH) की शिकायत आम तौर पर कितने समय में करनी चाहिए?",
    },
    options: [
      { mr: "1 आठवडा", en: "1 week", hi: "1 हफ़्ता" },
      { mr: "3 महिने", en: "3 months", hi: "3 महीने" },
      { mr: "1 वर्ष", en: "1 year", hi: "1 साल" },
      { mr: "कधीही", en: "Any time", hi: "कभी भी" },
    ],
    answer: 1,
    explain: {
      mr: "Internal Committee कडे घटनेनंतर 3 महिन्यांत लेखी तक्रार करावी (काही वेळा मुदत वाढते).",
      en: "File in writing with the Internal Committee within 3 months (extendable in some cases).",
      hi: "Internal Committee को घटना के 3 महीने के अंदर लिखित शिकायत करें (कुछ मामलों में समय बढ़ता है)।",
    },
  },
  {
    q: { mr: "यापैकी काय घरगुती हिंसा आहे?", en: "Which of these counts as domestic violence?", hi: "इनमें से क्या घरेलू हिंसा है?" },
    options: [
      { mr: "फक्त मारहाण", en: "Only physical abuse", hi: "सिर्फ़ मारपीट" },
      { mr: "फक्त शारीरिक आणि लैंगिक", en: "Physical and sexual only", hi: "सिर्फ़ शारीरिक और यौन" },
      { mr: "शारीरिक, भावनिक, शाब्दिक, लैंगिक आणि आर्थिक", en: "Physical, emotional, verbal, sexual and economic", hi: "शारीरिक, भावनात्मक, मौखिक, यौन और आर्थिक" },
      { mr: "फक्त हुंड्याची मागणी", en: "Only dowry demands", hi: "सिर्फ़ दहेज की माँग" },
    ],
    answer: 2,
    explain: {
      mr: "कायदा शारीरिक, लैंगिक, शाब्दिक, भावनिक आणि आर्थिक — सगळ्या प्रकारचा छळ मानतो.",
      en: "The law recognises physical, sexual, verbal, emotional and economic abuse.",
      hi: "कानून शारीरिक, यौन, मौखिक, भावनात्मक और आर्थिक — हर तरह के उत्पीड़न को मानता है।",
    },
  },
];

const copy = {
  title: { mr: "तुमची जागरूकता तपासा", en: "Test your awareness", hi: "अपनी जागरूकता जाँचें" },
  score: { mr: "तुमचे गुण", en: "You scored", hi: "आपके अंक" },
  perfect: { mr: "छान — तुम्ही पूर्ण तयार आहात! ", en: "Amazing — you're well prepared! ", hi: "शानदार — आप पूरी तरह तैयार हैं! " },
  good: { mr: "छान प्रयत्न! वरचे विषय वाचून आणखी जाणून घ्या.", en: "Great effort! Explore the topics above to learn more.", hi: "बढ़िया कोशिश! ऊपर के विषय पढ़कर और जानें।" },
  again: { mr: "पुन्हा करा", en: "Try again", hi: "फिर से करें" },
  next: { mr: "पुढचा प्रश्न →", en: "Next question →", hi: "अगला सवाल →" },
  results: { mr: "निकाल पाहा", en: "See results", hi: "नतीजा देखें" },
};

export default function Quiz() {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const done = index >= questions.length;
  const current = questions[index];

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === current.answer) setScore((s) => s + 1);
  };

  const reset = () => {
    setIndex(0);
    setPicked(null);
    setScore(0);
  };

  return (
    <section className="mt-14 border-2 border-ink bg-white p-5 sm:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-serif text-2xl font-normal text-ink sm:text-3xl">{t(copy.title)}</h2>
        {!done && (
          <span className="shrink-0 font-serif text-xl font-normal text-kokum-600 tabular-nums">
            {index + 1} / {questions.length}
          </span>
        )}
      </div>

      <div className="mt-4 grid gap-1" style={{ gridTemplateColumns: `repeat(${questions.length}, minmax(0, 1fr))` }} aria-hidden>
        {questions.map((_, i) => (
          <span key={i} className={`h-[3px] transition-colors ${i < index ? "bg-ink" : "bg-ink/15"}`} />
        ))}
      </div>

      {done ? (
        <div className="py-8">
          <p className="text-sm font-bold text-ink-soft">{t(copy.score)}</p>
          <p className="mt-1 font-serif text-[4.5rem] leading-none font-normal text-kokum-600 tabular-nums">
            {score}
            <span className="text-ink/30"> / {questions.length}</span>
          </p>
          <p className="mt-4 max-w-md text-[17px] leading-relaxed text-ink">{score === questions.length ? t(copy.perfect) : t(copy.good)}</p>
          <button onClick={reset} className="mt-6 inline-flex items-center gap-2 bg-ink px-6 py-3 font-bold text-white hover:bg-kokum-600">
            <RotateCcw size={17} /> {t(copy.again)}
          </button>
        </div>
      ) : (
        <div key={index} className="animate-fade-up">
          <p className="mt-6 font-serif text-xl leading-snug font-normal text-ink sm:text-2xl">{t(current.q)}</p>
          <div className="mt-5 space-y-2">
            {current.options.map((opt, i) => {
              const state = picked === null ? "idle" : i === current.answer ? "correct" : i === picked ? "wrong" : "dim";
              return (
                <button
                  key={opt.en}
                  onClick={() => choose(i)}
                  className={`flex w-full items-center gap-3 border-2 px-4 py-3 text-left font-medium transition ${
                    state === "idle"
                      ? "border-ink/15 bg-white text-ink hover:border-ink"
                      : state === "correct"
                        ? "border-leaf-600 bg-leaf-50 text-leaf-700"
                        : state === "wrong"
                          ? "border-red-600 bg-red-50 text-red-700"
                          : "border-ink/10 bg-white text-ink opacity-50"
                  }`}
                >
                  <span className="w-5 shrink-0 font-serif text-lg font-normal text-ink/40">{String.fromCharCode(65 + i)}</span>
                  <span className="min-w-0 flex-1">{t(opt)}</span>
                  {state === "correct" && <Check size={18} className="shrink-0" />}
                  {state === "wrong" && <X size={18} className="shrink-0" />}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <div className="mt-5 animate-fade-up">
              <p className="border-l-4 border-sea-600 pl-4 text-[15px] leading-relaxed text-ink">{t(current.explain)}</p>
              <button
                onClick={() => {
                  setPicked(null);
                  setIndex((i) => i + 1);
                }}
                className="mt-5 bg-ink px-5 py-3 font-bold text-white hover:bg-kokum-600"
              >
                {index === questions.length - 1 ? t(copy.results) : t(copy.next)}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
