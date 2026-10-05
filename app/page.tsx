"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Apple,
  ArrowRight,
  ChevronRight,
  Landmark,
  MapPin,
  PhoneCall,
  UtensilsCrossed,
} from "lucide-react";
import CategoryIcon from "@/components/CategoryIcon";
import Leaf from "@/components/Leaf";
import Dashboard from "@/components/home/Dashboard";
import InitiativeBanner from "@/components/home/InitiativeBanner";
import SOSButton from "@/components/SOSButton";
import ScrollPan from "@/components/ScrollPan";
import DangerBand from "@/components/home/DangerBand";
import SafetySituations from "@/components/home/SafetySituations";
import SafetyPlan from "@/components/home/SafetyPlan";
import ThreePillars from "@/components/home/ThreePillars";
import LeaderSection from "@/components/home/LeaderSection";
import { leader } from "@/lib/leader";
import { WarliWayHome } from "@/components/WarliArt";
import { useLang } from "@/lib/i18n";
import { brand, chat, nav } from "@/lib/ui";
import { helplines } from "@/lib/data";
import { adultCategories, getTopic, type L, type Topic } from "@/lib/kb";

const copy = {
  pilot: {
    mr: "रायगड जिल्ह्यासाठी पायलट संकल्पना",
    en: "A pilot concept for Raigad district",
    hi: "रायगड ज़िले के लिए पायलट अवधारणा",
  },
  heroAlt: {
    mr: "सूर्योदयाच्या आकाशात लाल पदराबरोबर उंच झेपावणाऱ्या सर्व वयांच्या स्त्रिया — शाळकरी मुलगी, पोलीस अधिकारी, नोकरी करणारी, शेतकरी, आई आणि आजी.",
    en: "Women of every age — a schoolgirl, a police officer, a professional, a farmer, a mother and a grandmother — rising together on a red saree against a sunrise sky.",
    hi: "सूर्योदय के आसमान में लाल पल्लू के साथ ऊँची उड़ान भरती हर उम्र की महिलाएँ — स्कूली छात्रा, पुलिस अधिकारी, नौकरीपेशा, किसान, माँ और दादी।",
  },
  lede: {
    mr: "सुरक्षा, आर्थिक सुरक्षा आणि कौशल्य. आणि त्याबरोबर आरोग्य, हक्क, घरातली एखादी अडचण. मराठी, हिंदी किंवा English मध्ये विचारा.",
    en: "Safety, security and skill. And with them, health, rights or trouble at home. Ask in Marathi, Hindi or English.",
    hi: "सुरक्षा, आर्थिक सुरक्षा और कौशल। और साथ में सेहत, अधिकार या घर की कोई परेशानी। मराठी, हिंदी या English में पूछिए।",
  },
  askLabel: { mr: "तुमचा प्रश्न", en: "Your question", hi: "आपका सवाल" },
  askPlaceholder: {
    mr: "उदा. माझ्या नवऱ्याला माझा फोन सतत तपासायचा असतो",
    en: "e.g. My husband keeps checking my phone",
    hi: "जैसे, मेरे पति हमेशा मेरा फ़ोन चेक करते हैं",
  },
  askButton: { mr: "विचारा", en: "Ask AADHI TI", hi: "पूछें" },
  askNote: {
    mr: "नाव किंवा नंबर लागत नाही. उत्तरासाठी प्रश्न AI कडे पाठवला जातो — त्यात नाव, फोन नंबर लिहू नका.",
    en: "No name or number needed. Your question is sent to an AI to write the answer — don't include your name or phone number.",
    hi: "नाम या नंबर की ज़रूरत नहीं। जवाब के लिए सवाल AI को भेजा जाता है — उसमें नाम या फ़ोन नंबर न लिखें।",
  },
  voice: { mr: "आवाजात विचारा", en: "Ask by voice", hi: "आवाज़ में पूछें" },
  menuNote: {
    mr: "विषय निवडा, किंवा वर तुमच्या शब्दांत लिहा.",
    en: "Pick a topic, or type your question in the box above.",
    hi: "विषय चुनें, या ऊपर अपने शब्दों में लिखें।",
  },
  othersAsk: {
    mr: "इतर जणींनी विचारलेलं",
    en: "What others have asked",
    hi: "दूसरों ने क्या पूछा",
  },
  howTitle: {
    mr: "उत्तर कसं मिळतं",
    en: "How an answer works",
    hi: "जवाब कैसे मिलता है",
  },
  howBody: {
    mr: "प्रत्येक उत्तर तीन भागांत येतं. आधी काय घडतंय ते समजून घेणं, मग काय करता येईल, आणि शेवटी पुढचं एक ठोस पाऊल. धोका असेल तर मदतीचा नंबर सगळ्यात आधी.",
    en: "Every answer has three parts. First, what may be happening. Next, what you can do. Finally, one clear next step. If you may be in danger, the helpline number comes first.",
    hi: "हर जवाब तीन हिस्सों में आता है। पहले, क्या हो रहा हो सकता है। फिर, आप क्या कर सकती हैं। आख़िर में, एक साफ़ अगला कदम। खतरा हो तो मदद का नंबर सबसे पहले।",
  },
  example: {
    mr: "“माझ्या Instagram वर कुणीतरी मला धमकावत आहे.”",
    en: "“Someone is threatening me on Instagram.”",
    hi: "“कोई मुझे Instagram पर धमका रहा है।”",
  },
  exampleSteps: [
    {
      mr: "हा ऑनलाइन छळ आहे, आणि तो गुन्हा आहे. यात तुमची चूक नाही.",
      en: "This is online harassment, which is a crime. It is not your fault.",
      hi: "यह ऑनलाइन उत्पीड़न है, और यह अपराध है। इसमें आपकी गलती नहीं।",
    },
    {
      mr: "उत्तर देऊ नका. Screenshots ठेवा. Account ला Report आणि Block करा.",
      en: "Do not reply. Save screenshots as evidence. Report and block the account.",
      hi: "जवाब न दें। Screenshots रखें। Account को Report और Block करें।",
    },
    {
      mr: "1930 वर किंवा cybercrime.gov.in वर तक्रार करा. प्रत्यक्ष धोका वाटत असेल तर 112.",
      en: "Report it by calling 1930 or at cybercrime.gov.in. If you feel you are in physical danger, call 112.",
      hi: "1930 या cybercrime.gov.in पर शिकायत करें। शारीरिक खतरा लगे तो 112।",
    },
  ] as L[],
  openExample: {
    mr: "हे पूर्ण उत्तर पाहा",
    en: "See the full answer",
    hi: "पूरा जवाब देखें",
  },
  girlsTitle: {
    mr: "मुलींसाठी वेगळी भाषा",
    en: "Information written for girls",
    hi: "लड़कियों के लिए अलग भाषा",
  },
  girlsBody: {
    mr: "10 ते 18 वयाच्या मुलींसाठी सोपी, घाबरवणारी नसलेली उत्तरं. काही चुकीचं घडत असेल तर विश्वासातल्या मोठ्या व्यक्तीकडे आणि 1098 कडे नेणारी.",
    en: "Simple, non-frightening answers for girls aged 10 to 18. If something is wrong, they point to a trusted adult and to Childline 1098.",
    hi: "10 से 18 साल की लड़कियों के लिए सरल, न डराने वाले जवाब। कुछ गलत हो रहा हो तो भरोसेमंद बड़े और 1098 तक ले जाते हैं।",
  },
  girlsLink: {
    mr: "मुलींचा विभाग उघडा",
    en: "Open the girls' section",
    hi: "लड़कियों का सेक्शन खोलें",
  },
  womenTitle: {
    mr: "वयानुसार आरोग्य",
    en: "Health at every age",
    hi: "उम्र के हिसाब से सेहत",
  },
  womenBody: {
    mr: "18, 30, 40 आणि 50 नंतर शरीराचे प्रश्न बदलतात. पाळी, PCOS, थायरॉईड, गर्भारपण, रजोनिवृत्ती, हाडांचं आरोग्य.",
    en: "Health questions change at 18, 30, 40 and 50. Topics include periods, PCOS, thyroid problems, pregnancy, menopause and bone health.",
    hi: "18, 30, 40 और 50 के बाद शरीर के सवाल बदलते हैं। पीरियड्स, PCOS, थायरॉइड, गर्भावस्था, मेनोपॉज़, हड्डियों की सेहत।",
  },
  womenLink: {
    mr: "आरोग्य विभाग उघडा",
    en: "Open the health section",
    hi: "सेहत सेक्शन खोलें",
  },
  alsoTitle: { mr: "आणखी", en: "More from AADHI TI", hi: "और भी" },
  coast: {
    mr: "प्रत्येक जणी सुरक्षित घरी पोहोचावी.",
    en: "Every woman should reach home safely.",
    hi: "हर महिला सुरक्षित घर पहुँचे।",
  },
  coastNote: {
    mr: "ST मधून उतरल्यापासून घराच्या दारापर्यंत, AADHI TI सोबत.",
    en: "From the bus stop to her front door, AADHI TI is with her every step of the way.",
    hi: "बस से उतरने से लेकर घर के दरवाज़े तक, AADHI TI साथ।",
  },
  numbersTitle: {
    mr: "महत्त्वाचे नंबर",
    en: "Important numbers",
    hi: "ज़रूरी नंबर",
  },
  numbersNote: {
    mr: "सगळे मोफत. आत्ताच फोनमध्ये save करून ठेवा.",
    en: "All are free. Save them on your phone now.",
    hi: "सभी मुफ़्त। अभी फ़ोन में save कर लें।",
  },
  sosTitle: {
    mr: "धोका वाटतोय?",
    en: "Feeling unsafe?",
    hi: "खतरा लग रहा है?",
  },
  sosBody: {
    mr: "SOS हे फक्त प्रात्यक्षिक आहे. तुमचं ठिकाण पाठवलं जात नाही किंवा कोणालाही सूचना दिली जात नाही. आणीबाणीत 112 वर कॉल करा.",
    en: "SOS is a demonstration only. It does not send your location or alert anyone. In an emergency, call 112.",
    hi: "SOS केवल एक डेमो है। आपकी लोकेशन नहीं भेजी जाती और किसी को सूचना नहीं दी जाती। आपातकाल में 112 पर कॉल करें.",
  },
};

const also: { href: string; title: L; body: L }[] = [
  {
    href: "/call",
    title: { mr: "सोबत कॉल", en: "Stay on call", hi: "साथ वाली कॉल" },
    body: {
      mr: "रात्री घरी जाताना AADHI TI फोनवर सोबत राहते.",
      en: "AADHI TI stays on the line with you while you walk home at night.",
      hi: "रात में घर जाते समय AADHI TI फ़ोन पर साथ रहती है।",
    },
  },
  {
    href: "/everyday",
    title: {
      mr: "आज काय बनवू?",
      en: "What to cook today?",
      hi: "आज क्या बनाऊँ?",
    },
    body: {
      mr: "घरात असलेल्या साहित्यावरून पदार्थ आणि आठवड्याचा मेनू.",
      en: "Recipe ideas from what you have at home, plus a weekly menu planner.",
      hi: "घर में रखी सामग्री से पकवान और हफ़्ते का मेनू।",
    },
  },
  {
    href: "/poshan",
    title: { mr: "पोषण", en: "Nutrition", hi: "पोषण" },
    body: {
      mr: "मुली, गरोदर आई, बाळ आणि आजीसाठी स्थानिक, परवडणारं पौष्टिक जेवण.",
      en: "Local, affordable, nutritious food for girls, expectant mothers, babies and grandmothers.",
      hi: "लड़कियों, गर्भवती माँ, बच्चे और दादी के लिए स्थानीय, सस्ता पौष्टिक खाना।",
    },
  },
  {
    href: "/schemes",
    title: {
      mr: "योजना आणि कमाई",
      en: "Schemes and income",
      hi: "योजनाएँ और कमाई",
    },
    body: {
      mr: "लाडकी बहीण, बचत गट, homestay. कोणता मार्ग तुमच्यासाठी?",
      en: "Ladki Bahin Yojana, self-help groups, homestays. Which is right for you?",
      hi: "लाडकी बहीण, स्वयं सहायता समूह, होमस्टे। आपके लिए कौन-सा?",
    },
  },
  {
    href: "/safe-shrivardhan",
    title: {
      mr: "असुरक्षित जागा कळवा",
      en: "Report an unsafe spot",
      hi: "असुरक्षित जगह बताएँ",
    },
    body: {
      mr: "अंधारा रस्ता, बंद दिवे, निर्जन थांबा. नाव न सांगता.",
      en: "Report a dark road, broken streetlights or a deserted bus stop. No name needed.",
      hi: "अंधेरी सड़क, बंद बत्ती, सुनसान स्टॉप। नाम बताए बिना।",
    },
  },
];

const commonTabs: { id: string; label: L; topics: string[] }[] = [
  {
    id: "safety",
    label: { mr: "सुरक्षा", en: "Safety", hi: "सुरक्षा" },
    topics: ["following_me", "photo_threat", "otp_scam", "unsafe_transport"],
  },
  {
    id: "security",
    label: { mr: "आर्थिक सुरक्षा", en: "Financial Security", hi: "आर्थिक सुरक्षा" },
    topics: [
      "ladki_bahin",
      "financial_control",
      "property_rights",
      "maintenance",
    ],
  },
  {
    id: "skill",
    label: { mr: "कौशल्य", en: "Skills", hi: "कौशल" },
    topics: ["training_access", "job_skills", "start_business", "sell_online"],
  },
  {
    id: "health",
    label: { mr: "आरोग्य", en: "Health", hi: "सेहत" },
    topics: ["irregular_periods", "pcos", "pregnancy_warning", "anaemia"],
  },
];

// First sentence of a topic's explanation, for the question list.
const firstSentence = (s: string) => s.split(/(?<=[.।?!])\s/)[0];

const linkCls =
  "inline-flex items-center gap-2 font-bold text-kokum-600 underline decoration-kokum-200 underline-offset-4 hover:decoration-kokum-500";

export default function Home() {
  const { t } = useLang();
  const [tab, setTab] = useState(commonTabs[0].id);

  const [emergency, ...numbers] = helplines;
  const questions = commonTabs
    .find((c) => c.id === tab)!
    .topics.map(getTopic)
    .filter((x): x is Topic => !!x);
  const h2 =
    "font-serif text-3xl leading-tight font-normal text-kokum-700 sm:text-[2.6rem]";

  return (
    <div className="space-y-10 pb-6 md:space-y-14">
      <InitiativeBanner />

      <Dashboard />

      <ThreePillars />

      <LeaderSection />

      <DangerBand />

      {/* The eight subjects */}
      <section>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className={h2}>{t(chat.menuQuestion)}</h2>
          <p className="text-ink-soft">{t(copy.menuNote)}</p>
        </div>
        <ol className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {adultCategories.map((c) => (
            <li key={c.id}>
              <Link href={`/chat?cat=${c.id}`} className="soft-list-item group">
                <span className="icon-circle">
                  <CategoryIcon icon={c.icon} size={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[17px] font-bold text-ink group-hover:text-kokum-700">
                    {t(c.title)}
                  </span>
                  <span className="mt-0.5 block truncate text-[14px] text-ink-soft">
                    {t(c.subtitle)}
                  </span>
                </span>
                <ChevronRight
                  size={18}
                  className="shrink-0 text-kokum-300 transition group-hover:translate-x-0.5 group-hover:text-kokum-600"
                />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <SafetySituations />
      <SafetyPlan />

      {/* What others asked */}
      <section className="soft-card relative overflow-hidden p-5 sm:p-8">
        <Leaf className="absolute -right-4 -bottom-6 h-40 w-auto text-kokum-100" />
        <h2 className={h2}>{t(copy.othersAsk)}</h2>
        <div
          className="no-scrollbar -mx-1 mt-5 flex gap-2 overflow-x-auto px-1 pb-1"
          role="tablist"
        >
          {commonTabs.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={tab === c.id}
              onClick={() => setTab(c.id)}
              className={`shrink-0 ${tab === c.id ? "soft-chip-on" : "soft-chip"}`}
            >
              {t(c.label)}
            </button>
          ))}
        </div>
        <ul
          key={tab}
          className="relative mt-5 grid animate-fade-up gap-3 lg:grid-cols-2"
        >
          {questions.map((tp) => (
            <li key={tp.id}>
              <Link
                href={`/chat?topic=${tp.id}`}
                className="group block h-full rounded-2xl bg-sand-50 p-4 transition hover:bg-kokum-50"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="font-display text-[17px] font-bold text-ink group-hover:text-kokum-700">
                    {t(tp.title)}
                  </span>
                  <ChevronRight
                    size={18}
                    className="mt-0.5 shrink-0 text-kokum-300 group-hover:text-kokum-600"
                  />
                </span>
                <span className="mt-1 block text-[14.5px] leading-relaxed text-ink-soft">
                  {firstSentence(t(tp.understand))}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* How an answer works, shown on one real example */}
      <section className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-8">
        <div>
          <h2 className={h2}>{t(copy.howTitle)}</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            {t(copy.howBody)}
          </p>
          <StepsDiagram
            labels={[t(chat.understand), t(chat.answer), t(chat.next)]}
          />
        </div>
        <div className="soft-card p-5 sm:p-7">
          <p className="rounded-2xl rounded-br-md bg-kokum-700 px-4 py-3 font-serif text-xl leading-snug text-white sm:ml-auto sm:max-w-[85%] sm:text-2xl">
            {t(copy.example)}
          </p>
          <ol className="mt-6 space-y-4">
            {[chat.understand, chat.answer, chat.next].map((label, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-serif text-white ${["bg-sea-600", "bg-leaf-600", "bg-kokum-600"][i]}`}
                >
                  {i + 1}
                </span>
                <span>
                  <span className="block text-sm font-bold text-sea-700">
                    {t(label)}
                  </span>
                  <span className="mt-0.5 block text-[16px] leading-relaxed text-ink">
                    {t(copy.exampleSteps[i])}
                  </span>
                </span>
              </li>
            ))}
          </ol>
          <Link
            href="/chat?topic=instagram_threat"
            className="soft-btn-outline mt-6"
          >
            {t(copy.openExample)} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Girls / women by age */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="soft-card-pink relative overflow-hidden p-6 sm:p-8">
          <p
            aria-hidden
            className="mb-3 font-serif text-[4rem] leading-none text-turmeric-500 tabular-nums"
          >
            10–18
          </p>
          <h2 className="font-serif text-3xl font-normal text-kokum-700">
            {t(copy.girlsTitle)}
          </h2>
          <p className="mt-3 max-w-md leading-relaxed text-ink-soft">
            {t(copy.girlsBody)}
          </p>
          <Link href="/chat?cat=g_growing" className="soft-btn mt-5">
            {t(copy.girlsLink)} <ArrowRight size={16} />
          </Link>
        </div>
        <div className="soft-card p-6 sm:p-8">
          <AgeRuler />
          <h2 className="font-serif text-3xl font-normal text-kokum-700">
            {t(copy.womenTitle)}
          </h2>
          <p className="mt-3 max-w-md leading-relaxed text-ink-soft">
            {t(copy.womenBody)}
          </p>
          <Link href="/chat?cat=health" className="soft-btn-outline mt-5">
            {t(copy.womenLink)} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* "The way home" mural: white Warli paint on kokum */}
      <figure className="-mx-4 overflow-hidden bg-kokum-700 text-sand-50 sm:mx-0 sm:rounded-[2rem]">
        {/* On phones the journey pans with the page scroll, from the bus stop to the front door. */}
        <ScrollPan>
          <WarliWayHome className="h-44 w-[52rem] max-w-none sm:h-auto sm:w-full" />
        </ScrollPan>
        <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-white/10 px-5 py-4 sm:px-8">
          <span className="font-serif text-2xl sm:text-3xl">
            {t(copy.coast)}
          </span>
          <span className="text-sm text-kokum-100">{t(copy.coastNote)}</span>
        </figcaption>
      </figure>

      {/* Also here */}
      <section>
        <h2 className={h2}>{t(copy.alsoTitle)}</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {also.map((a) => {
            const Icon = alsoIcons[a.href] ?? ArrowRight;
            return (
              <Link
                key={a.href}
                href={a.href}
                className="soft-card group flex flex-col p-5 transition hover:border-kokum-300"
              >
                <span className="icon-circle">
                  <Icon size={20} />
                </span>
                <span className="mt-3 font-display text-[17px] font-bold text-ink group-hover:text-kokum-700">
                  {t(a.title)}
                </span>
                <span className="mt-1 block text-[14.5px] leading-relaxed text-ink-soft">
                  {t(a.body)}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Numbers */}
      <section className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-8">
        <div>
          <h2 className={h2}>{t(copy.numbersTitle)}</h2>
          <p className="mt-3 text-ink-soft">{t(copy.numbersNote)}</p>

          <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-5">
            <p className="font-display text-xl font-bold text-red-700">
              {t(copy.sosTitle)}
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
              {t(copy.sosBody)}
            </p>
            <div className="mt-4">
              <SOSButton compact />
            </div>
          </div>
        </div>

        <div className="soft-card overflow-hidden">
          <a
            href={`tel:${emergency.number}`}
            className="flex items-center gap-4 bg-red-600 px-5 py-4 text-white hover:bg-red-700"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/15">
              <PhoneCall size={20} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-xl font-bold">
                {t(emergency.name)}
              </span>
              <span className="text-[14px] text-white/85">
                {t(emergency.desc)}
              </span>
            </span>
            <span className="font-serif text-4xl tabular-nums">
              {emergency.number}
            </span>
          </a>
          <ul className="divide-y divide-kokum-100">
            {numbers.map((h) => (
              <li key={h.number}>
                <a
                  href={`tel:${h.number}`}
                  className="group flex items-center gap-3.5 px-5 py-3.5 hover:bg-kokum-50"
                >
                  <span className="icon-circle h-10 w-10">
                    <PhoneCall size={16} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold text-ink">
                      {t(h.name)}
                    </span>
                    <span className="block truncate text-[14px] text-ink-soft">
                      {t(h.desc)}
                    </span>
                  </span>
                  <span className="shrink-0 font-serif text-2xl text-kokum-600 tabular-nums">
                    {h.number}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <p className="text-center text-sm">
        <Link href="/awareness" className="soft-chip">
          {t(nav.knowledge)} <ArrowRight size={14} />
        </Link>
      </p>
    </div>
  );
}

const alsoIcons: Record<string, typeof ArrowRight> = {
  "/call": PhoneCall,
  "/everyday": UtensilsCrossed,
  "/poshan": Apple,
  "/schemes": Landmark,
  "/safe-shrivardhan": MapPin,
};

// Three linked points: understand → answer → next step.
function StepsDiagram({ labels }: { labels: string[] }) {
  const colors = ["bg-sea-600", "bg-leaf-600", "bg-kokum-600"];
  return (
    <ol aria-hidden className="relative mt-10 max-w-[16rem] space-y-6">
      <span className="absolute top-3 bottom-3 left-[0.9rem] w-px bg-ink/20" />
      {labels.map((l, i) => (
        <li key={i} className="relative flex items-center gap-4">
          <span
            className={`grid h-7 w-7 shrink-0 place-items-center rounded-full font-serif text-sm text-white ${colors[i]}`}
          >
            {i + 1}
          </span>
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
          <span
            key={i}
            className={`absolute bottom-0 w-px bg-leaf-600 ${i % 4 === 0 ? "h-4" : "h-2"}`}
            style={{ left: `${(i / 12) * 100}%` }}
          />
        ))}
      </div>
      <div className="relative mt-1.5 h-10">
        {marks.map((m, i) => (
          <span
            key={m}
            className="absolute -translate-x-1/2 font-serif text-3xl text-leaf-600 first:translate-x-0 last:-translate-x-full"
            style={{ left: `${(i / 3) * 100}%` }}
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}
