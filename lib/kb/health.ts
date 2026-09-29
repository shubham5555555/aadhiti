import type { Topic } from "./types";

// Health education and family-support topics for AADHI TI AI.
// Education and red-flag guidance only — never a diagnosis or prescription.

const ADULT: Topic["ages"] = ["18", "30", "40", "50"];
const MOTHER: Topic["ages"] = ["18", "30", "40"];

const A_AMBULANCE = {
  label: { mr: "108 ॲम्ब्युलन्सला कॉल करा", en: "Call 108 ambulance", hi: "108 एम्बुलेंस को कॉल करें" },
  href: "tel:108",
};
const A_MATERNAL = {
  label: { mr: "102 मातृ ॲम्ब्युलन्स", en: "Call 102 maternal ambulance", hi: "102 मातृ एम्बुलेंस" },
  href: "tel:102",
};
const A_TELEMANAS = {
  label: { mr: "Tele-MANAS 14416 ला बोला", en: "Talk to Tele-MANAS 14416", hi: "Tele-MANAS 14416 से बात करें" },
  href: "tel:14416",
};
const A_SCHEMES = {
  label: { mr: "सरकारी योजना पहा", en: "See government schemes", hi: "सरकारी योजनाएँ देखें" },
  href: "/schemes",
};
const A_AWARENESS = {
  label: { mr: "अधिक माहिती वाचा", en: "Read more awareness tips", hi: "और जानकारी पढ़ें" },
  href: "/awareness",
};
const A_CHILDLINE = {
  label: { mr: "Childline 1098 ला कॉल करा", en: "Call Childline 1098", hi: "Childline 1098 पर कॉल करें" },
  href: "tel:1098",
};
const A_EMERGENCY = {
  label: { mr: "आपत्कालीन 112", en: "Emergency 112", hi: "आपातकालीन 112" },
  href: "tel:112",
};
const A_EVERYDAY = {
  label: { mr: "रोजच्या टिप्स पहा", en: "See everyday tips", hi: "रोज़ के सुझाव देखें" },
  href: "/everyday",
};
const A_CYBER = {
  label: { mr: "सायबर फसवणूक 1930", en: "Cyber fraud helpline 1930", hi: "साइबर धोखाधड़ी 1930" },
  href: "tel:1930",
};
const A_LEGAL = {
  label: { mr: "मोफत कायदेशीर मदत 15100", en: "Free legal aid 15100", hi: "मुफ़्त कानूनी मदद 15100" },
  href: "tel:15100",
};
const A_181 = {
  label: { mr: "महिला हेल्पलाईन 181", en: "Women helpline 181", hi: "महिला हेल्पलाइन 181" },
  href: "tel:181",
};

export const healthTopics: Topic[] = [
  // ───────────── MENSTRUAL & REPRODUCTIVE ─────────────
  {
    id: "irregular_periods",
    intent: "check",
    title: { mr: "पाळी अनियमित का?", en: "Why are my periods irregular?", hi: "माहवारी अनियमित क्यों?" },
    keywords: [
      "irregular periods", "late period", "पाळी अनियमित", "पाळी वेळेवर येत नाही", "पाळी उशिरा",
      "मासिक पाळी चुकली", "माहवारी अनियमित", "पीरियड्स टाइम पर नहीं आते", "mahina time pe nahi aata",
      "period late", "pali velevar yet nahi", "missed period", "पीरियड मिस", "masik pali",
    ],
    understand: {
      mr: "पाळी कधी लवकर, कधी उशिरा येणं अनेक बायकांना होतं. ताण, वजन, थायरॉईड किंवा PCOS अशी कारणं असू शकतात.",
      en: "Periods coming early or late happen to many women. Stress, weight changes, thyroid or PCOS can be reasons.",
      hi: "माहवारी कभी जल्दी, कभी देर से आना बहुत महिलाओं को होता है। तनाव, वज़न, थायरॉइड या PCOS कारण हो सकते हैं।",
    },
    answer: [
      {
        mr: "साधारण पाळी 21 ते 35 दिवसांनी येते. थोडा फरक सामान्य आहे.",
        en: "A usual cycle is 21–35 days apart. A little variation is normal.",
        hi: "सामान्य चक्र 21 से 35 दिन का होता है। थोड़ा फ़र्क सामान्य है।",
      },
      {
        mr: "ताण, झोप कमी, अचानक वजन बदल, जास्त व्यायाम यामुळे पाळी पुढे-मागे होते.",
        en: "Stress, poor sleep, sudden weight change or heavy exercise can shift your cycle.",
        hi: "तनाव, कम नींद, अचानक वज़न बदलना या ज़्यादा व्यायाम से चक्र बदल सकता है।",
      },
      {
        mr: "शारीरिक संबंध आले असतील आणि पाळी चुकली, तर प्रेग्नन्सी टेस्ट करा.",
        en: "If you are sexually active and missed a period, take a pregnancy test.",
        hi: "अगर शारीरिक संबंध रहे हैं और माहवारी छूटी है, तो प्रेग्नेंसी टेस्ट करें।",
      },
      {
        mr: "तीन महिने पाळी नाही, दोन पाळ्यांमध्ये रक्तस्राव, किंवा खूप वेदना असतील तर डॉक्टरकडे जा.",
        en: "No period for 3 months, bleeding between periods, or severe pain — see a doctor.",
        hi: "3 महीने माहवारी न आए, बीच में खून आए, या बहुत दर्द हो — डॉक्टर को दिखाएँ।",
      },
      {
        mr: "पाळीच्या तारखा कॅलेंडरवर लिहून ठेवा — डॉक्टरला सांगायला मदत होते.",
        en: "Note your period dates on a calendar — it helps the doctor.",
        hi: "माहवारी की तारीखें कैलेंडर पर लिखें — डॉक्टर को बताने में मदद मिलती है।",
      },
    ],
    next: {
      mr: "पुढच्या PHC भेटीत या तारखा घेऊन जाल का?",
      en: "Could you take your period dates to your next PHC or doctor visit?",
      hi: "क्या आप अगली PHC या डॉक्टर विज़िट में ये तारीखें ले जाएँगी?",
    },
    actions: [A_AWARENESS],
    sensitive: "medical",
    ages: ADULT,
  },
  {
    id: "period_pain",
    intent: "check",
    title: { mr: "पाळीत पोट दुखणं", en: "Period pain: what's normal", hi: "माहवारी का दर्द" },
    keywords: [
      "period pain", "cramps", "पाळीत पोट दुखतं", "पाळीचा त्रास", "पोटात कळा", "pot dukhta",
      "pali madhe pot dukhta", "पीरियड में दर्द", "माहवारी दर्द", "pet dard periods", "पेट में ऐंठन",
      "कंबर दुखते", "period me dard", "menstrual cramps",
    ],
    understand: {
      mr: "पाळीच्या पहिल्या एक-दोन दिवसांत पोटात, कंबरेत दुखणं बऱ्याच जणींना होतं. पण रोजचं काम थांबेल इतकं दुखणं सामान्य नाही.",
      en: "Cramps in the belly or back in the first day or two are common. Pain that stops your daily life is not normal.",
      hi: "पहले एक-दो दिन पेट या कमर में दर्द आम है। पर इतना दर्द कि रोज़ का काम रुक जाए, सामान्य नहीं है।",
    },
    answer: [
      {
        mr: "गरम पाण्याची पिशवी पोटावर ठेवा, हलकं चालणं आणि कोमट पाणी पिणं मदत करतं.",
        en: "A hot water bag on the belly, gentle walking and warm water can help.",
        hi: "पेट पर गरम पानी की थैली, हल्का टहलना और गुनगुना पानी मदद करता है।",
      },
      {
        mr: "वेदनाशामक गोळी घ्यायची असेल तर डॉक्टर किंवा फार्मासिस्टला आधी विचारा.",
        en: "Ask a doctor or pharmacist before taking any painkiller.",
        hi: "कोई भी दर्द की गोली लेने से पहले डॉक्टर या फार्मासिस्ट से पूछें।",
      },
      {
        mr: "धोक्याची लक्षणं: असह्य वेदना, ताप, उलटी, बेशुद्धी, किंवा पाळी नसताना तीव्र दुखणं.",
        en: "Red flags: unbearable pain, fever, vomiting, fainting, or severe pain outside your period.",
        hi: "खतरे के संकेत: असहनीय दर्द, बुखार, उल्टी, बेहोशी, या माहवारी के बिना तेज़ दर्द।",
      },
      {
        mr: "दर महिन्याला वेदना वाढत असेल तर डॉक्टरला दाखवा — उपचार होऊ शकतात.",
        en: "If pain gets worse each month, see a doctor — it can be treated.",
        hi: "अगर हर महीने दर्द बढ़ रहा है तो डॉक्टर को दिखाएँ — इलाज हो सकता है।",
      },
    ],
    next: {
      mr: "तुमचं दुखणं रोजचं काम थांबवतं का? तसं असेल तर PHC ला भेट द्या.",
      en: "Does your pain stop your daily work? If yes, please visit your PHC.",
      hi: "क्या दर्द से रोज़ का काम रुकता है? अगर हाँ, तो PHC जाएँ।",
    },
    actions: [A_AMBULANCE],
    sensitive: "medical",
    ages: ADULT,
  },
  {
    id: "heavy_bleeding",
    intent: "check",
    title: { mr: "जास्त रक्तस्राव", en: "Is heavy bleeding normal?", hi: "ज़्यादा खून आना" },
    keywords: [
      "heavy bleeding", "heavy periods", "जास्त रक्तस्राव", "पाळीत जास्त रक्त", "गाठी पडतात",
      "खूप रक्त जातं", "ज़्यादा खून आना", "पीरियड में बहुत खून", "khoon bahut", "jast rakta",
      "clots", "pad bharta", "थक्के", "blood clots period",
    ],
    understand: {
      mr: "पाळीत किती रक्त जातं हे प्रत्येकीचं वेगळं असतं. पण काही लक्षणं असतील तर डॉक्टरला लगेच दाखवणं गरजेचं आहे.",
      en: "Flow differs for every woman. But some signs mean you should see a doctor soon.",
      hi: "हर महिला का बहाव अलग होता है। पर कुछ संकेत हों तो जल्दी डॉक्टर को दिखाना ज़रूरी है।",
    },
    answer: [
      {
        mr: "दर तासाला पॅड पूर्ण भिजत असेल, सलग 2 तास — हे जास्त आहे.",
        en: "Soaking a pad every hour for 2 hours or more is too much.",
        hi: "लगातार 2 घंटे हर घंटे पैड पूरा भीगना — यह ज़्यादा है।",
      },
      {
        mr: "मोठ्या गाठी (रुपयाच्या नाण्यापेक्षा मोठ्या) किंवा 7 दिवसांपेक्षा जास्त पाळी.",
        en: "Large clots (bigger than a coin) or bleeding for more than 7 days.",
        hi: "बड़े थक्के (सिक्के से बड़े) या 7 दिन से ज़्यादा खून आना।",
      },
      {
        mr: "चक्कर, धाप, डोळ्यांसमोर अंधारी — लगेच दवाखान्यात जा किंवा 108 ला कॉल करा.",
        en: "Dizziness, breathlessness or blacking out — go to hospital now or call 108.",
        hi: "चक्कर, साँस फूलना, आँखों के आगे अंधेरा — तुरंत अस्पताल जाएँ या 108 बुलाएँ।",
      },
      {
        mr: "जास्त रक्तस्रावाने रक्त कमी (ॲनिमिया) होऊ शकतं — PHC मध्ये तपासणी करा.",
        en: "Heavy bleeding can cause anaemia — get a blood check at the PHC.",
        hi: "ज़्यादा खून जाने से खून की कमी (एनीमिया) हो सकती है — PHC में जाँच कराएँ।",
      },
    ],
    next: {
      mr: "आत्ता चक्कर येतेय का? येत असेल तर लगेच 108 ला कॉल करा.",
      en: "Are you feeling dizzy right now? If yes, call 108 now.",
      hi: "क्या अभी चक्कर आ रहा है? अगर हाँ, तो तुरंत 108 पर कॉल करें।",
    },
    actions: [A_AMBULANCE],
    sensitive: "medical",
    ages: ADULT,
  },
  {
    id: "anaemia",
    intent: "check",
    title: { mr: "रक्त कमी (ॲनिमिया)", en: "Signs of anaemia", hi: "खून की कमी (एनीमिया)" },
    keywords: [
      "anaemia", "anemia", "रक्त कमी", "रक्ताची कमी", "खून की कमी", "हिमोग्लोबिन कमी", "hemoglobin low",
      "khoon ki kami", "rakta kami", "थकवा", "सारखा थकवा येतो", "थकान", "pale", "fikka", "dham lagte",
      "iron tablets", "लोहाच्या गोळ्या",
    ],
    understand: {
      mr: "सारखा थकवा, चेहरा फिका पडणं, थोडं चाललं तरी धाप — ही रक्त कमी असल्याची लक्षणं असू शकतात. आपल्याकडे बायकांमध्ये हे खूप दिसतं.",
      en: "Constant tiredness, pale skin, breathlessness on small effort can be signs of anaemia. It is very common among women here.",
      hi: "हमेशा थकान, चेहरा पीला, थोड़ा चलने पर साँस फूलना — खून की कमी के संकेत हो सकते हैं। महिलाओं में यह बहुत आम है।",
    },
    answer: [
      {
        mr: "PHC किंवा उपकेंद्रात हिमोग्लोबिनची साधी रक्त तपासणी करा.",
        en: "Get a simple haemoglobin blood test at the PHC or sub-centre.",
        hi: "PHC या उपकेंद्र में हीमोग्लोबिन की सरल जाँच कराएँ।",
      },
      {
        mr: "लोहयुक्त आहार: पालेभाज्या, नाचणी, गूळ, खजूर, डाळी, अंडी, मासे.",
        en: "Iron-rich food: leafy greens, nachni (ragi), jaggery, dates, dals, eggs, fish.",
        hi: "आयरन वाला खाना: हरी पत्तेदार सब्ज़ी, नाचनी (रागी), गुड़, खजूर, दाल, अंडा, मछली।",
      },
      {
        mr: "जेवणासोबत लिंबू, आवळा, कोकम घ्या; जेवणानंतर लगेच चहा टाळा.",
        en: "Add lemon, amla or kokum with meals; avoid tea right after eating.",
        hi: "खाने के साथ नींबू या आँवला लें; खाने के तुरंत बाद चाय न पिएँ।",
      },
      {
        mr: "IFA (लोह-फॉलिक ॲसिड) गोळ्या PHC व अंगणवाडीत मोफत मिळतात — डॉक्टर सांगतील तशा घ्या.",
        en: "IFA (iron-folic acid) tablets are free at PHC and Anganwadi — take as the health worker advises.",
        hi: "IFA (आयरन-फोलिक एसिड) गोलियाँ PHC व आंगनवाड़ी में मुफ़्त हैं — स्वास्थ्यकर्मी के बताए अनुसार लें।",
      },
      {
        mr: "छातीत धडधड, बेशुद्धी किंवा खूप धाप लागत असेल तर लगेच डॉक्टरकडे जा.",
        en: "Chest pounding, fainting or severe breathlessness — see a doctor immediately.",
        hi: "दिल की तेज़ धड़कन, बेहोशी या बहुत साँस फूले — तुरंत डॉक्टर को दिखाएँ।",
      },
    ],
    next: {
      mr: "तुमची शेवटची हिमोग्लोबिन तपासणी कधी झाली होती?",
      en: "When was your last haemoglobin test?",
      hi: "आपकी पिछली हीमोग्लोबिन जाँच कब हुई थी?",
    },
    actions: [A_SCHEMES],
    sensitive: "medical",
    ages: ADULT,
  },
  {
    id: "pcos",
    intent: "learn",
    title: { mr: "PCOS म्हणजे काय?", en: "What is PCOS?", hi: "PCOS क्या है?" },
    keywords: [
      "pcos", "pcod", "पीसीओएस", "पीसीओडी", "ovary cyst", "अंडाशयात गाठ", "polycystic",
      "चेहऱ्यावर केस", "face hair", "चेहरे पर बाल", "मुरूम", "pimples", "वजन वाढतं पाळी येत नाही",
      "pcos kya hai", "pcos mhanje kay",
    ],
    understand: {
      mr: "PCOS हा हार्मोन्सशी संबंधित सामान्य त्रास आहे. यात पाळी अनियमित होणं, वजन वाढणं, मुरूम किंवा चेहऱ्यावर केस येणं दिसू शकतं.",
      en: "PCOS is a common hormone condition. It can cause irregular periods, weight gain, acne or extra facial hair.",
      hi: "PCOS हार्मोन से जुड़ी आम समस्या है। इसमें माहवारी अनियमित, वज़न बढ़ना, मुँहासे या चेहरे पर बाल हो सकते हैं।",
    },
    answer: [
      {
        mr: "निदान फक्त डॉक्टरच करू शकतात — रक्त तपासणी आणि सोनोग्राफीने.",
        en: "Only a doctor can confirm it — through blood tests and an ultrasound.",
        hi: "इसकी पुष्टि सिर्फ़ डॉक्टर कर सकते हैं — खून की जाँच और सोनोग्राफी से।",
      },
      {
        mr: "रोज 30 मिनिटं चालणं, कमी साखर-मैदा, जास्त भाज्या — खूप फरक पडतो.",
        en: "Daily 30-minute walks, less sugar and maida, more vegetables — make a real difference.",
        hi: "रोज़ 30 मिनट चलना, कम चीनी-मैदा, ज़्यादा सब्ज़ी — बहुत फ़र्क पड़ता है।",
      },
      {
        mr: "PCOS असूनही बहुतेक बायका उपचाराने गरोदर होऊ शकतात.",
        en: "Most women with PCOS can still get pregnant with the right care.",
        hi: "PCOS होने पर भी ज़्यादातर महिलाएँ सही इलाज से गर्भवती हो सकती हैं।",
      },
      {
        mr: "PCOS मध्ये पुढे sugar चा धोका वाढतो, म्हणून नियमित तपासणी करा.",
        en: "PCOS raises the risk of sugar (diabetes) later, so get regular check-ups.",
        hi: "PCOS से आगे चलकर शुगर का ख़तरा बढ़ता है, इसलिए नियमित जाँच कराएँ।",
      },
    ],
    next: {
      mr: "तुम्हाला अशी लक्षणं जाणवतात का? स्त्रीरोगतज्ज्ञांना भेटण्याचा विचार कराल का?",
      en: "Do you notice these signs? Would you consider meeting a gynaecologist?",
      hi: "क्या आपको ये लक्षण दिखते हैं? क्या आप स्त्री रोग विशेषज्ञ से मिलेंगी?",
    },
    actions: [A_AWARENESS],
    sensitive: "medical",
    ages: ADULT,
  },
  {
    id: "thyroid",
    intent: "learn",
    title: { mr: "थायरॉईड आणि पाळी", en: "Thyroid and periods", hi: "थायरॉइड और माहवारी" },
    keywords: [
      "thyroid", "थायरॉईड", "थायरॉइड", "tsh", "गळ्याला सूज", "गले में सूजन", "वजन अचानक वाढलं",
      "weight badh raha", "थायरॉईड पाळी", "thyroid periods", "केस गळतात", "बाल झड़ना", "hair fall",
      "thanda lagta", "thyroid test",
    ],
    understand: {
      mr: "थायरॉईड ग्रंथी कमी-जास्त काम करू लागली तर पाळी अनियमित, जास्त किंवा कमी होऊ शकते. हे साध्या रक्त तपासणीने कळतं.",
      en: "When the thyroid works too little or too much, periods can become irregular, heavy or light. A simple blood test can check it.",
      hi: "थायरॉइड कम या ज़्यादा काम करे तो माहवारी अनियमित, ज़्यादा या कम हो सकती है। सरल खून जाँच से पता चलता है।",
    },
    answer: [
      {
        mr: "लक्षणं: थकवा, वजन बदल, केस गळणं, थंडी किंवा गरमी जास्त वाजणं, धडधड.",
        en: "Signs: tiredness, weight change, hair fall, feeling too cold or hot, palpitations.",
        hi: "लक्षण: थकान, वज़न बदलना, बाल झड़ना, ज़्यादा ठंड या गर्मी लगना, धड़कन।",
      },
      {
        mr: "TSH रक्त तपासणी करून घ्या — अनेक सरकारी दवाखान्यांत उपलब्ध आहे.",
        en: "Ask for a TSH blood test — available at many government hospitals.",
        hi: "TSH खून की जाँच कराएँ — कई सरकारी अस्पतालों में उपलब्ध है।",
      },
      {
        mr: "थायरॉईडची औषधं डॉक्टरच्या सल्ल्याशिवाय सुरू किंवा बंद करू नका.",
        en: "Never start or stop thyroid medicine without a doctor's advice.",
        hi: "डॉक्टर की सलाह के बिना थायरॉइड की दवा शुरू या बंद न करें।",
      },
      {
        mr: "गरोदरपणाचा विचार असेल तर आधी थायरॉईड तपासा.",
        en: "If planning pregnancy, get your thyroid checked first.",
        hi: "गर्भावस्था की योजना हो तो पहले थायरॉइड जाँच कराएँ।",
      },
    ],
    next: {
      mr: "तुमची थायरॉईड तपासणी कधी झाली आहे का?",
      en: "Have you ever had a thyroid test?",
      hi: "क्या आपकी कभी थायरॉइड जाँच हुई है?",
    },
    actions: [A_AWARENESS],
    sensitive: "medical",
    ages: ADULT,
  },
  {
    id: "menstrual_products",
    intent: "learn",
    title: { mr: "पाळीतील स्वच्छता साधनं", en: "Menstrual hygiene products", hi: "माहवारी स्वच्छता साधन" },
    keywords: [
      "sanitary pad", "pad", "पॅड", "कापड", "cloth pad", "menstrual cup", "कप", "period underwear",
      "सॅनिटरी नॅपकिन", "सैनिटरी पैड", "पाळीत स्वच्छता", "माहवारी स्वच्छता", "pad kab badle",
      "pad kasa taku", "disposal", "कपडा इस्तेमाल",
    ],
    understand: {
      mr: "पाळीत कोणतं साधन वापरायचं ही तुमची निवड आहे. महत्त्वाचं म्हणजे स्वच्छता आणि वेळेवर बदलणं.",
      en: "Which product you use is your choice. What matters most is cleanliness and changing on time.",
      hi: "कौन-सा साधन इस्तेमाल करें यह आपकी पसंद है। सबसे ज़रूरी है साफ़-सफ़ाई और समय पर बदलना।",
    },
    answer: [
      {
        mr: "पॅड दर 4–6 तासांनी बदला, रक्तस्राव जास्त असेल तर लवकर.",
        en: "Change pads every 4–6 hours, sooner if the flow is heavy.",
        hi: "पैड हर 4–6 घंटे में बदलें, बहाव ज़्यादा हो तो जल्दी।",
      },
      {
        mr: "कापडी पॅड साबणाने धुवून उन्हात पूर्ण वाळवा — ओलसर वापरू नका.",
        en: "Wash cloth pads with soap and dry fully in sunlight — never use them damp.",
        hi: "कपड़े के पैड साबुन से धोकर धूप में पूरा सुखाएँ — गीला इस्तेमाल न करें।",
      },
      {
        mr: "मेन्स्ट्रुअल कप 12 तासांपर्यंत वापरता येतो; उकळून स्वच्छ करा.",
        en: "A menstrual cup can be worn up to 12 hours; sterilise it by boiling.",
        hi: "मेंस्ट्रुअल कप 12 घंटे तक पहन सकते हैं; उबालकर साफ़ करें।",
      },
      {
        mr: "वापरलेलं पॅड कागदात गुंडाळून कचराकुंडीत टाका, संडासात टाकू नका.",
        en: "Wrap used pads in paper and put in the bin — never flush them.",
        hi: "इस्तेमाल किया पैड कागज़ में लपेटकर कूड़ेदान में डालें, शौचालय में नहीं।",
      },
      {
        mr: "खाज, दुर्गंधी किंवा पुरळ आल्यास डॉक्टरला दाखवा.",
        en: "Itching, bad smell or rash — show a doctor.",
        hi: "खुजली, बदबू या दाने हों तो डॉक्टर को दिखाएँ।",
      },
    ],
    next: {
      mr: "स्वस्त पॅड्ससाठी अंगणवाडी किंवा आशाताईंना विचारलंत का?",
      en: "Have you asked your Anganwadi or ASHA worker about low-cost pads?",
      hi: "क्या आपने सस्ते पैड के लिए आंगनवाड़ी या आशा दीदी से पूछा है?",
    },
    actions: [A_SCHEMES],
    sensitive: "medical",
    ages: ADULT,
  },
  {
    id: "gyn_questions",
    intent: "learn",
    title: { mr: "स्त्रीरोगतज्ज्ञांना काय विचारू?", en: "What to ask my gynaecologist", hi: "स्त्री रोग डॉक्टर से क्या पूछूँ" },
    keywords: [
      "gynaecologist", "gynecologist", "gyno", "स्त्रीरोगतज्ज्ञ", "लेडी डॉक्टर", "डॉक्टरला काय विचारू",
      "doctor ko kya puchu", "डॉक्टर से क्या पूछें", "gyn visit", "पहली बार डॉक्टर", "lady doctor",
      "questions for doctor", "doctorla kay vicharu",
    ],
    understand: {
      mr: "डॉक्टरकडे गेल्यावर बोलायला संकोच वाटणं स्वाभाविक आहे. आधी प्रश्न लिहून नेल्यास भेट जास्त उपयोगी ठरते.",
      en: "Feeling shy at the doctor is natural. Writing questions down beforehand makes the visit more useful.",
      hi: "डॉक्टर के पास झिझक होना स्वाभाविक है। पहले से सवाल लिखकर ले जाने से मुलाक़ात ज़्यादा काम की होती है।",
    },
    answer: [
      {
        mr: "माझी पाळी सामान्य आहे का? (तारखा, दिवस, वेदना सांगा)",
        en: "Is my cycle normal? (share dates, days of bleeding, pain)",
        hi: "क्या मेरा चक्र सामान्य है? (तारीखें, दिन, दर्द बताएँ)",
      },
      {
        mr: "मला कोणत्या तपासण्या कराव्यात — Pap smear, हिमोग्लोबिन, थायरॉईड, sugar?",
        en: "Which tests do I need — Pap smear, haemoglobin, thyroid, sugar?",
        hi: "मुझे कौन-सी जाँचें करानी चाहिए — Pap smear, हीमोग्लोबिन, थायरॉइड, शुगर?",
      },
      {
        mr: "माझ्यासाठी सुरक्षित गर्भनिरोधक कोणतं?",
        en: "Which contraception is safe for me?",
        hi: "मेरे लिए कौन-सा गर्भनिरोधक सुरक्षित है?",
      },
      {
        mr: "हे औषध कसं घ्यायचं, दुष्परिणाम काय, परत कधी यायचं?",
        en: "How do I take this medicine, what side effects, when should I return?",
        hi: "यह दवा कैसे लूँ, इसके साइड इफ़ेक्ट क्या हैं, दोबारा कब आऊँ?",
      },
      {
        mr: "तुम्ही महिला डॉक्टर किंवा सोबत कोणीतरी मागू शकता — तो तुमचा हक्क आहे.",
        en: "You can ask for a woman doctor or a companion in the room — it is your right.",
        hi: "आप महिला डॉक्टर या साथ में किसी को रखने की माँग कर सकती हैं — यह आपका हक़ है।",
      },
    ],
    next: {
      mr: "आजच तुमचे तीन प्रश्न एका कागदावर लिहून ठेवाल का?",
      en: "Will you write down your top three questions today?",
      hi: "क्या आप आज अपने तीन सवाल एक कागज़ पर लिखेंगी?",
    },
    actions: [A_AWARENESS],
    sensitive: "medical",
    ages: ADULT,
  },

  // ───────────── PREGNANCY, MOTHERHOOD & POSTPARTUM ─────────────
  {
    id: "pregnancy_checkups",
    intent: "find",
    title: { mr: "गरोदरपणातील तपासण्या", en: "Pregnancy check-ups", hi: "गर्भावस्था की जाँचें" },
    keywords: [
      "pregnancy checkup", "anc", "antenatal", "गरोदरपणात तपासणी", "गर्भावस्था जाँच", "गरोदर",
      "pregnant", "प्रेग्नंट", "garodar", "नोंदणी", "registration", "sonography", "सोनोग्राफी",
      "pregnancy me kitni baar doctor", "पोटात बाळ", "गर्भवती",
    ],
    understand: {
      mr: "गरोदरपणात नियमित तपासण्या आई आणि बाळ दोघांना सुरक्षित ठेवतात. बहुतेक सेवा सरकारी दवाखान्यात मोफत आहेत.",
      en: "Regular check-ups keep both mother and baby safe. Most services are free at government facilities.",
      hi: "नियमित जाँच माँ और बच्चे दोनों को सुरक्षित रखती है। ज़्यादातर सेवाएँ सरकारी अस्पताल में मुफ़्त हैं।",
    },
    answer: [
      {
        mr: "गरोदर असल्याचं कळताच PHC किंवा अंगणवाडीत नाव नोंदवा (पहिल्या 3 महिन्यांत).",
        en: "Register at the PHC or Anganwadi as soon as you know — ideally in the first 3 months.",
        hi: "गर्भ का पता चलते ही PHC या आंगनवाड़ी में नाम दर्ज कराएँ — पहले 3 महीनों में।",
      },
      {
        mr: "किमान 4 तपासण्या (ANC) करा — डॉक्टर जास्त सांगतील तर तितक्या.",
        en: "Have at least 4 antenatal (ANC) visits — more if your doctor advises.",
        hi: "कम से कम 4 प्रसवपूर्व (ANC) जाँचें कराएँ — डॉक्टर कहें तो ज़्यादा।",
      },
      {
        mr: "BP, वजन, हिमोग्लोबिन, sugar, लघवी तपासणी, TT/Td लस — प्रत्येक भेटीत विचारा.",
        en: "Ask for BP, weight, haemoglobin, sugar, urine tests and the Td vaccine.",
        hi: "BP, वज़न, हीमोग्लोबिन, शुगर, पेशाब जाँच और Td टीका — हर बार पूछें।",
      },
      {
        mr: "सरकारी योजनांतून मोफत तपासणी, प्रसूती आणि आर्थिक मदत मिळू शकते.",
        en: "Government programmes offer free check-ups, free delivery and cash support.",
        hi: "सरकारी योजनाओं से मुफ़्त जाँच, मुफ़्त प्रसव और आर्थिक मदद मिल सकती है।",
      },
      {
        mr: "माता-बाल संरक्षण (MCP) कार्ड प्रत्येक भेटीला सोबत ठेवा.",
        en: "Carry your Mother and Child Protection (MCP) card to every visit.",
        hi: "हर विज़िट पर माँ-बच्चा सुरक्षा (MCP) कार्ड साथ रखें।",
      },
    ],
    next: {
      mr: "तुमची नोंदणी PHC किंवा अंगणवाडीत झाली आहे का?",
      en: "Have you registered your pregnancy at the PHC or Anganwadi yet?",
      hi: "क्या आपने PHC या आंगनवाड़ी में गर्भावस्था दर्ज कराई है?",
    },
    actions: [A_SCHEMES, A_MATERNAL],
    sensitive: "medical",
    ages: MOTHER,
  },
  {
    id: "pregnancy_nutrition",
    intent: "learn",
    title: { mr: "गरोदरपणातील आहार", en: "Nutrition in pregnancy", hi: "गर्भावस्था में आहार" },
    keywords: [
      "pregnancy diet", "pregnancy food", "गरोदरपणात काय खावं", "गर्भावस्था में क्या खाएँ",
      "garodarpanat kay khava", "pregnancy me kya khaye", "आहार", "पोषण", "nutrition pregnancy",
      "folic acid", "फॉलिक ॲसिड", "कॅल्शियम", "calcium", "पपई खावी का",
    ],
    understand: {
      mr: "गरोदरपणात तुम्ही दोघांसाठी खात नाही, पण चांगलं आणि पुरेसं खाणं गरजेचं आहे. साधं घरगुती जेवण पुरेसं आहे.",
      en: "You don't need to eat for two, but you do need good, enough food. Simple home food is enough.",
      hi: "दो लोगों जितना खाना ज़रूरी नहीं, पर अच्छा और भरपूर खाना ज़रूरी है। सादा घर का खाना काफ़ी है।",
    },
    answer: [
      {
        mr: "रोज डाळ, भाकरी/भात, पालेभाज्या, दूध/दही, फळं; जमल्यास अंडी-मासे.",
        en: "Daily dal, bhakri or rice, leafy greens, milk or curd, fruit; eggs or fish if you eat them.",
        hi: "रोज़ दाल, रोटी/चावल, हरी सब्ज़ी, दूध/दही, फल; खाती हों तो अंडा-मछली।",
      },
      {
        mr: "थोडं थोडं दिवसातून 5–6 वेळा खा; भरपूर पाणी प्या.",
        en: "Eat small meals 5–6 times a day and drink plenty of water.",
        hi: "दिन में 5–6 बार थोड़ा-थोड़ा खाएँ; खूब पानी पिएँ।",
      },
      {
        mr: "IFA आणि कॅल्शियम गोळ्या PHC मध्ये मोफत — आरोग्य कर्मचारी सांगतील तशा घ्या.",
        en: "IFA and calcium tablets are free at the PHC — take them as the health worker advises.",
        hi: "IFA और कैल्शियम गोलियाँ PHC में मुफ़्त — स्वास्थ्यकर्मी के बताए अनुसार लें।",
      },
      {
        mr: "कच्चं मांस, नीट न शिजलेलं अन्न, दारू, तंबाखू, मिश्री टाळा.",
        en: "Avoid raw or undercooked food, alcohol, tobacco and mishri.",
        hi: "कच्चा या अधपका खाना, शराब, तंबाकू और मिश्री से बचें।",
      },
      {
        mr: "अंगणवाडीतून पूरक पोषण आहार (टेक-होम रेशन) मिळतो — जरूर घ्या.",
        en: "Anganwadi gives take-home supplementary nutrition — do collect it.",
        hi: "आंगनवाड़ी से पूरक पोषण (टेक-होम राशन) मिलता है — ज़रूर लें।",
      },
    ],
    next: {
      mr: "अंगणवाडीतून पोषण आहार मिळतोय का?",
      en: "Are you getting your nutrition ration from the Anganwadi?",
      hi: "क्या आपको आंगनवाड़ी से पोषण राशन मिल रहा है?",
    },
    actions: [A_SCHEMES],
    sensitive: "medical",
    ages: MOTHER,
  },
  {
    id: "pregnancy_warning",
    intent: "act",
    title: { mr: "गरोदरपणातील धोक्याची लक्षणं", en: "Pregnancy warning signs", hi: "गर्भावस्था के खतरे के संकेत" },
    keywords: [
      "pregnancy bleeding", "गरोदरपणात रक्तस्राव", "गर्भावस्था में खून", "बाळ हालचाल करत नाही",
      "baby not moving", "बच्चा हिल नहीं रहा", "पाणी गेलं", "water leaking", "पानी निकल रहा",
      "डोकं खूप दुखतं", "pregnancy headache", "झटके", "fits", "सूज", "swelling pregnancy",
      "धूसर दिसतं", "pregnancy fever",
    ],
    understand: {
      mr: "गरोदरपणातील काही लक्षणं धोक्याची असतात आणि लगेच उपचार हवेत. थांबू नका — आत्ताच मदत बोलवा.",
      en: "Some pregnancy signs are dangerous and need care right away. Don't wait — get help now.",
      hi: "गर्भावस्था के कुछ संकेत ख़तरनाक होते हैं और तुरंत इलाज चाहिए। रुकें नहीं — अभी मदद बुलाएँ।",
    },
    answer: [
      {
        mr: "योनीतून रक्तस्राव, पाणी जाणं, किंवा पोटात तीव्र वेदना — लगेच दवाखान्यात.",
        en: "Vaginal bleeding, leaking water, or severe belly pain — go to hospital now.",
        hi: "योनि से खून, पानी निकलना, या पेट में तेज़ दर्द — तुरंत अस्पताल जाएँ।",
      },
      {
        mr: "तीव्र डोकेदुखी, धूसर दिसणं, चेहरा-हाताला सूज, झटके — हे आणीबाणीचं आहे.",
        en: "Severe headache, blurred vision, swollen face or hands, fits — this is an emergency.",
        hi: "तेज़ सिरदर्द, धुंधला दिखना, चेहरे-हाथ पर सूजन, दौरे — यह आपातकाल है।",
      },
      {
        mr: "बाळाची हालचाल कमी झाली किंवा थांबली, किंवा ताप आला — लगेच डॉक्टरकडे.",
        en: "Baby moving less or not at all, or fever — see a doctor immediately.",
        hi: "बच्चे की हलचल कम या बंद, या बुखार — तुरंत डॉक्टर के पास जाएँ।",
      },
      {
        mr: "102 (मातृ ॲम्ब्युलन्स) किंवा 108 ला कॉल करा — सेवा मोफत आहे.",
        en: "Call 102 (maternal ambulance) or 108 — the service is free.",
        hi: "102 (मातृ एम्बुलेंस) या 108 पर कॉल करें — सेवा मुफ़्त है।",
      },
      {
        mr: "MCP कार्ड आणि सोबत एक व्यक्ती घेऊन जा.",
        en: "Take your MCP card and one companion with you.",
        hi: "MCP कार्ड और एक साथी को साथ ले जाएँ।",
      },
    ],
    next: {
      mr: "यापैकी कोणतं लक्षण आत्ता आहे का? असेल तर लगेच 102 किंवा 108 ला कॉल करा.",
      en: "Do you have any of these signs now? If yes, call 102 or 108 right away.",
      hi: "क्या इनमें से कोई संकेत अभी है? अगर हाँ, तो तुरंत 102 या 108 पर कॉल करें।",
    },
    actions: [A_AMBULANCE, A_MATERNAL],
    sensitive: "medical",
    emergency: true,
    ages: MOTHER,
  },
  {
    id: "delivery_prep",
    intent: "act",
    title: { mr: "प्रसूतीची तयारी", en: "Preparing for delivery", hi: "प्रसव की तैयारी" },
    keywords: [
      "delivery preparation", "hospital bag", "प्रसूतीची तयारी", "डिलिव्हरी", "delivery",
      "प्रसव की तैयारी", "डिलीवरी बैग", "delivery bag", "delivery kab", "due date", "कळा सुरू",
      "labour pain", "prasuti", "delivery sathi kay nyaycha",
    ],
    understand: {
      mr: "प्रसूतीची तयारी आधीच केली तर शेवटच्या क्षणी धावपळ कमी होते. आपल्या भागात वाहतुकीचा आराखडा विशेष महत्त्वाचा.",
      en: "Planning ahead reduces last-minute panic. In our area, a transport plan is especially important.",
      hi: "पहले से तैयारी करने से आख़िरी समय की भागदौड़ कम होती है। हमारे इलाक़े में वाहन की योजना बहुत ज़रूरी है।",
    },
    answer: [
      {
        mr: "सरकारी दवाखान्यात प्रसूतीचं ठिकाण आधीच ठरवा आणि तिथे एकदा जाऊन या.",
        en: "Choose your delivery hospital early and visit it once beforehand.",
        hi: "प्रसव का अस्पताल पहले तय करें और एक बार जाकर देख आएँ।",
      },
      {
        mr: "वाहन: 102 मोफत आहे; पर्यायी रिक्षा/गाडीवाल्याचा नंबर ठेवा.",
        en: "Transport: 102 is free; also keep a backup rickshaw or car number.",
        hi: "वाहन: 102 मुफ़्त है; एक और रिक्शा/गाड़ी वाले का नंबर रखें।",
      },
      {
        mr: "बॅग: MCP कार्ड, आधार, बँक पासबुक, सुती कपडे, पॅड, बाळाचे कपडे, दुपटी.",
        en: "Bag: MCP card, Aadhaar, bank passbook, cotton clothes, pads, baby clothes, wraps.",
        hi: "बैग: MCP कार्ड, आधार, बैंक पासबुक, सूती कपड़े, पैड, बच्चे के कपड़े, लपेटने का कपड़ा।",
      },
      {
        mr: "थोडे पैसे आणि रक्तदाता म्हणून एक-दोन जण तयार ठेवा.",
        en: "Keep some cash ready and one or two possible blood donors.",
        hi: "कुछ पैसे और एक-दो संभावित रक्तदाता तैयार रखें।",
      },
      {
        mr: "नियमित कळा, पाणी जाणं किंवा रक्तस्राव — लगेच दवाखान्यात निघा.",
        en: "Regular contractions, water breaking or bleeding — leave for hospital now.",
        hi: "नियमित दर्द, पानी टूटना या खून — तुरंत अस्पताल निकलें।",
      },
    ],
    next: {
      mr: "तुमची बॅग आणि वाहनाची सोय तयार आहे का?",
      en: "Is your bag packed and transport arranged?",
      hi: "क्या आपका बैग और वाहन तैयार है?",
    },
    actions: [A_MATERNAL, A_SCHEMES],
    sensitive: "medical",
    ages: MOTHER,
  },
  {
    id: "postpartum_recovery",
    intent: "check",
    title: { mr: "बाळंतपणानंतरची काळजी", en: "Postpartum recovery", hi: "प्रसव के बाद देखभाल" },
    keywords: [
      "postpartum", "after delivery", "बाळंतपणानंतर", "बाळंतीण", "प्रसव के बाद", "डिलिवरी के बाद",
      "delivery ke baad", "balantpananantar", "postpartum depression", "रडू येतं", "मन उदास",
      "टाके दुखतात", "stitches pain", "baby blues", "जापा",
    ],
    understand: {
      mr: "बाळंतपणानंतर शरीर आणि मन दोघांना सावरायला वेळ लागतो. थकवा, भावनिक चढ-उतार सामान्य आहेत, पण काही लक्षणांकडे दुर्लक्ष करू नका.",
      en: "After birth, both body and mind need time to heal. Tiredness and mood swings are common, but some signs must not be ignored.",
      hi: "प्रसव के बाद शरीर और मन दोनों को ठीक होने में समय लगता है। थकान, मूड बदलना आम है, पर कुछ संकेतों को नज़रअंदाज़ न करें।",
    },
    answer: [
      {
        mr: "पुरेशी विश्रांती, पौष्टिक जेवण, पाणी आणि IFA गोळ्या चालू ठेवा.",
        en: "Rest, eat nourishing food, drink water and continue IFA tablets.",
        hi: "आराम करें, पौष्टिक खाना, पानी और IFA गोलियाँ जारी रखें।",
      },
      {
        mr: "धोका: खूप रक्तस्राव, ताप, दुर्गंधीचा स्राव, टाक्यांतून पू, छातीत दुखणं — लगेच डॉक्टर.",
        en: "Danger: heavy bleeding, fever, foul discharge, pus from stitches, chest pain — see a doctor now.",
        hi: "ख़तरा: ज़्यादा खून, बुखार, बदबूदार स्राव, टाँकों में मवाद, सीने में दर्द — तुरंत डॉक्टर।",
      },
      {
        mr: "दोन आठवड्यांहून जास्त उदासी, रडू, किंवा स्वतःला/बाळाला इजा करण्याचे विचार — मदत घ्या.",
        en: "Sadness over two weeks, constant crying, or thoughts of harming yourself or baby — get help.",
        hi: "दो हफ़्ते से ज़्यादा उदासी, रोना, या ख़ुद को/बच्चे को नुकसान के विचार — मदद लें।",
      },
      {
        mr: "Tele-MANAS 14416 वर मोफत आणि गोपनीय बोलता येतं.",
        en: "Tele-MANAS 14416 offers free, confidential support.",
        hi: "Tele-MANAS 14416 पर मुफ़्त और गोपनीय बात कर सकती हैं।",
      },
      {
        mr: "आशाताईंच्या घरभेटी आणि 6 आठवड्यांची तपासणी चुकवू नका.",
        en: "Don't miss ASHA home visits and your 6-week check-up.",
        hi: "आशा दीदी की घर-विज़िट और 6 हफ़्ते की जाँच न छोड़ें।",
      },
    ],
    next: {
      mr: "तुम्हाला शरीराने आणि मनाने आज कसं वाटतंय?",
      en: "How are you feeling today — in body and in mind?",
      hi: "आज आप शरीर और मन से कैसा महसूस कर रही हैं?",
    },
    actions: [A_TELEMANAS, A_AMBULANCE],
    sensitive: "medical",
    ages: MOTHER,
  },
  {
    id: "breastfeeding",
    intent: "learn",
    title: { mr: "स्तनपान माहिती", en: "Breastfeeding information", hi: "स्तनपान जानकारी" },
    keywords: [
      "breastfeeding", "स्तनपान", "अंगावरचं दूध", "दूध कमी येतं", "doodh kam", "माँ का दूध",
      "breast milk", "दूध पाजणं", "feeding baby", "छाती दुखते", "breast pain", "stanpan",
      "doodh pilana", "colostrum", "पहिलं दूध",
    ],
    understand: {
      mr: "आईचं दूध बाळासाठी सर्वोत्तम आहार आहे. सुरुवातीला अडचणी येणं सामान्य आहे — मदत मागणं ठीक आहे.",
      en: "Breast milk is the best food for your baby. Early difficulties are common — asking for help is okay.",
      hi: "माँ का दूध बच्चे का सबसे अच्छा आहार है। शुरू में दिक़्क़त आम है — मदद माँगना ठीक है।",
    },
    answer: [
      {
        mr: "जन्मानंतर एका तासात पाजा; पहिलं पिवळं दूध (चीक) बाळासाठी अमृत आहे.",
        en: "Start within one hour of birth; the first yellow milk (colostrum) is precious.",
        hi: "जन्म के एक घंटे में पिलाएँ; पहला पीला दूध बच्चे के लिए बहुत कीमती है।",
      },
      {
        mr: "पहिले 6 महिने फक्त आईचं दूध — पाणी, मध, घुटी काही नको.",
        en: "Only breast milk for the first 6 months — no water, honey or ghutti.",
        hi: "पहले 6 महीने सिर्फ़ माँ का दूध — पानी, शहद, घुट्टी कुछ नहीं।",
      },
      {
        mr: "बाळ मागेल तेव्हा पाजा, दिवसा-रात्री 8–12 वेळा.",
        en: "Feed whenever the baby wants, about 8–12 times day and night.",
        hi: "बच्चा जब माँगे तब पिलाएँ, दिन-रात में लगभग 8–12 बार।",
      },
      {
        mr: "स्तन लाल, गरम, गाठ आणि ताप — डॉक्टरला दाखवा.",
        en: "Breast red, hot, lumpy with fever — see a doctor.",
        hi: "स्तन लाल, गर्म, गाँठ और बुखार — डॉक्टर को दिखाएँ।",
      },
      {
        mr: "योग्य पकड (latch) शिकण्यासाठी आशाताई किंवा नर्सची मदत घ्या.",
        en: "Ask your ASHA or nurse to help with a good latch.",
        hi: "सही पकड़ (latch) सीखने के लिए आशा दीदी या नर्स की मदद लें।",
      },
    ],
    next: {
      mr: "पाजताना कोणती अडचण येतेय — दुखणं, दूध कमी, की बाळ नीट ओढत नाही?",
      en: "What is hardest right now — pain, low milk, or baby not latching?",
      hi: "अभी सबसे मुश्किल क्या है — दर्द, दूध कम, या बच्चा ठीक से नहीं पकड़ता?",
    },
    actions: [A_AWARENESS],
    sensitive: "medical",
    ages: MOTHER,
  },
  {
    id: "newborn_care",
    intent: "check",
    title: { mr: "नवजात बाळाची काळजी", en: "Newborn care & danger signs", hi: "नवजात की देखभाल" },
    keywords: [
      "newborn care", "नवजात बाळ", "नवजात शिशु", "baby care", "बाळ दूध पीत नाही", "बच्चा दूध नहीं पी रहा",
      "baby fever", "बाळाला ताप", "कावीळ", "पीलिया", "jaundice baby", "बाळ पिवळं", "नाळ",
      "baby vaccine", "लसीकरण", "tika",
    ],
    understand: {
      mr: "नवजात बाळाची काळजी घेताना मनात खूप प्रश्न येणं स्वाभाविक आहे. काही धोक्याची लक्षणं माहीत असणं महत्त्वाचं.",
      en: "It's natural to have many questions with a newborn. Knowing a few danger signs is important.",
      hi: "नवजात के साथ बहुत सवाल आना स्वाभाविक है। कुछ ख़तरे के संकेत जानना ज़रूरी है।",
    },
    answer: [
      {
        mr: "बाळाला उबदार ठेवा — आईच्या छातीशी (कांगारू केअर) ठेवणं उत्तम.",
        en: "Keep baby warm — skin-to-skin on mother's chest (kangaroo care) is best.",
        hi: "बच्चे को गर्म रखें — माँ की छाती से लगाकर (कंगारू केयर) सबसे अच्छा।",
      },
      {
        mr: "नाळ कोरडी व स्वच्छ ठेवा; त्यावर काहीही लावू नका.",
        en: "Keep the cord stump clean and dry; don't apply anything on it.",
        hi: "नाल को साफ़ और सूखा रखें; उस पर कुछ न लगाएँ।",
      },
      {
        mr: "धोका: दूध न पिणं, ताप किंवा अंग थंड, जलद श्वास, झटके, सुस्ती, पिवळे तळवे.",
        en: "Danger: not feeding, fever or cold body, fast breathing, fits, very sleepy, yellow palms or soles.",
        hi: "ख़तरा: दूध न पीना, बुखार या ठंडा शरीर, तेज़ साँस, दौरे, सुस्ती, पीली हथेली-तलवे।",
      },
      {
        mr: "यापैकी काहीही दिसलं तर लगेच दवाखान्यात जा किंवा 108/102 ला कॉल करा.",
        en: "If you see any of these, go to hospital now or call 108/102.",
        hi: "इनमें से कुछ भी दिखे तो तुरंत अस्पताल जाएँ या 108/102 बुलाएँ।",
      },
      {
        mr: "लसीकरण वेळेवर — MCP कार्डवर तारखा पहा; लसी मोफत आहेत.",
        en: "Vaccinate on time — check dates on the MCP card; vaccines are free.",
        hi: "टीके समय पर — MCP कार्ड पर तारीखें देखें; टीके मुफ़्त हैं।",
      },
    ],
    next: {
      mr: "बाळ नीट दूध पितंय आणि दिवसातून 6+ वेळा लघवी करतंय का?",
      en: "Is your baby feeding well and passing urine 6 or more times a day?",
      hi: "क्या बच्चा ठीक से दूध पी रहा है और दिन में 6+ बार पेशाब कर रहा है?",
    },
    actions: [A_AMBULANCE, A_MATERNAL],
    sensitive: "medical",
    ages: MOTHER,
  },

  // ───────────── AGE JOURNEYS ─────────────
  {
    id: "journey_18",
    intent: "learn",
    title: { mr: "माझा 18+ आरोग्य प्रवास", en: "My 18+ health journey", hi: "मेरी 18+ स्वास्थ्य यात्रा" },
    keywords: [
      "18+", "aadhi ti 18", "young woman health", "तरुण मुलगी आरोग्य", "कॉलेज मुलगी", "युवती स्वास्थ्य",
      "18 varsh", "18 saal", "sexual health", "लैंगिक आरोग्य", "यौन स्वास्थ्य", "mental health young",
      "मन उदास", "health journey 18",
    ],
    understand: {
      mr: "18+ वय म्हणजे शरीर, मन आणि नाती यांची नवी ओळख. स्वतःच्या आरोग्याची माहिती असणं ही ताकद आहे.",
      en: "18+ is a time of new understanding of your body, mind and relationships. Knowing your health is strength.",
      hi: "18+ उम्र शरीर, मन और रिश्तों को नए सिरे से समझने का समय है। अपनी सेहत की जानकारी ताक़त है।",
    },
    answer: [
      {
        mr: "पाळी: तारखा नोंदवा, स्वच्छता पाळा, असह्य वेदना किंवा जास्त रक्तस्राव असल्यास डॉक्टर.",
        en: "Periods: track dates, keep clean, see a doctor for severe pain or heavy bleeding.",
        hi: "माहवारी: तारीखें लिखें, सफ़ाई रखें, तेज़ दर्द या ज़्यादा खून हो तो डॉक्टर।",
      },
      {
        mr: "मन: ताण, उदासी, एकटेपणा जाणवला तर बोला — Tele-MANAS 14416 मोफत आहे.",
        en: "Mind: if stressed, low or lonely, talk to someone — Tele-MANAS 14416 is free.",
        hi: "मन: तनाव, उदासी, अकेलापन लगे तो बात करें — Tele-MANAS 14416 मुफ़्त है।",
      },
      {
        mr: "लैंगिक आरोग्य: संमती महत्त्वाची; गर्भनिरोधन व संसर्गाबद्दल डॉक्टरला विचारा.",
        en: "Sexual health: consent matters; ask a doctor about contraception and infections.",
        hi: "यौन स्वास्थ्य: सहमति ज़रूरी है; गर्भनिरोधक और संक्रमण के बारे में डॉक्टर से पूछें।",
      },
      {
        mr: "हिमोग्लोबिन तपासा, लोहयुक्त आहार घ्या, रोज हालचाल करा.",
        en: "Check your haemoglobin, eat iron-rich food, move every day.",
        hi: "हीमोग्लोबिन जाँचें, आयरन वाला खाना खाएँ, रोज़ चलें-फिरें।",
      },
    ],
    next: {
      mr: "यापैकी कशाबद्दल अधिक जाणून घ्यायचंय — पाळी, मन की नाती?",
      en: "Which would you like to explore — periods, mind, or relationships?",
      hi: "आप किसके बारे में जानना चाहेंगी — माहवारी, मन, या रिश्ते?",
    },
    actions: [A_TELEMANAS, A_AWARENESS],
    sensitive: "medical",
    ages: ["18"],
  },
  {
    id: "journey_30",
    intent: "learn",
    title: { mr: "माझा 30+ आरोग्य प्रवास", en: "My 30+ health journey", hi: "मेरी 30+ स्वास्थ्य यात्रा" },
    keywords: [
      "30+", "aadhi ti 30", "30 varsh", "30 saal", "fertility", "गर्भधारणा", "बाळ होत नाही",
      "बच्चा नहीं हो रहा", "stress", "ताण", "तनाव", "bp sugar check", "breast self exam",
      "स्तन तपासणी", "health journey 30",
    ],
    understand: {
      mr: "30+ वयात घर, काम, मुलं यात स्वतःकडे दुर्लक्ष होतं. आता थोडी नियमित काळजी पुढच्या अनेक वर्षांचं आरोग्य जपते.",
      en: "At 30+, home, work and children often push your own health aside. A little regular care now protects many years ahead.",
      hi: "30+ में घर, काम, बच्चों के बीच अपनी सेहत पीछे छूट जाती है। अभी थोड़ी नियमित देखभाल आगे के सालों को बचाती है।",
    },
    answer: [
      {
        mr: "PCOS, थायरॉईड, ॲनिमिया — पाळी बदलली किंवा थकवा असेल तर तपासणी करा.",
        en: "PCOS, thyroid, anaemia — get tested if your periods change or you feel constantly tired.",
        hi: "PCOS, थायरॉइड, एनीमिया — माहवारी बदले या थकान रहे तो जाँच कराएँ।",
      },
      {
        mr: "गर्भधारणेत अडचण असेल तर दोघांनी (नवरा-बायको) तपासणी करावी.",
        en: "If you have trouble conceiving, both partners should get checked.",
        hi: "गर्भधारण में दिक़्क़त हो तो पति-पत्नी दोनों की जाँच होनी चाहिए।",
      },
      {
        mr: "वर्षातून एकदा BP आणि sugar तपासा — PHC मध्ये मोफत.",
        en: "Check BP and sugar once a year — free at the PHC.",
        hi: "साल में एक बार BP और शुगर जाँचें — PHC में मुफ़्त।",
      },
      {
        mr: "दर महिन्याला स्तन स्वतः तपासा; गाठ किंवा बदल दिसल्यास डॉक्टर.",
        en: "Do a monthly breast self-exam; see a doctor for any lump or change.",
        hi: "हर महीने स्तन की ख़ुद जाँच करें; गाँठ या बदलाव दिखे तो डॉक्टर।",
      },
      {
        mr: "ताण जास्त असेल तर बोला — Tele-MANAS 14416.",
        en: "If stress feels heavy, talk to someone — Tele-MANAS 14416.",
        hi: "तनाव ज़्यादा हो तो बात करें — Tele-MANAS 14416।",
      },
    ],
    next: {
      mr: "तुमची शेवटची BP आणि sugar तपासणी कधी झाली?",
      en: "When did you last check your BP and sugar?",
      hi: "आपकी पिछली BP और शुगर जाँच कब हुई थी?",
    },
    actions: [A_TELEMANAS, A_AWARENESS],
    sensitive: "medical",
    ages: ["30"],
  },
  {
    id: "journey_40",
    intent: "learn",
    title: { mr: "माझा 40+ आरोग्य प्रवास", en: "My 40+ health journey", hi: "मेरी 40+ स्वास्थ्य यात्रा" },
    keywords: [
      "40+", "aadhi ti 40", "40 varsh", "40 saal", "perimenopause", "रजोनिवृत्तीपूर्व", "पाळी बंद होण्याआधी",
      "hot flashes", "अंगातून गरम वाफा", "हड्डियाँ कमज़ोर", "हाडं ठिसूळ", "heart health", "हृदय",
      "screening", "health journey 40",
    ],
    understand: {
      mr: "40+ मध्ये पाळी बदलू लागते आणि शरीरात हार्मोनल बदल सुरू होतात. हा नैसर्गिक टप्पा आहे — माहिती असली की सोपा जातो.",
      en: "In your 40s, periods start changing as hormones shift. It's a natural stage — easier when you know what to expect.",
      hi: "40+ में माहवारी बदलने लगती है और हार्मोन बदलते हैं। यह प्राकृतिक दौर है — जानकारी हो तो आसान होता है।",
    },
    answer: [
      {
        mr: "पाळी अनियमित, गरम वाफा, झोप कमी, चिडचिड — ही पेरिमेनोपॉजची लक्षणं असू शकतात.",
        en: "Irregular periods, hot flushes, poor sleep, irritability can be signs of perimenopause.",
        hi: "अनियमित माहवारी, गर्मी की लहरें, कम नींद, चिड़चिड़ापन — पेरिमेनोपॉज़ के संकेत हो सकते हैं।",
      },
      {
        mr: "हाडांसाठी: दूध, नाचणी, तीळ, सकाळचं ऊन आणि रोज चालणं.",
        en: "For bones: milk, nachni, sesame, morning sunlight and daily walking.",
        hi: "हड्डियों के लिए: दूध, रागी, तिल, सुबह की धूप और रोज़ टहलना।",
      },
      {
        mr: "हृदयासाठी: BP, sugar, कोलेस्टेरॉल तपासा; मीठ-तेल कमी करा.",
        en: "For the heart: check BP, sugar, cholesterol; cut down salt and oil.",
        hi: "दिल के लिए: BP, शुगर, कोलेस्ट्रॉल जाँचें; नमक-तेल कम करें।",
      },
      {
        mr: "गर्भाशय मुखाची (Pap/VIA) आणि स्तन तपासणी करून घ्या.",
        en: "Get cervical (Pap/VIA) and breast screening done.",
        hi: "गर्भाशय मुख (Pap/VIA) और स्तन की जाँच कराएँ।",
      },
      {
        mr: "पाळी बंद होत असताना खूप जास्त किंवा वारंवार रक्तस्राव झाला तर डॉक्टरला दाखवा.",
        en: "Very heavy or frequent bleeding during this change needs a doctor.",
        hi: "इस दौरान बहुत ज़्यादा या बार-बार खून आए तो डॉक्टर को दिखाएँ।",
      },
    ],
    next: {
      mr: "तुम्ही कधी गर्भाशय मुख तपासणी (Pap/VIA) केली आहे का?",
      en: "Have you ever had a cervical screening (Pap/VIA)?",
      hi: "क्या आपने कभी गर्भाशय मुख की जाँच (Pap/VIA) कराई है?",
    },
    actions: [A_AWARENESS, A_SCHEMES],
    sensitive: "medical",
    ages: ["40"],
  },
  {
    id: "journey_50",
    intent: "learn",
    title: { mr: "माझा 50+ आरोग्य प्रवास", en: "My 50+ health journey", hi: "मेरी 50+ स्वास्थ्य यात्रा" },
    keywords: [
      "50+", "aadhi ti 50", "50 varsh", "50 saal", "post menopause", "पाळी बंद झाल्यावर", "गुडघे दुखतात",
      "joint pain", "घुटनों में दर्द", "डोळे तपासणी", "eye check", "आँखों की जाँच", "mobility",
      "चालायला त्रास", "health journey 50",
    ],
    understand: {
      mr: "50+ हा अनुभवाचा आणि स्वतःसाठी वेळ काढण्याचा टप्पा आहे. नियमित तपासणी तुम्हाला सक्रिय आणि स्वतंत्र ठेवते.",
      en: "50+ is a stage of experience and time for yourself. Regular check-ups keep you active and independent.",
      hi: "50+ अनुभव और अपने लिए समय निकालने का दौर है। नियमित जाँच आपको सक्रिय और आत्मनिर्भर रखती है।",
    },
    answer: [
      {
        mr: "पाळी बंद झाल्यावर पुन्हा कोणताही रक्तस्राव झाला तर लगेच डॉक्टरला दाखवा.",
        en: "Any bleeding after periods have stopped needs a doctor promptly.",
        hi: "माहवारी बंद होने के बाद कोई भी खून आए तो जल्दी डॉक्टर को दिखाएँ।",
      },
      {
        mr: "हाडं आणि सांधे: कॅल्शियमयुक्त आहार, ऊन, रोज हलका व्यायाम; पडणं टाळा.",
        en: "Bones and joints: calcium-rich food, sunlight, gentle daily exercise; prevent falls.",
        hi: "हड्डियाँ और जोड़: कैल्शियम वाला खाना, धूप, रोज़ हल्का व्यायाम; गिरने से बचें।",
      },
      {
        mr: "दरवर्षी: BP, sugar, डोळे; नियमित स्तन व गर्भाशय मुख तपासणी.",
        en: "Every year: BP, sugar, eyes; regular breast and cervical screening.",
        hi: "हर साल: BP, शुगर, आँखें; नियमित स्तन और गर्भाशय मुख जाँच।",
      },
      {
        mr: "छातीत दुखणं, अचानक बोलणं अडखळणं, एका बाजूला कमजोरी — लगेच 108.",
        en: "Chest pain, sudden slurred speech, one-sided weakness — call 108 immediately.",
        hi: "सीने में दर्द, अचानक बोलने में दिक़्क़त, एक तरफ़ कमज़ोरी — तुरंत 108।",
      },
      {
        mr: "मैत्रिणी, भजनी मंडळ, बचत गट — लोकांशी जोडलेलं राहणं मनासाठी औषध आहे.",
        en: "Friends, bhajan groups, self-help groups — staying connected is medicine for the mind.",
        hi: "सहेलियाँ, भजन मंडली, स्वयं सहायता समूह — लोगों से जुड़े रहना मन की दवा है।",
      },
    ],
    next: {
      mr: "या वर्षी तुमची डोळे आणि sugar तपासणी झाली आहे का?",
      en: "Have you had your eyes and sugar checked this year?",
      hi: "क्या इस साल आपकी आँखों और शुगर की जाँच हुई है?",
    },
    actions: [A_AMBULANCE, A_SCHEMES],
    sensitive: "medical",
    ages: ["50"],
  },
  {
    id: "menopause",
    intent: "learn",
    title: { mr: "रजोनिवृत्ती (मेनोपॉज)", en: "What happens at menopause", hi: "रजोनिवृत्ति (मेनोपॉज़)" },
    keywords: [
      "menopause", "मेनोपॉज", "रजोनिवृत्ती", "रजोनिवृत्ति", "पाळी बंद", "माहवारी बंद", "pali band",
      "mahina band", "hot flush", "गरम वाफा", "गर्मी लगना", "रात्री घाम", "night sweats",
      "चिडचिड", "mood swings",
    ],
    understand: {
      mr: "सलग 12 महिने पाळी आली नाही की रजोनिवृत्ती झाली असं म्हणतात. साधारण 45–55 वयात होते — हा आजार नाही, नैसर्गिक बदल आहे.",
      en: "Menopause is when you have had no period for 12 months in a row, usually between 45 and 55. It's a natural change, not an illness.",
      hi: "लगातार 12 महीने माहवारी न आए तो रजोनिवृत्ति कहते हैं, आमतौर पर 45–55 उम्र में। यह बीमारी नहीं, प्राकृतिक बदलाव है।",
    },
    answer: [
      {
        mr: "गरम वाफा, रात्री घाम, झोप कमी, मूड बदलणं, योनी कोरडी पडणं — सामान्य आहे.",
        en: "Hot flushes, night sweats, poor sleep, mood changes, vaginal dryness are common.",
        hi: "गर्मी की लहरें, रात में पसीना, कम नींद, मूड बदलना, योनि में सूखापन — आम हैं।",
      },
      {
        mr: "सुती कपडे, थंड पाणी, चहा-कॉफी कमी, रोज चालणं — मदत होते.",
        en: "Cotton clothes, cool water, less tea and coffee, daily walking can help.",
        hi: "सूती कपड़े, ठंडा पानी, कम चाय-कॉफ़ी, रोज़ टहलना — मदद करता है।",
      },
      {
        mr: "हाडं कमजोर होऊ शकतात — कॅल्शियम, ऊन आणि व्यायाम महत्त्वाचे.",
        en: "Bones can weaken — calcium, sunlight and exercise are important.",
        hi: "हड्डियाँ कमज़ोर हो सकती हैं — कैल्शियम, धूप और व्यायाम ज़रूरी है।",
      },
      {
        mr: "पाळी बंद झाल्यावर पुन्हा रक्तस्राव झाला तर लगेच डॉक्टरला दाखवा.",
        en: "Any bleeding after menopause must be checked by a doctor soon.",
        hi: "रजोनिवृत्ति के बाद फिर से खून आए तो जल्दी डॉक्टर को दिखाएँ।",
      },
      {
        mr: "त्रास खूप असेल तर डॉक्टरांशी उपचार पर्यायांबद्दल बोला.",
        en: "If symptoms are hard to live with, ask a doctor about treatment options.",
        hi: "तकलीफ़ ज़्यादा हो तो डॉक्टर से इलाज के विकल्पों के बारे में बात करें।",
      },
    ],
    next: {
      mr: "तुम्हाला सगळ्यात जास्त कोणता त्रास होतोय — वाफा, झोप की मन?",
      en: "What troubles you most — hot flushes, sleep, or mood?",
      hi: "आपको सबसे ज़्यादा क्या परेशान करता है — गर्मी, नींद, या मन?",
    },
    actions: [A_TELEMANAS, A_AWARENESS],
    sensitive: "medical",
    ages: ["40", "50"],
  },
];

export const familyTopics: Topic[] = [
  {
    id: "daughter_online_safety",
    intent: "learn",
    title: { mr: "मुलीशी ऑनलाइन सुरक्षेबद्दल बोलणं", en: "Talk to my teen about online safety", hi: "बेटी से ऑनलाइन सुरक्षा पर बात" },
    keywords: [
      "online safety daughter", "मुलगी मोबाईल", "मुलीचा फोन", "instagram", "social media daughter",
      "बेटी ऑनलाइन", "बेटी का फोन", "beti online", "mulgi mobile vaparte", "अनोळखी मेसेज",
      "अनजान मैसेज", "photo morph", "online stranger", "teenage daughter phone",
    ],
    understand: {
      mr: "आजच्या मुली फोनवरच मोठ्या होतात. भीती दाखवण्यापेक्षा विश्वासाने बोललं तर ती अडचणीत तुमच्याकडे येईल.",
      en: "Girls today grow up online. Talking with trust, not fear, makes her come to you when something goes wrong.",
      hi: "आज की लड़कियाँ ऑनलाइन बड़ी होती हैं। डर की बजाय भरोसे से बात करें तो मुश्किल में वह आपके पास आएगी।",
    },
    answer: [
      {
        mr: "फोन जप्त करण्याची धमकी देऊ नका — नाहीतर ती अडचणी लपवेल.",
        en: "Don't threaten to take her phone — she may start hiding problems.",
        hi: "फ़ोन छीनने की धमकी न दें — वरना वह परेशानियाँ छुपाएगी।",
      },
      {
        mr: "सांगा: फोटो, पत्ता, OTP अनोळखी व्यक्तीला कधीच देऊ नये.",
        en: "Tell her: never share photos, address or OTPs with strangers.",
        hi: "बताएँ: अनजान को कभी फ़ोटो, पता या OTP न दें।",
      },
      {
        mr: "कोणी धमकी दिली, फोटो मागितले — तर घाबरू नको, मला सांग, तुझी चूक नाही.",
        en: "If anyone threatens her or asks for photos — tell her it's not her fault and to tell you.",
        hi: "कोई धमकाए या फ़ोटो माँगे — उसे बताएँ कि उसकी ग़लती नहीं, आपको बताए।",
      },
      {
        mr: "अकाउंट private ठेवणं, block/report करणं एकत्र शिका.",
        en: "Learn together how to keep accounts private and to block or report.",
        hi: "साथ मिलकर अकाउंट प्राइवेट रखना और ब्लॉक/रिपोर्ट करना सीखें।",
      },
      {
        mr: "सायबर त्रास झाला तर 1930 वर कॉल करा किंवा cybercrime पोर्टलवर तक्रार करा.",
        en: "For cyber harassment, call 1930 or report on the cybercrime portal.",
        hi: "साइबर परेशानी हो तो 1930 पर कॉल करें या साइबरक्राइम पोर्टल पर शिकायत करें।",
      },
    ],
    next: {
      mr: "आज जेवताना तिला विचाराल का — ऑनलाइन तुला कधी अस्वस्थ वाटलं का?",
      en: "Could you ask her gently today — has anything online ever made you uncomfortable?",
      hi: "क्या आज आप उससे प्यार से पूछेंगी — ऑनलाइन कभी कुछ अजीब लगा?",
    },
    actions: [
      A_CYBER,
      {
        label: { mr: "सायबर तक्रार नोंदवा", en: "Report on cybercrime portal", hi: "साइबर शिकायत दर्ज करें" },
        href: "https://cybercrime.gov.in",
      },
    ],
    ages: ADULT,
  },
  {
    id: "daughter_silent",
    intent: "connect",
    title: { mr: "मुलगी माझ्याशी बोलत नाही", en: "My daughter stopped talking to me", hi: "बेटी मुझसे बात नहीं करती" },
    keywords: [
      "daughter not talking", "मुलगी बोलत नाही", "मुलगी गप्प", "बेटी बात नहीं करती", "beti baat nahi karti",
      "mulgi bolat nahi", "मुलगी चिडचिड करते", "teenage mood", "बेटी चुप", "मुलगी एकटी राहते",
      "daughter silent", "मुलगी रडते", "beti udaas",
    ],
    understand: {
      mr: "मुलगी अचानक गप्प झाली की आईला काळजी वाटणं साहजिक आहे. कधी हे वयाचं असतं, तर कधी तिला काहीतरी त्रास देत असतो.",
      en: "It's natural to worry when your daughter goes quiet. Sometimes it's her age; sometimes something is troubling her.",
      hi: "बेटी अचानक चुप हो जाए तो माँ का चिंता करना स्वाभाविक है। कभी यह उम्र है, कभी कुछ उसे परेशान कर रहा होता है।",
    },
    answer: [
      {
        mr: "प्रश्नांचा भडिमार नको; सोबत काम करताना, चालताना सहज बोला.",
        en: "Don't flood her with questions; talk casually while cooking or walking together.",
        hi: "सवालों की बौछार न करें; साथ काम करते या टहलते हुए सहज बात करें।",
      },
      {
        mr: "सांगा: 'काहीही झालं तरी मी रागावणार नाही, तुझ्या सोबत आहे.'",
        en: "Say: 'Whatever happened, I won't be angry. I'm with you.'",
        hi: "कहें: 'कुछ भी हुआ हो, मैं नाराज़ नहीं होऊँगी, मैं तुम्हारे साथ हूँ।'",
      },
      {
        mr: "लक्ष ठेवा: झोप-भूक बदल, शाळेत जायला नकार, फोन लपवणं, अंगावर जखमा.",
        en: "Watch for: sleep or appetite change, refusing school, hiding her phone, injuries.",
        hi: "ध्यान दें: नींद-भूख बदलना, स्कूल जाने से मना, फ़ोन छुपाना, चोट के निशान।",
      },
      {
        mr: "ती स्वतःला इजा करण्याबद्दल बोलली तर लगेच Tele-MANAS 14416 किंवा 1098.",
        en: "If she talks of harming herself, call Tele-MANAS 14416 or Childline 1098 now.",
        hi: "अगर वह ख़ुद को नुकसान की बात करे तो तुरंत Tele-MANAS 14416 या 1098।",
      },
    ],
    next: {
      mr: "तिला आवडणारं एखादं काम आज दोघी मिळून कराल का?",
      en: "Could you do one thing she enjoys together today?",
      hi: "क्या आज आप दोनों साथ मिलकर कुछ ऐसा करेंगी जो उसे पसंद हो?",
    },
    actions: [A_TELEMANAS, A_CHILDLINE],
    ages: ADULT,
  },
  {
    id: "daughter_safety",
    intent: "learn",
    title: { mr: "मुलीच्या सुरक्षेसाठी मदत", en: "Support my daughter's safety", hi: "बेटी की सुरक्षा में मदद" },
    keywords: [
      "daughter safety", "मुलीची सुरक्षा", "बेटी की सुरक्षा", "beti ki suraksha", "good touch bad touch",
      "चांगला स्पर्श वाईट स्पर्श", "अच्छा स्पर्श बुरा स्पर्श", "body safety", "code word", "कोड शब्द",
      "trusted adult", "mulgichi suraksha", "safe touch",
    ],
    understand: {
      mr: "मुलीला सुरक्षित ठेवण्याचा सर्वात चांगला मार्ग म्हणजे तिला माहिती आणि आत्मविश्वास देणं — भीती नाही.",
      en: "The best way to keep your daughter safe is to give her knowledge and confidence — not fear.",
      hi: "बेटी को सुरक्षित रखने का सबसे अच्छा तरीका है उसे जानकारी और आत्मविश्वास देना — डर नहीं।",
    },
    answer: [
      {
        mr: "शरीराच्या अवयवांना योग्य नावं शिकवा; 'कपड्याखालचं शरीर खाजगी आहे.'",
        en: "Teach correct names for body parts; 'what your underwear covers is private.'",
        hi: "शरीर के अंगों के सही नाम सिखाएँ; 'कपड़ों के नीचे का शरीर निजी है।'",
      },
      {
        mr: "'नाही' म्हणणं आणि लगेच सांगणं ठीक आहे — अगदी ओळखीच्या व्यक्तीबद्दलही.",
        en: "It's okay to say 'no' and tell right away — even about someone she knows.",
        hi: "'ना' कहना और तुरंत बताना ठीक है — किसी जान-पहचान वाले के बारे में भी।",
      },
      {
        mr: "3 विश्वासू मोठ्या व्यक्ती ठरवा ज्यांना ती काहीही सांगू शकेल.",
        en: "Choose 3 trusted adults she can tell anything.",
        hi: "3 भरोसेमंद बड़े तय करें जिन्हें वह कुछ भी बता सके।",
      },
      {
        mr: "घरचा एक कोड शब्द ठरवा — तो म्हटला की तुम्ही लगेच येऊन घेऊन जाल.",
        en: "Agree on a family code word — if she says it, you come and get her, no questions.",
        hi: "घर का एक कोड शब्द तय करें — वह बोले तो आप तुरंत उसे ले आएँगी।",
      },
      {
        mr: "'गुपित' आणि 'सरप्राईज' यातला फरक शिकवा — असुरक्षित गुपितं सांगायचीच.",
        en: "Teach the difference between secrets and surprises — unsafe secrets must be told.",
        hi: "'राज़' और 'सरप्राइज़' का फ़र्क सिखाएँ — असुरक्षित राज़ बताने ही हैं।",
      },
    ],
    next: {
      mr: "आज तुमच्या कुटुंबाचा कोड शब्द ठरवाल का?",
      en: "Would you choose your family code word today?",
      hi: "क्या आप आज अपने परिवार का कोड शब्द तय करेंगी?",
    },
    actions: [A_CHILDLINE, A_AWARENESS],
    ages: ADULT,
  },
  {
    id: "child_afraid_relative",
    intent: "act",
    title: { mr: "मुलगी नातेवाईकाला घाबरते", en: "Daughter scared of a relative", hi: "बेटी रिश्तेदार से डरती है" },
    keywords: [
      "माझ्या मुलीला एक नातेवाईक भेटला की ती घाबरते", "मुलगी घाबरते", "beti darti hai", "rishtedar",
      "नातेवाईक", "रिश्तेदार", "बेटी डरती है", "mulgi ghabrate", "natevaik", "child scared of relative",
      "uncle touch", "काका", "मामा", "child abuse", "बाल शोषण", "pocso", "गलत स्पर्श",
    ],
    understand: {
      mr: "मुलगी एखाद्या विशिष्ट व्यक्तीला घाबरत असेल तर ती गंभीर खूण असू शकते. तुम्ही लक्ष दिलंत हे खूप महत्त्वाचं आहे — तिच्या भावनेवर विश्वास ठेवा.",
      en: "A child being afraid of one particular person can be a serious warning sign. You noticing matters — take her fear seriously.",
      hi: "बच्ची किसी ख़ास व्यक्ति से डरे तो यह गंभीर चेतावनी हो सकती है। आपका ध्यान देना बहुत ज़रूरी है — उसके डर पर भरोसा करें।",
    },
    answer: [
      {
        mr: "तिला त्या व्यक्तीसोबत कधीही एकटं सोडू नका — अगदी थोड्या वेळासाठीही.",
        en: "Never leave her alone with that person — not even for a short time.",
        hi: "उसे उस व्यक्ति के साथ कभी अकेला न छोड़ें — थोड़ी देर के लिए भी नहीं।",
      },
      {
        mr: "शांतपणे विचारा, ती सांगेल ते पूर्ण ऐका आणि म्हणा: 'मला तुझ्यावर विश्वास आहे, तुझी चूक नाही.'",
        en: "Ask calmly, listen fully, and say: 'I believe you. It's not your fault.'",
        hi: "शांति से पूछें, पूरा सुनें और कहें: 'मुझे तुम पर भरोसा है, तुम्हारी ग़लती नहीं।'",
      },
      {
        mr: "मुलीसमोर त्या व्यक्तीशी भांडण किंवा जाब विचारू नका; तिला जबरदस्ती मिठी मारायला लावू नका.",
        en: "Don't confront the person in front of her; never force her to hug or greet them.",
        hi: "बच्ची के सामने उस व्यक्ति से झगड़ा न करें; उसे गले मिलने के लिए मजबूर न करें।",
      },
      {
        mr: "Childline 1098 ला कॉल करा — मोफत, गोपनीय. तात्काळ धोका असेल तर 112.",
        en: "Call Childline 1098 — free and confidential. If there's immediate danger, call 112.",
        hi: "Childline 1098 पर कॉल करें — मुफ़्त, गोपनीय। तुरंत ख़तरा हो तो 112।",
      },
      {
        mr: "POCSO कायदा मुलांना लैंगिक शोषणापासून संरक्षण देतो — कुटुंबातील व्यक्ती असली तरी.",
        en: "The POCSO Act protects children from sexual abuse — even by family members.",
        hi: "POCSO कानून बच्चों को यौन शोषण से बचाता है — परिवार के सदस्य से भी।",
      },
    ],
    next: {
      mr: "ती आत्ता सुरक्षित आहे का? तिच्याशी बोलण्याआधी 1098 ला सल्ला घ्यायचा आहे का?",
      en: "Is she safe right now? Would you like to call 1098 for guidance before talking to her?",
      hi: "क्या वह अभी सुरक्षित है? क्या उससे बात करने से पहले 1098 से सलाह लेंगी?",
    },
    actions: [A_CHILDLINE, A_EMERGENCY],
    sensitive: "child",
    ages: ADULT,
  },
  {
    id: "child_nutrition",
    intent: "learn",
    title: { mr: "मुलांचा आहार", en: "Child nutrition basics", hi: "बच्चों का पोषण" },
    keywords: [
      "child nutrition", "मुलांचा आहार", "बच्चों का खाना", "मूल जेवत नाही", "बच्चा खाना नहीं खाता",
      "baccha khana nahi khata", "वजन वाढत नाही", "वज़न नहीं बढ़ रहा", "कुपोषण", "malnutrition",
      "anganwadi food", "अंगणवाडी आहार", "growth chart", "मुलगा बारीक",
    ],
    understand: {
      mr: "मुलांचं खाणं ही अनेक आईंची रोजची काळजी असते. साधं, वैविध्यपूर्ण घरचं अन्न आणि नियमित वजन तपासणी पुरेशी असते.",
      en: "Children's eating is a daily worry for many mothers. Simple, varied home food and regular weight checks go a long way.",
      hi: "बच्चों का खाना कई माँओं की रोज़ की चिंता है। सादा, विविध घर का खाना और नियमित वज़न जाँच काफ़ी है।",
    },
    answer: [
      {
        mr: "6 महिन्यांनंतर आईच्या दुधासोबत मऊ घरगुती अन्न — नाचणी सत्त्व, खिचडी, डाळ.",
        en: "After 6 months, add soft home food with breast milk — nachni porridge, khichdi, dal.",
        hi: "6 महीने बाद माँ के दूध के साथ नरम घर का खाना — रागी दलिया, खिचड़ी, दाल।",
      },
      {
        mr: "ताटात रंग हवेत: भाज्या, फळं, डाळ, अंडी/मासे, दूध.",
        en: "Add colour to the plate: vegetables, fruit, dal, eggs or fish, milk.",
        hi: "थाली रंगीन हो: सब्ज़ी, फल, दाल, अंडा/मछली, दूध।",
      },
      {
        mr: "पॅकेटचे चिप्स, बिस्किटं, गोड पेयं कमी करा.",
        en: "Cut down packet chips, biscuits and sweet drinks.",
        hi: "पैकेट वाले चिप्स, बिस्किट और मीठे पेय कम करें।",
      },
      {
        mr: "अंगणवाडीत पूरक पोषण आहार आणि दरमहा वजन-उंची तपासणी मोफत मिळते.",
        en: "Anganwadi gives free supplementary food and monthly weight-height checks.",
        hi: "आंगनवाड़ी में मुफ़्त पूरक पोषण और हर महीने वज़न-लंबाई जाँच होती है।",
      },
      {
        mr: "वजन सलग घटत असेल, सारखे जुलाब किंवा सुस्ती असेल तर डॉक्टरकडे जा.",
        en: "If weight keeps dropping, or there's frequent diarrhoea or lethargy, see a doctor.",
        hi: "वज़न लगातार घटे, बार-बार दस्त या सुस्ती हो तो डॉक्टर को दिखाएँ।",
      },
    ],
    next: {
      mr: "तुमच्या मुलाचं अंगणवाडीत नियमित वजन होतंय का?",
      en: "Is your child being weighed regularly at the Anganwadi?",
      hi: "क्या आपके बच्चे का आंगनवाड़ी में नियमित वज़न होता है?",
    },
    actions: [A_SCHEMES],
    sensitive: "medical",
    ages: ADULT,
  },
  {
    id: "creche",
    intent: "find",
    title: { mr: "पाळणाघर / क्रेश पर्याय", en: "Childcare & crèche options", hi: "पालनाघर / क्रेश विकल्प" },
    keywords: [
      "creche", "crèche", "daycare", "पाळणाघर", "पालनाघर", "baby sitting", "मुलाला कुठे ठेवू",
      "बच्चे को कहाँ रखूँ", "bachhe ko kahan rakhu", "anganwadi creche", "workplace creche",
      "कामावर मूल", "palnaghar", "childcare",
    ],
    understand: {
      mr: "काम आणि लहान मूल दोन्ही सांभाळणं कठीण आहे. सुरक्षित पाळणाघर मिळालं तर मनावरचा मोठा भार हलका होतो.",
      en: "Managing work and a small child is hard. A safe crèche can lift a big weight off your mind.",
      hi: "काम और छोटे बच्चे को एक साथ संभालना मुश्किल है। सुरक्षित पालनाघर मिले तो मन का बोझ हल्का होता है।",
    },
    answer: [
      {
        mr: "अंगणवाडी-सह-पाळणाघर (Palna) योजनेबद्दल तुमच्या अंगणवाडीत विचारा.",
        en: "Ask your Anganwadi about Anganwadi-cum-crèche (Palna) facilities.",
        hi: "अपनी आंगनवाड़ी में आंगनवाड़ी-सह-पालनाघर (पालना) के बारे में पूछें।",
      },
      {
        mr: "कायद्यानुसार 50+ कर्मचारी असलेल्या आस्थापनांनी क्रेशची सोय करणं अपेक्षित आहे — HR ला विचारा.",
        en: "By law, workplaces with 50 or more employees should provide a crèche — ask HR.",
        hi: "क़ानून के अनुसार 50+ कर्मचारियों वाली जगह पर क्रेश होना चाहिए — HR से पूछें।",
      },
      {
        mr: "पाळणाघर निवडताना: स्वच्छता, सुरक्षित जागा, प्रशिक्षित कर्मचारी, तुम्हाला कधीही भेटता येणं.",
        en: "When choosing: cleanliness, safe space, trained staff, and you can visit any time.",
        hi: "चुनते समय: सफ़ाई, सुरक्षित जगह, प्रशिक्षित स्टाफ़, और आप कभी भी आ सकें।",
      },
      {
        mr: "मूल घाबरत असेल किंवा वागणं अचानक बदललं तर लक्ष द्या आणि विचारा.",
        en: "If your child seems scared or behaves differently suddenly, pay attention and ask.",
        hi: "बच्चा डरे या अचानक व्यवहार बदले तो ध्यान दें और पूछें।",
      },
    ],
    next: {
      mr: "तुमच्या जवळच्या अंगणवाडीत पाळणाघराची सोय आहे का ते विचाराल का?",
      en: "Could you ask your nearest Anganwadi whether it runs a crèche?",
      hi: "क्या आप अपनी नज़दीकी आंगनवाड़ी में पालनाघर के बारे में पूछेंगी?",
    },
    actions: [A_SCHEMES],
    ages: ADULT,
  },
  {
    id: "single_mother",
    intent: "find",
    title: { mr: "एकल माता / विधवा महिलांसाठी आधार", en: "Support for single women", hi: "एकल महिलाओं के लिए सहारा" },
    keywords: [
      "single mother", "widow", "विधवा", "एकल माता", "एकटी राहते", "अकेली रहती हूँ", "divorced",
      "घटस्फोट", "तलाक़शुदा", "separated", "नवरा सोडून गेला", "pati chhod gaya", "vidhwa pension",
      "विधवा पेन्शन", "single women policy", "akeli aurat",
    ],
    understand: {
      mr: "एकटीने घर आणि मुलं सांभाळणं खूप धैर्याचं काम आहे. तुम्ही एकट्या नाही — सरकारी योजना आणि मदत उपलब्ध आहे.",
      en: "Running a home and raising children alone takes great courage. You are not alone — schemes and help exist.",
      hi: "अकेले घर और बच्चे संभालना बड़ी हिम्मत का काम है। आप अकेली नहीं हैं — योजनाएँ और मदद मौजूद है।",
    },
    answer: [
      {
        mr: "महाराष्ट्र सरकार विधवा, घटस्फोटित, विभक्त व अविवाहित महिलांसाठी 'एकल महिला धोरण' तयार करत आहे.",
        en: "Maharashtra is preparing a Single Women Policy for widowed, divorced, separated and unmarried women.",
        hi: "महाराष्ट्र सरकार विधवा, तलाक़शुदा, अलग रह रही और अविवाहित महिलाओं के लिए 'एकल महिला नीति' तैयार कर रही है।",
      },
      {
        mr: "विधवा पेन्शन, संजय गांधी निराधार योजना यांसाठी तहसील कार्यालयात चौकशी करा.",
        en: "Ask at the tehsil office about widow pension and Sanjay Gandhi Niradhar scheme.",
        hi: "विधवा पेंशन और संजय गांधी निराधार योजना के लिए तहसील कार्यालय में पूछें।",
      },
      {
        mr: "सुरक्षा योजना: शेजारी/मैत्रिणीचा नंबर, फोनमध्ये 112 व 181, घराला चांगलं कुलूप.",
        en: "Safety plan: a neighbour or friend on speed dial, 112 and 181 saved, a strong lock.",
        hi: "सुरक्षा योजना: पड़ोसी/सहेली का नंबर, फ़ोन में 112 व 181, घर पर मज़बूत ताला।",
      },
      {
        mr: "मालमत्ता, पोटगी, मुलांचा ताबा यासाठी मोफत कायदेशीर मदत — 15100.",
        en: "Free legal aid for property, maintenance and custody — call 15100.",
        hi: "संपत्ति, गुज़ारा भत्ता, बच्चों की कस्टडी के लिए मुफ़्त क़ानूनी मदद — 15100।",
      },
      {
        mr: "बचत गटात सामील व्हा — पैसा, काम आणि सोबत तिन्ही मिळतात.",
        en: "Join a self-help group — it brings savings, work and company.",
        hi: "स्वयं सहायता समूह से जुड़ें — बचत, काम और साथ तीनों मिलते हैं।",
      },
    ],
    next: {
      mr: "तुम्हाला आधी कोणती मदत हवी आहे — पैसे, कायदा की सुरक्षा?",
      en: "What do you need first — money support, legal help, or safety?",
      hi: "आपको पहले कौन-सी मदद चाहिए — पैसे, क़ानूनी, या सुरक्षा?",
    },
    actions: [A_SCHEMES, A_LEGAL, A_181],
    ages: ADULT,
  },
  {
    id: "elder_women",
    intent: "find",
    title: { mr: "वृद्ध महिलांसाठी आधार", en: "Support for elder women", hi: "बुज़ुर्ग महिलाओं के लिए सहारा" },
    keywords: [
      "elder women", "senior citizen", "वृद्ध महिला", "आजी", "बुज़ुर्ग महिला", "दादी", "नानी",
      "old age pension", "वृद्धापकाळ पेन्शन", "वृद्धावस्था पेंशन", "fraud call", "फसवणूक कॉल",
      "otp fraud aaji", "मुलं सांभाळत नाहीत", "बच्चे देखभाल नहीं करते", "budhapa",
    ],
    understand: {
      mr: "वय वाढलं तरी सन्मानाने, सुरक्षित आणि आनंदाने जगणं हा प्रत्येक आजीचा हक्क आहे.",
      en: "Living with dignity, safety and joy is every elder woman's right, whatever her age.",
      hi: "सम्मान, सुरक्षा और ख़ुशी से जीना हर बुज़ुर्ग महिला का हक़ है।",
    },
    answer: [
      {
        mr: "दरवर्षी BP, sugar, डोळे, हाडं तपासा; औषधांची यादी जवळ ठेवा.",
        en: "Check BP, sugar, eyes and bones yearly; keep a list of your medicines handy.",
        hi: "हर साल BP, शुगर, आँख, हड्डी जाँचें; दवाओं की सूची पास रखें।",
      },
      {
        mr: "बँक/KYC/पेन्शनच्या नावाने आलेल्या कॉलवर OTP, PIN कधीच सांगू नका.",
        en: "Never share OTP or PIN on calls claiming to be bank, KYC or pension.",
        hi: "बैंक/KYC/पेंशन के नाम पर आए कॉल पर कभी OTP या PIN न बताएँ।",
      },
      {
        mr: "फसवणूक झाली तर लगेच 1930 वर कॉल करा — लवकर केल्यास पैसे वाचू शकतात.",
        en: "If cheated, call 1930 immediately — acting fast can save your money.",
        hi: "धोखा हो तो तुरंत 1930 पर कॉल करें — जल्दी करने से पैसे बच सकते हैं।",
      },
      {
        mr: "मुलांनी सांभाळलं नाही तर ज्येष्ठ नागरिक कायद्यानुसार पोटगी मागता येते — 15100 वर मोफत सल्ला.",
        en: "If children neglect you, the Senior Citizens Act allows you to claim maintenance — free advice on 15100.",
        hi: "बच्चे देखभाल न करें तो वरिष्ठ नागरिक क़ानून से भरण-पोषण माँग सकती हैं — 15100 पर मुफ़्त सलाह।",
      },
      {
        mr: "वृद्धापकाळ पेन्शन व इतर योजनांसाठी तहसील किंवा ग्रामपंचायतीत विचारा.",
        en: "Ask at the tehsil or gram panchayat about old-age pension and other schemes.",
        hi: "वृद्धावस्था पेंशन और योजनाओं के लिए तहसील या ग्राम पंचायत में पूछें।",
      },
    ],
    next: {
      mr: "तुम्हाला आरोग्य, पैसा की सोबत — कशाबद्दल आधी मदत हवी?",
      en: "What would help most first — health, money, or company?",
      hi: "पहले किसमें मदद चाहिए — सेहत, पैसा, या साथ?",
    },
    actions: [A_CYBER, A_LEGAL, A_SCHEMES],
    ages: ADULT,
  },
  {
    id: "screen_time",
    intent: "learn",
    title: { mr: "मुलांचा स्क्रीन टाइम व अभ्यास", en: "Kids' screen time & homework", hi: "बच्चों का स्क्रीन टाइम" },
    keywords: [
      "screen time", "मोबाईल जास्त", "मूल सारखं मोबाईल बघतं", "बच्चा मोबाइल देखता है", "baccha mobile",
      "mul mobile sodat nahi", "homework", "अभ्यास करत नाही", "पढ़ाई नहीं करता", "padhai nahi karta",
      "tv jast", "गेम्स", "games addiction", "routine",
    ],
    understand: {
      mr: "मुलं फोनला चिकटलेली दिसली की चिडचिड होते, हे अगदी सगळ्या घरांत होतं. रागावण्यापेक्षा ठरलेलं वेळापत्रक जास्त काम करतं.",
      en: "Kids glued to phones frustrates every home. A set routine works better than scolding.",
      hi: "बच्चे फ़ोन से चिपके रहें तो झुंझलाहट होती है, हर घर में ऐसा है। डाँटने से बेहतर तय दिनचर्या काम करती है।",
    },
    answer: [
      {
        mr: "शाळेतून आल्यावर: खाणं, खेळ, मग अभ्यास, नंतरच फोन — रोज एकच क्रम.",
        en: "After school: snack, play, homework, then phone — the same order every day.",
        hi: "स्कूल के बाद: नाश्ता, खेल, पढ़ाई, फिर फ़ोन — रोज़ एक ही क्रम।",
      },
      {
        mr: "फोनसाठी ठराविक वेळ ठरवा आणि जेवताना, झोपण्याआधी 1 तास फोन बंद.",
        en: "Set a fixed phone time; no phones at meals or 1 hour before bed.",
        hi: "फ़ोन का तय समय रखें; खाने के समय और सोने से 1 घंटा पहले फ़ोन नहीं।",
      },
      {
        mr: "आपणही तसंच वागा — मुलं आपल्याला बघून शिकतात.",
        en: "Model it yourself — children copy what they see.",
        hi: "ख़ुद भी वैसा करें — बच्चे देखकर सीखते हैं।",
      },
      {
        mr: "फोनवर काय बघतात ते एकत्र बघा; वयानुसार सेटिंग्ज लावा.",
        en: "Watch what they watch together sometimes; set age-appropriate controls.",
        hi: "कभी-कभी साथ बैठकर देखें वे क्या देखते हैं; उम्र के अनुसार सेटिंग लगाएँ।",
      },
    ],
    next: {
      mr: "आज संध्याकाळी मुलांसोबत बसून घरचं वेळापत्रक ठरवाल का?",
      en: "Could you sit with your children this evening and make a simple routine together?",
      hi: "क्या आज शाम बच्चों के साथ बैठकर एक सरल दिनचर्या बनाएँगी?",
    },
    actions: [A_EVERYDAY],
    ages: ADULT,
  },
];
