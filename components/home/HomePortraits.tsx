"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";

import Link from "next/link";
import { people } from "@/lib/people";

export default function HomePortraits() {
  const { t } = useLang();
  return (
    <section aria-label={t({ en: "Featured people", mr: "मान्यवर", hi: "गणमान्य व्यक्ति" })} className="border-y border-kokum-100 bg-gradient-to-b from-kokum-50/60 to-transparent px-1 py-4 sm:px-8 sm:py-8">
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-0 divide-y divide-kokum-100 sm:grid-cols-3 sm:gap-6 sm:divide-y-0 lg:gap-10">
        {people.map(person => (
          <Link key={person.image} href={`/people/${person.slug}`} className="group min-w-0 rounded-xl py-4 text-left sm:py-0 sm:text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kokum-600"><figure className="grid grid-cols-[88px_minmax(0,1fr)] items-center gap-x-4 sm:block">
            <div className="relative row-span-3 mx-auto aspect-[4/5] w-full max-w-[180px] overflow-hidden rounded-xl bg-kokum-100 ring-1 ring-kokum-200/60 sm:rounded-2xl">
              <Image src={person.image} alt={t(person.name)} fill sizes="(max-width: 639px) 88px, 180px" className="object-cover" style={{ objectPosition: person.position }} />
            </div>
            <figcaption className="font-display text-base font-bold leading-snug text-kokum-800 sm:mt-4 sm:text-lg">{t(person.name)}</figcaption>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft sm:text-sm">{t(person.role)}</p>
            <span className="mt-1 inline-flex min-h-11 items-center py-2 text-sm font-bold text-kokum-700 underline underline-offset-4">{t({en:"Read profile",mr:"परिचय वाचा",hi:"परिचय पढ़ें"})} →</span>
          </figure></Link>
        ))}
      </div>
    </section>
  );
}
