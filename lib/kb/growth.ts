import type { Topic } from "./types";

// EDUCATION, CAREER, INCOME & GOVERNMENT SCHEMES for AADHI TI AI.
// Scheme details are general guidance — rules change, so every scheme answer asks her to verify officially.

const ADULT: Topic["ages"] = ["18", "30", "40", "50"];

const VERIFY = {
  mr: "नियम बदलू शकतात — अधिकृत portal किंवा कार्यालयात नक्की तपासा.",
  en: "Rules can change — always check on the official portal or at the office.",
  hi: "नियम बदल सकते हैं — आधिकारिक portal या कार्यालय में ज़रूर जाँचें.",
};

const INCOME_FINDER = {
  label: { mr: "कमाईचे मार्ग शोधा", en: "Open Income Finder", hi: "कमाई के रास्ते खोजें" },
  href: "/schemes#income-finder",
};

const SCHEMES = {
  label: { mr: "सरकारी योजना पाहा", en: "See government schemes", hi: "सरकारी योजनाएँ देखें" },
  href: "/schemes",
};

const CYBER_CALL = {
  label: { mr: "सायबर फसवणूक — 1930", en: "Cyber fraud — call 1930", hi: "साइबर धोखा — 1930" },
  href: "tel:1930",
};

const CYBER_PORTAL = {
  label: { mr: "ऑनलाइन तक्रार करा", en: "Report online", hi: "ऑनलाइन शिकायत करें" },
  href: "https://cybercrime.gov.in",
};

export const careerTopics: Topic[] = [
  {
    id: "after_10_12",
    intent: "learn",
    title: { mr: "10वी/12वी नंतर काय?", en: "Courses after 10th/12th", hi: "10वीं/12वीं के बाद क्या?" },
    keywords: [
      "after 10th", "after 12th", "course after 10th", "course after 12th", "10 vi nantar kay",
      "12vi nantar kay karu", "10वी नंतर", "12वी नंतर", "कोणता कोर्स", "10वीं के बाद", "12वीं के बाद",
      "कौन सा कोर्स", "diploma", "polytechnic", "nursing course", "bcom", "bsc", "ycmou", "पुढे काय शिकू",
    ],
    understand: {
      mr: "10वी किंवा 12वी नंतर पुढे काय करायचं, हा प्रश्न खूप जणींना पडतो. तुमच्याकडे बरेच पर्याय आहेत.",
      en: "Many girls wonder what to do after 10th or 12th. You have more options than you might think.",
      hi: "10वीं या 12वीं के बाद क्या करें, यह सवाल बहुत लड़कियों का होता है. आपके पास कई रास्ते हैं.",
    },
    answer: [
      {
        mr: "10वी नंतर: 11वी Arts/Commerce/Science, Polytechnic diploma, किंवा ITI चा कोर्स.",
        en: "After 10th: Arts/Commerce/Science in 11th, a polytechnic diploma, or an ITI course.",
        hi: "10वीं के बाद: 11वीं Arts/Commerce/Science, Polytechnic diploma, या ITI कोर्स.",
      },
      {
        mr: "12वी नंतर: BA, BCom, BSc, Nursing (ANM/GNM/BSc), D.Ed, hotel management, computer कोर्स.",
        en: "After 12th: BA, BCom, BSc, nursing (ANM/GNM/BSc), D.Ed, hotel management or computer courses.",
        hi: "12वीं के बाद: BA, BCom, BSc, Nursing (ANM/GNM/BSc), D.Ed, hotel management, computer कोर्स.",
      },
      {
        mr: "घरून शिकायचं असेल तर YCMOU (मुक्त विद्यापीठ) मधून distance learning करता येतं.",
        en: "If you need to study from home, YCMOU (open university) offers distance learning.",
        hi: "घर से पढ़ना हो तो YCMOU (मुक्त विद्यापीठ) से distance learning कर सकती हैं.",
      },
      {
        mr: "आवड, खर्च, आणि जवळ कॉलेज आहे का — हे तिन्ही पाहून निवड करा.",
        en: "Choose by looking at your interest, the cost, and whether a college is nearby.",
        hi: "अपनी रुचि, खर्च और पास में कॉलेज है या नहीं — ये तीनों देखकर चुनें.",
      },
    ],
    next: {
      mr: "तुम्हाला कशात जास्त आवड आहे — हिशोब, विज्ञान, लोकांची सेवा की हाताने काम?",
      en: "What do you enjoy most — numbers, science, caring for people, or hands-on work?",
      hi: "आपको किसमें ज़्यादा रुचि है — हिसाब, विज्ञान, लोगों की सेवा या हाथ का काम?",
    },
  },
  {
    id: "iti_courses",
    intent: "learn",
    title: { mr: "मुलींसाठी ITI कोर्स", en: "ITI courses for girls", hi: "लड़कियों के लिए ITI कोर्स" },
    keywords: [
      "iti", "iti course", "आयटीआय", "आईटीआई", "iti for girls", "sewing course", "silai course",
      "शिवणकाम कोर्स", "सिलाई कोर्स", "copa", "computer course", "beauty course", "ब्युटी पार्लर कोर्स",
      "ब्यूटी पार्लर कोर्स", "cosmetology", "food production", "electronics",
    ],
    understand: {
      mr: "ITI मध्ये कमी वेळात हाताला काम देणारे कोर्स असतात. मुलींसाठी चांगले पर्याय आहेत.",
      en: "ITI courses are short and job-focused. There are good options for girls and women.",
      hi: "ITI के कोर्स कम समय में काम दिलाने वाले होते हैं. लड़कियों के लिए अच्छे विकल्प हैं.",
    },
    answer: [
      {
        mr: "Sewing Technology (शिवणकाम), COPA (computer), Electronics, Cosmetology (ब्युटी), Food Production.",
        en: "Popular choices: Sewing Technology, COPA (computer), Electronics, Cosmetology (beauty), Food Production.",
        hi: "Sewing Technology (सिलाई), COPA (computer), Electronics, Cosmetology (ब्यूटी), Food Production.",
      },
      {
        mr: "सरकारी ITI मध्ये महिलांसाठी राखीव जागा असतात आणि फी कमी असते.",
        en: "Government ITIs have seats reserved for women and fees are low.",
        hi: "सरकारी ITI में महिलाओं के लिए आरक्षित सीटें होती हैं और फीस कम होती है.",
      },
      {
        mr: "बहुतेक कोर्स 1–2 वर्षांचे; 8वी किंवा 10वी पास लागते.",
        en: "Most courses take 1–2 years and need 8th or 10th pass.",
        hi: "ज़्यादातर कोर्स 1–2 साल के होते हैं; 8वीं या 10वीं पास चाहिए.",
      },
      {
        mr: "प्रवेश साधारण जून–जुलैमध्ये online होतो — जवळच्या ITI मध्ये विचारा.",
        en: "Admission is usually online around June–July — ask at your nearest ITI.",
        hi: "प्रवेश आमतौर पर जून–जुलाई में online होता है — पास के ITI में पूछें.",
      },
    ],
    next: {
      mr: "यातला कोणता कोर्स तुम्हाला आवडेल? मी त्यातून कोणतं काम मिळू शकतं ते सांगते.",
      en: "Which of these interests you? I can tell you what work it can lead to.",
      hi: "इनमें से कौन सा कोर्स पसंद है? मैं बताती हूँ उससे कौन सा काम मिल सकता है.",
    },
  },
  {
    id: "scholarships",
    intent: "find",
    title: { mr: "शिष्यवृत्ती (Scholarship)", en: "Scholarships", hi: "छात्रवृत्ति (Scholarship)" },
    keywords: [
      "scholarship", "शिष्यवृत्ती", "छात्रवृत्ति", "mahadbt", "महाडीबीटी", "national scholarship",
      "nsp", "fees help", "फी भरायला पैसे नाहीत", "फीस के पैसे नहीं", "padhai ke paise",
      "shikshan paise", "girls scholarship", "मुलींसाठी शिष्यवृत्ती", "फी माफी", "free education",
    ],
    understand: {
      mr: "पैशामुळे शिक्षण थांबू नये म्हणून अनेक शिष्यवृत्ती आहेत — विशेषतः मुलींसाठी.",
      en: "Many scholarships exist so money does not stop your studies — several are for girls.",
      hi: "पैसे की वजह से पढ़ाई न रुके, इसके लिए कई छात्रवृत्तियाँ हैं — कई लड़कियों के लिए.",
    },
    answer: [
      {
        mr: "महाराष्ट्राच्या शिष्यवृत्तीसाठी MahaDBT portal वर अर्ज करतात.",
        en: "Maharashtra state scholarships are applied for on the MahaDBT portal.",
        hi: "महाराष्ट्र की छात्रवृत्ति के लिए MahaDBT portal पर आवेदन होता है.",
      },
      {
        mr: "केंद्र सरकारच्या शिष्यवृत्ती National Scholarship Portal वर असतात.",
        en: "Central government scholarships are on the National Scholarship Portal.",
        hi: "केंद्र सरकार की छात्रवृत्तियाँ National Scholarship Portal पर होती हैं.",
      },
      {
        mr: "लागतं: आधार, बँक खातं, उत्पन्न दाखला, जात दाखला (लागू असल्यास), मार्कशीट.",
        en: "Usually needed: Aadhaar, bank account, income certificate, caste certificate (if any), marksheet.",
        hi: "आमतौर पर चाहिए: आधार, बैंक खाता, आय प्रमाणपत्र, जाति प्रमाणपत्र (अगर हो), मार्कशीट.",
      },
      {
        mr: "कॉलेजचं scholarship office मदत करतं. पात्रता आणि तारखा दरवर्षी बदलतात.",
        en: "Your college scholarship desk can help. Eligibility and dates change every year.",
        hi: "कॉलेज का scholarship office मदद करता है. पात्रता और तारीखें हर साल बदलती हैं.",
      },
      VERIFY,
    ],
    next: {
      mr: "तुम्ही सध्या कोणत्या वर्गात/कोर्समध्ये आहात? त्यानुसार कुठे पाहायचं ते सांगते.",
      en: "Which class or course are you in now? I'll tell you where to look.",
      hi: "आप अभी किस कक्षा/कोर्स में हैं? उसके हिसाब से बताती हूँ कहाँ देखें.",
    },
    actions: [SCHEMES],
  },
  {
    id: "return_to_education",
    intent: "learn",
    title: { mr: "पुन्हा शिक्षण सुरू करा", en: "Return to studies", hi: "फिर से पढ़ाई शुरू करें" },
    keywords: [
      "study again", "restart education", "पुन्हा शिकायचं", "शिक्षण अर्धवट", "पढ़ाई छूट गई",
      "फिर से पढ़ना", "padhai chhut gayi", "parat shikayche", "nios", "open school", "ओपन स्कूल",
      "ycmou", "मुक्त विद्यापीठ", "part time study", "10th pass karna hai", "लग्नानंतर शिक्षण",
    ],
    understand: {
      mr: "शिक्षण मध्येच थांबलं असेल तरी काही हरकत नाही. कोणत्याही वयात पुन्हा सुरू करता येतं.",
      en: "If your studies stopped midway, that's okay. You can start again at any age.",
      hi: "पढ़ाई बीच में छूट गई तो कोई बात नहीं. किसी भी उम्र में फिर शुरू कर सकती हैं.",
    },
    answer: [
      {
        mr: "10वी/12वी राहिली असेल तर NIOS किंवा राज्य मुक्त शाळेतून (open schooling) परीक्षा देता येते.",
        en: "If 10th/12th is pending, you can take exams through NIOS or state open schooling.",
        hi: "10वीं/12वीं बाकी है तो NIOS या राज्य ओपन स्कूल से परीक्षा दे सकती हैं.",
      },
      {
        mr: "पदवीसाठी YCMOU मधून घरून शिकता येतं; परीक्षा जवळच्या केंद्रावर.",
        en: "For a degree, YCMOU lets you study from home with exams at a nearby centre.",
        hi: "डिग्री के लिए YCMOU से घर बैठे पढ़ाई, परीक्षा पास के केंद्र पर.",
      },
      {
        mr: "घर आणि काम सांभाळून part-time किंवा शनिवार-रविवार कोर्स निवडा.",
        en: "Pick part-time or weekend courses so you can manage home and work.",
        hi: "घर और काम संभालते हुए part-time या शनिवार-रविवार के कोर्स चुनें.",
      },
      {
        mr: "जुनी मार्कशीट आणि शाळा सोडल्याचा दाखला (LC) आधी शोधून ठेवा.",
        en: "Keep your old marksheets and school leaving certificate (LC) ready.",
        hi: "पुरानी मार्कशीट और स्कूल छोड़ने का प्रमाणपत्र (LC) पहले ढूँढकर रखें.",
      },
    ],
    next: {
      mr: "तुमचं शिक्षण कुठपर्यंत झालं आहे? तिथून पुढचा मार्ग सांगते.",
      en: "How far did you study? I'll show you the next step from there.",
      hi: "आपने कहाँ तक पढ़ाई की है? वहाँ से अगला रास्ता बताती हूँ.",
    },
  },
  {
    id: "job_skills",
    intent: "learn",
    title: { mr: "नोकरीसाठी कौशल्ये", en: "Skills for a job", hi: "नौकरी के लिए हुनर" },
    keywords: [
      "job skills", "skills for job", "नोकरीसाठी काय शिकू", "नौकरी के लिए क्या सीखें", "kaushalya",
      "कौशल्य", "हुनर", "spoken english", "इंग्रजी बोलणं", "अंग्रेज़ी बोलना", "tally", "computer shikne",
      "digital literacy", "tailoring", "nursing assistant", "hospitality", "kaam ke liye kya seekhu",
    ],
    understand: {
      mr: "योग्य कौशल्य शिकलं तर नोकरी मिळायची शक्यता खूप वाढते. छोट्या कोर्सनेही सुरुवात होते.",
      en: "The right skill greatly improves your chances of a job. Even a short course is a good start.",
      hi: "सही हुनर सीखने से नौकरी मिलने के मौके बहुत बढ़ते हैं. छोटे कोर्स से भी शुरुआत होती है.",
    },
    answer: [
      {
        mr: "Computer आणि mobile वापर (email, form भरणं, UPI) — जवळजवळ प्रत्येक कामात लागतो.",
        en: "Digital literacy — computer, mobile, email, forms, UPI — is needed in almost every job.",
        hi: "Computer और mobile चलाना (email, form, UPI) — लगभग हर काम में चाहिए.",
      },
      {
        mr: "थोडं spoken English — हॉटेल, दुकान, पर्यटनात खूप उपयोगी.",
        en: "Basic spoken English helps a lot in hotels, shops and tourism.",
        hi: "थोड़ी spoken English — होटल, दुकान, पर्यटन में बहुत काम आती है.",
      },
      {
        mr: "Tally/हिशोब — दुकाने, पतसंस्था, छोट्या कंपन्यांना लागतं.",
        en: "Tally and accounts are needed by shops, credit societies and small firms.",
        hi: "Tally/हिसाब-किताब — दुकानों, सहकारी संस्थाओं, छोटी कंपनियों में चाहिए.",
      },
      {
        mr: "शिवणकाम, nursing assistant, hospitality (हॉटेल/homestay) — इथे मागणी आहे.",
        en: "Tailoring, nursing assistant and hospitality (hotels/homestays) are in demand locally.",
        hi: "सिलाई, nursing assistant, hospitality (होटल/homestay) — इनकी यहाँ माँग है.",
      },
    ],
    next: {
      mr: "यातलं कोणतं कौशल्य तुम्हाला आधी शिकायला आवडेल?",
      en: "Which of these skills would you like to learn first?",
      hi: "इनमें से कौन सा हुनर आप पहले सीखना चाहेंगी?",
    },
    actions: [INCOME_FINDER],
  },
  {
    id: "write_cv",
    intent: "act",
    title: { mr: "CV कसा लिहायचा", en: "How to write a CV", hi: "CV कैसे लिखें" },
    keywords: [
      "cv", "resume", "बायोडाटा", "biodata", "बायोडेटा", "cv kaisa likhe", "cv kasa lihava",
      "सीव्ही", "रिज्यूमे", "resume banana", "job application", "नोकरीचा अर्ज", "नौकरी का आवेदन",
    ],
    understand: {
      mr: "CV म्हणजे तुमची ओळख एका पानावर. साधा आणि स्पष्ट CV पुरेसा असतो.",
      en: "A CV is your introduction on one page. A simple, clear CV is enough.",
      hi: "CV मतलब एक पन्ने पर आपकी पहचान. सरल और साफ़ CV काफ़ी है.",
    },
    answer: [
      {
        mr: "वर: नाव, मोबाईल नंबर, email, गाव/तालुका. पूर्ण पत्ता किंवा आधार नंबर लिहू नका.",
        en: "Top: name, mobile, email, village/taluka. Don't write your full address or Aadhaar number.",
        hi: "ऊपर: नाम, मोबाइल, email, गाँव/तालुका. पूरा पता या आधार नंबर न लिखें.",
      },
      {
        mr: "शिक्षण: कोर्स, शाळा/कॉलेज, वर्ष. मग कौशल्ये (computer, शिवणकाम, भाषा).",
        en: "Education: course, school/college, year. Then skills (computer, tailoring, languages).",
        hi: "शिक्षा: कोर्स, स्कूल/कॉलेज, साल. फिर हुनर (computer, सिलाई, भाषाएँ).",
      },
      {
        mr: "अनुभव: नोकरी, SHG, घरचा व्यवसाय, स्वयंसेवा — सगळं अनुभवच आहे.",
        en: "Experience: jobs, SHG work, family business, volunteering — all of it counts.",
        hi: "अनुभव: नौकरी, SHG, घर का काम-धंधा, सेवा कार्य — सब अनुभव है.",
      },
      {
        mr: "1 पान, सोपी भाषा, spelling तपासा. PDF करून ठेवा.",
        en: "Keep it to 1 page, simple words, check spelling. Save it as a PDF.",
        hi: "1 पन्ना, आसान भाषा, spelling जाँचें. PDF बनाकर रखें.",
      },
    ],
    next: {
      mr: "तुमचं शिक्षण आणि कौशल्ये सांगा — मी CV चे मुद्दे तयार करायला मदत करते.",
      en: "Tell me your education and skills — I'll help you draft the CV points.",
      hi: "अपनी पढ़ाई और हुनर बताइए — मैं CV के मुद्दे बनाने में मदद करती हूँ.",
    },
  },
  {
    id: "interview_prep",
    intent: "act",
    title: { mr: "मुलाखतीची तयारी", en: "Interview preparation", hi: "इंटरव्यू की तैयारी" },
    keywords: [
      "interview", "मुलाखत", "इंटरव्यू", "interview tips", "interview ki taiyari", "mulakhat tayari",
      "interview madhe kay vichartat", "इंटरव्यू में क्या पूछते", "मुलाखतीत काय विचारतात", "nervous interview",
      "भीती वाटते interview", "डर लगता है interview", "job interview",
    ],
    understand: {
      mr: "मुलाखतीआधी थोडी भीती वाटणं साहजिक आहे. तयारी केली की आत्मविश्वास येतो.",
      en: "Feeling nervous before an interview is normal. Preparation brings confidence.",
      hi: "इंटरव्यू से पहले घबराहट होना स्वाभाविक है. तैयारी से आत्मविश्वास आता है.",
    },
    answer: [
      {
        mr: "स्वतःबद्दल 1 मिनिटात सांगायचा सराव करा — नाव, शिक्षण, कौशल्य, हे काम का हवं.",
        en: "Practise a 1-minute intro: name, education, skills, why you want this job.",
        hi: "1 मिनट में अपने बारे में बताने का अभ्यास करें — नाम, पढ़ाई, हुनर, यह काम क्यों.",
      },
      {
        mr: "कंपनी/दुकानाबद्दल आधी थोडी माहिती घ्या.",
        en: "Learn a little about the company or shop beforehand.",
        hi: "कंपनी/दुकान के बारे में पहले थोड़ी जानकारी लें.",
      },
      {
        mr: "स्वच्छ कपडे, वेळेवर पोहोचा, CV आणि कागदपत्रांच्या copy सोबत ठेवा.",
        en: "Wear clean clothes, arrive on time, carry your CV and document copies.",
        hi: "साफ़ कपड़े, समय पर पहुँचें, CV और दस्तावेज़ों की copy साथ रखें.",
      },
      {
        mr: "पगार, वेळ, काम काय — हे विचारायला संकोच करू नका.",
        en: "Don't hesitate to ask about salary, timings and duties.",
        hi: "तनख़्वाह, समय, काम क्या है — यह पूछने में संकोच न करें.",
      },
      {
        mr: "नोकरीसाठी कोणी पैसे मागितले तर सावध — ती फसवणूक असू शकते.",
        en: "If anyone asks for money to give you a job, be careful — it may be a scam.",
        hi: "नौकरी के लिए कोई पैसे माँगे तो सावधान — यह धोखा हो सकता है.",
      },
    ],
    next: {
      mr: "आपण एक सराव मुलाखत करूया का? मी प्रश्न विचारते.",
      en: "Shall we do a practice interview? I'll ask the questions.",
      hi: "क्या हम एक अभ्यास इंटरव्यू करें? मैं सवाल पूछती हूँ.",
    },
  },
  {
    id: "jobs_nearby",
    intent: "find",
    title: { mr: "माझ्या भागात नोकऱ्या", en: "Jobs in my area", hi: "मेरे इलाके में नौकरियाँ" },
    keywords: [
      "jobs near me", "job in shrivardhan", "श्रीवर्धन नोकरी", "नोकरी पाहिजे", "नौकरी चाहिए",
      "naukri chahiye", "nokri pahije", "kaam pahije", "काम हवं", "काम चाहिए", "anganwadi bharti",
      "अंगणवाडी भरती", "asha worker", "आशा वर्कर", "bank mitra", "hotel job", "रायगड नोकरी", "employment office",
    ],
    understand: {
      mr: "श्रीवर्धन भागात पर्यटन, बागायती आणि सेवा क्षेत्रात महिलांसाठी कामं आहेत.",
      en: "Around Shrivardhan there is work for women in tourism, horticulture and services.",
      hi: "श्रीवर्धन इलाके में पर्यटन, बागवानी और सेवा क्षेत्र में महिलाओं के लिए काम है.",
    },
    answer: [
      {
        mr: "पर्यटन: homestay, हॉटेल, resort मध्ये स्वागत, स्वयंपाक, housekeeping.",
        en: "Tourism: reception, cooking and housekeeping at homestays, hotels and resorts.",
        hi: "पर्यटन: homestay, होटल, resort में reception, खाना बनाना, housekeeping.",
      },
      {
        mr: "अंगणवाडी सेविका/मदतनीस, ASHA — भरतीची सूचना ग्रामपंचायत/तालुका कार्यालयात लागते.",
        en: "Anganwadi worker/helper and ASHA — recruitment notices go up at Gram Panchayat/taluka office.",
        hi: "आंगनवाड़ी सेविका/सहायिका, ASHA — भर्ती सूचना ग्राम पंचायत/तालुका कार्यालय में लगती है.",
      },
      {
        mr: "Bank Mitra (banking correspondent), दुकानं, आंबा-नारळ-सुपारी प्रक्रिया केंद्रं.",
        en: "Bank Mitra (banking correspondent), retail shops, mango-coconut-supari processing units.",
        hi: "Bank Mitra (banking correspondent), दुकानें, आम-नारियल-सुपारी प्रोसेसिंग यूनिट.",
      },
      {
        mr: "महाराष्ट्राच्या अधिकृत रोजगार portal वर नोंदणी करा; रायगड जिल्हा रोजगार कार्यालयात मेळाव्यांची माहिती मिळते.",
        en: "Register on Maharashtra's official employment portal; Raigad district employment office shares job fairs.",
        hi: "महाराष्ट्र के आधिकारिक रोज़गार portal पर पंजीकरण करें; रायगड ज़िला रोज़गार कार्यालय मेलों की जानकारी देता है.",
      },
      {
        mr: "नोकरीसाठी पैसे मागणाऱ्या agent पासून दूर राहा.",
        en: "Stay away from agents who ask money for a job.",
        hi: "नौकरी के लिए पैसे माँगने वाले agent से दूर रहें.",
      },
    ],
    next: {
      mr: "तुम्हाला नोकरी हवी आहे की स्वतःचं काम सुरू करायचं आहे?",
      en: "Are you looking for a job, or would you like to start your own work?",
      hi: "आपको नौकरी चाहिए या अपना काम शुरू करना है?",
    },
    actions: [INCOME_FINDER],
  },
  {
    id: "career_after_marriage",
    intent: "learn",
    title: { mr: "लग्न/बाळंतपणानंतर करिअर", en: "Career after marriage/motherhood", hi: "शादी/माँ बनने के बाद करियर" },
    keywords: [
      "career after marriage", "लग्नानंतर नोकरी", "शादी के बाद नौकरी", "after baby job",
      "बाळ झाल्यावर काम", "बच्चे के बाद काम", "housewife job", "गृहिणी काम", "gharbasli", "restart career",
      "career break", "shaadi ke baad kaam", "lagna nantar kaam", "work from home", "घरून काम",
    ],
    ages: ["18", "30", "40", "50"],
    understand: {
      mr: "लग्न किंवा बाळंतपणानंतर पुन्हा काम सुरू करणं पूर्णपणे शक्य आहे. तुमचा घरचा अनुभवही कौशल्यच आहे.",
      en: "Starting work after marriage or motherhood is fully possible. Running a home is experience too.",
      hi: "शादी या माँ बनने के बाद फिर काम शुरू करना पूरी तरह संभव है. घर संभालना भी अनुभव है.",
    },
    answer: [
      {
        mr: "आधी दिवसातले किती तास देऊ शकता ते ठरवा — part-time, घरून, की पूर्ण वेळ.",
        en: "First decide how many hours you can give — part-time, from home, or full-time.",
        hi: "पहले तय करें कितने घंटे दे सकती हैं — part-time, घर से, या पूरा समय.",
      },
      {
        mr: "छोटा कोर्स करून कौशल्य ताजं करा — computer, शिवणकाम, ब्युटी, tiffin.",
        en: "Refresh skills with a short course — computer, tailoring, beauty, tiffin service.",
        hi: "छोटे कोर्स से हुनर ताज़ा करें — computer, सिलाई, ब्यूटी, tiffin.",
      },
      {
        mr: "SHG मध्ये सामील होणं ही चांगली सुरुवात — बचत, कर्ज, प्रशिक्षण मिळतं.",
        en: "Joining an SHG is a good start — savings, loans and training.",
        hi: "SHG से जुड़ना अच्छी शुरुआत है — बचत, कर्ज़, प्रशिक्षण मिलता है.",
      },
      {
        mr: "घरच्यांशी बोलून मुलांची आणि घरकामाची जबाबदारी वाटून घ्या.",
        en: "Talk with family and share childcare and housework responsibilities.",
        hi: "परिवार से बात कर बच्चों और घर के काम की ज़िम्मेदारी बाँटें.",
      },
    ],
    next: {
      mr: "तुम्हाला घरून काम करायचं आहे की बाहेर जाऊन?",
      en: "Would you prefer to work from home or go out to work?",
      hi: "आप घर से काम करना चाहेंगी या बाहर जाकर?",
    },
    actions: [INCOME_FINDER],
  },
];

export const incomeTopics: Topic[] = [
  {
    id: "start_business",
    intent: "act",
    title: { mr: "छोटा व्यवसाय सुरू करा", en: "Start a small business", hi: "छोटा व्यवसाय शुरू करें" },
    keywords: [
      "start business", "business kaise shuru kare", "व्यवसाय सुरू", "धंदा", "धंधा शुरू", "स्वतःचा व्यवसाय",
      "अपना काम", "udyam", "उद्यम", "mudra loan", "मुद्रा कर्ज", "मुद्रा लोन", "business loan",
      "dhanda suru karaycha", "chhota business", "small business",
    ],
    ages: ADULT,
    understand: {
      mr: "स्वतःचा व्यवसाय छोट्यापासून सुरू करता येतो. पायरी-पायरीने गेलं की सोपं होतं.",
      en: "You can start your own business small. Going step by step makes it easier.",
      hi: "अपना व्यवसाय छोटे से शुरू कर सकती हैं. कदम-कदम चलने से आसान होता है.",
    },
    answer: [
      {
        mr: "कल्पना: तुम्हाला काय येतं आणि गावात कशाची गरज आहे — ते जुळवा.",
        en: "Idea: match what you're good at with what people nearby need.",
        hi: "विचार: आपको क्या आता है और आसपास किसकी ज़रूरत है — दोनों मिलाएँ.",
      },
      {
        mr: "खर्च: सामान, जागा, पॅकिंग लिहून काढा; आधी कमी भांडवलात सुरुवात करा.",
        en: "Costs: list materials, space, packing; begin with a small investment.",
        hi: "खर्च: सामान, जगह, पैकिंग लिखें; पहले कम पूँजी से शुरू करें.",
      },
      {
        mr: "नोंदणी: Udyam registration मोफत आहे; अन्नपदार्थ असल्यास FSSAI.",
        en: "Register: Udyam registration is free; add FSSAI if it's food.",
        hi: "पंजीकरण: Udyam registration मुफ़्त है; खाने का काम हो तो FSSAI.",
      },
      {
        mr: "कर्ज: बँकेत MUDRA कर्ज किंवा SHG कडून कर्ज विचारा. कोणत्याही agent ला पैसे देऊ नका.",
        en: "Loan: ask your bank about MUDRA, or your SHG. Never pay any agent.",
        hi: "कर्ज़: बैंक में MUDRA लोन या SHG से पूछें. किसी agent को पैसे न दें.",
      },
      {
        mr: "विक्री: ओळखीचे लोक, WhatsApp, बाजार, प्रदर्शनं — इथून सुरुवात करा.",
        en: "Selling: start with people you know, WhatsApp, local markets and exhibitions.",
        hi: "बिक्री: जान-पहचान, WhatsApp, बाज़ार, प्रदर्शनी — यहाँ से शुरू करें.",
      },
    ],
    next: {
      mr: "तुमच्या मनात कोणत्या व्यवसायाची कल्पना आहे?",
      en: "What business idea do you have in mind?",
      hi: "आपके मन में किस व्यवसाय का विचार है?",
    },
    actions: [INCOME_FINDER, SCHEMES],
  },
  {
    id: "join_shg",
    intent: "act",
    title: { mr: "बचत गटात सामील व्हा", en: "Join a Self Help Group", hi: "स्वयं सहायता समूह से जुड़ें" },
    keywords: [
      "shg", "self help group", "बचत गट", "bachat gat", "स्वयं सहायता समूह", "महिला मंडळ", "mahila bachat gat",
      "mavim", "माविम", "umed", "उमेद", "group loan", "गटाचे कर्ज", "समूह लोन", "bachat gat kaise jude",
    ],
    ages: ADULT,
    understand: {
      mr: "बचत गट म्हणजे 10–20 महिला मिळून बचत करतात, एकमेकींना कर्ज देतात आणि व्यवसाय उभा करतात.",
      en: "An SHG is 10–20 women who save together, lend to each other and build livelihoods.",
      hi: "स्वयं सहायता समूह में 10–20 महिलाएँ मिलकर बचत करती हैं, कर्ज़ देती हैं, काम शुरू करती हैं.",
    },
    answer: [
      {
        mr: "गावात आधीच असलेल्या बचत गटाबद्दल अंगणवाडी सेविका किंवा ग्रामपंचायतीत विचारा.",
        en: "Ask the Anganwadi worker or Gram Panchayat about SHGs already in your village.",
        hi: "गाँव के मौजूदा समूह के बारे में आंगनवाड़ी सेविका या ग्राम पंचायत से पूछें.",
      },
      {
        mr: "MAVIM (महिला आर्थिक विकास महामंडळ) आणि UMED (राज्य ग्रामीण जीवनोन्नती अभियान) गट बनवायला मदत करतात.",
        en: "MAVIM (Mahila Arthik Vikas Mahamandal) and UMED (State Rural Livelihoods Mission) help form groups.",
        hi: "MAVIM (महिला आर्थिक विकास महामंडल) और UMED (राज्य ग्रामीण आजीविका मिशन) समूह बनाने में मदद करते हैं.",
      },
      {
        mr: "दर महिन्याला ठरलेली छोटी बचत, नियमित बैठक आणि हिशोब वही ठेवली जाते.",
        en: "Members save a fixed small amount monthly, meet regularly and keep account books.",
        hi: "हर महीने तय छोटी बचत, नियमित बैठक और हिसाब की किताब रखी जाती है.",
      },
      {
        mr: "नियमित गटाला बँक कर्ज, प्रशिक्षण आणि बाजार मिळण्यास मदत मिळू शकते.",
        en: "Regular groups can get bank loans, training and market support.",
        hi: "नियमित समूह को बैंक कर्ज़, प्रशिक्षण और बाज़ार की मदद मिल सकती है.",
      },
      VERIFY,
    ],
    next: {
      mr: "तुमच्या गावात आधी बचत गट आहे का, की नवीन सुरू करायचा आहे?",
      en: "Is there already an SHG in your village, or do you want to start a new one?",
      hi: "आपके गाँव में पहले से समूह है, या नया शुरू करना है?",
    },
    actions: [SCHEMES],
  },
  {
    id: "homestay",
    intent: "act",
    title: { mr: "होमस्टे सुरू करा", en: "Start a homestay", hi: "होमस्टे शुरू करें" },
    keywords: [
      "homestay", "होमस्टे", "home stay", "bed and breakfast", "b&b", "tourist room", "पर्यटक खोली",
      "पर्यटकों के लिए कमरा", "mtdc", "harihareshwar", "हरिहरेश्वर", "diveagar", "दिवेआगर",
      "श्रीवर्धन पर्यटन", "tourism business", "ghar madhe tourist", "room kiraye par",
    ],
    ages: ADULT,
    understand: {
      mr: "श्रीवर्धन, हरिहरेश्वर, दिवेआगरला पर्यटक येतात — घरातील खोल्यांतून चांगली कमाई होऊ शकते.",
      en: "Tourists visit Shrivardhan, Harihareshwar and Diveagar — spare rooms at home can earn well.",
      hi: "श्रीवर्धन, हरिहरेश्वर, दिवेआगर में पर्यटक आते हैं — घर के कमरों से अच्छी कमाई हो सकती है.",
    },
    answer: [
      {
        mr: "स्वच्छ खोली, स्वच्छ शौचालय, पिण्याचं पाणी, घरगुती कोकणी जेवण — हीच मोठी ताकद.",
        en: "Clean rooms and toilets, safe drinking water and home-style Konkani food are your strength.",
        hi: "साफ़ कमरा, साफ़ शौचालय, पीने का पानी, घर का कोंकणी खाना — यही ताकत है.",
      },
      {
        mr: "Maharashtra Tourism (MTDC) च्या homestay / bed-and-breakfast योजनेत नोंदणी करा.",
        en: "Register under Maharashtra Tourism (MTDC) homestay / bed-and-breakfast scheme.",
        hi: "Maharashtra Tourism (MTDC) की homestay / bed-and-breakfast योजना में पंजीकरण करें.",
      },
      {
        mr: "सुरक्षा: पाहुण्यांचं ओळखपत्र नोंदवा, रजिस्टर ठेवा, दारांना कुलूप, first-aid पेटी.",
        en: "Safety: record guests' ID, keep a register, good door locks and a first-aid box.",
        hi: "सुरक्षा: मेहमानों का पहचान पत्र दर्ज करें, रजिस्टर रखें, ताले, first-aid बॉक्स.",
      },
      {
        mr: "चांगले फोटो काढून online booking sites, Google Maps आणि WhatsApp वर टाका.",
        en: "Take good photos and list on booking sites, Google Maps and WhatsApp.",
        hi: "अच्छी फ़ोटो लेकर online booking sites, Google Maps और WhatsApp पर डालें.",
      },
      VERIFY,
    ],
    next: {
      mr: "तुमच्याकडे पाहुण्यांसाठी किती खोल्या देता येतील?",
      en: "How many rooms could you offer to guests?",
      hi: "आप मेहमानों को कितने कमरे दे सकती हैं?",
    },
    actions: [INCOME_FINDER],
  },
  {
    id: "homemade_products",
    intent: "act",
    title: { mr: "घरगुती पदार्थ विका", en: "Sell homemade products", hi: "घर के बने उत्पाद बेचें" },
    keywords: [
      "homemade products", "घरगुती पदार्थ", "घर का बना सामान", "लोणचं", "अचार", "pickle", "papad",
      "पापड", "kokum", "कोकम", "amla", "आवळा", "masala", "मसाला", "coconut products", "नारळ", "fssai",
      "gharguti vastu vikne",
    ],
    ages: ADULT,
    understand: {
      mr: "कोकणातील लोणची, पापड, कोकम, आवळा, मसाले यांना खूप मागणी आहे. घरूनच व्यवसाय होऊ शकतो.",
      en: "Konkan pickles, papad, kokum, amla and masalas are in demand. This can be a home business.",
      hi: "कोंकण के अचार, पापड़, कोकम, आँवला, मसालों की बहुत माँग है. यह घर से ही हो सकता है.",
    },
    answer: [
      {
        mr: "एक-दोन उत्तम पदार्थांपासून सुरुवात करा; चव आणि दर्जा नेहमी सारखा ठेवा.",
        en: "Start with one or two best products; keep taste and quality consistent.",
        hi: "एक-दो बढ़िया चीज़ों से शुरू करें; स्वाद और गुणवत्ता हमेशा एक जैसी रखें.",
      },
      {
        mr: "अन्नपदार्थ विकायला FSSAI नोंदणी लागते — छोट्या व्यवसायासाठी basic नोंदणी पुरेशी.",
        en: "Selling food needs FSSAI registration — basic registration is enough for small sellers.",
        hi: "खाने की चीज़ें बेचने के लिए FSSAI पंजीकरण चाहिए — छोटे काम के लिए basic काफ़ी.",
      },
      {
        mr: "पॅकिंगवर नाव, वजन, किंमत, तयार केल्याची आणि वापरायची शेवटची तारीख लिहा.",
        en: "Label packs with name, weight, price, date made and best-before date.",
        hi: "पैकिंग पर नाम, वज़न, दाम, बनाने की और इस्तेमाल की आख़िरी तारीख़ लिखें.",
      },
      {
        mr: "आठवडी बाजार, पर्यटक ठिकाणं, SHG प्रदर्शनं, दुकानं आणि WhatsApp वर विका.",
        en: "Sell at weekly markets, tourist spots, SHG exhibitions, shops and on WhatsApp.",
        hi: "हफ़्ते के बाज़ार, पर्यटन स्थल, SHG प्रदर्शनी, दुकानों और WhatsApp पर बेचें.",
      },
      VERIFY,
    ],
    next: {
      mr: "तुम्ही कोणता पदार्थ सगळ्यात छान बनवता?",
      en: "Which product do you make best?",
      hi: "आप कौन सी चीज़ सबसे अच्छी बनाती हैं?",
    },
    actions: [INCOME_FINDER],
  },
  {
    id: "food_business",
    intent: "act",
    title: { mr: "खाद्य व्यवसाय सुरू करा", en: "Start a food business", hi: "खाने का व्यवसाय शुरू करें" },
    keywords: [
      "food business", "tiffin", "टिफिन", "डबा", "khanaval", "खानावळ", "food stall", "स्टॉल", "nashta centre",
      "नाश्ता", "catering", "केटरिंग", "fssai", "hotel suru karaycha", "खाने का धंधा", "जेवण विकणे",
    ],
    ages: ADULT,
    understand: {
      mr: "चांगलं जेवण बनवता येत असेल तर tiffin, खानावळ किंवा stall हा चांगला पर्याय आहे.",
      en: "If you cook well, a tiffin service, mess or food stall can be a good option.",
      hi: "अगर आप अच्छा खाना बनाती हैं तो tiffin, मेस या stall अच्छा विकल्प है.",
    },
    answer: [
      {
        mr: "FSSAI basic नोंदणी करा — ऑनलाइन किंवा जवळच्या Setu केंद्रातून.",
        en: "Get FSSAI basic registration — online or through a nearby Setu centre.",
        hi: "FSSAI basic पंजीकरण कराएँ — online या पास के Setu केंद्र से.",
      },
      {
        mr: "स्वच्छता: हात धुणं, डोक्याला कापड, झाकलेलं अन्न, स्वच्छ पाणी.",
        en: "Hygiene: wash hands, cover hair, keep food covered, use clean water.",
        hi: "सफ़ाई: हाथ धोना, सिर ढकना, खाना ढककर रखना, साफ़ पानी.",
      },
      {
        mr: "Tiffin: ऑफिस, दुकानदार, विद्यार्थी, एकटे राहणारे — आधी 5–10 ग्राहक मिळवा.",
        en: "Tiffin: office staff, shopkeepers, students — start by finding 5–10 regular customers.",
        hi: "Tiffin: दफ़्तर, दुकानदार, छात्र — पहले 5–10 नियमित ग्राहक बनाएँ.",
      },
      {
        mr: "Stall साठी जागेची परवानगी ग्रामपंचायत/नगर परिषदेकडून घ्या.",
        en: "For a stall, take space permission from the Gram Panchayat or Municipal Council.",
        hi: "Stall के लिए जगह की अनुमति ग्राम पंचायत/नगर परिषद से लें.",
      },
      VERIFY,
    ],
    next: {
      mr: "तुम्हाला tiffin करायचा आहे की stall/खानावळ?",
      en: "Are you thinking of a tiffin service or a stall/mess?",
      hi: "आप tiffin सेवा सोच रही हैं या stall/मेस?",
    },
    actions: [INCOME_FINDER],
  },
  {
    id: "digital_payments",
    intent: "learn",
    title: { mr: "डिजिटल पेमेंट शिका", en: "Learn digital payments", hi: "डिजिटल पेमेंट सीखें" },
    keywords: [
      "upi", "यूपीआय", "यूपीआई", "gpay", "phonepe", "paytm", "digital payment", "online payment",
      "qr code", "क्यूआर कोड", "upi pin", "otp", "upi kaise use kare", "पैसे पाठवणे", "पैसे भेजना",
      "upi fraud", "पेमेंट कसे घ्यायचे",
    ],
    ages: ADULT,
    understand: {
      mr: "UPI ने पैसे घेणं-देणं सोपं होतं — व्यवसायासाठी खूप उपयोगी. फक्त काही नियम पाळा.",
      en: "UPI makes receiving and paying money easy — very useful for business. Just follow a few rules.",
      hi: "UPI से पैसे लेना-देना आसान है — व्यवसाय के लिए बहुत काम का. बस कुछ नियम मानें.",
    },
    answer: [
      {
        mr: "UPI PIN फक्त पैसे देताना लागतो. पैसे घेण्यासाठी PIN कधीच लागत नाही.",
        en: "UPI PIN is only for paying. You never need a PIN to receive money.",
        hi: "UPI PIN सिर्फ़ पैसे देने के लिए है. पैसे लेने के लिए PIN कभी नहीं लगता.",
      },
      {
        mr: "PIN किंवा OTP कोणालाही सांगू नका — बँक, पोलीस किंवा ग्राहक कधीच मागत नाहीत.",
        en: "Never share your PIN or OTP — banks, police or customers never ask for it.",
        hi: "PIN या OTP किसी को न बताएँ — बैंक, पुलिस या ग्राहक कभी नहीं माँगते.",
      },
      {
        mr: "दुकानासाठी स्वतःचा QR code छापून लावा; पैसे आल्यावर app मध्ये तपासा.",
        en: "Print your own QR code for your shop; check the app to confirm money arrived.",
        hi: "दुकान के लिए अपना QR code छापकर लगाएँ; पैसे आने पर app में जाँचें.",
      },
      {
        mr: "फसवणूक झाली तर लगेच 1930 वर कॉल करा आणि बँकेला कळवा.",
        en: "If you're cheated, call 1930 immediately and inform your bank.",
        hi: "धोखा हो तो तुरंत 1930 पर कॉल करें और बैंक को बताएँ.",
      },
    ],
    next: {
      mr: "तुमच्या फोनमध्ये UPI app आहे का? मी पहिलं पेमेंट करायला पायऱ्या सांगू का?",
      en: "Do you have a UPI app on your phone? Shall I walk you through your first payment?",
      hi: "क्या आपके फ़ोन में UPI app है? पहला पेमेंट करने के कदम बताऊँ?",
    },
    actions: [CYBER_CALL, CYBER_PORTAL],
  },
  {
    id: "sell_online",
    intent: "act",
    title: { mr: "ऑनलाइन विक्री करा", en: "Sell products online", hi: "ऑनलाइन बेचें" },
    keywords: [
      "sell online", "online vikri", "ऑनलाइन विक्री", "ऑनलाइन बेचना", "whatsapp business", "catalogue",
      "instagram", "इंस्टाग्राम", "ondc", "amazon", "flipkart", "meesho", "marketing", "जाहिरात", "प्रचार",
      "online kaise beche", "product photo",
    ],
    ages: ADULT,
    understand: {
      mr: "मोबाईलवरून तुमचा माल गावाबाहेरही विकता येतो. सुरुवात WhatsApp पासून करा.",
      en: "Your mobile can help you sell beyond your village. Start with WhatsApp.",
      hi: "मोबाइल से आप गाँव के बाहर भी बेच सकती हैं. शुरुआत WhatsApp से करें.",
    },
    answer: [
      {
        mr: "WhatsApp Business app घ्या — catalogue मध्ये फोटो, किंमत, माहिती टाका.",
        en: "Use the WhatsApp Business app — add photos, prices and details to the catalogue.",
        hi: "WhatsApp Business app लें — catalogue में फ़ोटो, दाम, जानकारी डालें.",
      },
      {
        mr: "दिवसाच्या उजेडात, साध्या background वर स्वच्छ फोटो काढा.",
        en: "Take clear photos in daylight on a plain background.",
        hi: "दिन की रोशनी में, सादे background पर साफ़ फ़ोटो लें.",
      },
      {
        mr: "Instagram वर बनवतानाचे छोटे video टाका; ग्राहकांचे अभिप्राय share करा.",
        en: "Post short making-of videos on Instagram; share customer feedback.",
        hi: "Instagram पर बनाते हुए छोटे video डालें; ग्राहकों की राय share करें.",
      },
      {
        mr: "मोठ्या विक्रीसाठी ONDC किंवा online marketplaces वर SHG/संस्थेच्या मदतीने नोंदणी करा.",
        en: "To grow, list on ONDC or online marketplaces with help from your SHG or an NGO.",
        hi: "बढ़ने के लिए ONDC या online marketplaces पर SHG/संस्था की मदद से जुड़ें.",
      },
      {
        mr: "आधी पैसे घेऊन मग माल पाठवा; अनोळखी link वर click करू नका.",
        en: "Take payment before sending goods; don't click unknown links.",
        hi: "पहले पैसे लें फिर सामान भेजें; अनजान link पर click न करें.",
      },
    ],
    next: {
      mr: "तुम्ही काय विकता? मी त्यासाठी एक छोटा catalogue मजकूर लिहून देऊ का?",
      en: "What do you sell? Shall I write a short catalogue description for it?",
      hi: "आप क्या बेचती हैं? क्या मैं उसका छोटा catalogue विवरण लिख दूँ?",
    },
  },
  {
    id: "business_documents",
    intent: "check",
    title: { mr: "व्यवसायासाठी कागदपत्रे", en: "Documents for business", hi: "व्यवसाय के दस्तावेज़" },
    keywords: [
      "documents", "कागदपत्रे", "दस्तावेज़", "kagadpatra", "kagaz", "कागज़", "aadhaar", "आधार", "pan card",
      "पॅन कार्ड", "पैन कार्ड", "bank account", "बँक खाते", "udyam certificate", "address proof", "loan documents",
    ],
    ages: ADULT,
    understand: {
      mr: "कर्ज, नोंदणी किंवा योजनेसाठी काही कागदपत्रे जवळजवळ नेहमी लागतात. आधीच तयार ठेवा.",
      en: "Loans, registrations and schemes usually ask for the same documents. Keep them ready.",
      hi: "कर्ज़, पंजीकरण या योजना के लिए कुछ दस्तावेज़ लगभग हमेशा लगते हैं. पहले से तैयार रखें.",
    },
    answer: [
      {
        mr: "आधार कार्ड (मोबाईल नंबर लिंक असलेलं) आणि PAN कार्ड.",
        en: "Aadhaar card (linked to your mobile number) and PAN card.",
        hi: "आधार कार्ड (मोबाइल नंबर से जुड़ा) और PAN कार्ड.",
      },
      {
        mr: "स्वतःच्या नावावर बँक खातं — आधारशी लिंक, DBT सुरू.",
        en: "A bank account in your own name — linked to Aadhaar, with DBT enabled.",
        hi: "अपने नाम पर बैंक खाता — आधार से जुड़ा, DBT चालू.",
      },
      {
        mr: "पासपोर्ट फोटो, पत्त्याचा पुरावा (लाईट बिल, रेशन कार्ड).",
        en: "Passport photos and address proof (electricity bill, ration card).",
        hi: "पासपोर्ट फ़ोटो, पते का सबूत (बिजली बिल, राशन कार्ड).",
      },
      {
        mr: "Udyam registration प्रमाणपत्र; अन्न व्यवसायासाठी FSSAI.",
        en: "Udyam registration certificate; FSSAI for food businesses.",
        hi: "Udyam registration प्रमाणपत्र; खाने के काम के लिए FSSAI.",
      },
      VERIFY,
    ],
    next: {
      mr: "यातलं कोणतं कागदपत्र तुमच्याकडे अजून नाही? ते कसं मिळवायचं ते सांगते.",
      en: "Which of these don't you have yet? I'll tell you how to get it.",
      hi: "इनमें से कौन सा दस्तावेज़ अभी नहीं है? कैसे बनवाएँ, बताती हूँ.",
    },
  },
  {
    id: "training_access",
    intent: "find",
    title: { mr: "मोफत प्रशिक्षण कुठे?", en: "Where to get training", hi: "प्रशिक्षण कहाँ मिले?" },
    keywords: [
      "training", "प्रशिक्षण", "free training", "मोफत प्रशिक्षण", "मुफ़्त ट्रेनिंग", "rseti", "आरसेटी",
      "krishi vigyan kendra", "कृषी विज्ञान केंद्र", "kvk", "skill development", "कौशल्य विकास", "कौशल विकास",
      "mavim training", "training kahan milegi", "shikayla kuthe jau",
    ],
    ages: ADULT,
    understand: {
      mr: "व्यवसाय किंवा कौशल्यासाठी अनेक ठिकाणी मोफत किंवा कमी खर्चात प्रशिक्षण मिळतं.",
      en: "Free or low-cost training for skills and business is available in many places.",
      hi: "हुनर और व्यवसाय के लिए कई जगह मुफ़्त या कम खर्च में प्रशिक्षण मिलता है.",
    },
    answer: [
      {
        mr: "RSETI (ग्रामीण स्वयंरोजगार प्रशिक्षण संस्था) — बँकांच्या मदतीने मोफत निवासी प्रशिक्षण.",
        en: "RSETI (Rural Self Employment Training Institute) — free residential training backed by banks.",
        hi: "RSETI (ग्रामीण स्वरोज़गार प्रशिक्षण संस्थान) — बैंकों की मदद से मुफ़्त आवासीय प्रशिक्षण.",
      },
      {
        mr: "कृषी विज्ञान केंद्र — आंबा, नारळ, कोकम प्रक्रिया, अन्नप्रक्रिया शिकवतात.",
        en: "Krishi Vigyan Kendra — teaches mango, coconut, kokum and food processing.",
        hi: "कृषि विज्ञान केंद्र — आम, नारियल, कोकम और खाद्य प्रसंस्करण सिखाता है.",
      },
      {
        mr: "MAVIM आणि बचत गटांमार्फत व्यवसाय आणि हिशोबाचं प्रशिक्षण.",
        en: "MAVIM and SHG networks run business and bookkeeping training.",
        hi: "MAVIM और समूहों के ज़रिए व्यवसाय और हिसाब का प्रशिक्षण.",
      },
      {
        mr: "सरकारी कौशल्य विकास केंद्र आणि ITI मध्ये छोटे कोर्स असतात.",
        en: "Government skill development centres and ITIs offer short courses.",
        hi: "सरकारी कौशल विकास केंद्र और ITI में छोटे कोर्स होते हैं.",
      },
      VERIFY,
    ],
    next: {
      mr: "तुम्हाला कोणत्या विषयाचं प्रशिक्षण हवं आहे?",
      en: "What would you like training in?",
      hi: "आपको किस विषय का प्रशिक्षण चाहिए?",
    },
    actions: [INCOME_FINDER],
  },
  {
    id: "ladki_bahin",
    intent: "learn",
    title: { mr: "माझी लाडकी बहीण योजना", en: "Majhi Ladki Bahin Yojana", hi: "माझी लाडकी बहीण योजना" },
    keywords: [
      "ladki bahin", "लाडकी बहीण", "लाडकी बहिण", "majhi ladki bahin", "ladki behna", "लाडली बहना",
      "1500 rupaye", "1500 रुपये", "ladki bahin paise nahi aaye", "लाडकी बहीण पैसे आले नाहीत",
      "पैसे नहीं आए", "ladki bahin ekyc", "ई-केवायसी", "ladki bahin form", "ladki bahin eligibility",
      "लाडकी बहीण पात्रता",
    ],
    ages: ADULT,
    understand: {
      mr: "मुख्यमंत्री माझी लाडकी बहीण योजना ही महाराष्ट्रातील महिलांना दर महिन्याला आर्थिक मदत देणारी योजना आहे.",
      en: "Mukhyamantri Majhi Ladki Bahin Yojana gives monthly financial support to women in Maharashtra.",
      hi: "मुख्यमंत्री माझी लाडकी बहीण योजना महाराष्ट्र की महिलाओं को हर महीने आर्थिक मदद देती है.",
    },
    answer: [
      {
        mr: "सध्याची माहिती: महाराष्ट्रातील 21–65 वयोगटातील महिला, कुटुंबाचं वार्षिक उत्पन्न ₹2.5 लाखांपेक्षा कमी.",
        en: "Current info: women in Maharashtra aged 21–65, annual family income below ₹2.5 lakh.",
        hi: "मौजूदा जानकारी: महाराष्ट्र की 21–65 साल की महिलाएँ, परिवार की सालाना आय ₹2.5 लाख से कम.",
      },
      {
        mr: "₹1,500 दर महिना DBT ने थेट तिच्या स्वतःच्या बँक खात्यात (आधार-लिंक) जमा होतात.",
        en: "₹1,500 a month is paid by DBT directly into her own Aadhaar-linked bank account.",
        hi: "₹1,500 हर महीने DBT से सीधे उसके अपने (आधार से जुड़े) बैंक खाते में आते हैं.",
      },
      {
        mr: "सध्या e-KYC/पडताळणी सुरू आहे; काही अर्जदार अपात्र ठरले आहेत. पैसे थांबले तर e-KYC तपासा.",
        en: "e-KYC/verification is ongoing and some applicants were found ineligible. If money stopped, check e-KYC.",
        hi: "अभी e-KYC/जाँच चल रही है; कुछ आवेदक अपात्र पाए गए. पैसे रुके तो e-KYC जाँचें.",
      },
      {
        mr: "कोणत्याही agent ला पैसे देऊ नका. अर्ज आणि मदत मोफत आहे.",
        en: "Never pay any agent. Applying and getting help is free.",
        hi: "किसी agent को पैसे न दें. आवेदन और मदद मुफ़्त है.",
      },
      {
        mr: "पात्रता आणि रक्कम बदलू शकते — अधिकृत लाडकी बहीण portal, अंगणवाडी किंवा Setu केंद्रात तपासा.",
        en: "Eligibility and amount can change — verify on the official Ladki Bahin portal, Anganwadi or Setu centre.",
        hi: "पात्रता और राशि बदल सकती है — आधिकारिक लाडकी बहीण portal, आंगनवाड़ी या Setu केंद्र में जाँचें.",
      },
    ],
    next: {
      mr: "तुम्ही अर्ज केला आहे का, की पैसे येणं थांबलं आहे?",
      en: "Have you already applied, or have the payments stopped?",
      hi: "क्या आपने आवेदन किया है, या पैसे आना बंद हो गया है?",
    },
    actions: [
      {
        label: { mr: "लाडकी बहीण माहिती", en: "Ladki Bahin details", hi: "लाडकी बहीण जानकारी" },
        href: "/schemes#ladki-bahin",
      },
    ],
  },
  {
    id: "schemes_overview",
    intent: "learn",
    title: { mr: "महिलांसाठी सरकारी योजना", en: "Government schemes for women", hi: "महिलाओं के लिए सरकारी योजनाएँ" },
    keywords: [
      "schemes", "yojana", "योजना", "सरकारी योजना", "sarkari yojana", "government scheme", "women schemes",
      "महिलांसाठी योजना", "महिलाओं के लिए योजना", "pmmvy", "मातृ वंदना", "maternity benefit", "adishakti",
      "आदिशक्ती", "single women policy", "एकल महिला", "anganwadi services",
    ],
    ages: ADULT,
    understand: {
      mr: "महिलांसाठी राज्य आणि केंद्र सरकारच्या अनेक योजना आहेत. तुमच्यासाठी योग्य कोणती ते पाहूया.",
      en: "There are many state and central schemes for women. Let's see which fit you.",
      hi: "महिलाओं के लिए राज्य और केंद्र की कई योजनाएँ हैं. देखते हैं आपके लिए कौन सी सही है.",
    },
    answer: [
      {
        mr: "माझी लाडकी बहीण — दरमहा आर्थिक मदत; MAVIM/बचत गट — कर्ज आणि प्रशिक्षण.",
        en: "Majhi Ladki Bahin — monthly support; MAVIM/SHGs — loans and training.",
        hi: "माझी लाडकी बहीण — मासिक मदद; MAVIM/समूह — कर्ज़ और प्रशिक्षण.",
      },
      {
        mr: "PMMVY — गर्भवती/स्तनदा मातांना मातृत्व लाभ; अंगणवाडी — पोषण आहार, लसीकरण, तपासणी.",
        en: "PMMVY — maternity benefit for pregnant/nursing mothers; Anganwadi — nutrition, vaccination, check-ups.",
        hi: "PMMVY — गर्भवती/धात्री माताओं को मातृत्व लाभ; आंगनवाड़ी — पोषण, टीकाकरण, जाँच.",
      },
      {
        mr: "कौशल्य आणि उद्योजकता मदत — RSETI, MUDRA कर्ज, कौशल्य विकास केंद्र.",
        en: "Skill and entrepreneurship support — RSETI, MUDRA loans, skill development centres.",
        hi: "हुनर और उद्यमिता मदद — RSETI, MUDRA लोन, कौशल विकास केंद्र.",
      },
      {
        mr: "आदिशक्ती अभियान — ग्रामीण महिलांसाठी; एकल महिला धोरण सध्या तयार होत आहे.",
        en: "Adishakti Abhiyan for rural women; Maharashtra's Single Women Policy is being drafted.",
        hi: "आदिशक्ती अभियान — ग्रामीण महिलाओं के लिए; एकल महिला नीति अभी बन रही है.",
      },
      VERIFY,
    ],
    next: {
      mr: "तुमचं वय आणि गरज सांगा — पैसे, व्यवसाय, की आरोग्य? मग योग्य योजना सांगते.",
      en: "Tell me your age and need — money, business or health? I'll point to the right scheme.",
      hi: "अपनी उम्र और ज़रूरत बताइए — पैसा, व्यवसाय या सेहत? फिर सही योजना बताती हूँ.",
    },
    actions: [SCHEMES],
  },
  {
    id: "scheme_apply",
    intent: "find",
    title: { mr: "योजनेसाठी अर्ज कुठे?", en: "Where to apply for schemes", hi: "योजना का आवेदन कहाँ?" },
    keywords: [
      "how to apply", "arj kasa karaycha", "अर्ज कसा करायचा", "आवेदन कैसे करें", "aavedan kahan",
      "setu kendra", "सेतू केंद्र", "aaple sarkar", "आपले सरकार", "gram panchayat", "ग्रामपंचायत",
      "wcd office", "महिला बाल विकास कार्यालय", "yojana form", "योजना फॉर्म", "scheme documents",
    ],
    ages: ADULT,
    understand: {
      mr: "योजनेचा अर्ज कुठे करायचा हे माहिती नसणं साहजिक आहे. मदत जवळच मिळते.",
      en: "It's normal not to know where to apply. Help is usually close by.",
      hi: "योजना का आवेदन कहाँ करें, यह न पता होना सामान्य है. मदद पास में ही मिलती है.",
    },
    answer: [
      {
        mr: "अंगणवाडी सेविका — लाडकी बहीण, PMMVY, पोषण योजनांसाठी पहिली मदत.",
        en: "Anganwadi worker — first help for Ladki Bahin, PMMVY and nutrition schemes.",
        hi: "आंगनवाड़ी सेविका — लाडकी बहीण, PMMVY, पोषण योजनाओं के लिए पहली मदद.",
      },
      {
        mr: "ग्रामपंचायत आणि Setu / आपले सरकार केंद्र — दाखले, online अर्ज.",
        en: "Gram Panchayat and Setu / Aaple Sarkar centre — certificates and online applications.",
        hi: "ग्राम पंचायत और Setu / आपले सरकार केंद्र — प्रमाणपत्र और online आवेदन.",
      },
      {
        mr: "तालुका महिला व बाल विकास (WCD) कार्यालय — अडचण आली तर तिथे विचारा.",
        en: "Taluka Women & Child Development (WCD) office — go there if you're stuck.",
        hi: "तालुका महिला एवं बाल विकास (WCD) कार्यालय — अटकें तो वहाँ पूछें.",
      },
      {
        mr: "सोबत आधार, बँक पासबुक, रेशन कार्ड, उत्पन्न दाखला, फोटो न्या. पावती नक्की घ्या.",
        en: "Carry Aadhaar, bank passbook, ration card, income certificate, photos. Always take a receipt.",
        hi: "आधार, बैंक पासबुक, राशन कार्ड, आय प्रमाणपत्र, फ़ोटो साथ ले जाएँ. रसीद ज़रूर लें.",
      },
      VERIFY,
    ],
    next: {
      mr: "तुम्हाला कोणत्या योजनेसाठी अर्ज करायचा आहे?",
      en: "Which scheme do you want to apply for?",
      hi: "आप किस योजना के लिए आवेदन करना चाहती हैं?",
    },
    actions: [SCHEMES],
  },
  {
    id: "income_finder",
    intent: "find",
    title: { mr: "मी कमाई कशी करू?", en: "How can I earn?", hi: "मैं कमाई कैसे करूँ?" },
    keywords: [
      "how can i earn", "earn money", "paise kaise kamaye", "पैसे कसे कमवायचे", "पैसे कैसे कमाएँ",
      "kamai", "कमाई", "income", "उत्पन्न", "आमदनी", "ghar baithe kaam", "घरबसल्या काम", "घर बैठे काम",
      "paise kamvayche", "side income", "रोजगार", "rozgar",
    ],
    ages: ADULT,
    understand: {
      mr: "स्वतःची कमाई असणं म्हणजे आत्मविश्वास आणि स्वातंत्र्य. तुमच्यासाठी योग्य मार्ग शोधूया.",
      en: "Your own income means confidence and independence. Let's find the right path for you.",
      hi: "अपनी कमाई मतलब आत्मविश्वास और आज़ादी. आपके लिए सही रास्ता ढूँढते हैं.",
    },
    answer: [
      {
        mr: "तुम्हाला काय येतं — स्वयंपाक, शिवणकाम, हिशोब, लोकांशी बोलणं?",
        en: "What are you good at — cooking, tailoring, accounts, talking with people?",
        hi: "आपको क्या आता है — खाना बनाना, सिलाई, हिसाब, लोगों से बात करना?",
      },
      {
        mr: "दिवसातून किती वेळ देता येईल, आणि घरून की बाहेर?",
        en: "How much time can you give daily, and from home or outside?",
        hi: "दिन में कितना समय दे सकती हैं, और घर से या बाहर?",
      },
      {
        mr: "Income Finder या तीन-चार प्रश्नांवरून नोकरी, व्यवसाय आणि योजना सुचवतो.",
        en: "The Income Finder uses a few such questions to suggest jobs, businesses and schemes.",
        hi: "Income Finder ऐसे कुछ सवालों से नौकरी, व्यवसाय और योजनाएँ सुझाता है.",
      },
    ],
    next: {
      mr: "चला, Income Finder उघडून तुमच्यासाठी पर्याय पाहूया.",
      en: "Let's open the Income Finder and see options for you.",
      hi: "चलिए, Income Finder खोलकर आपके लिए विकल्प देखें.",
    },
    actions: [INCOME_FINDER],
  },
];
