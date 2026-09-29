"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Mic, PhoneCall } from "lucide-react";
import SOSButton from "@/components/SOSButton";
import ScrollPan from "@/components/ScrollPan";
import DangerBand from "@/components/home/DangerBand";
import SafetySituations from "@/components/home/SafetySituations";
import SafetyPlan from "@/components/home/SafetyPlan";
import { WarliWalkHome, WarliWayHome } from "@/components/WarliArt";
import { useLang } from "@/lib/i18n";
import { chat, nav } from "@/lib/ui";
import { helplines } from "@/lib/data";
import { adultCategories, getTopic, type L, type Topic } from "@/lib/kb";

const copy = {
  place: { mr: "श्रीवर्धन, रायगड", en: "Shrivardhan, Raigad", hi: "श्रीवर्धन, रायगढ़" },
  headline: { mr: "आधी ती.", en: "Her, first.", hi: "पहले वह।" },
  lede: {
    mr: "तिच्या प्रत्येक प्रश्नासाठी. सुरक्षितता, आरोग्य, हक्क, शिक्षण, कमाई किंवा घरातली एखादी अडचण. मराठी, हिंदी किंवा English मध्ये विचारा.",
    en: "For every question she has. Safety, health, rights, school, earning, or trouble at home. Ask in Marathi, Hindi or English.",
    hi: "उसके हर सवाल के लिए। सुरक्षा, सेहत, अधिकार, पढ़ाई, कमाई या घर की कोई परेशानी। मराठी, हिंदी या English में पूछिए।",
  },
  askLabel: { mr: "तुमचा प्रश्न", en: "Your question", hi: "आपका सवाल" },
  askPlaceholder: {
    mr: "उदा. माझ्या नवऱ्याला माझा फोन सतत तपासायचा असतो",
    en: "e.g. My husband keeps checking my phone",
    hi: "जैसे, मेरे पति हमेशा मेरा फ़ोन चेक करते हैं",
  },
  askButton: { mr: "विचारा", en: "Ask", hi: "पूछें" },
  askNote: {
    mr: "नाव, नंबर काहीही लागत नाही. तुमचं संभाषण कुठेही साठवलं जात नाही.",
    en: "No name or number needed. Your conversation isn't stored anywhere.",
    hi: "नाम या नंबर की ज़रूरत नहीं। आपकी बातचीत कहीं सेव नहीं होती।",
  },
  voice: { mr: "आवाजात विचारा", en: "Ask by voice", hi: "आवाज़ में पूछें" },
  menuNote: {
    mr: "विषय निवडा, किंवा वर तुमच्या शब्दांत लिहा.",
    en: "Pick a subject, or write in your own words above.",
    hi: "विषय चुनें, या ऊपर अपने शब्दों में लिखें।",
  },
  othersAsk: { mr: "इतर जणींनी विचारलेलं", en: "What others have asked", hi: "दूसरों ने क्या पूछा" },
  howTitle: { mr: "उत्तर कसं मिळतं", en: "How an answer works", hi: "जवाब कैसे मिलता है" },
  howBody: {
    mr: "प्रत्येक उत्तर तीन भागांत येतं. आधी काय घडतंय ते समजून घेणं, मग काय करता येईल, आणि शेवटी पुढचं एक ठोस पाऊल. धोका असेल तर मदतीचा नंबर सगळ्यात आधी.",
    en: "Every answer comes in three parts. First, what may be happening. Then, what you can do. Last, one clear next step. If you might be in danger, the helpline comes before anything else.",
    hi: "हर जवाब तीन हिस्सों में आता है। पहले, क्या हो रहा हो सकता है। फिर, आप क्या कर सकती हैं। आख़िर में, एक साफ़ अगला कदम। खतरा हो तो मदद का नंबर सबसे पहले।",
  },
  example: { mr: "“माझ्या Instagram वर कुणीतरी मला धमकावत आहे.”", en: "“Someone is threatening me on Instagram.”", hi: "“कोई मुझे Instagram पर धमका रहा है।”" },
  exampleSteps: [
    { mr: "हा ऑनलाइन छळ आहे, आणि तो गुन्हा आहे. यात तुमची चूक नाही.", en: "This is online harassment, and it is a crime. It is not your fault.", hi: "यह ऑनलाइन उत्पीड़न है, और यह अपराध है। इसमें आपकी गलती नहीं।" },
    { mr: "उत्तर देऊ नका. Screenshots ठेवा. Account ला Report आणि Block करा.", en: "Don't reply. Keep screenshots. Report and block the account.", hi: "जवाब न दें। Screenshots रखें। Account को Report और Block करें।" },
    { mr: "1930 वर किंवा cybercrime.gov.in वर तक्रार करा. प्रत्यक्ष धोका वाटत असेल तर 112.", en: "Report on 1930 or cybercrime.gov.in. If you feel in physical danger, 112.", hi: "1930 या cybercrime.gov.in पर शिकायत करें। शारीरिक खतरा लगे तो 112।" },
  ] as L[],
  openExample: { mr: "हे पूर्ण उत्तर पाहा", en: "See the full answer", hi: "पूरा जवाब देखें" },
  girlsTitle: { mr: "मुलींसाठी वेगळी भाषा", en: "Different words for girls", hi: "लड़कियों के लिए अलग भाषा" },
  girlsBody: {
    mr: "10 ते 18 वयाच्या मुलींसाठी सोपी, घाबरवणारी नसलेली उत्तरं. काही चुकीचं घडत असेल तर विश्वासातल्या मोठ्या व्यक्तीकडे आणि 1098 कडे नेणारी.",
    en: "Simple answers that don't frighten, for girls aged 10 to 18. If something is wrong, they lead to a trusted adult and to 1098.",
    hi: "10 से 18 साल की लड़कियों के लिए सरल, न डराने वाले जवाब। कुछ गलत हो रहा हो तो भरोसेमंद बड़े और 1098 तक ले जाते हैं।",
  },
  girlsLink: { mr: "मुलींचा विभाग उघडा", en: "Open the girls' section", hi: "लड़कियों का सेक्शन खोलें" },
  womenTitle: { mr: "वयानुसार आरोग्य", en: "Health that changes with age", hi: "उम्र के हिसाब से सेहत" },
  womenBody: {
    mr: "18, 30, 40 आणि 50 नंतर शरीराचे प्रश्न बदलतात. पाळी, PCOS, थायरॉईड, गर्भारपण, रजोनिवृत्ती, हाडांचं आरोग्य.",
    en: "The body's questions change after 18, 30, 40 and 50. Periods, PCOS, thyroid, pregnancy, menopause, bone health.",
    hi: "18, 30, 40 और 50 के बाद शरीर के सवाल बदलते हैं। पीरियड्स, PCOS, थायरॉइड, गर्भावस्था, मेनोपॉज़, हड्डियों की सेहत।",
  },
  womenLink: { mr: "आरोग्य विभाग उघडा", en: "Open health", hi: "सेहत सेक्शन खोलें" },
  alsoTitle: { mr: "आणखी", en: "Also here", hi: "और भी" },
  coast: {
    mr: "प्रत्येक जणी सुरक्षित घरी पोहोचावी.",
    en: "Every woman should reach home safely.",
    hi: "हर महिला सुरक्षित घर पहुँचे।",
  },
  coastNote: {
    mr: "ST मधून उतरल्यापासून घराच्या दारापर्यंत, AADHI TI सोबत.",
    en: "From the bus stop to her own front door, AADHI TI walks with her.",
    hi: "बस से उतरने से लेकर घर के दरवाज़े तक, AADHI TI साथ।",
  },
  numbersTitle: { mr: "महत्त्वाचे नंबर", en: "Numbers to keep", hi: "ज़रूरी नंबर" },
  numbersNote: { mr: "सगळे मोफत. आत्ताच फोनमध्ये save करून ठेवा.", en: "All free. Save them in your phone now.", hi: "सभी मुफ़्त। अभी फ़ोन में save कर लें।" },
  sosTitle: { mr: "धोका वाटतोय?", en: "Feeling unsafe?", hi: "खतरा लग रहा है?" },
  sosBody: {
    mr: "SOS दाबल्यावर 5 सेकंदांनी तुमच्या विश्वासातल्या माणसांना तुमचं ठिकाण कळवलं जातं. चुकून दाबलं तर रद्द करता येतं.",
    en: "Press SOS and, after 5 seconds, your trusted people get your location. Pressed by mistake? You can cancel.",
    hi: "SOS दबाने के 5 सेकंड बाद आपके भरोसेमंद लोगों को आपकी जगह भेजी जाती है। गलती से दबा? रद्द कर सकती हैं।",
  },
};

const also: { href: string; title: L; body: L }[] = [
  {
    href: "/call",
    title: { mr: "सोबत कॉल", en: "Stay-on-call", hi: "साथ वाली कॉल" },
    body: { mr: "रात्री घरी जाताना AADHI TI फोनवर सोबत राहते.", en: "AADHI TI stays on the line while you walk home at night.", hi: "रात में घर जाते समय AADHI TI फ़ोन पर साथ रहती है।" },
  },
  {
    href: "/everyday",
    title: { mr: "आज काय बनवू?", en: "What to cook today?", hi: "आज क्या बनाऊँ?" },
    body: { mr: "घरात असलेल्या साहित्यावरून पदार्थ आणि आठवड्याचा मेनू.", en: "Dishes from what's in your kitchen, and a week's menu.", hi: "घर में रखी सामग्री से पकवान और हफ़्ते का मेनू।" },
  },
  {
    href: "/schemes",
    title: { mr: "योजना आणि कमाई", en: "Schemes and earning", hi: "योजनाएँ और कमाई" },
    body: { mr: "लाडकी बहीण, बचत गट, homestay. कोणता मार्ग तुमच्यासाठी?", en: "Ladki Bahin, SHGs, homestays. Which fits you?", hi: "लाडकी बहीण, स्वयं सहायता समूह, होमस्टे। आपके लिए कौन-सा?" },
  },
  {
    href: "/safe-shrivardhan",
    title: { mr: "असुरक्षित जागा कळवा", en: "Report an unsafe spot", hi: "असुरक्षित जगह बताएँ" },
    body: { mr: "अंधारा रस्ता, बंद दिवे, निर्जन थांबा. नाव न सांगता.", en: "A dark road, broken lights, a lonely stop. No name needed.", hi: "अंधेरी सड़क, बंद बत्ती, सुनसान स्टॉप। नाम बताए बिना।" },
  },
];

const commonTabs: { id: string; label: L; topics: string[] }[] = [
  { id: "safety", label: { mr: "सुरक्षितता", en: "Safety", hi: "सुरक्षा" }, topics: ["following_me", "photo_threat", "otp_scam", "unsafe_transport"] },
  { id: "health", label: { mr: "आरोग्य", en: "Health", hi: "सेहत" }, topics: ["irregular_periods", "pcos", "pregnancy_warning", "anaemia"] },
  { id: "rights", label: { mr: "हक्क", en: "Rights", hi: "अधिकार" }, topics: ["husband_hits", "workplace_posh", "zero_fir", "property_rights"] },
  { id: "income", label: { mr: "कमाई", en: "Earning", hi: "कमाई" }, topics: ["ladki_bahin", "join_shg", "homestay", "start_business"] },
];

// First sentence of a topic's explanation, for the question list.
const firstSentence = (s: string) => s.split(/(?<=[.।?!])\s/)[0];

const linkCls = "inline-flex items-center gap-2 font-bold text-kokum-600 underline decoration-kokum-200 underline-offset-4 hover:decoration-kokum-500";

export default function Home() {
  const { t } = useLang();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [tab, setTab] = useState(commonTabs[0].id);

  const ask = (e: React.FormEvent) => {
    e.preventDefault();
    const v = q.trim();
    if (v) router.push(`/chat?q=${encodeURIComponent(v)}`);
  };

  const [emergency, ...numbers] = helplines;
  const questions = commonTabs.find((c) => c.id === tab)!.topics.map(getTopic).filter((x): x is Topic => !!x);

  return (
    <div className="pb-6">
      {/* Opening. On desktop the whole hero is one painted Warli wall (white on kokum); on phones the text sits on paper above a painted panel. */}
      <section className="hero-wall grid gap-10 border-b border-ink/10 pt-10 pb-14 md:mt-6 md:mb-12 md:grid-cols-[1fr_1.2fr] md:items-end md:gap-8 md:border-b-0 md:px-12 md:pt-16 md:pb-14 lg:px-14">
        <div className="md:pb-2">
          <p className="text-sm font-semibold tracking-wide text-sea-700 md:text-kokum-200">{t(copy.place)}</p>
          <h1 className="mt-3 font-serif text-[4.5rem] leading-[0.95] font-normal text-kokum-600 sm:text-[7rem] md:text-sand-50">{t(copy.headline)}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink sm:text-xl md:text-kokum-50">{t(copy.lede)}</p>

          <form onSubmit={ask} className="mt-9 max-w-xl">
            <label htmlFor="home-ask" className="text-sm font-bold text-ink md:text-sand-50">
              {t(copy.askLabel)}
            </label>
            <div className="mt-2 flex items-stretch border-2 border-ink bg-white md:border-sand-50">
              <input
                id="home-ask"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t(copy.askPlaceholder)}
                className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-[16px] outline-none placeholder:text-ink-soft/60"
              />
              <Link
                href="/chat"
                title={t(copy.voice)}
                aria-label={t(copy.voice)}
                className="grid w-12 shrink-0 place-items-center border-l-2 border-ink text-ink hover:bg-sand-100 md:border-sand-200"
              >
                <Mic size={19} />
              </Link>
              <button type="submit" className="shrink-0 bg-ink px-5 font-bold text-white hover:bg-kokum-600 md:hover:bg-kokum-900">
                {t(copy.askButton)}
              </button>
            </div>
            <p className="mt-2.5 text-sm text-ink-soft md:text-kokum-100">{t(copy.askNote)}</p>
          </form>
        </div>

        {/* Phones: its own painted panel. Desktop: part of the wall, standing on the ground line. */}
        <figure className="warli-panel -mx-4 px-5 py-7 sm:mx-0 md:mx-0 md:bg-transparent md:bg-none md:p-0">
          <WarliWalkHome className="w-full" />
        </figure>
      </section>

      <DangerBand />

      {/* The eight subjects, as the spec's numbered list */}
      <section className="border-b border-ink/10 py-12 md:py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-serif text-3xl font-normal sm:text-[2.6rem]">{t(chat.menuQuestion)}</h2>
          <p className="text-ink-soft">{t(copy.menuNote)}</p>
        </div>
        <ol className="mt-8 grid border-t border-ink/15 sm:grid-cols-2 sm:gap-x-10">
          {adultCategories.map((c, i) => (
            <li key={c.id} className="border-b border-ink/15">
              <Link href={`/chat?cat=${c.id}`} className="group flex items-baseline gap-5 py-5">
                <span className="w-8 shrink-0 font-serif text-2xl text-kokum-500 tabular-nums">{i + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-xl font-bold text-ink group-hover:text-kokum-600">{t(c.title)}</span>
                  <span className="mt-0.5 block text-[15px] text-ink-soft">{t(c.subtitle)}</span>
                </span>
                <ArrowRight size={18} className="shrink-0 self-center text-ink/25 transition group-hover:translate-x-1 group-hover:text-kokum-600" />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <SafetySituations />
      <SafetyPlan />

      {/* What others asked */}
      <section className="grid gap-8 border-b border-ink/10 py-12 md:grid-cols-[1fr_2fr] md:gap-10 md:py-16">
        <div>
          <h2 className="font-serif text-3xl font-normal sm:text-[2.6rem] sm:leading-tight">{t(copy.othersAsk)}</h2>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2" role="tablist">
            {commonTabs.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={tab === c.id}
                onClick={() => setTab(c.id)}
                className={`border-b-2 pb-1 text-[15px] font-bold transition ${
                  tab === c.id ? "border-kokum-500 text-ink" : "border-transparent text-ink-soft hover:text-ink"
                }`}
              >
                {t(c.label)}
              </button>
            ))}
          </div>
          <span aria-hidden className="mt-10 hidden font-serif text-[10rem] leading-[0.7] text-kokum-200 select-none md:block">“</span>
        </div>
        <ul key={tab} className="animate-fade-up border-t border-ink/15 lg:grid lg:grid-cols-2 lg:gap-x-8">
          {questions.map((tp) => (
            <li key={tp.id} className="border-b border-ink/15">
              <Link href={`/chat?topic=${tp.id}`} className="group block py-5">
                <span className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-xl font-bold text-ink group-hover:text-kokum-600">{t(tp.title)}</span>
                  <ArrowRight size={18} className="shrink-0 text-ink/25 transition group-hover:translate-x-1 group-hover:text-kokum-600" />
                </span>
                <span className="mt-1 block max-w-2xl text-[15px] leading-relaxed text-ink-soft">{firstSentence(t(tp.understand))}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* How an answer works, shown on one real example */}
      <section className="grid gap-8 border-b border-ink/10 py-12 md:grid-cols-[1fr_2fr] md:gap-10 md:py-16">
        <div>
          <h2 className="font-serif text-3xl font-normal sm:text-[2.6rem] sm:leading-tight">{t(copy.howTitle)}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{t(copy.howBody)}</p>
          <StepsDiagram labels={[t(chat.understand), t(chat.answer), t(chat.next)]} />
        </div>
        <div>
          <p className="font-serif text-2xl leading-snug text-ink italic sm:text-3xl">{t(copy.example)}</p>
          <ol className="mt-7 space-y-5">
            {[chat.understand, chat.answer, chat.next].map((label, i) => (
              <li key={i} className="grid grid-cols-[2.25rem_1fr] gap-3">
                <span className="font-serif text-2xl text-sea-600">{i + 1}.</span>
                <span>
                  <span className="block text-sm font-bold tracking-wide text-sea-700">{t(label)}</span>
                  <span className="mt-1 block text-[17px] leading-relaxed text-ink">{t(copy.exampleSteps[i])}</span>
                </span>
              </li>
            ))}
          </ol>
          <Link href="/chat?topic=instagram_threat" className={`mt-7 ${linkCls}`}>
            {t(copy.openExample)} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Girls / women by age */}
      <section className="grid border-b border-ink/10 md:grid-cols-2">
        <div className="border-b border-ink/10 py-12 md:border-r md:border-b-0 md:pr-10">
          <p aria-hidden className="mb-4 font-serif text-[4.5rem] leading-none text-turmeric-500 tabular-nums">10–18</p>
          <h2 className="font-serif text-3xl font-normal">{t(copy.girlsTitle)}</h2>
          <p className="mt-3 max-w-md leading-relaxed text-ink-soft">{t(copy.girlsBody)}</p>
          <Link href="/chat?cat=g_growing" className={`mt-5 ${linkCls}`}>
            {t(copy.girlsLink)} <ArrowRight size={16} />
          </Link>
        </div>
        <div className="py-12 md:pl-10">
          <AgeRuler />
          <h2 className="font-serif text-3xl font-normal">{t(copy.womenTitle)}</h2>
          <p className="mt-3 max-w-md leading-relaxed text-ink-soft">{t(copy.womenBody)}</p>
          <Link href="/chat?cat=health" className={`mt-5 ${linkCls}`}>
            {t(copy.womenLink)} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* "The way home" mural: white Warli paint on kokum */}
      <figure className="-mx-4 mt-12 bg-kokum-700 text-sand-50 sm:mx-0">
        {/* On phones the journey pans with the page scroll, from the bus stop to the front door. */}
        <ScrollPan>
          <WarliWayHome className="h-44 w-[52rem] max-w-none sm:h-auto sm:w-full" />
        </ScrollPan>
        <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-white/10 px-5 py-4 sm:px-8">
          <span className="font-serif text-2xl sm:text-3xl">{t(copy.coast)}</span>
          <span className="text-sm text-kokum-100">{t(copy.coastNote)}</span>
        </figcaption>
      </figure>

      {/* Also here */}
      <section className="border-b border-ink/10 py-12 md:py-16">
        <h2 className="font-serif text-3xl font-normal">{t(copy.alsoTitle)}</h2>
        <div className="mt-6 grid border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {also.map((a, i) => (
            <Link
              key={a.href}
              href={a.href}
              className={`group border-b border-ink/15 py-6 sm:pr-6 lg:border-b-0 ${i % 2 === 1 ? "sm:border-l sm:pl-6" : ""} ${i === 2 ? "lg:border-l lg:pl-6" : ""}`}
            >
              <span className="flex items-center justify-between gap-2 font-display text-lg font-bold text-ink group-hover:text-kokum-600">
                {t(a.title)}
                <ArrowRight size={17} className="text-ink/25 transition group-hover:translate-x-1 group-hover:text-kokum-600" />
              </span>
              <span className="mt-1.5 block text-[15px] leading-relaxed text-ink-soft">{t(a.body)}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Numbers, like a printed directory */}
      <section className="grid gap-10 py-12 md:grid-cols-[1fr_2fr] md:py-16">
        <div>
          <h2 className="font-serif text-3xl font-normal sm:text-[2.6rem]">{t(copy.numbersTitle)}</h2>
          <p className="mt-3 text-ink-soft">{t(copy.numbersNote)}</p>

          <div className="mt-8 border-2 border-red-600 bg-white p-5">
            <p className="font-display text-xl font-bold text-red-700">{t(copy.sosTitle)}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{t(copy.sosBody)}</p>
            <div className="mt-4">
              <SOSButton compact />
            </div>
          </div>
        </div>

        <div>
          <a href={`tel:${emergency.number}`} className="flex items-baseline justify-between gap-4 border-y-2 border-ink py-4 hover:bg-red-50">
            <span>
              <span className="block font-display text-2xl font-bold text-red-700">{t(emergency.name)}</span>
              <span className="text-[15px] text-ink-soft">{t(emergency.desc)}</span>
            </span>
            <span className="font-serif text-5xl text-red-700 tabular-nums">{emergency.number}</span>
          </a>
          <ul>
            {numbers.map((h) => (
              <li key={h.number} className="border-b border-ink/15">
                <a href={`tel:${h.number}`} className="group flex items-baseline gap-4 py-3.5">
                  <span className="min-w-0 flex-1">
                    <span className="font-bold text-ink">{t(h.name)}</span>
                    <span className="text-[15px] text-ink-soft"> · {t(h.desc)}</span>
                  </span>
                  <span className="shrink-0 font-serif text-2xl text-kokum-600 tabular-nums">{h.number}</span>
                  <PhoneCall size={15} className="shrink-0 self-center text-ink/30 group-hover:text-kokum-600" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <p className="border-t border-ink/10 pt-6 text-center text-sm">
        <Link href="/awareness" className="font-semibold text-sea-700 underline underline-offset-4">
          {t(nav.knowledge)}
        </Link>
      </p>
    </div>
  );
}

// Three linked points: understand → answer → next step.
function StepsDiagram({ labels }: { labels: string[] }) {
  const colors = ["bg-sea-600", "bg-leaf-600", "bg-kokum-600"];
  return (
    <ol aria-hidden className="relative mt-10 max-w-[16rem] space-y-6">
      <span className="absolute top-3 bottom-3 left-[0.9rem] w-px bg-ink/20" />
      {labels.map((l, i) => (
        <li key={i} className="relative flex items-center gap-4">
          <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full font-serif text-sm text-white ${colors[i]}`}>{i + 1}</span>
          <span className="text-sm font-bold text-ink">{l}</span>
        </li>
      ))}
    </ol>
  );
}

// A ruler marking the four adult life stages the health journeys cover.
function AgeRuler() {
  const marks = [18, 30, 40, 50];
  return (
    <div aria-hidden className="mb-6 max-w-[18rem]">
      <div className="relative h-10 border-b-2 border-leaf-600">
        {Array.from({ length: 13 }, (_, i) => (
          <span key={i} className={`absolute bottom-0 w-px bg-leaf-600 ${i % 4 === 0 ? "h-4" : "h-2"}`} style={{ left: `${(i / 12) * 100}%` }} />
        ))}
      </div>
      <div className="relative mt-1.5 h-10">
        {marks.map((m, i) => (
          <span key={m} className="absolute -translate-x-1/2 font-serif text-3xl text-leaf-600 first:translate-x-0 last:-translate-x-full" style={{ left: `${(i / 3) * 100}%` }}>
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}
