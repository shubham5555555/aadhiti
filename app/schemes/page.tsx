"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Baby,
  BedDouble,
  BookOpen,
  Briefcase,
  CookingPot,
  HandCoins,
  HeartPulse,
  RotateCcw,
  Scissors,
  ShieldAlert,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Sprout,
  TreePalm,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { WarliMarket } from "@/components/WarliArt";
import { useLang } from "@/lib/i18n";
import type { L } from "@/lib/kb";

type Status = "official" | "drafting" | "general";

type Scheme = {
  id: string;
  icon: LucideIcon;
  status: Status;
  name: L;
  what: L;
  who: L;
  benefit: L;
  how: L;
  topic?: string;
};

const statusLabel: Record<Status, L> = {
  official: { mr: "अधिकृत माहिती (2026) — बदलू शकते", en: "Official info (2026) — may change", hi: "आधिकारिक जानकारी (2026) — बदल सकती है" },
  drafting: { mr: "धोरण तयार होत आहे", en: "Policy being drafted", hi: "नीति तैयार हो रही है" },
  general: { mr: "सर्वसाधारण मार्गदर्शन", en: "General guidance", hi: "सामान्य मार्गदर्शन" },
};

const statusDot: Record<Status, string> = {
  official: "bg-leaf-600",
  drafting: "bg-turmeric-500",
  general: "bg-ink-soft",
};

const schemes: Scheme[] = [
  {
    id: "ladki-bahin",
    icon: HandCoins,
    status: "official",
    name: { mr: "मुख्यमंत्री माझी लाडकी बहीण योजना", en: "Mukhyamantri Majhi Ladki Bahin Yojana", hi: "मुख्यमंत्री माझी लाडकी बहीण योजना" },
    what: { mr: "पात्र महिलांना दरमहा थेट बँक खात्यात आर्थिक मदत.", en: "Monthly financial support paid directly into eligible women's bank accounts.", hi: "पात्र महिलाओं के बैंक खाते में हर महीने सीधी आर्थिक मदद।" },
    who: { mr: "महाराष्ट्रातील 21–65 वयाच्या महिला; कुटुंबाचं वार्षिक उत्पन्न ₹2.5 लाखांपेक्षा कमी.", en: "Women in Maharashtra aged 21–65 with annual family income below ₹2.5 lakh.", hi: "महाराष्ट्र की 21–65 उम्र की महिलाएँ; परिवार की सालाना आय ₹2.5 लाख से कम।" },
    benefit: { mr: "₹1,500 दरमहा (DBT) — स्वतःच्या बँक खात्यात.", en: "₹1,500 per month by DBT — into her own bank account.", hi: "₹1,500 हर महीने (DBT) — अपने बैंक खाते में।" },
    how: { mr: "अधिकृत portal / Anganwadi सेविका / सेतू केंद्र. e-KYC आवश्यक. कोणत्याही एजंटला पैसे देऊ नका.", en: "Official portal, Anganwadi worker or Setu centre. e-KYC required. Never pay any agent.", hi: "आधिकारिक portal, आंगनवाड़ी सेविका या सेतु केंद्र। e-KYC ज़रूरी। किसी एजेंट को पैसे न दें।" },
    topic: "ladki_bahin",
  },
  {
    id: "single-women",
    icon: Users,
    status: "drafting",
    name: { mr: "एकल महिला धोरण (महाराष्ट्र)", en: "Single Women Policy (Maharashtra)", hi: "एकल महिला नीति (महाराष्ट्र)" },
    what: { mr: "विधवा, घटस्फोटित, विभक्त आणि अविवाहित महिलांसाठी देशातील पहिलं स्वतंत्र धोरण — मसुदा समिती मे 2026 मध्ये स्थापन.", en: "India's first dedicated policy for widowed, divorced, separated and unmarried women — drafting committee formed May 2026.", hi: "विधवा, तलाकशुदा, अलग रह रही और अविवाहित महिलाओं के लिए देश की पहली अलग नीति — मसौदा समिति मई 2026 में बनी।" },
    who: { mr: "एकट्या राहणाऱ्या / एकल महिला.", en: "Single women and women living alone.", hi: "एकल महिलाएँ और अकेली रहने वाली महिलाएँ।" },
    benefit: { mr: "सामाजिक, आर्थिक, शैक्षणिक आणि आरोग्य योजनांपर्यंत पोहोचण्यासाठी एक चौकट.", en: "A framework to help access social, economic, education and health schemes.", hi: "सामाजिक, आर्थिक, शैक्षिक और स्वास्थ्य योजनाओं तक पहुँचने का ढाँचा।" },
    how: { mr: "धोरण जाहीर झाल्यावर इथे माहिती येईल. तोपर्यंत पेन्शन व इतर योजनांसाठी तालुका WCD कार्यालय.", en: "Details will appear here once announced. Meanwhile, ask the Taluka WCD office about pensions and other schemes.", hi: "नीति घोषित होने पर यहाँ जानकारी आएगी। तब तक पेंशन व अन्य योजनाओं के लिए तालुका WCD कार्यालय।" },
    topic: "single_mother",
  },
  {
    id: "adishakti",
    icon: Sprout,
    status: "official",
    name: { mr: "आदिशक्ती अभियान", en: "Adishakti Abhiyan", hi: "आदिशक्ति अभियान" },
    what: { mr: "ग्रामीण महिलांसाठी अभियान — कुपोषण, माता-बाल मृत्यू, बालविवाह आणि लिंगाधारित हिंसा रोखणं, स्थानिक कारभारात सहभाग.", en: "Rural women's campaign — tackling malnutrition, maternal & infant mortality, child marriage and gender-based violence; more women in local governance.", hi: "ग्रामीण महिलाओं का अभियान — कुपोषण, मातृ-शिशु मृत्यु, बाल विवाह और लैंगिक हिंसा रोकना; स्थानीय शासन में भागीदारी।" },
    who: { mr: "गावातील महिला आणि कुटुंबं.", en: "Village women and families.", hi: "गाँव की महिलाएँ और परिवार।" },
    benefit: { mr: "गाव समिती कुटुंबांचं समुपदेशन करते, बालविवाह रोखते आणि घरगुती हिंसेतील महिलांना मदत करते.", en: "Village committees counsel families, prevent child marriages and help domestic-violence survivors.", hi: "गाँव की समितियाँ परिवारों को परामर्श देती हैं, बाल विवाह रोकती हैं और घरेलू हिंसा पीड़िताओं की मदद करती हैं।" },
    how: { mr: "ग्रामपंचायत किंवा Anganwadi सेविकेकडे विचारा.", en: "Ask at your Gram Panchayat or Anganwadi worker.", hi: "ग्राम पंचायत या आंगनवाड़ी सेविका से पूछें।" },
  },
  {
    id: "child-marriage",
    icon: ShieldAlert,
    status: "official",
    name: { mr: "बालविवाहमुक्त महाराष्ट्र", en: "Child-marriage-free Maharashtra", hi: "बाल विवाह मुक्त महाराष्ट्र" },
    what: { mr: "18 वर्षांखालील मुलीचं लग्न गुन्हा आहे. लग्न ठरवणारे, लावणारे, मध्यस्थ यांच्यावरही कारवाई होते.", en: "Marrying a girl under 18 is a crime. Action is taken against those who arrange, conduct or facilitate it too.", hi: "18 साल से कम उम्र की लड़की की शादी अपराध है। शादी तय करने, कराने और बिचौलियों पर भी कार्रवाई होती है।" },
    who: { mr: "कोणीही तक्रार करू शकतं — नाव गुप्त ठेवलं जातं.", en: "Anyone can report — your identity is kept confidential.", hi: "कोई भी शिकायत कर सकता है — नाम गुप्त रखा जाता है।" },
    benefit: { mr: "मुलीचं शिक्षण आणि आरोग्य सुरक्षित.", en: "Protects a girl's education and health.", hi: "लड़की की पढ़ाई और स्वास्थ्य की रक्षा।" },
    how: { mr: "1098 (Childline) किंवा 112 ला कॉल करा.", en: "Call 1098 (Childline) or 112.", hi: "1098 (चाइल्डलाइन) या 112 पर कॉल करें।" },
    topic: "child_marriage",
  },
  {
    id: "anganwadi",
    icon: Baby,
    status: "general",
    name: { mr: "अंगणवाडी सेवा (ICDS)", en: "Anganwadi services (ICDS)", hi: "आंगनवाड़ी सेवाएँ (ICDS)" },
    what: { mr: "गर्भवती, स्तनदा माता आणि 6 वर्षांखालील मुलांसाठी पोषण, वाढ तपासणी, पूर्व-प्राथमिक शिक्षण.", en: "Nutrition, growth monitoring and pre-school for pregnant & breastfeeding women and children under 6.", hi: "गर्भवती, स्तनपान कराने वाली माताओं और 6 साल से छोटे बच्चों के लिए पोषण, विकास जाँच, प्री-स्कूल।" },
    who: { mr: "गर्भवती / स्तनदा महिला, लहान मुलं, किशोरवयीन मुली.", en: "Pregnant / breastfeeding women, young children, adolescent girls.", hi: "गर्भवती / स्तनपान कराने वाली महिलाएँ, छोटे बच्चे, किशोरियाँ।" },
    benefit: { mr: "पूरक आहार, लसीकरण मार्गदर्शन, काही ठिकाणी अंगणवाडी-पाळणाघर.", en: "Supplementary food, vaccination guidance, and in some places an Anganwadi-cum-crèche.", hi: "पूरक आहार, टीकाकरण मार्गदर्शन, कुछ जगह आंगनवाड़ी-क्रेच।" },
    how: { mr: "जवळच्या अंगणवाडीत नोंदणी करा.", en: "Register at your nearest Anganwadi.", hi: "नज़दीकी आंगनवाड़ी में पंजीकरण करें।" },
    topic: "child_nutrition",
  },
  {
    id: "maternity",
    icon: HeartPulse,
    status: "general",
    name: { mr: "प्रधानमंत्री मातृ वंदना योजना", en: "Pradhan Mantri Matru Vandana Yojana", hi: "प्रधानमंत्री मातृ वंदना योजना" },
    what: { mr: "गर्भारपणात आणि बाळंतपणानंतर पोषण व विश्रांतीसाठी रोख मदत.", en: "Cash support for nutrition and rest during pregnancy and after birth.", hi: "गर्भावस्था और प्रसव के बाद पोषण व आराम के लिए नकद मदद।" },
    who: { mr: "पहिलं बाळ; दुसरं बाळ मुलगी असल्यास अतिरिक्त लाभ.", en: "First child; extra benefit if the second child is a girl.", hi: "पहला बच्चा; दूसरी संतान बेटी हो तो अतिरिक्त लाभ।" },
    benefit: { mr: "हप्त्यांमध्ये थेट बँक खात्यात — सध्याची रक्कम अंगणवाडीत विचारा.", en: "Paid in instalments to your bank account — ask your Anganwadi for current amounts.", hi: "किस्तों में सीधे बैंक खाते में — मौजूदा राशि आंगनवाड़ी में पूछें।" },
    how: { mr: "अंगणवाडी सेविका / ASHA ताईकडे नोंदणी.", en: "Register with your Anganwadi worker or ASHA.", hi: "आंगनवाड़ी सेविका / आशा दीदी के पास पंजीकरण।" },
    topic: "pregnancy_checkups",
  },
  {
    id: "shg",
    icon: Users,
    status: "general",
    name: { mr: "बचत गट — MAVIM / UMED", en: "Self Help Groups — MAVIM / UMED", hi: "स्वयं सहायता समूह — MAVIM / UMED" },
    what: { mr: "10–20 महिलांचा गट — बचत, कमी व्याजाचं कर्ज, प्रशिक्षण आणि बाजारपेठ.", en: "Groups of 10–20 women — savings, low-interest loans, training and markets.", hi: "10–20 महिलाओं का समूह — बचत, कम ब्याज का कर्ज़, प्रशिक्षण और बाज़ार।" },
    who: { mr: "कोणतीही महिला — गावात किंवा शहरात.", en: "Any woman — in a village or town.", hi: "कोई भी महिला — गाँव या शहर में।" },
    benefit: { mr: "एकत्र बचत, व्यवसायासाठी कर्ज, प्रदर्शनांमध्ये विक्री.", en: "Collective savings, business loans, selling at exhibitions.", hi: "मिलकर बचत, व्यवसाय के लिए कर्ज़, प्रदर्शनियों में बिक्री।" },
    how: { mr: "ग्रामपंचायत, CRP ताई किंवा MAVIM कार्यालय.", en: "Gram Panchayat, community resource person or the MAVIM office.", hi: "ग्राम पंचायत, CRP दीदी या MAVIM कार्यालय।" },
    topic: "join_shg",
  },
  {
    id: "skills",
    icon: Scissors,
    status: "general",
    name: { mr: "कौशल्य आणि उद्योजकता", en: "Skills & entrepreneurship", hi: "कौशल और उद्यमिता" },
    what: { mr: "RSETI, कौशल्य विकास केंद्रं, MUDRA कर्ज — मोफत प्रशिक्षण आणि व्यवसायासाठी भांडवल.", en: "RSETI, skill development centres, MUDRA loans — free training and capital to start.", hi: "RSETI, कौशल विकास केंद्र, MUDRA लोन — मुफ़्त प्रशिक्षण और व्यवसाय के लिए पूँजी।" },
    who: { mr: "18+ महिला ज्यांना कौशल्य शिकायचं किंवा व्यवसाय सुरू करायचा आहे.", en: "Women 18+ who want to learn a skill or start a business.", hi: "18+ महिलाएँ जो कौशल सीखना या व्यवसाय शुरू करना चाहती हैं।" },
    benefit: { mr: "शिवणकाम, ब्युटी, फूड प्रोसेसिंग, संगणक यांसारखे कोर्स.", en: "Courses like tailoring, beauty, food processing, computers.", hi: "सिलाई, ब्यूटी, फ़ूड प्रोसेसिंग, कंप्यूटर जैसे कोर्स।" },
    how: { mr: "बँक शाखा, तालुका कौशल्य केंद्र किंवा AADHI TI ला विचारा.", en: "Your bank branch, taluka skill centre, or ask AADHI TI.", hi: "बैंक शाखा, तालुका कौशल केंद्र या AADHI TI से पूछें।" },
    topic: "training_access",
  },
];

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
  eyebrow: { mr: "सरकारी योजना आणि महिलांसाठी सेवा", en: "Government schemes & women's services", hi: "सरकारी योजनाएँ और महिलाओं के लिए सेवाएँ" },
  title: { mr: "तुमच्या हक्काच्या योजना", en: "Schemes that are yours by right", hi: "आपके हक़ की योजनाएँ" },
  body: {
    mr: "पात्रता आणि प्रक्रिया बदलू शकते. म्हणून प्रत्येक माहितीवर स्पष्ट लिहिलं आहे — अधिकृत माहिती की सर्वसाधारण मार्गदर्शन.",
    en: "Eligibility and processes can change. So every card clearly says whether it's official information or general guidance.",
    hi: "पात्रता और प्रक्रिया बदल सकती है। इसलिए हर कार्ड पर साफ़ लिखा है — आधिकारिक जानकारी या सामान्य मार्गदर्शन।",
  },
  what: { mr: "काय आहे", en: "What it is", hi: "क्या है" },
  who: { mr: "कोणासाठी", en: "Who it's for", hi: "किसके लिए" },
  benefit: { mr: "लाभ", en: "Benefit", hi: "लाभ" },
  how: { mr: "कसं / कुठे", en: "How / where", hi: "कैसे / कहाँ" },
  ask: { mr: "AADHI TI ला विचारा", en: "Ask AADHI TI", hi: "AADHI TI से पूछें" },
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
};

const linkCls = "inline-flex items-center gap-2 font-bold text-kokum-600 underline decoration-kokum-200 underline-offset-4 hover:decoration-kokum-500";

function StatusMark({ status }: { status: Status }) {
  const { t } = useLang();
  return (
    <span className="inline-flex items-center gap-2 text-sm text-ink-soft">
      <span aria-hidden className={`h-2.5 w-2.5 shrink-0 ${statusDot[status]}`} />
      {t(statusLabel[status])}
    </span>
  );
}

export default function SchemesPage() {
  const { t } = useLang();

  return (
    <div className="pb-6">
      {/* Opening */}
      <section className="grid gap-10 border-b border-ink/10 pt-10 pb-12 md:grid-cols-[1.25fr_1fr] md:items-center">
        <div>
          <p className="text-sm font-semibold tracking-wide text-sea-700">{t(copy.eyebrow)}</p>
          <h1 className="mt-3 font-serif text-[3rem] leading-[1] font-normal text-kokum-600 sm:text-[4.25rem]">{t(copy.title)}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink">{t(copy.body)}</p>
          <ul className="mt-6 flex flex-col gap-1.5">
            {(Object.keys(statusLabel) as Status[]).map((s) => (
              <li key={s}>
                <StatusMark status={s} />
              </li>
            ))}
          </ul>
        </div>
        <figure className="mx-auto w-full max-w-[16rem] md:max-w-[20rem]">
          <WarliMarket className="w-full text-leaf-600" />
        </figure>
      </section>

      <p className="mt-10 max-w-3xl border-l-4 border-turmeric-500 bg-white px-4 py-3 text-[15px] font-semibold leading-relaxed text-ink">{t(copy.warn)}</p>

      {/* Schemes, as ruled entries */}
      <section className="mt-6 border-t border-ink/15">
        {schemes.map((s) => (
          <article id={s.id} key={s.id} className="scroll-mt-28 border-b border-ink/15 py-8">
            <div className="flex items-start gap-3">
              <s.icon size={22} strokeWidth={1.5} className="mt-1.5 shrink-0 text-sea-600" aria-hidden />
              <div className="min-w-0">
                <h2 className="font-serif text-2xl leading-snug font-normal text-ink sm:text-[1.9rem]">{t(s.name)}</h2>
                <div className="mt-1.5">
                  <StatusMark status={s.status} />
                </div>
              </div>
            </div>
            <dl className="mt-5 grid gap-x-10 gap-y-4 md:grid-cols-2">
              {(
                [
                  [copy.what, s.what],
                  [copy.who, s.who],
                  [copy.benefit, s.benefit],
                  [copy.how, s.how],
                ] as [L, L][]
              ).map(([label, value], i) => (
                <div key={i}>
                  <dt className="text-sm font-bold text-ink-soft">{t(label)}</dt>
                  <dd className="mt-1 leading-relaxed text-ink">{t(value)}</dd>
                </div>
              ))}
            </dl>
            {s.topic && (
              <Link href={`/chat?topic=${s.topic}`} className={`mt-5 ${linkCls}`}>
                {t(copy.ask)} <ArrowRight size={16} />
              </Link>
            )}
          </article>
        ))}
      </section>

      <IncomeFinder />
    </div>
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
      <h2 className="font-serif text-3xl font-normal sm:text-[2.4rem]">{t(copy.finderTitle)}</h2>
      <p className="mt-2 max-w-2xl leading-relaxed text-ink-soft">{t(copy.finderBody)}</p>

      <div className="mt-6 border-2 border-ink bg-white p-5 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="flex flex-1 gap-1.5" aria-hidden>
            {questions.map((q, i) => (
              <span key={q.id} className={`h-1 flex-1 ${done || i < step ? "bg-ink" : i === step ? "bg-kokum-500" : "bg-ink/15"}`} />
            ))}
          </div>
          {Object.keys(answers).length > 0 && (
            <button onClick={() => setAnswers({})} className="flex shrink-0 items-center gap-1.5 text-sm font-bold text-ink-soft underline underline-offset-4 hover:text-ink">
              <RotateCcw size={14} /> {t(copy.again)}
            </button>
          )}
        </div>

        {!done ? (
          <div key={step} className="mt-6 animate-fade-up">
            <p className="text-sm font-semibold text-sea-700 tabular-nums">
              {step + 1} / {questions.length}
            </p>
            <p className="mt-1 font-serif text-2xl leading-snug font-normal text-ink sm:text-[1.9rem]">{t(questions[step].q)}</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {questions[step].options.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setAnswers((a) => ({ ...a, [questions[step].id]: o.id }))}
                  className="border-2 border-ink px-4 py-2.5 font-bold text-ink transition-colors hover:bg-ink hover:text-white"
                >
                  {t(o.label)}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-6 animate-fade-up">
            <p className="font-serif text-2xl font-normal text-ink sm:text-[1.9rem]">{t(copy.results)}</p>
            <ol className="mt-4 border-t border-ink/15">
              {results.map(({ idea }, i) => (
                <li key={idea.id} className="grid grid-cols-[2rem_1fr] gap-3 border-b border-ink/15 py-5">
                  <span className="font-serif text-2xl text-kokum-500 tabular-nums">{i + 1}</span>
                  <div className="min-w-0">
                    <p className="flex items-start gap-2 font-display text-lg leading-snug font-bold text-ink">
                      <idea.icon size={18} strokeWidth={1.75} className="mt-1 shrink-0 text-sea-600" aria-hidden />
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
            <p className="mt-6 border-l-4 border-leaf-600 bg-leaf-50 px-4 py-3 text-[15px] leading-relaxed text-ink">
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
