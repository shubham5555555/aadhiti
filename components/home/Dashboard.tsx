"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Heart,
  Landmark,
  MapPin,
  MessageCircleHeart,
  Mic,
  Phone,
  ShieldCheck,
  UsersRound,
  UtensilsCrossed,
} from "lucide-react";
import Leaf from "@/components/Leaf";
import { useLang } from "@/lib/i18n";
import { useProfile } from "@/lib/profile";
import type { L } from "@/lib/kb";

const copy = {
  hello: { mr: "नमस्कार,", en: "Namaste,", hi: "नमस्ते," },
  friend: { mr: "सखी", en: "friend", hi: "सखी" },
  notAlone: {
    mr: "तुम्ही एकट्या नाही",
    en: "You are not alone",
    hi: "आप अकेली नहीं हैं",
  },
  sos: { mr: "आणीबाणी", en: "Emergency", hi: "आपातकाल" },
  aiCall: { mr: "AI सुरक्षा कॉल", en: "AI Safety Call", hi: "AI सुरक्षा कॉल" },
  talkNow: { mr: "आत्ता बोला", en: "Talk now", hi: "अभी बात करें" },
  askPh: {
    mr: "तुमचा प्रश्न लिहा…",
    en: "Type your question…",
    hi: "अपना सवाल लिखें…",
  },
  ask: { mr: "विचारा", en: "Ask", hi: "पूछें" },
  askNote: {
    mr: "नाव किंवा नंबर लागत नाही. प्रश्नात नाव, फोन नंबर लिहू नका.",
    en: "No name or number needed. Don't include your name or phone number.",
    hi: "नाम या नंबर की ज़रूरत नहीं। सवाल में नाम या फ़ोन नंबर न लिखें।",
  },
  voice: { mr: "आवाजात विचारा", en: "Ask by voice", hi: "आवाज़ में पूछें" },
  knowTitle: {
    mr: "जाणून घ्या.\nभीती कमी.",
    en: "Know more.\nFear less.",
    hi: "जानिए ज़्यादा.\nडर कम.",
  },
  quickHelp: { mr: "झटपट मदत", en: "Quick help", hi: "तुरंत मदद" },
  police: { mr: "जवळचं पोलीस ठाणे", en: "Nearest police", hi: "नज़दीकी पुलिस" },
  share: {
    mr: "लाईव्ह लोकेशन पाठवा",
    en: "Share live location",
    hi: "लाइव लोकेशन भेजें",
  },
  locating: { mr: "शोधत आहे…", en: "Locating…", hi: "ढूँढ रहे हैं…" },
  trusted: {
    mr: "विश्वासाची माणसं",
    en: "Trusted contacts",
    hi: "भरोसेमंद लोग",
  },
  message: {
    mr: "मला मदत हवी आहे. मी इथे आहे:",
    en: "I need help. I am here:",
    hi: "मुझे मदद चाहिए। मैं यहाँ हूँ:",
  },
  heroAlt: {
    mr: "सूर्योदयाच्या आकाशात लाल पदराबरोबर उंच झेपावणाऱ्या सर्व वयांच्या स्त्रिया.",
    en: "Women of every age rising together on a red saree against a sunrise sky.",
    hi: "सूर्योदय के आसमान में लाल पल्लू के साथ ऊँची उड़ान भरती हर उम्र की महिलाएँ।",
  },
};

const shortcuts: { href: string; label: L; Icon: typeof Landmark }[] = [
  {
    href: "/schemes",
    label: { mr: "योजना", en: "Schemes", hi: "योजनाएँ" },
    Icon: Landmark,
  },
  {
    href: "/awareness",
    label: { mr: "माहिती", en: "Knowledge", hi: "जानकारी" },
    Icon: BookOpen,
  },
  {
    href: "/everyday",
    label: { mr: "रोजचं", en: "Everyday", hi: "रोज़मर्रा" },
    Icon: UtensilsCrossed,
  },
  {
    href: "/chat",
    label: { mr: "विचारा", en: "Ask", hi: "पूछें" },
    Icon: MessageCircleHeart,
  },
];

export default function Dashboard() {
  const { t } = useLang();
  const router = useRouter();
  const { profile } = useProfile();
  const [q, setQ] = useState("");
  const [locating, setLocating] = useState(false);

  const ask = (e: React.FormEvent) => {
    e.preventDefault();
    const v = q.trim();
    if (v) router.push(`/chat?q=${encodeURIComponent(v)}`);
  };

  // GPS → a Google Maps link in the phone's share sheet (WhatsApp on desktop).
  const shareLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        const text = `${t(copy.message)} https://maps.google.com/?q=${pos.coords.latitude.toFixed(6)},${pos.coords.longitude.toFixed(6)}`;
        if (navigator.share) navigator.share({ text }).catch(() => {});
        else
          window.open(
            `https://wa.me/?text=${encodeURIComponent(text)}`,
            "_blank",
            "noopener",
          );
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 12000 },
    );
  };

  const tile = "soft-tile";

  return (
    <section className="grid gap-5 pt-6 pb-4 sm:pt-8 lg:grid-cols-2 lg:gap-10">
      <div className="space-y-5">
        {/* Greeting */}
        <div className="relative">
          <Leaf className="absolute -top-2 right-0 h-28 w-auto text-kokum-200 sm:h-36" />
          <p className="text-lg text-ink-soft">{t(copy.hello)}</p>
          <h1 className="flex items-center gap-2 font-serif text-[2.6rem] leading-[1.05] text-kokum-700 sm:text-6xl">
            {profile.name || t(copy.friend)}
            <Heart
              size={26}
              className="mt-1 shrink-0 fill-kokum-500 text-kokum-500"
              aria-hidden
            />
          </h1>
          <p className="mt-1 text-[17px] font-semibold text-kokum-600">
            {t(copy.notAlone)}
          </p>
        </div>

        {/* SOS + AI safety call */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href="tel:112"
            className="relative flex items-center gap-3 overflow-hidden rounded-3xl bg-kokum-700 p-4 text-white shadow-[0_14px_30px_-14px_rgba(126,23,56,0.9)] transition active:scale-[0.98] sm:p-5"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/15">
              <Phone size={22} />
            </span>
            <span className="min-w-0">
              <span className="block text-xl leading-none font-extrabold">
                SOS
              </span>
              <span className="mt-1 block truncate text-[13px] text-white/85">
                {t(copy.sos)}
              </span>
              <span className="block font-serif text-2xl leading-none">
                112
              </span>
            </span>
          </a>
          <Link
            href="/call"
            className="soft-card-pink flex items-center gap-3 p-4 transition active:scale-[0.98] sm:p-5"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-kokum-600">
              <Mic size={22} />
            </span>
            <span className="min-w-0">
              <span className="block text-[15px] leading-tight font-extrabold text-kokum-700">
                {t(copy.aiCall)}
              </span>
              <span className="mt-1 block text-[13px] font-semibold text-kokum-500">
                {t(copy.talkNow)}
              </span>
            </span>
          </Link>
        </div>

        {/* Shortcuts */}
        <div className="grid grid-cols-4 gap-2.5">
          {shortcuts.map(({ href, label, Icon }) => (
            <Link key={href} href={href} className={tile}>
              <span className="icon-circle h-10 w-10">
                <Icon size={19} />
              </span>
              <span className="truncate">{t(label)}</span>
            </Link>
          ))}
        </div>

        {/* Ask */}
        <form onSubmit={ask}>
          <label htmlFor="home-ask" className="sr-only">
            {t(copy.askPh)}
          </label>
          <div className="flex items-center gap-2 rounded-full border border-kokum-200 bg-white p-1.5 pl-5 shadow-[0_10px_24px_-18px_rgba(126,23,56,0.5)] focus-within:border-kokum-500 focus-within:ring-4 focus-within:ring-kokum-100">
            <input
              id="home-ask"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t(copy.askPh)}
              className="min-w-0 flex-1 bg-transparent py-2 text-[16px] outline-none placeholder:text-ink-soft/60"
            />
            <Link
              href="/chat"
              aria-label={t(copy.voice)}
              title={t(copy.voice)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-kokum-50 text-kokum-600 hover:bg-kokum-100"
            >
              <Mic size={18} />
            </Link>
            <button type="submit" className="soft-btn px-5 py-2.5">
              {t(copy.ask)}
            </button>
          </div>
          <p className="mt-2 px-2 text-[13px] text-ink-soft">
            {t(copy.askNote)}
          </p>
        </form>

      </div>

      <div className="space-y-5">
        {/* Know more, fear less */}
        <Link
          href="/awareness"
          className="relative block h-44 overflow-hidden rounded-3xl lg:h-72"
        >
          <Image
            src="/brand/hero.webp"
            alt=""
            fill
            sizes="100vw"
            className="origin-left scale-[1.5] object-cover object-left"
          />
          <span className="absolute inset-0 bg-gradient-to-l from-kokum-800/95 via-kokum-700/60 to-transparent" />
          <span className="absolute inset-y-0 right-0 flex flex-col items-end justify-center gap-3 p-5 text-right text-white">
            <span className="font-serif text-[1.7rem] leading-[1.1] whitespace-pre-line">
              {t(copy.knowTitle)}
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-kokum-700">
              <ArrowRight size={17} />
            </span>
          </span>
        </Link>

        {/* Quick help */}
        <div>
          <p className="mb-2.5 text-[15px] font-extrabold text-ink">
            {t(copy.quickHelp)}
          </p>
          <div className="grid grid-cols-3 gap-2.5">
            <a
              href="https://www.google.com/maps/search/police+station+near+me"
              target="_blank"
              rel="noopener noreferrer"
              className={tile}
            >
              <span className="icon-circle h-10 w-10">
                <ShieldCheck size={19} />
              </span>
              <span className="leading-tight">{t(copy.police)}</span>
            </a>
            <button
              type="button"
              onClick={shareLocation}
              disabled={locating}
              className={tile}
            >
              <span className="icon-circle h-10 w-10">
                <MapPin size={19} />
              </span>
              <span className="leading-tight">
                {locating ? t(copy.locating) : t(copy.share)}
              </span>
            </button>
            <Link href="/#safety-plan" className={tile}>
              <span className="icon-circle h-10 w-10">
                <UsersRound size={19} />
              </span>
              <span className="leading-tight">{t(copy.trusted)}</span>
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}
