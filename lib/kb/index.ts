import type { AgeGroup, L, Topic } from "./types";
import { safetyTopics } from "./safety";
import { rightsTopics, mindTopics } from "./rights";
import { healthTopics, familyTopics } from "./health";
import { careerTopics, incomeTopics } from "./growth";
import { girlTopics } from "./girls";

export type { AgeGroup, Intent, L, Lang, Topic, Action } from "./types";

// "Everyday Help" questions (cooking, beauty, kids, outings) hand off to the Everyday page.
const everydayTopic: Topic = {
  id: "everyday",
  intent: "find",
  title: { mr: "रोजचं — जेवण, self-care, मुलं, फिरणं", en: "Everyday — food, self-care, kids, outings", hi: "रोज़मर्रा — खाना, self-care, बच्चे, घूमना" },
  keywords: [
    "recipe", "cook", "dinner", "lunch", "breakfast", "tiffin", "menu", "leftover", "shopping list", "meal",
    "makeup", "saree", "hairstyle", "skincare", "self-care", "picnic", "trip", "itinerary", "weekend", "birthday",
    "काय बनवू", "बनवू", "जेवण", "नाश्ता", "डबा", "पाहुणे", "भाजी", "मेनू", "उरलेल्या",
    "खाना", "क्या बनाऊं", "नाश्ता", "टिफिन", "kya banau", "kay banvu",
  ],
  understand: {
    mr: "हा रोजच्या आयुष्याचा प्रश्न आहे — AADHI TI रोजचं विभाग यासाठीच आहे.",
    en: "That's an everyday-life question — the AADHI TI Everyday section is made for this.",
    hi: "यह रोज़मर्रा की ज़िंदगी का सवाल है — AADHI TI रोज़मर्रा सेक्शन इसी के लिए है।",
  },
  answer: [
    { mr: "माझ्या स्वयंपाकघरात काय आहे? — साहित्य निवडा, recipe मिळवा.", en: "What's in my kitchen? — pick ingredients, get recipes.", hi: "मेरी रसोई में क्या है? — सामग्री चुनें, recipe पाएँ।" },
    { mr: "आजचा मेनू, आठवड्याचं नियोजन आणि shopping list.", en: "Today's menu, weekly meal plan and shopping list.", hi: "आज का मेनू, हफ़्ते की योजना और shopping list।" },
    { mr: "झटपट self-care, मुलांचे routine आणि जवळची सहल.", en: "Quick self-care, kids' routines and nearby outings.", hi: "झटपट self-care, बच्चों का routine और पास की सैर।" },
  ],
  next: { mr: "रोजचं विभाग उघडा.", en: "Open the Everyday section.", hi: "रोज़मर्रा सेक्शन खोलें।" },
  actions: [{ label: { mr: "रोजचं उघडा", en: "Open Everyday", hi: "रोज़मर्रा खोलें" }, href: "/everyday" }],
};

export const allTopics: Topic[] = [
  ...safetyTopics,
  ...rightsTopics,
  ...mindTopics,
  ...healthTopics,
  ...familyTopics,
  ...careerTopics,
  ...incomeTopics,
  ...girlTopics,
  everydayTopic,
];

const byId = new Map(allTopics.map((t) => [t.id, t]));
export const getTopic = (id: string) => byId.get(id);

export const topicAllowed = (t: Topic, age: AgeGroup | null) => !t.ages || !age || t.ages.includes(age);

export type Group = { title: L; topics: string[] };
export type CategoryIcon =
  | "shield" | "health" | "study" | "rights" | "income" | "family" | "mind" | "unsure"
  | "growing" | "boundaries" | "school" | "digital";
export type Category = { id: string; icon: CategoryIcon; color: string; title: L; subtitle: L; groups: Group[] };

// The 8 home buttons from the spec, for women 18+.
export const adultCategories: Category[] = [
  {
    id: "safety",
    icon: "shield",
    color: "from-kokum-500 to-kokum-600",
    title: { mr: "माझी सुरक्षितता", en: "My safety", hi: "मेरी सुरक्षा" },
    subtitle: { mr: "आणीबाणी, छळ, प्रवास, सायबर", en: "Emergencies, harassment, travel, online safety", hi: "आपातकाल, उत्पीड़न, यात्रा, साइबर" },
    groups: [
      { title: { mr: "आणीबाणी", en: "Emergency", hi: "आपातकाल" }, topics: ["immediate_danger", "following_me", "after_assault", "help_info_ready", "safety_plan"] },
      { title: { mr: "बाहेर आणि प्रवासात", en: "Outside & travel", hi: "बाहर और यात्रा में" }, topics: ["unsafe_travel", "public_harassment", "unsafe_transport", "night_carry", "solo_travel", "stalking_offline", "report_unsafe_place"] },
      { title: { mr: "ऑनलाइन / सायबर", en: "Online / cyber", hi: "ऑनलाइन / साइबर" }, topics: ["photo_threat", "instagram_threat", "fake_profile", "hacked_account", "otp_scam", "money_to_scammer", "online_stalking", "secure_whatsapp", "evidence_screenshot"] },
    ],
  },
  {
    id: "health",
    icon: "health",
    color: "from-kokum-400 to-kokum-500",
    title: { mr: "माझं आरोग्य", en: "My health", hi: "मेरा स्वास्थ्य" },
    subtitle: { mr: "पाळी, गर्भारपण, PCOS, थायरॉईड", en: "Periods, pregnancy, PCOS, thyroid", hi: "पीरियड्स, गर्भावस्था, PCOS, थायरॉइड" },
    groups: [
      { title: { mr: "माझा आरोग्य प्रवास", en: "My health journey", hi: "मेरी स्वास्थ्य यात्रा" }, topics: ["journey_18", "journey_30", "journey_40", "journey_50", "menopause"] },
      { title: { mr: "पाळी आणि प्रजनन आरोग्य", en: "Periods & reproductive health", hi: "पीरियड्स और प्रजनन स्वास्थ्य" }, topics: ["irregular_periods", "period_pain", "heavy_bleeding", "anaemia", "pcos", "thyroid", "menstrual_products", "gyn_questions"] },
      { title: { mr: "गर्भारपण आणि बाळंतपणानंतर", en: "Pregnancy & after birth", hi: "गर्भावस्था और प्रसव के बाद" }, topics: ["pregnancy_warning", "pregnancy_checkups", "pregnancy_nutrition", "delivery_prep", "postpartum_recovery", "breastfeeding", "newborn_care"] },
    ],
  },
  {
    id: "career",
    icon: "study",
    color: "from-sea-500 to-sea-600",
    title: { mr: "माझं शिक्षण / करिअर", en: "My education and career", hi: "मेरी पढ़ाई / करियर" },
    subtitle: { mr: "कोर्स, शिष्यवृत्ती, नोकरी, CV", en: "Courses, scholarships, jobs, CV", hi: "कोर्स, छात्रवृत्ति, नौकरी, CV" },
    groups: [
      { title: { mr: "शिक्षण", en: "Education", hi: "पढ़ाई" }, topics: ["after_10_12", "iti_courses", "scholarships", "return_to_education"] },
      { title: { mr: "करिअर", en: "Career", hi: "करियर" }, topics: ["jobs_nearby", "job_skills", "write_cv", "interview_prep", "career_after_marriage"] },
    ],
  },
  {
    id: "rights",
    icon: "rights",
    color: "from-sea-700 to-sea-800",
    title: { mr: "माझे हक्क", en: "My rights", hi: "मेरे अधिकार" },
    subtitle: { mr: "घरगुती हिंसा, कामाच्या ठिकाणी छळ, कायदा", en: "Domestic violence, workplace harassment, the law", hi: "घरेलू हिंसा, कार्यस्थल, कानून" },
    groups: [
      { title: { mr: "घर आणि नातेसंबंध", en: "Home & relationships", hi: "घर और रिश्ते" }, topics: ["husband_hits", "inlaws_threat", "coercive_control", "financial_control", "partner_forcing", "afraid_tell_family", "what_is_abuse", "document_abuse"] },
      { title: { mr: "छळ", en: "Harassment", hi: "उत्पीड़न" }, topics: ["workplace_posh", "known_abuser", "stalking_offline"] },
      { title: { mr: "कायदेविषयक माहिती", en: "Legal information", hi: "कानूनी जानकारी" }, topics: ["zero_fir", "legal_aid", "dowry", "maintenance", "divorce_separation", "property_rights", "marriage_rights", "child_marriage"] },
    ],
  },
  {
    id: "income",
    icon: "income",
    color: "from-turmeric-400 to-turmeric-500",
    title: { mr: "माझं उत्पन्न / व्यवसाय", en: "My income and business", hi: "मेरी कमाई / व्यवसाय" },
    subtitle: { mr: "योजना, बचत गट, व्यवसाय", en: "Schemes, self-help groups, starting a business", hi: "योजनाएँ, SHG, व्यवसाय" },
    groups: [
      { title: { mr: "सरकारी योजना", en: "Government schemes", hi: "सरकारी योजनाएँ" }, topics: ["ladki_bahin", "schemes_overview", "scheme_apply"] },
      { title: { mr: "कमाई सुरू करा", en: "Start earning", hi: "कमाई शुरू करें" }, topics: ["income_finder", "start_business", "join_shg", "homestay", "homemade_products", "food_business", "sell_online", "digital_payments", "business_documents", "training_access"] },
    ],
  },
  {
    id: "family",
    icon: "family",
    color: "from-leaf-500 to-leaf-600",
    title: { mr: "माझं कुटुंब / मुलं", en: "My family and children", hi: "मेरा परिवार / बच्चे" },
    subtitle: { mr: "मुलींची सुरक्षा, पालकत्व, एकट्या महिला", en: "Girls' safety, parenting, single women", hi: "बेटियों की सुरक्षा, पालन-पोषण, अकेली महिलाएँ" },
    groups: [
      { title: { mr: "मुलं", en: "Children", hi: "बच्चे" }, topics: ["child_afraid_relative", "daughter_safety", "daughter_online_safety", "daughter_silent", "child_nutrition", "creche", "screen_time"] },
      { title: { mr: "आधार", en: "Support", hi: "सहारा" }, topics: ["single_mother", "elder_women"] },
    ],
  },
  {
    id: "mind",
    icon: "mind",
    color: "from-sea-400 to-sea-500",
    title: { mr: "माझं मन / Wellbeing", en: "My mind and wellbeing", hi: "मेरा मन / Wellbeing" },
    subtitle: { mr: "ताण, चिंता, एकटेपणा, counselling", en: "Stress, anxiety, loneliness, counselling", hi: "तनाव, चिंता, अकेलापन, counselling" },
    groups: [
      { title: { mr: "मला कसं वाटतंय", en: "How I feel", hi: "मुझे कैसा लग रहा है" }, topics: ["self_harm", "overwhelmed", "anxious", "stress", "lonely", "no_one_to_talk", "grieving", "family_pressure", "postpartum_struggle", "counsellor"] },
    ],
  },
  {
    id: "unsure",
    icon: "unsure",
    color: "from-ink-soft to-ink",
    title: { mr: "मला काय करावं कळत नाही", en: "I don't know what to do", hi: "मुझे समझ नहीं आ रहा क्या करूँ" },
    subtitle: { mr: "तुमच्या शब्दांत सांगा", en: "Describe it in your own words", hi: "अपने शब्दों में बताइए" },
    groups: [],
  },
];

// A separate, age-appropriate pathway for girls 10–18.
export const girlCategories: Category[] = [
  {
    id: "g_safety",
    icon: "shield",
    color: "from-kokum-500 to-kokum-600",
    title: { mr: "माझी सुरक्षितता", en: "My safety", hi: "मेरी सुरक्षा" },
    subtitle: { mr: "कोणी त्रास देत असेल तर", en: "If someone is bothering you", hi: "अगर कोई परेशान करे" },
    groups: [{ title: { mr: "सुरक्षितता", en: "Safety", hi: "सुरक्षा" }, topics: ["g_uncomfortable", "following_me", "public_harassment", "g_say_no", "g_trusted_adults"] }],
  },
  {
    id: "g_growing",
    icon: "growing",
    color: "from-kokum-400 to-kokum-500",
    title: { mr: "मोठं होताना", en: "Growing up", hi: "बड़े होते हुए" },
    subtitle: { mr: "पाळी, शरीरातील बदल, स्वच्छता", en: "Periods, body changes, hygiene", hi: "पीरियड्स, शरीर में बदलाव, सफ़ाई" },
    groups: [{ title: { mr: "मोठं होताना", en: "Growing up", hi: "बड़े होते हुए" }, topics: ["g_first_period", "g_period_pain", "g_puberty", "g_hygiene", "g_nutrition"] }],
  },
  {
    id: "g_boundaries",
    icon: "boundaries",
    color: "from-turmeric-400 to-turmeric-500",
    title: { mr: "माझ्या मर्यादा", en: "My boundaries", hi: "मेरी सीमाएँ" },
    subtitle: { mr: "चांगला / नकोसा स्पर्श, नाही म्हणणं", en: "Safe / unsafe touch, saying no", hi: "अच्छा / बुरा स्पर्श, ना कहना" },
    groups: [{ title: { mr: "माझ्या मर्यादा", en: "My boundaries", hi: "मेरी सीमाएँ" }, topics: ["g_touch", "g_say_no", "g_trusted_adults", "g_uncomfortable"] }],
  },
  {
    id: "g_school",
    icon: "school",
    color: "from-sea-500 to-sea-600",
    title: { mr: "शाळा आणि मैत्री", en: "School & friends", hi: "स्कूल और दोस्ती" },
    subtitle: { mr: "चिडवणं, दबाव, परीक्षेची भीती", en: "Bullying, pressure, exam fear", hi: "चिढ़ाना, दबाव, परीक्षा का डर" },
    groups: [{ title: { mr: "शाळा आणि मैत्री", en: "School & friends", hi: "स्कूल और दोस्ती" }, topics: ["g_bullying", "g_peer_pressure", "g_school_anxiety", "g_relationships"] }],
  },
  {
    id: "g_digital",
    icon: "digital",
    color: "from-sea-700 to-sea-800",
    title: { mr: "ऑनलाइन सुरक्षितता", en: "Online safety", hi: "ऑनलाइन सुरक्षा" },
    subtitle: { mr: "फेक profile, फोटो, धमक्या", en: "Fake profiles, photos, threats", hi: "फ़ेक profile, फ़ोटो, धमकियाँ" },
    groups: [{ title: { mr: "ऑनलाइन", en: "Online", hi: "ऑनलाइन" }, topics: ["g_image_misuse", "g_fake_profiles", "g_online_threats", "g_cyberbullying", "g_social_media_pressure"] }],
  },
  {
    id: "g_mind",
    icon: "mind",
    color: "from-sea-400 to-sea-500",
    title: { mr: "माझं मन", en: "My feelings", hi: "मेरा मन" },
    subtitle: { mr: "उदास, राग, स्वतःबद्दल वाटणं", en: "Sad, moods, how I see myself", hi: "उदासी, मूड, खुद के बारे में" },
    groups: [{ title: { mr: "माझं मन", en: "My feelings", hi: "मेरा मन" }, topics: ["g_sad", "g_emotions", "g_body_image"] }],
  },
  {
    id: "g_study",
    icon: "study",
    color: "from-leaf-500 to-leaf-600",
    title: { mr: "माझं शिक्षण", en: "My studies", hi: "मेरी पढ़ाई" },
    subtitle: { mr: "10वी/12वी नंतर, शिष्यवृत्ती", en: "After 10th/12th, scholarships", hi: "10वीं/12वीं के बाद, छात्रवृत्ति" },
    groups: [{ title: { mr: "शिक्षण", en: "Studies", hi: "पढ़ाई" }, topics: ["after_10_12", "iti_courses", "scholarships"] }],
  },
  { ...adultCategories[7] },
];

export const categoriesFor = (age: AgeGroup | null) => (age === "girl" ? girlCategories : adultCategories);

/** Topics in a category that exist and suit this age group. */
export function categoryGroups(cat: Category, age: AgeGroup | null) {
  return cat.groups
    .map((g) => ({
      title: g.title,
      topics: g.topics.map(getTopic).filter((t): t is Topic => !!t && topicAllowed(t, age)),
    }))
    .filter((g) => g.topics.length > 0);
}

// ---- Free-text understanding ----

const ASCII = /^[\x00-\x7f]+$/;

function hit(text: string, keyword: string) {
  const k = keyword.toLowerCase().trim();
  if (!k) return false;
  // \b only works for ASCII; Devanagari keywords use substring matching.
  if (!ASCII.test(k)) return text.includes(k);
  const escaped = k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(k.length <= 3 ? `\\b${escaped}\\b` : `\\b${escaped}`).test(text);
}

// Filler words that shouldn't count toward a match, in all three languages (incl. romanised).
const STOPWORDS = new Set(
  (
    "i me my mine is am are was were be being been the a an to of in on at and or for with from about what how do does did can could " +
    "should would someone somebody some it this that you your he she they we please want need get got have has had i'm im " +
    "मला माझ्या माझा माझी माझे मी आहे आहेत आणि तो ती ते हे का काय कसं कसे कोणी कोणीतरी कुणीतरी वर ला ना मध्ये तर " +
    "मुझे मेरा मेरी मेरे मैं है हैं और क्या कैसे कोई में पर को का की के से यह वह हो " +
    "mujhe mera meri mere hai kya koi ka ki ke se mala maza mazi majhya aahe ani kay kasa"
  ).split(" ")
);

const tokenize = (s: string) =>
  s
    .toLowerCase()
    .split(/[\s,.?!।'"“”()/-]+/)
    .filter((w) => w.length >= 2 && !STOPWORDS.has(w));

// Rough stem so inflections still match: "followed"→"follow", "धमकी"→"धमक" (matches "धमकावत").
function stem(token: string) {
  if (ASCII.test(token)) return token.length > 5 ? token.slice(0, token.length - 2) : token;
  return token.length > 3 ? token.slice(0, Math.max(3, token.length - 2)) : token;
}

function tokenHit(text: string, token: string) {
  const s = stem(token);
  if (!ASCII.test(s)) return text.includes(s);
  return new RegExp(`\\b${s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(text);
}

/** How strongly one keyword matches: exact phrase beats partial token coverage. */
function keywordScore(text: string, keyword: string) {
  if (hit(text, keyword)) return Math.min(keyword.length, 30) * 1.5;
  const tokens = tokenize(keyword);
  if (tokens.length === 0) return 0;
  const matched = tokens.filter((tk) => tokenHit(text, tk));
  const coverage = matched.length / tokens.length;
  if (coverage < 0.5) return 0;
  return matched.reduce((n, tk) => n + tk.length, 0) * coverage;
}

const DANGER_WORDS = [
  "help me", "danger", "attack", "save me", "kidnap", "बचाओ", "वाचवा", "मदत करा", "धोका", "खतरा", "bachao", "vachva",
];

const GREETINGS = ["hi", "hello", "hey", "namaste", "namaskar", "नमस्कार", "नमस्ते", "हाय"];

export type Understanding =
  | { kind: "topic"; topic: Topic; alternatives: Topic[] }
  | { kind: "greeting" }
  | { kind: "unknown" };

export function understand(input: string, age: AgeGroup | null): Understanding {
  const text = input.toLowerCase().trim();
  const pool = allTopics.filter((t) => topicAllowed(t, age));

  const scored = pool
    .map((t) => {
      // Best single keyword, plus a small bonus for each other keyword that also matches.
      const scores = t.keywords.map((k) => keywordScore(text, k)).filter((s) => s > 0);
      return { t, score: scores.length ? Math.max(...scores) + 2 * (scores.length - 1) : 0 };
    })
    .filter((x) => x.score > 0)
    // Ties go to emergency topics so danger is never under-escalated.
    .sort((a, b) => b.score - a.score || Number(!!b.t.emergency) - Number(!!a.t.emergency));

  if (DANGER_WORDS.some((w) => hit(text, w)) && !scored.some((x) => x.t.emergency)) {
    const danger = getTopic(age === "girl" ? "g_uncomfortable" : "immediate_danger");
    if (danger) return { kind: "topic", topic: danger, alternatives: scored.slice(0, 3).map((x) => x.t) };
  }

  if (scored.length > 0) {
    return { kind: "topic", topic: scored[0].t, alternatives: scored.slice(1, 4).map((x) => x.t) };
  }
  if (GREETINGS.some((g) => hit(text, g))) return { kind: "greeting" };
  return { kind: "unknown" };
}

/** Everyday-language examples from the spec, used on the "I don't know what to do" screen. */
export const describeExamples: { text: L; topic: string }[] = [
  { text: { mr: "माझ्या नवऱ्याला माझा फोन सतत तपासायचा असतो.", en: "My husband always wants to check my phone.", hi: "मेरे पति हमेशा मेरा फ़ोन चेक करना चाहते हैं।" }, topic: "coercive_control" },
  { text: { mr: "माझे बॉस मला रात्री personal messages करतात.", en: "My boss sends me personal messages at night.", hi: "मेरे बॉस मुझे रात को personal messages करते हैं।" }, topic: "workplace_posh" },
  { text: { mr: "माझ्या मुलीला एक नातेवाईक भेटला की ती घाबरते.", en: "My daughter gets scared whenever a certain relative visits.", hi: "एक रिश्तेदार के आने पर मेरी बेटी डर जाती है।" }, topic: "child_afraid_relative" },
  { text: { mr: "माझ्या Instagram वर कुणीतरी मला धमकावत आहे.", en: "Someone is threatening me on Instagram.", hi: "कोई मुझे Instagram पर धमका रहा है।" }, topic: "instagram_threat" },
];
