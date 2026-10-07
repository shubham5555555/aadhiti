"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { initiatives, leader } from "@/lib/leader";

const copy = {
  more: {
    mr: "त्यांच्या कार्याची अधिक माहिती",
    en: "More about her work",
    hi: "उनके कार्य की अधिक जानकारी",
  },
  alsoBy: {
    mr: "त्यांचे इतर उपक्रम",
    en: "Her other initiatives",
    hi: "उनकी अन्य पहल",
  },
};

export default function LeaderSection() {
  const { t } = useLang();
  const others = initiatives.filter((i) => i.id !== "aadhi-ti").slice(0, 4);
  return (
    <section
      aria-labelledby="leader-title"
      className="relative -mx-4 overflow-hidden bg-kokum-700 px-4 py-10 text-white sm:mx-0 sm:rounded-[2rem] sm:px-8 md:py-12 lg:px-10"
    >
      <div className="grid gap-8 md:grid-cols-[15rem_1fr] md:items-start md:gap-10 lg:grid-cols-[17rem_1fr_16rem]">
        <Image
          src={leader.photo}
          alt={t(leader.name)}
          width={432}
          height={432}
          sizes="(min-width: 768px) 17rem, 60vw"
          className="aspect-square w-3/5 max-w-[17rem] rounded-full border-4 border-white/20 object-cover shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] md:w-full"
        />
        <div>
          <p className="text-sm leading-relaxed text-white/85">{t(leader.roles[0])}</p>
          <p className="mt-1 text-sm leading-relaxed text-white/85">{t(leader.roles[1])}</p>
          <h2 id="leader-title" className="mt-3 font-serif text-3xl leading-tight sm:text-5xl">{t(leader.name)}</h2>
          <p className="mt-2 text-sm text-turmeric-300">{t({ mr: "यांच्या पुढाकाराने", hi: "की पहल पर", en: "An initiative by" })}</p>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed">
            {t(leader.whyApp)}
          </p>
          <Link
            href="/aditi-tatkare"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-kokum-700 shadow-[0_10px_22px_-12px_rgba(0,0,0,0.5)] hover:bg-sand-100"
          >
            {t(copy.more)} <ArrowRight size={17} />
          </Link>
        </div>
        <div className="md:col-span-2 lg:col-span-1">
          <p className="text-sm font-bold text-turmeric-300">
            {t(copy.alsoBy)}
          </p>
          <ul className="mt-3 space-y-2">
            {others.map((it) => (
              <li key={it.id}>
                <Link
                  href={it.href}
                  className="group flex items-center justify-between gap-3 rounded-2xl bg-white/10 px-4 py-3 text-[15px] font-semibold transition hover:bg-white/20"
                >
                  {t(it.title)}
                  <ArrowRight
                    size={15}
                    className="shrink-0 opacity-60 transition group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
