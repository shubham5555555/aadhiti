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
import LeadershipPortraits from "@/components/home/LeadershipPortraits";
import InitiativeBanner from "@/components/home/InitiativeBanner";
import SOSButton from "@/components/SOSButton";
import ScrollPan from "@/components/ScrollPan";
import DangerBand from "@/components/home/DangerBand";
import SafetySituations from "@/components/home/SafetySituations";
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
    mr: "एखादा विषय निवडा",
    en: "Choose a topic",
    hi: "कोई विषय चुनें",
  },
  othersAsk: {
    mr: "इतर महिलांनी विचारलेले प्रश्न",
    en: "Questions other women have asked",
    hi: "अन्य महिलाओं के सवाल",
  },
  howTitle: {
    mr: "उत्तर कसे मिळते?",
    en: "How do you get an answer?",
    hi: "जवाब कैसे मिलता है?",
  },
  howBody: {
    mr: "प्रत्येक उत्तर तीन भागांत येतं. आधी काय घडतंय ते समजून घेणं, मग काय करता येईल, आणि शेवटी पुढचं एक ठोस पाऊल. तुम्ही धोक्यात असाल, तर सर्वप्रथम हेल्पलाइनची माहिती दिली जाईल.",
    en: "Every answer has three parts: understanding what is happening, what you can do, and one concrete next step. If you are in danger, helpline information comes first.",
    hi: "हर जवाब तीन हिस्सों में आता है। पहले आपकी स्थिति समझना, फिर क्या किया जा सकता है, और अंत में अगला ठोस कदम। अगर आप खतरे में हैं, तो सबसे पहले हेल्पलाइन की जानकारी दी जाएगी।",
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
      mr: "1930 वर किंवा cybercrime.gov.in वर तक्रार करा. तुम्हाला धोका वाटत असल्यास, ११२ वर कॉल करा.",
      en: "Report it on 1930 or cybercrime.gov.in. If you feel in danger, call 112.",
      hi: "1930 पर या cybercrime.gov.in पर शिकायत करें। खतरा महसूस हो तो 112 पर कॉल करें।",
    },
  ] as L[],
  openExample: {
    mr: "हे पूर्ण उत्तर पाहा",
    en: "See the full answer",
    hi: "पूरा जवाब देखें",
  },
  girlsTitle: {
    mr: "मुलींसाठी शालीन भाषेत मार्गदर्शन",
    en: "Respectful guidance for girls",
    hi: "लड़कियों के लिए सम्मानजनक भाषा में मार्गदर्शन",
  },
  girlsBody: {
    mr: "१० ते १८ वर्षांच्या मुलींसाठी सोप्या आणि भीती न निर्माण करणाऱ्या भाषेत माहिती. काही अडचण असल्यास, विश्वासू मोठ्या व्यक्तीशी बोलण्यास आणि १०९८ वर मदत घेण्यास मार्गदर्शन केले जाते.",
    en: "Simple, reassuring information for girls aged 10–18. If something is wrong, guidance helps them speak to a trusted adult and seek help on 1098.",
    hi: "१० से १८ साल की लड़कियों के लिए सरल, डर न पैदा करने वाली भाषा में जानकारी। कोई परेशानी हो तो किसी भरोसेमंद बड़े से बात करने और 1098 पर मदद लेने का मार्गदर्शन मिलता है।",
  },
  girlsLink: {
    mr: "मुलींचा विभाग उघडा",
    en: "Open the girls' section",
    hi: "लड़कियों का सेक्शन खोलें",
  },
  womenTitle: {
    mr: "वयानुसार बदलणारे महिलांचे आरोग्य",
    en: "Women’s health as they age",
    hi: "उम्र के साथ बदलती महिलाओं की सेहत",
  },
  womenBody: {
    mr: "१८, ३०, ४० आणि ५० वर्षांनंतर आरोग्याशी संबंधित प्रश्न आणि गरजा बदलू शकतात — मासिक पाळी, PCOS, थायरॉईड, गर्भधारणा, रजोनिवृत्ती आणि हाडांचे आरोग्य.",
    en: "Health questions and needs can change after 18, 30, 40 and 50 — periods, PCOS, thyroid health, pregnancy, menopause and bone health.",
    hi: "१८, ३०, ४० और ५० साल के बाद सेहत से जुड़े सवाल और ज़रूरतें बदल सकती हैं — माहवारी, PCOS, थायरॉइड, गर्भावस्था, रजोनिवृत्ति और हड्डियों की सेहत।",
  },
  womenLink: {
    mr: "आरोग्य विभाग उघडा",
    en: "Open the health section",
    hi: "सेहत सेक्शन खोलें",
  },
  alsoTitle: { mr: "‘आधी ती’कडून अजून काय", en: "What else AADHI TI offers", hi: "‘आधी ती’ से और क्या मदद मिलेगी" },
  coast: {
    mr: "प्रत्येक स्त्री सुरक्षितपणे घरी पोहोचावी.",
    en: "Every woman should reach home safely.",
    hi: "हर महिला सुरक्षित घर पहुँचे।",
  },
  coastNote: {
    mr: "बस स्थानकापासून तिच्या घराच्या दारापर्यंत — ‘आधी ती’ प्रत्येक पावलावर तिच्यासोबत.",
    en: "From the bus station to her doorstep — AADHI TI is with her at every step.",
    hi: "बस अड्डे से घर के दरवाज़े तक — ‘आधी ती’ हर कदम पर उसके साथ।",
  },
  numbersTitle: {
    mr: "महत्त्वाचे दूरध्वनी क्रमांक",
    en: "Important phone numbers",
    hi: "महत्त्वपूर्ण फ़ोन नंबर",
  },
  numbersNote: {
    mr: "सर्व सेवा मोफत आहेत. हे क्रमांक आत्ताच तुमच्या फोनमध्ये सेव्ह करा.",
    en: "All services are free. Save these numbers on your phone now.",
    hi: "सभी सेवाएँ मुफ़्त हैं। ये नंबर अभी अपने फ़ोन में सेव कर लें।",
  },
  sosTitle: {
    mr: "धोका वाटतोय?",
    en: "Feeling unsafe?",
    hi: "खतरा लग रहा है?",
  },
  sosBody: {
    mr: "SOS मुळे आपत्कालीन कॉलचे पर्याय उपलब्ध होतात. तुमचे लोकेशन आपोआप पाठवले जात नाही किंवा कोणालाही अलर्ट मिळत नाही. तुम्हाला स्वतः कॉल करावा लागेल.",
    en: "SOS opens emergency call options. It does not automatically send your location or alert anyone. You must make the call yourself.",
    hi: "SOS से आपातकालीन कॉल के विकल्प खुलते हैं। आपकी लोकेशन अपने-आप नहीं भेजी जाती और किसी को अलर्ट नहीं मिलता। आपको खुद कॉल करना होगा।",
  },
};

const also: { href: string; title: L; body: L }[] = [
  {
    href: "/call",
    title: { mr: "फोनवर संपर्कात रहा", en: "Stay connected by phone", hi: "फ़ोन पर जुड़े रहें" },
    body: {
      mr: "रात्री घरी पोहचेपर्यंत ‘आधी ती’ तुमच्यासोबत फोनवर संपर्कात राहते.",
      en: "AADHI TI keeps you company on the phone until you reach home at night.",
      hi: "रात में घर पहुँचने तक ‘आधी ती’ फ़ोन पर आपके साथ रहती है।",
    },
  },
  {
    href: "/everyday",
    title: {
      mr: "आज काय मेन्यू बनवू?",
      en: "What should I cook today?",
      hi: "आज खाने में क्या बनाएँ?",
    },
    body: {
      mr: "घरी उपलब्ध असलेल्या पदार्थांपासून रेसिपीच्या कल्पना, तसेच साप्ताहिक मेनू प्लॅनर.",
      en: "Recipe ideas using ingredients available at home, plus a weekly meal planner.",
      hi: "घर में उपलब्ध सामग्री से व्यंजनों के सुझाव और पूरे हफ़्ते के खाने की योजना।",
    },
  },
  {
    href: "/poshan",
    title: { mr: "पोषण", en: "Nutrition", hi: "पोषण" },
    body: {
      mr: "मुली, गर्भवती महिला, बाळं आणि आजींसाठी स्थानिक, परवडणारे व पौष्टिक आहाराची माहिती.",
      en: "Information on local, affordable, nutritious food for girls, pregnant women, babies and older women.",
      hi: "लड़कियों, गर्भवती महिलाओं, शिशुओं और बुज़ुर्ग महिलाओं के लिए स्थानीय, किफ़ायती और पौष्टिक आहार की जानकारी।",
    },
  },
  {
    href: "/schemes",
    title: {
      mr: "योजना आणि उत्पन्न",
      en: "Schemes and income",
      hi: "योजनाएँ और आय",
    },
    body: {
      mr: "लाडकी बहीण योजना, बचत गट आणि घरबसल्या उत्पन्नाच्या संधी. तुमच्यासाठी योग्य पर्याय कोणता?",
      en: "Ladki Bahin, self-help groups and opportunities to earn from home. Which option is right for you?",
      hi: "लाडकी बहीण योजना, स्वयं सहायता समूह और घर से कमाई के अवसर। आपके लिए कौन-सा विकल्प सही है?",
    },
  },
  {
    href: "/safe-shrivardhan",
    title: {
      mr: "असुरक्षित ठिकाणाची माहिती द्या",
      en: "Report an unsafe place",
      hi: "असुरक्षित जगह की जानकारी दें",
    },
    body: {
      mr: "अंधारा रस्ता, बंद पथदिवे किंवा निर्जन बसथांबा याबद्दल माहिती द्या. स्वतःचे नाव सांगण्याची गरज नाही.",
      en: "Report a dark road, broken street lights or an isolated bus stop. You do not need to give your name.",
      hi: "अँधेरी सड़क, बंद स्ट्रीट लाइट या सुनसान बस स्टॉप की जानकारी दें। अपना नाम बताना ज़रूरी नहीं है।",
    },
  },
];

const commonTabs: { id: string; label: L; topics: string[] }[] = [
  {
    id: "safety",
    label: { mr: "सुरक्षितता", en: "Safety", hi: "सुरक्षा" },
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
      <div className="space-y-2">
        <LeadershipPortraits />
        <InitiativeBanner />
      </div>

      <ThreePillars />

      <LeaderSection />

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

      <Dashboard />


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

      <DangerBand />

      <SafetySituations />

      {/* Numbers */}
      <section id="emergency-contacts" className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-8">
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
