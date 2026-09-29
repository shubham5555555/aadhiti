"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, Landmark, MessageCircleHeart, PhoneCall, UtensilsCrossed } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { nav } from "@/lib/ui";
import SOSButton from "./SOSButton";

const tabs = [
  { href: "/", label: nav.home, icon: Home },
  { href: "/chat", label: { mr: "विचारा", en: "Ask", hi: "पूछें" }, icon: MessageCircleHeart },
  { href: "/call", label: nav.call, icon: PhoneCall },
  { href: "/everyday", label: nav.everyday, icon: UtensilsCrossed },
  { href: "/schemes", label: nav.schemes, icon: Landmark },
  { href: "/awareness", label: nav.knowledge, icon: BookOpen },
];

// App-style tab bar for phones; the floating SOS sits just above it.
export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useLang();

  return (
    <>
      {/* The chat page has its own SOS in its header, clear of the send button. */}
      {pathname !== "/chat" && (
        <div className="fixed right-4 bottom-[5.25rem] z-40 sm:hidden">
          <SOSButton compact />
        </div>
      )}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-sand-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-xl grid-cols-6">
          {tabs.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center gap-0.5 py-2 text-[11px] font-bold transition ${active ? "text-kokum-600" : "text-ink-soft"}`}
              >
                <span className={`grid h-8 w-12 place-items-center rounded-full transition ${active ? "bg-kokum-100" : ""}`}>
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
