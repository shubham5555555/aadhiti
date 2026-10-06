// UI copy in Marathi, English and Hindi.
import type { AgeGroup, Intent, L } from "./kb/types";

export const brand = {
  name: "AADHI TI",
  tagline: { mr: "तिच्या प्रत्येक प्रश्नासाठी.", en: "For every question she has.", hi: "उसके हर सवाल के लिए।" } as L,
  positioning: {
    mr: "महिलांसाठी माहिती आणि मदत सहाय्यक",
    en: "A Women's Information & Support Assistant",
    hi: "महिलाओं के लिए जानकारी और सहायता सहायक",
  } as L,
  promise: {
    mr: "पाऊल तिच्या सक्षमीकरणासाठी, \nआधी तिला घडविण्यासाठी...",
    en: "From her questions to her next step.",
    hi: "उसके सवाल से उसके अगले कदम तक।",
  } as L,
};

export const nav = {
  home: { mr: "मुख्यपृष्ठ", en: "Home", hi: "होम" },
  ask: { mr: "‘आधी ती’ला विचारा", en: "Ask AADHI TI", hi: "AADHI TI से पूछें" },
  call: { mr: "कॉल", en: "Call", hi: "कॉल" },
  everyday: { mr: "दैनिक गोष्टी", en: "Everyday Help", hi: "रोज़मर्रा" },
  poshan: { mr: "पोषण", en: "Nutrition", hi: "पोषण" },
  schemes: { mr: "योजना", en: "Schemes", hi: "योजनाएँ" },
  knowledge: { mr: "अधिक माहिती", en: "Information", hi: "जानकारी" },
  quickExit: { mr: "लगेच बाहेर", en: "Quick Exit", hi: "तुरंत बाहर" },
} satisfies Record<string, L>;

export const ageLabels: Record<AgeGroup, L> = {
  girl: { mr: "मुलगी (10–18)", en: "Girl (10–18)", hi: "लड़की (10–18)" },
  "18": { mr: "18+", en: "18+", hi: "18+" },
  "30": { mr: "30+", en: "30+", hi: "30+" },
  "40": { mr: "40+", en: "40+", hi: "40+" },
  "50": { mr: "50+", en: "50+", hi: "50+" },
};

export const intentLabels: Record<Intent, L> = {
  learn: { mr: "अधिक माहिती", en: "Learn", hi: "जानकारी" },
  check: { mr: "तपासणी", en: "Check", hi: "जाँच" },
  find: { mr: "शोधा", en: "Find", hi: "खोजें" },
  act: { mr: "काय करावं", en: "Act", hi: "क्या करें" },
  connect: { mr: "संपर्क", en: "Connect", hi: "संपर्क" },
};

export const chat = {
  menuQuestion: { mr: "तुम्हाला कशाबद्दल माहिती हवी आहे?", en: "What would you like to know about?", hi: "आपको किस बारे में जानकारी चाहिए?" },
  askTitle: { mr: "ASK AADHI TI", en: "ASK AADHI TI", hi: "ASK AADHI TI" },
  askHint: { mr: "लिहा किंवा आवाजात विचारा.", en: "Type or ask by voice.", hi: "लिखें या आवाज़ में पूछें।" },
  placeholder: {
    mr: "तुमचा प्रश्न लिहा… उदा. 'माझ्या मागे कोणीतरी येतंय'",
    en: "Type your question… e.g. 'someone is following me'",
    hi: "अपना सवाल लिखें… जैसे 'कोई मेरा पीछा कर रहा है'",
  },
  whoAreYou: { mr: "तुमच्यासाठी योग्य उत्तरं देण्यासाठी — तुमचं वय गट निवडा", en: "So I can give answers that fit you — choose your age group", hi: "आपके लिए सही जवाब देने के लिए — अपना आयु वर्ग चुनें" },
  understand: { mr: "हे काय असू शकतं", en: "What may be happening", hi: "यह क्या हो सकता है" },
  answer: { mr: "तुम्ही काय करू शकता", en: "What you can do", hi: "आप क्या कर सकती हैं" },
  next: { mr: "पुढचं पाऊल", en: "Next step", hi: "अगला कदम" },
  forGirls: { mr: "मुलींसाठी", en: "For girls", hi: "लड़कियों के लिए" },
  menu: { mr: "मुख्य मेनू", en: "Main menu", hi: "मुख्य मेनू" },
  typing: { mr: "लिहित आहे…", en: "typing…", hi: "लिख रही है…" },
  online: { mr: "AI मार्गदर्शन", en: "AI guidance", hi: "AI मार्गदर्शन" },
  restart: { mr: "नवीन संभाषण", en: "New conversation", hi: "नई बातचीत" },
  emergencyTitle: { mr: "तुम्ही आत्ता धोक्यात आहात का?", en: "Are you in danger right now?", hi: "क्या आप अभी खतरे में हैं?" },
  emergencyBody: { mr: "थांबू नका — लगेच 112 ला कॉल करा.", en: "Don't wait — call 112 now.", hi: "रुकिए मत — अभी 112 पर कॉल करें।" },
  call112: { mr: "112 ला कॉल करा", en: "Call 112", hi: "112 पर कॉल करें" },
  describeTitle: { mr: "तुमची अडचण तुमच्या शब्दांत सांगा", en: "Describe your problem in your own words", hi: "अपनी परेशानी अपने शब्दों में बताइए" },
  describeBody: {
    mr: "त्याला काय म्हणतात हे माहीत असण्याची गरज नाही. जे घडतंय ते लिहा — मी समजून घ्यायला मदत करेन आणि पुढचं पाऊल सांगेन.",
    en: "You don't need to know what it's called. Just write what's happening — I'll help you understand it and show the next step.",
    hi: "इसे क्या कहते हैं, यह जानना ज़रूरी नहीं। जो हो रहा है वह लिखिए — मैं समझने में मदद करूँगी और अगला कदम बताऊँगी।",
  },
  notSure: {
    mr: "मला नक्की समजलं नाही, पण मी तुमच्यासोबत आहे. थोडं अजून सांगाल का — काय घडतंय, कोण आहे, कधीपासून? किंवा खालील विषय निवडा. धोका असेल तर लगेच 112.",
    en: "I didn't fully understand, but I'm here with you. Could you tell me a little more — what is happening, who is involved, since when? Or pick a topic below. If you're in danger, call 112 now.",
    hi: "मुझे ठीक से समझ नहीं आया, पर मैं आपके साथ हूँ। थोड़ा और बताएँगी — क्या हो रहा है, कौन है, कब से? या नीचे कोई विषय चुनें। खतरा हो तो तुरंत 112।",
  },
  greeting: {
    mr: "नमस्कार! मी AADHI TI. सुरक्षितता, आरोग्य, हक्क, शिक्षण, उत्पन्न, कुटुंब — काहीही विचारा. नाव, फोन नंबर किंवा पत्ता लिहू नका. उत्तरासाठी प्रश्न AI सेवेकडे पाठवला जातो.",
    en: "Hello! I'm AADHI TI. Ask me anything — safety, health, rights, education, income, family. Questions are sent to an AI service. Please leave out your name, phone number and address.",
    hi: "नमस्ते! मैं AADHI TI हूँ। सुरक्षा, स्वास्थ्य, अधिकार, पढ़ाई, कमाई, परिवार — कुछ भी पूछिए। नाम, फोन नंबर या पता न लिखें। जवाब के लिए सवाल AI सेवा को भेजा जाता है।",
  },
  voiceSoon: { mr: "आवाजात विचारा (लवकरच)", en: "Ask by voice (coming soon)", hi: "आवाज़ में पूछें (जल्द)" },
  privacy: {
    mr: "तुम्ही स्वतः लिहिलेले प्रश्न उत्तरासाठी AI सेवेकडे (Google Gemini) पाठवले जातात. त्यात नाव, फोन नंबर किंवा पत्ता लिहू नका. कोणी पाहत असेल तर वर 'लगेच बाहेर' दाबा.",
    en: "No personal details needed. Questions you type are sent to an AI service (Google Gemini) to write the answer. Please don't include your name, phone number or address. If someone is watching, tap 'Quick Exit' at the top.",
    hi: "आपके लिखे सवाल जवाब के लिए AI सेवा (Google Gemini) को भेजे जाते हैं। उसमें नाम, फ़ोन नंबर या पता न लिखें। कोई देख रहा हो तो ऊपर 'तुरंत बाहर' दबाएँ।",
  },
  aiNote: {
    mr: "हे उत्तर AI ने लिहिलं आहे. महत्त्वाच्या गोष्टी अधिकृत ठिकाणी किंवा हेल्पलाइनवर खात्री करून घ्या.",
    en: "This answer was written by AI. Check anything important with an official office or helpline.",
    hi: "यह जवाब AI ने लिखा है। ज़रूरी बातें आधिकारिक दफ़्तर या हेल्पलाइन पर पक्की कर लें।",
  },
  everydayStrip: { mr: "AADHI TI — रोजचं", en: "AADHI TI — Everyday", hi: "AADHI TI — रोज़मर्रा" },
} satisfies Record<string, L>;

export const limits: Record<"medical" | "legal" | "crisis" | "child", L> = {
  medical: {
    mr: "ही आरोग्य माहिती आहे, निदान नाही. लक्षणं गंभीर वाटल्यास डॉक्टर / PHC ला भेटा.",
    en: "This is health information, not a diagnosis. If symptoms feel serious, see a doctor or your PHC.",
    hi: "यह स्वास्थ्य जानकारी है, निदान नहीं। लक्षण गंभीर लगें तो डॉक्टर / PHC से मिलें।",
  },
  legal: {
    mr: "ही कायदेविषयक माहिती आहे, सल्ला नाही. तुमच्या केससाठी मोफत कायदेशीर मदत (15100) किंवा वकिलाशी बोला.",
    en: "This is legal information, not legal advice. For your case, speak to free legal aid (15100) or a lawyer.",
    hi: "यह कानूनी जानकारी है, सलाह नहीं। अपने मामले के लिए मुफ़्त कानूनी सहायता (15100) या वकील से बात करें।",
  },
  crisis: {
    mr: "मी counsellor किंवा पोलीस नाही — पण तुम्हाला योग्य मदतीपर्यंत पोहोचवू शकते. तुम्ही एकट्या नाही.",
    en: "I'm not a counsellor or the police — but I can connect you to the right help. You are not alone.",
    hi: "मैं counsellor या पुलिस नहीं हूँ — पर सही मदद तक पहुँचा सकती हूँ। आप अकेली नहीं हैं।",
  },
  child: {
    mr: "मुलांच्या सुरक्षिततेचा प्रश्न गंभीर आहे. 1098 (Childline) ला मोफत, 24x7 कॉल करा.",
    en: "Child safety is serious. Call 1098 (Childline) — free, 24x7.",
    hi: "बच्चों की सुरक्षा गंभीर विषय है। 1098 (Childline) पर मुफ़्त, 24x7 कॉल करें।",
  },
};
