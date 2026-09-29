"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { initiatives, leader } from "@/lib/leader";

const copy = {
  more: { mr: "त्यांच्या कामाबद्दल अधिक", en: "More about her work", hi: "उनके काम के बारे में और" },
  alsoBy: { mr: "त्यांचे इतर पुढाकार", en: "Her other initiatives", hi: "उनकी अन्य पहल" },
};

export default function LeaderSection() {
  const { t } = useLang();
  const others = initiatives.filter((i) => i.id !== "aadhi-ti").slice(0, 4);
  return (
    <section aria-labelledby="leader-title" className="-mx-4 bg-kokum-700 px-4 py-12 text-white sm:mx-0 sm:px-8 md:py-14 lg:px-12">
      <div className="grid gap-8 md:grid-cols-[15rem_1fr] md:items-start md:gap-10 lg:grid-cols-[17rem_1fr_16rem]">
        <Image
          src={leader.photo}
          alt={t(leader.name)}
          width={432}
          height={432}
          sizes="(min-width: 768px) 17rem, 60vw"
          className="aspect-square w-3/5 max-w-[17rem] object-cover md:w-full"
        />
        <div>
          <p className="text-sm font-semibold tracking-wide text-turmeric-300">{t(leader.credit)}</p>
          <h2 id="leader-title" className="mt-2 font-serif text-[2.4rem] leading-[1.05] font-normal sm:text-5xl">
            {t(leader.shortName)}
          </h2>
          <ul className="mt-3 space-y-0.5 text-[15px] font-semibold text-white/85">
            {leader.roles.map((r) => (
              <li key={r.en}>{t(r)}</li>
            ))}
          </ul>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed">{t(leader.whyApp)}</p>
          <Link href="/aditi-tatkare" className="mt-6 inline-flex items-center gap-2 bg-white px-5 py-3 font-bold text-kokum-700 hover:bg-sand-100">
            {t(copy.more)} <ArrowRight size={17} />
          </Link>
        </div>
        <div className="md:col-span-2 lg:col-span-1">
          <p className="text-sm font-bold text-turmeric-300">{t(copy.alsoBy)}</p>
          <ul className="mt-2 border-t border-white/25">
            {others.map((it) => (
              <li key={it.id} className="border-b border-white/25">
                <Link href={it.href} className="group flex items-center justify-between gap-3 py-3 text-[15px] font-semibold hover:text-turmeric-300">
                  {t(it.title)}
                  <ArrowRight size={15} className="shrink-0 opacity-60 transition group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
