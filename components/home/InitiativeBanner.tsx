"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { initiativeBanner, leader } from "@/lib/leader";

export default function InitiativeBanner() {
  const { t, lang } = useLang();
  return (
    <section id="home-banner" aria-label="AADHI TI" className="-mx-4 overflow-hidden bg-[#fff4e8] sm:mx-0 sm:rounded-[2rem] sm:border sm:border-kokum-100">
      <div className="grid items-center md:grid-cols-[1.55fr_1fr]">
        <div className="relative min-w-0">
          <Image src={`/brand/localized/home-hero-${lang}.webp`} alt={t({en:"AADHI TI: women across generations, together against a sunrise sky.",mr:"आधी ती: सूर्योदयाच्या पार्श्वभूमीवर सर्व पिढ्यांतील महिला एकत्र.",hi:"आधी ती: सूर्योदय की पृष्ठभूमि में हर पीढ़ी की महिलाएँ एक साथ।"})} width={1600} height={900} priority sizes="(min-width: 768px) 700px, 100vw" className="block h-auto w-full saturate-[.8]" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#fff4e8]/10" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-12 bg-gradient-to-l from-[#fff4e8] to-transparent md:block" />
        </div>
        <div className="flex flex-row-reverse items-center gap-4 px-5 py-5 md:flex-col md:gap-4 md:px-7 md:py-7 md:text-center">
          <Link href="/aditi-tatkare" className="block shrink-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kokum-700">
            <Image src={leader.photo} alt={t(leader.name)} width={432} height={432} priority sizes="(min-width: 1024px) 220px, (min-width: 768px) 170px, 104px" className="h-28 w-24 rounded-2xl border-4 border-white object-cover object-top shadow-[0_12px_30px_-15px_#7e173866] md:h-44 md:w-44 lg:h-56 lg:w-56" />
          </Link>
          <div className="min-w-0 flex-1 text-kokum-800">
            <p className="text-xs font-medium text-kokum-600">{t(initiativeBanner.by)}</p>
            <h1 className="mt-2 font-display text-xl font-bold leading-tight lg:text-2xl">{t(initiativeBanner.name)}</h1>
            {initiativeBanner.lines.filter(l=>t(l)).map(l=><p key={l.en} className="mt-2 text-xs leading-relaxed md:text-sm">{t(l)}</p>)}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-kokum-100 px-5 py-3 text-kokum-800">
        <p className="font-display text-sm font-bold">{t({en:"Nine forms. Many possibilities.",mr:"नऊ रूपं. अनेक शक्यता.",hi:"नौ रूप। अनेक संभावनाएँ।"})}</p>
        <span className="text-xs text-kokum-600 md:hidden">{t({en:"Swipe to explore →",mr:"पाहण्यासाठी सरकवा →",hi:"देखने के लिए स्वाइप करें →"})}</span>
      </div>
      <div tabIndex={0} role="region" aria-label={t({en:"Nine forms of women's empowerment; scroll horizontally",mr:"महिला सक्षमीकरणाची नऊ रूपं; आडवे सरकवा",hi:"महिला सशक्तिकरण के नौ रूप; दाएँ-बाएँ स्क्रॉल करें"})} className="overflow-x-auto overscroll-x-contain focus-visible:outline-2 focus-visible:outline-kokum-700">
        <Image src={`/brand/localized/nav-durga-${lang}.webp`} alt={t({en:"Shailputri: girls and mothers; Brahmacharini: education; Chandraghanta: self-defence; Kushmanda: health; Skandamata: nurturing; Katyayani: justice; Kalaratri: safe spaces; Mahagauri: wellbeing; Siddhidatri: financial independence.",mr:"शैलपुत्री: बालिका आणि मातृशक्ती; ब्रह्मचारिणी: शिक्षण; चंद्रघंटा: स्वसंरक्षण; कुष्मांडा: आरोग्य; स्कंदमाता: संगोपन; कात्यायनी: न्याय; कालरात्री: सुरक्षित जागा; महागौरी: स्वतःसाठी वेळ; सिद्धिदात्री: आर्थिक स्वावलंबन.",hi:"शैलपुत्री: बालिका और मातृशक्ति; ब्रह्मचारिणी: शिक्षा; चंद्रघंटा: आत्मरक्षा; कुष्मांडा: स्वास्थ्य; स्कंदमाता: देखभाल; कात्यायनी: न्याय; कालरात्री: सुरक्षित स्थान; महागौरी: अपने लिए समय; सिद्धिदात्री: आर्थिक स्वतंत्रता।"})} width={1672} height={940} sizes="(min-width: 1152px) 1152px, 900px" className="block h-auto w-full min-w-[900px] opacity-90 md:min-w-0" />
      </div>
    </section>
  );
}
