// Poshan (nutrition) content for AADHI TI, copied from the prototype extract.
// Sources: poshan_tips.json (PO_TIPS, STAGE_L), nutrition_guides.json (PO_GUIDES), myths.json (PO_MYTHS),
// local_foods.json (PO_FOODS; cost notes are approximate), poshan_week.json (PO_WEEK),
// food_cautions.json (PK_CAUTIONS; not stated as medically reviewed).
// Citation strings (src) exist in English only in the source.
import type { L } from "@/lib/kb";

export type Stage = "pregnant_t1" | "pregnant_t2" | "pregnant_t3" | "lactating" | "child_0_6m" | "child_6_12m" | "child_1_3y" | "child_3_6y" | "child_6_10y" | "girl_10_18" | "woman" | "elder" | "family";

export type PoshanTip = { id: string; stages: Stage[]; title: L; body: L; forMe: L; art: string; src: string };
export type GuideCard = { title: L; body: L; forMe: L };
export type NutritionGuide = { id: string; title: L; intro: L; stages: Stage[]; cards: GuideCard[]; warning: L; src: string };
export type Myth = { id: string; myth: L; fact: L; forMe: L; src: string };
export type Nutrient = "b12" | "calcium" | "energy" | "fibre" | "healthy_fat" | "iodine" | "iron" | "protein" | "vit_a" | "vit_c";
export type LocalFood = { id: string; ingredient: string; name: L; why: L; howToUse: L; costNote: L; season?: L; highlights: Nutrient[]; art: string };
export type WeekDay = { day: number; theme: L; action: L; food: L; art: string };
export type FoodCaution = { id: string; ingredients: string[]; underMonths?: number; pregnancy?: boolean; text: L };

export const stageLabels: Record<Stage, L> = {
  "pregnant_t1": {
    "mr": "गरोदर, पहिले 3 महिने",
    "hi": "गर्भवती, पहले 3 महीने",
    "en": "Pregnant, months 1-3"
  },
  "pregnant_t2": {
    "mr": "गरोदर, 4 ते 6 महिने",
    "hi": "गर्भवती, 4 से 6 महीने",
    "en": "Pregnant, months 4-6"
  },
  "pregnant_t3": {
    "mr": "गरोदर, 7 ते 9 महिने",
    "hi": "गर्भवती, 7 से 9 महीने",
    "en": "Pregnant, months 7-9"
  },
  "lactating": {
    "mr": "बाळाला दूध पाजणारी आई",
    "hi": "स्तनपान कराने वाली माँ",
    "en": "Breastfeeding mother"
  },
  "child_0_6m": {
    "mr": "बाळ, 0 ते 6 महिने",
    "hi": "शिशु, 0 से 6 महीने",
    "en": "Baby, 0 to 6 months"
  },
  "child_6_12m": {
    "mr": "बाळ, 6 ते 12 महिने",
    "hi": "शिशु, 6 से 12 महीने",
    "en": "Baby, 6 to 12 months"
  },
  "child_1_3y": {
    "mr": "मूल, 1 ते 3 वर्षं",
    "hi": "बच्चा, 1 से 3 साल",
    "en": "Child, 1 to 3 years"
  },
  "child_3_6y": {
    "mr": "मूल, 3 ते 6 वर्षं",
    "hi": "बच्चा, 3 से 6 साल",
    "en": "Child, 3 to 6 years"
  },
  "child_6_10y": {
    "mr": "मूल, 6 ते 10 वर्षं",
    "hi": "बच्चा, 6 से 10 साल",
    "en": "Child, 6 to 10 years"
  },
  "girl_10_18": {
    "mr": "किशोरवयीन मुलगी",
    "hi": "किशोरी",
    "en": "Teenage girl"
  },
  "woman": {
    "mr": "महिला",
    "hi": "महिला",
    "en": "Woman"
  },
  "elder": {
    "mr": "ज्येष्ठ व्यक्ती",
    "hi": "बुज़ुर्ग",
    "en": "Elder"
  },
  "family": {
    "mr": "सगळं कुटुंब",
    "hi": "पूरा परिवार",
    "en": "Whole family"
  }
};

export const stageOrder: Stage[] = [
  "pregnant_t1",
  "pregnant_t2",
  "pregnant_t3",
  "lactating",
  "child_0_6m",
  "child_6_12m",
  "child_1_3y",
  "child_3_6y",
  "child_6_10y",
  "girl_10_18",
  "woman",
  "elder",
  "family"
];

/** Nutrient tags on local foods are English keys in the source; these labels were added for display. */
export const nutrientLabels: Record<Nutrient, L> = {
  iron: { mr: "लोह", en: "Iron", hi: "आयरन" },
  calcium: { mr: "कॅल्शियम", en: "Calcium", hi: "कैल्शियम" },
  protein: { mr: "प्रथिनं", en: "Protein", hi: "प्रोटीन" },
  fibre: { mr: "फायबर", en: "Fibre", hi: "फ़ाइबर" },
  energy: { mr: "ऊर्जा", en: "Energy", hi: "ऊर्जा" },
  healthy_fat: { mr: "चांगली स्निग्धता", en: "Healthy fat", hi: "अच्छी वसा" },
  iodine: { mr: "आयोडीन", en: "Iodine", hi: "आयोडीन" },
  vit_a: { mr: "जीवनसत्त्व A", en: "Vitamin A", hi: "विटामिन A" },
  vit_c: { mr: "जीवनसत्त्व C", en: "Vitamin C", hi: "विटामिन C" },
  b12: { mr: "जीवनसत्त्व B12", en: "Vitamin B12", hi: "विटामिन B12" },
};

export const poshanTips: PoshanTip[] = [
  {
    "id": "preg_iron_vitc",
    "stages": [
      "pregnant_t1",
      "pregnant_t2",
      "pregnant_t3",
      "lactating"
    ],
    "title": {
      "mr": "लोहयुक्त अन्नासोबत लिंबू",
      "hi": "आयरन वाले खाने के साथ नींबू",
      "en": "Iron foods with lemon"
    },
    "body": {
      "mr": "पालेभाज्या, डाळी, अंडी आणि मासे यांतून लोह मिळतं. जेवणासोबत लिंबू, आवळा किंवा पेरू खाल्ला तर शरीराला जास्त लोह मिळतं.",
      "hi": "हरी पत्तेदार सब्ज़ियों, दालों, अंडे और मछली से आयरन मिलता है। खाने के साथ नींबू, आँवला या अमरूद लें, तो शरीर को ज़्यादा आयरन मिलता है।",
      "en": "Green leafy vegetables, dals, eggs and fish give iron. Lemon, amla or guava with the meal helps your body take in more iron."
    },
    "forMe": {
      "mr": "आज तुमच्या वरणावर किंवा भाजीवर लिंबू पिळा.",
      "hi": "आज अपनी दाल या सब्ज़ी पर नींबू निचोड़ें।",
      "en": "Squeeze lemon on your dal or bhaji today."
    },
    "art": "citrus",
    "src": "ICMR-NIN Dietary Guidelines for Indians 2024"
  },
  {
    "id": "preg_iron_foods",
    "stages": [
      "pregnant_t1",
      "pregnant_t2",
      "pregnant_t3"
    ],
    "title": {
      "mr": "घरच्या अन्नातून लोह",
      "hi": "घर के खाने से आयरन",
      "en": "Iron from local food"
    },
    "body": {
      "mr": "मेथीसारख्या पालेभाज्या, बाजरी, डाळी, मोड आलेली कडधान्यं, अंडी, मासे आणि मांस यांतून लोह मिळतं. रोज यातलं काहीतरी खा.",
      "hi": "मेथी जैसी हरी सब्ज़ियों, बाजरे, दालों, अंकुरित मूँग-मोठ, अंडे, मछली और मांस से आयरन मिलता है। रोज़ इनमें से कुछ खाएँ।",
      "en": "Methi and other greens, bajra, dals, sprouts, eggs, fish and meat all give iron. Eat some every day."
    },
    "forMe": {
      "mr": "आजच्या वरणात मूठभर मेथी किंवा शेवग्याची पानं घाला.",
      "hi": "आज की दाल में मुट्ठी भर मेथी या सहजन के पत्ते डालें।",
      "en": "Add a handful of methi or shevga leaves to today's dal."
    },
    "art": "leafy",
    "src": "ICMR-NIN Dietary Guidelines for Indians 2024"
  },
  {
    "id": "preg_extra_meal",
    "stages": [
      "pregnant_t2",
      "pregnant_t3"
    ],
    "title": {
      "mr": "रोज एक जास्तीचं छोटं जेवण",
      "hi": "रोज़ एक छोटा खाना और",
      "en": "One extra small meal"
    },
    "body": {
      "mr": "चौथ्या महिन्यापासून शरीराला थोडं जास्त अन्न लागतं. रोज एक छोटं जेवण वाढवा, जसं उसळ, वरण-भाकरी किंवा एखादं फळ.",
      "hi": "चौथे महीने से शरीर को थोड़ा ज़्यादा खाना चाहिए। रोज़ एक छोटा खाना और जोड़ें, जैसे दाल-रोटी, भाकरी-सब्ज़ी या कोई फल।",
      "en": "From the 4th month, your body needs a little more food. Add one extra small meal each day, like usal, bhakri with dal, or a fruit."
    },
    "forMe": {
      "mr": "आज दुपारसाठी एक छोटं जेवण तयार ठेवा, जसं शेंगदाणे घालून पोहे किंवा केळं.",
      "hi": "आज दोपहर के लिए कुछ हल्का तैयार रखें, जैसे मूँगफली वाले पोहे या केला।",
      "en": "Keep a small meal ready for the afternoon today, like poha with peanuts or a banana."
    },
    "art": "plate",
    "src": "ICMR-NIN Dietary Guidelines for Indians 2024"
  },
  {
    "id": "preg_checkups",
    "stages": [
      "pregnant_t1",
      "pregnant_t2",
      "pregnant_t3"
    ],
    "title": {
      "mr": "किमान 4 तपासण्या",
      "hi": "कम से कम 4 जाँच",
      "en": "At least 4 check-ups"
    },
    "body": {
      "mr": "गरोदरपणात किमान 4 तपासण्या करून घ्या. ANM किंवा डॉक्टर तुमचं वजन, रक्तदाब आणि रक्त तपासतात.",
      "hi": "गर्भावस्था में कम से कम 4 जाँच ज़रूर कराएँ। ANM या डॉक्टर आपका वज़न, ब्लड प्रेशर और खून जाँचते हैं।",
      "en": "Go for at least 4 check-ups in pregnancy. The ANM or doctor checks your weight, blood pressure and blood."
    },
    "forMe": {
      "mr": "पुढच्या तपासणीची तारीख आज लिहून ठेवा.",
      "hi": "अगली जाँच की तारीख़ आज लिख लें।",
      "en": "Write down the date of your next check-up today."
    },
    "art": "clock",
    "src": "MoHFW Mother and Child Protection card"
  },
  {
    "id": "preg_ifa",
    "stages": [
      "pregnant_t2",
      "pregnant_t3",
      "lactating"
    ],
    "title": {
      "mr": "IFA गोळ्या मोफत मिळतात",
      "hi": "IFA की गोलियाँ मुफ़्त",
      "en": "IFA tablets, free"
    },
    "body": {
      "mr": "आरोग्य केंद्रात लोह आणि फॉलिक ॲसिडच्या (IFA) गोळ्या मोफत मिळतात. ANM किंवा डॉक्टर सांगतील तशा घ्या आणि काही त्रास झाला तर त्यांना सांगा.",
      "hi": "स्वास्थ्य केंद्र पर आयरन और फ़ोलिक एसिड (IFA) की गोलियाँ मुफ़्त मिलती हैं। ANM या डॉक्टर जैसा बताएँ, वैसे लें, और कोई तकलीफ़ हो तो उन्हें बताएँ।",
      "en": "The health centre gives iron and folic acid (IFA) tablets free. Take them as the ANM or doctor tells you, and tell them if you face any trouble."
    },
    "forMe": {
      "mr": "आज बघा, घरात IFA गोळ्या आहेत ना.",
      "hi": "आज देख लें कि घर में IFA की गोलियाँ हैं या नहीं।",
      "en": "Check today that you have your IFA tablets at home."
    },
    "art": "mother",
    "src": "Anemia Mukt Bharat"
  },
  {
    "id": "preg_iodised_salt",
    "stages": [
      "pregnant_t1",
      "pregnant_t2",
      "pregnant_t3"
    ],
    "title": {
      "mr": "आयोडीनयुक्त मीठ वापरा",
      "hi": "आयोडीन वाला नमक लें",
      "en": "Use iodised salt"
    },
    "body": {
      "mr": "बाळाच्या मेंदूच्या वाढीसाठी आयोडीन गरजेचं आहे. मीठ जास्त नको, फक्त आयोडीनयुक्त वापरा आणि झाकणाच्या डब्यात ठेवा.",
      "hi": "बच्चे के दिमाग़ के विकास के लिए आयोडीन ज़रूरी है। नमक ज़्यादा नहीं, बस आयोडीन वाला लें और ढक्कन वाले डिब्बे में रखें।",
      "en": "Your baby needs iodine for brain growth. Use iodised salt, not more salt, and keep it in a closed box."
    },
    "forMe": {
      "mr": "घरच्या मिठाच्या पाकिटावर \"आयोडीनयुक्त\" लिहिलं आहे का ते बघा.",
      "hi": "घर के नमक के पैकेट पर \"आयोडीन युक्त\" लिखा है या नहीं, देखें।",
      "en": "Check the salt packet at home for the word \"iodised\"."
    },
    "art": "salt",
    "src": "ICMR-NIN Dietary Guidelines for Indians 2024"
  },
  {
    "id": "preg_cooked_food",
    "stages": [
      "pregnant_t1",
      "pregnant_t2",
      "pregnant_t3"
    ],
    "title": {
      "mr": "अंडी, मासे, मांस नीट शिजवा",
      "hi": "अंडा, मछली, मांस अच्छी तरह पकाएँ",
      "en": "Cook eggs, fish and meat well"
    },
    "body": {
      "mr": "अंडी, मासे आणि मांसातून प्रथिनं मिळतात, गरोदरपणात ते पूर्ण शिजवूनच खा. हे खात नसाल तर रोज डाळ, उसळ, दूध किंवा दही खा.",
      "hi": "अंडा, मछली और मांस से प्रोटीन मिलता है, गर्भावस्था में इन्हें पूरी तरह पकाकर ही खाएँ। अगर आप ये नहीं खातीं, तो रोज़ दाल, दूध या दही लें।",
      "en": "Eggs, fish and meat give protein, so cook them fully in pregnancy. If you do not eat them, have dal, usal, milk or curd daily."
    },
    "forMe": {
      "mr": "आज अंडं खाल्लं तर पिवळा बलक घट्ट होईपर्यंत उकडून खा.",
      "hi": "आज अंडा खाएँ तो उसे तब तक उबालें जब तक पीला भाग सख़्त न हो जाए।",
      "en": "If you eat an egg today, boil it until the yolk is firm."
    },
    "art": "egg",
    "src": "ICMR-NIN Dietary Guidelines for Indians 2024"
  },
  {
    "id": "preg_rest",
    "stages": [
      "pregnant_t1",
      "pregnant_t2",
      "pregnant_t3"
    ],
    "title": {
      "mr": "विश्रांतीही गरजेची",
      "hi": "आराम भी ज़रूरी है",
      "en": "Rest is part of care"
    },
    "body": {
      "mr": "तुमचं शरीर बाळासाठी खूप काम करत आहे. दिवसा थोडी विश्रांती घ्या, रात्री नीट झोपा आणि जड कामं वाटून घ्या.",
      "hi": "आपका शरीर बच्चे के लिए बहुत मेहनत कर रहा है। दिन में थोड़ा आराम करें, रात को अच्छी नींद लें और भारी काम बाँट लें।",
      "en": "Your body is working hard for your baby. Rest a little in the day, sleep well at night, and share heavy work."
    },
    "forMe": {
      "mr": "आज घरातल्या कोणाला तरी पाणी किंवा जड ओझं उचलायला सांगा.",
      "hi": "आज घर में किसी से पानी या भारी सामान उठाने को कहें।",
      "en": "Today, ask someone at home to carry the water or heavy loads."
    },
    "art": "sun",
    "src": "MoHFW Mother and Child Protection card"
  },
  {
    "id": "bf_first_hour",
    "stages": [
      "pregnant_t3",
      "child_0_6m"
    ],
    "title": {
      "mr": "जन्मानंतर 1 तासाच्या आत स्तनपान",
      "hi": "जन्म के 1 घंटे के अंदर स्तनपान",
      "en": "Breastfeed within 1 hour"
    },
    "body": {
      "mr": "जन्मानंतर 1 तासाच्या आत बाळाला छातीशी लावा. पहिलं पिवळं दूध बाळाचं रक्षण करायला मदत करतं.",
      "hi": "जन्म के 1 घंटे के अंदर बच्चे को स्तनपान कराएँ। पहला पीला दूध बच्चे को बीमारियों से बचाने में मदद करता है।",
      "en": "Put the baby to the breast within 1 hour of birth. The first yellow milk helps protect the baby."
    },
    "forMe": {
      "mr": "आत्ताच घरच्यांना आणि नर्सला सांगून ठेवा: 1 तासाच्या आत आईचं दूध, त्याआधी दुसरं काहीही नाही.",
      "hi": "अभी से परिवार और नर्स को बता दें: 1 घंटे के अंदर माँ का दूध, उससे पहले कुछ और नहीं।",
      "en": "Tell your family and the nurse now: breast milk within 1 hour, nothing else before it."
    },
    "art": "baby",
    "src": "WHO/UNICEF infant and young child feeding"
  },
  {
    "id": "bf_only_milk",
    "stages": [
      "child_0_6m",
      "lactating"
    ],
    "title": {
      "mr": "6 महिने फक्त आईचं दूध",
      "hi": "6 महीने सिर्फ़ माँ का दूध",
      "en": "Only breast milk for 6 months"
    },
    "body": {
      "mr": "पहिले 6 महिने फक्त आईचं दूध द्या, उन्हाळ्यातही पाणी नको. बाळाला लागणारं सगळं पाणी आईच्या दुधात असतं.",
      "hi": "पहले 6 महीने सिर्फ़ माँ का दूध दें, गर्मी में भी पानी नहीं। बच्चे को जितना पानी चाहिए, वह माँ के दूध में होता है।",
      "en": "For the first 6 months, give only breast milk, not even water in summer. Breast milk has all the water the baby needs."
    },
    "forMe": {
      "mr": "आज बाळाला पाणी, मध किंवा बाळगुटी देऊ नका. फक्त आईचं दूध.",
      "hi": "आज बच्चे को पानी, शहद या घुट्टी न दें। सिर्फ़ माँ का दूध।",
      "en": "Today, give no water, honey or ghutti. Only breast milk."
    },
    "art": "baby",
    "src": "WHO/UNICEF infant and young child feeding"
  },
  {
    "id": "bf_feed_often",
    "stages": [
      "child_0_6m",
      "lactating"
    ],
    "title": {
      "mr": "दिवस-रात्र वारंवार पाजा",
      "hi": "दिन-रात बार-बार दूध पिलाएँ",
      "en": "Feed often, day and night"
    },
    "body": {
      "mr": "बाळाला हवं तेव्हा, दिवसा आणि रात्रीही पाजा. बाळ जितकं जास्त पितं, तितकं जास्त दूध येतं.",
      "hi": "बच्चा जब चाहे, दिन हो या रात, दूध पिलाएँ। बच्चा जितना ज़्यादा पीता है, उतना ज़्यादा दूध बनता है।",
      "en": "Feed whenever the baby wants, day and night. The more the baby feeds, the more milk you make."
    },
    "forMe": {
      "mr": "आज भुकेची चिन्हं ओळखा: बाळ हात चोखतं किंवा छातीकडे तोंड वळवतं.",
      "hi": "आज भूख के इशारे देखें: बच्चा हाथ चूसे या छाती की ओर मुँह घुमाए।",
      "en": "Watch for hunger signs today, like sucking on hands or turning to the breast."
    },
    "art": "mother",
    "src": "WHO/UNICEF infant and young child feeding"
  },
  {
    "id": "lact_eat_more",
    "stages": [
      "lactating",
      "child_0_6m"
    ],
    "title": {
      "mr": "थोडं जास्त जेवा",
      "hi": "थोड़ा ज़्यादा खाएँ",
      "en": "Eat a little more"
    },
    "body": {
      "mr": "दूध तयार व्हायला शरीराला जास्त अन्न लागतं. आधीपेक्षा थोडं जास्त जेवा: डाळ, पालेभाजी आणि दूध किंवा दही.",
      "hi": "दूध बनाने के लिए शरीर को ज़्यादा खाना चाहिए। पहले से थोड़ा ज़्यादा खाएँ: दाल, हरी सब्ज़ी और दूध या दही।",
      "en": "Making breast milk needs extra food. Eat a little more than before, with dal, greens, and milk or curd."
    },
    "forMe": {
      "mr": "आज दुपारच्या जेवणात एक वाटी वरण किंवा दही वाढवा.",
      "hi": "आज दोपहर के खाने में एक कटोरी दाल या दही बढ़ाएँ।",
      "en": "Add a bowl of dal or curd to your lunch today."
    },
    "art": "thali",
    "src": "ICMR-NIN Dietary Guidelines for Indians 2024"
  },
  {
    "id": "lact_water",
    "stages": [
      "lactating",
      "child_0_6m"
    ],
    "title": {
      "mr": "वारंवार पाणी प्या",
      "hi": "बार-बार पानी पिएँ",
      "en": "Drink water often"
    },
    "body": {
      "mr": "स्तनपानामुळे तहान लागते. तहान लागेल तेव्हा स्वच्छ पाणी प्या.",
      "hi": "स्तनपान से प्यास लगती है। जब भी प्यास लगे, साफ़ पानी पिएँ।",
      "en": "Breastfeeding makes you thirsty. Drink clean water whenever you feel thirsty."
    },
    "forMe": {
      "mr": "बाळाला पाजता तिथे झाकलेलं स्वच्छ पाण्याचं भांडं ठेवा.",
      "hi": "जहाँ आप बच्चे को दूध पिलाती हैं, वहाँ ढका हुआ साफ़ पानी रखें।",
      "en": "Keep a covered glass of clean water where you feed the baby."
    },
    "art": "water",
    "src": "ICMR-NIN Dietary Guidelines for Indians 2024"
  },
  {
    "id": "bf_to_two_years",
    "stages": [
      "child_6_12m",
      "child_1_3y",
      "lactating"
    ],
    "title": {
      "mr": "2 वर्षं किंवा त्याहून जास्त स्तनपान",
      "hi": "2 साल या उससे आगे तक स्तनपान",
      "en": "Breastfeed to 2 years or beyond"
    },
    "body": {
      "mr": "6 महिन्यांनंतर अन्नासोबत स्तनपानही चालू ठेवा. 2 वर्षं किंवा त्याहून जास्त काळ पाजा.",
      "hi": "6 महीने के बाद खाने के साथ स्तनपान भी जारी रखें। 2 साल या उससे आगे तक पिलाएँ।",
      "en": "After 6 months, give food and keep breastfeeding. Continue to 2 years or beyond."
    },
    "forMe": {
      "mr": "आज नेहमीसारखं पाजा आणि जेवणही द्या.",
      "hi": "आज भी हमेशा की तरह दूध पिलाएँ और खाना भी दें।",
      "en": "Breastfeed as usual today, and give food too."
    },
    "art": "mother",
    "src": "WHO/UNICEF infant and young child feeding"
  },
  {
    "id": "cf_start",
    "stages": [
      "child_6_12m"
    ],
    "title": {
      "mr": "6 महिन्यांपासून वरचं अन्न",
      "hi": "6 महीने से ऊपरी आहार",
      "en": "Start food at 6 months"
    },
    "body": {
      "mr": "6 महिन्यांनंतर फक्त आईचं दूध पुरेसं नसतं. मऊ, कुस्करलेलं घरचं अन्न सुरू करा, जसं वरण-भात किंवा खिचडी.",
      "hi": "6 महीने के बाद सिर्फ़ माँ का दूध काफ़ी नहीं होता। नरम, मसला हुआ घर का खाना शुरू करें, जैसे दाल-चावल या खिचड़ी।",
      "en": "At 6 months, breast milk alone is not enough. Start soft, mashed home food like dal-rice or khichdi."
    },
    "forMe": {
      "mr": "आज थोडा वरण-भात नीट कुस्करून स्वच्छ चमच्याने भरवा.",
      "hi": "आज थोड़े दाल-चावल अच्छी तरह मसलकर साफ़ चम्मच से खिलाएँ।",
      "en": "Mash some dal-rice well today and feed it with a clean spoon."
    },
    "art": "baby",
    "src": "WHO/UNICEF infant and young child feeding"
  },
  {
    "id": "cf_first_foods",
    "stages": [
      "child_6_12m"
    ],
    "title": {
      "mr": "स्वयंपाकघरातलं पहिलं अन्न",
      "hi": "रसोई से पहला खाना",
      "en": "First foods from your kitchen"
    },
    "body": {
      "mr": "कुस्करलेलं केळं, लाल भोपळा, वरण-भात आणि खिचडी हे चांगलं पहिलं अन्न आहे. बाळ मोठं होईल तसं कमी कुस्करा आणि नवे पदार्थ वाढवा.",
      "hi": "मसला हुआ केला, कद्दू, दाल-चावल और खिचड़ी अच्छा पहला खाना है। बच्चा बड़ा हो, तो कम मसलें और नई चीज़ें जोड़ें।",
      "en": "Mashed banana, pumpkin, dal-rice and khichdi are good first foods. As the baby grows, mash less and add more kinds of food."
    },
    "forMe": {
      "mr": "आज बाळासाठी पिकलेलं केळं स्वच्छ चमच्याने कुस्करून द्या.",
      "hi": "आज बच्चे के लिए पका केला साफ़ चम्मच से मसलकर दें।",
      "en": "Mash a ripe banana with a clean spoon for the baby today."
    },
    "art": "banana",
    "src": "WHO/UNICEF infant and young child feeding"
  },
  {
    "id": "cf_thick",
    "stages": [
      "child_6_12m",
      "child_1_3y"
    ],
    "title": {
      "mr": "पातळ नको, घट्ट द्या",
      "hi": "पतला नहीं, गाढ़ा दें",
      "en": "Thick, not watery"
    },
    "body": {
      "mr": "पातळ अन्नाने छोटं पोट भरतं, पण ताकद कमी मिळते. अन्न इतकं घट्ट हवं की चमच्यावर टिकेल.",
      "hi": "पतले खाने से छोटा पेट भर जाता है, पर ताक़त कम मिलती है। खाना इतना गाढ़ा हो कि चम्मच पर टिका रहे।",
      "en": "Watery food fills the small stomach but gives little strength. Food should be thick enough to stay on the spoon."
    },
    "forMe": {
      "mr": "आज चमचा तिरका करून बघा. अन्न चमच्यावर टिकलं तर ते पुरेसं घट्ट आहे.",
      "hi": "आज चम्मच तिरछा करके देखें। खाना टिका रहे तो वह काफ़ी गाढ़ा है।",
      "en": "Tilt the spoon today. If the food stays on, it is thick enough."
    },
    "art": "dal",
    "src": "WHO/UNICEF infant and young child feeding"
  },
  {
    "id": "cf_nachni_satva",
    "stages": [
      "child_6_12m",
      "child_1_3y"
    ],
    "title": {
      "mr": "घट्ट नाचणी सत्त्व",
      "hi": "गाढ़ा नाचनी सत्व",
      "en": "Nachni satva, made thick"
    },
    "body": {
      "mr": "नाचणी सत्त्व हे महाराष्ट्रातलं पारंपरिक बाळ-अन्न आहे आणि नाचणीतून कॅल्शियम मिळतं. ते पातळ नको, घट्ट शिजवा.",
      "hi": "नाचनी सत्व महाराष्ट्र का पारंपरिक बच्चों का खाना है, और रागी से कैल्शियम मिलता है। इसे पतला नहीं, गाढ़ा पकाएँ।",
      "en": "Nachni satva is a traditional first food in Maharashtra, and ragi gives calcium. Cook it thick, not watery."
    },
    "forMe": {
      "mr": "आज नाचणी सत्त्व शिजवून त्यात थोडं तूप घाला.",
      "hi": "आज नाचनी सत्व पकाकर उसमें थोड़ा घी डालें।",
      "en": "Cook nachni satva today and add a little ghee."
    },
    "art": "millet",
    "src": "WHO/UNICEF infant and young child feeding"
  },
  {
    "id": "cf_ghee",
    "stages": [
      "child_6_12m",
      "child_1_3y"
    ],
    "title": {
      "mr": "थोडं तूप किंवा तेल",
      "hi": "थोड़ा घी या तेल",
      "en": "A little ghee or oil"
    },
    "body": {
      "mr": "वाढीसाठी मुलांना ताकद लागते. बाळाच्या अन्नात थोडं तूप किंवा तेल घातलं तर जास्त ताकद मिळते.",
      "hi": "बढ़ने के लिए बच्चों को ताक़त चाहिए। बच्चे के खाने में थोड़ा घी या तेल डालने से ज़्यादा ताक़त मिलती है।",
      "en": "Children need energy to grow. A little ghee or oil in the child's food gives extra energy."
    },
    "forMe": {
      "mr": "आज बाळाच्या खिचडीत थोडं तूप किंवा तेल मिसळा.",
      "hi": "आज बच्चे की खिचड़ी में थोड़ा घी या तेल मिलाएँ।",
      "en": "Mix a little ghee or oil into the child's khichdi today."
    },
    "art": "grain",
    "src": "WHO/UNICEF infant and young child feeding"
  },
  {
    "id": "cf_clean",
    "stages": [
      "child_6_12m",
      "child_1_3y"
    ],
    "title": {
      "mr": "स्वच्छ हात, स्वच्छ वाटी",
      "hi": "साफ़ हाथ, साफ़ कटोरी",
      "en": "Clean hands, clean bowl"
    },
    "body": {
      "mr": "भरवण्याआधी तुमचे आणि बाळाचे हात साबणाने धुवा. स्वच्छ वाटी आणि चमचा वापरा.",
      "hi": "खिलाने से पहले अपने और बच्चे के हाथ साबुन से धोएँ। साफ़ कटोरी और चम्मच लें।",
      "en": "Wash your hands and the child's hands with soap before feeding. Use a clean bowl and spoon."
    },
    "forMe": {
      "mr": "बाळाला भरवता तिथे जवळ साबण ठेवा.",
      "hi": "जहाँ बच्चे को खिलाती हैं, वहीं पास में साबुन रखें।",
      "en": "Keep a soap near the place where you feed the child."
    },
    "art": "hand",
    "src": "WHO/UNICEF infant and young child feeding"
  },
  {
    "id": "cf_cup",
    "stages": [
      "child_6_12m",
      "child_1_3y"
    ],
    "title": {
      "mr": "बाटली नको, कप वापरा",
      "hi": "बोतल नहीं, कप",
      "en": "A cup, not a bottle"
    },
    "body": {
      "mr": "दुधाची बाटली नीट स्वच्छ करणं कठीण असतं, त्यामुळे बाळ आजारी पडू शकतं. स्वच्छ कप, वाटी आणि चमचा वापरा.",
      "hi": "दूध की बोतल को अच्छी तरह साफ़ करना मुश्किल होता है, इससे बच्चा बीमार हो सकता है। साफ़ कप, कटोरी और चम्मच लें।",
      "en": "Feeding bottles are hard to clean and can make the child ill. Use a clean cup, katori and spoon."
    },
    "forMe": {
      "mr": "आज बाळाचा कप आणि चमचा साबणाने आणि स्वच्छ पाण्याने धुवा.",
      "hi": "आज बच्चे का कप और चम्मच साबुन और साफ़ पानी से धोएँ।",
      "en": "Wash the child's cup and spoon with soap and clean water today."
    },
    "art": "plate",
    "src": "WHO/UNICEF infant and young child feeding"
  },
  {
    "id": "tod_family_food",
    "stages": [
      "child_1_3y"
    ],
    "title": {
      "mr": "घरचंच जेवण, कमी तिखट",
      "hi": "घर का ही खाना, कम मसाले वाला",
      "en": "Family food, made mild"
    },
    "body": {
      "mr": "घरात सगळे खातात तेच मूल खाऊ शकतं. तिखट आणि जास्त मीठ घालण्याआधी मुलाचा वाटा बाजूला काढा.",
      "hi": "बच्चा वही खा सकता है जो परिवार खाता है। मिर्च और ज़्यादा नमक डालने से पहले बच्चे का हिस्सा अलग निकाल लें।",
      "en": "Your child can eat what the family eats. Take out the child's share before adding chilli and extra salt."
    },
    "forMe": {
      "mr": "आज दुपारी तिखट घालण्याआधी मुलाचा वाटा बाजूला काढा.",
      "hi": "आज दोपहर में मिर्च डालने से पहले बच्चे का हिस्सा अलग रखें।",
      "en": "At lunch today, keep aside the child's share before adding chilli."
    },
    "art": "thali",
    "src": "WHO/UNICEF infant and young child feeding"
  },
  {
    "id": "tod_small_meals",
    "stages": [
      "child_1_3y"
    ],
    "title": {
      "mr": "थोडं थोडं, अनेकदा",
      "hi": "थोड़ा-थोड़ा, कई बार",
      "en": "Small meals, many times"
    },
    "body": {
      "mr": "छोटं पोट लवकर भरतं. दिवसातून अनेकदा थोडं थोडं जेवण आणि पौष्टिक खाऊ द्या.",
      "hi": "छोटा पेट जल्दी भर जाता है। दिन में कई बार थोड़ा-थोड़ा खाना और पौष्टिक नाश्ता दें।",
      "en": "A small stomach fills quickly. Give small meals and healthy snacks many times a day."
    },
    "forMe": {
      "mr": "आज जेवणांच्या मधल्या वेळेत केळं किंवा वरण-पोळीसारखं काहीतरी द्या.",
      "hi": "आज खानों के बीच केला या दाल-रोटी जैसा कुछ हल्का दें।",
      "en": "Give a small snack between meals today, like a banana or a soft chapati with dal."
    },
    "art": "clock",
    "src": "WHO/UNICEF infant and young child feeding"
  },
  {
    "id": "tod_dal_egg",
    "stages": [
      "child_1_3y"
    ],
    "title": {
      "mr": "रोज डाळ किंवा अंडं",
      "hi": "रोज़ दाल या अंडा",
      "en": "Dal or egg every day"
    },
    "body": {
      "mr": "डाळ, उसळ, अंडं किंवा मासे यांनी मूल सुदृढ वाढतं. यातलं काहीतरी रोज द्या.",
      "hi": "दाल, अंडा या मछली से बच्चा मज़बूत बढ़ता है। इनमें से कुछ रोज़ दें।",
      "en": "Dal, usal, egg or fish help your child grow strong. Give one of these every day."
    },
    "forMe": {
      "mr": "आज मुलाच्या ताटात घट्ट वरण किंवा कुस्करलेलं उकडलेलं अंडं वाढा.",
      "hi": "आज बच्चे की थाली में गाढ़ी दाल या मसला हुआ उबला अंडा दें।",
      "en": "Add thick dal or a mashed boiled egg to the child's plate today."
    },
    "art": "egg",
    "src": "WHO/UNICEF infant and young child feeding"
  },
  {
    "id": "kid_handwash",
    "stages": [
      "child_1_3y",
      "child_3_6y",
      "child_6_10y"
    ],
    "title": {
      "mr": "मुलांसोबत हात धुवा",
      "hi": "बच्चों के साथ हाथ धोएँ",
      "en": "Handwashing, together"
    },
    "body": {
      "mr": "जेवणाआधी आणि शौचाहून आल्यावर मुलाचे हात साबणाने धुवा. मुलं तुम्हाला बघून शिकतात.",
      "hi": "खाने से पहले और शौच के बाद बच्चे के हाथ साबुन से धुलाएँ। बच्चे आपको देखकर सीखते हैं।",
      "en": "Wash your child's hands with soap before eating and after the toilet. Children learn by copying you."
    },
    "forMe": {
      "mr": "पुढच्या जेवणाआधी मुलासोबत साबणाने हात धुवा.",
      "hi": "अगले खाने से पहले बच्चे के साथ साबुन से हाथ धोएँ।",
      "en": "Wash hands with soap together with your child before the next meal."
    },
    "art": "hand",
    "src": "POSHAN Abhiyaan"
  },
  {
    "id": "kid_anganwadi",
    "stages": [
      "child_3_6y"
    ],
    "title": {
      "mr": "अंगणवाडीतलं जेवण आणि शाळा",
      "hi": "आंगनवाड़ी का खाना और पढ़ाई",
      "en": "Anganwadi meal and pre-school"
    },
    "body": {
      "mr": "अंगणवाडीत मुलांना गरम शिजवलेलं जेवण आणि पूर्व-प्राथमिक शिक्षण मिळतं. मुलाला नियमित पाठवा.",
      "hi": "आंगनवाड़ी में बच्चों को गरम पका खाना और प्री-स्कूल पढ़ाई मिलती है। बच्चे को नियमित भेजें।",
      "en": "The Anganwadi gives children a hot cooked meal and pre-school learning. Send your child regularly."
    },
    "forMe": {
      "mr": "आज मुलाने अंगणवाडीत काय खाल्लं, ते ताईंना विचारा.",
      "hi": "आंगनवाड़ी दीदी से पूछें कि आज बच्चे ने वहाँ क्या खाया।",
      "en": "Ask the Anganwadi tai what your child ate there today."
    },
    "art": "plate",
    "src": "POSHAN Abhiyaan"
  },
  {
    "id": "kid_colour_plate",
    "stages": [
      "child_3_6y",
      "child_6_10y"
    ],
    "title": {
      "mr": "रंगीत ताट",
      "hi": "रंग-बिरंगी थाली",
      "en": "A colourful plate"
    },
    "body": {
      "mr": "हिरवी पालेभाजी, पिवळं वरण, केशरी भोपळा, पांढरं दही. ताटात वेगवेगळे रंग म्हणजे वेगवेगळे पोषक घटक.",
      "hi": "हरी पत्तेदार सब्ज़ी, पीली दाल, नारंगी कद्दू, सफ़ेद दही। थाली में अलग-अलग रंग यानी अलग-अलग पोषण।",
      "en": "Green leaves, yellow dal, orange pumpkin, white curd. Different colours on the plate bring different kinds of goodness."
    },
    "forMe": {
      "mr": "आज मुलाच्या ताटात आणखी एक रंग वाढवा, जसं गाजर, भोपळा किंवा पालेभाजी.",
      "hi": "आज बच्चे की थाली में एक और रंग जोड़ें, जैसे गाजर, कद्दू या हरी सब्ज़ी।",
      "en": "Add one more colour to your child's plate today, like carrot, pumpkin or greens."
    },
    "art": "veg",
    "src": "ICMR-NIN Dietary Guidelines for Indians 2024"
  },
  {
    "id": "kid_no_packets",
    "stages": [
      "child_3_6y",
      "child_6_10y"
    ],
    "title": {
      "mr": "पाकिटातला खाऊ रोज नको",
      "hi": "पैकेट वाला खाना रोज़ नहीं",
      "en": "Packets are not daily food"
    },
    "body": {
      "mr": "चिप्स, बिस्किटं आणि पाकिटातली पेयं यांत मीठ, साखर किंवा तेल जास्त आणि पोषण कमी असतं. ते कधीतरीच द्या.",
      "hi": "चिप्स, बिस्कुट और पैकेट वाले पेय में नमक, चीनी या तेल ज़्यादा और पोषण कम होता है। इन्हें कभी-कभार ही दें।",
      "en": "Chips, biscuits and packet drinks have a lot of salt, sugar or oil and little goodness. Keep them for rare days."
    },
    "forMe": {
      "mr": "आज पाकिटाऐवजी एखादं फळ किंवा घरी केलेले पोहे द्या.",
      "hi": "आज पैकेट की जगह कोई फल या घर के बने पोहे दें।",
      "en": "Instead of a packet today, give a fruit or home-made poha."
    },
    "art": "fruit",
    "src": "ICMR-NIN Dietary Guidelines for Indians 2024"
  },
  {
    "id": "girl_iron",
    "stages": [
      "girl_10_18"
    ],
    "title": {
      "mr": "वाढत्या मुलींसाठी लोह",
      "hi": "बढ़ती लड़कियों के लिए आयरन",
      "en": "Iron for growing girls"
    },
    "body": {
      "mr": "मुलींची वाढ वेगाने होते आणि पाळीत थोडं रक्त जातं, म्हणून लोह गरजेचं आहे. पालेभाज्या, डाळी, बाजरी, अंडी किंवा मासे लिंबू किंवा आवळ्यासोबत खा.",
      "hi": "लड़कियाँ तेज़ी से बढ़ती हैं और पीरियड्स में कुछ खून जाता है, इसलिए आयरन ज़रूरी है। हरी सब्ज़ी, दाल, बाजरा, अंडा या मछली, नींबू या आँवले के साथ खाएँ।",
      "en": "Girls grow fast and lose some blood in periods, so they need iron. Eat greens, dals, bajra, eggs or fish, with lemon or amla."
    },
    "forMe": {
      "mr": "आज एखादी पालेभाजी लिंबू पिळून खा.",
      "hi": "आज कोई हरी पत्तेदार सब्ज़ी नींबू निचोड़कर खाएँ।",
      "en": "Eat a green leafy vegetable today with a squeeze of lemon."
    },
    "art": "leafy",
    "src": "Anemia Mukt Bharat"
  },
  {
    "id": "girl_weekly_ifa",
    "stages": [
      "girl_10_18"
    ],
    "title": {
      "mr": "आठवड्याची IFA गोळी",
      "hi": "हफ़्ते की IFA गोली",
      "en": "Weekly IFA tablet"
    },
    "body": {
      "mr": "जिथे हा कार्यक्रम चालतो, तिथे शाळेत आठवड्यातून एकदा लोह आणि फॉलिक ॲसिडची (IFA) गोळी मोफत मिळते. शाळेत न जाणाऱ्या मुलींनी अंगणवाडी ताईंना विचारावं.",
      "hi": "जहाँ यह कार्यक्रम चलता है, वहाँ स्कूल में हफ़्ते में एक बार आयरन और फ़ोलिक एसिड (IFA) की गोली मुफ़्त मिलती है। जो लड़कियाँ स्कूल नहीं जातीं, वे आंगनवाड़ी दीदी से पूछें।",
      "en": "Where the programme runs, schools give a free iron and folic acid (IFA) tablet once a week. Girls not in school can ask the Anganwadi tai."
    },
    "forMe": {
      "mr": "आठवड्याच्या IFA गोळीबद्दल आज शिक्षकांना किंवा अंगणवाडी ताईंना विचारा.",
      "hi": "हफ़्ते वाली IFA गोली के बारे में आज टीचर या आंगनवाड़ी दीदी से पूछें।",
      "en": "Ask your teacher or the Anganwadi tai about the weekly IFA tablet today."
    },
    "art": "clock",
    "src": "Anemia Mukt Bharat"
  },
  {
    "id": "girl_periods_food",
    "stages": [
      "girl_10_18"
    ],
    "title": {
      "mr": "पाळीत नेहमीसारखं जेवा",
      "hi": "पीरियड्स में सामान्य खाना खाएँ",
      "en": "Eat normally in periods"
    },
    "body": {
      "mr": "पाळीत दही, आंबट पदार्थ किंवा कोणतंही नेहमीचं अन्न टाळायची गरज नाही. शरीराला रोज चांगलं अन्न हवं.",
      "hi": "पीरियड्स में दही, खट्टी चीज़ें या कोई भी सामान्य खाना छोड़ने की ज़रूरत नहीं। शरीर को हर दिन अच्छा खाना चाहिए।",
      "en": "There is no need to avoid curd, sour food or any normal food during periods. Your body needs good food every day."
    },
    "forMe": {
      "mr": "पुढच्या पाळीत नेहमीसारखं जेवा आणि पुरेसं पाणी प्या.",
      "hi": "अगले पीरियड्स में रोज़ जैसा खाना खाएँ और भरपूर पानी पिएँ।",
      "en": "During your next period, eat your usual meals and drink enough water."
    },
    "art": "curd",
    "src": "Garg and Anand, Menstruation related myths in India, J Family Med Prim Care 2015"
  },
  {
    "id": "woman_calcium",
    "stages": [
      "woman",
      "elder"
    ],
    "title": {
      "mr": "मजबूत हाडांसाठी कॅल्शियम",
      "hi": "मज़बूत हड्डियों के लिए कैल्शियम",
      "en": "Calcium for strong bones"
    },
    "body": {
      "mr": "दूध, दही, नाचणी, तीळ आणि पालेभाज्यांतून कॅल्शियम मिळतं. हाडांना ते प्रत्येक वयात लागतं.",
      "hi": "दूध, दही, रागी, तिल और हरी पत्तेदार सब्ज़ियों से कैल्शियम मिलता है। हड्डियों को इसकी हर उम्र में ज़रूरत है।",
      "en": "Milk, curd, ragi, til and green leaves give calcium. Bones need it at every age."
    },
    "forMe": {
      "mr": "आज एका जेवणात वाटीभर दही किंवा नाचणीची भाकरी घ्या.",
      "hi": "आज किसी एक खाने में कटोरी भर दही या रागी की रोटी लें।",
      "en": "Add a bowl of curd or a ragi bhakri to a meal today."
    },
    "art": "milk",
    "src": "ICMR-NIN Dietary Guidelines for Indians 2024"
  },
  {
    "id": "woman_protein",
    "stages": [
      "woman",
      "elder"
    ],
    "title": {
      "mr": "रोज प्रथिनं",
      "hi": "रोज़ प्रोटीन",
      "en": "Protein every day"
    },
    "body": {
      "mr": "डाळ, उसळ, दूध, दही, अंडी, मासे किंवा मांस यांनी स्नायू मजबूत राहतात. यातलं काहीतरी रोज खा.",
      "hi": "दाल, दूध, दही, अंडा, मछली या मांस से मांसपेशियाँ मज़बूत रहती हैं। इनमें से कुछ रोज़ खाएँ।",
      "en": "Dal, usal, milk, curd, eggs, fish or meat help keep your muscles strong. Have some every day."
    },
    "forMe": {
      "mr": "आजच्या जेवणात डाळ, उसळ किंवा अंडं आहे ना, ते बघा.",
      "hi": "देखें कि आज आपके खाने में दाल या अंडा ज़रूर हो।",
      "en": "Make sure there is dal, usal or an egg in your meal today."
    },
    "art": "dal",
    "src": "ICMR-NIN Dietary Guidelines for Indians 2024"
  },
  {
    "id": "woman_water",
    "stages": [
      "woman",
      "elder",
      "girl_10_18"
    ],
    "title": {
      "mr": "पुरेसं पाणी प्या",
      "hi": "भरपूर पानी पिएँ",
      "en": "Drink enough water"
    },
    "body": {
      "mr": "कामात असलात तरी दिवसभर स्वच्छ पाणी प्या. वृद्धांना अनेकदा तहान कमी जाणवते, म्हणून त्यांना आठवण करून द्या.",
      "hi": "काम में हों तब भी दिन भर साफ़ पानी पिएँ। बुज़ुर्गों को अक्सर प्यास कम लगती है, इसलिए उन्हें याद दिलाएँ।",
      "en": "Drink clean water through the day, even when you are busy. Older people often feel less thirsty, so remind them."
    },
    "forMe": {
      "mr": "आज स्वच्छ पाण्याची झाकलेली बाटली जवळ ठेवा.",
      "hi": "आज साफ़ पानी की ढकी हुई बोतल अपने पास रखें।",
      "en": "Keep a covered bottle of clean water near you today."
    },
    "art": "water",
    "src": "ICMR-NIN Dietary Guidelines for Indians 2024"
  },
  {
    "id": "elder_soft_food",
    "stages": [
      "elder"
    ],
    "title": {
      "mr": "मऊ, पण पौष्टिक",
      "hi": "नरम, पर पौष्टिक",
      "en": "Soft food, still nourishing"
    },
    "body": {
      "mr": "चावायला त्रास होत असेल तर मऊ पण प्रथिनं असलेलं अन्न द्या, जसं घट्ट वरण, खिचडी, दही किंवा कुस्करलेलं उकडलेलं अंडं.",
      "hi": "चबाने में दिक्कत हो तो नरम पर प्रोटीन वाला खाना दें, जैसे गाढ़ी दाल, खिचड़ी, दही या मसला उबला अंडा।",
      "en": "If chewing is hard, choose soft food that still has protein, like thick dal, khichdi, curd or a mashed boiled egg."
    },
    "forMe": {
      "mr": "आज एका जेवणासाठी घट्ट डाळ-खिचडी करा.",
      "hi": "आज एक बार के खाने में गाढ़ी दाल-खिचड़ी बनाएँ।",
      "en": "Make thick dal-khichdi for a meal today."
    },
    "art": "grain",
    "src": "ICMR-NIN Dietary Guidelines for Indians 2024"
  },
  {
    "id": "fam_millets",
    "stages": [
      "family",
      "woman",
      "elder",
      "girl_10_18",
      "child_6_10y"
    ],
    "title": {
      "mr": "आठवड्यात भरडधान्य",
      "hi": "हफ़्ते में मोटा अनाज",
      "en": "Millets in the week"
    },
    "body": {
      "mr": "नाचणी, ज्वारी आणि बाजरीतून फायबर मिळतं, शिवाय नाचणीतून कॅल्शियम आणि बाजरीतून लोह. त्यांची भाकरी वारंवार करा.",
      "hi": "रागी, ज्वार और बाजरे से फ़ाइबर मिलता है, साथ ही रागी से कैल्शियम और बाजरे से आयरन। इनकी रोटी अक्सर बनाएँ।",
      "en": "Ragi, jowar and bajra give fibre, and ragi gives calcium while bajra gives iron. Make bhakri from them often."
    },
    "forMe": {
      "mr": "आज एका जेवणाला नाचणी किंवा ज्वारीची भाकरी करा.",
      "hi": "आज एक समय के खाने में रागी या ज्वार की रोटी बनाएँ।",
      "en": "Make ragi or jowar bhakri for a meal today."
    },
    "art": "millet",
    "src": "ICMR-NIN Dietary Guidelines for Indians 2024"
  },
  {
    "id": "fam_sprouts",
    "stages": [
      "family",
      "woman",
      "child_6_10y"
    ],
    "title": {
      "mr": "मोड आलेली कडधान्यं: स्वस्त प्रथिनं",
      "hi": "अंकुरित दालें: सस्ता प्रोटीन",
      "en": "Sprouts: low-cost protein"
    },
    "body": {
      "mr": "मटकी आणि मुगातून प्रथिनं आणि फायबर मिळतं, आणि मोड आल्यावर ते पचायला सोपे होतात. त्यांची उसळ करा.",
      "hi": "मोठ और मूँग से प्रोटीन और फ़ाइबर मिलता है, और अंकुरित होने पर ये आसानी से पचते हैं। इन्हें पकाकर खाएँ।",
      "en": "Matki and moong give protein and fibre, and sprouting makes them easier to digest. Cook them as usal."
    },
    "forMe": {
      "mr": "उद्याच्या उसळीसाठी आज रात्री वाटीभर मटकी भिजत घाला.",
      "hi": "कल के खाने के लिए आज रात कटोरी भर मोठ भिगो दें।",
      "en": "Soak a bowl of matki tonight for tomorrow's usal."
    },
    "art": "sprouts",
    "src": "ICMR-NIN Dietary Guidelines for Indians 2024"
  },
  {
    "id": "fam_fruit",
    "stages": [
      "family",
      "child_3_6y",
      "child_6_10y",
      "girl_10_18",
      "elder"
    ],
    "title": {
      "mr": "हंगामातली स्थानिक फळं",
      "hi": "मौसम के स्थानीय फल",
      "en": "Local fruit in season"
    },
    "body": {
      "mr": "केळं, पेरू, पपई आणि हिवाळ्यात आवळा: हंगामातली स्थानिक फळं ताजी आणि स्वस्त असतात. फळ अख्खं खा.",
      "hi": "केला, अमरूद, पपीता और सर्दी में आँवला: मौसम के स्थानीय फल ताज़ा और सस्ते होते हैं। फल साबुत खाएँ।",
      "en": "Banana, guava, papaya, and amla in winter: local fruit in season is fresh and costs less. Eat it whole."
    },
    "forMe": {
      "mr": "आज हंगामातलं एखादं स्थानिक फळ आणा आणि घरात सगळ्यांना वाटून द्या.",
      "hi": "आज मौसम का कोई स्थानीय फल लाएँ और घर में सबके साथ बाँटें।",
      "en": "Buy a local fruit in season today and share it at home."
    },
    "art": "fruit",
    "src": "ICMR-NIN Dietary Guidelines for Indians 2024"
  },
  {
    "id": "fam_amla_guava",
    "stages": [
      "family",
      "girl_10_18",
      "woman"
    ],
    "title": {
      "mr": "आवळा, पेरू लोहाला मदत करतात",
      "hi": "आँवला और अमरूद आयरन में मदद करते हैं",
      "en": "Amla and guava help with iron"
    },
    "body": {
      "mr": "आवळा आणि पेरूमध्ये भरपूर व्हिटॅमिन C असतं. जेवणासोबत खाल्ले तर अन्नातलं लोह शरीराला जास्त मिळतं.",
      "hi": "आँवले और अमरूद में भरपूर विटामिन C होता है। खाने के साथ लेने से शरीर को खाने का आयरन ज़्यादा मिलता है।",
      "en": "Amla and guava have a lot of vitamin C. Eaten with meals, they help the body take in iron from food."
    },
    "forMe": {
      "mr": "आज जेवणासोबत पेरू किंवा आवळा, जे मिळेल ते खा.",
      "hi": "आज खाने के साथ अमरूद या आँवला, जो मिले, वह खाएँ।",
      "en": "Eat a guava or an amla with a meal today, whichever you can get."
    },
    "art": "citrus",
    "src": "ICMR-NIN Dietary Guidelines for Indians 2024"
  },
  {
    "id": "fam_handwash",
    "stages": [
      "family",
      "woman",
      "elder"
    ],
    "title": {
      "mr": "साबणाने हात धुवा",
      "hi": "साबुन से हाथ धोएँ",
      "en": "Wash hands with soap"
    },
    "body": {
      "mr": "स्वयंपाकाआधी, जेवणाआधी, मुलाला भरवण्याआधी आणि शौचाहून आल्यावर साबण-पाण्याने हात धुवा.",
      "hi": "खाना बनाने से पहले, खाने से पहले, बच्चे को खिलाने से पहले और शौच के बाद साबुन-पानी से हाथ धोएँ।",
      "en": "Wash hands with soap and water before cooking, before eating, before feeding a child and after the toilet."
    },
    "forMe": {
      "mr": "आज नळाजवळ किंवा बादलीजवळ साबण ठेवा.",
      "hi": "आज नल या बाल्टी के पास साबुन रखें।",
      "en": "Keep a soap next to the water tap or bucket today."
    },
    "art": "hand",
    "src": "POSHAN Abhiyaan"
  }
];

export const nutritionGuides: NutritionGuide[] = [
  {
    "id": "pregnancy",
    "title": {
      "mr": "गरोदरपणातला आहार",
      "hi": "गर्भावस्था में खान-पान",
      "en": "Food in pregnancy"
    },
    "intro": {
      "mr": "तुमच्यासाठी आणि बाळासाठी सोप्या गोष्टी. आरोग्याच्या कोणत्याही प्रश्नासाठी ANM, आशा ताई, अंगणवाडी ताई किंवा डॉक्टरांना विचारा.",
      "hi": "आपके और बच्चे के लिए आसान बातें। सेहत से जुड़े किसी भी सवाल के लिए ANM, आशा दीदी, आंगनवाड़ी दीदी या डॉक्टर से पूछें।",
      "en": "Simple steps for you and your baby. For any health question, ask the ANM, ASHA tai, Anganwadi tai or doctor."
    },
    "stages": [
      "pregnant_t1",
      "pregnant_t2",
      "pregnant_t3"
    ],
    "cards": [
      {
        "title": {
          "mr": "रोज सगळ्या प्रकारचं अन्न",
          "hi": "रोज़ हर तरह का खाना",
          "en": "Eat a mix every day"
        },
        "body": {
          "mr": "रोज धान्य किंवा भरडधान्य, डाळ, पालेभाजी, फळ आणि दूध किंवा दही घ्या. खात असाल तर अंडी, मासे किंवा मांसही घ्या.",
          "hi": "रोज़ अनाज या मोटा अनाज, दाल, हरी सब्ज़ी, फल और दूध या दही लें। अगर खाती हैं तो अंडा, मछली या मांस भी लें।",
          "en": "Have grains or millets, dal, green vegetables, fruit, and milk or curd daily. Add eggs, fish or meat if you eat them."
        },
        "forMe": {
          "mr": "आज ताट बघा: त्यात डाळ आणि पालेभाजी आहे ना?",
          "hi": "आज अपनी थाली देखें: उसमें दाल और हरी सब्ज़ी है या नहीं?",
          "en": "Check your plate today: is there dal and a green vegetable?"
        }
      },
      {
        "title": {
          "mr": "एक जास्तीचं छोटं जेवण",
          "hi": "एक छोटा खाना और",
          "en": "One extra small meal"
        },
        "body": {
          "mr": "चौथ्या महिन्यापासून रोज एक छोटं जेवण वाढवा. दोघांचं जेवण जेवायची गरज नाही.",
          "hi": "चौथे महीने से रोज़ एक छोटा खाना और लें। दो लोगों जितना खाने की ज़रूरत नहीं।",
          "en": "From the 4th month, add one extra small meal each day. You do not need to eat for two."
        },
        "forMe": {
          "mr": "तुमचं जास्तीचं छोटं जेवण काय असेल, ते आजच ठरवा.",
          "hi": "आज ही तय करें कि एक और छोटे खाने में क्या लेंगी।",
          "en": "Decide today what your extra small meal will be."
        }
      },
      {
        "title": {
          "mr": "रोज लोह",
          "hi": "रोज़ आयरन",
          "en": "Iron, every day"
        },
        "body": {
          "mr": "पालेभाज्या, डाळी, अंडी किंवा मासे लिंबू, आवळा किंवा पेरूसोबत खा. लोह आणि फॉलिक ॲसिडच्या (IFA) गोळ्या ANM किंवा डॉक्टर सांगतील तशा घ्या.",
          "hi": "हरी सब्ज़ी, दाल, अंडा या मछली नींबू, आँवले या अमरूद के साथ खाएँ। आयरन और फ़ोलिक एसिड (IFA) की गोलियाँ ANM या डॉक्टर की सलाह से लें।",
          "en": "Eat greens, dals, eggs or fish with lemon, amla or guava. Take iron and folic acid (IFA) tablets as the ANM or doctor advises."
        },
        "forMe": {
          "mr": "आज एका जेवणात लिंबू घ्या.",
          "hi": "आज किसी एक खाने में नींबू लें।",
          "en": "Add lemon to a meal today."
        }
      },
      {
        "title": {
          "mr": "फक्त आयोडीनयुक्त मीठ",
          "hi": "सिर्फ़ आयोडीन वाला नमक",
          "en": "Iodised salt only"
        },
        "body": {
          "mr": "बाळाच्या मेंदूच्या वाढीसाठी आयोडीन गरजेचं आहे. आयोडीनयुक्त मीठ वापरा आणि झाकणाच्या डब्यात ठेवा.",
          "hi": "बच्चे के दिमाग़ के विकास के लिए आयोडीन ज़रूरी है। आयोडीन वाला नमक लें और ढक्कन वाले डिब्बे में रखें।",
          "en": "Your baby needs iodine for brain growth. Use iodised salt and keep it in a closed box."
        },
        "forMe": {
          "mr": "मिठाच्या पाकिटावर आयोडीनयुक्त लिहिलं आहे का, ते बघा.",
          "hi": "देखें कि नमक के पैकेट पर आयोडीन युक्त लिखा है।",
          "en": "Check that your salt packet says iodised."
        }
      },
      {
        "title": {
          "mr": "अन्न पूर्ण शिजवा",
          "hi": "खाना पूरी तरह पकाएँ",
          "en": "Cook food fully"
        },
        "body": {
          "mr": "अंडी, मासे आणि मांस पूर्ण शिजवूनच खा. फळं आणि भाज्या स्वच्छ पाण्याने धुवा.",
          "hi": "अंडा, मछली और मांस पूरी तरह पकाकर ही खाएँ। फल और सब्ज़ियाँ साफ़ पानी से धोएँ।",
          "en": "Eat eggs, fish and meat only when fully cooked. Wash fruits and vegetables in clean water."
        },
        "forMe": {
          "mr": "आज खाणार ते फळ स्वच्छ पाण्याने धुवा.",
          "hi": "आज जो फल खाएँ, उसे साफ़ पानी से धोएँ।",
          "en": "Wash the fruit you eat today in clean water."
        }
      },
      {
        "title": {
          "mr": "तपासण्या आणि विश्रांती",
          "hi": "जाँच और आराम",
          "en": "Check-ups and rest"
        },
        "body": {
          "mr": "किमान 4 तपासण्या करा आणि MCP कार्ड जपून ठेवा. दिवसा थोडी विश्रांती घ्या आणि जड कामं वाटून घ्या.",
          "hi": "कम से कम 4 जाँच कराएँ और MCP कार्ड संभालकर रखें। दिन में थोड़ा आराम करें और भारी काम बाँट लें।",
          "en": "Go for at least 4 check-ups and keep your MCP card safe. Rest a little in the day and share heavy work."
        },
        "forMe": {
          "mr": "पुढच्या तपासणीची तारीख आज लिहून ठेवा.",
          "hi": "अगली जाँच की तारीख़ आज लिख लें।",
          "en": "Note your next check-up date today."
        }
      }
    ],
    "warning": {
      "mr": "यापैकी काहीही असेल तर लगेच आरोग्य केंद्रात जा किंवा 108 ला फोन करा: रक्तस्राव, तीव्र डोकेदुखी किंवा धूसर दिसणं, चेहऱ्यावर किंवा हातांवर सूज, झटके, ताप, बाळाची हालचाल कमी जाणवणं, वेळेआधी पाणी जाणं, पोटात खूप दुखणं.",
      "hi": "इनमें से कुछ भी हो तो तुरंत स्वास्थ्य केंद्र जाएँ या 108 पर फ़ोन करें: खून आना, तेज़ सिरदर्द या धुँधला दिखना, चेहरे या हाथों पर सूजन, दौरे पड़ना, बुख़ार, बच्चे का कम हिलना, समय से पहले पानी जाना, पेट में तेज़ दर्द।",
      "en": "Go to the health centre or call 108 at once if you have any of these: bleeding, severe headache or blurred vision, swelling of the face or hands, fits, fever, the baby moving less, water breaking early, or severe stomach pain."
    },
    "src": "MoHFW Mother and Child Protection card; ICMR-NIN Dietary Guidelines for Indians 2024; Anemia Mukt Bharat"
  },
  {
    "id": "lactation",
    "title": {
      "mr": "स्तनपानाच्या काळातला आहार",
      "hi": "स्तनपान के समय खान-पान",
      "en": "Food while breastfeeding"
    },
    "intro": {
      "mr": "तुमचं शरीर बाळासाठी दूध तयार करत आहे. आरोग्याच्या कोणत्याही प्रश्नासाठी ANM, आशा ताई, अंगणवाडी ताई किंवा डॉक्टरांना विचारा.",
      "hi": "आपका शरीर बच्चे के लिए दूध बना रहा है। सेहत से जुड़े किसी भी सवाल के लिए ANM, आशा दीदी, आंगनवाड़ी दीदी या डॉक्टर से पूछें।",
      "en": "Your body is making milk for your baby. For any health question, ask the ANM, ASHA tai, Anganwadi tai or doctor."
    },
    "stages": [
      "lactating",
      "child_0_6m"
    ],
    "cards": [
      {
        "title": {
          "mr": "थोडं जास्त जेवा",
          "hi": "थोड़ा ज़्यादा खाएँ",
          "en": "Eat a little more"
        },
        "body": {
          "mr": "स्तनपानासाठी जास्त अन्न लागतं. आधीपेक्षा थोडं जास्त जेवा: डाळ, पालेभाजी आणि दूध किंवा दही.",
          "hi": "स्तनपान के लिए ज़्यादा खाना चाहिए। पहले से थोड़ा ज़्यादा खाएँ: दाल, हरी सब्ज़ी और दूध या दही।",
          "en": "Breastfeeding needs extra food. Eat a little more than before, with dal, greens, and milk or curd."
        },
        "forMe": {
          "mr": "आज एका जेवणात वाटीभर वरण किंवा दही वाढवा.",
          "hi": "आज किसी एक खाने में कटोरी भर दाल या दही बढ़ाएँ।",
          "en": "Add a bowl of dal or curd to a meal today."
        }
      },
      {
        "title": {
          "mr": "तहान लागेल तेव्हा पाणी",
          "hi": "प्यास लगे तो पानी",
          "en": "Drink when thirsty"
        },
        "body": {
          "mr": "स्तनपानामुळे तहान लागते. स्वच्छ पाणी जवळ ठेवा आणि तहान लागेल तेव्हा प्या.",
          "hi": "स्तनपान से प्यास लगती है। साफ़ पानी पास रखें और प्यास लगे तो पिएँ।",
          "en": "Breastfeeding makes you thirsty. Keep clean water near you and drink whenever you feel thirsty."
        },
        "forMe": {
          "mr": "बाळाला पाजता तिथे झाकलेलं पाण्याचं भांडं ठेवा.",
          "hi": "जहाँ दूध पिलाती हैं, वहाँ ढका हुआ पानी रखें।",
          "en": "Keep a covered glass of water where you feed the baby."
        }
      },
      {
        "title": {
          "mr": "IFA गोळ्यांबद्दल विचारा",
          "hi": "IFA की गोलियों के बारे में पूछें",
          "en": "Ask about IFA tablets"
        },
        "body": {
          "mr": "बाळंतपणानंतरही आरोग्य केंद्रात लोह आणि फॉलिक ॲसिडच्या (IFA) गोळ्या मिळतात. ANM किंवा डॉक्टर सांगतील तशा घ्या.",
          "hi": "प्रसव के बाद भी स्वास्थ्य केंद्र पर आयरन और फ़ोलिक एसिड (IFA) की गोलियाँ मिलती हैं। ANM या डॉक्टर की सलाह से लें।",
          "en": "After delivery too, the health centre gives iron and folic acid (IFA) tablets. Take them as the ANM or doctor advises."
        },
        "forMe": {
          "mr": "IFA गोळ्या चालू ठेवायच्या का, ते ANM किंवा आशा ताईंना विचारा.",
          "hi": "ANM या आशा दीदी से पूछें कि IFA की गोलियाँ जारी रखनी हैं या नहीं।",
          "en": "Ask the ANM or ASHA tai if you should continue your IFA tablets."
        }
      },
      {
        "title": {
          "mr": "दिवस-रात्र वारंवार पाजा",
          "hi": "दिन-रात बार-बार पिलाएँ",
          "en": "Feed often, day and night"
        },
        "body": {
          "mr": "बाळ जितकं जास्त पितं, तितकं जास्त दूध येतं. बाळाला हवं तेव्हा पाजा.",
          "hi": "बच्चा जितना ज़्यादा पीता है, उतना ज़्यादा दूध बनता है। बच्चा जब चाहे, तब पिलाएँ।",
          "en": "The more the baby feeds, the more milk you make. Feed whenever the baby wants."
        },
        "forMe": {
          "mr": "आज बाळ रडायला लागण्याआधीच, भुकेची चिन्हं दिसताच पाजा.",
          "hi": "आज बच्चे के रोने से पहले, भूख के इशारे दिखते ही पिलाएँ।",
          "en": "Today, feed as soon as you see hunger signs, before the baby starts crying."
        }
      },
      {
        "title": {
          "mr": "जमेल तेव्हा विश्रांती",
          "hi": "जब हो सके, आराम",
          "en": "Rest when you can"
        },
        "body": {
          "mr": "बाळाची काळजी घेणं थकवणारं असतं. बाळ झोपलं की तुम्हीही विश्रांती घ्या आणि घरकामात घरच्यांची मदत घ्या.",
          "hi": "बच्चे की देखभाल थकाने वाली होती है। बच्चा सोए तो आप भी आराम करें और घर के काम में परिवार की मदद लें।",
          "en": "Caring for a baby is tiring. Rest when the baby sleeps, and let the family help with housework."
        },
        "forMe": {
          "mr": "आज घरातल्या कोणाला तरी तुमच्याऐवजी एक काम करायला सांगा.",
          "hi": "आज घर में किसी से एक काम अपने बदले करने को कहें।",
          "en": "Ask someone at home to take over one chore today."
        }
      }
    ],
    "warning": {
      "mr": "यापैकी काहीही असेल तर लगेच आरोग्य केंद्रात जा किंवा 108 ला फोन करा: जास्त रक्तस्राव, ताप, झटके, तीव्र डोकेदुखी किंवा धूसर दिसणं, श्वास घ्यायला त्रास, योनीमार्गातून दुर्गंधीयुक्त स्राव, तापासोबत लाल आणि दुखरा स्तन. बाळ स्तनपान करू शकत नसेल तरीही लगेच जा.",
      "hi": "इनमें से कुछ भी हो तो तुरंत स्वास्थ्य केंद्र जाएँ या 108 पर फ़ोन करें: ज़्यादा खून आना, बुख़ार, दौरे पड़ना, तेज़ सिरदर्द या धुँधला दिखना, साँस लेने में तकलीफ़, योनि से बदबूदार स्राव, बुख़ार के साथ लाल और दर्द वाला स्तन। बच्चा दूध न पी पाए, तब भी तुरंत जाएँ।",
      "en": "Go to the health centre or call 108 at once if you have any of these: heavy bleeding, fever, fits, severe headache or blurred vision, trouble breathing, bad-smelling discharge from the vagina, or a red, painful breast with fever. Go at once also if the baby cannot breastfeed."
    },
    "src": "ICMR-NIN Dietary Guidelines for Indians 2024; WHO/UNICEF infant and young child feeding; Anemia Mukt Bharat; MoHFW Mother and Child Protection card"
  },
  {
    "id": "child_0_6m",
    "title": {
      "mr": "बाळ: जन्मापासून 6 महिने",
      "hi": "बच्चा: जन्म से 6 महीने",
      "en": "Baby: birth to 6 months"
    },
    "intro": {
      "mr": "या महिन्यांत बाळाला फक्त आईचं दूध पुरेसं असतं. आरोग्याच्या कोणत्याही प्रश्नासाठी ANM, आशा ताई, अंगणवाडी ताई किंवा डॉक्टरांना विचारा.",
      "hi": "इन महीनों में बच्चे को सिर्फ़ माँ का दूध चाहिए। सेहत से जुड़े किसी भी सवाल के लिए ANM, आशा दीदी, आंगनवाड़ी दीदी या डॉक्टर से पूछें।",
      "en": "In these months, breast milk is all your baby needs. For any health question, ask the ANM, ASHA tai, Anganwadi tai or doctor."
    },
    "stages": [
      "child_0_6m",
      "lactating",
      "pregnant_t3"
    ],
    "cards": [
      {
        "title": {
          "mr": "जन्मानंतर 1 तासाच्या आत",
          "hi": "जन्म के 1 घंटे के अंदर",
          "en": "Within 1 hour of birth"
        },
        "body": {
          "mr": "जन्मानंतर 1 तासाच्या आत बाळाला छातीशी लावा. आईच्या त्वचेचा स्पर्श बाळाला उबदार ठेवायला मदत करतो.",
          "hi": "जन्म के 1 घंटे के अंदर बच्चे को स्तनपान कराएँ। माँ की त्वचा से लगकर बच्चे को गरम रहने में मदद मिलती है।",
          "en": "Put the baby to the breast within 1 hour of birth. Skin-to-skin contact with you helps keep the baby warm."
        },
        "forMe": {
          "mr": "घरच्यांना आणि नर्सला तुमचं ठरलेलं सांगा: 1 तासाच्या आत आईचं दूध.",
          "hi": "परिवार और नर्स को अपनी बात बता दें: 1 घंटे के अंदर माँ का दूध।",
          "en": "Tell the family and the nurse your plan: breast milk within 1 hour."
        }
      },
      {
        "title": {
          "mr": "पहिलं पिवळं दूध",
          "hi": "पहला पीला दूध",
          "en": "The first yellow milk"
        },
        "body": {
          "mr": "पहिलं घट्ट पिवळं दूध बाळाचं आजारांपासून रक्षण करायला मदत करतं. ते सगळं पाजा, फेकू नका.",
          "hi": "पहला गाढ़ा पीला दूध बच्चे को बीमारियों से बचाने में मदद करता है। इसे पूरा पिलाएँ, फेंकें नहीं।",
          "en": "The first thick yellow milk helps protect the baby from illness. Give all of it. Do not throw it away."
        },
        "forMe": {
          "mr": "पहिलं दूध वाईट असतं असं म्हणणाऱ्या घरच्यांना हे सांगा.",
          "hi": "घर में जो पहले दूध को ख़राब कहते हैं, उन्हें यह बताएँ।",
          "en": "Share this with anyone at home who says the first milk is bad."
        }
      },
      {
        "title": {
          "mr": "6 महिने फक्त आईचं दूध",
          "hi": "6 महीने सिर्फ़ माँ का दूध",
          "en": "Only breast milk for 6 months"
        },
        "body": {
          "mr": "पाणी, मध, बाळगुटी, चहा किंवा गाई-म्हशीचं दूध नको, उन्हाळ्यातही. औषध फक्त डॉक्टरांनी दिलं तरच.",
          "hi": "पानी, शहद, घुट्टी, चाय या गाय-भैंस का दूध नहीं, गर्मी में भी नहीं। दवा सिर्फ़ तभी, जब डॉक्टर दें।",
          "en": "No water, honey, ghutti, tea or animal milk, even in summer. Medicine only if the doctor gives it."
        },
        "forMe": {
          "mr": "आज बाळाला फक्त आईचं दूध द्या.",
          "hi": "आज बच्चे को सिर्फ़ माँ का दूध दें।",
          "en": "Today, give the baby only breast milk."
        }
      },
      {
        "title": {
          "mr": "दिवस-रात्र वारंवार पाजा",
          "hi": "दिन-रात बार-बार पिलाएँ",
          "en": "Feed often, day and night"
        },
        "body": {
          "mr": "बाळाला हवं तेव्हा पाजा. वारंवार पाजल्याने दूध जास्त येतं.",
          "hi": "बच्चा जब चाहे, तब पिलाएँ। बार-बार पिलाने से दूध ज़्यादा बनता है।",
          "en": "Feed whenever the baby wants. Frequent feeding helps you make more milk."
        },
        "forMe": {
          "mr": "भूक लवकर कळावी म्हणून आज बाळाला जवळ ठेवा.",
          "hi": "आज बच्चे को पास रखें, ताकि भूख जल्दी पता चले।",
          "en": "Keep the baby close today so you notice hunger early."
        }
      },
      {
        "title": {
          "mr": "बाळाची वाढ पाहा",
          "hi": "बच्चे की बढ़त देखें",
          "en": "Watch the baby grow"
        },
        "body": {
          "mr": "अंगणवाडीत किंवा आरोग्य केंद्रात बाळाचं वजन करून घ्या आणि MCP कार्डातला वाढीचा तक्ता बघा.",
          "hi": "आंगनवाड़ी या स्वास्थ्य केंद्र पर बच्चे का वज़न कराएँ और MCP कार्ड में बढ़त का चार्ट देखें।",
          "en": "Get the baby weighed at the Anganwadi or health centre, and look at the growth chart in the MCP card."
        },
        "forMe": {
          "mr": "पुढचं वजन कधी करायचं, ते अंगणवाडी ताईंना विचारा.",
          "hi": "आंगनवाड़ी दीदी से पूछें कि अगली बार वज़न कब होगा।",
          "en": "Ask the Anganwadi tai when the next weighing day is."
        }
      }
    ],
    "warning": {
      "mr": "यापैकी काहीही असेल तर लगेच आरोग्य केंद्रात जा किंवा 108 ला फोन करा: बाळ पिऊ किंवा स्तनपान करू शकत नाही, सगळं उलटून टाकतं, झटके, खूप झोपाळलेलं, जलद किंवा त्रासाने श्वास, जुलाबात रक्त, डोळे खोल जाणं किंवा लघवी खूप कमी होणं, ताप.",
      "hi": "इनमें से कुछ भी हो तो तुरंत स्वास्थ्य केंद्र जाएँ या 108 पर फ़ोन करें: बच्चा पी न पाए या स्तनपान न कर पाए, सब कुछ उल्टी कर दे, दौरे, बहुत ज़्यादा सुस्ती, तेज़ या मुश्किल से साँस, दस्त में खून, धँसी आँखें या बहुत कम पेशाब, बुख़ार।",
      "en": "Go to the health centre or call 108 at once if the baby: cannot drink or breastfeed, vomits everything, has fits, is very sleepy, breathes fast or with difficulty, has diarrhoea with blood or signs of dehydration like sunken eyes or very little urine, or has a fever."
    },
    "src": "WHO/UNICEF infant and young child feeding; MoHFW Mother and Child Protection card"
  },
  {
    "id": "child_6_24m",
    "title": {
      "mr": "बाळ: 6 महिने ते 2 वर्षं",
      "hi": "बच्चा: 6 महीने से 2 साल",
      "en": "Baby: 6 months to 2 years"
    },
    "intro": {
      "mr": "आता बाळाला अन्न आणि आईचं दूध दोन्ही हवं. आरोग्याच्या कोणत्याही प्रश्नासाठी ANM, आशा ताई, अंगणवाडी ताई किंवा डॉक्टरांना विचारा.",
      "hi": "अब बच्चे को खाना और माँ का दूध दोनों चाहिए। सेहत से जुड़े किसी भी सवाल के लिए ANM, आशा दीदी, आंगनवाड़ी दीदी या डॉक्टर से पूछें।",
      "en": "Now the baby needs both food and breast milk. For any health question, ask the ANM, ASHA tai, Anganwadi tai or doctor."
    },
    "stages": [
      "child_6_12m",
      "child_1_3y"
    ],
    "cards": [
      {
        "title": {
          "mr": "6 महिन्यांपासून सुरुवात",
          "hi": "6 महीने से शुरुआत",
          "en": "Start at 6 months"
        },
        "body": {
          "mr": "6 महिन्यांपासून मऊ, कुस्करलेलं घरचं अन्न सुरू करा: वरण-भात, खिचडी, केळं किंवा भोपळा.",
          "hi": "6 महीने से नरम, मसला हुआ घर का खाना शुरू करें: दाल-चावल, खिचड़ी, केला या कद्दू।",
          "en": "Start soft, mashed home food at 6 months, like dal-rice, khichdi, banana or pumpkin."
        },
        "forMe": {
          "mr": "आज बाळासाठी थोडा वरण-भात नीट कुस्करा.",
          "hi": "आज बच्चे के लिए थोड़े दाल-चावल अच्छी तरह मसलें।",
          "en": "Mash a little dal-rice well for the baby today."
        }
      },
      {
        "title": {
          "mr": "पातळ नको, घट्ट",
          "hi": "पतला नहीं, गाढ़ा",
          "en": "Thick, not watery"
        },
        "body": {
          "mr": "अन्न चमच्यावर टिकेल इतकं घट्ट हवं. ताकदीसाठी थोडं तूप किंवा तेल घाला.",
          "hi": "खाना इतना गाढ़ा हो कि चम्मच पर टिके। ताक़त के लिए थोड़ा घी या तेल डालें।",
          "en": "Food should be thick enough to stay on the spoon. Add a little ghee or oil for energy."
        },
        "forMe": {
          "mr": "पुढच्या जेवणात चमचा तिरका करून घट्टपणा तपासा.",
          "hi": "अगले खाने में चम्मच तिरछा करके गाढ़ापन जाँचें।",
          "en": "At the next meal, tilt the spoon to check the food is thick."
        }
      },
      {
        "title": {
          "mr": "नवे पदार्थ हळूहळू",
          "hi": "नई चीज़ें धीरे-धीरे",
          "en": "Add new foods slowly"
        },
        "body": {
          "mr": "हळूहळू कुस्करलेलं अंडं, काटे काढलेले मासे, पालेभाजी आणि फळं द्या. बाळ मोठं होईल तसं जास्त अन्न आणि जास्त वेळा द्या.",
          "hi": "धीरे-धीरे मसला अंडा, बिना काँटे की मछली, हरी सब्ज़ी और फल दें। बच्चा बड़ा हो, तो खाना ज़्यादा और ज़्यादा बार दें।",
          "en": "Slowly add mashed egg, fish without bones, greens and fruit. As the child grows, give more food, more often."
        },
        "forMe": {
          "mr": "आज बाळाच्या वाटीत एक नवा पदार्थ द्या, जसं कुस्करलेलं अंडं किंवा भोपळा.",
          "hi": "आज बच्चे की कटोरी में कोई नई चीज़ दें, जैसे मसला अंडा या कद्दू।",
          "en": "Add a new food to the baby's bowl today, like mashed egg or pumpkin."
        }
      },
      {
        "title": {
          "mr": "स्तनपान चालू ठेवा",
          "hi": "स्तनपान जारी रखें",
          "en": "Keep breastfeeding"
        },
        "body": {
          "mr": "अन्नासोबत 2 वर्षं किंवा त्याहून जास्त काळ स्तनपान चालू ठेवा.",
          "hi": "खाने के साथ 2 साल या उससे आगे तक स्तनपान जारी रखें।",
          "en": "Give food and keep breastfeeding to 2 years or beyond."
        },
        "forMe": {
          "mr": "आज जेवणासोबत नेहमीसारखं पाजा.",
          "hi": "आज खाने के साथ हमेशा की तरह दूध पिलाएँ।",
          "en": "Breastfeed as usual today, along with meals."
        }
      },
      {
        "title": {
          "mr": "स्वच्छ हात, स्वच्छ वाटी",
          "hi": "साफ़ हाथ, साफ़ कटोरी",
          "en": "Clean hands and bowl"
        },
        "body": {
          "mr": "भरवण्याआधी साबणाने हात धुवा. स्वच्छ कप, वाटी आणि चमचा वापरा, बाटली नको.",
          "hi": "खिलाने से पहले साबुन से हाथ धोएँ। साफ़ कप, कटोरी और चम्मच लें, बोतल नहीं।",
          "en": "Wash hands with soap before feeding. Use a clean cup, katori and spoon, not a bottle."
        },
        "forMe": {
          "mr": "बाळाला भरवता तिथे साबण ठेवा.",
          "hi": "जहाँ बच्चे को खिलाती हैं, वहाँ साबुन रखें।",
          "en": "Keep soap where you feed the baby."
        }
      },
      {
        "title": {
          "mr": "अंगणवाडीत विचारा",
          "hi": "आंगनवाड़ी में पूछें",
          "en": "Ask at the Anganwadi"
        },
        "body": {
          "mr": "अंगणवाडीतून लहान मुलांसाठी घरपोच आहार (THR) मिळतो आणि वाढ तपासली जाते. तुमच्या मुलाला काय मिळेल ते ताईंना विचारा.",
          "hi": "आंगनवाड़ी से छोटे बच्चों के लिए टेक-होम राशन (THR) मिलता है और उनकी बढ़त जाँची जाती है। दीदी से पूछें कि आपके बच्चे को क्या मिल सकता है।",
          "en": "The Anganwadi gives take-home ration (THR) for young children and checks their growth. Ask the tai what your child can get."
        },
        "forMe": {
          "mr": "आज अंगणवाडी ताईंना घरपोच आहाराबद्दल विचारा.",
          "hi": "आज आंगनवाड़ी दीदी से टेक-होम राशन के बारे में पूछें।",
          "en": "Ask the Anganwadi tai about take-home ration today."
        }
      }
    ],
    "warning": {
      "mr": "यापैकी काहीही असेल तर लगेच आरोग्य केंद्रात जा किंवा 108 ला फोन करा: मूल काही पिऊ किंवा स्तनपान करू शकत नाही, सगळं उलटून टाकतं, झटके, खूप झोपाळलेलं, जलद किंवा त्रासाने श्वास, जुलाबात रक्त, डोळे खोल जाणं किंवा लघवी खूप कमी होणं, खूप ताप.",
      "hi": "इनमें से कुछ भी हो तो तुरंत स्वास्थ्य केंद्र जाएँ या 108 पर फ़ोन करें: बच्चा कुछ पी न पाए या स्तनपान न कर पाए, सब कुछ उल्टी कर दे, दौरे, बहुत ज़्यादा सुस्ती, तेज़ या मुश्किल से साँस, दस्त में खून, धँसी आँखें या बहुत कम पेशाब, तेज़ बुख़ार।",
      "en": "Go to the health centre or call 108 at once if the child: cannot drink or breastfeed, vomits everything, has fits, is very sleepy, breathes fast or with difficulty, has diarrhoea with blood or signs of dehydration like sunken eyes or very little urine, or has a high fever."
    },
    "src": "WHO/UNICEF infant and young child feeding; POSHAN Abhiyaan"
  },
  {
    "id": "child_2_6y",
    "title": {
      "mr": "मूल: 2 वर्षांपासून शाळेपर्यंत",
      "hi": "बच्चा: 2 साल से स्कूल तक",
      "en": "Child: 2 years to school age"
    },
    "intro": {
      "mr": "आता मूल घरचं जेवण जेवतं आणि तुमच्याकडून सवयी शिकतं. आरोग्याच्या कोणत्याही प्रश्नासाठी ANM, आशा ताई, अंगणवाडी ताई किंवा डॉक्टरांना विचारा.",
      "hi": "अब बच्चा घर का खाना खाता है और आपसे आदतें सीखता है। सेहत से जुड़े किसी भी सवाल के लिए ANM, आशा दीदी, आंगनवाड़ी दीदी या डॉक्टर से पूछें।",
      "en": "Your child now eats family food and learns habits from you. For any health question, ask the ANM, ASHA tai, Anganwadi tai or doctor."
    },
    "stages": [
      "child_1_3y",
      "child_3_6y"
    ],
    "cards": [
      {
        "title": {
          "mr": "घरचं जेवण, कमी तिखट",
          "hi": "घर का खाना, कम मसालेदार",
          "en": "Family food, less spicy"
        },
        "body": {
          "mr": "तिखट आणि जास्त मीठ घालण्याआधी मुलाचा वाटा बाजूला काढा.",
          "hi": "मिर्च और ज़्यादा नमक डालने से पहले बच्चे का हिस्सा अलग निकालें।",
          "en": "Take out the child's share before adding chilli and extra salt."
        },
        "forMe": {
          "mr": "आज दुपारी मुलाचा वाटा आधीच बाजूला काढा.",
          "hi": "आज दोपहर में बच्चे का हिस्सा पहले ही अलग रखें।",
          "en": "Keep aside the child's share at lunch today."
        }
      },
      {
        "title": {
          "mr": "थोडं थोडं, अनेकदा",
          "hi": "थोड़ा-थोड़ा, कई बार",
          "en": "Small meals, many times"
        },
        "body": {
          "mr": "दिवसभरात थोडं थोडं जेवण आणि पौष्टिक खाऊ द्या. छोटं पोट लवकर भरतं.",
          "hi": "दिन भर में थोड़ा-थोड़ा खाना और पौष्टिक नाश्ता दें। छोटा पेट जल्दी भरता है।",
          "en": "Give small meals and healthy snacks through the day. A small stomach fills fast."
        },
        "forMe": {
          "mr": "आज जेवणांच्या मधल्या वेळेत एखादं फळ द्या.",
          "hi": "आज खानों के बीच कोई फल दें।",
          "en": "Give a fruit between meals today."
        }
      },
      {
        "title": {
          "mr": "रोज डाळ किंवा अंडं",
          "hi": "रोज़ दाल या अंडा",
          "en": "Dal or egg every day"
        },
        "body": {
          "mr": "डाळ, उसळ, अंडं किंवा मासे मुलाच्या वाढीला मदत करतात. यातलं काहीतरी रोज द्या.",
          "hi": "दाल, अंडा या मछली बच्चे के बढ़ने में मदद करते हैं। इनमें से कुछ रोज़ दें।",
          "en": "Dal, usal, egg or fish help the child grow. Give one of these every day."
        },
        "forMe": {
          "mr": "आज मुलाच्या ताटात घट्ट वरण किंवा अंडं वाढा.",
          "hi": "आज बच्चे की थाली में गाढ़ी दाल या अंडा रखें।",
          "en": "Put thick dal or an egg on the child's plate today."
        }
      },
      {
        "title": {
          "mr": "अंगणवाडीतलं जेवण आणि शाळा",
          "hi": "आंगनवाड़ी का खाना और पढ़ाई",
          "en": "Anganwadi meal and pre-school"
        },
        "body": {
          "mr": "अंगणवाडीत पूर्व-प्राथमिक वयाच्या मुलांना गरम शिजवलेलं जेवण आणि शिक्षण मिळतं. मुलाला नियमित पाठवा.",
          "hi": "आंगनवाड़ी में प्री-स्कूल उम्र के बच्चों को गरम पका खाना और पढ़ाई मिलती है। बच्चे को नियमित भेजें।",
          "en": "The Anganwadi gives pre-school children a hot cooked meal and early learning. Send your child regularly."
        },
        "forMe": {
          "mr": "आज मुलाने अंगणवाडीत काय खाल्लं, ते ताईंना विचारा.",
          "hi": "आंगनवाड़ी दीदी से पूछें कि आज बच्चे ने वहाँ क्या खाया।",
          "en": "Ask the Anganwadi tai what your child ate there today."
        }
      },
      {
        "title": {
          "mr": "रंगीत ताट, पाकिटं नको",
          "hi": "रंगीन थाली, पैकेट नहीं",
          "en": "Colours, not packets"
        },
        "body": {
          "mr": "पालेभाजी, डाळ, भोपळा, फळं आणि दही द्या. चिप्स, बिस्किटं आणि पाकिटातली पेयं कधीतरीच.",
          "hi": "हरी सब्ज़ी, दाल, कद्दू, फल और दही दें। चिप्स, बिस्कुट और पैकेट वाले पेय कभी-कभार ही।",
          "en": "Give greens, dal, pumpkin, fruit and curd. Keep chips, biscuits and packet drinks for rare days."
        },
        "forMe": {
          "mr": "आज पाकिटातल्या खाऊऐवजी फळ द्या.",
          "hi": "आज पैकेट वाले नाश्ते की जगह फल दें।",
          "en": "Swap a packet snack for a fruit today."
        }
      },
      {
        "title": {
          "mr": "हात धुण्याची सवय",
          "hi": "हाथ धोने की आदत",
          "en": "Handwashing habit"
        },
        "body": {
          "mr": "जेवणाआधी आणि शौचाहून आल्यावर मुलाचे हात साबणाने धुवा. मुलं तुमचं बघून शिकतात.",
          "hi": "खाने से पहले और शौच के बाद बच्चे के हाथ साबुन से धुलाएँ। बच्चे आपको देखकर सीखते हैं।",
          "en": "Wash the child's hands with soap before eating and after the toilet. Children copy what you do."
        },
        "forMe": {
          "mr": "पुढच्या जेवणाआधी मुलासोबत हात धुवा.",
          "hi": "अगले खाने से पहले बच्चे के साथ हाथ धोएँ।",
          "en": "Wash hands together with your child before the next meal."
        }
      }
    ],
    "warning": {
      "mr": "यापैकी काहीही असेल तर लगेच आरोग्य केंद्रात जा किंवा 108 ला फोन करा: मूल काही पिऊ किंवा स्तनपान करू शकत नाही, सगळं उलटून टाकतं, झटके, खूप झोपाळलेलं, जलद किंवा त्रासाने श्वास, जुलाबात रक्त, डोळे खोल जाणं किंवा लघवी खूप कमी होणं, खूप ताप.",
      "hi": "इनमें से कुछ भी हो तो तुरंत स्वास्थ्य केंद्र जाएँ या 108 पर फ़ोन करें: बच्चा कुछ पी न पाए या स्तनपान न कर पाए, सब कुछ उल्टी कर दे, दौरे, बहुत ज़्यादा सुस्ती, तेज़ या मुश्किल से साँस, दस्त में खून, धँसी आँखें या बहुत कम पेशाब, तेज़ बुख़ार।",
      "en": "Go to the health centre or call 108 at once if the child: cannot drink or breastfeed, vomits everything, has fits, is very sleepy, breathes fast or with difficulty, has diarrhoea with blood or signs of dehydration like sunken eyes or very little urine, or has a high fever."
    },
    "src": "WHO/UNICEF infant and young child feeding; POSHAN Abhiyaan; ICMR-NIN Dietary Guidelines for Indians 2024"
  },
  {
    "id": "girl",
    "title": {
      "mr": "वाढत्या वयातील मुली",
      "hi": "बढ़ती उम्र की लड़कियाँ",
      "en": "Growing girls"
    },
    "intro": {
      "mr": "चांगल्या अन्नामुळे वाढ, अभ्यास आणि खेळ यांना ताकद मिळते. आरोग्याच्या कोणत्याही प्रश्नासाठी ANM, आशा ताई, अंगणवाडी ताई किंवा डॉक्टरांना विचारा.",
      "hi": "अच्छे खाने से बढ़ने, पढ़ने और खेलने की ताक़त मिलती है। सेहत से जुड़े किसी भी सवाल के लिए ANM, आशा दीदी, आंगनवाड़ी दीदी या डॉक्टर से पूछें।",
      "en": "Good food gives you strength to grow, study and play. For any health question, ask the ANM, ASHA tai, Anganwadi tai or doctor."
    },
    "stages": [
      "girl_10_18"
    ],
    "cards": [
      {
        "title": {
          "mr": "रोज लोह",
          "hi": "रोज़ आयरन",
          "en": "Iron every day"
        },
        "body": {
          "mr": "पाळी आणि वाढ यांमुळे मुलींना लोह जास्त लागतं. पालेभाज्या, डाळी, बाजरी, अंडी किंवा मासे खा.",
          "hi": "पीरियड्स और बढ़ती उम्र के कारण लड़कियों को आयरन ज़्यादा चाहिए। हरी सब्ज़ी, दाल, बाजरा, अंडा या मछली खाएँ।",
          "en": "Periods and growth mean girls need more iron. Eat greens, dals, bajra, eggs or fish."
        },
        "forMe": {
          "mr": "आज एखादी पालेभाजी खा.",
          "hi": "आज कोई हरी पत्तेदार सब्ज़ी खाएँ।",
          "en": "Eat a green leafy vegetable today."
        }
      },
      {
        "title": {
          "mr": "लिंबू, आवळा, पेरू",
          "hi": "नींबू, आँवला, अमरूद",
          "en": "Lemon, amla, guava"
        },
        "body": {
          "mr": "यांमुळे अन्नातलं लोह शरीराला जास्त मिळतं. जेवणासोबत यातलं एक घ्या.",
          "hi": "इनसे खाने का आयरन शरीर को ज़्यादा मिलता है। खाने के साथ इनमें से एक लें।",
          "en": "These help your body take in iron from food. Have one with your meal."
        },
        "forMe": {
          "mr": "आज वरणावर लिंबू पिळा.",
          "hi": "आज दाल पर नींबू निचोड़ें।",
          "en": "Squeeze lemon on your dal today."
        }
      },
      {
        "title": {
          "mr": "आठवड्याची IFA गोळी",
          "hi": "हफ़्ते की IFA गोली",
          "en": "Weekly IFA tablet"
        },
        "body": {
          "mr": "जिथे हा कार्यक्रम चालतो, तिथे शाळेत आठवड्यातून एकदा लोह आणि फॉलिक ॲसिडची (IFA) गोळी मोफत मिळते. शाळेत जात नसाल तर अंगणवाडी ताईंना विचारा आणि शिक्षक किंवा ANM सांगतील तशी घ्या.",
          "hi": "जहाँ यह कार्यक्रम चलता है, वहाँ स्कूल में हफ़्ते में एक बार आयरन और फ़ोलिक एसिड (IFA) की गोली मुफ़्त मिलती है। स्कूल नहीं जातीं तो आंगनवाड़ी दीदी से पूछें, और टीचर या ANM जैसा बताएँ, वैसे लें।",
          "en": "Where the programme runs, schools give a free iron and folic acid (IFA) tablet once a week. If you are not in school, ask the Anganwadi tai, and take it as the teacher or ANM says."
        },
        "forMe": {
          "mr": "आज शिक्षकांना आठवड्याच्या IFA गोळीबद्दल विचारा.",
          "hi": "आज टीचर से हफ़्ते वाली IFA गोली के बारे में पूछें।",
          "en": "Ask your teacher about the weekly IFA tablet today."
        }
      },
      {
        "title": {
          "mr": "पाळीत नेहमीसारखं जेवा",
          "hi": "पीरियड्स में सामान्य खाना",
          "en": "Eat normally in periods"
        },
        "body": {
          "mr": "दही, आंबट किंवा कोणतंही नेहमीचं अन्न टाळायची गरज नाही. चांगलं जेवा आणि पाणी प्या.",
          "hi": "दही, खट्टा या कोई भी सामान्य खाना छोड़ने की ज़रूरत नहीं। अच्छा खाएँ और पानी पिएँ।",
          "en": "There is no need to avoid curd, sour food or any normal food. Eat well and drink water."
        },
        "forMe": {
          "mr": "पुढच्या पाळीत नेहमीचं जेवण जेवा.",
          "hi": "अगले पीरियड्स में रोज़ का खाना खाएँ।",
          "en": "On your next period, eat your usual meals."
        }
      },
      {
        "title": {
          "mr": "मजबूत हाडं",
          "hi": "मज़बूत हड्डियाँ",
          "en": "Strong bones"
        },
        "body": {
          "mr": "दूध, दही, नाचणी, तीळ आणि डाळ यांनी शरीर मजबूत होतं. जेवण चुकवू नका.",
          "hi": "दूध, दही, रागी, तिल और दाल से शरीर मज़बूत बनता है। खाना न छोड़ें।",
          "en": "Milk, curd, ragi, til and dal help you grow strong. Do not skip meals."
        },
        "forMe": {
          "mr": "आज नाचणीची भाकरी किंवा वाटीभर दही खा.",
          "hi": "आज रागी की रोटी या कटोरी भर दही खाएँ।",
          "en": "Have a ragi bhakri or a bowl of curd today."
        }
      }
    ],
    "warning": {
      "mr": "खूप जास्त रक्तस्राव, चक्कर येऊन पडणं किंवा खूप दुखणं असेल तर लगेच आरोग्य केंद्रात जा किंवा 108 ला फोन करा.",
      "hi": "बहुत ज़्यादा खून आना, बेहोश होना या बहुत तेज़ दर्द हो तो तुरंत स्वास्थ्य केंद्र जाएँ या 108 पर फ़ोन करें।",
      "en": "Go to the health centre or call 108 at once if you have very heavy bleeding, fainting or severe pain."
    },
    "src": "Anemia Mukt Bharat; ICMR-NIN Dietary Guidelines for Indians 2024"
  }
];

export const myths: Myth[] = [
  {
    "id": "eat_for_two",
    "myth": {
      "mr": "गरोदरपणात दोन माणसांचं जेवण जेवायला हवं.",
      "hi": "गर्भवती को दो लोगों जितना खाना चाहिए।",
      "en": "Pregnant women must eat for two."
    },
    "fact": {
      "mr": "दुप्पट जेवणाची गरज नसते. चौथ्या महिन्यापासून रोज एक छोटं जेवण वाढवा, आणि स्तनपानाच्या काळात थोडं जास्त खा. अन्न पौष्टिक असणं सगळ्यात महत्त्वाचं.",
      "hi": "दोगुने खाने की ज़रूरत नहीं। चौथे महीने से रोज़ एक छोटा खाना और लें, और स्तनपान के समय थोड़ा ज़्यादा खाएँ। खाना पौष्टिक हो, यही सबसे ज़रूरी है।",
      "en": "You do not need double food. From the 4th month, add one extra small meal a day, and eat a little more when breastfeeding. Good quality food matters most."
    },
    "forMe": {
      "mr": "आज फक्त भात वाढवण्याऐवजी जेवणात डाळ, पालेभाजी आणि फळ घ्या.",
      "hi": "आज सिर्फ़ चावल बढ़ाने के बजाय खाने में दाल, हरी सब्ज़ी और फल लें।",
      "en": "Today, add dal, greens and fruit to your meals instead of just more rice."
    },
    "src": "ICMR-NIN Dietary Guidelines for Indians 2024"
  },
  {
    "id": "colostrum_bad",
    "myth": {
      "mr": "पहिलं पिवळं दूध बाळासाठी वाईट असतं.",
      "hi": "पहला पीला दूध बच्चे के लिए ख़राब होता है।",
      "en": "The first yellow milk is bad for the baby."
    },
    "fact": {
      "mr": "हे पहिलं घट्ट पिवळं दूध बाळाचं आजारांपासून रक्षण करायला मदत करतं. जन्मानंतर 1 तासाच्या आत पाजा, ते फेकू नका.",
      "hi": "यह पहला गाढ़ा पीला दूध बच्चे को बीमारियों से बचाने में मदद करता है। जन्म के 1 घंटे के अंदर पिलाएँ, इसे फेंकें नहीं।",
      "en": "This first thick yellow milk helps protect the baby from illness. Give it within 1 hour of birth. Do not throw it away."
    },
    "forMe": {
      "mr": "घरच्यांना सांगा: पहिलं पिवळं दूध हे बाळाचं पहिलं संरक्षण आहे.",
      "hi": "परिवार को बताएँ: पहला पीला दूध बच्चे की पहली सुरक्षा है।",
      "en": "Tell your family: the first yellow milk is the baby's first protection."
    },
    "src": "WHO/UNICEF infant and young child feeding"
  },
  {
    "id": "newborn_water",
    "myth": {
      "mr": "नवजात बाळाला पाणी, मध किंवा बाळगुटी लागते.",
      "hi": "नवजात बच्चे को पानी, शहद या घुट्टी चाहिए।",
      "en": "Newborns need water, honey or ghutti."
    },
    "fact": {
      "mr": "पहिले 6 महिने बाळाला लागणारं सगळं पाणी आणि अन्न आईच्या दुधात असतं. पाणी, मध किंवा बाळगुटीमुळे लहान बाळ आजारी पडू शकतं.",
      "hi": "पहले 6 महीने बच्चे को जितना पानी और खाना चाहिए, सब माँ के दूध में होता है। पानी, शहद या घुट्टी से छोटा बच्चा बीमार हो सकता है।",
      "en": "Breast milk has all the water and food a baby needs for the first 6 months. Water, honey or ghutti can make a small baby ill."
    },
    "forMe": {
      "mr": "फक्त आईचं दूध द्या. बाळ आजारी वाटलं तर आशा ताई किंवा डॉक्टरांना विचारा.",
      "hi": "सिर्फ़ माँ का दूध दें। बच्चा बीमार लगे तो आशा दीदी या डॉक्टर से पूछें।",
      "en": "Give only breast milk. If the baby seems unwell, ask the ASHA tai or a doctor."
    },
    "src": "WHO/UNICEF infant and young child feeding"
  },
  {
    "id": "jaggery_anaemia",
    "myth": {
      "mr": "फक्त गूळ खाल्ल्याने ॲनिमिया (रक्ताची कमतरता) दूर होतो.",
      "hi": "सिर्फ़ गुड़ खाने से एनीमिया (खून की कमी) दूर हो जाता है।",
      "en": "Jaggery alone fixes anaemia."
    },
    "fact": {
      "mr": "गुळात थोडंच लोह असतं. पालेभाज्या, डाळी, अंडी आणि मासे लिंबू किंवा आवळ्यासोबत खा, आणि ANM सांगतील तशा IFA गोळ्या घ्या.",
      "hi": "गुड़ में थोड़ा ही आयरन होता है। हरी सब्ज़ियाँ, दालें, अंडा और मछली नींबू या आँवले के साथ खाएँ, और ANM जैसा बताएँ, वैसे IFA की गोलियाँ लें।",
      "en": "Jaggery has only a little iron. Eat greens, dals, eggs and fish with lemon or amla, and take IFA tablets as the ANM advises."
    },
    "forMe": {
      "mr": "पुढच्या भेटीत ANM कडून हिमोग्लोबिन तपासून घ्या.",
      "hi": "अगली बार ANM से अपना हीमोग्लोबिन जँचवाएँ।",
      "en": "Ask the ANM to check your haemoglobin at your next visit."
    },
    "src": "Anemia Mukt Bharat"
  },
  {
    "id": "millets_poor_food",
    "myth": {
      "mr": "नाचणी, ज्वारी, बाजरी हे गरिबांचं अन्न आहे.",
      "hi": "मोटा अनाज ग़रीबों का खाना है।",
      "en": "Millets are poor people's food."
    },
    "fact": {
      "mr": "नाचणी, ज्वारी आणि बाजरी प्रत्येक घरासाठी चांगलं अन्न आहे. त्यांतून कॅल्शियम, लोह आणि फायबर मिळतं. नाचणीत कॅल्शियम आणि बाजरीत लोह भरपूर असतं.",
      "hi": "रागी, ज्वार और बाजरा हर परिवार के लिए अच्छा खाना हैं। इनसे कैल्शियम, आयरन और फ़ाइबर मिलता है। रागी में कैल्शियम और बाजरे में आयरन भरपूर होता है।",
      "en": "Ragi, jowar and bajra are good food for every family. They give calcium, iron and fibre. Ragi is rich in calcium and bajra in iron."
    },
    "forMe": {
      "mr": "आज रात्रीच्या जेवणाला नाचणी किंवा बाजरीची भाकरी करा.",
      "hi": "आज रात के खाने में रागी या बाजरे की रोटी बनाएँ।",
      "en": "Make nachni or bajra bhakri for dinner today."
    },
    "src": "ICMR-NIN Dietary Guidelines for Indians 2024"
  },
  {
    "id": "dal_water_enough",
    "myth": {
      "mr": "बाळासाठी डाळीचं पाणी पुरेसं असतं.",
      "hi": "बच्चे के लिए दाल का पानी काफ़ी है।",
      "en": "Dal water is enough for babies."
    },
    "fact": {
      "mr": "डाळीच्या पाण्यात बहुतेक पाणीच असतं. भातासोबत घट्ट, कुस्करलेली डाळ द्या. त्यातून बाळाला खूप जास्त ताकद मिळते.",
      "hi": "दाल के पानी में ज़्यादातर पानी ही होता है। चावल के साथ गाढ़ी, मसली हुई दाल दें। इससे बच्चे को कहीं ज़्यादा ताक़त मिलती है।",
      "en": "Dal water is mostly water. Give thick, mashed dal with rice. It gives the baby much more strength."
    },
    "forMe": {
      "mr": "आज फक्त पाणी नाही, तर डाळीचे दाणे भातात कुस्करून द्या.",
      "hi": "आज सिर्फ़ पानी नहीं, दाल के दाने चावल में मसलकर दें।",
      "en": "Today, mash the dal itself into the rice, not just the water."
    },
    "src": "WHO/UNICEF infant and young child feeding"
  },
  {
    "id": "eggs_hot_summer",
    "myth": {
      "mr": "उन्हाळ्यात अंडी मुलांना \"उष्ण\" पडतात.",
      "hi": "गर्मी में अंडा बच्चों के लिए \"गरम\" होता है।",
      "en": "Eggs are too \"hot\" for children in summer."
    },
    "fact": {
      "mr": "अनेक घरांत असं मानतात, पण अंडी प्रत्येक ऋतूत चांगलं अन्न आहेत. ती पूर्ण शिजवून द्या.",
      "hi": "कई परिवार ऐसा मानते हैं, पर अंडा हर मौसम में अच्छा खाना है। इसे पूरी तरह पकाकर दें।",
      "en": "Many families believe this, but eggs are good food in every season. Give them fully cooked."
    },
    "forMe": {
      "mr": "आज मुलाला उकडलेलं अंडं द्या, ऋतू कोणताही असो.",
      "hi": "आज बच्चे को उबला अंडा दें, मौसम कोई भी हो।",
      "en": "Give your child a boiled egg today, whatever the season."
    },
    "src": "ICMR-NIN Dietary Guidelines for Indians 2024"
  },
  {
    "id": "periods_sour_food",
    "myth": {
      "mr": "पाळीत दही किंवा आंबट खाऊ नये.",
      "hi": "पीरियड्स में दही या खट्टा नहीं खाना चाहिए।",
      "en": "Avoid curd or sour food during periods."
    },
    "fact": {
      "mr": "हे पदार्थ टाळायची गरज नाही. पाळीत नेहमीसारखं जेवा: डाळ, पालेभाजी आणि पुरेसं पाणी.",
      "hi": "इन चीज़ों से बचने की ज़रूरत नहीं। पीरियड्स में सामान्य खाना खाएँ: दाल, हरी सब्ज़ी और भरपूर पानी।",
      "en": "There is no need to avoid these foods. Eat normally during periods, with dal, greens and enough water."
    },
    "forMe": {
      "mr": "पुढच्या पाळीत दहीसकट नेहमीचं जेवण जेवा.",
      "hi": "अगले पीरियड्स में दही समेत रोज़ का खाना खाएँ।",
      "en": "On your next period, eat your usual meals, curd included."
    },
    "src": "Garg and Anand, Menstruation related myths in India, J Family Med Prim Care 2015"
  },
  {
    "id": "packet_juice",
    "myth": {
      "mr": "पाकिटातला ज्यूस फळाइतकाच चांगला असतो.",
      "hi": "पैकेट वाला जूस फल जितना ही अच्छा है।",
      "en": "Packaged juice is as good as fruit."
    },
    "fact": {
      "mr": "अख्खं फळ जास्त चांगलं. त्यात फायबर असतं आणि पोट भरतं. अनेक पाकिटातल्या पेयांत वरून साखर घातलेली असते.",
      "hi": "साबुत फल ज़्यादा अच्छा है। इसमें फ़ाइबर होता है और पेट भरता है। कई पैकेट वाले पेय में ऊपर से चीनी मिली होती है।",
      "en": "Whole fruit is better. It has fibre and fills you up. Many packet drinks have added sugar."
    },
    "forMe": {
      "mr": "आज ज्यूसच्या पाकिटाऐवजी केळं किंवा पेरू घ्या.",
      "hi": "आज जूस के पैकेट की जगह केला या अमरूद लें।",
      "en": "Buy a banana or guava instead of a juice packet today."
    },
    "src": "ICMR-NIN Dietary Guidelines for Indians 2024"
  },
  {
    "id": "no_fat_for_kids",
    "myth": {
      "mr": "लहान मुलांना तूप किंवा तेल देऊ नये.",
      "hi": "छोटे बच्चों को घी या तेल नहीं देना चाहिए।",
      "en": "Small children should not have ghee or oil."
    },
    "fact": {
      "mr": "लहान मुलांना वाढीसाठी ताकद लागते. अन्नात थोडं तूप किंवा तेल घातलं की ती मिळते. जास्त घालायची गरज नाही.",
      "hi": "छोटे बच्चों को बढ़ने के लिए ताक़त चाहिए। खाने में थोड़ा घी या तेल डालने से वह मिलती है। ज़्यादा की ज़रूरत नहीं।",
      "en": "Small children need energy to grow. A little ghee or oil in their food gives that energy. A lot is not needed."
    },
    "forMe": {
      "mr": "आज मुलाच्या वरण-भातात थोडं तूप किंवा तेल घाला.",
      "hi": "आज बच्चे के दाल-चावल में थोड़ा घी या तेल डालें।",
      "en": "Add a little ghee or oil to your child's dal-rice today."
    },
    "src": "WHO/UNICEF infant and young child feeding"
  }
];

export const localFoods: LocalFood[] = [
  {
    "id": "ragi",
    "ingredient": "ragi",
    "name": {
      "mr": "नाचणी",
      "hi": "रागी (नाचनी)",
      "en": "Ragi (nachni)"
    },
    "why": {
      "mr": "कॅल्शियम आणि फायबर देणारं स्थानिक भरडधान्य. प्रत्येक वयात हाडांसाठी चांगलं.",
      "hi": "कैल्शियम और फ़ाइबर देने वाला स्थानीय मोटा अनाज। हर उम्र में हड्डियों के लिए अच्छा।",
      "en": "A local millet that gives calcium and fibre. Good for bones at every age."
    },
    "howToUse": {
      "mr": "भाकरी किंवा घट्ट सत्त्व करा. 6 महिन्यांवरील बाळासाठी सत्त्व घट्ट शिजवून थोडं तूप घाला.",
      "hi": "भाकरी या गाढ़ा सत्व बनाएँ। 6 महीने से बड़े बच्चे के लिए सत्व गाढ़ा पकाकर थोड़ा घी डालें।",
      "en": "Make bhakri or thick satva. For a baby over 6 months, cook satva thick and add a little ghee."
    },
    "costNote": {
      "mr": "अंदाजे: कुटुंबाच्या एका जेवणाच्या भाकरीसाठी सुमारे ₹15-20.",
      "hi": "अंदाज़न: परिवार के एक समय की भाकरी के लिए लगभग ₹15-20।",
      "en": "Approximate: about ₹15-20 for a family meal of bhakri."
    },
    "highlights": [
      "calcium",
      "fibre",
      "energy"
    ],
    "art": "millet"
  },
  {
    "id": "bajra",
    "ingredient": "bajra",
    "name": {
      "mr": "बाजरी",
      "hi": "बाजरा",
      "en": "Bajra (pearl millet)"
    },
    "why": {
      "mr": "लोह, फायबर आणि ताकद देणारं भरडधान्य. पोट भरतं आणि स्वस्त आहे.",
      "hi": "आयरन, फ़ाइबर और ताक़त देने वाला मोटा अनाज। पेट भरता है और सस्ता है।",
      "en": "A millet that gives iron, fibre and energy. Filling and low cost."
    },
    "howToUse": {
      "mr": "बाजरीची भाकरी पालेभाजीसोबत, लिंबू पिळून खा.",
      "hi": "बाजरे की रोटी हरी सब्ज़ी के साथ, नींबू निचोड़कर खाएँ।",
      "en": "Eat bajra bhakri with a green bhaji and a squeeze of lemon."
    },
    "costNote": {
      "mr": "अंदाजे: कुटुंबाच्या एका जेवणाच्या भाकरीसाठी सुमारे ₹10-15.",
      "hi": "अंदाज़न: परिवार के एक समय की रोटी के लिए लगभग ₹10-15।",
      "en": "Approximate: about ₹10-15 for a family meal of bhakri."
    },
    "highlights": [
      "iron",
      "fibre",
      "energy"
    ],
    "art": "millet"
  },
  {
    "id": "drumstick_leaves",
    "ingredient": "drumstick_leaves",
    "name": {
      "mr": "शेवग्याची पानं",
      "hi": "सहजन के पत्ते",
      "en": "Drumstick leaves (shevga)"
    },
    "why": {
      "mr": "व्हिटॅमिन A आणि कॅल्शियम देणारी पानं. अनेक घरांच्या अंगणात हे झाड असतं.",
      "hi": "विटामिन A और कैल्शियम देने वाले पत्ते। यह पेड़ कई घरों के आँगन में होता है।",
      "en": "Leaves that give vitamin A and calcium. The tree grows in many home yards."
    },
    "howToUse": {
      "mr": "नीट धुऊन वरण, भाजी किंवा थालीपिठात घाला.",
      "hi": "अच्छी तरह धोकर दाल, सब्ज़ी या पराठे में डालें।",
      "en": "Wash well and add to dal, bhaji or thalipeeth."
    },
    "costNote": {
      "mr": "अंदाजे: घरच्या झाडाची पानं अनेकदा मोफत, बाजारातही स्वस्त.",
      "hi": "अंदाज़न: घर के पेड़ से अक्सर मुफ़्त, बाज़ार में भी सस्ते।",
      "en": "Approximate: often free from a home tree, and low cost at the market."
    },
    "highlights": [
      "vit_a",
      "calcium",
      "fibre"
    ],
    "art": "leafy"
  },
  {
    "id": "methi",
    "ingredient": "methi",
    "name": {
      "mr": "मेथी",
      "hi": "मेथी",
      "en": "Methi (fenugreek leaves)"
    },
    "why": {
      "mr": "लोह, कॅल्शियम आणि व्हिटॅमिन A देणारी पालेभाजी. लिंबासोबत खा.",
      "hi": "आयरन, कैल्शियम और विटामिन A देने वाली पत्तेदार सब्ज़ी। नींबू के साथ खाएँ।",
      "en": "A leafy green that gives iron, calcium and vitamin A. Eat it with lemon."
    },
    "howToUse": {
      "mr": "भाजी करा, किंवा वरणात, थेपल्यात किंवा भाकरीच्या पिठात घाला.",
      "hi": "सब्ज़ी बनाएँ, या दाल, थेपले या रोटी के आटे में डालें।",
      "en": "Cook as bhaji, or add to dal, thepla or bhakri dough."
    },
    "costNote": {
      "mr": "अंदाजे: एक जुडी सुमारे ₹10-20, हिवाळ्यात स्वस्त.",
      "hi": "अंदाज़न: एक गड्डी लगभग ₹10-20, सर्दी में सस्ती।",
      "en": "Approximate: about ₹10-20 a bunch, cheaper in winter."
    },
    "season": {
      "mr": "हिवाळ्यात जास्त",
      "hi": "सर्दी में ज़्यादा",
      "en": "More in winter"
    },
    "highlights": [
      "iron",
      "calcium",
      "vit_a"
    ],
    "art": "leafy"
  },
  {
    "id": "matki_sprouts",
    "ingredient": "matki",
    "name": {
      "mr": "मोड आलेली मटकी",
      "hi": "अंकुरित मोठ",
      "en": "Matki sprouts"
    },
    "why": {
      "mr": "स्वस्तात प्रथिनं आणि फायबर. मोड आल्यावर मटकी पचायला सोपी होते.",
      "hi": "सस्ते में प्रोटीन और फ़ाइबर। अंकुरित होने पर मोठ आसानी से पचती है।",
      "en": "Low-cost protein and fibre. Sprouting makes matki easier to digest."
    },
    "howToUse": {
      "mr": "रात्रभर भिजवा, मोड येईपर्यंत ओल्या कपड्यात बांधा, मग उसळ करा.",
      "hi": "रात भर भिगोएँ, अंकुर आने तक गीले कपड़े में बाँधें, फिर पकाकर खाएँ।",
      "en": "Soak overnight, tie in a wet cloth until sprouts show, then cook as usal."
    },
    "costNote": {
      "mr": "अंदाजे: कुटुंबाच्या उसळीसाठी सुमारे ₹20-30.",
      "hi": "अंदाज़न: परिवार के एक समय के लिए लगभग ₹20-30।",
      "en": "Approximate: about ₹20-30 for a family bowl of usal."
    },
    "highlights": [
      "protein",
      "fibre",
      "iron"
    ],
    "art": "sprouts"
  },
  {
    "id": "peanuts",
    "ingredient": "peanuts",
    "name": {
      "mr": "शेंगदाणे",
      "hi": "मूँगफली",
      "en": "Peanuts"
    },
    "why": {
      "mr": "प्रथिनं, चांगलं तेल आणि ताकद देतात. मूठभर पुरेसे.",
      "hi": "प्रोटीन, अच्छा तेल और ताक़त देती है। मुट्ठी भर काफ़ी है।",
      "en": "Give protein, good fat and energy. A small handful is enough."
    },
    "howToUse": {
      "mr": "पोह्यात घाला किंवा चटणी, लाडू करा. लहान मुलांना कूट करून द्या, अख्खे दाणे नको.",
      "hi": "पोहे में डालें या चटनी, लड्डू बनाएँ। छोटे बच्चों को पीसकर दें, साबुत दाने नहीं।",
      "en": "Add to poha, or make chutney or laddoo. For small children, grind them. Do not give whole nuts."
    },
    "costNote": {
      "mr": "अंदाजे: मूठभर शेंगदाणे सुमारे ₹3-5.",
      "hi": "अंदाज़न: मुट्ठी भर मूँगफली लगभग ₹3-5।",
      "en": "Approximate: about ₹3-5 for a handful."
    },
    "highlights": [
      "protein",
      "healthy_fat",
      "energy"
    ],
    "art": "nuts"
  },
  {
    "id": "egg",
    "ingredient": "egg",
    "name": {
      "mr": "अंडं",
      "hi": "अंडा",
      "en": "Egg"
    },
    "why": {
      "mr": "चांगली प्रथिनं आणि व्हिटॅमिन B12 देतं. शिजवायला सोपं आणि सगळ्या वयांसाठी चांगलं.",
      "hi": "अच्छा प्रोटीन और विटामिन B12 देता है। पकाना आसान और हर उम्र के लिए अच्छा।",
      "en": "Gives good protein and vitamin B12. Easy to cook and good at every age."
    },
    "howToUse": {
      "mr": "पिवळा बलक घट्ट होईपर्यंत उकडा किंवा भुर्जी करा. 6 महिन्यांवरील बाळासाठी उकडलेलं अंडं कुस्करून द्या.",
      "hi": "पीला भाग सख़्त होने तक उबालें या भुर्जी बनाएँ। 6 महीने से बड़े बच्चे को उबला अंडा मसलकर दें।",
      "en": "Boil until the yolk is firm, or make bhurji. For a baby over 6 months, mash a boiled egg."
    },
    "costNote": {
      "mr": "अंदाजे: एक अंडं सुमारे ₹6-8.",
      "hi": "अंदाज़न: एक अंडा लगभग ₹6-8।",
      "en": "Approximate: about ₹6-8 an egg."
    },
    "highlights": [
      "protein",
      "b12",
      "vit_a"
    ],
    "art": "egg"
  },
  {
    "id": "bangda",
    "ingredient": "bangda",
    "name": {
      "mr": "बांगडा",
      "hi": "बांगड़ा (मैकरल मछली)",
      "en": "Bangda (mackerel)"
    },
    "why": {
      "mr": "प्रथिनं आणि चांगलं तेल असलेला स्थानिक समुद्री मासा. समुद्री माशांतून आयोडीनही मिळतं.",
      "hi": "प्रोटीन और अच्छे तेल वाली स्थानीय समुद्री मछली। समुद्री मछली से आयोडीन भी मिलता है।",
      "en": "A local sea fish with protein and good fat. Sea fish also gives iodine."
    },
    "howToUse": {
      "mr": "कालवण करा किंवा तळा, पण पूर्ण शिजवा. मुलांसाठी काटे नीट काढा.",
      "hi": "करी बनाएँ या तलें, पर पूरी तरह पकाएँ। बच्चों के लिए काँटे ध्यान से निकालें।",
      "en": "Make curry or fry it, cooked through. Remove bones carefully for children."
    },
    "costNote": {
      "mr": "अंदाजे: किंमत रोजच्या मासेमारीनुसार बदलते.",
      "hi": "अंदाज़न: दाम रोज़ की पकड़ के हिसाब से बदलता है।",
      "en": "Approximate: the price changes daily with the catch."
    },
    "season": {
      "mr": "पावसाळ्यातल्या मासेमारी बंदीत ताजे मासे कमी",
      "hi": "बरसात में मछली पकड़ने पर रोक के समय ताज़ा मछली कम",
      "en": "Less fresh fish during the monsoon fishing break"
    },
    "highlights": [
      "protein",
      "healthy_fat",
      "iodine"
    ],
    "art": "fish"
  },
  {
    "id": "amla",
    "ingredient": "amla",
    "name": {
      "mr": "आवळा",
      "hi": "आँवला",
      "en": "Amla"
    },
    "why": {
      "mr": "व्हिटॅमिन C भरपूर. जेवणासोबत खाल्ला तर अन्नातलं लोह शरीराला जास्त मिळतं.",
      "hi": "विटामिन C से भरपूर। खाने के साथ लेने से शरीर को खाने का आयरन ज़्यादा मिलता है।",
      "en": "Very rich in vitamin C. Eaten with meals, it helps the body take in iron from food."
    },
    "howToUse": {
      "mr": "चिमूटभर मीठ लावून ताजा खा किंवा चटणी करा.",
      "hi": "चुटकी भर नमक लगाकर ताज़ा खाएँ या चटनी बनाएँ।",
      "en": "Eat it fresh with a pinch of salt, or make a chutney."
    },
    "costNote": {
      "mr": "अंदाजे: हंगामात एक आवळा काही रुपयांत.",
      "hi": "अंदाज़न: मौसम में एक आँवला कुछ रुपयों में।",
      "en": "Approximate: a few rupees each in season."
    },
    "season": {
      "mr": "हिवाळा",
      "hi": "सर्दी",
      "en": "Winter"
    },
    "highlights": [
      "vit_c",
      "fibre"
    ],
    "art": "citrus"
  },
  {
    "id": "banana",
    "ingredient": "banana",
    "name": {
      "mr": "केळं",
      "hi": "केला",
      "en": "Banana"
    },
    "why": {
      "mr": "मऊ, पोटभरीचं आणि ताकद देणारं. 6 महिन्यांवरील बाळासाठी चांगलं पहिलं अन्न.",
      "hi": "नरम, पेट भरने वाला और ताक़त देने वाला। 6 महीने से बड़े बच्चे के लिए अच्छा पहला खाना।",
      "en": "Soft, filling and gives energy. A good first food for a baby over 6 months."
    },
    "howToUse": {
      "mr": "बाळासाठी पिकलेलं केळं कुस्करा. मोठ्या मुलांना खाऊ म्हणून अख्खं केळं द्या.",
      "hi": "बच्चे के लिए पका केला मसलें। बड़े बच्चों को नाश्ते में पूरा केला दें।",
      "en": "Mash a ripe banana for a baby. Give a whole banana as a snack to older children."
    },
    "costNote": {
      "mr": "अंदाजे: एक केळं काही रुपयांत.",
      "hi": "अंदाज़न: एक केला कुछ रुपयों में।",
      "en": "Approximate: a few rupees each."
    },
    "season": {
      "mr": "वर्षभर",
      "hi": "पूरे साल",
      "en": "All year"
    },
    "highlights": [
      "energy",
      "fibre"
    ],
    "art": "banana"
  },
  {
    "id": "pumpkin",
    "ingredient": "pumpkin",
    "name": {
      "mr": "लाल भोपळा",
      "hi": "लाल कद्दू",
      "en": "Red pumpkin (lal bhopla)"
    },
    "why": {
      "mr": "केशरी गरातून व्हिटॅमिन A मिळतं. शिजल्यावर मऊ होतो, म्हणून बाळांना आणि वृद्धांना चांगला.",
      "hi": "नारंगी गूदे से विटामिन A मिलता है। पकने पर नरम हो जाता है, इसलिए बच्चों और बुज़ुर्गों के लिए अच्छा।",
      "en": "The orange flesh gives vitamin A. It turns soft when cooked, so it suits babies and elders."
    },
    "howToUse": {
      "mr": "भाजी करा किंवा आमटीत घाला. बाळासाठी शिजलेला भोपळा नीट कुस्करा.",
      "hi": "सब्ज़ी बनाएँ या सांभर में डालें। बच्चे के लिए पका कद्दू अच्छी तरह मसलें।",
      "en": "Make bhaji or add it to amti. For a baby, mash cooked pumpkin well."
    },
    "costNote": {
      "mr": "अंदाजे: कुटुंबाच्या एका वेळेसाठी सुमारे ₹10-20.",
      "hi": "अंदाज़न: परिवार के एक समय के लिए लगभग ₹10-20।",
      "en": "Approximate: about ₹10-20 for a family serving."
    },
    "highlights": [
      "vit_a",
      "fibre"
    ],
    "art": "veg"
  },
  {
    "id": "aliv",
    "ingredient": "aliv",
    "name": {
      "mr": "अळीव",
      "hi": "हलीम के बीज (अळीव)",
      "en": "Aliv (garden cress seeds)"
    },
    "why": {
      "mr": "महाराष्ट्रात बाळंतिणीसाठीचा पारंपरिक पदार्थ. थोड्याशा अळिवातून लोह आणि फायबर मिळतं.",
      "hi": "महाराष्ट्र में नई माँ के लिए पारंपरिक खाना। थोड़े से बीज से आयरन और फ़ाइबर मिलता है।",
      "en": "A traditional food for new mothers in Maharashtra. A small amount gives iron and fibre."
    },
    "howToUse": {
      "mr": "चमचाभर अळीव दुधात किंवा पाण्यात भिजवून खीर किंवा लाडू करा. गरोदर असाल तर आधी ANM किंवा डॉक्टरांना विचारा.",
      "hi": "चम्मच भर बीज दूध या पानी में भिगोकर खीर या लड्डू बनाएँ। गर्भवती हों तो पहले ANM या डॉक्टर से पूछें।",
      "en": "Soak a spoonful in milk or water, then make kheer or laddoo. If you are pregnant, ask the ANM or doctor first."
    },
    "costNote": {
      "mr": "अंदाजे: चमचाभरच लागतं, त्यामुळे खर्च कमी.",
      "hi": "अंदाज़न: चम्मच भर ही लगता है, इसलिए ख़र्च कम।",
      "en": "Approximate: only a spoonful is used, so it costs little."
    },
    "highlights": [
      "iron",
      "fibre"
    ],
    "art": "mother"
  }
];

export const poshanWeek: WeekDay[] = [
  {
    "day": 1,
    "theme": {
      "mr": "पालेभाजीचा दिवस",
      "hi": "हरी पत्तेदार सब्ज़ी का दिन",
      "en": "Green leafy day"
    },
    "action": {
      "mr": "आज एक पालेभाजी करा. वाढताना वर लिंबू पिळा.",
      "hi": "आज कोई हरी पत्तेदार सब्ज़ी बनाएँ। परोसते समय ऊपर से नींबू निचोड़ें।",
      "en": "Cook a green leafy vegetable today. Add lemon when you serve it."
    },
    "food": {
      "mr": "मेथी, पालक, माठ, शेपू किंवा शेवग्याची पानं.",
      "hi": "मेथी, पालक, चौलाई, सोया या सहजन के पत्ते।",
      "en": "Methi, palak, math, shepu or shevga leaves."
    },
    "art": "leafy"
  },
  {
    "day": 2,
    "theme": {
      "mr": "डाळ आणि उसळीचा दिवस",
      "hi": "दाल और अंकुरित दालों का दिन",
      "en": "Dal and sprouts day"
    },
    "action": {
      "mr": "आज घट्ट वरण किंवा उसळ करा. मोडासाठी रात्री मटकी किंवा मूग भिजत घाला.",
      "hi": "आज गाढ़ी दाल या अंकुरित मूँग बनाएँ। अंकुर के लिए रात को मोठ या मूँग भिगो दें।",
      "en": "Make thick dal or usal today. Soak matki or moong tonight for sprouts."
    },
    "food": {
      "mr": "मटकीची उसळ, मुगाची उसळ, चवळी, तूर किंवा मसूर डाळ.",
      "hi": "मोठ, मूँग, लोबिया, अरहर या मसूर की दाल।",
      "en": "Matki usal, moong usal, chawli, tur or masoor dal."
    },
    "art": "sprouts"
  },
  {
    "day": 3,
    "theme": {
      "mr": "भरडधान्याचा दिवस",
      "hi": "मोटे अनाज का दिन",
      "en": "Millet day"
    },
    "action": {
      "mr": "एका जेवणाला नाचणी, ज्वारी किंवा बाजरीची भाकरी करा.",
      "hi": "एक समय के खाने में रागी, ज्वार या बाजरे की रोटी बनाएँ।",
      "en": "Make bhakri from ragi, jowar or bajra for a meal."
    },
    "food": {
      "mr": "नाचणी, ज्वारी किंवा बाजरीची भाकरी, आणि लहान मुलांसाठी घट्ट नाचणी सत्त्व.",
      "hi": "रागी, ज्वार या बाजरे की भाकरी, और छोटे बच्चों के लिए गाढ़ा नाचनी सत्व।",
      "en": "Ragi, jowar or bajra bhakri, and thick nachni satva for small children."
    },
    "art": "millet"
  },
  {
    "day": 4,
    "theme": {
      "mr": "फळांचा दिवस",
      "hi": "फलों का दिन",
      "en": "Fruit day"
    },
    "action": {
      "mr": "आज घरातल्या प्रत्येकाला एक अख्खं फळ द्या.",
      "hi": "आज घर में सबको एक साबुत फल दें।",
      "en": "Give everyone at home a whole fruit today."
    },
    "food": {
      "mr": "केळं, पेरू, पपई किंवा हिवाळ्यात आवळा. हंगामात जे मिळेल ते.",
      "hi": "केला, अमरूद, पपीता या सर्दी में आँवला। मौसम में जो मिले, वही।",
      "en": "Banana, guava, papaya, or amla in winter. Pick what is in season."
    },
    "art": "fruit"
  },
  {
    "day": 5,
    "theme": {
      "mr": "अंडी किंवा मासे यांचा दिवस",
      "hi": "अंडे या मछली का दिन",
      "en": "Egg or fish day"
    },
    "action": {
      "mr": "पूर्ण शिजवलेलं अंडं किंवा माशाचा तुकडा द्या. शाकाहारी असाल तर दूध, दही किंवा उसळ घ्या.",
      "hi": "पूरी तरह पका अंडा या मछली का टुकड़ा दें। शाकाहारी हों तो दूध, दही या अंकुरित मूँग लें।",
      "en": "Give an egg or a piece of fish, fully cooked. If you are vegetarian, have milk, curd or usal."
    },
    "food": {
      "mr": "उकडलेलं अंडं, अंड्याची भुर्जी, बांगड्याचं कालवण. शाकाहारी: दही, दूध, उसळ, शेंगदाण्याची चटणी.",
      "hi": "उबला अंडा, अंडा भुर्जी, बांगड़ा मछली करी। शाकाहारी: दही, दूध, अंकुरित मूँग, मूँगफली की चटनी।",
      "en": "Boiled egg, egg bhurji, bangda curry. Vegetarian: curd, milk, usal, peanut chutney."
    },
    "art": "fish"
  },
  {
    "day": 6,
    "theme": {
      "mr": "रंगीत ताटाचा दिवस",
      "hi": "रंग-बिरंगी थाली का दिन",
      "en": "Colourful plate day"
    },
    "action": {
      "mr": "आज प्रत्येक ताटात हिरवा, पिवळा आणि केशरी किंवा लाल पदार्थ वाढा.",
      "hi": "आज हर थाली में हरी, पीली और नारंगी या लाल चीज़ रखें।",
      "en": "Put green, yellow and orange or red food on every plate today."
    },
    "food": {
      "mr": "हिरवा: पालेभाजी. पिवळा: वरण. केशरी: भोपळा किंवा गाजर. लाल: टोमॅटो. पांढरा: दही किंवा भात.",
      "hi": "हरा: पत्तेदार सब्ज़ी। पीला: दाल। नारंगी: कद्दू या गाजर। लाल: टमाटर। सफ़ेद: दही या चावल।",
      "en": "Green: leafy bhaji. Yellow: dal. Orange: pumpkin or carrot. Red: tomato. White: curd or rice."
    },
    "art": "thali"
  },
  {
    "day": 7,
    "theme": {
      "mr": "स्वच्छ पाणी आणि हात धुण्याचा दिवस",
      "hi": "साफ़ पानी और हाथ धोने का दिन",
      "en": "Clean water and handwashing day"
    },
    "action": {
      "mr": "स्वयंपाक आणि जेवणाआधी साबणाने हात धुवा. पिण्याचं पाणी झाकून ठेवा आणि डावाने काढा.",
      "hi": "खाना बनाने और खाने से पहले साबुन से हाथ धोएँ। पीने का पानी ढककर रखें और डंडी वाले बर्तन से निकालें।",
      "en": "Wash hands with soap before cooking and eating. Keep drinking water covered and take it out with a ladle."
    },
    "food": {
      "mr": "पिण्याचं स्वच्छ पाणी. पाणी सुरक्षित आहे की नाही अशी शंका असेल तर उकळून थंड करा.",
      "hi": "पीने का साफ़ पानी। पानी सुरक्षित न लगे तो उबालकर ठंडा करें।",
      "en": "Clean drinking water. If you are not sure it is safe, boil it and let it cool."
    },
    "art": "water"
  }
];

export const foodCautions: FoodCaution[] = [
  {
    "id": "honey_under_1y",
    "ingredients": [
      "honey"
    ],
    "underMonths": 12,
    "text": {
      "mr": "1 वर्षाखालील बाळाला मध देऊ नका, जिभेवर थोडासाही नको. त्याने बाळ गंभीर आजारी पडू शकतं.",
      "hi": "1 साल से छोटे बच्चे को शहद न दें, जीभ पर थोड़ा सा भी नहीं। इससे बच्चा गंभीर रूप से बीमार हो सकता है।",
      "en": "Do not give honey to a baby under 1 year, not even a little on the tongue. It can make the baby very ill."
    }
  },
  {
    "id": "no_salt_sugar_under_1y",
    "ingredients": [
      "salt",
      "sugar",
      "jaggery"
    ],
    "underMonths": 12,
    "text": {
      "mr": "1 वर्षाखालील बाळाच्या जेवणात मीठ, साखर किंवा गूळ घालू नका. आधी बाळासाठी काढून ठेवा, मग घरच्यांसाठी मीठ घाला.",
      "hi": "1 साल से छोटे बच्चे के खाने में नमक, चीनी या गुड़ न डालें। पहले बच्चे का हिस्सा निकाल लें, फिर घर वालों के लिए नमक डालें।",
      "en": "Do not add salt, sugar or jaggery to food for a baby under 1 year. Take out the baby portion first, then add salt for the family."
    }
  },
  {
    "id": "animal_milk_under_1y",
    "ingredients": [
      "milk"
    ],
    "underMonths": 12,
    "text": {
      "mr": "1 वर्षापर्यंत बाळासाठी आईचं दूध हेच मुख्य दूध. आईच्या दुधाऐवजी गाईचं किंवा म्हशीचं दूध पिण्यासाठी देऊ नका.",
      "hi": "1 साल तक बच्चे के लिए माँ का दूध ही मुख्य दूध है। माँ के दूध की जगह गाय या भैंस का दूध पीने को न दें।",
      "en": "Until 1 year, breast milk is the main milk for the baby. Do not give cow or buffalo milk as a drink in place of breast milk."
    }
  },
  {
    "id": "choking_under_5y",
    "ingredients": [
      "peanuts"
    ],
    "underMonths": 60,
    "text": {
      "mr": "5 वर्षांखालील मुलांच्या घशात अख्खे शेंगदाणे, सुका मेवा किंवा कडक गोल तुकडे अडकू शकतात. दाणे पूड करून द्या, आणि कडक पदार्थ बारीक चिरून किंवा कुस्करून द्या.",
      "hi": "5 साल से छोटे बच्चों के गले में साबुत मूंगफली, सूखे मेवे या सख़्त गोल टुकड़े फँस सकते हैं। मेवे पीसकर पाउडर बनाकर दें, और सख़्त चीज़ें बारीक काटकर या मसलकर दें।",
      "en": "Children under 5 can choke on whole peanuts, nuts or hard round pieces. Grind nuts to a powder, and cut or mash hard foods."
    }
  },
  {
    "id": "tea_coffee_children",
    "ingredients": [
      "tea",
      "coffee"
    ],
    "underMonths": 120,
    "text": {
      "mr": "मुलांना चहा किंवा कॉफी देऊ नका. 1 वर्षानंतर त्याऐवजी दूध किंवा ताक द्या. जेवणासोबत चहा घेतल्याने अन्नातलं लोह शरीराला कमी मिळतं.",
      "hi": "बच्चों को चाय या कॉफ़ी न दें। 1 साल के बाद इसकी जगह दूध या छाछ दें। खाने के साथ चाय पीने से खाने का आयरन शरीर को कम मिलता है।",
      "en": "Do not give tea or coffee to children. After 1 year, give milk or buttermilk instead. Tea with meals also lowers the iron the body takes from food."
    }
  },
  {
    "id": "cook_fully_pregnancy",
    "ingredients": [
      "egg",
      "bangda",
      "bombil",
      "prawns",
      "chicken"
    ],
    "pregnancy": true,
    "text": {
      "mr": "गरोदरपणात अंडी, मासे, कोळंबी आणि चिकन पूर्ण शिजवूनच खा. अंड्याचा बलक घट्ट हवा, आणि माशाचा किंवा मांसाचा कोणताही भाग कच्चा दिसू नये.",
      "hi": "गर्भावस्था में अंडे, मछली, झींगे और चिकन पूरी तरह पकाकर ही खाएँ। अंडे की ज़र्दी सख़्त हो, और मछली या मांस का कोई हिस्सा कच्चा न दिखे।",
      "en": "In pregnancy, eat eggs, fish, prawns and chicken only when fully cooked. The egg yolk should be firm, and no part of the fish or meat should look raw."
    }
  },
  {
    "id": "packaged_food_children",
    "ingredients": [
      "biscuits",
      "packaged_juice",
      "sweets"
    ],
    "underMonths": 60,
    "text": {
      "mr": "पाकिटातला ज्यूस, बिस्किटं आणि मिठाई हे लहान मुलांचं रोजचं अन्न नाही. त्यात बहुतेक वेळा साखर, मीठ किंवा तेल जास्त आणि पोषण कमी असतं. त्याऐवजी फळं, घरचा खाऊ आणि पाणी द्या.",
      "hi": "पैकेट वाला जूस, बिस्कुट और मिठाई छोटे बच्चों का रोज़ का खाना नहीं है। इनमें अक्सर चीनी, नमक या तेल ज़्यादा और पोषण कम होता है। इसकी जगह फल, घर का बना नाश्ता और पानी दें।",
      "en": "Packaged juice, biscuits and sweets are not everyday food for small children. They often have a lot of sugar, salt or oil, and little nutrition. Give fruit, home-made snacks and water instead."
    }
  }
];
