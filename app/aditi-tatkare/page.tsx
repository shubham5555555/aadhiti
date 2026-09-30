"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Leaf from "@/components/Leaf";
import { useLang } from "@/lib/i18n";
import { initiatives, journey, leader } from "@/lib/leader";

const copy = {
  eyebrow: {
    mr: "या उपक्रमामागे",
    en: "Behind this initiative",
    hi: "इस पहल के पीछे",
  },
  initiativesTitle: {
    mr: "महिला आणि मुलांसाठी त्यांचे पुढाकार",
    en: "Her initiatives for women and children",
    hi: "महिलाओं और बच्चों के लिए उनकी पहल",
  },
  initiativesNote: {
    mr: "प्रत्येक पुढाकाराची माहिती AADHI TI मध्ये मिळते.",
    en: "You can find out about each of these inside AADHI TI.",
    hi: "हर पहल की जानकारी AADHI TI में मिलती है।",
  },
  journeyTitle: { mr: "प्रवास", en: "Her journey", hi: "सफ़र" },
  back: {
    mr: "AADHI TI ला प्रश्न विचारा",
    en: "Ask AADHI TI a question",
    hi: "AADHI TI से सवाल पूछें",
  },
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
      <section className="relative grid gap-8 overflow-hidden pt-8 pb-10 md:grid-cols-[minmax(0,22rem)_1fr] md:items-center md:gap-12 md:pb-14">
        <Leaf className="absolute -top-4 right-0 h-40 w-auto text-kokum-200 opacity-60" />
        <figure className="relative mx-auto w-full max-w-[22rem]">
          <Image
            src={leader.photo}
            alt={t(leader.name)}
            width={432}
            height={432}
            priority
            className="aspect-square w-full rounded-[2rem] border-4 border-white object-cover shadow-[0_24px_50px_-24px_rgba(126,23,56,0.55)]"
          />
        </figure>
        <div className="relative min-w-0">
          <p className="text-sm font-semibold tracking-wide text-kokum-500">
            {t(copy.eyebrow)}
          </p>
          <h1 className="mt-3 font-serif text-[2.6rem] leading-[1.05] font-normal text-kokum-700 sm:text-[3.6rem]">
            {t(leader.name)}
          </h1>
          <ul className="mt-5 flex flex-wrap gap-2">
            {leader.roles.map((r) => (
              <li
                key={r.en}
                className="rounded-full border border-kokum-100 bg-kokum-50 px-3.5 py-1.5 text-sm font-bold text-kokum-700"
              >
                {t(r)}
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink">
            {t(leader.bio)}
          </p>
          <p className="soft-card-pink mt-5 max-w-2xl px-5 py-4 text-[17px] leading-relaxed font-semibold text-ink">
            {t(leader.whyApp)}
          </p>
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-10 md:py-14">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-serif text-3xl font-normal text-kokum-700 sm:text-[2.4rem]">
            {t(copy.initiativesTitle)}
          </h2>
          <p className="text-ink-soft">{t(copy.initiativesNote)}</p>
        </div>
        <ol className="mt-7 grid gap-4 md:grid-cols-2">
          {initiatives.map((it, i) => (
            <li key={it.id} className="soft-card flex gap-4 p-5">
              <span className="icon-circle font-serif text-xl tabular-nums">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-lg font-bold text-ink sm:text-xl">
                  {t(it.title)}
                </h3>
                <p className="mt-1.5 text-[15.5px] leading-relaxed text-ink-soft">
                  {t(it.body)}
                </p>
                <Link
                  href={it.href}
                  className="soft-btn-outline mt-4 px-4 py-1.5 text-sm"
                >
                  {t(it.cta)} <ArrowRight size={15} />
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Journey */}
      <section className="grid gap-6 py-10 md:grid-cols-[1fr_2fr] md:gap-10 md:py-14">
        <div>
          <h2 className="font-serif text-3xl font-normal text-kokum-700 sm:text-[2.4rem]">
            {t(copy.journeyTitle)}
          </h2>
          <Link href="/chat" className="soft-btn mt-6">
            {t(copy.back)} <ArrowRight size={17} />
          </Link>
        </div>
        <div className="min-w-0">
          <ol className="soft-card divide-y divide-kokum-100 px-5 py-2">
            {journey.map((j) => (
              <li key={j.year} className="flex items-start gap-4 py-4">
                <span className="shrink-0 rounded-full bg-kokum-50 px-3 py-1 text-sm font-bold text-kokum-700 tabular-nums">
                  {j.year}
                </span>
                <span className="min-w-0 text-[16px] leading-relaxed text-ink">
                  {t(j.text)}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-[13px] text-ink-soft">{t(copy.sources)}</p>
        </div>
      </section>
    </div>
  );
}
