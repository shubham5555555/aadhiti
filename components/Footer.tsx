"use client";

import Link from "next/link";
import { PhoneCall } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { brand, nav } from "@/lib/ui";
import BrandLogo from "./BrandLogo";
import { leader } from "@/lib/leader";
import WarliRow from "./Warli";

const disclaimer = {
  mr: "AADHI TI माहिती आणि योग्य मदतीपर्यंत पोहोचवते. हे डॉक्टर, वकील, counsellor किंवा पोलिसांची जागा घेत नाही. आणीबाणीत 112 ला कॉल करा.",
  en: "AADHI TI provides information and referral. It does not replace a doctor, lawyer, counsellor or the police. In an emergency, call 112.",
  hi: "AADHI TI जानकारी देती है और सही मदद तक पहुँचाती है। यह डॉक्टर, वकील, counsellor या पुलिस की जगह नहीं लेती। आपातकाल में 112 पर कॉल करें।",
};

const pillarsLine = { mr: "सुरक्षा · आर्थिक सुरक्षा · कौशल्य", en: "Safety · Security · Skill", hi: "सुरक्षा · आर्थिक सुरक्षा · कौशल" };

// Honest framing, as on the onboarding prototype.
const prototype = {
  mr: "Brahmaastra.ai ने तयार केलेला प्रोटोटाइप. हे महाराष्ट्र शासनाचं अधिकृत ॲप नाही.",
  en: "Prototype built by Brahmaastra.ai. This is not an official Government of Maharashtra app.",
  hi: "Brahmaastra.ai द्वारा बनाया गया प्रोटोटाइप। यह महाराष्ट्र सरकार का आधिकारिक ऐप नहीं है।",
};

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative mt-20 overflow-hidden bg-sea-900 text-sea-100">
      <WarliRow count={40} className="pointer-events-none absolute top-6 left-0 h-8 w-auto max-w-none text-sea-700" />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 pt-20 pb-10 md:grid-cols-[1fr_auto]">
        <div className="max-w-xl">
          <div className="inline-block bg-sand-50 px-4 py-2">
            <BrandLogo height={64} />
          </div>
          <p className="mt-3 font-display text-lg font-bold text-turmeric-300">{t(pillarsLine)}</p>
          <p className="mt-1 text-sm text-sea-200">{t(brand.promise)}</p>
          <p className="mt-3 text-sm leading-relaxed text-sea-200">{t(disclaimer)}</p>
          <Link href="/aditi-tatkare" className="mt-4 block text-sm font-bold text-sand-50 underline decoration-white/30 underline-offset-4 hover:decoration-white">
            {t(leader.credit)}
          </Link>
          <p className="mt-2 text-sm text-sea-200">{t(prototype)}</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold md:flex-col md:items-end">
          <Link href="/chat" className="hover:text-white">{t(nav.ask)}</Link>
          <Link href="/everyday" className="hover:text-white">{t(nav.everyday)}</Link>
          <Link href="/poshan" className="hover:text-white">{t(nav.poshan)}</Link>
          <Link href="/schemes" className="hover:text-white">{t(nav.schemes)}</Link>
          <Link href="/safe-shrivardhan" className="hover:text-white">Safe Shrivardhan</Link>
          <a href="tel:112" className="flex items-center gap-1.5 rounded-full bg-red-600 px-4 py-1.5 font-bold text-white hover:bg-red-700">
            <PhoneCall size={14} /> 112
          </a>
        </div>
      </div>
    </footer>
  );
}
