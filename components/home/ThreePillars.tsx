"use client";

import Link from "next/link";
import { ArrowRight, GraduationCap, Landmark, ShieldCheck } from "lucide-react";
import { useLang } from "@/lib/i18n";
import type { L } from "@/lib/kb";

// The app's three promises: Safety (her body and phone), Security (money, rights, documents), Skill (learning and earning).
export const pillars: {
  id: "safety" | "security" | "skill";
  Icon: typeof ShieldCheck;
  title: L;
  line: L;
  links: { href: string; label: L }[];
  cta: { href: string; label: L };
}[] = [
  {
    id: "safety",
    Icon: ShieldCheck,
    title: { mr: "सुरक्षा", en: "Safety", hi: "सुरक्षा" },
    line: {
      mr: "रस्त्यावर, घरात आणि फोनवर. धोका वाटला तर काय करायचं, ते आधीच माहीत असावं.",
      en: "On the road, at home and on her phone. Knowing what to do before she needs it.",
      hi: "सड़क पर, घर में और फ़ोन पर। खतरा लगे तो क्या करना है, यह पहले से पता हो।",
    },
    links: [
      { href: "/call", label: { mr: "घरी जाताना सोबत कॉल", en: "A call that walks you home", hi: "घर जाते समय साथ वाली कॉल" } },
      { href: "/call?mode=fake", label: { mr: "निघण्यासाठी fake call", en: "A fake call to get away", hi: "निकलने के लिए fake call" } },
      { href: "/#safety-plan", label: { mr: "माझी सुरक्षा योजना", en: "My safety plan", hi: "मेरी सुरक्षा योजना" } },
      { href: "/chat?topic=photo_threat", label: { mr: "फोटोवरून धमकी, ऑनलाइन छळ", en: "Photo threats, online abuse", hi: "फ़ोटो से धमकी, ऑनलाइन उत्पीड़न" } },
      { href: "/safe-shrivardhan", label: { mr: "असुरक्षित जागा कळवा", en: "Report an unsafe spot", hi: "असुरक्षित जगह बताएँ" } },
    ],
    cta: { href: "/chat?cat=safety", label: { mr: "सुरक्षेबद्दल विचारा", en: "Ask about safety", hi: "सुरक्षा के बारे में पूछें" } },
  },
  {
    id: "security",
    Icon: Landmark,
    title: { mr: "आर्थिक सुरक्षा", en: "Security", hi: "आर्थिक सुरक्षा" },
    line: {
      mr: "स्वतःचे पैसे, स्वतःची कागदपत्रं आणि कायद्याने मिळणारे हक्क. कुणावर अवलंबून न राहता.",
      en: "Her own money, her own papers and the rights the law gives her. Not depending on anyone.",
      hi: "अपना पैसा, अपने कागज़ात और कानून से मिलने वाले अधिकार। किसी पर निर्भर हुए बिना।",
    },
    links: [
      { href: "/schemes#scheme-finder", label: { mr: "मला कोणत्या योजना लागू?", en: "Which schemes fit me?", hi: "मुझ पर कौन-सी योजनाएँ लागू?" } },
      { href: "/chat?topic=ladki_bahin", label: { mr: "लाडकी बहीण योजना", en: "Ladki Bahin scheme", hi: "लाडकी बहीण योजना" } },
      { href: "/chat?topic=join_shg", label: { mr: "बचत गटात सामील व्हा", en: "Join a savings group", hi: "बचत समूह से जुड़ें" } },
      { href: "/chat?topic=property_rights", label: { mr: "मालमत्तेतला हक्क", en: "Her share in property", hi: "संपत्ति में हक़" } },
      { href: "/chat?topic=legal_aid", label: { mr: "मोफत कायदेशीर मदत · 15100", en: "Free legal aid · 15100", hi: "मुफ़्त कानूनी मदद · 15100" } },
    ],
    cta: { href: "/schemes", label: { mr: "योजना पाहा", en: "See schemes", hi: "योजनाएँ देखें" } },
  },
  {
    id: "skill",
    Icon: GraduationCap,
    title: { mr: "कौशल्य", en: "Skill", hi: "कौशल" },
    line: {
      mr: "शिकणं कधीही थांबत नाही. प्रशिक्षण, नोकरी किंवा स्वतःचा व्यवसाय, स्वतःच्या पायावर उभं राहण्यासाठी.",
      en: "It's never too late to learn. Training, a job or her own business, to stand on her own feet.",
      hi: "सीखना कभी नहीं रुकता। ट्रेनिंग, नौकरी या अपना व्यवसाय, अपने पैरों पर खड़े होने के लिए।",
    },
    links: [
      { href: "/schemes#income-finder", label: { mr: "माझ्या कौशल्यातून कमाई", en: "Earn from what I know", hi: "मेरे हुनर से कमाई" } },
      { href: "/chat?topic=training_access", label: { mr: "मोफत प्रशिक्षण कुठे मिळेल", en: "Where to get free training", hi: "मुफ़्त ट्रेनिंग कहाँ मिले" } },
      { href: "/chat?topic=iti_courses", label: { mr: "ITI आणि छोटे कोर्स", en: "ITI and short courses", hi: "ITI और छोटे कोर्स" } },
      { href: "/chat?topic=digital_payments", label: { mr: "UPI, ऑनलाइन विक्री", en: "UPI and selling online", hi: "UPI और ऑनलाइन बिक्री" } },
      { href: "/chat?topic=return_to_education", label: { mr: "शिक्षण पुन्हा सुरू करा", en: "Go back to studies", hi: "पढ़ाई फिर से शुरू करें" } },
    ],
    cta: { href: "/chat?cat=career", label: { mr: "कौशल्याबद्दल विचारा", en: "Ask about skills", hi: "कौशल के बारे में पूछें" } },
  },
];

const copy = {
  eyebrow: { mr: "AADHI TI ची तीन वचनं", en: "Three things AADHI TI stands for", hi: "AADHI TI के तीन वादे" },
  title: {
    mr: "सुरक्षित. स्वावलंबी. कुशल.",
    en: "Safe. Secure. Skilled.",
    hi: "सुरक्षित. आत्मनिर्भर. कुशल.",
  },
};

export default function ThreePillars() {
  const { t } = useLang();
  return (
    <section aria-labelledby="pillars-title" className="-mx-4 my-10 bg-blush px-4 py-12 sm:mx-0 sm:px-8 md:py-14 lg:px-12">
      <p className="text-sm font-semibold tracking-wide text-sea-700">{t(copy.eyebrow)}</p>
      <h2 id="pillars-title" className="mt-2 font-serif text-[2.4rem] leading-[1.05] font-normal text-kokum-600 sm:text-6xl">
        {t(copy.title)}
      </h2>

      <ol className="mt-10 grid border-t-2 border-ink md:grid-cols-3">
        {pillars.map((p, i) => (
          <li
            key={p.id}
            id={`pillar-${p.id}`}
            className="flex scroll-mt-28 flex-col border-b border-ink/15 py-7 md:border-b-0 md:px-7 md:py-8 md:first:pl-0 md:last:pr-0 md:[&+li]:border-l"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-5xl leading-none text-kokum-500 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <p.Icon size={30} strokeWidth={1.5} className="text-kokum-600" aria-hidden />
            </div>
            <h3 className="mt-5 font-display text-[1.9rem] leading-tight font-bold text-ink">{t(p.title)}</h3>
            <p className="mt-2 text-[16px] leading-relaxed text-ink-soft">{t(p.line)}</p>

            <ul className="mt-5 border-t border-ink/15">
              {p.links.map((l) => (
                <li key={l.href} className="border-b border-ink/10">
                  <Link href={l.href} className="group flex items-center justify-between gap-3 py-2.5 text-[15px] font-semibold text-ink hover:text-kokum-600">
                    {t(l.label)}
                    <ArrowRight size={15} className="shrink-0 text-ink/25 transition group-hover:translate-x-0.5 group-hover:text-kokum-600" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex-1" />
            <Link
              href={p.cta.href}
              className="mt-6 inline-flex items-center justify-center gap-2 self-start bg-kokum-600 px-5 py-3 font-bold text-white transition hover:bg-kokum-700"
            >
              {t(p.cta.label)} <ArrowRight size={17} />
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
