"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import type { L } from "@/lib/kb";
import {
  foodCautions,
  localFoods,
  myths,
  nutrientLabels,
  nutritionGuides,
  poshanTips,
  poshanWeek,
  stageLabels,
  stageOrder,
  type FoodCaution,
  type Stage,
} from "@/lib/poshan";

const copy = {
  eyebrow: { mr: "AADHI TI — पोषण", en: "AADHI TI — Nutrition", hi: "AADHI TI — पोषण" },
  title: { mr: "पोषण", en: "Nutrition", hi: "पोषण" },
  body: {
    mr: "तिच्या आयुष्याच्या प्रत्येक टप्प्यासाठी चांगलं अन्न — स्थानिक, परवडणाऱ्या पदार्थांतून.",
    en: "Good food for every stage of her life — from local, affordable ingredients.",
    hi: "उसकी ज़िंदगी के हर पड़ाव के लिए अच्छा खाना — स्थानीय, सस्ती चीज़ों से।",
  },
  plate: {
    grains: { mr: "धान्य", en: "Grains", hi: "अनाज" },
    dal: { mr: "डाळ", en: "Dal", hi: "दाल" },
    greens: { mr: "भाजी", en: "Greens", hi: "सब्ज़ी" },
    fruit: { mr: "फळ", en: "Fruit", hi: "फल" },
    curd: { mr: "दही", en: "Curd", hi: "दही" },
  },
  plateCaption: { mr: "रोजचं ताट: सगळ्या प्रकारचं थोडं थोडं.", en: "The everyday plate: a little of everything.", hi: "रोज़ की थाली: हर तरह का थोड़ा-थोड़ा।" },
  todayTip: { mr: "आजची टीप", en: "Today's tip", hi: "आज की टिप" },
  forWhom: { mr: "कोणासाठी?", en: "For whom?", hi: "किसके लिए?" },
  tryToday: { mr: "आज करून बघा", en: "Try today", hi: "आज करके देखें" },
  source: { mr: "स्रोत", en: "Source", hi: "स्रोत" },
  tipOf: { mr: "या टप्प्यासाठी टिपा", en: "tips for this stage", hi: "इस पड़ाव के लिए टिप्स" },
  next: { mr: "पुढची टीप", en: "Next tip", hi: "अगली टिप" },
  guides: { mr: "टप्प्यानुसार मार्गदर्शन", en: "Stage guides", hi: "पड़ाव के अनुसार मार्गदर्शन" },
  warning: { mr: "धोक्याची चिन्हं", en: "Warning signs", hi: "ख़तरे के संकेत" },
  mythsTitle: { mr: "गैरसमज आणि खरं", en: "Myths and facts", hi: "मिथक और सच" },
  myth: { mr: "गैरसमज", en: "Myth", hi: "मिथक" },
  fact: { mr: "खरं", en: "Fact", hi: "सच" },
  foodsTitle: { mr: "आपल्या इथले पौष्टिक पदार्थ", en: "Local foods", hi: "स्थानीय पौष्टिक चीज़ें" },
  foodsLede: {
    mr: "कोकणात सहज मिळणारे, स्वस्त आणि पौष्टिक. किंमती अंदाजे आहेत.",
    en: "Easy to find in the Konkan, cheap and nourishing. Prices are approximate.",
    hi: "कोंकण में आसानी से मिलने वाली, सस्ती और पौष्टिक चीज़ें। दाम अंदाज़न हैं।",
  },
  food: { mr: "पदार्थ", en: "Food", hi: "चीज़" },
  goodFor: { mr: "कशासाठी चांगलं", en: "Good for", hi: "किसके लिए अच्छा" },
  howToUse: { mr: "कसं वापरावं", en: "How to use", hi: "कैसे इस्तेमाल करें" },
  cost: { mr: "खर्च (अंदाजे)", en: "Cost (approx.)", hi: "ख़र्च (अंदाज़न)" },
  weekTitle: { mr: "या आठवड्याचं मार्गदर्शन", en: "This week's guide", hi: "इस हफ़्ते का मार्गदर्शन" },
  day: { mr: "दिवस", en: "Day", hi: "दिन" },
  today: { mr: "आज", en: "Today", hi: "आज" },
  cautionsTitle: { mr: "अन्नाबाबत काळजी", en: "Food cautions", hi: "खाने में सावधानी" },
  cautionsLede: {
    mr: "लहान मुलं आणि गरोदरपणासाठी काही महत्त्वाचे नियम.",
    en: "A few important rules for young children and pregnancy.",
    hi: "छोटे बच्चों और गर्भावस्था के लिए कुछ ज़रूरी नियम।",
  },
  pregnancy: { mr: "गरोदरपणात", en: "In pregnancy", hi: "गर्भावस्था में" },
  cook: { mr: "घरात जे आहे त्यातून स्वयंपाक करा", en: "Cook with what you have", hi: "घर में जो है उसी से खाना बनाएँ" },
  ask: { mr: "आरोग्याबद्दल AADHI TI ला विचारा", en: "Ask AADHI TI about health", hi: "सेहत के बारे में AADHI TI से पूछें" },
};

const disclaimer: L = {
  mr: "ही सर्वसाधारण पोषण माहिती आहे, वैद्यकीय सल्ला नाही. गरोदर महिला, बाळ किंवा आजारी मूल असेल तर आशा ताई, अंगणवाडी ताई किंवा डॉक्टरांना विचारा.",
  en: "General nutrition information, not medical advice. For a pregnant woman, a baby or a sick child, ask your ASHA worker, Anganwadi worker or doctor.",
  hi: "यह सामान्य पोषण जानकारी है, डॉक्टरी सलाह नहीं। गर्भवती महिला, शिशु या बीमार बच्चे के लिए आशा दीदी, आंगनवाड़ी दीदी या डॉक्टर से पूछें।",
};

const linkCls = "inline-flex items-center gap-2 font-bold text-kokum-600 underline decoration-kokum-200 underline-offset-4 hover:decoration-kokum-500";
const h2Cls = "font-serif text-2xl font-normal text-ink sm:text-3xl";
const kickerCls = "text-sm font-semibold tracking-wide text-sea-700";
const srcCls = "text-xs leading-relaxed text-ink-soft";

/** Days since epoch in local time — stable for the whole calendar day. */
function localDay(d: Date) {
  return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
}

function cautionLabel(c: FoodCaution): L {
  if (c.pregnancy) return copy.pregnancy;
  const m = c.underMonths ?? 0;
  if (m % 12 === 0) {
    const y = m / 12;
    return y === 1
      ? { mr: "1 वर्षाखालील बाळ", en: "Under 1 year", hi: "1 साल से छोटे" }
      : { mr: `${y} वर्षांखालील मुलं`, en: `Under ${y} years`, hi: `${y} साल से छोटे` };
  }
  return { mr: `${m} महिन्यांखालील`, en: `Under ${m} months`, hi: `${m} महीने से छोटे` };
}

export default function PoshanPage() {
  const { t, age } = useLang();
  const [stage, setStage] = useState<Stage>("woman");
  const [day, setDay] = useState<number | null>(null);
  const [offset, setOffset] = useState(0);

  // Date and saved age are only known on the client — read them after mount to avoid a hydration mismatch.
  useEffect(() => {
    setDay(localDay(new Date()));
  }, []);
  useEffect(() => {
    if (age === "girl") setStage("girl_10_18");
  }, [age]);

  const stageTips = useMemo(() => poshanTips.filter((tp) => tp.stages.includes(stage)), [stage]);
  const tipIndex = stageTips.length ? ((day ?? 0) + stageOrder.indexOf(stage) + offset) % stageTips.length : 0;
  const tip = stageTips[tipIndex];

  // Week guide: day 1 = Monday.
  const weekToday = day === null ? null : ((new Date().getDay() + 6) % 7) + 1;

  const [guideId, setGuideId] = useState(nutritionGuides[0].id);
  const guide = nutritionGuides.find((g) => g.id === guideId) ?? nutritionGuides[0];

  return (
    <div className="pb-6">
      {/* Opening */}
      <section className="grid gap-10 border-b border-ink/10 pt-10 pb-12 md:grid-cols-[1.25fr_1fr] md:items-center">
        <div className="min-w-0">
          <p className={kickerCls}>{t(copy.eyebrow)}</p>
          <h1 className="mt-3 font-serif text-[3rem] leading-[1] font-normal text-kokum-600 sm:text-[4.25rem]">{t(copy.title)}</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink">{t(copy.body)}</p>
        </div>
        <figure className="w-full md:max-w-[18rem] md:justify-self-end">
          <Plate t={t} />
          <figcaption className="mt-3 text-center text-sm text-ink-soft">{t(copy.plateCaption)}</figcaption>
        </figure>
      </section>

      {/* Today's tip */}
      <section className="border-b border-ink/10 py-12">
        <h2 className={h2Cls}>{t(copy.todayTip)}</h2>
        <p className="mt-6 text-sm font-bold text-ink-soft">{t(copy.forWhom)}</p>
        <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label={t(copy.forWhom)}>
          {stageOrder.map((s) => (
            <button
              key={s}
              role="radio"
              aria-checked={stage === s}
              onClick={() => {
                setStage(s);
                setOffset(0);
              }}
              className={`border-2 border-ink px-3 py-1.5 text-sm font-semibold transition ${
                stage === s ? "bg-ink text-white" : "bg-transparent text-ink hover:bg-sand-200"
              }`}
            >
              {t(stageLabels[s])}
            </button>
          ))}
        </div>

        {tip && (
          <article key={`${stage}-${tip.id}`} className="mt-8 max-w-3xl animate-fade-up border-t-2 border-ink pt-6">
            <p className="text-sm font-semibold text-sea-700">
              {t(stageLabels[stage])} · {tipIndex + 1}/{stageTips.length} {t(copy.tipOf)}
            </p>
            <h3 className="mt-2 font-serif text-3xl leading-tight font-normal text-kokum-600">{t(tip.title)}</h3>
            <p className="mt-4 text-lg leading-relaxed text-ink">{t(tip.body)}</p>
            <p className="mt-5 border-l-4 border-turmeric-400 pl-4 text-[16px] text-ink">
              <span className="font-bold">{t(copy.tryToday)}: </span>
              {t(tip.forMe)}
            </p>
            <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3">
              <p className={srcCls}>
                {t(copy.source)}: {tip.src}
              </p>
              {stageTips.length > 1 && (
                <button onClick={() => setOffset((o) => o + 1)} className={linkCls}>
                  {t(copy.next)} <ArrowRight size={16} />
                </button>
              )}
            </div>
          </article>
        )}
      </section>

      {/* Stage guides */}
      <section className="border-b border-ink/10 py-12">
        <h2 className={h2Cls}>{t(copy.guides)}</h2>
        <div className="no-scrollbar -mx-4 mt-6 overflow-x-auto border-b border-ink/15 px-4 sm:mx-0 sm:px-0" role="tablist">
          <div className="flex gap-6">
            {nutritionGuides.map((g) => (
              <button
                key={g.id}
                role="tab"
                aria-selected={guideId === g.id}
                onClick={() => setGuideId(g.id)}
                className={`-mb-px shrink-0 border-b-2 py-3 text-[15px] font-bold whitespace-nowrap transition ${
                  guideId === g.id ? "border-kokum-500 text-ink" : "border-transparent text-ink-soft hover:text-ink"
                }`}
              >
                {t(g.title)}
              </button>
            ))}
          </div>
        </div>

        <div key={guide.id} className="mt-8 max-w-3xl animate-fade-up">
          <p className="text-lg leading-relaxed text-ink">{t(guide.intro)}</p>
          <ol className="mt-6 border-t border-ink/15">
            {guide.cards.map((c, i) => (
              <li key={c.title.en} className="flex gap-4 border-b border-ink/15 py-5">
                <span className="w-7 shrink-0 font-serif text-2xl font-normal text-kokum-500 tabular-nums">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-xl font-normal text-ink">{t(c.title)}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink">{t(c.body)}</p>
                  <p className="mt-2 text-[15px] text-ink-soft">
                    <span className="font-bold text-leaf-700">{t(copy.tryToday)}: </span>
                    {t(c.forMe)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-6 border-2 border-kokum-500 p-4">
            <p className="text-sm font-bold text-kokum-700">{t(copy.warning)}</p>
            <p className="mt-1.5 leading-relaxed text-ink">{t(guide.warning)}</p>
          </div>
          <p className={`mt-4 ${srcCls}`}>
            {t(copy.source)}: {guide.src}
          </p>
        </div>
      </section>

      {/* Myths vs facts */}
      <section className="border-b border-ink/10 py-12">
        <h2 className={h2Cls}>{t(copy.mythsTitle)}</h2>
        <div className="mt-6 hidden border-b-2 border-ink pb-2 md:grid md:grid-cols-2 md:gap-8">
          <p className="text-sm font-bold text-kokum-600">{t(copy.myth)}</p>
          <p className="text-sm font-bold text-leaf-700">{t(copy.fact)}</p>
        </div>
        <ul className="mt-6 border-t-2 border-ink md:mt-0 md:border-t-0">
          {myths.map((m) => (
            <li key={m.id} className="grid gap-3 border-b border-ink/15 py-5 md:grid-cols-2 md:gap-8">
              <div className="min-w-0">
                <p className="text-xs font-bold tracking-wide text-kokum-600 uppercase md:hidden">{t(copy.myth)}</p>
                <p className="font-serif text-xl leading-snug font-normal text-ink-soft line-through decoration-kokum-300 decoration-1">{t(m.myth)}</p>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold tracking-wide text-leaf-700 uppercase md:hidden">{t(copy.fact)}</p>
                <p className="leading-relaxed text-ink">{t(m.fact)}</p>
                <p className="mt-2 text-[15px] text-ink-soft">
                  <span className="font-bold text-leaf-700">{t(copy.tryToday)}: </span>
                  {t(m.forMe)}
                </p>
                <p className={`mt-2 ${srcCls}`}>
                  {t(copy.source)}: {m.src}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Local foods */}
      <section className="border-b border-ink/10 py-12">
        <h2 className={h2Cls}>{t(copy.foodsTitle)}</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">{t(copy.foodsLede)}</p>
        <div className="mt-6 hidden border-b-2 border-ink pb-2 text-sm font-bold text-ink-soft lg:grid lg:grid-cols-[11rem_1fr_1fr_12rem] lg:gap-6">
          <span>{t(copy.food)}</span>
          <span>{t(copy.goodFor)}</span>
          <span>{t(copy.howToUse)}</span>
          <span>{t(copy.cost)}</span>
        </div>
        <ul className="mt-6 border-t-2 border-ink lg:mt-0 lg:border-t-0">
          {localFoods.map((f) => (
            <li key={f.id} className="grid gap-2 border-b border-ink/15 py-5 lg:grid-cols-[11rem_1fr_1fr_12rem] lg:gap-6">
              <div className="min-w-0">
                <h3 className="font-serif text-xl font-normal text-kokum-600">{t(f.name)}</h3>
                <p className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-xs font-bold text-sea-700">
                  {f.highlights.map((h) => (
                    <span key={h} className="border border-sea-700/40 px-1.5 py-0.5">
                      {t(nutrientLabels[h])}
                    </span>
                  ))}
                </p>
              </div>
              <p className="min-w-0 leading-relaxed text-ink">
                <span className="font-bold lg:hidden">{t(copy.goodFor)}: </span>
                {t(f.why)}
              </p>
              <p className="min-w-0 leading-relaxed text-ink">
                <span className="font-bold lg:hidden">{t(copy.howToUse)}: </span>
                {t(f.howToUse)}
              </p>
              <div className="min-w-0 text-[15px] leading-relaxed text-ink-soft">
                <p>{t(f.costNote)}</p>
                {f.season && <p className="mt-1 text-leaf-700">{t(f.season)}</p>}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* This week's guide */}
      <section className="border-b border-ink/10 py-12">
        <h2 className={h2Cls}>{t(copy.weekTitle)}</h2>
        <ol className="mt-6 max-w-3xl border-t-2 border-ink">
          {poshanWeek.map((d) => {
            const isToday = weekToday === d.day;
            return (
              <li key={d.day} className={`flex gap-4 border-b border-ink/15 py-5 ${isToday ? "bg-turmeric-50" : ""}`}>
                <div className="w-14 shrink-0 text-center">
                  <p className="text-xs font-bold text-ink-soft">{t(copy.day)}</p>
                  <p className={`font-serif text-3xl leading-none font-normal tabular-nums ${isToday ? "text-kokum-600" : "text-ink"}`}>{d.day}</p>
                  {isToday && <p className="mt-1 text-xs font-bold text-kokum-600">{t(copy.today)}</p>}
                </div>
                <div className="min-w-0 flex-1 pr-2">
                  <h3 className="font-serif text-xl font-normal text-ink">{t(d.theme)}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink">{t(d.action)}</p>
                  <p className="mt-1.5 text-[15px] text-ink-soft">{t(d.food)}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Food cautions */}
      <section className="border-b border-ink/10 py-12">
        <h2 className={h2Cls}>{t(copy.cautionsTitle)}</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">{t(copy.cautionsLede)}</p>
        <ul className="mt-6 max-w-3xl border-2 border-ink">
          {foodCautions.map((c) => (
            <li key={c.id} className="grid gap-1 border-b border-ink/15 px-4 py-4 last:border-b-0 sm:grid-cols-[10rem_1fr] sm:gap-4">
              <p className="text-sm font-bold text-kokum-600">{t(cautionLabel(c))}</p>
              <p className="min-w-0 leading-relaxed text-ink">{t(c.text)}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer note */}
      <section className="py-12">
        <div className="max-w-3xl space-y-2 border-l-4 border-sea-600 pl-4 text-[15px] leading-relaxed text-ink">
          <p lang="mr">{disclaimer.mr}</p>
          <p lang="en">{disclaimer.en}</p>
          <p lang="hi">{disclaimer.hi}</p>
        </div>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-8">
          <Link href="/everyday" className={linkCls}>
            {t(copy.cook)} <ArrowRight size={16} />
          </Link>
          <Link href="/chat?cat=health" className={linkCls}>
            {t(copy.ask)} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

/** A line-drawn thali: bhakri, rice and three katoris — the Poshan page opening. */
function Plate({ t }: { t: (l: L) => string }) {
  const p = copy.plate;
  return (
    <div className="mx-auto w-full max-w-[14rem] sm:max-w-[17rem]">
      <svg viewBox="0 0 240 240" aria-hidden className="w-full">
        <circle cx="120" cy="120" r="112" fill="none" className="stroke-ink" strokeWidth="2" />
        <circle cx="120" cy="120" r="100" fill="none" className="stroke-ink/25" strokeWidth="1" />
        {/* katoris */}
        <circle cx="78" cy="72" r="28" fill="none" className="stroke-turmeric-500" strokeWidth="2.5" />
        <circle cx="146" cy="60" r="24" fill="none" className="stroke-leaf-600" strokeWidth="2.5" />
        <circle cx="178" cy="112" r="22" fill="none" className="stroke-ink/40" strokeWidth="2.5" />
        {/* bhakri */}
        <circle cx="96" cy="152" r="40" fill="none" className="stroke-sea-600" strokeWidth="2.5" />
        <path d="M70 146 q26 -10 52 0 M74 162 q22 8 44 0" fill="none" className="stroke-sea-600/50" strokeWidth="1.5" strokeLinecap="round" />
        {/* fruit */}
        <path d="M160 168 a16 16 0 1 0 0.1 0" fill="none" className="stroke-kokum-600" strokeWidth="2.5" />
        <path d="M160 168 l4 -10" className="stroke-leaf-600" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <ul aria-hidden className="mt-3 grid grid-cols-3 gap-x-3 gap-y-1 border-t border-ink/15 pt-3 text-sm text-ink">
        <li className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 shrink-0 bg-turmeric-500" />{t(p.dal)}</li>
        <li className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 shrink-0 bg-leaf-600" />{t(p.greens)}</li>
        <li className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 shrink-0 bg-ink/40" />{t(p.curd)}</li>
        <li className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 shrink-0 bg-sea-600" />{t(p.grains)}</li>
        <li className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 shrink-0 bg-kokum-600" />{t(p.fruit)}</li>
      </ul>
    </div>
  );
}
