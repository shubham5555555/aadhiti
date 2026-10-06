// The public figure behind AADHI TI. Public, factual information only (roles, background, initiatives).
import type { L } from "./kb/types";

export const leader = {
  name: { mr: "आदिती सुनील तटकरे", en: "Aditi Sunil Tatkare", hi: "अदिति सुनील तटकरे" } as L,
  shortName: { mr: "मा. आदितीताई तटकरे", en: "Aditi Tatkare", hi: "अदिति तटकरे" } as L,
  photo: "/brand/aditi-tatkare-new.webp",
  roles: [
    { mr: "महिला व बालविकास मंत्री, महाराष्ट्र राज्य", en: "Minister of Women and Child Development, Maharashtra", hi: "महिला एवं बाल विकास मंत्री, महाराष्ट्र" },
    { mr: "आमदार, श्रीवर्धन विधानसभा मतदारसंघ", en: "MLA, Shrivardhan Assembly Constituency", hi: "विधायक, श्रीवर्धन विधानसभा क्षेत्र" },
  ] as L[],
  credit: {
    mr: "मंत्री आदिती तटकरे यांच्या पुढाकाराने",
    en: "An initiative by Aditi Tatkare",
    hi: "विधायक अदिति तटकरे की पहल",
  } as L,
  bio: {
    mr: "आदिती तटकरे यांचा जन्म 1988 मध्ये झाला आणि त्या रायगड जिल्ह्यातल्या कोलाड आणि रोह्यात लहानाच्या मोठ्या झाल्या. त्यांनी मुंबई विद्यापीठातून राज्यशास्त्रात MA केलं. रायगड जिल्हा परिषदेच्या अध्यक्ष म्हणून काम सुरू करून त्या 2019 मध्ये श्रीवर्धनच्या आमदार झाल्या आणि 2023 पासून महिला व बालविकास मंत्री आहेत. 2024 मध्ये श्रीवर्धनने त्यांना 72% मतांनी पुन्हा निवडून दिलं.",
    en: "Aditi Tatkare was born in 1988 and grew up in Kolad and Roha in Raigad district. She holds an MA in Political Science from the University of Mumbai. She began as President of the Raigad Zilla Parishad, became MLA for Shrivardhan in 2019, and has been Minister for Women & Child Development since 2023. In 2024 Shrivardhan re-elected her with 72% of the vote.",
    hi: "अदिति तटकरे का जन्म 1988 में हुआ और वे रायगड ज़िले के कोलाड और रोहा में पली-बढ़ीं। उन्होंने मुंबई विश्वविद्यालय से राजनीति विज्ञान में MA किया। रायगड ज़िला परिषद की अध्यक्ष के रूप में शुरुआत कर वे 2019 में श्रीवर्धन की विधायक बनीं और 2023 से महिला एवं बाल विकास मंत्री हैं। 2024 में श्रीवर्धन ने उन्हें 72% वोटों से फिर चुना।",
  } as L,
  whyApp: {
    mr: "‘आधी ती’ हा श्रीवर्धनमधील प्रत्येक महिला आणि मुलीच्या सुरक्षितता, आर्थिक संरक्षण आणि कौशल्यासाठीचा उपक्रम आहे. \nतिच्या प्रत्येक प्रश्नाचे उत्तर तिच्याच भाषेत, तिच्याच मोबाईलवर.",
    en: "AADHI TI is her initiative for every woman and girl in Shrivardhan. It answers every question about safety, financial security and skills, in the user's own language, on her own phone. Shrivardhan first, then the whole of Raigad district.",
    hi: "AADHI TI श्रीवर्धन की हर महिला और लड़की के लिए उनकी पहल है: सुरक्षा, आर्थिक सुरक्षा और कौशल का हर सवाल, उसकी भाषा में, उसके फ़ोन पर। पहले श्रीवर्धन में, फिर पूरे रायगड में।",
  } as L,
};

export const initiatives: { id: string; title: L; body: L; href: string; cta: L }[] = [
  {
    id: "ladki-bahin",
    title: { mr: "मुख्यमंत्री माझी लाडकी बहीण योजना", en: "Mukhyamantri Majhi Ladki Bahin Yojana", hi: "मुख्यमंत्री माझी लाडकी बहीण योजना" },
    body: {
      mr: "21 ते 65 वयाच्या पात्र महिलांना दरमहा ₹1,500 थेट बँक खात्यात. महाराष्ट्रातल्या सुमारे अडीच कोटी महिलांपर्यंत पोहोचलेली देशातली सर्वात मोठी महिला थेट लाभ योजना.",
      en: "₹1,500 a month straight into the bank accounts of eligible women aged 21 to 65. India's largest direct-benefit scheme for women, reaching about 2.5 crore women in Maharashtra.",
      hi: "21 से 65 साल की पात्र महिलाओं को हर महीने ₹1,500 सीधे बैंक खाते में। देश की सबसे बड़ी महिला प्रत्यक्ष लाभ योजना, महाराष्ट्र की लगभग ढाई करोड़ महिलाओं तक।",
    },
    href: "/chat?topic=ladki_bahin",
    cta: { mr: "मी पात्र आहे का?", en: "Am I eligible?", hi: "क्या मैं पात्र हूँ?" },
  },
  {
    id: "adishakti",
    title: { mr: "आदिशक्ती अभियान", en: "Adishakti Abhiyan", hi: "आदिशक्ति अभियान" },
    body: {
      mr: "गाव ते राज्य पातळीवर समित्या: कुपोषण, माता-बालमृत्यू, बालविवाह आणि महिलांवरील हिंसा थांबवण्यासाठी, आणि ग्रामपंचायतीत महिलांचा सहभाग वाढवण्यासाठी. उत्तम काम करणाऱ्या ग्रामपंचायतींना आदिशक्ती पुरस्कार.",
      en: "Committees from village to state level to end malnutrition, maternal and infant deaths, child marriage and violence against women, and to bring more women into the gram panchayat. Adishakti Awards for the best gram panchayats.",
      hi: "गाँव से राज्य स्तर तक समितियाँ: कुपोषण, मातृ-शिशु मृत्यु, बाल विवाह और महिलाओं पर हिंसा रोकने के लिए, और ग्राम पंचायत में महिलाओं की भागीदारी बढ़ाने के लिए। अच्छा काम करने वाली पंचायतों को आदिशक्ति पुरस्कार।",
    },
    href: "/schemes#adishakti",
    cta: { mr: "अभियानाची माहिती", en: "About the campaign", hi: "अभियान की जानकारी" },
  },
  {
    id: "single-women",
    title: { mr: "एकल महिला धोरण", en: "Single Women Policy", hi: "एकल महिला नीति" },
    body: {
      mr: "विधवा, घटस्फोटित, विभक्त आणि अविवाहित महिलांसाठी स्वतंत्र धोरण, ज्यामुळे त्यांना योजना, शिक्षण, आरोग्य आणि रोजगार सहज मिळेल. असं धोरण असणारं महाराष्ट्र देशातलं पहिलं राज्य ठरणार आहे. धोरणाचा मसुदा तयार होत आहे.",
      en: "A dedicated policy for widowed, divorced, separated and unmarried women, so schemes, education, health and work reach them more easily. It would make Maharashtra the first state with such a policy. The draft is being prepared.",
      hi: "विधवा, तलाकशुदा, अलग रह रही और अविवाहित महिलाओं के लिए अलग नीति, ताकि योजनाएँ, शिक्षा, सेहत और रोज़गार उन तक आसानी से पहुँचें। ऐसी नीति वाला महाराष्ट्र देश का पहला राज्य होगा। मसौदा तैयार हो रहा है।",
    },
    href: "/schemes#single-women",
    cta: { mr: "एकल महिलांसाठी योजना", en: "Schemes for single women", hi: "एकल महिलाओं के लिए योजनाएँ" },
  },
  {
    id: "child-marriage",
    title: { mr: "बालविवाहमुक्त महाराष्ट्र", en: "Child Marriage-Free Maharashtra", hi: "बाल विवाह मुक्त महाराष्ट्र" },
    body: {
      mr: "बालविवाहाबद्दल शून्य सहनशीलता: आई-वडिलांबरोबरच लग्न लावणारे, मध्यस्थ आणि उपस्थित पाहुणे यांच्यावरही गुन्हा. लोकांच्या मदतीने दरवर्षी 1,400 हून अधिक बालविवाह रोखले गेले.",
      en: "Zero tolerance for child marriage: cases against the priest, the middlemen and the guests, not only the parents. With people's help, more than 1,400 child marriages have been stopped each year.",
      hi: "बाल विवाह पर शून्य सहनशीलता: माता-पिता के साथ शादी कराने वाले, बिचौलिए और मेहमानों पर भी केस। लोगों की मदद से हर साल 1,400 से ज़्यादा बाल विवाह रोके गए।",
    },
    href: "/chat?topic=child_marriage",
    cta: { mr: "बालविवाह रोखायचा आहे? 1098", en: "Stop a child marriage: 1098", hi: "बाल विवाह रोकें: 1098" },
  },
  {
    id: "anganwadi",
    title: { mr: "अंगणवाडी मजबूत करणं", en: "Stronger Anganwadis", hi: "मज़बूत आंगनवाड़ी" },
    body: {
      mr: "अंगणवाडी मदतनिसांच्या 14,690 जागांची भरती, वीज नसलेल्या अंगणवाड्यांसाठी सौरऊर्जा, सेविकांना मोबाइल फोन, आणि दुर्गम आदिवासी भागात नव्या अंगणवाड्या.",
      en: "Recruitment for 14,690 Anganwadi helper posts, solar power for Anganwadis without electricity, mobile phones for sevikas, and new centres in remote tribal areas.",
      hi: "आंगनवाड़ी सहायिकाओं के 14,690 पदों पर भर्ती, बिना बिजली वाली आंगनवाड़ियों के लिए सौर ऊर्जा, सेविकाओं को मोबाइल फ़ोन, और दूरदराज़ आदिवासी इलाकों में नए केंद्र।",
    },
    href: "/poshan",
    cta: { mr: "अंगणवाडीत काय मिळतं", en: "What the Anganwadi gives", hi: "आंगनवाड़ी में क्या मिलता है" },
  },
  {
    id: "aadhi-ti",
    title: { mr: "आधी ती · AADHI TI", en: "AADHI TI", hi: "आधी ती · AADHI TI" },
    body: {
      mr: "श्रीवर्धनमधल्या महिलांसाठी मराठी, हिंदी आणि इंग्रजीत माहिती आणि मदत: सुरक्षा, आर्थिक सुरक्षा आणि कौशल्य. नाव किंवा नंबर न देता, 24 तास.",
      en: "Information and support for the women of Shrivardhan in Marathi, Hindi and English: safety, security and skill. Any time, without giving a name or number.",
      hi: "श्रीवर्धन की महिलाओं के लिए मराठी, हिंदी और अंग्रेज़ी में जानकारी और मदद: सुरक्षा, आर्थिक सुरक्षा और कौशल। बिना नाम या नंबर दिए, 24 घंटे।",
    },
    href: "/chat",
    cta: { mr: "आत्ता विचारा", en: "Ask now", hi: "अभी पूछें" },
  },
];

export const journey: { year: string; text: L }[] = [
  { year: "2017", text: { mr: "रायगड जिल्हा परिषदेच्या अध्यक्ष", en: "President, Raigad Zilla Parishad", hi: "अध्यक्ष, रायगड ज़िला परिषद" } },
  { year: "2019", text: { mr: "श्रीवर्धनच्या आमदार म्हणून पहिल्यांदा निवड; राज्यमंत्री (उद्योग, पर्यटन, क्रीडा आणि इतर खाती)", en: "First elected MLA for Shrivardhan; Minister of State (Industries, Tourism, Sports and more)", hi: "पहली बार श्रीवर्धन की विधायक; राज्य मंत्री (उद्योग, पर्यटन, खेल और अन्य)" } },
  { year: "2020", text: { mr: "रायगड जिल्ह्याच्या पालकमंत्री (2022 पर्यंत)", en: "Guardian Minister of Raigad district (until 2022)", hi: "रायगड ज़िले की पालक मंत्री (2022 तक)" } },
  { year: "2023", text: { mr: "महिला व बालविकास मंत्री; शिंदे-फडणवीस सरकारमधल्या पहिल्या महिला मंत्री", en: "Minister for Women & Child Development; the first woman minister in the Shinde–Fadnavis government", hi: "महिला एवं बाल विकास मंत्री; शिंदे-फडणवीस सरकार की पहली महिला मंत्री" } },
  { year: "2024", text: { mr: "72% मतांनी श्रीवर्धनमधून पुन्हा विजयी; महिला व बालविकास मंत्रिपद कायम", en: "Re-elected from Shrivardhan with 72% of the vote; continues as Women & Child Development Minister", hi: "72% वोटों से श्रीवर्धन से फिर विजयी; महिला एवं बाल विकास मंत्री बनी रहीं" } },
];

// The "An initiative by" banner at the top of the home page.
export const initiativeBanner = {
  by: { mr: "एक उपक्रम", en: "An initiative by", hi: "एक पहल" } as L,
  name: { mr: "मा. आदिती वरदा सुनील तटकरे", en: "Hon'ble Minister Ms. Aditi Tai Varda Sunil Tatkare", hi: "माननीय मंत्री सुश्री अदिति ताई वरदा सुनील तटकरे" } as L,
  lines: [
    { mr: "मंत्री, महिला व बाल विकास, महाराष्ट्र राज्य", en: "Cabinet Minister, Women and Child Development, Government of Maharashtra", hi: "कैबिनेट मंत्री, महाराष्ट्र सरकार" },
    { mr: "", en: "", hi: "महिला एवं बाल विकास मंत्री" },
    { mr: "आमदार, श्रीवर्धन विधानसभा मतदारसंघ", en: "MLA, Shrivardhan Assembly Constituency", hi: "विधायक, श्रीवर्धन विधानसभा क्षेत्र" },
  ] as L[],
};
