"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollPan from "@/components/ScrollPan";
import { useLang } from "@/lib/i18n";
import { JOURNEYS } from "@/lib/journeys";
import { initiativeBanner, leader } from "@/lib/leader";

export default function InitiativeBanner() {
  const { t, lang } = useLang();
  return (
    <section id="home-banner" aria-label="AADHI TI" className="-mx-4 overflow-hidden bg-[#fff4e8] sm:mx-0 sm:rounded-[2rem] sm:border sm:border-kokum-100">
      <div className="grid items-center md:grid-cols-[1.55fr_1fr]">
        <div className="relative min-w-0">
          <Image src={`/brand/localized/home-hero-${lang}.webp`} alt={t({en:"AADHI TI: women across generations, together against a sunrise sky.",mr:"आधी ती: सूर्योदयाच्या पार्श्वभूमीवर सर्व पिढ्यांतील महिला एकत्र.",hi:"आधी ती: सूर्योदय की पृष्ठभूमि में हर पीढ़ी की महिलाएँ एक साथ।"})} width={1600} height={900} priority sizes="(min-width: 768px) 700px, 100vw" className="block h-auto w-full saturate-[.8]" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#fff4e8]/10" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-12 bg-gradient-to-l from-[#fff4e8] to-transparent md:block" />
        </div>
        <div className="flex flex-row-reverse items-center gap-4 px-5 py-5 md:flex-col md:gap-4 md:px-7 md:py-7 md:text-center">
          <Link href="/aditi-tatkare" className="block shrink-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kokum-700">
            <Image src={leader.photo} alt={t(leader.name)} width={432} height={432} priority sizes="(min-width: 1024px) 220px, (min-width: 768px) 170px, 104px" className="h-28 w-24 rounded-2xl border-4 border-white object-cover object-top shadow-[0_12px_30px_-15px_#7e173866] md:h-44 md:w-44 lg:h-56 lg:w-56" />
          </Link>
          <div className="min-w-0 flex-1 text-kokum-800">
            <p className="text-xs font-medium text-kokum-600">{t(initiativeBanner.by)}</p>
            <h1 className="mt-2 font-display text-xl font-bold leading-tight lg:text-2xl">{t(initiativeBanner.name)}</h1>
            {initiativeBanner.lines.filter(l=>t(l)).map(l=><p key={l.en} className="mt-2 text-xs leading-relaxed md:text-sm">{t(l)}</p>)}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-kokum-100 px-5 py-3 text-kokum-800">
        <p className="font-display text-sm font-bold">{t({en:"Nine forms. Many possibilities.",mr:"नऊ रूपं. अनेक शक्यता.",hi:"नौ रूप। अनेक संभावनाएँ।"})}</p>

      </div>
      <ScrollPan>
      <nav aria-label={t({en:"Explore the nine forms",mr:"नऊ रूपं पाहा",hi:"नौ रूप देखें"})} className="grid w-[198%] grid-cols-9 sm:w-[150%] lg:w-full">
        {JOURNEYS.map(j=><Link key={j.slug} href={`/journeys/${j.slug}`} aria-label={`${t(j.name)} — ${t(j.theme)}`} className="group relative aspect-[1/5] min-w-0 w-full overflow-hidden border-r border-white focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-kokum-700">
          <Image src={`/brand/journeys/${j.slug}-${lang}.webp`} alt={`${t(j.name)} — ${t(j.theme)}`} fill sizes="(min-width: 1024px) 130px, (min-width: 640px) 17vw, 22vw" className="object-fill" />
          <span className="absolute inset-x-1 bottom-2 hidden lg:block rounded-lg bg-white/95 px-1 py-2 text-center text-[11px] font-semibold text-kokum-800 shadow-sm">{t({en:"View schemes →",mr:"योजना पाहा →",hi:"योजनाएँ देखें →"})}</span>
        </Link>)}
      </nav>
      </ScrollPan>
    </section>
  );
}
