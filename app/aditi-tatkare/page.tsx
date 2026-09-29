"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { initiatives, journey, leader } from "@/lib/leader";

const copy = {
  eyebrow: { mr: "या उपक्रमामागे", en: "Behind this initiative", hi: "इस पहल के पीछे" },
  initiativesTitle: { mr: "महिला आणि मुलांसाठी त्यांचे पुढाकार", en: "Her initiatives for women and children", hi: "महिलाओं और बच्चों के लिए उनकी पहल" },
  initiativesNote: {
    mr: "प्रत्येक पुढाकाराची माहिती AADHI TI मध्ये मिळते.",
    en: "You can find out about each of these inside AADHI TI.",
    hi: "हर पहल की जानकारी AADHI TI में मिलती है।",
  },
  journeyTitle: { mr: "प्रवास", en: "Her journey", hi: "सफ़र" },
  back: { mr: "AADHI TI ला प्रश्न विचारा", en: "Ask AADHI TI a question", hi: "AADHI TI से सवाल पूछें" },
  sources: {
    mr: "माहिती: सार्वजनिक स्रोत आणि महिला व बालविकास विभागाची आकडेवारी.",
    en: "Information from public sources and Women & Child Development Department figures.",
    hi: "जानकारी: सार्वजनिक स्रोत और महिला एवं बाल विकास विभाग के आँकड़े।",
  },
};

export default function AditiTatkarePage() {
  const { t } = useLang();
  return (
    <div className="pb-6">
      {/* Opening */}
      <section className="grid gap-8 border-b border-ink/10 pt-10 pb-12 md:grid-cols-[minmax(0,22rem)_1fr] md:items-center md:gap-12 md:pb-16">
        <figure className="mx-auto w-full max-w-[22rem]">
          <Image
            src={leader.photo}
            alt={t(leader.name)}
            width={432}
            height={432}
            priority
            className="aspect-square w-full border-b-8 border-kokum-600 object-cover"
          />
        </figure>
        <div>
          <p className="text-sm font-semibold tracking-wide text-sea-700">{t(copy.eyebrow)}</p>
          <h1 className="mt-3 font-serif text-[2.8rem] leading-[1] font-normal text-kokum-600 sm:text-[4rem]">{t(leader.name)}</h1>
          <ul className="mt-5 space-y-1">
            {leader.roles.map((r) => (
              <li key={r.en} className="font-display text-lg font-bold text-ink sm:text-xl">
                {t(r)}
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink">{t(leader.bio)}</p>
          <p className="mt-5 max-w-2xl border-l-4 border-kokum-500 pl-4 text-[17px] leading-relaxed font-semibold text-ink">{t(leader.whyApp)}</p>
        </div>
      </section>

      {/* Initiatives */}
      <section className="border-b border-ink/10 py-12 md:py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-serif text-3xl font-normal sm:text-[2.6rem]">{t(copy.initiativesTitle)}</h2>
          <p className="text-ink-soft">{t(copy.initiativesNote)}</p>
        </div>
        <ol className="mt-8 grid border-t border-ink/15 md:grid-cols-2 md:gap-x-10">
          {initiatives.map((it, i) => (
            <li key={it.id} className="flex gap-5 border-b border-ink/15 py-6">
              <span className="w-8 shrink-0 font-serif text-3xl leading-none text-kokum-500 tabular-nums">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-xl font-bold text-ink">{t(it.title)}</h3>
                <p className="mt-1.5 text-[15.5px] leading-relaxed text-ink-soft">{t(it.body)}</p>
                <Link
                  href={it.href}
                  className="mt-3 inline-flex items-center gap-1.5 font-bold text-kokum-600 underline decoration-kokum-200 underline-offset-4 hover:decoration-kokum-500"
                >
                  {t(it.cta)} <ArrowRight size={15} />
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Journey */}
      <section className="grid gap-8 py-12 md:grid-cols-[1fr_2fr] md:gap-10 md:py-16">
        <div>
          <h2 className="font-serif text-3xl font-normal sm:text-[2.6rem]">{t(copy.journeyTitle)}</h2>
          <Link href="/chat" className="mt-6 inline-flex items-center gap-2 bg-kokum-600 px-5 py-3 font-bold text-white hover:bg-kokum-700">
            {t(copy.back)} <ArrowRight size={17} />
          </Link>
        </div>
        <div>
          <ol className="border-t-2 border-ink">
            {journey.map((j) => (
              <li key={j.year} className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-ink/15 py-4">
                <span className="font-serif text-2xl text-kokum-600 tabular-nums">{j.year}</span>
                <span className="text-[16px] leading-relaxed text-ink">{t(j.text)}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-[13px] text-ink-soft">{t(copy.sources)}</p>
        </div>
      </section>
    </div>
  );
}
