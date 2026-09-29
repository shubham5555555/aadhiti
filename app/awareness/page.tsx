"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AlertTriangle, ArrowRight, Search, X } from "lucide-react";
import CategoryIcon from "@/components/CategoryIcon";
import Quiz from "@/components/Quiz";
import { WarliLearn } from "@/components/WarliArt";
import { useLang } from "@/lib/i18n";
import { adultCategories, allTopics, categoryGroups, girlCategories, type Category, type Topic } from "@/lib/kb";

const copy = {
  eyebrow: { mr: "AADHI TI माहिती", en: "AADHI TI Knowledge", hi: "AADHI TI जानकारी" },
  title: { mr: "जास्त जाणून घ्या. कमी घाबरा.", en: "Know more. Fear less.", hi: "ज़्यादा जानें। कम डरें।" },
  body: {
    mr: "प्रत्येक विषय — समजून घेणं, उत्तर आणि पुढचं पाऊल. कोणताही विषय दाबा, AADHI TI लगेच समजावेल.",
    en: "Every topic — understand, answer, next step. Tap any topic and AADHI TI will explain it right away.",
    hi: "हर विषय — समझना, जवाब और अगला कदम। कोई भी विषय दबाइए, AADHI TI तुरंत समझाएगी।",
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
      <section className="grid gap-10 border-b border-ink/10 pt-10 pb-12 md:grid-cols-[1.25fr_1fr] md:items-center">
        <div>
          <p className="text-sm font-semibold tracking-wide text-sea-700">{t(copy.eyebrow)}</p>
          <h1 className="mt-3 font-serif text-[3rem] leading-[1] font-normal text-kokum-600 sm:text-[4.25rem]">{t(copy.title)}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink">{t(copy.body)}</p>

          <div className="mt-8 flex max-w-xl items-stretch border-2 border-ink bg-white">
            <span className="grid w-11 shrink-0 place-items-center text-ink-soft">
              <Search size={18} />
            </span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t(copy.search)}
              aria-label={t(copy.search)}
              className="min-w-0 flex-1 bg-transparent py-3.5 pr-2 text-[16px] outline-none placeholder:text-ink-soft/60"
            />
            {q && (
              <button onClick={() => setQ("")} className="grid w-11 shrink-0 place-items-center border-l-2 border-ink text-ink hover:bg-sand-100" aria-label="Clear">
                <X size={17} />
              </button>
            )}
          </div>
        </div>

        <figure className="mx-auto w-full max-w-[14rem] md:max-w-[20rem]">
          <WarliLearn className="w-full text-sea-700" />
        </figure>
      </section>

      {matches ? (
        <section className="border-b border-ink/10 py-10">
          <p className="text-sm font-bold text-ink-soft">
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
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-8" role="tablist">
            {(["women", "girls"] as const).map((k) => (
              <button
                key={k}
                role="tab"
                aria-selected={tab === k}
                onClick={() => setTab(k)}
                className={`border-b-2 pb-1 text-[15px] font-bold transition ${tab === k ? "border-kokum-500 text-ink" : "border-transparent text-ink-soft hover:text-ink"}`}
              >
                {t(copy[k])}
              </button>
            ))}
          </div>

          <div key={tab} className="mt-6 grid animate-fade-up border-t border-ink/15 md:grid-cols-2">
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
  const right = index % 2 === 1;
  return (
    <section
      id={cat.id}
      className={`scroll-mt-28 border-b border-ink/15 py-9 ${right ? "md:border-l md:pl-8" : "md:pr-8"}`}
    >
      <div className="flex items-start gap-4">
        <span className="w-8 shrink-0 pt-1 font-serif text-2xl font-normal text-kokum-500 tabular-nums">{index + 1}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5">
            <CategoryIcon icon={cat.icon} size={20} className="shrink-0 text-sea-600" />
            <h2 className="font-serif text-2xl font-normal text-ink">{t(cat.title)}</h2>
          </div>
          <p className="mt-1 text-[15px] text-ink-soft">
            {t(cat.subtitle)} · {count} {t(copy.topics)}
          </p>
        </div>
      </div>
      <div className="mt-5 space-y-6 sm:pl-12">
        {groups.map((g) => (
          <div key={g.title.en}>
            <p className="text-sm font-bold text-ink-soft">{t(g.title)}</p>
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
    <ul className="border-t border-ink/15">
      {topics.map((tp) => (
        <li key={tp.id} className="border-b border-ink/15">
          <Link href={`/chat?topic=${tp.id}`} className="group flex items-center gap-3 py-2.5">
            {tp.emergency && <AlertTriangle size={14} className="shrink-0 text-red-600" />}
            <span className={`min-w-0 flex-1 font-semibold ${tp.emergency ? "text-red-700" : "text-ink group-hover:text-kokum-600"}`}>{t(tp.title)}</span>
            <ArrowRight size={16} className="shrink-0 text-ink/25 transition group-hover:translate-x-1 group-hover:text-kokum-600" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
