"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AlertTriangle, ArrowRight, BookOpen, ChevronRight, Search, X } from "lucide-react";
import CategoryIcon from "@/components/CategoryIcon";
import Quiz from "@/components/Quiz";
import { BigFigure } from "@/components/PageArt";
import Leaf from "@/components/Leaf";
import { useLang } from "@/lib/i18n";
import { adultCategories, allTopics, categoryGroups, girlCategories, type Category, type Topic } from "@/lib/kb";

const copy = {
  figureCaption: {
    mr: "विषय - मराठी, हिंदी आणि English मध्ये. प्रत्येक प्रश्नाचं उत्तर तीन भागांत.",
    en: "topics in Marathi, Hindi and English. Every answer has three parts.",
    hi: "विषय — मराठी, हिंदी और अंग्रेज़ी में। हर सवाल का जवाब तीन हिस्सों में।",
  },
  eyebrow: { mr: "AADHI TI माहिती", en: "AADHI TI Knowledge", hi: "AADHI TI जानकारी" },
  title: { mr: "जाणून घ्या, सजग राहा, निर्भय व्हा.", en: "Be informed. Stay aware. Feel confident.", hi: "जानें, सजग रहें, निडर बनें।" },
  body: {
    mr: "कोणताही विषय — समजून घ्या, उत्तर मिळवा आणि पुढचं पाऊल जाणून घ्या. काहीही विचारा, ‘आधी ती’ लगेच समजावून सांगेल.",
    en: "Choose any topic — understand it, get an answer and learn the next step. Ask anything and AADHI TI will explain.",
    hi: "कोई भी विषय — समझें, जवाब पाएँ और अगला कदम जानें। कुछ भी पूछें, ‘आधी ती’ सरल भाषा में समझाएगी।",
  },
  search: { mr: "विषय शोधा… उदा. पाळी, PCOS, OTP, लाडकी बहीण", en: "Search topics… e.g. periods, PCOS, OTP, Ladki Bahin", hi: "विषय खोजें… जैसे पीरियड्स, PCOS, OTP, लाडकी बहीण" },
  results: { mr: "शोध निकाल", en: "Search results", hi: "खोज परिणाम" },
  none: { mr: "काही सापडलं नाही. AADHI TI ला थेट विचारा.", en: "Nothing found. Ask AADHI TI directly.", hi: "कुछ नहीं मिला। AADHI TI से सीधे पूछें।" },
  women: { mr: "महिलांसाठी", en: "For women", hi: "महिलाओं के लिए" },
  girls: { mr: "मुलींसाठी (10–18)", en: "For girls (10–18)", hi: "लड़कियों के लिए (10–18)" },
  topics: { mr: "विषय", en: "topics", hi: "विषय" },
};

const linkCls = "inline-flex items-center gap-2 font-bold text-kokum-600 underline decoration-kokum-200 underline-offset-4 hover:decoration-kokum-500";

export default function KnowledgePage() {
  const { t } = useLang();
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<"women" | "girls">("women");

  const matches = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (query.length < 2) return null;
    return allTopics.filter(
      (tp) => tp.id !== "everyday" && [tp.title.mr, tp.title.en, tp.title.hi, ...tp.keywords].some((s) => s.toLowerCase().includes(query))
    );
  }, [q]);

  const cats = (tab === "women" ? adultCategories : girlCategories).filter((c) => c.groups.length > 0);

  return (
    <div className="pb-6">
      {/* Opening */}
      <section className="relative mt-6 grid gap-8 overflow-hidden rounded-3xl border border-kokum-100 bg-gradient-to-br from-kokum-50 via-sand-50 to-white p-6 shadow-[0_10px_30px_-18px_rgba(126,23,56,0.35)] sm:p-10 md:grid-cols-[1.25fr_1fr] md:items-center">
        <Leaf className="absolute -top-4 -right-6 h-44 w-auto text-kokum-200" />
        <div className="relative">
          <p className="text-sm font-semibold tracking-wide text-kokum-500">{t(copy.eyebrow)}</p>
          <h1 className="mt-3 font-serif text-[2.6rem] leading-[1.05] font-normal text-kokum-700 sm:text-[4rem]">{t(copy.title)}</h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft">{t(copy.body)}</p>

          <div className="relative mt-7 max-w-xl">
            <Search size={18} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-kokum-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t(copy.search)}
              aria-label={t(copy.search)}
              className="soft-input w-full pr-12 pl-11"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute top-1/2 right-2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-kokum-50 text-kokum-700 hover:bg-kokum-100"
                aria-label="Clear"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <figure className="relative w-full rounded-3xl border border-kokum-100 bg-white/80 p-5 md:max-w-[18rem] md:justify-self-end">
          <BigFigure value={String(allTopics.filter((tp) => tp.id !== "everyday").length)} caption={t(copy.figureCaption)} className="!border-0 !pt-0 text-kokum-600" />
        </figure>
      </section>

      {matches ? (
        <section className="py-10">
          <p className="text-sm font-bold text-kokum-600">
            {t(copy.results)} · {matches.length}
          </p>
          {matches.length === 0 ? (
            <Link href="/chat" className={`mt-4 ${linkCls}`}>
              {t(copy.none)} <ArrowRight size={16} />
            </Link>
          ) : (
            <div className="mt-3 max-w-3xl">
              <TopicList topics={matches} />
            </div>
          )}
        </section>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 pt-8" role="tablist">
            {(["women", "girls"] as const).map((k) => (
              <button
                key={k}
                role="tab"
                aria-selected={tab === k}
                onClick={() => setTab(k)}
                className={tab === k ? "soft-chip-on" : "soft-chip"}
              >
                {t(copy[k])}
              </button>
            ))}
          </div>

          <div key={tab} className="mt-6 grid animate-fade-up gap-5 md:grid-cols-2">
            {cats.map((c, i) => (
              <CategoryBlock key={c.id} cat={c} girls={tab === "girls"} index={i} />
            ))}
          </div>
        </>
      )}

      <Quiz />
    </div>
  );
}

function CategoryBlock({ cat, girls, index }: { cat: Category; girls: boolean; index: number }) {
  const { t } = useLang();
  // Show every topic in the category regardless of the viewer's own age setting.
  const groups = categoryGroups(cat, girls ? "girl" : null);
  const count = groups.reduce((n, g) => n + g.topics.length, 0);
  return (
    <section id={cat.id} className="soft-card scroll-mt-28 p-5 sm:p-6">
      <div className="flex items-start gap-3.5">
        <span className="icon-circle">
          <CategoryIcon icon={cat.icon} size={20} className="shrink-0" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg font-normal text-kokum-300 tabular-nums">{index + 1}</span>
            <h2 className="font-serif text-2xl font-normal text-kokum-700">{t(cat.title)}</h2>
          </div>
          <p className="mt-1 text-[15px] text-ink-soft">
            {t(cat.subtitle)} · {count} {t(copy.topics)}
          </p>
        </div>
      </div>
      <div className="mt-5 space-y-5">
        {groups.map((g) => (
          <div key={g.title.en}>
            <p className="text-xs font-bold tracking-wide text-kokum-500 uppercase">{t(g.title)}</p>
            <div className="mt-1.5">
              <TopicList topics={g.topics} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TopicList({ topics }: { topics: Topic[] }) {
  const { t } = useLang();
  return (
    <ul className="space-y-2">
      {topics.map((tp) => (
        <li key={tp.id}>
          <Link href={`/chat?topic=${tp.id}`} className={`soft-list-item group !p-2.5 ${tp.emergency ? "!border-red-200 !bg-red-50/60" : ""}`}>
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${tp.emergency ? "bg-red-100 text-red-600" : "bg-kokum-50 text-kokum-600"}`}>
              {tp.emergency ? <AlertTriangle size={15} /> : <BookOpen size={15} />}
            </span>
            <span className={`min-w-0 flex-1 text-[15px] font-semibold ${tp.emergency ? "text-red-700" : "text-ink group-hover:text-kokum-700"}`}>{t(tp.title)}</span>
            <ChevronRight size={18} className="shrink-0 text-kokum-300 transition group-hover:translate-x-0.5 group-hover:text-kokum-600" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
