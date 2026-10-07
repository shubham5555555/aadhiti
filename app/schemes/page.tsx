"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { flushSync } from "react-dom";
import {
  Apple,
  ArrowRight,
  Baby,
  BedDouble,
  BookOpen,
  Briefcase,
  Check,
  CookingPot,
  ExternalLink,
  Factory,
  GraduationCap,
  HandCoins,
  HardHat,
  HeartPulse,
  Hospital,
  Landmark,
  Lightbulb,
  PiggyBank,
  RotateCcw,
  Scissors,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Sprout,
  Syringe,
  TreePalm,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { BigFigure } from "@/components/PageArt";
import Leaf from "@/components/Leaf";
import { useLang } from "@/lib/i18n";
import type { L } from "@/lib/kb";
import {
  AGE_BANDS,
  FINDER_FLAGS,
  INCOME_BANDS,
  MARITAL,
  NEEDS,
  RATION_CARDS,
  SCHEMES,
  VERDICT_LABEL,
  WORK,
  findSchemes,
  schemeById,
  type AgeBand,
  type FinderAnswers,
  type FinderFlag,
  type FinderResult,
  type FinderVerdict,
  type IncomeBand,
  type Marital,
  type NeedId,
  type RationCard,
  type Scheme,
  type SchemeStatus,
  type Work,
} from "@/lib/schemes";

type Status = SchemeStatus;

const statusLabel: Record<Status, L> = {
  official: { mr: "अधिकृत माहिती (2026) — बदलू शकते", en: "Official info (2026) — may change", hi: "आधिकारिक जानकारी (2026) — बदल सकती है" },
  recheck: { mr: "पुन्हा पडताळणी आवश्यक", en: "Reverification needed", hi: "दोबारा सत्यापन ज़रूरी" },
  general: { mr: "सर्वसाधारण मार्गदर्शन", en: "General guidance", hi: "सामान्य मार्गदर्शन" },
};

const statusDot: Record<Status, string> = {
  official: "bg-leaf-600",
  recheck: "bg-turmeric-500",
  general: "bg-ink-soft",
};

/** Only the statuses that some scheme actually has go in the legend. */
const legendStatuses = (Object.keys(statusLabel) as Status[]).filter((s) => SCHEMES.some((x) => x.status === s));

const schemeIcon: Record<string, LucideIcon> = {
  ladki: HandCoins,
  lekladki: Baby,
  pmmvy: HeartPulse,
  sukanya: PiggyBank,
  sgnay: Users,
  shravanbal: Users,
  mavim: Users,
  umed: Sprout,
  mudra: Briefcase,
  pmegp: Factory,
  standup: Briefcase,
  vishwakarma: Scissors,
  pmfme: CookingPot,
  aai: TreePalm,
  freeedu: GraduationCap,
  ahilya: Lightbulb,
  pmkvy: BookOpen,
  eshram: HardHat,
  icds: Baby,
  jssk: Hospital,
  uip: Syringe,
  amb: Apple,
  pmposhan: UtensilsCrossed,
};

const verdictDot: Record<FinderVerdict, string> = {
  yes: "bg-leaf-600",
  check: "bg-turmeric-500",
  no: "bg-ink/30",
};

// ---------- Income Finder ----------

// ---------- Income Finder ----------

type Answer = string;
type Question = { id: string; q: L; options: { id: Answer; label: L }[] };

const questions: Question[] = [
  {
    id: "time",
    q: { mr: "तुम्ही रोज किती वेळ देऊ शकता?", en: "How much time can you give each day?", hi: "आप रोज़ कितना समय दे सकती हैं?" },
    options: [
      { id: "few", label: { mr: "2–3 तास", en: "2–3 hours", hi: "2–3 घंटे" } },
      { id: "half", label: { mr: "अर्धा दिवस", en: "Half day", hi: "आधा दिन" } },
      { id: "full", label: { mr: "पूर्ण दिवस", en: "Full day", hi: "पूरा दिन" } },
    ],
  },
  {
    id: "place",
    q: { mr: "तुम्हाला कुठून काम करायचं आहे?", en: "Where would you like to work?", hi: "आप कहाँ से काम करना चाहती हैं?" },
    options: [
      { id: "home", label: { mr: "घरूनच", en: "From home", hi: "घर से ही" } },
      { id: "near", label: { mr: "घराजवळ", en: "Near home", hi: "घर के पास" } },
      { id: "any", label: { mr: "कुठेही", en: "Anywhere", hi: "कहीं भी" } },
    ],
  },
  {
    id: "skill",
    q: { mr: "तुम्हाला काय चांगलं जमतं / आवडतं?", en: "What are you good at or enjoy?", hi: "आपको क्या अच्छा आता है / पसंद है?" },
    options: [
      { id: "cook", label: { mr: "स्वयंपाक", en: "Cooking", hi: "खाना बनाना" } },
      { id: "sew", label: { mr: "शिवणकाम", en: "Tailoring", hi: "सिलाई" } },
      { id: "beauty", label: { mr: "ब्युटी / मेहंदी", en: "Beauty / mehendi", hi: "ब्यूटी / मेहंदी" } },
      { id: "teach", label: { mr: "शिकवणं", en: "Teaching", hi: "पढ़ाना" } },
      { id: "digital", label: { mr: "मोबाइल / संगणक", en: "Phone / computer", hi: "मोबाइल / कंप्यूटर" } },
      { id: "host", label: { mr: "पाहुणचार", en: "Hosting guests", hi: "मेहमाननवाज़ी" } },
      { id: "farm", label: { mr: "शेती / बागायत", en: "Farming / orchards", hi: "खेती / बागवानी" } },
    ],
  },
  {
    id: "money",
    q: { mr: "सुरुवातीला किती पैसे गुंतवू शकता?", en: "How much can you invest to start?", hi: "शुरुआत में कितने पैसे लगा सकती हैं?" },
    options: [
      { id: "none", label: { mr: "काहीच नाही", en: "Nothing", hi: "कुछ नहीं" } },
      { id: "small", label: { mr: "₹10,000 पर्यंत", en: "Up to ₹10,000", hi: "₹10,000 तक" } },
      { id: "some", label: { mr: "₹10,000–50,000", en: "₹10,000–50,000", hi: "₹10,000–50,000" } },
    ],
  },
];

type Idea = { id: string; icon: LucideIcon; name: L; why: L; topic: string; fit: Partial<Record<string, Answer[]>> };

const ideas: Idea[] = [
  { id: "food_products", icon: CookingPot, name: { mr: "घरगुती खाद्यपदार्थ — लोणचं, पापड, कोकम, मसाले", en: "Homemade food products — pickles, papad, kokum, masala", hi: "घरेलू खाद्य उत्पाद — अचार, पापड़, कोकम, मसाले" }, why: { mr: "कोकणातील पदार्थांना पर्यटकांमध्ये मागणी.", en: "Konkan products are in demand with tourists.", hi: "कोंकण के उत्पादों की पर्यटकों में माँग।" }, topic: "homemade_products", fit: { skill: ["cook"], place: ["home"], money: ["small", "some"] } },
  { id: "tiffin", icon: UtensilsCrossed, name: { mr: "डबा / tiffin सेवा", en: "Tiffin service", hi: "टिफ़िन सेवा" }, why: { mr: "कमी भांडवल, रोजचं उत्पन्न.", en: "Low capital, daily income.", hi: "कम पूँजी, रोज़ की कमाई।" }, topic: "food_business", fit: { skill: ["cook"], place: ["home", "near"], money: ["none", "small"], time: ["half", "full"] } },
  { id: "tailoring", icon: Scissors, name: { mr: "शिवणकाम / boutique", en: "Tailoring / boutique", hi: "सिलाई / बुटीक" }, why: { mr: "घरून करता येतं; ब्लाउज, ड्रेस, शाळेचे गणवेश.", en: "Works from home — blouses, dresses, school uniforms.", hi: "घर से हो सकता है — ब्लाउज़, ड्रेस, स्कूल यूनिफ़ॉर्म।" }, topic: "training_access", fit: { skill: ["sew"], place: ["home"], money: ["small", "some"] } },
  { id: "beauty", icon: Sparkles, name: { mr: "घरगुती ब्युटी पार्लर / मेहंदी", en: "Home beauty parlour / mehendi", hi: "घरेलू ब्यूटी पार्लर / मेहंदी" }, why: { mr: "लग्नसराई आणि सणांमध्ये चांगली मागणी.", en: "Strong demand in wedding and festival season.", hi: "शादी और त्योहारों में अच्छी माँग।" }, topic: "start_business", fit: { skill: ["beauty"], place: ["home", "near"], money: ["small", "some"] } },
  { id: "tuition", icon: BookOpen, name: { mr: "शिकवणी वर्ग", en: "Tuition classes", hi: "ट्यूशन क्लास" }, why: { mr: "भांडवल नाही; संध्याकाळचे 2–3 तास पुरेसे.", en: "No capital; 2–3 evening hours are enough.", hi: "पूँजी नहीं; शाम के 2–3 घंटे काफ़ी।" }, topic: "job_skills", fit: { skill: ["teach"], place: ["home"], money: ["none"], time: ["few", "half"] } },
  { id: "homestay", icon: BedDouble, name: { mr: "Homestay / पर्यटक पाहुणचार", en: "Homestay / tourist hosting", hi: "होमस्टे / पर्यटक मेहमाननवाज़ी" }, why: { mr: "श्रीवर्धन-हरिहरेश्वर-दिवेआगर पर्यटन पट्टा.", en: "Shrivardhan–Harihareshwar–Diveagar tourism belt.", hi: "श्रीवर्धन–हरिहरेश्वर–दिवेआगर पर्यटन क्षेत्र।" }, topic: "homestay", fit: { skill: ["host", "cook"], place: ["home"], money: ["some"], time: ["half", "full"] } },
  { id: "digital", icon: Smartphone, name: { mr: "डिजिटल सेवा — online फॉर्म, बँक मित्र", en: "Digital services — online forms, banking correspondent", hi: "डिजिटल सेवाएँ — ऑनलाइन फ़ॉर्म, बैंक मित्र" }, why: { mr: "गावात online कामांसाठी मदत लागते.", en: "Villages need help with online work.", hi: "गाँवों में ऑनलाइन कामों के लिए मदद चाहिए।" }, topic: "digital_payments", fit: { skill: ["digital"], place: ["near", "any"], time: ["half", "full"] } },
  { id: "sell_online", icon: ShoppingBag, name: { mr: "WhatsApp / Instagram वर विक्री", en: "Selling on WhatsApp / Instagram", hi: "WhatsApp / Instagram पर बिक्री" }, why: { mr: "तुमची उत्पादनं शहरातल्या ग्राहकांपर्यंत.", en: "Reach customers in cities with your products.", hi: "अपने उत्पाद शहर के ग्राहकों तक पहुँचाएँ।" }, topic: "sell_online", fit: { skill: ["digital", "cook", "sew"], place: ["home"] } },
  { id: "orchard", icon: TreePalm, name: { mr: "आंबा / कोकम / नारळ प्रक्रिया", en: "Mango / kokum / coconut processing", hi: "आम / कोकम / नारियल प्रसंस्करण" }, why: { mr: "स्थानिक फळांपासून जास्त किंमतीचे पदार्थ.", en: "Turn local fruit into higher-value products.", hi: "स्थानीय फलों से ज़्यादा कीमत वाले उत्पाद।" }, topic: "training_access", fit: { skill: ["farm", "cook"], place: ["home", "near"], money: ["small", "some"] } },
  { id: "jobs", icon: Briefcase, name: { mr: "जवळपासची नोकरी — हॉटेल, दुकान, Anganwadi भरती", en: "Nearby jobs — hotels, shops, Anganwadi recruitment", hi: "आसपास की नौकरी — होटल, दुकान, आंगनवाड़ी भर्ती" }, why: { mr: "नियमित पगार, भांडवल नाही.", en: "Regular salary, no capital needed.", hi: "नियमित वेतन, पूँजी नहीं।" }, topic: "jobs_nearby", fit: { place: ["near", "any"], money: ["none"], time: ["full"] } },
];

function scoreIdeas(answers: Record<string, Answer>) {
  return ideas
    .map((idea) => {
      let score = 0;
      for (const [q, allowed] of Object.entries(idea.fit)) {
        if (allowed?.includes(answers[q])) score += q === "skill" ? 3 : 1;
      }
      return { idea, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}


const copy = {
  figureCaption: {
    mr: "दरमहा, थेट बँक खात्यात. माझी लाडकी बहीण योजना, पात्रतेनुसार.",
    en: "A month, straight into her bank account. Majhi Ladki Bahin, if eligible.",
    hi: "हर महीने, सीधे बैंक खाते में। माझी लाडकी बहीण योजना, पात्रता के अनुसार।",
  },
  eyebrow: { mr: "शासकीय योजना आणि महिलांसाठीच्या सेवा", en: "Government schemes and services for women", hi: "सरकारी योजनाएँ और महिलाओं के लिए सेवाएँ" },
  title: { mr: "तुमच्या हक्काच्या योजना", en: "Schemes that are yours by right", hi: "आपके हक़ की योजनाएँ" },
  body: {
    mr: "पात्रता आणि प्रक्रिया बदलू शकतात. त्यामुळे प्रत्येक योजनेसोबत ही माहिती अधिकृत आहे की सर्वसाधारण मार्गदर्शन, हे स्पष्टपणे दिले आहे",
    en: "Eligibility and procedures can change. Each scheme clearly states whether the information is official or general guidance.",
    hi: "पात्रता और प्रक्रिया बदल सकती हैं। इसलिए हर योजना के साथ स्पष्ट बताया गया है कि जानकारी आधिकारिक है या सामान्य मार्गदर्शन।",
  },
  what: { mr: "काय आहे", en: "What it is", hi: "क्या है" },
  who: { mr: "कोणासाठी", en: "Who it's for", hi: "किसके लिए" },
  benefit: { mr: "लाभ", en: "Benefit", hi: "लाभ" },
  how: { mr: "कसं / कुठे", en: "How / where", hi: "कैसे / कहाँ" },
  ask: { mr: "‘आधी ती’ला विचारा", en: "Ask AADHI TI", hi: "‘आधी ती’ से पूछें" },
  warn: {
    mr: "कोणतीही सरकारी योजना मिळवण्यासाठी एजंटला पैसे देऊ नका. OTP किंवा बँक PIN कोणालाही सांगू नका.",
    en: "Never pay an agent to get a government scheme. Never share your OTP or bank PIN with anyone.",
    hi: "किसी भी सरकारी योजना के लिए एजेंट को पैसे न दें। OTP या बैंक PIN किसी को न बताएँ।",
  },
  finderTitle: { mr: "AADHI TI — उत्पन्न शोधक", en: "AADHI TI — Income Finder", hi: "AADHI TI — कमाई खोजक" },
  finderBody: { mr: "4 सोप्या प्रश्नांची उत्तरं द्या — तुमच्यासाठी योग्य कमाईचे पर्याय पाहा.", en: "Answer 4 simple questions — see the earning options that suit you.", hi: "4 आसान सवालों के जवाब दें — अपने लिए सही कमाई के विकल्प देखें।" },
  results: { mr: "तुमच्यासाठी पर्याय", en: "Options for you", hi: "आपके लिए विकल्प" },
  again: { mr: "पुन्हा करा", en: "Start again", hi: "फिर से करें" },
  learnMore: { mr: "पुढची पावलं", en: "Next steps", hi: "अगले कदम" },
  shg: { mr: "कोणताही पर्याय निवडला तरी — बचत गटात सामील झाल्याने कर्ज, प्रशिक्षण आणि बाजारपेठ मिळते.", en: "Whichever you choose — joining an SHG gives you loans, training and markets.", hi: "जो भी चुनें — स्वयं सहायता समूह से जुड़ने पर कर्ज़, प्रशिक्षण और बाज़ार मिलता है।" },
  lastChecked: { mr: "शेवटची तपासणी", en: "Last checked", hi: "आख़िरी जाँच" },
  scopeMh: { mr: "महाराष्ट्र शासन", en: "Maharashtra", hi: "महाराष्ट्र" },
  scopeIn: { mr: "भारत सरकार", en: "Government of India", hi: "भारत सरकार" },
  docs: { mr: "कागदपत्रं", en: "Documents", hi: "दस्तावेज़" },
  docsMr: { mr: "", en: "Listed in Marathi, as in the official source.", hi: "सूची मराठी में है, जैसी आधिकारिक स्रोत में है।" },
  office: { mr: "श्रीवर्धनमध्ये कुठे", en: "Where in Shrivardhan", hi: "श्रीवर्धन में कहाँ" },
  dept: { mr: "विभाग", en: "Department", hi: "विभाग" },
  caution: { mr: "लक्षात ठेवा", en: "Keep in mind", hi: "ध्यान रखें" },
  site: { mr: "अधिकृत संकेतस्थळ", en: "Official website", hi: "आधिकारिक वेबसाइट" },
  statusSite: { mr: "अर्जाची स्थिती", en: "Application status", hi: "आवेदन की स्थिति" },
  source: { mr: "स्रोत", en: "Source", hi: "स्रोत" },
  needsTitle: { mr: "मला कोणती मदत मिळू शकते?", en: "What help can I get?", hi: "मुझे कौन-सी मदद मिल सकती है?" },
  needsBody: {
    mr: "तुमच्याशी संबंधित पर्याय निवडा. त्यानुसार खालील योजनांची यादी बदलेल.",
    en: "Choose the options that apply to you. The scheme list below will update accordingly.",
    hi: "अपने से जुड़े विकल्प चुनें। नीचे योजनाओं की सूची उसी के अनुसार बदलेगी।",
  },
  needsShowing: { mr: "योजना जुळल्या", en: "matching schemes", hi: "योजनाएँ मिलीं" },
  needsClear: { mr: "सर्व योजना दाखवा", en: "Show all schemes", hi: "सभी योजनाएँ दिखाएँ" },
  schemeFinderTitle: { mr: "योजना शोधा", en: "Find schemes", hi: "योजनाएँ खोजें" },
  schemeFinderBody: {
    mr: "खालील प्रश्नांची उत्तरे द्या. ठरवलेल्या निकषांनुसार तुमच्यासाठी लागू होणाऱ्या योजना शोधल्या जातील.",
    en: "Answer the questions below. Schemes that may apply to you will be found using the stated criteria.",
    hi: "नीचे दिए सवालों के जवाब दें। तय मानदंडों के अनुसार आपके लिए लागू हो सकने वाली योजनाएँ खोजी जाएँगी।",
  },
  fAge: { mr: "वय", en: "Age", hi: "उम्र" },
  fIncome: { mr: "कुटुंबाचं वर्षाचं उत्पन्न", en: "Family income per year", hi: "परिवार की सालाना आमदनी" },
  fRation: { mr: "रेशन कार्ड", en: "Ration card", hi: "राशन कार्ड" },
  fMarital: { mr: "वैवाहिक स्थिती", en: "Marital status", hi: "वैवाहिक स्थिति" },
  fWork: { mr: "काम", en: "Work", hi: "काम" },
  fFlags: { mr: "तुम्हाला लागू असेल ते सगळं निवडा", en: "Tick all that apply", hi: "जो भी आप पर लागू हो, चुनें" },
  fNeedAge: { mr: "आधी वय निवडा.", en: "Choose your age first.", hi: "पहले उम्र चुनें।" },
  fRun: { mr: "पात्रता तपासा", en: "Check eligibility", hi: "पात्रता जाँचें" },
  fNone: {
    mr: "या उत्तरांवरून कोणतीही योजना जुळली नाही. खालची सर्व योजनांची यादी पाहा.",
    en: "No scheme matched these answers. See the full list of schemes below.",
    hi: "इन जवाबों से कोई योजना नहीं मिली। नीचे सभी योजनाओं की सूची देखें।",
  },
  fNote: {
    mr: "हे फक्त मार्गदर्शन आहे, अंतिम निर्णय नाही. पात्रतेचा निर्णय कार्यालय घेतं.",
    en: "This is guidance, not a final decision. The office decides eligibility.",
    hi: "यह सिर्फ़ मार्गदर्शन है, अंतिम फ़ैसला नहीं। पात्रता का फ़ैसला कार्यालय करता है।",
  },
  allSchemes: { mr: "सर्व योजना", en: "All schemes", hi: "सभी योजनाएँ" },
};

const linkCls = "inline-flex items-center gap-2 font-bold text-kokum-600 underline decoration-kokum-200 underline-offset-4 hover:decoration-kokum-500";
const toggleCls = (on: boolean) =>
  `rounded-full border px-4 py-2 text-left text-[15px] font-semibold transition ${
    on ? "border-kokum-700 bg-kokum-700 text-white shadow-[0_8px_18px_-12px_rgba(126,23,56,0.8)]" : "border-kokum-200 bg-white text-ink hover:border-kokum-500 hover:text-kokum-700"
  }`;
const sectionTitle = "font-serif text-3xl font-normal text-kokum-700 sm:text-[2.4rem]";

function Dot({ className }: { className: string }) {
  return <span aria-hidden className={`h-2.5 w-2.5 shrink-0 rounded-full ${className}`} />;
}

function StatusMark({ status }: { status: Status }) {
  const { t } = useLang();
  return (
    <span className="inline-flex items-center gap-2 text-sm text-ink-soft">
      <Dot className={statusDot[status]} />
      {t(statusLabel[status])}
    </span>
  );
}

function VerdictMark({ verdict }: { verdict: FinderVerdict }) {
  const { t } = useLang();
  return (
    <span className="inline-flex items-center gap-2 text-sm font-bold text-ink">
      <Dot className={verdictDot[verdict]} />
      {t(VERDICT_LABEL[verdict])}
    </span>
  );
}

const hostOf = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export default function SchemesPage() {
  const { t } = useLang();
  const [needs, setNeeds] = useState<NeedId[]>([]);

  const shown = useMemo(() => {
    if (!needs.length) return SCHEMES;
    return SCHEMES.map((s, i) => ({ s, i, n: s.needs.filter((x) => (needs as string[]).includes(x)).length }))
      .filter((x) => x.n > 0)
      .sort((a, b) => b.n - a.n || a.i - b.i)
      .map((x) => x.s);
  }, [needs]);

  // Finder links jump to a scheme entry; clear the needs filter first so the entry is on the page.
  const goToScheme = (id: string) => {
    flushSync(() => setNeeds([]));
    document.getElementById(id)?.scrollIntoView({ block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <div className="pb-6">
      {/* Opening */}
      <section className="relative mt-6 grid gap-8 overflow-hidden rounded-3xl border border-kokum-100 bg-gradient-to-br from-kokum-50 via-sand-50 to-white p-6 shadow-[0_10px_30px_-18px_rgba(126,23,56,0.35)] sm:p-10 md:grid-cols-[1.25fr_1fr] md:items-center">
        <Leaf className="absolute -top-4 -right-6 h-44 w-auto text-kokum-200" />
        <div className="relative">
          <p className="text-sm font-semibold tracking-wide text-kokum-500">{t(copy.eyebrow)}</p>
          <h1 className="mt-3 font-serif text-[2.6rem] leading-[1.05] font-normal text-kokum-700 sm:text-[4rem]">{t(copy.title)}</h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft">{t(copy.body)}</p>
          <ul className="mt-6 flex flex-col gap-1.5">
            {legendStatuses.map((s) => (
              <li key={s}>
                <StatusMark status={s} />
              </li>
            ))}
          </ul>
        </div>
        <figure className="relative w-full rounded-3xl border border-kokum-100 bg-white/80 p-5 md:max-w-[20rem] md:justify-self-end">
          <BigFigure value="₹1,500" caption={t(copy.figureCaption)} className="!border-0 !pt-0 text-leaf-600" />
        </figure>
      </section>

      <p className="mt-8 max-w-3xl rounded-2xl border border-turmeric-300 bg-turmeric-50 px-5 py-3.5 text-[15px] font-semibold leading-relaxed text-ink">{t(copy.warn)}</p>

      <NeedsPicker needs={needs} setNeeds={setNeeds} count={shown.length} />

      <SchemeFinder onOpen={goToScheme} />

      {/* Schemes, as ruled entries */}
      <section className="mt-14" aria-labelledby="all-schemes">
        <h2 id="all-schemes" className={sectionTitle}>
          {t(copy.allSchemes)}
        </h2>
        {needs.length > 0 && (
          <p className="mt-2 text-ink-soft">
            <span className="font-bold text-ink tabular-nums">{shown.length}</span> {t(copy.needsShowing)} ·{" "}
            <button onClick={() => setNeeds([])} className="font-bold text-kokum-600 underline decoration-kokum-200 underline-offset-4">
              {t(copy.needsClear)}
            </button>
          </p>
        )}
        <div className="mt-5 space-y-5">
          {shown.map((s) => (
            <SchemeEntry key={s.id} s={s} />
          ))}
        </div>
      </section>

      <IncomeFinder />
    </div>
  );
}

function NeedsPicker({ needs, setNeeds, count }: { needs: NeedId[]; setNeeds: (n: NeedId[]) => void; count: number }) {
  const { t } = useLang();
  const toggle = (id: NeedId) => setNeeds(needs.includes(id) ? needs.filter((x) => x !== id) : [...needs, id]);
  return (
    <section className="mt-14" aria-labelledby="needs-title">
      <h2 id="needs-title" className={sectionTitle}>
        {t(copy.needsTitle)}
      </h2>
      <p className="mt-2 max-w-2xl leading-relaxed text-ink-soft">{t(copy.needsBody)}</p>
      <div className="mt-5 grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2 lg:grid-cols-4">
        {NEEDS.map((n) => {
          const on = needs.includes(n.id);
          return (
            <button
              key={n.id}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(n.id)}
              className={`flex min-h-12 items-center gap-2.5 rounded-2xl border px-4 py-2.5 text-left text-[15px] font-semibold transition ${
                on
                  ? "border-kokum-700 bg-kokum-700 text-white shadow-[0_10px_22px_-14px_rgba(126,23,56,0.8)]"
                  : "border-kokum-100 bg-white text-ink shadow-[0_8px_20px_-16px_rgba(126,23,56,0.45)] hover:border-kokum-300 hover:text-kokum-700"
              }`}
            >
              <span aria-hidden className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${on ? "bg-white/20 text-white" : "bg-kokum-50 text-kokum-300"}`}>
                <Check size={14} strokeWidth={3} />
              </span>
              <span className="min-w-0">{t(n.label)}</span>
            </button>
          );
        })}
      </div>
      {needs.length > 0 && (
        <p className="mt-4 text-[15px] text-ink-soft" aria-live="polite">
          <span className="font-bold text-ink tabular-nums">{count}</span> {t(copy.needsShowing)} ·{" "}
          <a href="#all-schemes" className={linkCls}>
            {t(copy.allSchemes)} <ArrowRight size={15} />
          </a>
        </p>
      )}
    </section>
  );
}

function OptionRow<T extends string>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: L;
  options: { id: T; label: L }[];
  value: T | undefined;
  onChange: (v: T | undefined) => void;
}) {
  const { t } = useLang();
  return (
    <fieldset className="border-b border-kokum-100 py-5">
      <legend className="float-left mb-3 w-full text-sm font-bold text-kokum-600">{t(legend)}</legend>
      <div className="clear-left flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value === o.id;
          return (
            <button key={o.id} type="button" aria-pressed={on} onClick={() => onChange(on ? undefined : o.id)} className={toggleCls(on)}>
              {t(o.label)}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function SchemeFinder({ onOpen }: { onOpen: (id: string) => void }) {
  const { t } = useLang();
  const [age, setAge] = useState<AgeBand>();
  const [income, setIncome] = useState<IncomeBand>();
  const [ration, setRation] = useState<RationCard>();
  const [marital, setMarital] = useState<Marital>();
  const [work, setWork] = useState<Work>();
  const [flags, setFlags] = useState<Partial<Record<FinderFlag, boolean>>>({});
  const [results, setResults] = useState<FinderResult[] | null>(null);
  const [needAge, setNeedAge] = useState(false);

  const run = () => {
    if (!age) {
      setNeedAge(true);
      return;
    }
    setNeedAge(false);
    const answers: FinderAnswers = { age, income, ration, marital, work, flags };
    setResults(findSchemes(answers));
  };

  const reset = () => {
    setAge(undefined);
    setIncome(undefined);
    setRation(undefined);
    setMarital(undefined);
    setWork(undefined);
    setFlags({});
    setResults(null);
    setNeedAge(false);
  };

  const groups: FinderVerdict[] = ["yes", "check", "no"];

  return (
    <section id="scheme-finder" className="mt-14 scroll-mt-28" aria-labelledby="scheme-finder-title">
      <h2 id="scheme-finder-title" className={sectionTitle}>
        {t(copy.schemeFinderTitle)}
      </h2>
      <p className="mt-2 max-w-2xl leading-relaxed text-ink-soft">{t(copy.schemeFinderBody)}</p>

      <div className="soft-card mt-6 px-5 pb-6 sm:px-8">
        <OptionRow legend={copy.fAge} options={AGE_BANDS} value={age} onChange={(v) => (setAge(v), v && setNeedAge(false))} />
        <OptionRow legend={copy.fIncome} options={INCOME_BANDS} value={income} onChange={setIncome} />
        <OptionRow legend={copy.fRation} options={RATION_CARDS} value={ration} onChange={setRation} />
        <OptionRow legend={copy.fMarital} options={MARITAL} value={marital} onChange={setMarital} />
        <OptionRow legend={copy.fWork} options={WORK} value={work} onChange={setWork} />
        <fieldset className="border-b border-kokum-100 py-5">
          <legend className="float-left mb-3 w-full text-sm font-bold text-kokum-600">{t(copy.fFlags)}</legend>
          <div className="clear-left grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {FINDER_FLAGS.map((f) => (
              <label key={f.id} className="flex cursor-pointer items-start gap-3 leading-snug text-ink">
                <input
                  type="checkbox"
                  checked={!!flags[f.id]}
                  onChange={(e) => setFlags((x) => ({ ...x, [f.id]: e.target.checked }))}
                  className="mt-0.5 h-5 w-5 shrink-0 appearance-none rounded-md border-2 border-kokum-300 bg-white bg-clip-content p-[3px] checked:border-kokum-700 checked:bg-kokum-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kokum-500"
                />
                <span>{t(f.label)}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button type="button" onClick={run} className="soft-btn">
            {t(copy.fRun)}
          </button>
          {(results || age || income || ration || marital || work || Object.values(flags).some(Boolean)) && (
            <button type="button" onClick={reset} className="soft-chip">
              <RotateCcw size={14} /> {t(copy.again)}
            </button>
          )}
          {needAge && (
            <p role="alert" className="w-full text-[15px] font-bold text-kokum-600">
              {t(copy.fNeedAge)}
            </p>
          )}
        </div>

        {results && (
          <div className="mt-8 animate-fade-up" aria-live="polite">
            {results.length === 0 ? (
              <p className="leading-relaxed text-ink">{t(copy.fNone)}</p>
            ) : (
              groups.map((g) => {
                const xs = results.filter((r) => r.verdict === g);
                if (!xs.length) return null;
                return (
                  <div key={g} className="mt-6 first:mt-0">
                    <VerdictMark verdict={g} />
                    <ul className="mt-3 space-y-2.5">
                      {xs.map((r) => {
                        const s = schemeById(r.id);
                        if (!s) return null;
                        return (
                          <li key={r.id} className="rounded-2xl border border-kokum-100 bg-sand-50 px-4 py-3.5">
                            <a
                              href={`#${s.id}`}
                              onClick={(e) => {
                                e.preventDefault();
                                onOpen(s.id);
                              }}
                              className="font-bold text-kokum-600 underline decoration-kokum-200 underline-offset-4 hover:decoration-kokum-500"
                            >
                              {t(s.name)}
                            </a>
                            <p className="mt-1 leading-relaxed text-ink">{t(r.reason)}</p>
                            <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{t(s.benefit)}</p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })
            )}
          </div>
        )}

        <p className="mt-6 rounded-2xl bg-sea-50 px-4 py-3 text-[15px] font-semibold leading-relaxed text-ink">{t(copy.fNote)}</p>
      </div>
    </section>
  );
}

function SchemeEntry({ s }: { s: Scheme }) {
  const { t, lang } = useLang();
  const Icon = schemeIcon[s.sourceId] ?? Landmark;
  const list = (items: string[], checks = false) => (
    <ul className="mt-1.5 flex flex-col gap-2">
      {items.map((x, i) => (
        <li key={i} className={`grid gap-2.5 leading-relaxed text-ink ${checks ? "grid-cols-[1.25rem_1fr]" : "grid-cols-[0.75rem_1fr]"}`}>
          {checks ? (
            <span aria-hidden className="mt-[0.2em] grid h-5 w-5 place-items-center rounded-full bg-leaf-500 text-white">
              <Check size={12} strokeWidth={3} />
            </span>
          ) : (
            <span aria-hidden className="mt-[0.65em] h-1.5 w-1.5 rounded-full bg-kokum-300" />
          )}
          <span className="min-w-0 break-words">{x}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <article id={s.id} className="soft-card scroll-mt-28 p-5 sm:p-7">
      <div className="flex items-start gap-3.5">
        <span className="icon-circle mt-0.5">
          <Icon size={21} strokeWidth={1.75} aria-hidden />
        </span>
        <div className="min-w-0">
          <h3 className="font-serif text-2xl leading-snug font-normal text-kokum-700 sm:text-[1.9rem]">{t(s.name)}</h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
            <StatusMark status={s.status} />
            <span className="text-sm text-ink-soft">
              {t(copy.lastChecked)}: <span className="tabular-nums">{s.lastChecked}</span>
            </span>
            <span className="text-sm text-ink-soft">{t(s.scope === "India" ? copy.scopeIn : copy.scopeMh)}</span>
          </div>
        </div>
      </div>

      <dl className="mt-5 grid gap-x-10 gap-y-5 border-t border-kokum-100 pt-5 md:grid-cols-2">
        <div>
          <dt className="text-sm font-bold text-ink-soft">{t(copy.what)}</dt>
          <dd className="mt-1 leading-relaxed text-ink">{t(s.what)}</dd>
        </div>
        <div>
          <dt className="text-sm font-bold text-ink-soft">{t(copy.benefit)}</dt>
          <dd className="mt-1 leading-relaxed text-ink">{t(s.benefit)}</dd>
        </div>
        <div>
          <dt className="text-sm font-bold text-ink-soft">{t(copy.who)}</dt>
          <dd>{list(s.who[lang], true)}</dd>
        </div>
        <div>
          <dt className="text-sm font-bold text-ink-soft">{t(copy.how)}</dt>
          <dd>{list(s.apply[lang])}</dd>
        </div>
        {s.docs && (
          <div>
            <dt className="text-sm font-bold text-ink-soft">{t(copy.docs)}</dt>
            <dd lang="mr">{list(s.docs)}</dd>
            {lang !== "mr" && <dd className="mt-1.5 text-sm text-ink-soft">{t(copy.docsMr)}</dd>}
            {s.docsNote && <dd className="mt-1.5 text-sm text-ink-soft">{t(s.docsNote)}</dd>}
          </div>
        )}
        <div>
          <dt className="text-sm font-bold text-ink-soft">{t(copy.office)}</dt>
          <dd className="mt-1 leading-relaxed text-ink">{t(s.office)}</dd>
          <dd className="mt-1.5 text-sm text-ink-soft" lang="mr">
            {t(copy.dept)}: {s.dept}
          </dd>
        </div>
      </dl>

      {s.caution && (
        <p className="mt-5 max-w-3xl rounded-2xl border border-turmeric-300 bg-turmeric-50 px-4 py-3 text-[15px] leading-relaxed text-ink">
          <span className="font-bold">{t(copy.caution)}: </span>
          {t(s.caution)}
        </p>
      )}

      <div className="mt-5 flex flex-col gap-2 text-[15px]">
        <a href={s.url} target="_blank" rel="noopener noreferrer" className={`${linkCls} min-w-0 break-all`}>
          {t(copy.site)}: {hostOf(s.url)} <ExternalLink size={14} className="shrink-0" aria-hidden />
        </a>
        {s.statusUrl && s.statusUrl !== s.url && (
          <a href={s.statusUrl} target="_blank" rel="noopener noreferrer" className={`${linkCls} min-w-0 break-all`}>
            {t(copy.statusSite)}: {hostOf(s.statusUrl)} <ExternalLink size={14} className="shrink-0" aria-hidden />
          </a>
        )}
        {s.topic && (
          <Link href={`/chat?topic=${s.topic}`} className="soft-btn mt-2 self-start py-2.5 text-[15px]">
            {t(copy.ask)} <ArrowRight size={16} />
          </Link>
        )}
      </div>
      <p className="mt-4 break-words text-sm text-ink-soft">
        {t(copy.source)}: {s.source}
      </p>
    </article>
  );
}

function IncomeFinder() {
  const { t } = useLang();
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const step = questions.findIndex((q) => !answers[q.id]);
  const done = step === -1;
  const results = useMemo(() => (done ? scoreIdeas(answers) : []), [done, answers]);

  return (
    <section id="income-finder" className="mt-14 scroll-mt-28">
      <h2 className={sectionTitle}>{t(copy.finderTitle)}</h2>
      <p className="mt-2 max-w-2xl leading-relaxed text-ink-soft">{t(copy.finderBody)}</p>

      <div className="soft-card mt-6 p-5 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="flex flex-1 gap-1.5" aria-hidden>
            {questions.map((q, i) => (
              <span key={q.id} className={`h-1.5 flex-1 rounded-full ${done || i < step ? "bg-kokum-700" : i === step ? "bg-kokum-400" : "bg-kokum-100"}`} />
            ))}
          </div>
          {Object.keys(answers).length > 0 && (
            <button onClick={() => setAnswers({})} className="soft-chip shrink-0">
              <RotateCcw size={14} /> {t(copy.again)}
            </button>
          )}
        </div>

        {!done ? (
          <div key={step} className="mt-6 animate-fade-up">
            <p className="inline-block rounded-full bg-kokum-50 px-3 py-1 text-sm font-bold text-kokum-700 tabular-nums">
              {step + 1} / {questions.length}
            </p>
            <p className="mt-3 font-serif text-2xl leading-snug font-normal text-kokum-700 sm:text-[1.9rem]">{t(questions[step].q)}</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {questions[step].options.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setAnswers((a) => ({ ...a, [questions[step].id]: o.id }))}
                  className="rounded-full border border-kokum-200 bg-white px-4 py-2.5 font-semibold text-ink transition hover:border-kokum-700 hover:bg-kokum-700 hover:text-white"
                >
                  {t(o.label)}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-6 animate-fade-up">
            <p className="font-serif text-2xl font-normal text-kokum-700 sm:text-[1.9rem]">{t(copy.results)}</p>
            <ol className="mt-4 space-y-3">
              {results.map(({ idea }, i) => (
                <li key={idea.id} className="flex items-start gap-3.5 rounded-2xl border border-kokum-100 bg-sand-50 p-4">
                  <span className="icon-circle relative">
                    <idea.icon size={19} strokeWidth={1.75} aria-hidden />
                    <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-kokum-700 text-[11px] font-bold text-white tabular-nums">{i + 1}</span>
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-lg leading-snug font-bold text-ink">
                      {t(idea.name)}
                    </p>
                    <p className="mt-1 leading-relaxed text-ink-soft">{t(idea.why)}</p>
                    <Link href={`/chat?topic=${idea.topic}`} className={`mt-2 text-[15px] ${linkCls}`}>
                      {t(copy.learnMore)} <ArrowRight size={15} />
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 rounded-2xl bg-leaf-50 px-4 py-3 text-[15px] leading-relaxed text-ink">
              {t(copy.shg)}{" "}
              <Link href="/chat?topic=join_shg" className={linkCls}>
                {t(copy.ask)}
              </Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
