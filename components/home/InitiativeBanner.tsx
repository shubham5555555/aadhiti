"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { initiativeBanner, leader } from "@/lib/leader";

const heroAlt = {
  mr: "सूर्योदयाच्या आकाशात लाल पदराबरोबर उंच झेपावणाऱ्या सर्व वयांच्या स्त्रिया.",
  en: "Women of every age rising together on a red saree against a sunrise sky.",
  hi: "सूर्योदय के आसमान में लाल पल्लू के साथ ऊँची उड़ान भरती हर उम्र की महिलाएँ।",
};

// Kokum text stays readable over the bright sky with a soft white glow.
const glow = {
  textShadow: "0 0 14px rgba(255,255,255,0.95), 0 0 4px rgba(255,255,255,0.9)",
};

export default function InitiativeBanner() {
  const { t } = useLang();
  return (
    <section
      id="home-banner"
      aria-label={t(initiativeBanner.by) + " " + t(leader.shortName)}
      className="relative -mx-4 mt-0 overflow-hidden sm:mx-0 sm:mt-6 sm:rounded-[2rem] sm:shadow-[0_24px_50px_-28px_rgba(126,23,56,0.7)] md:aspect-[2000/1125]"
    >
      <Image
        src="/brand/hero.webp"
        alt={t(heroAlt)}
        fill
        priority
        sizes="(min-width: 1152px) 1152px, 100vw"
        className="object-cover object-[22%_50%] md:object-center"
      />

      <div className="relative flex h-full items-center justify-center px-4 py-8 md:py-8">
        <div className="flex flex-col items-center rounded-[1.75rem] bg-white/70 px-5 py-6 text-center shadow-[0_20px_50px_-24px_rgba(126,23,56,0.6)] ring-1 ring-white/80 backdrop-blur-md sm:px-10 sm:py-7">
          <Link href="/aditi-tatkare" className="block">
            <Image
              src={leader.photo}
              alt={t(leader.name)}
              width={432}
              height={432}
              priority
              className="h-36 w-36 rounded-2xl border-4 border-white object-cover shadow-[0_18px_36px_-16px_rgba(0,0,0,0.55)] ring-2 ring-kokum-600 sm:h-44 sm:w-44 lg:h-48 lg:w-48"
            />
          </Link>
          <div
            className="mt-4 max-w-xl space-y-1 font-display font-bold text-kokum-700 sm:mt-5 sm:space-y-1.5"
            style={glow}
          >
            <p className="text-[17px] sm:text-xl lg:text-2xl">
              {t(initiativeBanner.by)}
            </p>
            <p className="text-[21px] leading-tight text-kokum-800 sm:text-2xl lg:text-[1.9rem]">
              {t(initiativeBanner.name)}
            </p>
            {initiativeBanner.lines.filter((l) => t(l)).map((l) => (
              <p
                key={l.en}
                className="text-[15.5px] leading-snug sm:text-lg lg:text-[1.35rem]"
              >
                {t(l)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
