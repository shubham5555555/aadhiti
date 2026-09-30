"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { ageLabels } from "@/lib/ui";
import type { AgeGroup, L } from "@/lib/kb";
import {
  CHILD_BANDS,
  TALUKAS,
  type AnswerMode,
  type ChildBand,
  type LifeStage,
  type Profile,
} from "@/lib/profile";

const copy = {
  step: { mr: "पायरी", en: "Step", hi: "चरण" },
  of: { mr: "पैकी", en: "of", hi: "में से" },
  intro: {
    mr: "सुरू करण्याआधी थोडी माहिती. यामुळे उत्तरं तुमच्या वयाला, गावाला आणि घराला साजेशी येतात. एक मिनिट लागेल.",
    en: "A little about you before we start, so answers fit your age, your area and your home. It takes a minute.",
    hi: "शुरू करने से पहले थोड़ी जानकारी, ताकि जवाब आपकी उम्र, इलाके और घर के हिसाब से हों। एक मिनट लगेगा।",
  },
  s1: {
    mr: "तुमच्याबद्दल थोडं",
    en: "A little about you",
    hi: "आपके बारे में थोड़ा",
  },
  age: { mr: "तुमचा वयोगट", en: "Your age group", hi: "आपका आयु वर्ग" },
  ageNote: {
    mr: "उत्तरं वयानुसार बदलतात. 13 वर्षांच्या मुलीला आणि 35 वर्षांच्या महिलेला वेगळं मार्गदर्शन मिळतं.",
    en: "Answers change with age. A 13-year-old and a 35-year-old get different advice.",
    hi: "जवाब उम्र के हिसाब से बदलते हैं। 13 साल की लड़की और 35 साल की महिला को अलग सलाह मिलती है।",
  },
  taluka: {
    mr: "तुमचा तालुका (रायगड जिल्हा)",
    en: "Your taluka (Raigad district)",
    hi: "आपका तालुका (रायगड ज़िला)",
  },
  name: {
    mr: "नाव (हवं असेल तर)",
    en: "Your name (optional)",
    hi: "नाम (चाहें तो)",
  },
  namePh: { mr: "उदा. सुनीता", en: "e.g. Sunita", hi: "जैसे सुनीता" },
  nameNote: {
    mr: "नाव फक्त या फोनवर राहतं. कुठेही पाठवलं जात नाही.",
    en: "Your name stays on this phone. It is never sent anywhere.",
    hi: "नाम सिर्फ़ इस फ़ोन पर रहता है। कहीं भेजा नहीं जाता।",
  },
  s2: { mr: "तुमचं घर", en: "Your home", hi: "आपका घर" },
  s2Note: {
    mr: "यावरून योजना, आरोग्य आणि पोषणाची माहिती तुमच्यासाठी निवडली जाते.",
    en: "This helps pick schemes, health and nutrition advice for you.",
    hi: "इससे योजनाएँ, सेहत और पोषण की जानकारी आपके लिए चुनी जाती है।",
  },
  now: { mr: "मी सध्या", en: "Right now I am", hi: "मैं अभी" },
  month: { mr: "कितवा महिना?", en: "Which month?", hi: "कौन-सा महीना?" },
  kids: {
    mr: "घरातली मुलं (असतील तर)",
    en: "Children at home (if any)",
    hi: "घर में बच्चे (अगर हैं)",
  },
  s3: {
    mr: "उत्तर कसं हवं?",
    en: "How should answers come?",
    hi: "जवाब कैसे चाहिए?",
  },
  remember: {
    mr: "माझं संभाषण या फोनवर लक्षात ठेवा (नंतर बंद करता येईल)",
    en: "Remember my conversations on this phone (you can turn this off later)",
    hi: "मेरी बातचीत इस फ़ोन पर याद रखें (बाद में बंद कर सकती हैं)",
  },
  rememberNote: {
    mr: "फोन दुसरं कोणी वापरत असेल तर हे बंद ठेवा.",
    en: "Leave this off if someone else uses your phone.",
    hi: "अगर फ़ोन कोई और भी इस्तेमाल करता है तो इसे बंद रखें।",
  },
  guest: {
    mr: "फोन नंबर, OTP किंवा खातं लागत नाही. सगळी माहिती फक्त या फोनवर राहते.",
    en: "No phone number, OTP or account. Everything stays on this phone.",
    hi: "फ़ोन नंबर, OTP या खाता नहीं चाहिए। सारी जानकारी सिर्फ़ इस फ़ोन पर रहती है।",
  },
  next: { mr: "पुढे", en: "Next", hi: "आगे" },
  back: { mr: "मागे", en: "Back", hi: "पीछे" },
  start: { mr: "सुरू करा", en: "Start", hi: "शुरू करें" },
  save: { mr: "जतन करा", en: "Save", hi: "सेव करें" },
  skip: {
    mr: "आत्ता नको, थेट विचारा",
    en: "Skip for now, just ask",
    hi: "अभी नहीं, सीधे पूछें",
  },
  needAge: {
    mr: "पुढे जाण्यासाठी वयोगट निवडा.",
    en: "Choose an age group to continue.",
    hi: "आगे बढ़ने के लिए आयु वर्ग चुनें।",
  },
  urgent: {
    mr: "आत्ता धोक्यात आहात?",
    en: "In danger right now?",
    hi: "अभी खतरे में हैं?",
  },
  urgentBody: {
    mr: "हे सगळं सोडा आणि 112 वर कॉल करा.",
    en: "Skip all this and call 112.",
    hi: "यह सब छोड़िए और 112 पर कॉल करें।",
  },
};

const stages: { id: LifeStage; label: L }[] = [
  {
    id: "pregnant",
    label: { mr: "गरोदर आहे", en: "Pregnant", hi: "गर्भवती हूँ" },
  },
  {
    id: "breastfeeding",
    label: {
      mr: "बाळाला दूध पाजते",
      en: "Breastfeeding",
      hi: "शिशु को दूध पिलाती हूँ",
    },
  },
  {
    id: "none",
    label: { mr: "यापैकी नाही", en: "Neither", hi: "इनमें से नहीं" },
  },
];

const modes: { id: AnswerMode; label: L; note: L }[] = [
  {
    id: "text",
    label: { mr: "लिहून", en: "Text", hi: "लिखकर" },
    note: { mr: "वाचायला", en: "To read", hi: "पढ़ने के लिए" },
  },
  {
    id: "voice",
    label: { mr: "आवाजात", en: "Voice", hi: "आवाज़ में" },
    note: {
      mr: "उत्तर मोठ्याने ऐकवलं जातं",
      en: "Answers are read aloud",
      hi: "जवाब बोलकर सुनाए जाते हैं",
    },
  },
  {
    id: "both",
    label: { mr: "दोन्ही", en: "Both", hi: "दोनों" },
    note: { mr: "वाचा आणि ऐका", en: "Read and listen", hi: "पढ़ें और सुनें" },
  },
];

const chip = (on: boolean) =>
  `${on ? "soft-chip-on" : "soft-chip"} py-2 font-bold`;

export default function Onboarding({
  initial,
  editing,
  onDone,
}: {
  initial: Profile;
  editing?: boolean;
  onDone: (p: Profile) => void;
}) {
  const { t, setAge } = useLang();
  const [p, setP] = useState<Profile>(initial);
  const [step, setStep] = useState(0);
  const [tried, setTried] = useState(false);
  const set = (patch: Partial<Profile>) => setP((x) => ({ ...x, ...patch }));

  const finish = (skip = false) => {
    const done: Profile = skip
      ? { ...initial, age: p.age ?? initial.age, onboarded: true }
      : {
          ...p,
          name: p.name.trim().slice(0, 40),
          onboarded: true,
          // Pregnancy and children questions aren't asked of girls.
          ...(p.age === "girl"
            ? { stage: "none" as const, month: null, children: [] }
            : {}),
        };
    if (done.age) setAge(done.age);
    onDone(done);
  };

  const next = () => {
    if (step === 0 && !p.age) return setTried(true);
    if (step < 2) setStep(step + 1);
    else finish();
  };

  const toggleChild = (c: ChildBand) =>
    set({
      children: p.children.includes(c)
        ? p.children.filter((x) => x !== c)
        : [...p.children, c],
    });
  const girl = p.age === "girl";

  return (
    <div className="mx-auto max-w-xl animate-fade-up">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-bold text-kokum-600">
          {t(copy.step)} {step + 1} {t(copy.of)} 3
        </p>
        <div className="flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-2 w-8 rounded-full transition ${i <= step ? "bg-kokum-600" : "bg-kokum-100"}`}
            />
          ))}
        </div>
      </div>
      {step === 0 && !editing && (
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
          {t(copy.intro)}
        </p>
      )}

      <div className="soft-card mt-5 p-5 sm:p-7">
        {step === 0 && (
          <div className="space-y-6">
            <h2 className="font-serif text-[1.9rem] leading-tight text-kokum-600">
              {t(copy.s1)}
            </h2>
            <fieldset>
              <legend className="text-sm font-bold text-ink">
                {t(copy.age)}
              </legend>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {(Object.keys(ageLabels) as AgeGroup[]).map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => set({ age: a })}
                    aria-pressed={p.age === a}
                    className={chip(p.age === a)}
                  >
                    {t(ageLabels[a])}
                  </button>
                ))}
              </div>
              <p
                className={`mt-2 text-[13px] ${tried && !p.age ? "font-bold text-red-700" : "text-ink-soft"}`}
              >
                {tried && !p.age ? t(copy.needAge) : t(copy.ageNote)}
              </p>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-bold text-ink">
                {t(copy.taluka)}
              </legend>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {TALUKAS.map((tk) => (
                  <button
                    key={tk.id}
                    type="button"
                    onClick={() => set({ taluka: tk.id })}
                    aria-pressed={p.taluka === tk.id}
                    className={chip(p.taluka === tk.id)}
                  >
                    {t(tk.name)}
                  </button>
                ))}
              </div>
            </fieldset>
            <label className="block text-sm font-bold text-ink">
              {t(copy.name)}
              <input
                value={p.name}
                onChange={(e) => set({ name: e.target.value })}
                placeholder={t(copy.namePh)}
                autoComplete="off"
                maxLength={40}
                className="soft-input mt-2 w-full font-medium"
              />
              <span className="mt-1.5 block text-[13px] font-normal text-ink-soft">
                {t(copy.nameNote)}
              </span>
            </label>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-[1.9rem] leading-tight text-kokum-600">
                {t(copy.s2)}
              </h2>
              <p className="mt-1 text-[15px] text-ink-soft">{t(copy.s2Note)}</p>
            </div>
            {!girl && (
              <fieldset>
                <legend className="text-sm font-bold text-ink">
                  {t(copy.now)}
                </legend>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {stages.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() =>
                        set({
                          stage: s.id,
                          month: s.id === "pregnant" ? (p.month ?? 5) : null,
                        })
                      }
                      aria-pressed={p.stage === s.id}
                      className={chip(p.stage === s.id)}
                    >
                      {t(s.label)}
                    </button>
                  ))}
                </div>
                {p.stage === "pregnant" && (
                  <div className="mt-3">
                    <p className="text-[13px] font-bold text-ink-soft">
                      {t(copy.month)}
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => set({ month: m })}
                          aria-pressed={p.month === m}
                          className={`${chip(p.month === m)} w-10 justify-center px-0`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </fieldset>
            )}
            {!girl && (
              <fieldset>
                <legend className="text-sm font-bold text-ink">
                  {t(copy.kids)}
                </legend>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {CHILD_BANDS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggleChild(c.id)}
                      aria-pressed={p.children.includes(c.id)}
                      className={chip(p.children.includes(c.id))}
                    >
                      {t(c.label)}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}
            {girl && (
              <p className="rounded-2xl border border-kokum-100 bg-kokum-50 px-4 py-3 text-[15px] text-ink">
                {t({
                  mr: "तुमच्यासाठी मुलींचा विभाग उघडेल: शाळा, शरीरातले बदल, ऑनलाइन सुरक्षा. काही चुकीचं घडत असेल तर 1098 मोफत आहे.",
                  en: "You'll get the girls' section: school, body changes, staying safe online. If something is wrong, 1098 is free.",
                  hi: "आपके लिए लड़कियों का सेक्शन खुलेगा: स्कूल, शरीर के बदलाव, ऑनलाइन सुरक्षा। कुछ गलत हो तो 1098 मुफ़्त है।",
                })}
              </p>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="font-serif text-[1.9rem] leading-tight text-kokum-600">
              {t(copy.s3)}
            </h2>
            <div className="grid grid-cols-3 gap-2" role="radiogroup">
              {modes.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  role="radio"
                  aria-checked={p.answerMode === m.id}
                  onClick={() => set({ answerMode: m.id })}
                  className={`min-w-0 rounded-2xl border px-2 py-3 text-center transition ${p.answerMode === m.id ? "border-kokum-700 bg-kokum-700 text-white shadow-[0_10px_22px_-12px_rgba(126,23,56,0.8)]" : "border-kokum-100 bg-white text-ink hover:border-kokum-300 hover:bg-kokum-50"}`}
                >
                  <span className="block font-bold">{t(m.label)}</span>
                  <span
                    className={`mt-0.5 block text-[12px] ${p.answerMode === m.id ? "text-white/75" : "text-ink-soft"}`}
                  >
                    {t(m.note)}
                  </span>
                </button>
              ))}
            </div>
            <label className="flex cursor-pointer gap-3 text-[15px] text-ink">
              <input
                type="checkbox"
                checked={p.remember}
                onChange={(e) => set({ remember: e.target.checked })}
                className="mt-1 h-4 w-4 shrink-0 accent-kokum-600"
              />
              <span>
                {t(copy.remember)}
                <span className="mt-0.5 block text-[13px] text-ink-soft">
                  {t(copy.rememberNote)}
                </span>
              </span>
            </label>
            <p className="flex gap-2 border-t border-kokum-100 pt-4 text-[13px] leading-relaxed text-ink-soft">
              <Lock size={14} className="mt-0.5 shrink-0 text-sea-600" />{" "}
              {t(copy.guest)}
            </p>
          </div>
        )}

        <div className="mt-7 flex items-center gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="soft-btn-outline px-5 py-2.5"
            >
              <ArrowLeft size={17} /> {t(copy.back)}
            </button>
          )}
          <button type="button" onClick={next} className="soft-btn flex-1 px-5">
            {step < 2 ? t(copy.next) : editing ? t(copy.save) : t(copy.start)}{" "}
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        {!editing ? (
          <button
            type="button"
            onClick={() => finish(true)}
            className="text-sm font-semibold text-ink-soft underline decoration-kokum-200 underline-offset-4 hover:text-kokum-700"
          >
            {t(copy.skip)}
          </button>
        ) : (
          <span />
        )}
        <a
          href="tel:112"
          className="inline-flex items-center gap-2 text-sm font-bold text-red-700"
        >
          {t(copy.urgent)}{" "}
          <span className="rounded-full bg-red-600 px-3 py-0.5 text-white">
            112
          </span>
        </a>
      </div>
    </div>
  );
}
