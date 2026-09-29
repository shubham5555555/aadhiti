// Page-opening graphics built from type and lines (Warli is kept for the home page).
import { PhoneCall } from "lucide-react";
import type { L } from "@/lib/kb";

/** A phone at the centre of signal rings — the call page. */
export function CallRings({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`relative mx-auto grid aspect-square w-full max-w-[15rem] place-items-center ${className}`}>
      <span className="absolute inset-0 rounded-full border border-sea-700/15" />
      <span className="absolute inset-[12%] rounded-full border border-sea-700/25" />
      <span className="absolute inset-[24%] rounded-full border-2 border-sea-700/40" />
      <span className="relative grid h-[38%] w-[38%] place-items-center rounded-full bg-sea-700 text-sand-50">
        <PhoneCall className="h-[42%] w-[42%]" strokeWidth={1.6} />
      </span>
    </div>
  );
}

const week: L[] = [
  { mr: "सो", en: "M", hi: "सो" },
  { mr: "मं", en: "T", hi: "मं" },
  { mr: "बु", en: "W", hi: "बु" },
  { mr: "गु", en: "T", hi: "गु" },
  { mr: "शु", en: "F", hi: "शु" },
  { mr: "श", en: "S", hi: "श" },
  { mr: "र", en: "S", hi: "र" },
];

// Which meals are "planned" on each day, just to give the grid rhythm.
const planned = [
  [1, 1, 1],
  [1, 1, 0],
  [1, 1, 1],
  [0, 1, 1],
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];
const mealColor = ["bg-turmeric-400", "bg-kokum-500", "bg-sea-600"];

/** A week of breakfast / lunch / dinner — the Everyday page. */
export function WeekGrid({ t, className = "" }: { t: (l: L) => string; className?: string }) {
  return (
    <div aria-hidden className={`mx-auto w-full max-w-[17rem] border-t-2 border-ink pt-4 ${className}`}>
      <div className="grid grid-cols-7 gap-2">
        {week.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <span className="font-serif text-xl text-ink">{t(d)}</span>
            {planned[i].map((on, m) => (
              <span key={m} className={`h-5 w-5 ${on ? mealColor[m] : "border border-ink/20"}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** An abstract shoreline map with pins; the crossed pin is an unsafe spot — Safe Shrivardhan. */
export function ShoreMap({ className = "" }: { className?: string }) {
  const pin = (x: number, y: number) => `M${x} ${y} c-9 -12 -12 -16 -12 -22 a12 12 0 0 1 24 0 c0 6 -3 10 -12 22 Z`;
  return (
    <svg viewBox="0 0 260 220" aria-hidden className={`mx-auto w-full max-w-[18rem] ${className}`}>
      <path d="M0 0 H70 C58 40 84 70 66 110 C50 150 78 180 64 220 H0 Z" className="fill-sea-100" />
      <path d="M70 0 C58 40 84 70 66 110 C50 150 78 180 64 220" fill="none" className="stroke-sea-600" strokeWidth="2" />
      <g fill="none" className="stroke-ink/30" strokeWidth="2" strokeLinecap="round">
        <path d="M76 40 C120 50 170 36 250 48" />
        <path d="M70 120 C130 112 180 130 250 118" />
        <path d="M150 0 C142 60 160 140 146 220" />
        <path d="M210 0 C214 80 200 150 214 220" />
        <path d="M150 170 C180 176 220 168 250 178" strokeDasharray="4 6" />
      </g>
      <path d={pin(118, 106)} className="fill-leaf-600" />
      <circle cx="118" cy="84" r="4.5" className="fill-sand-50" />
      <path d={pin(222, 168)} className="fill-leaf-600" />
      <circle cx="222" cy="146" r="4.5" className="fill-sand-50" />
      <path d={pin(178, 64)} className="fill-kokum-600" />
      <g className="stroke-sand-50" strokeWidth="2.5" strokeLinecap="round">
        <line x1="173" y1="37" x2="183" y2="47" />
        <line x1="183" y1="37" x2="173" y2="47" />
      </g>
    </svg>
  );
}

/** One oversized figure with a caption, set like a magazine stat. */
export function BigFigure({ value, caption, className = "" }: { value: string; caption: string; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[18rem] border-t-2 border-ink pt-3 ${className}`}>
      <p className="font-serif text-[5.5rem] leading-none tabular-nums sm:text-[6.5rem]">{value}</p>
      <p className="mt-3 text-[15px] leading-snug text-ink-soft">{caption}</p>
    </div>
  );
}
