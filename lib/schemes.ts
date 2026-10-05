// Government schemes for women in Shrivardhan (Raigad, Maharashtra).
// Ported from the AADHI TI prototype's scheme registry (const SCHEMES, NEEDS and evalSchemes).
// Facts as stated in that registry, checked 29-09-2026. Do not add amounts, rules or URLs
// that are not in the registry; if a field was missing there, it is left out here.
import type { L } from "./kb/types";

/** Same text in Marathi, English and Hindi, as a list. */
export type LList = { mr: string[]; en: string[]; hi: string[] };

/**
 * official = checked and published in the registry.
 * general  = general guidance (no scheme in the registry uses it today).
 * recheck  = the registry flagged it "Review" or "Due": facts need re-checking.
 */
export type SchemeStatus = "official" | "general" | "recheck";

/** The eight needs in the "What help can I get?" picker. */
export type NeedId = "pregnant" | "child" | "nutrition" | "money" | "daughter" | "earning" | "single_woman" | "health";
/** Need tags a scheme can carry (the picker's eight plus three the registry also uses). */
export type SchemeNeed = NeedId | "education" | "new_mother" | "elderly";

export type Need = { id: NeedId; label: L };

export type Scheme = {
  /** Anchor id on /schemes (Ladki Bahin keeps "ladki-bahin", which other pages link to). */
  id: string;
  /** Id in the prototype registry; used by the finder rules. */
  sourceId: string;
  scope: "Maharashtra" | "India";
  name: L;
  /** Department, as given in the registry (Marathi only). */
  dept: string;
  what: L;
  who: LList;
  benefit: L;
  apply: LList;
  /** Documents, as given in the registry (Marathi only). */
  docs?: string[];
  docsNote?: L;
  office: L;
  /** Official website from the registry. */
  url: string;
  statusUrl?: string;
  caution?: L;
  /** Where the registry says the facts came from. */
  source: string;
  status: SchemeStatus;
  /** Raw review state in the registry. */
  sourceStatus: "Published" | "Review" | "Due";
  /** How often the registry re-checks it ("Due now" = overdue). */
  review: string;
  /** DD-MM-YYYY */
  lastChecked: string;
  needs: SchemeNeed[];
  /** Related chat topic in lib/kb (app link, not from the registry). */
  topic?: string;
};

export const SCHEMES_CHECKED = "29-09-2026";

export const NEEDS: Need[] = [
  {
    id: "pregnant",
    label: { mr: "मी गरोदर आहे", en: "I am pregnant", hi: "मैं गर्भवती हूँ" },
  },
  {
    id: "child",
    label: { mr: "माझं लहान मूल आहे", en: "I have a small child", hi: "मेरा छोटा बच्चा है" },
  },
  {
    id: "nutrition",
    label: { mr: "पोषणासाठी मदत हवी", en: "I need nutrition support", hi: "पोषण के लिए मदद चाहिए" },
  },
  {
    id: "money",
    label: { mr: "पैशांची मदत हवी", en: "I need money support", hi: "पैसों की मदद चाहिए" },
  },
  {
    id: "daughter",
    label: { mr: "मला मुलगी आहे", en: "I have a daughter", hi: "मेरी बेटी है" },
  },
  {
    id: "earning",
    label: { mr: "कमाई सुरू करायची", en: "I want to start earning", hi: "कमाई शुरू करनी है" },
  },
  {
    id: "single_woman",
    label: { mr: "मी एकल महिला आहे", en: "I am a single woman", hi: "मैं एकल महिला हूँ" },
  },
  {
    id: "health",
    label: { mr: "आरोग्य सेवा हवी", en: "I need health services", hi: "स्वास्थ्य सेवा चाहिए" },
  },
];

export const SCHEMES: Scheme[] = [
  {
    id: "ladki-bahin",
    sourceId: "ladki",
    scope: "Maharashtra",
    name: { mr: "मुख्यमंत्री माझी लाडकी बहीण योजना", en: "Mukhyamantri Majhi Ladki Bahin Yojana", hi: "मुख्यमंत्री माझी लाडकी बहीण योजना" },
    dept: "महिला व बाल विकास विभाग, महाराष्ट्र",
    what: { mr: "महिलांना दरमहा थेट खात्यात पैसे मिळतात.", en: "Monthly cash transfer to women.", hi: "महिलाओं को हर महीने सीधे बैंक खाते में पैसे मिलते हैं।" },
    who: {
      mr: [
        "महाराष्ट्रातील रहिवासी महिला, वय 21-65",
        "कुटुंबाचं वार्षिक उत्पन्न ₹2.5 लाखांपर्यंत",
        "विवाहित, विधवा, घटस्फोटित, परित्यक्ता, निराधार किंवा कुटुंबातील एक अविवाहित महिला",
        "आधार-लिंक बँक खातं",
      ],
      en: [
        "Maharashtra resident woman aged 21-65",
        "Family income up to ₹2.5 lakh a year",
        "Married, widowed, divorced, abandoned, destitute, or one unmarried woman per family",
        "Aadhaar-linked bank account",
      ],
      hi: [
        "महाराष्ट्र की निवासी महिला, उम्र 21-65",
        "परिवार की सालाना आमदनी ₹2.5 लाख तक",
        "विवाहित, विधवा, तलाक़शुदा, परित्यक्ता, निराधार या परिवार की एक अविवाहित महिला",
        "आधार से जुड़ा बैंक खाता",
      ],
    },
    benefit: { mr: "दरमहा ₹1,500 (₹2,100 वाढ अजून लागू नाही)", en: "₹1,500 a month (the ₹2,100 increase has not started)", hi: "हर महीने ₹1,500 (₹2,100 की बढ़ोतरी अभी लागू नहीं हुई)" },
    apply: {
      mr: [
        "अंगणवाडी सेविका, आशा, सेतू/आपले सरकार केंद्र मोफत अर्ज भरून देतात",
        "ऑनलाइन: ladakibahin.maharashtra.gov.in",
        "दरवर्षी आधार e-KYC पूर्ण करा, नाहीतर हप्ता थांबतो",
      ],
      en: [
        "Anganwadi sevika, ASHA or Setu centre fills the form free",
        "Online: ladakibahin.maharashtra.gov.in",
        "Complete Aadhaar e-KYC every year or payments stop",
      ],
      hi: [
        "आंगनवाड़ी सेविका, आशा, सेतु/आपले सरकार केंद्र मुफ़्त में फ़ॉर्म भर देते हैं",
        "ऑनलाइन: ladakibahin.maharashtra.gov.in",
        "हर साल आधार e-KYC पूरा करें, नहीं तो किस्त रुक जाती है",
      ],
    },
    docs: [
      "आधार कार्ड व आधार-लिंक बँक खातं",
      "वडिलांचा/पतीचा आधार (e-KYC साठी)",
      "रहिवासाचा पुरावा",
      "उत्पन्नाचा पुरावा / रेशन कार्ड",
    ],
    docsNote: { mr: "अधिकृत कागदपत्र यादी पोर्टलवर तपासा.", en: "Check the official document list on the portal.", hi: "दस्तावेज़ों की आधिकारिक सूची पोर्टल पर देखें।" },
    office: { mr: "अंगणवाडी सेविका / सेतू केंद्र, श्रीवर्धन", en: "Anganwadi sevika / Setu centre, Shrivardhan", hi: "आंगनवाड़ी सेविका / सेतु केंद्र, श्रीवर्धन" },
    url: "https://ladakibahin.maharashtra.gov.in",
    statusUrl: "https://ladakibahin.maharashtra.gov.in",
    caution: { mr: "e-KYC GR 18 सप्टें 2025: दरवर्षी e-KYC बंधनकारक. जुलै 2026 पर्यंत सुमारे 92 लाख नावं e-KYC/पडताळणीमुळे वगळली.", en: "GR 18 Sep 2025: yearly e-KYC is mandatory. About 92 lakh names were removed by Jul 2026 after e-KYC/verification.", hi: "e-KYC GR 18 सितंबर 2025: हर साल e-KYC ज़रूरी है। जुलाई 2026 तक e-KYC/जाँच के बाद लगभग 92 लाख नाम हटाए गए।" },
    source: "womenchild.maharashtra.gov.in; district .gov.in scheme pages; news (Jul 2026)",
    status: "official",
    sourceStatus: "Published",
    review: "Weekly",
    lastChecked: "29-09-2026",
    needs: ["money", "single_woman"],
    topic: "ladki_bahin",
  },
  {
    id: "lekladki",
    sourceId: "lekladki",
    scope: "Maharashtra",
    name: { mr: "लेक लाडकी योजना", en: "Lek Ladki Yojana", hi: "लेक लाडकी योजना" },
    dept: "महिला व बाल विकास विभाग, महाराष्ट्र",
    what: { mr: "मुलीच्या जन्मापासून 18 वर्षांपर्यंत टप्प्याटप्प्याने आर्थिक मदत.", en: "Money in stages from a girl's birth to age 18.", hi: "बेटी के जन्म से 18 साल तक किस्तों में पैसों की मदद।" },
    who: {
      mr: [
        "1 एप्रिल 2023 किंवा नंतर जन्मलेल्या एक/दोन मुली",
        "पिवळे किंवा केशरी रेशन कार्ड",
        "कुटुंबाचं वार्षिक उत्पन्न ₹1 लाखापर्यंत",
        "महाराष्ट्रातील रहिवासी; राज्यातील बँक खातं",
      ],
      en: [
        "One or two girls born on/after 1 Apr 2023",
        "Yellow or orange ration card",
        "Family income up to ₹1 lakh",
        "Maharashtra resident, bank account in the state",
      ],
      hi: [
        "1 अप्रैल 2023 या उसके बाद जन्मी एक/दो बेटियाँ",
        "पीला या केसरी राशन कार्ड",
        "परिवार की सालाना आमदनी ₹1 लाख तक",
        "महाराष्ट्र की निवासी; राज्य में बैंक खाता",
      ],
    },
    benefit: { mr: "एकूण ₹1,01,000: जन्मानंतर ₹5,000, पहिलीत ₹6,000, सहावीत ₹7,000, अकरावीत ₹8,000 आणि 18 वर्षांनंतर ₹75,000", en: "₹1,01,000 total: birth ₹5,000, Class 1 ₹6,000, Class 6 ₹7,000, Class 11 ₹8,000 and age 18 ₹75,000", hi: "कुल ₹1,01,000: जन्म के बाद ₹5,000, पहली कक्षा में ₹6,000, छठी में ₹7,000, ग्यारहवीं में ₹8,000 और 18 साल के बाद ₹75,000" },
    apply: {
      mr: [
        "15 ऑगस्ट 2026 पासून आपले सरकार पोर्टलवर ऑनलाइन अर्ज; e-KYC (मुलगी, आई, वडील)",
        "1 एप्रिल 2023 नंतर जन्मलेल्या मुलींसाठी 15 ऑगस्ट 2027 पर्यंत अर्ज; त्यानंतर जन्मापासून 1 वर्षात",
        "अंगणवाडी सेविका मदत करतात",
      ],
      en: [
        "From 15 Aug 2026 apply online on Aaple Sarkar with e-KYC",
        "Girls born since 1 Apr 2023: apply by 15 Aug 2027; after that within one year of birth",
        "Anganwadi sevika helps",
      ],
      hi: [
        "15 अगस्त 2026 से आपले सरकार पोर्टल पर ऑनलाइन आवेदन; e-KYC (बेटी, माँ, पिता)",
        "1 अप्रैल 2023 के बाद जन्मी बेटियों के लिए 15 अगस्त 2027 तक आवेदन; उसके बाद जन्म से 1 साल के अंदर",
        "आंगनवाड़ी सेविका मदद करती हैं",
      ],
    },
    docs: [
      "मुलीचा जन्म दाखला",
      "तहसीलदारांचा उत्पन्न दाखला",
      "आधार (मुलगी, आई, वडील)",
      "बँक पासबुक",
      "पिवळे/केशरी रेशन कार्ड",
      "शाळेचा बोनाफाईड (पुढच्या हप्त्यांसाठी)",
      "कुटुंब नियोजन प्रमाणपत्र (लागू असल्यास)",
    ],
    office: { mr: "अंगणवाडी / बाल विकास प्रकल्प अधिकारी, श्रीवर्धन", en: "Anganwadi / CDPO (ICDS) Shrivardhan", hi: "आंगनवाड़ी / बाल विकास परियोजना अधिकारी, श्रीवर्धन" },
    url: "https://aaplesarkar.mahaonline.gov.in",
    source: "GR 30 Oct 2023; ZP Gadchiroli & Beed scheme pages; Prahaar (15 Aug 2026)",
    status: "recheck",
    sourceStatus: "Review",
    review: "Monthly",
    lastChecked: "29-09-2026",
    needs: ["daughter", "money", "education"],
  },
  {
    id: "pmmvy",
    sourceId: "pmmvy",
    scope: "India",
    name: { mr: "प्रधानमंत्री मातृ वंदना योजना (PMMVY)", en: "Pradhan Mantri Matru Vandana Yojana (PMMVY 2.0)", hi: "प्रधानमंत्री मातृ वंदना योजना (PMMVY)" },
    dept: "महिला व बाल विकास मंत्रालय, भारत सरकार (राज्यात WCD मार्फत)",
    what: { mr: "गरोदर व स्तनदा मातांना मजुरी बुडाल्याची भरपाई व पोषणासाठी मदत.", en: "Maternity benefit for pregnant and nursing mothers.", hi: "गर्भवती और स्तनपान कराने वाली माताओं को मज़दूरी के नुकसान की भरपाई और पोषण के लिए मदद।" },
    who: {
      mr: [
        "यापैकी एक: कुटुंबाचं उत्पन्न ₹8 लाखांपेक्षा कमी, BPL/NFSA रेशन कार्ड, SC/ST, 40% दिव्यांगत्व, e-Shram, मनरेगा जॉब कार्ड, PM-KISAN महिला शेतकरी, आयुष्मान",
        "वय 18 वर्षं 7 महिने ते 55",
        "जन्मानंतर 270 दिवसांपर्यंत नोंदणी",
      ],
      en: [
        "Any one: family income under ₹8 lakh, BPL/NFSA ration card, SC/ST, 40% disability, e-Shram, MGNREGA, PM-KISAN woman farmer, PM-JAY",
        "Age 18y7m to 55",
        "Register up to 270 days after birth",
      ],
      hi: [
        "इनमें से कोई एक: परिवार की आमदनी ₹8 लाख से कम, BPL/NFSA राशन कार्ड, SC/ST, 40% दिव्यांगता, e-Shram, मनरेगा जॉब कार्ड, PM-KISAN महिला किसान, आयुष्मान",
        "उम्र 18 साल 7 महीने से 55 साल",
        "जन्म के बाद 270 दिन तक पंजीकरण",
      ],
    },
    benefit: { mr: "पहिलं बाळ: ₹5,000 (₹3,000 + ₹2,000); दुसरं बाळ मुलगी असल्यास ₹6,000", en: "First child ₹5,000 (₹3,000 + ₹2,000); second child ₹6,000 if a girl", hi: "पहला बच्चा: ₹5,000 (₹3,000 + ₹2,000); दूसरा बच्चा बेटी हो तो ₹6,000" },
    apply: {
      mr: ["अंगणवाडी सेविका / आशा ताईकडे", "किंवा pmmvy.wcd.gov.in वर; स्थितीही तिथेच"],
      en: [
        "Through Anganwadi worker / ASHA",
        "Or on pmmvy.wcd.gov.in (check status there too)",
      ],
      hi: [
        "आंगनवाड़ी सेविका / आशा दीदी के पास",
        "या pmmvy.wcd.gov.in पर; स्थिति भी वहीं देखें",
      ],
    },
    docs: [
      "आधार",
      "आधार-लिंक बँक/पोस्ट खातं",
      "मोबाइल नंबर",
      "माता-बाल संरक्षण (MCP) कार्ड",
      "पात्रतेचा पुरावा",
      "जन्म दाखला व लसीकरण नोंद (दुसऱ्या हप्त्यासाठी)",
    ],
    office: { mr: "अंगणवाडी / आशा", en: "Anganwadi / ASHA", hi: "आंगनवाड़ी / आशा" },
    url: "https://pmmvy.wcd.gov.in",
    statusUrl: "https://pmmvy.wcd.gov.in",
    caution: { mr: "मिशन शक्ती अंतर्गत योजना 2025-26 पर्यंत मंजूर; पुढील कालावधीची खात्री करायची.", en: "Approved under Mission Shakti to FY 2025-26; continuation to be confirmed.", hi: "मिशन शक्ति के तहत योजना 2025-26 तक मंज़ूर है; आगे जारी रहने की पुष्टि बाकी है।" },
    source: "wcd.gov.in; spniwcd.wcd.gov.in FAQ",
    status: "recheck",
    sourceStatus: "Due",
    review: "Due now",
    lastChecked: "29-09-2026",
    needs: ["pregnant", "new_mother", "money", "nutrition"],
    topic: "pregnancy_checkups",
  },
  {
    id: "sukanya",
    sourceId: "sukanya",
    scope: "India",
    name: { mr: "सुकन्या समृद्धी योजना", en: "Sukanya Samriddhi Yojana", hi: "सुकन्या समृद्धि योजना" },
    dept: "वित्त मंत्रालय, भारत सरकार",
    what: { mr: "मुलीच्या शिक्षण व भविष्यासाठी बचत खातं.", en: "Savings account for a girl child.", hi: "बेटी की पढ़ाई और भविष्य के लिए बचत खाता।" },
    who: {
      mr: [
        "मुलीच्या जन्मापासून 10 वर्षांपर्यंत खातं उघडता येतं",
        "एका मुलीचं एक खातं; कुटुंबात जास्तीत जास्त दोन",
      ],
      en: [
        "Open from birth until the girl turns 10",
        "One account per girl, two per family",
      ],
      hi: [
        "बेटी के जन्म से 10 साल की उम्र तक खाता खुल सकता है",
        "एक बेटी का एक खाता; परिवार में ज़्यादा से ज़्यादा दो",
      ],
    },
    benefit: { mr: "दरवर्षी ₹250 ते ₹1,50,000 भरा, असे 15 वर्षं; 21 वर्षांनी मुदत पूर्ण; 18 वर्षांनंतर शिक्षणासाठी 50% काढता येतात", en: "Deposit ₹250 to ₹1,50,000 a year for 15 years; matures after 21 years; withdraw 50% for education after 18", hi: "हर साल ₹250 से ₹1,50,000 जमा करें, 15 साल तक; 21 साल में खाता पूरा होता है; 18 साल के बाद पढ़ाई के लिए 50% निकाल सकते हैं" },
    apply: {
      mr: ["जवळचं पोस्ट ऑफिस किंवा अधिकृत बँक"],
      en: ["Nearest post office or authorised bank"],
      hi: ["पास का पोस्ट ऑफ़िस या अधिकृत बैंक"],
    },
    docs: ["मुलीचा जन्म दाखला", "पालकांचं ओळखपत्र व पत्ता पुरावा"],
    docsNote: { mr: "बँक/पोस्ट ऑफिसकडून यादी तपासा.", en: "Confirm the list with the bank/post office.", hi: "सूची बैंक/पोस्ट ऑफ़िस से पक्की करें।" },
    office: { mr: "पोस्ट ऑफिस / बँक, श्रीवर्धन", en: "Post office / bank, Shrivardhan", hi: "पोस्ट ऑफ़िस / बैंक, श्रीवर्धन" },
    url: "https://www.indiapost.gov.in",
    caution: { mr: "व्याजदर दर तिमाहीत बदलतो. बँकेत विचारा.", en: "Interest rate changes each quarter. Ask at the bank.", hi: "ब्याज दर हर तिमाही बदलती है। बैंक में पूछें।" },
    source: "PIB; Bank of Maharashtra",
    status: "official",
    sourceStatus: "Published",
    review: "Quarterly",
    lastChecked: "29-09-2026",
    needs: ["daughter", "money", "education"],
  },
  {
    id: "sgnay",
    sourceId: "sgnay",
    scope: "Maharashtra",
    name: { mr: "संजय गांधी निराधार अनुदान योजना", en: "Sanjay Gandhi Niradhar Anudan Yojana", hi: "संजय गांधी निराधार अनुदान योजना" },
    dept: "महाराष्ट्र शासन (तहसील कार्यालय मार्फत)",
    what: { mr: "विधवा, परित्यक्ता, घटस्फोटित, निराधार व दिव्यांग व्यक्तींना दरमहा अनुदान.", en: "Monthly support for widows, abandoned, divorced, destitute and disabled people.", hi: "विधवा, परित्यक्ता, तलाक़शुदा, निराधार और दिव्यांग लोगों को हर महीने सहायता राशि।" },
    who: {
      mr: [
        "वय 65 पेक्षा कमी",
        "विधवा, घटस्फोटित, परित्यक्ता, निराधार महिला, दिव्यांग, गंभीर आजारी, अनाथ",
        "वार्षिक कौटुंबिक उत्पन्न ₹21,000 पर्यंत (दिव्यांगांसाठी ₹50,000)",
      ],
      en: [
        "Under 65",
        "Widowed, divorced, abandoned, destitute women; disabled; terminally ill; orphans",
        "Income up to ₹21,000 a year (₹50,000 for disabled)",
      ],
      hi: [
        "उम्र 65 से कम",
        "विधवा, तलाक़शुदा, परित्यक्ता, निराधार महिला, दिव्यांग, गंभीर रूप से बीमार, अनाथ",
        "परिवार की सालाना आमदनी ₹21,000 तक (दिव्यांगों के लिए ₹50,000)",
      ],
    },
    benefit: { mr: "दरमहा ₹1,500; दिव्यांग लाभार्थ्यांना ऑक्टोबर 2025 पासून ₹2,500", en: "₹1,500 a month; ₹2,500 for people with disabilities from Oct 2025", hi: "हर महीने ₹1,500; दिव्यांग लाभार्थियों को अक्टूबर 2025 से ₹2,500" },
    apply: {
      mr: ["तहसील कार्यालय, श्रीवर्धन (संजय गांधी योजना शाखा)"],
      en: ["Tahsil office, Shrivardhan (Sanjay Gandhi Yojana section)"],
      hi: ["तहसील कार्यालय, श्रीवर्धन (संजय गांधी योजना शाखा)"],
    },
    docs: [
      "रहिवासी दाखला",
      "वयाचा पुरावा",
      "रेशन कार्ड",
      "आधार",
      "उत्पन्न दाखला",
      "दिव्यांग प्रमाणपत्र (लागू असल्यास)",
      "फोटो",
    ],
    office: { mr: "तहसील कार्यालय, श्रीवर्धन", en: "Tahsil office, Shrivardhan", hi: "तहसील कार्यालय, श्रीवर्धन" },
    url: "https://thane.nic.in/en/sanjay-ghandhi-niradhar-yojana/",
    source: "Mahasamvad (DGIPR); Thane district portal",
    status: "official",
    sourceStatus: "Published",
    review: "Quarterly",
    lastChecked: "29-09-2026",
    needs: ["money", "single_woman"],
  },
  {
    id: "shravanbal",
    sourceId: "shravanbal",
    scope: "Maharashtra",
    name: { mr: "श्रावणबाळ सेवा राज्य निवृत्तिवेतन योजना", en: "Shravanbal Seva Rajya Nivruttivetan Yojana", hi: "श्रावणबाळ सेवा राज्य निवृत्तिवेतन योजना" },
    dept: "महाराष्ट्र शासन (तहसील कार्यालय मार्फत)",
    what: { mr: "65 वर्षांवरील गरजू ज्येष्ठांना दरमहा पेन्शन.", en: "Monthly pension for needy people aged 65+.", hi: "65 साल या उससे ज़्यादा उम्र के ज़रूरतमंद बुज़ुर्गों को हर महीने पेंशन।" },
    who: {
      mr: ["वय 65 किंवा अधिक", "वार्षिक उत्पन्न ₹21,000 पेक्षा कमी"],
      en: ["Age 65+", "Income below ₹21,000 a year"],
      hi: ["उम्र 65 या उससे ज़्यादा", "सालाना आमदनी ₹21,000 से कम"],
    },
    benefit: { mr: "दरमहा ₹1,500 (दिव्यांग ₹2,500, ऑक्टोबर 2025 पासून)", en: "₹1,500 a month (₹2,500 for disabled from Oct 2025)", hi: "हर महीने ₹1,500 (दिव्यांग ₹2,500, अक्टूबर 2025 से)" },
    apply: {
      mr: ["तहसील कार्यालय, संजय गांधी योजना शाखा"],
      en: ["Tahsil office, Sanjay Gandhi Yojana section"],
      hi: ["तहसील कार्यालय, संजय गांधी योजना शाखा"],
    },
    docs: ["वयाचा पुरावा", "रहिवासी दाखला", "उत्पन्न दाखला", "आधार", "रेशन कार्ड"],
    office: { mr: "तहसील कार्यालय, श्रीवर्धन", en: "Tahsil office, Shrivardhan", hi: "तहसील कार्यालय, श्रीवर्धन" },
    url: "https://thane.nic.in/en/sanjay-ghandhi-niradhar-yojana/",
    source: "Mahasamvad (DGIPR)",
    status: "official",
    sourceStatus: "Published",
    review: "Quarterly",
    lastChecked: "29-09-2026",
    needs: ["money", "elderly"],
  },
  {
    id: "mavim",
    sourceId: "mavim",
    scope: "Maharashtra",
    name: { mr: "माविम बचत गट (MAVIM)", en: "MAVIM self-help groups", hi: "माविम स्वयं सहायता समूह (MAVIM)" },
    dept: "महिला आर्थिक विकास महामंडळ (WCD)",
    what: { mr: "बचत गटांतून बचत, कर्ज, प्रशिक्षण, व्यवसाय व विक्रीसाठी मदत.", en: "Savings, loans, training, livelihoods and market access through SHGs.", hi: "स्वयं सहायता समूहों के ज़रिए बचत, कर्ज़, प्रशिक्षण, रोज़गार और बिक्री में मदद।" },
    who: {
      mr: ["18 वर्षांवरील महिला"],
      en: ["Women over 18"],
      hi: ["18 साल से ज़्यादा उम्र की महिलाएँ"],
    },
    benefit: { mr: "गट बचत, बँक कर्ज जोडणी, प्रशिक्षण, प्रदर्शनांत विक्री; लोकसंचालित साधन केंद्र (CMRC) मार्गदर्शन करतं", en: "Group savings, bank linkage, training, exhibitions; CMRCs guide groups", hi: "समूह बचत, बैंक कर्ज़ से जोड़ना, प्रशिक्षण, प्रदर्शनियों में बिक्री; लोकसंचालित साधन केंद्र (CMRC) मार्गदर्शन करता है" },
    apply: {
      mr: [
        "जवळच्या गटात सामील व्हा किंवा नवा गट सुरू करा (CMRC किंवा माविम जिल्हा कार्यालय)",
      ],
      en: ["Join or form a group through the CMRC or MAVIM district office"],
      hi: [
        "पास के समूह में जुड़ें या नया समूह शुरू करें (CMRC या माविम ज़िला कार्यालय)",
      ],
    },
    docs: ["आधार", "फोटो", "बँक खातं"],
    office: { mr: "माविम जिल्हा कार्यालय, रायगड (पनवेल)", en: "MAVIM district office, Raigad (Panvel)", hi: "माविम ज़िला कार्यालय, रायगड (पनवेल)" },
    url: "https://mavimindia.org",
    source: "mavimindia.org; WCD Maharashtra",
    status: "official",
    sourceStatus: "Published",
    review: "Quarterly",
    lastChecked: "29-09-2026",
    needs: ["earning", "money"],
    topic: "join_shg",
  },
  {
    id: "umed",
    sourceId: "umed",
    scope: "Maharashtra",
    name: { mr: "उमेद (महाराष्ट्र राज्य ग्रामीण जीवनोन्नती अभियान)", en: "UMED (Maharashtra State Rural Livelihoods Mission)", hi: "उमेद (महाराष्ट्र राज्य ग्रामीण जीवनोन्नती अभियान)" },
    dept: "ग्राम विकास विभाग, महाराष्ट्र",
    what: { mr: "ग्रामीण बचत गटांना निधी, कर्ज, प्रशिक्षण; लखपती दीदी उपक्रम.", en: "Funds, loans and training for rural SHGs; Lakhpati Didi.", hi: "ग्रामीण स्वयं सहायता समूहों को निधि, कर्ज़, प्रशिक्षण; लखपति दीदी पहल।" },
    who: {
      mr: ["बचत गटात असलेल्या ग्रामीण महिला"],
      en: ["Rural women who are SHG members"],
      hi: ["स्वयं सहायता समूह की सदस्य ग्रामीण महिलाएँ"],
    },
    benefit: { mr: "3 महिन्यांनंतर गटाला ₹30,000 फिरता निधी; 6 महिन्यांनंतर ₹60,000 समुदाय गुंतवणूक निधी; बँक कर्ज टप्प्याटप्प्याने", en: "₹30,000 revolving fund after 3 months; ₹60,000 community investment fund after 6 months; staged bank loans", hi: "3 महीने बाद समूह को ₹30,000 रिवॉल्विंग फ़ंड; 6 महीने बाद ₹60,000 सामुदायिक निवेश निधि; बैंक कर्ज़ चरणों में" },
    apply: {
      mr: ["पंचायत समिती / उमेद तालुका कक्ष"],
      en: ["Panchayat Samiti / UMED block unit"],
      hi: ["पंचायत समिति / उमेद तालुका कक्ष"],
    },
    docs: ["आधार", "बँक खातं"],
    office: { mr: "पंचायत समिती, श्रीवर्धन", en: "Panchayat Samiti, Shrivardhan", hi: "पंचायत समिति, श्रीवर्धन" },
    url: "https://umed.in",
    source: "umed.in; PIB (Lakhpati Didi, Sep 2026)",
    status: "official",
    sourceStatus: "Published",
    review: "Quarterly",
    lastChecked: "29-09-2026",
    needs: ["earning", "money"],
    topic: "join_shg",
  },
  {
    id: "mudra",
    sourceId: "mudra",
    scope: "India",
    name: { mr: "प्रधानमंत्री मुद्रा योजना", en: "PM Mudra Yojana", hi: "प्रधानमंत्री मुद्रा योजना" },
    dept: "वित्त मंत्रालय, भारत सरकार",
    what: { mr: "लहान व्यवसायांसाठी विनातारण कर्ज.", en: "Loans for micro enterprises.", hi: "छोटे व्यवसायों के लिए बिना गिरवी के कर्ज़।" },
    who: {
      mr: ["उत्पन्न देणारा लहान व्यवसाय: उत्पादन, व्यापार, सेवा किंवा शेतीपूरक"],
      en: [
        "Income-generating micro enterprise in manufacturing, trading, services or agri-allied",
      ],
      hi: [
        "आमदनी देने वाला छोटा व्यवसाय: उत्पादन, व्यापार, सेवा या खेती से जुड़ा काम",
      ],
    },
    benefit: { mr: "शिशु ₹50,000 पर्यंत; किशोर ₹50,000 ते 5 लाख; तरुण ₹5 ते 10 लाख; तरुण कर्ज फेडल्यावर तरुण प्लस ₹10 ते 20 लाख", en: "Shishu up to ₹50,000; Kishore ₹50,000 to 5 lakh; Tarun ₹5-10 lakh; Tarun Plus ₹10-20 lakh (after repaying Tarun)", hi: "शिशु ₹50,000 तक; किशोर ₹50,000 से 5 लाख; तरुण ₹5 से 10 लाख; तरुण कर्ज़ चुकाने के बाद तरुण प्लस ₹10 से 20 लाख" },
    apply: {
      mr: ["कोणतीही बँक शाखा, लघु वित्त बँक; udyamimitra.in"],
      en: ["Any bank branch; udyamimitra.in"],
      hi: ["कोई भी बैंक शाखा, स्मॉल फ़ाइनेंस बैंक; udyamimitra.in"],
    },
    docs: ["आधार, पॅन", "व्यवसायाची माहिती / अंदाजपत्रक", "बँक स्टेटमेंट"],
    docsNote: { mr: "बँकेकडून यादी तपासा.", en: "Confirm with the bank.", hi: "सूची बैंक से पक्की करें।" },
    office: { mr: "जवळची बँक शाखा", en: "Nearest bank branch", hi: "पास की बैंक शाखा" },
    url: "https://www.mudra.org.in",
    source: "PIB (Oct 2024)",
    status: "official",
    sourceStatus: "Published",
    review: "Half-yearly",
    lastChecked: "29-09-2026",
    needs: ["earning", "money"],
    topic: "start_business",
  },
  {
    id: "pmegp",
    sourceId: "pmegp",
    scope: "India",
    name: { mr: "पंतप्रधान रोजगार निर्मिती कार्यक्रम (PMEGP)", en: "PMEGP", hi: "प्रधानमंत्री रोज़गार सृजन कार्यक्रम (PMEGP)" },
    dept: "MSME मंत्रालय (KVIC, जिल्हा उद्योग केंद्र)",
    what: { mr: "नवीन सूक्ष्म उद्योगासाठी बँक कर्जावर अनुदान.", en: "Subsidy on bank loans for new micro units.", hi: "नए सूक्ष्म उद्योग के लिए बैंक कर्ज़ पर सब्सिडी।" },
    who: {
      mr: [
        "वय 18+",
        "₹10 लाखांवरील उत्पादन / ₹5 लाखांवरील सेवा प्रकल्पासाठी किमान 8वी उत्तीर्ण",
        "फक्त नवीन उद्योग; कुटुंबातून एक व्यक्ती",
      ],
      en: [
        "Age 18+",
        "8th pass for manufacturing over ₹10 lakh / services over ₹5 lakh",
        "New units only; one per family",
      ],
      hi: [
        "उम्र 18+",
        "₹10 लाख से ज़्यादा के उत्पादन / ₹5 लाख से ज़्यादा के सेवा प्रोजेक्ट के लिए कम से कम 8वीं पास",
        "सिर्फ़ नए उद्योग; परिवार से एक व्यक्ति",
      ],
    },
    benefit: { mr: "महिलांसाठी (विशेष श्रेणी): ग्रामीण 35%, शहरी 25% अनुदान; स्वतःचा वाटा 5%. प्रकल्प मर्यादा: उत्पादन ₹50 लाख, सेवा ₹20 लाख", en: "Women (special category): 35% rural, 25% urban subsidy; own share 5%. Max project ₹50 lakh manufacturing, ₹20 lakh service", hi: "महिलाओं के लिए (विशेष श्रेणी): ग्रामीण 35%, शहरी 25% सब्सिडी; अपना हिस्सा 5%। प्रोजेक्ट की सीमा: उत्पादन ₹50 लाख, सेवा ₹20 लाख" },
    apply: {
      mr: [
        "ऑनलाइन: kviconline.gov.in/pmegpeportal",
        "जिल्हा उद्योग केंद्र मुलाखत, बँक मंजुरी, प्रशिक्षण",
      ],
      en: [
        "Online: kviconline.gov.in/pmegpeportal",
        "DIC interview, bank sanction, training",
      ],
      hi: [
        "ऑनलाइन: kviconline.gov.in/pmegpeportal",
        "ज़िला उद्योग केंद्र में इंटरव्यू, बैंक मंज़ूरी, प्रशिक्षण",
      ],
    },
    docs: ["आधार, पॅन", "प्रकल्प अहवाल", "शैक्षणिक दाखला", "बँक खातं"],
    office: { mr: "जिल्हा उद्योग केंद्र, रायगड", en: "District Industries Centre, Raigad", hi: "ज़िला उद्योग केंद्र, रायगड" },
    url: "https://www.kviconline.gov.in/pmegpeportal/",
    statusUrl: "https://www.kviconline.gov.in/pmegpeportal/",
    caution: { mr: "योजना 2025-26 पर्यंत मंजूर; पुढील कालावधी निश्चित करायचा.", en: "Approved to FY 2025-26; continuation to be confirmed.", hi: "योजना 2025-26 तक मंज़ूर है; आगे की अवधि तय होना बाकी है।" },
    source: "PIB; KVIC FAQ",
    status: "recheck",
    sourceStatus: "Due",
    review: "Due now",
    lastChecked: "29-09-2026",
    needs: ["earning", "money"],
  },
  {
    id: "standup",
    sourceId: "standup",
    scope: "India",
    name: { mr: "स्टँड-अप इंडिया", en: "Stand-Up India", hi: "स्टैंड-अप इंडिया" },
    dept: "वित्त मंत्रालय (सर्व व्यावसायिक बँका)",
    what: { mr: "महिला व SC/ST उद्योजिकांच्या पहिल्या उद्योगासाठी मोठं कर्ज.", en: "Loans for first ventures by women and SC/ST entrepreneurs.", hi: "महिला और SC/ST उद्यमियों के पहले उद्योग के लिए बड़ा कर्ज़।" },
    who: {
      mr: [
        "महिला उद्योजिका, वय 18+",
        "नवीन (पहिला) उद्योग: उत्पादन, सेवा, व्यापार, शेतीपूरक",
        "कंपनी/फर्मसाठी किमान 51% भागीदारी महिलांची",
        "कोणत्याही बँकेची थकबाकी नाही; प्रकल्पखर्चाच्या किमान 10% स्वतःचा वाटा",
      ],
      en: [
        "Woman entrepreneur 18+",
        "First-time venture",
        "51% women ownership for firms",
        "No bank default; at least 10% own contribution",
      ],
      hi: [
        "महिला उद्यमी, उम्र 18+",
        "नया (पहला) उद्योग: उत्पादन, सेवा, व्यापार, खेती से जुड़ा काम",
        "कंपनी/फ़र्म में कम से कम 51% हिस्सेदारी महिलाओं की",
        "किसी बैंक का बकाया नहीं; प्रोजेक्ट लागत का कम से कम 10% अपना हिस्सा",
      ],
    },
    benefit: { mr: "₹10 लाख ते ₹1 कोटी कर्ज; 7 वर्षं परतफेड, 18 महिन्यांपर्यंत सवलत", en: "₹10 lakh to ₹1 crore; 7-year loan, up to 18-month moratorium", hi: "₹10 लाख से ₹1 करोड़ तक कर्ज़; 7 साल में चुकाना, 18 महीने तक की मोहलत" },
    apply: {
      mr: ["standupmitra.in किंवा बँक शाखा"],
      en: ["standupmitra.in or a bank branch"],
      hi: ["standupmitra.in या बैंक शाखा"],
    },
    docs: ["आधार, पॅन", "प्रकल्प अहवाल", "बँक स्टेटमेंट"],
    office: { mr: "जवळची बँक शाखा", en: "Nearest bank branch", hi: "पास की बैंक शाखा" },
    url: "https://www.standupmitra.in",
    source: "PIB (22 Jul 2025)",
    status: "official",
    sourceStatus: "Published",
    review: "Half-yearly",
    lastChecked: "29-09-2026",
    needs: ["earning", "money"],
  },
  {
    id: "vishwakarma",
    sourceId: "vishwakarma",
    scope: "India",
    name: { mr: "पीएम विश्वकर्मा", en: "PM Vishwakarma", hi: "पीएम विश्वकर्मा" },
    dept: "MSME मंत्रालय",
    what: { mr: "शिंप्यांसह 18 पारंपरिक व्यवसायांतील कारागिरांसाठी.", en: "For artisans in 18 trades, including tailors.", hi: "दर्ज़ी समेत 18 पारंपरिक पेशों के कारीगरों के लिए।" },
    who: {
      mr: [
        "वय 18+; 18 पैकी एका व्यवसायात हाताने काम (उदा. शिंपी)",
        "कुटुंबातून एक व्यक्ती; कुटुंबात सरकारी नोकरी नाही",
      ],
      en: [
        "Age 18+, working in one of 18 trades",
        "One per family; no government employee in family",
      ],
      hi: [
        "उम्र 18+; 18 में से किसी एक पेशे में हाथ का काम (जैसे दर्ज़ी)",
        "परिवार से एक व्यक्ति; परिवार में सरकारी नौकरी नहीं",
      ],
    },
    benefit: { mr: "प्रमाणपत्र व ओळखपत्र; प्रशिक्षण (₹500/दिवस मानधन); ₹15,000 पर्यंत टूलकिट ई-व्हाउचर; ₹1 लाख नंतर ₹2 लाख कर्ज 5% व्याजाने", en: "Certificate & ID; training with ₹500/day stipend; toolkit e-voucher up to ₹15,000; loans ₹1 lakh then ₹2 lakh at 5%", hi: "प्रमाणपत्र और पहचान पत्र; प्रशिक्षण (₹500/दिन मानदेय); ₹15,000 तक टूलकिट ई-वाउचर; ₹1 लाख, फिर ₹2 लाख का कर्ज़ 5% ब्याज पर" },
    apply: {
      mr: ["कॉमन सर्व्हिस सेंटरवर (CSC) आधार बायोमेट्रिकने नोंदणी"],
      en: ["Register at a CSC with Aadhaar biometrics"],
      hi: ["कॉमन सर्विस सेंटर (CSC) पर आधार बायोमेट्रिक से पंजीकरण"],
    },
    docs: ["आधार", "बँक खातं", "मोबाइल"],
    office: { mr: "CSC / आपले सरकार केंद्र", en: "CSC / Aaple Sarkar centre", hi: "CSC / आपले सरकार केंद्र" },
    url: "https://pmvishwakarma.gov.in",
    caution: { mr: "सप्टें 2026 मध्ये 30 लाख नोंदणीचं लक्ष्य पूर्ण. नवी नोंदणी सुरू आहे का ते तपासा.", en: "The 30-lakh registration target was reached in Sep 2026. Check if registrations are open.", hi: "सितंबर 2026 में 30 लाख पंजीकरण का लक्ष्य पूरा हुआ। नया पंजीकरण चालू है या नहीं, यह जाँच लें।" },
    source: "PIB",
    status: "recheck",
    sourceStatus: "Review",
    review: "Due now",
    lastChecked: "29-09-2026",
    needs: ["earning", "money"],
  },
  {
    id: "pmfme",
    sourceId: "pmfme",
    scope: "India",
    name: { mr: "पीएम सूक्ष्म अन्न प्रक्रिया उद्योग (PMFME)", en: "PMFME", hi: "पीएम सूक्ष्म खाद्य उद्योग उन्नयन योजना (PMFME)" },
    dept: "अन्न प्रक्रिया उद्योग मंत्रालय",
    what: { mr: "लहान अन्न प्रक्रिया उद्योग व बचत गटांसाठी.", en: "For micro food processing units and SHGs.", hi: "छोटे खाद्य प्रसंस्करण उद्योगों और स्वयं सहायता समूहों के लिए।" },
    who: {
      mr: [
        "बचत गट सदस्य (ग्रामीण भागात उमेद मार्फत) किंवा सूक्ष्म अन्न प्रक्रिया उद्योग",
      ],
      en: ["SHG members (via UMED in rural areas) or micro food units"],
      hi: [
        "स्वयं सहायता समूह की सदस्य (ग्रामीण इलाके में उमेद के ज़रिए) या सूक्ष्म खाद्य प्रसंस्करण उद्योग",
      ],
    },
    benefit: { mr: "बचत गट सदस्याला ₹40,000 पर्यंत बीज भांडवल; वैयक्तिक उद्योगाला कर्जासोबत 35% अनुदान (कमाल ₹10 लाख)", en: "Seed capital up to ₹40,000 per SHG member; 35% credit-linked subsidy up to ₹10 lakh", hi: "स्वयं सहायता समूह की सदस्य को ₹40,000 तक बीज पूँजी; व्यक्तिगत उद्योग को कर्ज़ के साथ 35% सब्सिडी (अधिकतम ₹10 लाख)" },
    apply: {
      mr: ["pmfme.mofpi.gov.in"],
      en: ["pmfme.mofpi.gov.in"],
      hi: ["pmfme.mofpi.gov.in"],
    },
    docs: ["आधार", "बँक खातं", "प्रकल्प माहिती"],
    office: { mr: "उमेद / जिल्हा संसाधन व्यक्ती", en: "UMED / district resource person", hi: "उमेद / ज़िला संसाधन व्यक्ति" },
    url: "https://pmfme.mofpi.gov.in",
    caution: { mr: "योजना 30 सप्टें 2026 पर्यंत तात्पुरत्या मुदतवाढीवर. पुढची मंजुरी बाकी.", en: "Temporary extension until 30 Sep 2026. Further approval pending.", hi: "योजना 30 सितंबर 2026 तक अस्थायी रूप से बढ़ाई गई है। आगे की मंज़ूरी बाकी है।" },
    source: "PIB; Business Standard (24 Aug 2026)",
    status: "recheck",
    sourceStatus: "Due",
    review: "Due now",
    lastChecked: "29-09-2026",
    needs: ["earning", "money"],
  },
  {
    id: "aai",
    sourceId: "aai",
    scope: "Maharashtra",
    name: { mr: "\"आई\" महिला केंद्रित पर्यटन धोरण", en: "\"Aai\" women-centric tourism policy", hi: "\"आई\" महिला केंद्रित पर्यटन नीति" },
    dept: "पर्यटन संचालनालय, महाराष्ट्र",
    what: { mr: "महिलांच्या मालकीच्या पर्यटन व्यवसायांना कर्जावर व्याज परतावा.", en: "Interest refund for women-owned tourism businesses.", hi: "महिलाओं के स्वामित्व वाले पर्यटन व्यवसायों को कर्ज़ पर ब्याज की वापसी।" },
    who: {
      mr: [
        "महाराष्ट्रातील महिला; व्यवसाय महिलांच्या मालकीचा व चालवलेला",
        "होमस्टे, कृषी पर्यटन, उपाहारगृह, टूर, गाइड, इ.",
      ],
      en: [
        "Maharashtra woman; business owned and run by women",
        "Homestay, agri-tourism, restaurant, tours, guides, etc.",
      ],
      hi: [
        "महाराष्ट्र की महिला; व्यवसाय महिलाओं के स्वामित्व में और उन्हीं के द्वारा चलाया गया",
        "होमस्टे, कृषि पर्यटन, रेस्टोरेंट, टूर, गाइड, आदि",
      ],
    },
    benefit: { mr: "₹15 लाखांपर्यंतच्या कर्जावरील व्याज परत (12% पर्यंत, एकूण ₹4.5 लाखांपर्यंत, 7 वर्षांपर्यंत)", en: "Interest on loans up to ₹15 lakh refunded (up to 12%, max ₹4.5 lakh, up to 7 years)", hi: "₹15 लाख तक के कर्ज़ पर ब्याज वापस (12% तक, कुल ₹4.5 लाख तक, 7 साल तक)" },
    apply: {
      mr: [
        "कोकणसाठी: उप-संचालक (पर्यटन), विभागीय कार्यालय, नवी मुंबई",
        "इरादापत्र मिळाल्यावर बँक कर्ज",
      ],
      en: [
        "For Konkan: Deputy Director (Tourism) regional office, Navi Mumbai",
        "Letter of intent, then bank loan",
      ],
      hi: [
        "कोंकण के लिए: उप-निदेशक (पर्यटन), क्षेत्रीय कार्यालय, नवी मुंबई",
        "आशय पत्र (letter of intent) मिलने के बाद बैंक कर्ज़",
      ],
    },
    docs: [
      "ओळखपत्र",
      "व्यवसाय नोंदणी",
      "₹100 स्टॅम्प पेपरवर प्रतिज्ञापत्र",
      "पॅन",
      "अन्न व्यवसायासाठी FDA परवाना",
      "500 शब्दांचा प्रकल्प आराखडा",
      "₹50 शुल्क (gras.mahakosh.gov.in)",
    ],
    office: { mr: "पर्यटन संचालनालय, नवी मुंबई विभाग", en: "Directorate of Tourism, Navi Mumbai region", hi: "पर्यटन संचालनालय, नवी मुंबई क्षेत्र" },
    url: "https://maharashtratourism.gov.in",
    source: "Maharashtra Tourism AAI guidelines (Nov 2024); FPJ (Mar 2026)",
    status: "official",
    sourceStatus: "Published",
    review: "Half-yearly",
    lastChecked: "29-09-2026",
    needs: ["earning", "money"],
    topic: "homestay",
  },
  {
    id: "freeedu",
    sourceId: "freeedu",
    scope: "Maharashtra",
    name: { mr: "मुलींना व्यावसायिक उच्च शिक्षण शुल्क 100% परतावा", en: "Free professional education for girls (fee reimbursement)", hi: "लड़कियों को प्रोफ़ेशनल उच्च शिक्षा की फ़ीस 100% वापस" },
    dept: "उच्च व तंत्र शिक्षण विभाग, महाराष्ट्र",
    what: { mr: "व्यावसायिक अभ्यासक्रमांचं शिक्षण व परीक्षा शुल्क 100% परत.", en: "100% tuition and exam fee reimbursement for professional courses.", hi: "प्रोफ़ेशनल कोर्स की ट्यूशन और परीक्षा फ़ीस 100% वापस।" },
    who: {
      mr: [
        "EWS, SEBC, OBC प्रवर्गातील मुली; अनाथ मुली",
        "कुटुंबाचं उत्पन्न ₹8 लाखांपर्यंत",
        "केंद्रीय प्रवेश प्रक्रियेतून (CAP) प्रवेश; शासकीय/अनुदानित/कायम विनाअनुदानित संस्था",
      ],
      en: [
        "EWS/SEBC/OBC girls; orphan girls",
        "Family income up to ₹8 lakh",
        "Admission through CAP at eligible institutions",
      ],
      hi: [
        "EWS, SEBC, OBC वर्ग की लड़कियाँ; अनाथ लड़कियाँ",
        "परिवार की आमदनी ₹8 लाख तक",
        "केंद्रीय प्रवेश प्रक्रिया (CAP) से प्रवेश; सरकारी/अनुदानित/स्थायी गैर-अनुदानित संस्थान",
      ],
    },
    benefit: { mr: "शिक्षण शुल्क व परीक्षा शुल्क 100% (2024-25 पासून); अभ्यासक्रम पूर्ण होईपर्यंत", en: "100% tuition and exam fees from 2024-25, until the course ends", hi: "ट्यूशन फ़ीस और परीक्षा फ़ीस 100% (2024-25 से); कोर्स पूरा होने तक" },
    apply: {
      mr: ["mahadbt.maharashtra.gov.in; मदत: 020-29707098"],
      en: ["mahadbt.maharashtra.gov.in; helpline 020-29707098"],
      hi: ["mahadbt.maharashtra.gov.in; मदद: 020-29707098"],
    },
    docs: ["उत्पन्न दाखला", "प्रवर्ग दाखला", "CAP प्रवेश पत्र", "आधार, बँक खातं"],
    office: { mr: "कॉलेजचा शिष्यवृत्ती विभाग", en: "College scholarship desk", hi: "कॉलेज का छात्रवृत्ति विभाग" },
    url: "https://mahadbt.maharashtra.gov.in",
    source: "GR 8 Jul 2024; DHE Pune",
    status: "official",
    sourceStatus: "Published",
    review: "Yearly",
    lastChecked: "29-09-2026",
    needs: ["education", "daughter", "money"],
  },
  {
    id: "ahilya",
    sourceId: "ahilya",
    scope: "Maharashtra",
    name: { mr: "पुण्यश्लोक अहिल्यादेवी होळकर महिला स्टार्टअप योजना", en: "Punyashlok Ahilyadevi Holkar Mahila Startup Yojana", hi: "पुण्यश्लोक अहिल्यादेवी होळकर महिला स्टार्टअप योजना" },
    dept: "महाराष्ट्र राज्य नावीन्यता सोसायटी (MSInS)",
    what: { mr: "महिलांनी चालवलेल्या स्टार्टअपना अनुदान.", en: "Grants for women-led startups.", hi: "महिलाओं द्वारा चलाए जा रहे स्टार्टअप को अनुदान।" },
    who: {
      mr: [
        "DPIIT मान्यताप्राप्त, महाराष्ट्रात नोंदणीकृत स्टार्टअप",
        "किमान 51% भागीदारी महिलांची; 1 वर्षाहून जास्त काळ सुरू",
        "उलाढाल ₹10 लाख ते ₹1 कोटी",
      ],
      en: [
        "DPIIT-recognised startup registered in Maharashtra",
        "51% women shareholding; over 1 year old",
        "Revenue ₹10 lakh to ₹1 crore",
      ],
      hi: [
        "DPIIT से मान्यता प्राप्त, महाराष्ट्र में पंजीकृत स्टार्टअप",
        "कम से कम 51% हिस्सेदारी महिलाओं की; 1 साल से ज़्यादा समय से चालू",
        "टर्नओवर ₹10 लाख से ₹1 करोड़",
      ],
    },
    benefit: { mr: "₹1 लाख ते ₹25 लाख अनुदान", en: "₹1-25 lakh grant", hi: "₹1 लाख से ₹25 लाख तक अनुदान" },
    apply: {
      mr: ["msins.in वर मोफत ऑनलाइन अर्ज (अर्ज फेरीच्या तारखा तपासा)"],
      en: ["Apply free on msins.in (check call dates)"],
      hi: ["msins.in पर मुफ़्त ऑनलाइन आवेदन (आवेदन राउंड की तारीख़ें देखें)"],
    },
    docs: ["DPIIT मान्यता", "कंपनी नोंदणी", "आर्थिक विवरण"],
    office: { mr: "MSInS (ऑनलाइन)", en: "MSInS (online)", hi: "MSInS (ऑनलाइन)" },
    url: "https://msins.in",
    source: "Jalgaon district portal; MSInS flyer",
    status: "recheck",
    sourceStatus: "Review",
    review: "Due now",
    lastChecked: "29-09-2026",
    needs: ["earning", "money"],
  },
  {
    id: "pmkvy",
    sourceId: "pmkvy",
    scope: "India",
    name: { mr: "प्रधानमंत्री कौशल विकास योजना 4.0", en: "PMKVY 4.0", hi: "प्रधानमंत्री कौशल विकास योजना 4.0" },
    dept: "कौशल्य विकास व उद्योजकता मंत्रालय",
    what: { mr: "कमी दिवसांचे कोर्स व येत असलेल्या कामाचं प्रमाणपत्र.", en: "Short courses and certificates for existing skills.", hi: "कम दिनों के कोर्स और जो काम आपको पहले से आता है, उसका प्रमाणपत्र।" },
    who: {
      mr: ["वय 15-59"],
      en: ["Age 15-59"],
      hi: ["उम्र 15-59"],
    },
    benefit: { mr: "प्रमाणित प्रशिक्षण; महिलांना निवास/प्रवासासाठी मदत; 400+ नवे कोर्स", en: "Certified training; boarding/travel support for women; 400+ new courses", hi: "प्रमाणित प्रशिक्षण; महिलाओं को रहने/आने-जाने के लिए मदद; 400+ नए कोर्स" },
    apply: {
      mr: [
        "skillindiadigital.gov.in; जिल्हा कौशल्य विकास केंद्र, अलिबाग: 02141-222029",
      ],
      en: ["skillindiadigital.gov.in; District Skill Centre Alibag 02141-222029"],
      hi: [
        "skillindiadigital.gov.in; ज़िला कौशल विकास केंद्र, अलीबाग: 02141-222029",
      ],
    },
    docs: ["आधार", "शैक्षणिक दाखला"],
    office: { mr: "जिल्हा कौशल्य विकास केंद्र, रायगड", en: "District Skill Development Centre, Raigad", hi: "ज़िला कौशल विकास केंद्र, रायगड" },
    url: "https://www.skillindiadigital.gov.in",
    caution: { mr: "2025-26 पर्यंत मंजूर; पुढील टप्पा निश्चित करायचा.", en: "Approved to FY 2025-26; next phase to be confirmed.", hi: "2025-26 तक मंज़ूर है; अगला चरण तय होना बाकी है।" },
    source: "PIB (Feb 2025); NewsOnAir (Mar 2026)",
    status: "recheck",
    sourceStatus: "Due",
    review: "Due now",
    lastChecked: "29-09-2026",
    needs: ["earning", "education"],
    topic: "training_access",
  },
  {
    id: "eshram",
    sourceId: "eshram",
    scope: "India",
    name: { mr: "ई-श्रम नोंदणी", en: "e-Shram registration", hi: "ई-श्रम पंजीकरण" },
    dept: "कामगार व रोजगार मंत्रालय",
    what: { mr: "असंघटित कामगारांसाठी ओळखपत्र (UAN) व योजनांशी जोडणी.", en: "ID (UAN) for unorganised workers, linked to schemes.", hi: "असंगठित मज़दूरों के लिए पहचान पत्र (UAN) और योजनाओं से जुड़ाव।" },
    who: {
      mr: ["वय 16-59, असंघटित क्षेत्रात काम; EPFO/ESIC सदस्य नाही"],
      en: ["Age 16-59, unorganised worker, not in EPFO/ESIC"],
      hi: ["उम्र 16-59, असंगठित क्षेत्र में काम; EPFO/ESIC सदस्य नहीं"],
    },
    benefit: { mr: "कायमचं 12-अंकी UAN कार्ड; 12 केंद्रीय योजनांची माहिती मिळते", en: "Permanent 12-digit UAN; access to 12 central schemes", hi: "स्थायी 12-अंकों वाला UAN कार्ड; 12 केंद्रीय योजनाओं की जानकारी मिलती है" },
    apply: {
      mr: ["eshram.gov.in किंवा CSC; मोफत; हेल्पलाइन 14434"],
      en: ["eshram.gov.in or CSC; free; helpline 14434"],
      hi: ["eshram.gov.in या CSC; मुफ़्त; हेल्पलाइन 14434"],
    },
    docs: ["आधार", "आधार-लिंक मोबाइल", "बँक खातं"],
    office: { mr: "CSC / आपले सरकार केंद्र", en: "CSC / Aaple Sarkar centre", hi: "CSC / आपले सरकार केंद्र" },
    url: "https://eshram.gov.in",
    source: "eshram.gov.in FAQ; PIB",
    status: "official",
    sourceStatus: "Published",
    review: "Half-yearly",
    lastChecked: "29-09-2026",
    needs: ["earning"],
  },
  {
    id: "icds",
    sourceId: "icds",
    scope: "India",
    name: { mr: "अंगणवाडी सेवा (ICDS)", en: "Anganwadi Services (ICDS)", hi: "आंगनवाड़ी सेवाएँ (ICDS)" },
    dept: "महिला व बाल विकास मंत्रालय, भारत सरकार (मिशन सक्षम अंगणवाडी व पोषण 2.0; राज्यात WCD मार्फत)",
    what: { mr: "अंगणवाडीत 6 सेवा: पूरक पोषण, पूर्व-प्राथमिक शिक्षण, पोषण व आरोग्य शिक्षण, लसीकरण, आरोग्य तपासणी आणि पुढील उपचारासाठी पाठवणं. लसीकरण, तपासणी व पाठवणं आरोग्य विभागामार्फत (आशा, ANM).", en: "Six services at the Anganwadi: supplementary nutrition, pre-school, nutrition and health education, vaccination, health check-ups and referral. Vaccination, check-ups and referral come through the health department (ASHA, ANM).", hi: "आंगनवाड़ी में 6 सेवाएँ: पूरक पोषण, प्री-स्कूल शिक्षा, पोषण और सेहत की जानकारी, टीकाकरण, स्वास्थ्य जाँच और आगे इलाज के लिए भेजना। टीकाकरण, जाँच और रेफ़रल स्वास्थ्य विभाग के ज़रिए (आशा, ANM)।" },
    who: {
      mr: [
        "गरोदर महिला व स्तनदा माता",
        "6 वर्षांखालील मुलं",
        "अंगणवाडीत नाव नोंदवलेल्यांनाच पूरक पोषण मिळतं",
      ],
      en: [
        "Pregnant women and breastfeeding mothers",
        "Children under 6",
        "Only people registered at the Anganwadi get supplementary nutrition",
      ],
      hi: [
        "गर्भवती महिलाएँ और स्तनपान कराने वाली माताएँ",
        "6 साल से छोटे बच्चे",
        "पूरक पोषण सिर्फ़ उन्हें मिलता है जिनका नाम आंगनवाड़ी में दर्ज है",
      ],
    },
    benefit: { mr: "गरोदर व स्तनदा माता आणि 6 महिने ते 3 वर्षांच्या मुलांना घरी न्यायचा आहार (THR); 3 ते 6 वर्षांच्या मुलांना अंगणवाडीत गरम जेवण, सकाळचा नाश्ता व पूर्व-प्राथमिक शिक्षण; मुलांचं वजन व उंची मोजणी", en: "Take-home ration (THR) for pregnant and breastfeeding women and children 6 months to 3 years; hot meal, morning snack and pre-school at the Anganwadi for ages 3 to 6; weight and height checks for children", hi: "गर्भवती और स्तनपान कराने वाली माताओं और 6 महीने से 3 साल के बच्चों को घर ले जाने वाला राशन (THR); 3 से 6 साल के बच्चों को आंगनवाड़ी में गरम खाना, सुबह का नाश्ता और प्री-स्कूल; बच्चों का वज़न और लंबाई नापना" },
    apply: {
      mr: [
        "तुमच्या गावातल्या अंगणवाडीत नाव नोंदवा",
        "अंगणवाडी सेविका आणि आशा ताई मदत करतात",
      ],
      en: [
        "Register at your local Anganwadi",
        "The Anganwadi sevika and ASHA will help",
      ],
      hi: [
        "अपने गाँव की आंगनवाड़ी में नाम दर्ज कराएँ",
        "आंगनवाड़ी सेविका और आशा दीदी मदद करती हैं",
      ],
    },
    docs: ["माता-बाल संरक्षण (MCP) कार्ड (असल्यास)", "आधार कार्ड (असल्यास)"],
    docsNote: { mr: "कोणती कागदपत्रं लागतात ते अंगणवाडी सेविकेला विचारा.", en: "Ask the Anganwadi sevika which documents are needed.", hi: "कौन-से दस्तावेज़ चाहिए, यह आंगनवाड़ी सेविका से पूछें।" },
    office: { mr: "तुमची अंगणवाडी / बाल विकास प्रकल्प अधिकारी, श्रीवर्धन", en: "Your Anganwadi / CDPO (ICDS) Shrivardhan", hi: "आपकी आंगनवाड़ी / बाल विकास परियोजना अधिकारी, श्रीवर्धन" },
    url: "https://www.wcd.gov.in/pregnant-lactating-women-children/nutrition-mission-saksham-anganwadi-and-poshan-2-0",
    source: "wcd.gov.in: Mission Saksham Anganwadi and Poshan 2.0 page and scheme guidelines (six services, THR, hot meal, growth measurement, registration at AWC)",
    status: "official",
    sourceStatus: "Published",
    review: "Quarterly",
    lastChecked: "29-09-2026",
    needs: ["pregnant", "new_mother", "child", "nutrition", "health", "education"],
    topic: "child_nutrition",
  },
  {
    id: "jssk",
    sourceId: "jssk",
    scope: "India",
    name: { mr: "जननी शिशु सुरक्षा कार्यक्रम (JSSK)", en: "Janani Shishu Suraksha Karyakram (JSSK)", hi: "जननी शिशु सुरक्षा कार्यक्रम (JSSK)" },
    dept: "आरोग्य व कुटुंब कल्याण मंत्रालय, भारत सरकार (राष्ट्रीय आरोग्य अभियान; राज्यात सार्वजनिक आरोग्य विभाग मार्फत)",
    what: { mr: "सरकारी आरोग्य संस्थेत गरोदरपण, प्रसूती आणि बाळंतपणानंतर 42 दिवसांपर्यंत आईला, तसंच 1 वर्षापर्यंतच्या आजारी बाळाला मोफत सेवा.", en: "Free care at government health facilities for mothers in pregnancy, at delivery and up to 42 days after, and for sick babies up to 1 year.", hi: "सरकारी स्वास्थ्य संस्थान में गर्भावस्था, प्रसव और प्रसव के बाद 42 दिन तक माँ को, और 1 साल तक के बीमार बच्चे को मुफ़्त सेवा।" },
    who: {
      mr: [
        "सरकारी आरोग्य संस्थेत येणाऱ्या सर्व गरोदर महिला व बाळंतपणानंतर 42 दिवसांपर्यंतच्या माता",
        "1 वर्षापर्यंतची आजारी बाळं: मोफत उपचार, औषधं, तपासण्या व वाहन",
        "उत्पन्न, जात किंवा कितवं बाळ याची अट नाही",
      ],
      en: [
        "All pregnant women and mothers up to 42 days after delivery at government health facilities",
        "Sick babies up to 1 year: free treatment, medicines, tests and transport",
        "No condition on income, caste or number of children",
      ],
      hi: [
        "सरकारी स्वास्थ्य संस्थान में आने वाली सभी गर्भवती महिलाएँ और प्रसव के बाद 42 दिन तक की माताएँ",
        "1 साल तक के बीमार बच्चे: मुफ़्त इलाज, दवाइयाँ, जाँचें और गाड़ी",
        "आमदनी, जाति या कौन-सा बच्चा है, इसकी कोई शर्त नहीं",
      ],
    },
    benefit: { mr: "मोफत प्रसूती, गरज असल्यास मोफत सिझेरियन; मोफत औषधं, तपासण्या, रक्त आणि रुग्णालयात राहताना जेवण (साधी प्रसूती 3 दिवस, सिझेरियन 7 दिवस); घरून रुग्णालयात, रुग्णालयांमध्ये आणि परत घरी मोफत वाहन; कोणतंही शुल्क नाही", en: "Free delivery and C-section if needed; free medicines, tests, blood and food during the stay (3 days for normal delivery, 7 for C-section); free transport from home, between hospitals and back home; no user charges", hi: "मुफ़्त प्रसव, ज़रूरत हो तो मुफ़्त सिज़ेरियन; मुफ़्त दवाइयाँ, जाँचें, ख़ून और अस्पताल में रहने के दौरान खाना (सामान्य प्रसव 3 दिन, सिज़ेरियन 7 दिन); घर से अस्पताल, अस्पतालों के बीच और वापस घर तक मुफ़्त गाड़ी; कोई फ़ीस नहीं" },
    apply: {
      mr: [
        "उपकेंद्र, प्राथमिक आरोग्य केंद्र, ग्रामीण रुग्णालय, उपजिल्हा व जिल्हा रुग्णालयात सेवा मिळते",
        "वाहनासाठी आशा ताई किंवा आरोग्य केंद्राशी संपर्क करा",
      ],
      en: [
        "Services are given at sub-centres, PHCs, rural, sub-district and district hospitals",
        "For transport, contact your ASHA or health centre",
      ],
      hi: [
        "उपकेंद्र, प्राथमिक स्वास्थ्य केंद्र, ग्रामीण अस्पताल, उप-ज़िला और ज़िला अस्पताल में सेवा मिलती है",
        "गाड़ी के लिए आशा दीदी या स्वास्थ्य केंद्र से संपर्क करें",
      ],
    },
    docs: ["माता-बाल संरक्षण (MCP) कार्ड", "आधीचे तपासणी रिपोर्ट (असल्यास)"],
    office: { mr: "ग्रामीण रुग्णालय, श्रीवर्धन / प्राथमिक आरोग्य केंद्र", en: "Rural Hospital Shrivardhan / PHC", hi: "ग्रामीण अस्पताल, श्रीवर्धन / प्राथमिक स्वास्थ्य केंद्र" },
    url: "https://nhm.maharashtra.gov.in/en/scheme/rch-janani-shishu-suraksha-karyakram-jssk/",
    source: "https://nhm.maharashtra.gov.in/en/scheme/rch-janani-shishu-suraksha-karyakram-jssk/ (updated 29 Apr 2025); https://nhmmeghalaya.nic.in/programmes/jssk/jssk.html",
    status: "official",
    sourceStatus: "Published",
    review: "Half-yearly",
    lastChecked: "29-09-2026",
    needs: ["pregnant", "new_mother", "child", "health"],
  },
  {
    id: "uip",
    sourceId: "uip",
    scope: "India",
    name: { mr: "सार्वत्रिक लसीकरण कार्यक्रम (UIP)", en: "Universal Immunisation Programme (UIP)", hi: "सार्वभौमिक टीकाकरण कार्यक्रम (UIP)" },
    dept: "आरोग्य व कुटुंब कल्याण मंत्रालय, भारत सरकार (राष्ट्रीय आरोग्य अभियान; राज्यात सार्वजनिक आरोग्य विभाग मार्फत)",
    what: { mr: "मुलांना व गरोदर महिलांना सरकारी आरोग्य सेवेत मोफत लसी.", en: "Free vaccines for children and pregnant women through government health services.", hi: "बच्चों और गर्भवती महिलाओं को सरकारी स्वास्थ्य सेवा में मुफ़्त टीके।" },
    who: {
      mr: [
        "लहान मुलं (वयानुसार वेगवेगळ्या लसी)",
        "10 व 16 वर्षांची मुलं (Td लस)",
        "गरोदर महिला",
      ],
      en: [
        "Young children (different vaccines at different ages)",
        "Children aged 10 and 16 (Td vaccine)",
        "Pregnant women",
      ],
      hi: [
        "छोटे बच्चे (उम्र के हिसाब से अलग-अलग टीके)",
        "10 और 16 साल के बच्चे (Td टीका)",
        "गर्भवती महिलाएँ",
      ],
    },
    benefit: { mr: "12 आजारांपासून संरक्षण देणाऱ्या लसी मोफत, उदा. पोलिओ, गोवर, रुबेला, घटसर्प, धनुर्वात, हिपॅटायटिस बी; दिलेल्या लसींची नोंद MCP कार्डवर", en: "Free vaccines against 12 diseases, such as polio, measles, rubella, diphtheria, tetanus and hepatitis B; vaccines given are recorded on the MCP card", hi: "12 बीमारियों से बचाने वाले टीके मुफ़्त, जैसे पोलियो, खसरा, रूबेला, डिप्थीरिया, टिटनेस, हेपेटाइटिस बी; लगे टीकों की जानकारी MCP कार्ड पर" },
    apply: {
      mr: [
        "सरकारी आरोग्य केंद्रं (उपकेंद्र, प्राथमिक आरोग्य केंद्र, ग्रामीण, उपजिल्हा व जिल्हा रुग्णालय) आणि गावातील लसीकरण सत्रं",
        "पुढच्या लसीची तारीख आशा ताई किंवा ANM कडून विचारा",
      ],
      en: [
        "Government health centres (sub-centre, PHC, rural, sub-district and district hospitals) and village vaccination sessions",
        "Ask your ASHA or ANM for the next vaccine date",
      ],
      hi: [
        "सरकारी स्वास्थ्य केंद्र (उपकेंद्र, प्राथमिक स्वास्थ्य केंद्र, ग्रामीण, उप-ज़िला और ज़िला अस्पताल) और गाँव के टीकाकरण सत्र",
        "अगले टीके की तारीख़ आशा दीदी या ANM से पूछें",
      ],
    },
    docs: ["माता-बाल संरक्षण (MCP) कार्ड"],
    docsNote: { mr: "प्रत्येक वेळी MCP कार्ड सोबत न्या. U-WIN वरही लसीकरणाची डिजिटल नोंद व प्रमाणपत्र मिळतं.", en: "Take the MCP card every time. U-WIN also keeps a digital record and gives a certificate.", hi: "हर बार MCP कार्ड साथ ले जाएँ। U-WIN पर भी टीकाकरण का डिजिटल रिकॉर्ड और प्रमाणपत्र मिलता है।" },
    office: { mr: "प्राथमिक आरोग्य केंद्र / उपकेंद्र; आशा, ANM", en: "PHC / sub-centre; ASHA, ANM", hi: "प्राथमिक स्वास्थ्य केंद्र / उपकेंद्र; आशा, ANM" },
    url: "https://nhm.maharashtra.gov.in/en/scheme/routine-immunisation-programme/",
    source: "https://nhm.maharashtra.gov.in/en/scheme/routine-immunisation-programme/ (updated 21 Apr 2025); PIB 24 Apr 2025 https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2124032; MCP card: wcd.odisha.gov.in",
    status: "official",
    sourceStatus: "Published",
    review: "Half-yearly",
    lastChecked: "29-09-2026",
    needs: ["pregnant", "child", "health"],
  },
  {
    id: "amb",
    sourceId: "amb",
    scope: "India",
    name: { mr: "ॲनिमिया मुक्त भारत अभियान (AMB)", en: "Anemia Mukt Bharat Abhiyaan (AMB)", hi: "एनीमिया मुक्त भारत अभियान (AMB)" },
    dept: "आरोग्य व कुटुंब कल्याण मंत्रालय, भारत सरकार (राष्ट्रीय आरोग्य अभियान; राज्यात सार्वजनिक आरोग्य विभाग मार्फत)",
    what: { mr: "रक्तक्षय (ॲनिमिया) टाळण्यासाठी व उपचारासाठी: लोह व फॉलिक ॲसिड (IFA) गोळ्या किंवा सिरप, तपासणी, उपचार, जंतनाशक आणि लोहयुक्त स्थानिक आहाराची माहिती.", en: "To prevent and treat anaemia: iron and folic acid (IFA) tablets or syrup, testing, treatment, deworming and advice on local iron-rich food.", hi: "ख़ून की कमी (एनीमिया) से बचाव और इलाज के लिए: आयरन और फ़ोलिक एसिड (IFA) की गोलियाँ या सिरप, जाँच, इलाज, पेट के कीड़ों की दवा और आयरन वाले स्थानीय खाने की जानकारी।" },
    who: {
      mr: [
        "6 महिने ते 9 वर्षांची मुलं",
        "10 ते 19 वर्षांचे किशोरवयीन मुलं-मुली",
        "गरोदर महिला व स्तनदा माता",
        "20 ते 49 वयाच्या महिला",
        "कमी वजनाने जन्मलेली 0 ते 6 महिन्यांची बाळं",
      ],
      en: [
        "Children 6 months to 9 years",
        "Adolescent girls and boys aged 10 to 19",
        "Pregnant women and breastfeeding mothers",
        "Women aged 20 to 49",
        "Low birth weight babies aged 0 to 6 months",
      ],
      hi: [
        "6 महीने से 9 साल के बच्चे",
        "10 से 19 साल के किशोर लड़के-लड़कियाँ",
        "गर्भवती महिलाएँ और स्तनपान कराने वाली माताएँ",
        "20 से 49 साल की महिलाएँ",
        "कम वज़न के साथ जन्मे 0 से 6 महीने के बच्चे",
      ],
    },
    benefit: { mr: "मुलं, किशोरवयीन मुलं-मुली आणि गरोदर व स्तनदा मातांना IFA गोळ्या किंवा सिरप; डिजिटल यंत्राने हिमोग्लोबिन तपासणी; रक्तक्षय आढळल्यास उपचार", en: "IFA tablets or syrup for children, teenagers and pregnant and breastfeeding women; haemoglobin test with a digital meter; treatment if anaemia is found", hi: "बच्चों, किशोर लड़के-लड़कियों और गर्भवती व स्तनपान कराने वाली माताओं को IFA गोलियाँ या सिरप; डिजिटल मशीन से हीमोग्लोबिन जाँच; एनीमिया मिलने पर इलाज" },
    apply: {
      mr: [
        "सरकारी आरोग्य केंद्र, शाळा (शालेय आरोग्य कार्यक्रम) आणि अंगणवाडीमार्फत",
        "शाळेत न जाणाऱ्या मुलींना अंगणवाडीतून",
      ],
      en: [
        "Through government health centres, schools (school health programme) and the Anganwadi",
        "Girls who are not in school get it through the Anganwadi",
      ],
      hi: [
        "सरकारी स्वास्थ्य केंद्र, स्कूल (स्कूल स्वास्थ्य कार्यक्रम) और आंगनवाड़ी के ज़रिए",
        "स्कूल न जाने वाली लड़कियों को आंगनवाड़ी से",
      ],
    },
    docs: ["माता-बाल संरक्षण (MCP) कार्ड (गरोदर असल्यास)"],
    docsNote: { mr: "कधी व कुठे मिळतं ते आशा ताई, ANM, शाळा किंवा अंगणवाडीत विचारा.", en: "Ask your ASHA, ANM, school or Anganwadi when and where it is given.", hi: "कब और कहाँ मिलता है, यह आशा दीदी, ANM, स्कूल या आंगनवाड़ी में पूछें।" },
    office: { mr: "आरोग्य केंद्र / शाळा / अंगणवाडी", en: "Health centre / school / Anganwadi", hi: "स्वास्थ्य केंद्र / स्कूल / आंगनवाड़ी" },
    url: "https://ambabhiyaan.mohfw.gov.in",
    caution: { mr: "जून 2026 मध्ये नवी मार्गदर्शक तत्त्वं आली (7 लाभार्थी गट, 7 उपाय). तुमच्या भागात काय मिळतं ते आरोग्य केंद्रात विचारा.", en: "New guidelines came out in June 2026 (7 beneficiary groups, 7 interventions). Ask at the health centre what is available locally.", hi: "जून 2026 में नए दिशानिर्देश आए (7 लाभार्थी समूह, 7 उपाय)। आपके इलाके में क्या मिलता है, यह स्वास्थ्य केंद्र में पूछें।" },
    source: "PIB 11 Aug 2026 https://www.pib.gov.in/PressReleasePage.aspx?PRID=2297512; PIB 29 Jun 2026 https://www.pib.gov.in/PressReleasePage.aspx?PRID=2279050; PIB 18 Apr 2025 https://pib.gov.in/PressReleseDetailm.aspx?PRID=2122623; PIB 19 Jul 2022 https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=1842749",
    status: "official",
    sourceStatus: "Published",
    review: "Quarterly",
    lastChecked: "29-09-2026",
    needs: ["pregnant", "new_mother", "child", "nutrition", "health"],
  },
  {
    id: "pmposhan",
    sourceId: "pmposhan",
    scope: "India",
    name: { mr: "पीएम पोषण (प्रधानमंत्री पोषण शक्ती निर्माण)", en: "PM POSHAN (Pradhan Mantri Poshan Shakti Nirman)", hi: "पीएम पोषण (प्रधानमंत्री पोषण शक्ति निर्माण)" },
    dept: "शिक्षण मंत्रालय, भारत सरकार (राज्यात शालेय शिक्षण विभाग मार्फत)",
    what: { mr: "सरकारी व शासन अनुदानित शाळांमध्ये मुलांना एक गरम शिजवलेलं जेवण.", en: "One hot cooked meal for children in government and government-aided schools.", hi: "सरकारी और सरकारी सहायता प्राप्त स्कूलों में बच्चों को एक गरम पका हुआ खाना।" },
    who: {
      mr: [
        "सरकारी किंवा शासन अनुदानित शाळेतील इयत्ता 1 ते 8 ची मुलं",
        "या प्राथमिक शाळांमधील बालवाटिका / पूर्व-प्राथमिक वर्गातील मुलं",
      ],
      en: [
        "Children in Classes 1 to 8 in government or government-aided schools",
        "Children in Balvatika or pre-primary classes in these primary schools",
      ],
      hi: [
        "सरकारी या सरकारी सहायता प्राप्त स्कूल में कक्षा 1 से 8 के बच्चे",
        "इन प्राथमिक स्कूलों की बालवाटिका / प्री-प्राइमरी कक्षा के बच्चे",
      ],
    },
    benefit: { mr: "बालवाटिका (पूर्व-प्राथमिक) आणि इयत्ता 1 ते 8 च्या मुलांना शाळेत एक गरम शिजवलेलं जेवण", en: "One hot cooked meal at school for children in Balvatika (pre-primary) and Classes 1 to 8", hi: "बालवाटिका (प्री-प्राइमरी) और कक्षा 1 से 8 के बच्चों को स्कूल में एक गरम पका हुआ खाना" },
    apply: {
      mr: [
        "मुलाचं नाव सरकारी किंवा अनुदानित शाळेत दाखल करा",
        "जेवणाबद्दल काही अडचण असल्यास मुख्याध्यापकांशी बोला",
      ],
      en: [
        "Enrol your child in a government or government-aided school",
        "Talk to the head teacher about any problem with the meal",
      ],
      hi: [
        "बच्चे का नाम सरकारी या सहायता प्राप्त स्कूल में लिखवाएँ",
        "खाने से जुड़ी कोई दिक़्क़त हो तो प्रधानाध्यापक से बात करें",
      ],
    },
    docs: ["शाळेत मुलाचं नाव दाखल"],
    docsNote: { mr: "शाळेत नाव दाखल असलेल्या मुलांना जेवण शाळेतच मिळतं.", en: "Children enrolled in the school get the meal at school.", hi: "स्कूल में नाम दर्ज बच्चों को खाना स्कूल में ही मिलता है।" },
    office: { mr: "मुलाची शाळा (मुख्याध्यापक)", en: "Your child's school (head teacher)", hi: "बच्चे का स्कूल (प्रधानाध्यापक)" },
    url: "https://pmposhan.education.gov.in",
    caution: { mr: "योजनेचा मंजूर कालावधी 31 मार्च 2026 ला संपला. 30 सप्टें 2026 पर्यंत किंवा नवी मंजुरी मिळेपर्यंत (जे आधी होईल) तात्पुरती मुदतवाढ. पुढची स्थिती शाळेत विचारा.", en: "The approved period ended on 31 Mar 2026. It was extended to 30 Sep 2026 or until the new approval, whichever is earlier. Ask the school for the latest.", hi: "योजना की मंज़ूर अवधि 31 मार्च 2026 को ख़त्म हुई। 30 सितंबर 2026 तक या नई मंज़ूरी मिलने तक (जो पहले हो) अस्थायी रूप से बढ़ाई गई। आगे की स्थिति स्कूल में पूछें।" },
    source: "pmposhan.education.gov.in (About us: coverage; approved 2021-22 to 2025-26); Hindustan Times via Vision IAS (12 May 2026): extension to 30 Sep 2026",
    status: "recheck",
    sourceStatus: "Due",
    review: "Due now",
    lastChecked: "29-09-2026",
    needs: ["child", "nutrition", "education"],
  },
  // ---- Added from the AADHI TI research dossier (compiled 10-09-2026, public sources); not in the prototype registry. ----
  {
    id: "single-women",
    sourceId: "single-women",
    scope: "Maharashtra",
    name: { mr: "एकल महिला धोरण (महाराष्ट्र)", en: "Single Women Policy (Maharashtra)", hi: "एकल महिला नीति (महाराष्ट्र)" },
    dept: "महिला व बाल विकास विभाग, महाराष्ट्र",
    what: {
      mr: "विधवा, घटस्फोटित, विभक्त आणि अविवाहित महिलांसाठी देशातील पहिलं स्वतंत्र धोरण. मसुदा समिती मे 2026 मध्ये स्थापन झाली; धोरण अजून तयार होत आहे.",
      en: "India's first dedicated policy for widowed, divorced, separated and unmarried women. A drafting committee was formed in May 2026; the policy is still being prepared.",
      hi: "विधवा, तलाकशुदा, अलग रह रही और अविवाहित महिलाओं के लिए देश की पहली अलग नीति। मसौदा समिति मई 2026 में बनी; नीति अभी तैयार हो रही है।",
    },
    who: {
      mr: ["विधवा, घटस्फोटित, विभक्त किंवा अविवाहित महिला"],
      en: ["Widowed, divorced, separated or unmarried women"],
      hi: ["विधवा, तलाकशुदा, अलग रह रही या अविवाहित महिलाएँ"],
    },
    benefit: {
      mr: "सामाजिक, आर्थिक, शैक्षणिक आणि आरोग्य योजनांपर्यंत पोहोचण्यासाठी एक चौकट (धोरण जाहीर झाल्यावर तपशील).",
      en: "A framework to reach social, economic, education and health schemes (details once the policy is announced).",
      hi: "सामाजिक, आर्थिक, शैक्षिक और स्वास्थ्य योजनाओं तक पहुँचने का ढाँचा (नीति घोषित होने पर विवरण)।",
    },
    apply: {
      mr: ["सध्या अर्ज नाही. पेन्शन व इतर योजनांसाठी तालुका महिला व बाल विकास कार्यालयात विचारा."],
      en: ["No application yet. Ask the Taluka Women & Child Development office about pensions and other schemes."],
      hi: ["अभी आवेदन नहीं। पेंशन व अन्य योजनाओं के लिए तालुका महिला व बाल विकास कार्यालय में पूछें।"],
    },
    office: { mr: "तालुका महिला व बाल विकास कार्यालय", en: "Taluka Women & Child Development office", hi: "तालुका महिला व बाल विकास कार्यालय" },
    url: "https://womenchild.maharashtra.gov.in",
    caution: {
      mr: "धोरण अजून जाहीर झालेलं नाही. त्याच्या नावाने पैसे मागणाऱ्यांपासून सावध राहा.",
      en: "The policy hasn't been announced yet. Beware of anyone asking for money in its name.",
      hi: "नीति अभी घोषित नहीं हुई है। इसके नाम पर पैसे माँगने वालों से सावधान रहें।",
    },
    source: "Research dossier (10-09-2026): IANS / The Hans India, Nagpur Today (May 2026)",
    status: "general",
    sourceStatus: "Review",
    review: "When announced",
    lastChecked: "10-09-2026",
    needs: ["single_woman"],
    topic: "single_mother",
  },
  {
    id: "adishakti",
    sourceId: "adishakti",
    scope: "Maharashtra",
    name: { mr: "आदिशक्ती अभियान", en: "Adishakti Abhiyan", hi: "आदिशक्ति अभियान" },
    dept: "महिला व बाल विकास विभाग, महाराष्ट्र",
    what: {
      mr: "ग्रामीण महिलांसाठी अभियान: कुपोषण, माता-बाल मृत्यू, बालविवाह आणि लिंगाधारित हिंसा रोखणं; स्थानिक कारभारात महिलांचा सहभाग.",
      en: "A rural women's campaign against malnutrition, maternal and infant deaths, child marriage and gender-based violence, with more women in local governance.",
      hi: "ग्रामीण महिलाओं का अभियान: कुपोषण, मातृ-शिशु मृत्यु, बाल विवाह और लैंगिक हिंसा रोकना; स्थानीय शासन में महिलाओं की भागीदारी।",
    },
    who: { mr: ["गावातील महिला आणि कुटुंबं"], en: ["Village women and families"], hi: ["गाँव की महिलाएँ और परिवार"] },
    benefit: {
      mr: "गाव समिती कुटुंबांचं समुपदेशन करते, बालविवाह रोखते आणि घरगुती हिंसेतील महिलांना मदत करते.",
      en: "Village committees counsel families, prevent child marriages and help women facing domestic violence.",
      hi: "गाँव की समितियाँ परिवारों को परामर्श देती हैं, बाल विवाह रोकती हैं और घरेलू हिंसा झेल रही महिलाओं की मदद करती हैं।",
    },
    apply: {
      mr: ["ग्रामपंचायत किंवा अंगणवाडी सेविकेकडे गाव समितीबद्दल विचारा."],
      en: ["Ask your Gram Panchayat or Anganwadi worker about the village committee."],
      hi: ["ग्राम पंचायत या आंगनवाड़ी सेविका से गाँव की समिति के बारे में पूछें।"],
    },
    office: { mr: "ग्रामपंचायत / अंगणवाडी", en: "Gram Panchayat / Anganwadi", hi: "ग्राम पंचायत / आंगनवाड़ी" },
    url: "https://womenchild.maharashtra.gov.in",
    source: "Research dossier (10-09-2026): state cabinet approval reports",
    status: "general",
    sourceStatus: "Review",
    review: "Quarterly",
    lastChecked: "10-09-2026",
    needs: ["daughter", "health"],
  },
  {
    id: "child-marriage",
    sourceId: "child-marriage",
    scope: "Maharashtra",
    name: { mr: "बालविवाहमुक्त महाराष्ट्र", en: "Child Marriage-Free Maharashtra", hi: "बाल विवाह मुक्त महाराष्ट्र" },
    dept: "महिला व बाल विकास विभाग, महाराष्ट्र",
    what: {
      mr: "18 वर्षांखालील मुलीचं लग्न गुन्हा आहे. लग्न ठरवणारे, लावणारे आणि मध्यस्थ यांच्यावरही कारवाई होते.",
      en: "Marrying a girl under 18 is a crime. Action is also taken against those who arrange, conduct or broker it.",
      hi: "18 साल से कम उम्र की लड़की की शादी अपराध है। शादी तय करने, कराने और बिचौलियों पर भी कार्रवाई होती है।",
    },
    who: {
      mr: ["कोणीही तक्रार करू शकतं; नाव गुप्त ठेवलं जातं"],
      en: ["Anyone can report; your identity is kept confidential"],
      hi: ["कोई भी शिकायत कर सकता है; नाम गुप्त रखा जाता है"],
    },
    benefit: {
      mr: "मुलीचं शिक्षण आणि आरोग्य सुरक्षित राहतं.",
      en: "It protects a girl's education and health.",
      hi: "लड़की की पढ़ाई और सेहत सुरक्षित रहती है।",
    },
    apply: {
      mr: ["1098 (चाइल्डलाइन) किंवा 112 ला कॉल करा."],
      en: ["Call 1098 (Childline) or 112."],
      hi: ["1098 (चाइल्डलाइन) या 112 पर कॉल करें।"],
    },
    office: { mr: "चाइल्डलाइन 1098 / पोलीस 112", en: "Childline 1098 / Police 112", hi: "चाइल्डलाइन 1098 / पुलिस 112" },
    url: "https://womenchild.maharashtra.gov.in",
    source: "Research dossier (10-09-2026): Minister's statement, IANS (May 2026)",
    status: "general",
    sourceStatus: "Review",
    review: "Quarterly",
    lastChecked: "10-09-2026",
    needs: ["daughter"],
    topic: "child_marriage",
  },
];

export const schemeById = (id: string) => SCHEMES.find((s) => s.id === id || s.sourceId === id);

/* ---------------- Scheme Finder ---------------- */
// Fixed rules from the prototype's evalSchemes(). No AI. Guidance only: the office decides.

export type AgeBand = "13-17" | "18-29" | "30-44" | "45-59" | "60+";
export type IncomeBand = "lt21" | "lt1l" | "lt25" | "lt8" | "gt8";
export type RationCard = "yellow" | "orange" | "white" | "none";
export type Marital = "single" | "married" | "widow" | "divorced" | "abandoned";
export type Work = "home" | "farm" | "labour" | "self" | "job" | "student";
export type FinderFlag = "singlemom" | "disab" | "preg" | "born23" | "girl10" | "shg" | "biz" | "tour" | "student";

export type FinderAnswers = {
  age: AgeBand;
  income?: IncomeBand;
  ration?: RationCard;
  marital?: Marital;
  work?: Work;
  flags: Partial<Record<FinderFlag, boolean>>;
};

export type FinderVerdict = "yes" | "check" | "no";
/** `id` is the scheme's anchor id (Scheme.id). */
export type FinderResult = { id: string; verdict: FinderVerdict; reason: L };

type Opt<T extends string> = { id: T; label: L };

export const AGE_BANDS: Opt<AgeBand>[] = (["13-17", "18-29", "30-44", "45-59", "60+"] as AgeBand[]).map((a) => ({
  id: a,
  label: { mr: a, en: a, hi: a },
}));
const AGE_RANGE: Record<AgeBand, [number, number]> = {
  "13-17": [13, 17],
  "18-29": [18, 29],
  "30-44": [30, 44],
  "45-59": [45, 59],
  "60+": [60, 90],
};

export const INCOME_BANDS: Opt<IncomeBand>[] = [
  { id: "lt21", label: { mr: "₹21,000 पर्यंत", en: "Up to ₹21,000", hi: "₹21,000 तक" } },
  { id: "lt1l", label: { mr: "₹1 लाखापर्यंत", en: "Up to ₹1 lakh", hi: "₹1 लाख तक" } },
  { id: "lt25", label: { mr: "₹2.5 लाखांपर्यंत", en: "Up to ₹2.5 lakh", hi: "₹2.5 लाख तक" } },
  { id: "lt8", label: { mr: "₹8 लाखांपर्यंत", en: "Up to ₹8 lakh", hi: "₹8 लाख तक" } },
  { id: "gt8", label: { mr: "₹8 लाखांवर", en: "Above ₹8 lakh", hi: "₹8 लाख से ज़्यादा" } },
];
const INCOME_MAX: Record<IncomeBand, number> = { lt21: 21000, lt1l: 100000, lt25: 250000, lt8: 800000, gt8: 1e12 };

export const RATION_CARDS: Opt<RationCard>[] = [
  { id: "yellow", label: { mr: "पिवळं", en: "Yellow", hi: "पीला" } },
  { id: "orange", label: { mr: "केशरी", en: "Orange", hi: "केसरी" } },
  { id: "white", label: { mr: "पांढरं", en: "White", hi: "सफ़ेद" } },
  { id: "none", label: { mr: "कार्ड नाही", en: "No card", hi: "कार्ड नहीं" } },
];

export const MARITAL: Opt<Marital>[] = [
  { id: "single", label: { mr: "अविवाहित", en: "Unmarried", hi: "अविवाहित" } },
  { id: "married", label: { mr: "विवाहित", en: "Married", hi: "विवाहित" } },
  { id: "widow", label: { mr: "विधवा", en: "Widow", hi: "विधवा" } },
  { id: "divorced", label: { mr: "घटस्फोटित", en: "Divorced", hi: "तलाक़शुदा" } },
  { id: "abandoned", label: { mr: "परित्यक्ता", en: "Abandoned", hi: "परित्यक्ता" } },
];

export const WORK: Opt<Work>[] = [
  { id: "home", label: { mr: "गृहिणी", en: "Homemaker", hi: "गृहिणी" } },
  { id: "farm", label: { mr: "शेती", en: "Farming", hi: "खेती" } },
  { id: "labour", label: { mr: "मजुरी", en: "Daily wage work", hi: "मज़दूरी" } },
  { id: "self", label: { mr: "स्वतःचा व्यवसाय", en: "Self-employed", hi: "अपना काम-धंधा" } },
  { id: "job", label: { mr: "नोकरी", en: "Job", hi: "नौकरी" } },
  { id: "student", label: { mr: "विद्यार्थिनी", en: "Student", hi: "छात्रा" } },
];

export const FINDER_FLAGS: Opt<FinderFlag>[] = [
  { id: "singlemom", label: { mr: "एकल माता", en: "Single mother", hi: "एकल माँ" } },
  { id: "disab", label: { mr: "दिव्यांग", en: "Disability", hi: "दिव्यांग" } },
  { id: "preg", label: { mr: "गरोदर किंवा नवी आई", en: "Pregnant or new mother", hi: "गर्भवती या नई माँ" } },
  { id: "born23", label: { mr: "1 एप्रिल 2023 नंतर जन्मलेली मुलगी", en: "Daughter born after 1 Apr 2023", hi: "1 अप्रैल 2023 के बाद जन्मी बेटी" } },
  { id: "girl10", label: { mr: "10 वर्षांखालील मुलगी", en: "Daughter under 10", hi: "10 साल से छोटी बेटी" } },
  { id: "shg", label: { mr: "बचत गटाची सदस्य", en: "SHG member", hi: "स्वयं सहायता समूह की सदस्य" } },
  { id: "biz", label: { mr: "व्यवसाय सुरू करायचा आहे", en: "Want to start a business", hi: "व्यवसाय शुरू करना है" } },
  { id: "tour", label: { mr: "होमस्टे किंवा पर्यटन", en: "Homestay or tourism", hi: "होमस्टे या पर्यटन" } },
  { id: "student", label: { mr: "व्यावसायिक कोर्स करणारी विद्यार्थिनी", en: "Student on a professional course", hi: "प्रोफ़ेशनल कोर्स की छात्रा" } },
];

export const VERDICT_LABEL: Record<FinderVerdict, L> = {
  yes: { mr: "बहुधा पात्र", en: "Likely eligible", hi: "पात्र लगती हैं" },
  check: { mr: "तपासावं लागेल", en: "Needs checking", hi: "जाँचना होगा" },
  no: { mr: "सध्या लागू नाही", en: "Not for you right now", hi: "अभी लागू नहीं" },
};

const r = (mr: string, en: string, hi: string): L => ({ mr, en, hi });

/**
 * Runs the fixed eligibility rules. Returns one result per scheme the rules could assess
 * (schemes with no matching rule are left out), sorted yes → check → no.
 */
export function findSchemes(a: FinderAnswers): FinderResult[] {
  const [lo, hi] = AGE_RANGE[a.age];
  const inc = a.income ? INCOME_MAX[a.income] : null;
  const f = a.flags;
  const yellowOrange = a.ration === "yellow" || a.ration === "orange";
  const out: FinderResult[] = [];
  const add = (sourceId: string, verdict: FinderVerdict, reason: L) => {
    const s = schemeById(sourceId);
    if (s) out.push({ id: s.id, verdict, reason });
  };

  // Ladki Bahin: age 21-65, income up to ₹2.5 lakh.
  if (hi < 21) add("ladki", "no", r("वय 21 ते 65 असायला हवं", "You must be aged 21 to 65", "उम्र 21 से 65 होनी चाहिए"));
  else if (inc != null && inc > 250000)
    add("ladki", "no", r("कुटुंबाचं उत्पन्न ₹2.5 लाखांपेक्षा जास्त आहे", "Family income is above ₹2.5 lakh", "परिवार की आमदनी ₹2.5 लाख से ज़्यादा है"));
  else if (lo >= 21 && hi <= 65 && inc != null)
    add(
      "ladki",
      "yes",
      r(
        "वय आणि उत्पन्न नियमात बसतं. दरवर्षी e-KYC करावं लागतं.",
        "Your age and income fit the rules. You need to do e-KYC every year.",
        "उम्र और आमदनी नियम में आती है। हर साल e-KYC करना होता है।",
      ),
    );
  else
    add(
      "ladki",
      "check",
      lo < 21
        ? r("तुमचं वय 21 पूर्ण असेल तर", "If you are 21 or older", "अगर आपकी उम्र 21 पूरी है तो")
        : hi > 65
          ? r("तुमचं वय 65 पर्यंत असेल तर", "If you are 65 or younger", "अगर आपकी उम्र 65 तक है तो")
          : r("कुटुंबाचं उत्पन्न भरा", "Add your family income", "परिवार की आमदनी भरें"),
    );

  // Lek Ladki: daughter born on/after 1 Apr 2023, yellow/orange card, income up to ₹1 lakh.
  if (f.born23) {
    if (!yellowOrange)
      add("lekladki", "no", r("पिवळं किंवा केशरी रेशन कार्ड लागतं", "You need a yellow or orange ration card", "पीला या केसरी राशन कार्ड चाहिए"));
    else if (inc == null)
      add("lekladki", "check", r("कुटुंबाचं उत्पन्न भरा", "Add your family income", "परिवार की आमदनी भरें"));
    else if (inc <= 100000)
      add(
        "lekladki",
        "yes",
        r(
          "पिवळं किंवा केशरी रेशन कार्ड आणि उत्पन्न ₹1 लाखापर्यंत",
          "Yellow or orange ration card and income up to ₹1 lakh",
          "पीला या केसरी राशन कार्ड और आमदनी ₹1 लाख तक",
        ),
      );
    else add("lekladki", "no", r("उत्पन्न ₹1 लाखापर्यंत असायला हवं", "Income must be ₹1 lakh or less", "आमदनी ₹1 लाख या उससे कम होनी चाहिए"));
  }

  // PMMVY
  if (f.preg) {
    const out8 = inc != null && inc >= 800000 && !yellowOrange;
    add(
      "pmmvy",
      out8 ? "no" : "check",
      out8
        ? r(
            "उत्पन्न ₹8 लाखांपेक्षा कमी हवं, किंवा दुसऱ्या एखाद्या गटात पात्र असायला हवं",
            "Income must be under ₹8 lakh, or you must fit another category",
            "आमदनी ₹8 लाख से कम होनी चाहिए, या आप किसी दूसरे पात्र समूह में हों",
          )
        : r(
            "तुम्ही पात्र दिसता. योजना 2026-27 मध्ये चालू आहे का, ते अंगणवाडीत विचारून खात्री करा.",
            "You look eligible. Check at the Anganwadi that the scheme continues in 2026-27.",
            "आप पात्र लगती हैं। योजना 2026-27 में जारी है या नहीं, आंगनवाड़ी में पूछकर पक्का करें।",
          ),
    );
  }

  if (f.girl10) add("sukanya", "yes", r("तुमची मुलगी 10 वर्षांखालील आहे", "You have a daughter under 10", "आपकी बेटी 10 साल से छोटी है"));

  // Sanjay Gandhi Niradhar
  const single = a.marital === "widow" || a.marital === "divorced" || a.marital === "abandoned";
  if ((single || f.disab) && hi < 65) {
    const lim = f.disab ? 50000 : 21000;
    const ok = inc != null && inc <= lim;
    add(
      "sgnay",
      ok ? "yes" : "check",
      ok
        ? f.disab
          ? r(
              "अटी पूर्ण होतात. महिन्याला ₹1,500 (दिव्यांग असल्यास ₹2,500)",
              "You meet the conditions. ₹1,500 a month (₹2,500 with disability)",
              "शर्तें पूरी होती हैं। हर महीने ₹1,500 (दिव्यांग होने पर ₹2,500)",
            )
          : r("अटी पूर्ण होतात. महिन्याला ₹1,500", "You meet the conditions. ₹1,500 a month", "शर्तें पूरी होती हैं। हर महीने ₹1,500")
        : r(
            "उत्पन्न ₹21,000 पर्यंत (दिव्यांग असल्यास ₹50,000) असेल तर",
            "If income is up to ₹21,000 (₹50,000 with disability)",
            "अगर आमदनी ₹21,000 तक (दिव्यांग होने पर ₹50,000) है तो",
          ),
    );
  }

  if (a.age === "60+")
    add(
      "shravanbal",
      "check",
      r("वय 65+ आणि उत्पन्न ₹21,000 पेक्षा कमी असेल तर", "If you are 65+ and income is below ₹21,000", "अगर उम्र 65+ है और आमदनी ₹21,000 से कम है तो"),
    );

  if (hi >= 18) {
    add(
      "mavim",
      "yes",
      f.shg
        ? r(
            "तुम्ही गटात आहात. प्रशिक्षण आणि कर्जासाठी जोडणी मिळू शकते.",
            "You are in a group, so you can get training and be linked to loans.",
            "आप समूह में हैं, इसलिए प्रशिक्षण और कर्ज़ से जुड़ाव मिल सकता है।",
          )
        : r("18 वर्षांवरच्या सर्व महिलांसाठी आहे", "Open to all women over 18", "18 साल से ऊपर की सभी महिलाओं के लिए है"),
    );
    add(
      "umed",
      f.shg ? "yes" : "check",
      f.shg
        ? r(
            "तुम्ही बचत गटात आहात. फिरता निधी आणि बँक कर्ज मिळू शकतं.",
            "As an SHG member you can get a revolving fund and bank loans.",
            "स्वयं सहायता समूह की सदस्य होने से रिवॉल्विंग फ़ंड और बैंक कर्ज़ मिल सकता है।",
          )
        : r("गावातल्या बचत गटात सामील झाल्यावर", "Once you join a rural SHG", "गाँव के स्वयं सहायता समूह से जुड़ने के बाद"),
    );
  }

  if (f.biz && hi >= 18) {
    add(
      "mudra",
      "yes",
      r(
        "लहान व्यवसायासाठी कर्ज. कर्ज मिळेल की नाही ते बँक ठरवते.",
        "A loan for a small business. The bank decides if you qualify.",
        "छोटे व्यवसाय के लिए कर्ज़। कर्ज़ मिलेगा या नहीं, यह बैंक तय करता है।",
      ),
    );
    add(
      "pmegp",
      "check",
      r(
        "नवीन उद्योगासाठी. महिलांना 25 ते 35% अनुदान. योजना पुढे चालू राहणार का, याची खात्री अजून करायची आहे.",
        "For a new business. Women get a 25-35% subsidy. Whether the scheme continues is still to be confirmed.",
        "नए उद्योग के लिए। महिलाओं को 25 से 35% सब्सिडी। योजना आगे जारी रहेगी या नहीं, इसकी पुष्टि बाकी है।",
      ),
    );
    add(
      "vishwakarma",
      "check",
      r(
        "तुमचं काम 18 पारंपरिक व्यवसायांपैकी एक असेल तर (उदा. शिंपी)",
        "If you work in one of the 18 traditional trades (for example, tailoring)",
        "अगर आपका काम 18 पारंपरिक व्यवसायों में से एक है (जैसे दर्ज़ी)",
      ),
    );
    add(
      "standup",
      "check",
      r("₹10 लाख किंवा जास्त रकमेचा पहिलाच उद्योग असेल तर", "For a first business of ₹10 lakh or more", "₹10 लाख या उससे ज़्यादा का पहला उद्योग हो तो"),
    );
    if (f.shg)
      add(
        "pmfme",
        "check",
        r(
          "अन्न प्रक्रियेसाठी ₹40,000 बीज भांडवल. 30 सप्टें 2026 नंतर योजना चालू आहे का ते तपासा.",
          "Food processing: ₹40,000 seed capital. Check if it continues after 30 Sep 2026.",
          "खाद्य प्रसंस्करण के लिए ₹40,000 बीज पूँजी। 30 सितंबर 2026 के बाद योजना जारी है या नहीं, जाँच लें।",
        ),
      );
  }

  if (f.tour && hi >= 18)
    add(
      "aai",
      "yes",
      r(
        "महिलांच्या मालकीच्या पर्यटन व्यवसायासाठी व्याज परतावा",
        "Interest refund for a tourism business owned by a woman",
        "महिला के स्वामित्व वाले पर्यटन व्यवसाय के लिए ब्याज वापसी",
      ),
    );

  if (f.student) {
    const ok = inc == null || inc <= 800000;
    add(
      "freeedu",
      ok ? "check" : "no",
      ok
        ? r(
            "उत्पन्न ₹8 लाखांपर्यंत आहे. तुमचा प्रवर्ग आणि CAP प्रवेश तपासा.",
            "Income is up to ₹8 lakh. Check your category and CAP admission.",
            "आमदनी ₹8 लाख तक है। अपनी श्रेणी और CAP प्रवेश जाँच लें।",
          )
        : r("उत्पन्न ₹8 लाखांपेक्षा जास्त आहे", "Income is above ₹8 lakh", "आमदनी ₹8 लाख से ज़्यादा है"),
    );
  }

  const w = a.work;
  if (lo >= 15 && hi <= 59 && (w === "home" || w === "labour" || w === "farm" || w === "student" || w === "self"))
    add(
      "pmkvy",
      "check",
      r(
        "मोफत आणि प्रमाणपत्र मिळणारं कौशल्य प्रशिक्षण. पुढचा टप्पा सुरू झाला का ते तपासा.",
        "Certified skill training. Check that the next phase has started.",
        "मुफ़्त और प्रमाणपत्र वाला कौशल प्रशिक्षण। अगला चरण शुरू हुआ या नहीं, जाँच लें।",
      ),
    );
  if ((w === "labour" || w === "farm" || w === "self" || w === "home") && lo >= 16 && hi <= 59)
    add("eshram", "yes", r("असंघटित कामगार म्हणून मोफत नोंदणी", "Free registration as an unorganised worker", "असंगठित कामगार के रूप में मुफ़्त पंजीकरण"));

  const ord: Record<FinderVerdict, number> = { yes: 0, check: 1, no: 2 };
  return out.sort((x, y) => ord[x.verdict] - ord[y.verdict]);
}
