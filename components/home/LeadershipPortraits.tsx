"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import type { L } from "@/lib/kb/types";

type Portrait = { image: string; name: L; circle?: boolean; position?: string };
const left: Portrait[] = [
  { image: "/brand/leadership/ajit-pawar.webp", circle: true, position: "50% 36%", name: { en: "Late Ajit Dada Pawar", mr: "स्व. अजितदादा पवार", hi: "स्व. अजित दादा पवार" } },
  { image: "/brand/leadership/sunetra-pawar.webp", name: { en: "Smt. Sunetratai Pawar", mr: "श्रीमती सुनेत्राताई पवार", hi: "श्रीमती सुनेत्राताई पवार" } },
];
const right: Portrait[] = [
  { image: "/brand/leadership/sunil-tatkare.webp", name: { en: "Sunil Tatkare Saheb", mr: "सुनील तटकरे साहेब", hi: "सुनील तटकरे साहेब" } },
  { image: "/brand/leadership/aniket-tatkare.webp", name: { en: "Aniket Dada Tatkare", mr: "अनिकेतदादा तटकरे", hi: "अनिकेत दादा तटकरे" } },
];

export default function LeadershipPortraits() {
  const { t } = useLang();
  function portrait(person: Portrait) {
    return (
      <figure key={person.image} className="flex min-w-0 items-center gap-2.5 text-left">
        <div className={`relative h-14 w-14 shrink-0 overflow-hidden border-2 border-white bg-white shadow-[0_2px_8px_#7e173814] ring-1 ring-kokum-100/60 sm:h-20 sm:w-20 lg:h-24 lg:w-24 ${person.circle ? "rounded-full" : "rounded-xl"}`}>
          <Image src={person.image} alt={t(person.name)} fill sizes="(min-width: 1024px) 96px, (min-width: 640px) 80px, 56px" className="object-cover" style={{ objectPosition: person.position ?? "50% 20%" }} />
        </div>
      </figure>
    );
  }
  return (
    <section aria-label={t({ en: "Portraits", mr: "मान्यवर", hi: "मान्यवर" })} className="rounded-2xl bg-[#fcf4f2] px-3 py-1.5 sm:px-5 sm:py-2">
      <div className="flex items-center justify-between gap-2 sm:gap-6">
        <div className="flex shrink-0 items-center gap-2 sm:gap-5 lg:gap-7">{left.map(portrait)}</div>
        <div aria-hidden="true" className="h-7 w-px shrink-0 bg-kokum-200/50 lg:mx-auto" />
        <div className="flex shrink-0 items-center gap-2 sm:gap-5 lg:gap-7">{right.map(portrait)}</div>
      </div>
    </section>
  );
}
