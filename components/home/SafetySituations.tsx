"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Bus,
  Footprints,
  House,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import type { L } from "@/lib/kb";

type Situation = { id: string; label: L; tips: L[]; topic: string; more: L };

const icons: Record<string, LucideIcon> = {
  road: Footprints,
  transport: Bus,
  online: Smartphone,
  home: House,
  work: Briefcase,
};

const situations: Situation[] = [
  {
    id: "road",
    label: { mr: "रस्त्यावर", en: "On the road", hi: "सड़क पर" },
    tips: [
      {
        mr: "उजेड आणि वर्दळ असलेला रस्ता निवडा. रात्री शॉर्टकट टाळा.",
        en: "Choose a well-lit, busy road. Avoid shortcuts at night.",
        hi: "रोशनी और भीड़ वाला रास्ता लें। रात में शॉर्टकट से बचें।",
      },
      {
        mr: "एक कान मोकळा ठेवा. फोनमध्ये मान घालून चालू नका.",
        en: "Keep one ear free. Don't walk while looking at your phone.",
        hi: "एक कान खाली रखें। फ़ोन में सिर झुकाकर न चलें।",
      },
      {
        mr: "कोणी मागे येतंय असं वाटलं तर जवळच्या दुकानात किंवा मेडिकलमध्ये शिरा.",
        en: "If you feel someone is following you, walk into the nearest shop or chemist.",
        hi: "कोई पीछा करता लगे तो पास की दुकान या मेडिकल में चली जाएँ।",
      },
      {
        mr: "घरी पोहोचेपर्यंत कोणाशी तरी फोनवर बोलत राहा.",
        en: "Stay on a phone call with someone until you get home.",
        hi: "घर पहुँचने तक किसी से फ़ोन पर बात करती रहें।",
      },
    ],
    topic: "following_me",
    more: {
      mr: "कोणी पाठलाग करत असेल तर",
      en: "What to do if someone is following you",
      hi: "अगर कोई पीछा कर रहा हो",
    },
  },
  {
    id: "transport",
    label: {
      mr: "रिक्षा, कॅब, ST",
      en: "Auto, cab, bus",
      hi: "ऑटो, कैब, बस",
    },
    tips: [
      {
        mr: "बसण्याआधी गाडीच्या नंबरचा फोटो घरच्यांना पाठवा.",
        en: "Before you get in, send a photo of the number plate to someone at home.",
        hi: "बैठने से पहले गाड़ी के नंबर की फ़ोटो घर भेजें।",
      },
      {
        mr: "ड्रायव्हरच्या मागच्या सीटवर बसा आणि खिडकी थोडी उघडी ठेवा.",
        en: "Sit behind the driver and keep the window slightly open.",
        hi: "ड्राइवर के पीछे वाली सीट पर बैठें और खिड़की थोड़ी खुली रखें।",
      },
      {
        mr: "रस्ता बदलला तर मोठ्याने विचारा. उत्तर पटलं नाही तर 112.",
        en: "If the route changes, ask the driver loudly. If the answer doesn't seem right, call 112.",
        hi: "रास्ता बदले तो ज़ोर से पूछें। जवाब ठीक न लगे तो 112।",
      },
      {
        mr: "ST मध्ये महिलांसाठी राखीव जागा तुमचा हक्क आहे. कंडक्टरला सांगा.",
        en: "You have a right to the seats reserved for women on ST buses. Tell the conductor if someone is sitting there.",
        hi: "बस में महिलाओं की आरक्षित सीट आपका हक़ है। कंडक्टर से कहें।",
      },
    ],
    topic: "unsafe_transport",
    more: {
      mr: "गाडीत असुरक्षित वाटत असेल तर",
      en: "If you feel unsafe in a vehicle",
      hi: "अगर गाड़ी में असुरक्षित लगे",
    },
  },
  {
    id: "online",
    label: { mr: "ऑनलाइन", en: "Online", hi: "ऑनलाइन" },
    tips: [
      {
        mr: "OTP, पासवर्ड आणि खाजगी फोटो कोणालाही देऊ नका — ओळखीच्या व्यक्तीलाही.",
        en: "Never share OTPs, passwords or private photos — not even with someone you know.",
        hi: "OTP, पासवर्ड और निजी फ़ोटो किसी को न दें — जान-पहचान वाले को भी नहीं।",
      },
      {
        mr: "अनोळखी नंबरवरचा व्हिडिओ कॉल उचलू नका.",
        en: "Don't answer video calls from unknown numbers.",
        hi: "अनजान नंबर का वीडियो कॉल न उठाएँ।",
      },
      {
        mr: "धमकी आली तर पैसे देऊ नका. Screenshot घ्या आणि 1930 ला कॉल करा.",
        en: "If someone threatens you, don't pay them. Take screenshots and call 1930.",
        hi: "धमकी मिले तो पैसे न दें। Screenshot लें और 1930 पर कॉल करें।",
      },
      {
        mr: "Instagram private ठेवा. जिथे आहात तिथलं live location पोस्ट करू नका.",
        en: "Keep your Instagram account private. Don't post your location while you are still there.",
        hi: "Instagram private रखें। जहाँ हैं, वहीं की live location पोस्ट न करें।",
      },
    ],
    topic: "photo_threat",
    more: {
      mr: "कोणी फोटोवरून धमकावत असेल तर",
      en: "If someone threatens you with photos",
      hi: "अगर कोई फ़ोटो से धमकाए",
    },
  },
  {
    id: "home",
    label: { mr: "घरात", en: "At home", hi: "घर में" },
    tips: [
      {
        mr: "मारहाण, धमक्या, पैशांवर नियंत्रण — हा सगळा घरगुती हिंसाचार आहे.",
        en: "Hitting, threats and controlling your money are all domestic violence.",
        hi: "मारपीट, धमकी, पैसों पर रोक — यह सब घरेलू हिंसा है।",
      },
      {
        mr: "ओळखपत्र, थोडे पैसे आणि फोन एका पिशवीत तयार ठेवा.",
        en: "Keep your ID documents, some money and a phone ready in one bag.",
        hi: "पहचान पत्र, थोड़े पैसे और फ़ोन एक थैले में तैयार रखें।",
      },
      {
        mr: "शेजारी किंवा विश्वासू व्यक्तीसोबत एक 'code word' ठरवा.",
        en: "Agree on a code word with a neighbour or someone you trust.",
        hi: "पड़ोसी या भरोसेमंद व्यक्ति के साथ एक 'code word' तय करें।",
      },
      {
        mr: "181 वर One Stop Centre कडून निवारा, कायदेशीर आणि वैद्यकीय मदत मिळते.",
        en: "Call 181 to be connected to a One Stop Centre for shelter, legal and medical help.",
        hi: "181 पर One Stop Centre से आश्रय, कानूनी और चिकित्सा मदद मिलती है।",
      },
    ],
    topic: "husband_hits",
    more: {
      mr: "घरात मारहाण होत असेल तर",
      en: "If you're being hurt at home",
      hi: "अगर घर में मारपीट हो रही हो",
    },
  },
  {
    id: "work",
    label: { mr: "कामावर", en: "At work", hi: "काम पर" },
    tips: [
      {
        mr: "10 पेक्षा जास्त कर्मचारी असतील तर तक्रार समिती (Internal Committee) असणं बंधनकारक आहे.",
        en: "Any workplace with more than 10 staff must have an Internal Committee.",
        hi: "10 से ज़्यादा कर्मचारी हों तो शिकायत समिति (Internal Committee) ज़रूरी है।",
      },
      {
        mr: "नकोसे मेसेज, स्पर्श, टोमणे — तारीख आणि वेळेसह लिहून ठेवा.",
        en: "Write down any unwanted messages, touching or remarks, with the date and time.",
        hi: "अनचाहे मैसेज, छूना, ताने — तारीख़ और समय के साथ लिख लें।",
      },
      {
        mr: "घटनेनंतर 3 महिन्यांच्या आत लेखी तक्रार करा.",
        en: "File a written complaint within 3 months of the incident.",
        hi: "घटना के 3 महीने के अंदर लिखित शिकायत करें।",
      },
      {
        mr: "तक्रार केल्याबद्दल त्रास देणं हाही नियमभंग आहे.",
        en: "Being punished for complaining is itself a violation.",
        hi: "शिकायत करने पर परेशान करना भी नियम का उल्लंघन है।",
      },
    ],
    topic: "workplace_posh",
    more: {
      mr: "कामाच्या ठिकाणी छळ होत असेल तर",
      en: "If you're harassed at work",
      hi: "अगर काम पर उत्पीड़न हो",
    },
  },
];

const copy = {
  title: {
    mr: "जिथे असाल, तिथली सुरक्षा",
    en: "Safety, wherever you are",
    hi: "जहाँ हों, वहाँ की सुरक्षा",
  },
  body: {
    mr: "छोट्या सवयी, ज्या मोठा फरक करतात. तुमची परिस्थिती निवडा.",
    en: "Small habits that make a real difference. Choose the place that matches your situation.",
    hi: "छोटी आदतें, जो बड़ा फ़र्क़ करती हैं। अपनी स्थिति चुनें।",
  },
};

export default function SafetySituations() {
  const { t } = useLang();
  const [active, setActive] = useState(situations[0].id);
  const s = situations.find((x) => x.id === active)!;

  return (
    <section className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-8">
      <div>
        <h2 className="font-serif text-3xl leading-tight font-normal text-kokum-700 sm:text-[2.6rem]">
          {t(copy.title)}
        </h2>
        <p className="mt-3 leading-relaxed text-ink-soft">{t(copy.body)}</p>
        <SituationIcon id={active} />
      </div>

      <div className="min-w-0">
        <div
          className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
          role="tablist"
        >
          {situations.map((x) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={active === x.id}
              onClick={() => setActive(x.id)}
              className={`shrink-0 whitespace-nowrap ${active === x.id ? "soft-chip-on" : "soft-chip"}`}
            >
              {t(x.label)}
            </button>
          ))}
        </div>

        <ol
          key={s.id}
          className="soft-card mt-4 animate-fade-up divide-y divide-kokum-100 px-5"
        >
          {s.tips.map((tip, i) => (
            <li key={i} className="flex gap-3 py-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-kokum-50 font-serif text-kokum-600">
                {i + 1}
              </span>
              <span className="text-[16.5px] leading-relaxed text-ink">
                {t(tip)}
              </span>
            </li>
          ))}
        </ol>
        <Link href={`/chat?topic=${s.topic}`} className="soft-btn-outline mt-5">
          {t(s.more)} <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

function SituationIcon({ id }: { id: string }) {
  const Icon = icons[id];
  return (
    <div key={id} aria-hidden className="mt-10 hidden animate-fade-up md:block">
      <span className="grid h-40 w-40 place-items-center rounded-full bg-kokum-50">
        <Icon size={84} strokeWidth={1.2} className="text-kokum-500" />
      </span>
    </div>
  );
}
