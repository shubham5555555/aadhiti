"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, Landmark, MessageCircleHeart, PhoneCall, UtensilsCrossed } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { nav } from "@/lib/ui";

const tabs = [
  { href: "/", label: nav.home, icon: Home },
  { href: "/chat", label: { mr: "विचारा", en: "Ask AADHI TI", hi: "पूछें" }, icon: MessageCircleHeart },
  { href: "/call", label: nav.call, icon: PhoneCall },
  { href: "/everyday", label: nav.everyday, icon: UtensilsCrossed },
  { href: "/schemes", label: nav.schemes, icon: Landmark },
  { href: "/awareness", label: nav.knowledge, icon: BookOpen },
];

// App-style tab bar with a floating AI call shortcut.
export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useLang();

  return (
    <>
      {/* Keep the floating shortcut clear of chat and call controls. */}
      {!["/chat", "/call", "/call-aditi"].includes(pathname) && (
        <div className="fixed right-4 bottom-[5.25rem] z-40 sm:hidden">
          <Link href="/call-aditi" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-kokum-700 px-4 text-sm font-bold text-white"><PhoneCall size={16}/>{t({en:"Call AADHI TI",mr:"‘आधी ती’ला कॉल करा",hi:"आधी ती को कॉल करें"})}</Link>
        </div>
      )}
      <nav className="fixed inset-x-0 bottom-0 z-40 rounded-t-3xl border-t border-kokum-100 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_-18px_rgba(126,23,56,0.45)] backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-xl grid-cols-6">
          {tabs.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center gap-0.5 pt-2 pb-1.5 text-[11px] font-bold transition ${active ? "text-kokum-700" : "text-ink-soft"}`}
              >
                <span className={`grid h-8 w-12 place-items-center rounded-full transition ${active ? "bg-kokum-700 text-white shadow-[0_6px_14px_-6px_rgba(126,23,56,0.8)]" : ""}`}>
                  <Icon size={20} strokeWidth={active ? 2.4 : 2} />
                </span>
                <span className="max-w-full truncate px-0.5">{t(label)}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
