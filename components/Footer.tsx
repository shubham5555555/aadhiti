"use client";

import Link from "next/link";
import { PhoneCall } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { brand, nav } from "@/lib/ui";
import BrandLogo from "./BrandLogo";
import { leader } from "@/lib/leader";
import WarliRow from "./Warli";

const disclaimer = {
  mr: "‘आधी ती’ माहिती आणि योग्य सेवांबद्दल मार्गदर्शन देते. ती डॉक्टर, वकील, समुपदेशक किंवा पोलिसांची जागा घेत नाही. आपत्कालीन परिस्थितीत ११२ वर कॉल करा.",
  en: "AADHI TI provides information and referrals. It does not replace a doctor, lawyer, counsellor, or the police. In an emergency, call 112.",
  hi: "AADHI TI जानकारी देती है और सही मदद तक पहुँचाती है। यह डॉक्टर, वकील, counsellor या पुलिस की जगह नहीं लेती। आपातकाल में 112 पर कॉल करें।",
};

const pillarsLine = { mr: "सुरक्षितता · आर्थिक सुरक्षा · कौशल्य", en: "Safety · Financial Security · Skills", hi: "सुरक्षा · आर्थिक सुरक्षा · कौशल" };

// Honest framing, as on the onboarding prototype.
const prototype = {
  mr: "Brahmastra.ai यांनी विकसित केलेला हा प्रोटोटाइप आहे. हे महाराष्ट्र शासनाचे अधिकृत ॲप्लिकेशन नाही.",
  en: "Prototype built by Brahmaastra.ai. This is not an official app of the Government of Maharashtra.",
  hi: "Brahmaastra.ai द्वारा बनाया गया प्रोटोटाइप। यह महाराष्ट्र सरकार का आधिकारिक ऐप नहीं है।",
};

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative mt-16 overflow-hidden rounded-t-[2rem] bg-kokum-900 text-kokum-100">
      <div aria-hidden="true" className="h-10 overflow-hidden px-4 pt-3 text-kokum-700">
        <WarliRow count={40} className="h-6 w-auto max-w-none" />
      </div>
      <div className="relative mx-auto grid w-full min-w-0 max-w-6xl gap-6 px-5 py-6 sm:px-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:gap-10">
        <div className="min-w-0 max-w-xl break-words">
          <div className="inline-block rounded-2xl bg-sand-50 px-4 py-2">
            <BrandLogo height={48} />
          </div>
          <p className="mt-3 font-display text-lg font-bold text-turmeric-300">{t(pillarsLine)}</p>
          <p className="mt-1 text-sm text-kokum-200">{t(brand.promise)}</p>
          <p className="mt-3 text-sm leading-relaxed text-kokum-200">{t(disclaimer)}</p>
          <Link href="/aditi-tatkare" className="mt-4 block text-sm font-bold text-sand-50 underline decoration-white/30 underline-offset-4 hover:decoration-white">
            {t(leader.credit)}
          </Link>
          <p className="mt-2 text-sm text-kokum-200">{t(prototype)}</p>
        </div>
        <div className="grid min-w-0 grid-cols-2 content-start gap-x-4 gap-y-2 text-sm font-semibold sm:grid-cols-3 md:grid-cols-1">
          <Link href="/chat" className="flex min-h-11 items-center break-words hover:text-white">{t(nav.ask)}</Link>
          <Link href="/everyday" className="flex min-h-11 items-center break-words hover:text-white">{t(nav.everyday)}</Link>
          <Link href="/poshan" className="flex min-h-11 items-center break-words hover:text-white">{t(nav.poshan)}</Link>
          <Link href="/schemes" className="flex min-h-11 items-center break-words hover:text-white">{t(nav.schemes)}</Link>
          <Link href="/safe-shrivardhan" className="flex min-h-11 items-center break-words hover:text-white">{t({mr:"सुरक्षित श्रीवर्धन",en:"Safe Shrivardhan",hi:"Safe Shrivardhan"})}</Link>
          <a href="tel:112" className="flex min-h-11 w-fit items-center gap-1.5 rounded-full bg-red-600 px-4 py-1.5 font-bold text-white hover:bg-red-700">
            <PhoneCall size={14} /> 112
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-6xl border-t border-white/10 px-5 py-4 sm:px-8">
        <Link href="/my-data" className="inline-flex min-h-11 items-center text-sm underline underline-offset-4">{t({en:"My saved data & privacy",mr:"माझी माहिती आणि गोपनीयता",hi:"मेरी जानकारी और गोपनीयता"})}</Link>
      </div>
    </footer>
  );
}
