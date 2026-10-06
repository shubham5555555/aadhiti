"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { LANGS, useLang } from "@/lib/i18n";
import { nav } from "@/lib/ui";

const links = [
  { href: "/", label: nav.home },
  { href: "/chat", label: nav.ask },
  { href: "/call", label: nav.call },
  { href: "/everyday", label: nav.everyday },
  { href: "/poshan", label: nav.poshan },
  { href: "/schemes", label: nav.schemes },
  { href: "/awareness", label: nav.knowledge },
];

// Replaces the current history entry so "back" doesn't return to this site.
export function quickExit() {
  window.location.replace("https://www.google.com");
}

export function LangSwitch({ className = "" }: { className?: string; tone?: "light" | "dark" }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`flex items-center divide-x divide-ink/15 text-sm ${className}`} role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button
          key={l.id}
          onClick={() => setLang(l.id)}
          aria-pressed={lang === l.id}
          className={`px-2 font-semibold transition first:pl-0 last:pr-0 ${lang === l.id ? "text-kokum-600 underline underline-offset-4" : "text-ink-soft hover:text-ink"}`}
          title={l.label}
        >
          {l.short}
        </button>
      ))}
    </div>
  );
}

const utility = {
  emergency: { mr: "आपात्काल", en: "Emergency", hi: "आपातकाल" },
  women: { mr: "महिला हेल्पलाइन", en: "Women's Helpline", hi: "महिला हेल्पलाइन" },
};

function useHomeBannerInView(active: boolean) {
  const [inView, setInView] = useState(active);
  useEffect(() => {
    if (!active) {
      setInView(false);
      return;
    }
    // The banner counts as "in view" until its bottom edge passes under the sticky header.
    const check = () => {
      const el = document.getElementById("home-banner");
      setInView(!!el && el.getBoundingClientRect().bottom > 100);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [active]);
  return inView;
}

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLang();
  const bannerInView = useHomeBannerInView(pathname === "/");
  // On the home page (tablet and up) the banner already shows the logo, so don't repeat it until it scrolls away.
  const hideLogo = pathname === "/" && bannerInView;

  return (
    <header className="sticky top-0 z-40 bg-white/85 shadow-[0_6px_20px_-16px_rgba(126,23,56,0.5)] backdrop-blur-md">
      {/* Utility bar: emergency numbers and a quick way out, always one tap away. */}
      <div className="bg-kokum-700 text-[13px] text-kokum-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-1.5">
          <p className="flex min-w-0 items-center gap-3 truncate">
            <a href="tel:112" className="font-bold text-white underline-offset-2 hover:underline">
              {t(utility.emergency)} 112
            </a>
            <span className="text-kokum-300">|</span>
            <a href="tel:1091" className="hover:underline">
              {t(utility.women)} 1091
            </a>
          </p>
          <button onClick={quickExit} className="flex shrink-0 items-center gap-1.5 font-semibold text-white hover:underline">
            <LogOut size={13} /> {t(nav.quickExit)}
          </button>
        </div>
      </div>

      <nav>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link
            href="/"
            aria-label="आधी ती — AADHI TI"
            className={`flex shrink-0 items-center transition-opacity duration-300 ${hideLogo ? "md:pointer-events-none md:opacity-0" : "opacity-100"}`}
          >
            <BrandLogo height={46} priority />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-3.5 py-1.5 text-[15px] font-semibold whitespace-nowrap transition ${
                    active ? "bg-kokum-700 text-white" : "text-ink-soft hover:bg-kokum-50 hover:text-kokum-700"
                  }`}
                >
                  {t(l.label)}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <LangSwitch />
            <div className="hidden sm:block">
              <Link href="/call-aditi" className="inline-flex min-h-11 items-center rounded-full bg-kokum-700 px-4 text-sm font-bold text-white">{t({en:"Call AADHI TI",mr:"आधी तीला कॉल करा",hi:"आधी ती को कॉल करें"})}</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
