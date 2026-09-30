// Approved safety scripts and deterministic risk rules, copied verbatim from the AADHI TI prototype
// (index.html SAFE + RULES, checked 29-09-2026). Fixed text — never generated. Rules run before any AI.
import type { Lang } from "./kb/types";

export type Risk = "P0" | "P1" | "P2" | "P3";
export type ScriptText = { ack: string; fu: string; a: string[]; n: string; o: string[] };
export type SafetyScript = {
  risk: Risk;
  intent: string;
  topic: string;
  /** Helpline numbers to show, in order. */
  hl: number[];
  plan: boolean;
  evidence: string | null;
  url: string | null;
  text: Partial<Record<Lang, ScriptText>>;
};

export const SAFETY_SCRIPTS: Record<string, SafetyScript> = {
  "p0": {
    "risk": "P0",
    "intent": "CONNECT",
    "topic": "Immediate danger",
    "hl": [
      112,
      181
    ],
    "plan": false,
    "evidence": null,
    "url": null,
    "text": {
      "mr": {
        "ack": "तुम्ही आत्ता धोक्यात आहात. आधी तुमची सुरक्षितता.",
        "fu": "",
        "a": [
          "शक्य असल्यास बाहेर पडा किंवा शेजाऱ्यांकडे जा. स्वयंपाकघरासारखी, हत्यारं असलेली जागा टाळा.",
          "आत्ताच 112 वर कॉल करा. बोलता येत नसेल तर फोन चालू ठेवा.",
          "181 महिला हेल्पलाइन 24 तास, मोफत."
        ],
        "n": "112 वर कॉल करा.",
        "o": []
      },
      "hi": {
        "ack": "आप अभी खतरे में हैं। पहले आपकी सुरक्षा।",
        "fu": "",
        "a": [
          "हो सके तो बाहर निकलें या पड़ोसियों के पास जाएँ। रसोई जैसी हथियार वाली जगह से बचें।",
          "अभी 112 पर कॉल करें। बोल न सकें तो फ़ोन चालू रखें।",
          "181 महिला हेल्पलाइन 24 घंटे, मुफ़्त।"
        ],
        "n": "112 पर कॉल करें।",
        "o": []
      },
      "en": {
        "ack": "You are in danger right now. Your safety comes first.",
        "fu": "",
        "a": [
          "If you can, get out or go to a neighbour. Avoid places with weapons, like the kitchen.",
          "Call 112 now. If you can't speak, keep the line open.",
          "181 Women Helpline is free, 24 hours."
        ],
        "n": "Call 112.",
        "o": []
      }
    }
  },
  "p0self": {
    "risk": "P0",
    "intent": "CONNECT",
    "topic": "Self-harm — immediate",
    "hl": [
      112,
      14416
    ],
    "plan": false,
    "evidence": null,
    "url": null,
    "text": {
      "mr": {
        "ack": "तुमचा जीव खूप महत्त्वाचा आहे. तुम्ही एकट्या नाही.",
        "fu": "",
        "a": [
          "आत्ताच 112 वर कॉल करा, किंवा जवळच्या व्यक्तीला लगेच बोलवा.",
          "काही घेतलं असेल तर लगेच 108 किंवा जवळचं रुग्णालय.",
          "टेली-मानस 14416: प्रशिक्षित समुपदेशक, 24 तास, मोफत."
        ],
        "n": "112 वर आत्ता कॉल करा.",
        "o": []
      },
      "hi": {
        "ack": "आपकी जान बहुत कीमती है। आप अकेली नहीं हैं।",
        "fu": "",
        "a": [
          "अभी 112 पर कॉल करें, या पास के किसी व्यक्ति को तुरंत बुलाएँ।",
          "कुछ खा/पी लिया है तो तुरंत 108 या नज़दीकी अस्पताल।",
          "टेली-मानस 14416: प्रशिक्षित काउंसलर, 24 घंटे, मुफ़्त।"
        ],
        "n": "अभी 112 पर कॉल करें।",
        "o": []
      },
      "en": {
        "ack": "Your life matters. You are not alone.",
        "fu": "",
        "a": [
          "Call 112 now, or call someone near you to come right away.",
          "If you have taken something, call 108 or go to the nearest hospital now.",
          "Tele-MANAS 14416: trained counsellors, free, 24 hours."
        ],
        "n": "Call 112 now.",
        "o": []
      }
    }
  },
  "stalking": {
    "risk": "P1",
    "intent": "ACT",
    "topic": "Stalking",
    "hl": [
      112,
      181
    ],
    "plan": true,
    "evidence": "stalk",
    "url": null,
    "text": {
      "mr": {
        "ack": "कोणी पाठलाग करत असेल तर घाबरणं साहजिक आहे.",
        "fu": "तुम्ही आत्ता सुरक्षित ठिकाणी आहात का?",
        "a": [
          "दुकान, बस स्टँड, मंदिर अशा उजेडाच्या, गर्दीच्या ठिकाणी जा.",
          "विश्वासू व्यक्तीला फोन करा आणि लोकेशन शेअर करा.",
          "त्या व्यक्तीशी थेट वाद घालू नका.",
          "तक्रारीसाठी नंतर तारीख, वेळ, ठिकाण, व्यक्तीचं वर्णन लिहून ठेवा."
        ],
        "n": "गर्दीच्या ठिकाणी जाऊन विश्वासू व्यक्तीला फोन करा.",
        "o": [
          "नंतर तक्रार कशी करायची?",
          "रोजच्या रस्त्यावर असं होत असेल तर?"
        ]
      },
      "hi": {
        "ack": "कोई पीछा कर रहा हो तो डरना स्वाभाविक है।",
        "fu": "क्या आप अभी सुरक्षित जगह पर हैं?",
        "a": [
          "रोशनी और भीड़ वाली जगह जाएँ (दुकान, बस स्टैंड, मंदिर)।",
          "किसी भरोसेमंद व्यक्ति को फ़ोन करें और लोकेशन शेयर करें।",
          "उस व्यक्ति से सीधे बहस न करें।",
          "बाद में तारीख, समय, जगह और व्यक्ति का विवरण लिख लें।"
        ],
        "n": "भीड़ वाली जगह जाकर भरोसेमंद व्यक्ति को फ़ोन करें।",
        "o": [
          "बाद में शिकायत कैसे करें?"
        ]
      },
      "en": {
        "ack": "Being followed is frightening.",
        "fu": "Are you in a safe place right now?",
        "a": [
          "Go somewhere bright and busy: a shop, bus stand or temple.",
          "Call someone you trust and share your location.",
          "Don't confront the person.",
          "For a complaint later, note the date, time, place and a description."
        ],
        "n": "Move to a busy place and call someone you trust.",
        "o": [
          "How do I file a complaint later?"
        ]
      }
    }
  },
  "dv": {
    "risk": "P1",
    "intent": "CONNECT",
    "topic": "Domestic violence",
    "hl": [
      181,
      112
    ],
    "plan": true,
    "evidence": "dv",
    "url": null,
    "text": {
      "mr": {
        "ack": "यात तुमची काहीच चूक नाही. तुम्हाला मदत मिळू शकते.",
        "fu": "तुम्ही आत्ता सुरक्षित आहात का?",
        "a": [
          "181 वर 24 तास, मोफत, गोपनीयपणे बोलता येतं.",
          "वन स्टॉप सेंटर (सखी), अलिबाग: वैद्यकीय, कायदेशीर मदत, समुपदेशन आणि 5 दिवसांपर्यंत निवारा.",
          "घरगुती हिंसाचार कायदा 2005: संरक्षण अधिकारी मदत करतात. संरक्षण, राहण्याचा हक्क, आर्थिक मदत असे आदेश मिळू शकतात. ही माहिती आहे, कायदेशीर सल्ला नाही.",
          "आधार, बँक पासबुक, थोडे पैसे, औषधं एका सुरक्षित ठिकाणी ठेवा."
        ],
        "n": "तुमच्या संमतीने आम्ही तुम्हाला प्रशिक्षित केस टीमशी जोडू शकतो.",
        "o": []
      },
      "hi": {
        "ack": "जो हो रहा है वह आपकी गलती नहीं है। आपको मदद मिल सकती है।",
        "fu": "क्या आप अभी सुरक्षित हैं?",
        "a": [
          "181 पर 24 घंटे, मुफ़्त, गोपनीय बात कर सकती हैं।",
          "वन स्टॉप सेंटर (सखी), अलीबाग: इलाज, कानूनी मदद, काउंसलिंग और 5 दिन तक रहने की जगह।",
          "घरेलू हिंसा अधिनियम 2005: संरक्षण अधिकारी मदद करते हैं। संरक्षण, निवास, आर्थिक राहत के आदेश मिल सकते हैं। यह जानकारी है, कानूनी सलाह नहीं।",
          "आधार, बैंक पासबुक, कुछ पैसे, दवाइयाँ एक सुरक्षित जगह रखें।"
        ],
        "n": "आपकी सहमति से हम आपको प्रशिक्षित केस टीम से जोड़ सकते हैं।",
        "o": []
      },
      "en": {
        "ack": "What is happening is not your fault. Help is available.",
        "fu": "Are you safe right now?",
        "a": [
          "You can talk to 181 in confidence, free, 24 hours.",
          "One Stop Centre (Sakhi), Alibag: medical, legal, counselling and shelter for up to 5 days.",
          "Under the Domestic Violence Act 2005, Protection Officers help you seek protection, residence and monetary relief orders. This is information, not legal advice.",
          "Keep Aadhaar, bank passbook, some cash and medicines in one safe place."
        ],
        "n": "With your consent, we can connect you to a trained case team.",
        "o": []
      }
    }
  },
  "sextortion": {
    "risk": "P1",
    "intent": "ACT",
    "topic": "Cyber threat",
    "hl": [
      1930,
      181
    ],
    "plan": false,
    "evidence": "cyber",
    "url": "https://cybercrime.gov.in",
    "text": {
      "mr": {
        "ack": "अशी धमकी गंभीर आहे आणि यात तुमची चूक नाही.",
        "fu": "तुम्हाला शारीरिक धोका आहे का?",
        "a": [
          "पैसे देऊ नका आणि आणखी फोटो पाठवू नका.",
          "चॅट डिलीट करू नका. स्क्रीनशॉट घ्या: प्रोफाइल लिंक, युजर आयडी, तारीख, वेळ.",
          "cybercrime.gov.in वर किंवा 1930 वर तक्रार करा.",
          "त्या अकाउंटला ॲपवर रिपोर्ट करा, मग ब्लॉक करा."
        ],
        "n": "आजच 1930 वर कॉल करा किंवा cybercrime.gov.in वर तक्रार नोंदवा.",
        "o": [
          "स्क्रीनशॉट कसे जपून ठेवू?",
          "घरच्यांना कसं सांगू?"
        ]
      },
      "hi": {
        "ack": "ऐसी धमकी गंभीर है और यह आपकी गलती नहीं है।",
        "fu": "क्या आपको शारीरिक खतरा है?",
        "a": [
          "न पैसे दें, न और फ़ोटो भेजें।",
          "चैट डिलीट न करें। स्क्रीनशॉट लें: प्रोफ़ाइल लिंक, यूज़र आईडी, तारीख, समय।",
          "cybercrime.gov.in या 1930 पर शिकायत करें।",
          "उस अकाउंट को ऐप पर रिपोर्ट करें, फिर ब्लॉक करें।"
        ],
        "n": "आज ही 1930 पर कॉल करें या cybercrime.gov.in पर शिकायत करें।",
        "o": []
      },
      "en": {
        "ack": "A threat like this is serious, and it is not your fault.",
        "fu": "Are you in any physical danger?",
        "a": [
          "Don't pay and don't send more photos.",
          "Don't delete the chat. Screenshot the profile link, user ID, date and time.",
          "Report at cybercrime.gov.in or call 1930.",
          "Report the account in the app, then block it."
        ],
        "n": "Call 1930 or file at cybercrime.gov.in today.",
        "o": []
      }
    }
  },
  "sexual": {
    "risk": "P1",
    "intent": "CONNECT",
    "topic": "Sexual violence",
    "hl": [
      181,
      112,
      108
    ],
    "plan": false,
    "evidence": "medical",
    "url": null,
    "text": {
      "mr": {
        "ack": "हे सांगणं सोपं नाही. जे झालं त्यात तुमची चूक नाही.",
        "fu": "तुम्ही आत्ता सुरक्षित ठिकाणी आहात का?",
        "a": [
          "लवकरात लवकर रुग्णालयात जा. उपचार मोफत आहेत. 72 तासांत गेल्यास गर्भनिरोधक व HIV प्रतिबंधक उपचार जास्त उपयोगी पडतात.",
          "शक्य असल्यास आंघोळ करू नका, कपडे बदलू नका. कपडे कागदी पिशवीत ठेवा.",
          "वैद्यकीय तपासणीसाठी FIR लागत नाही. रुग्णालय पोलिसांना कळवतं, पण तक्रार करायची की नाही हे तुम्ही ठरवता.",
          "कोणत्याही पोलीस ठाण्यात झिरो FIR (BNSS कलम 173) होते. जबाब महिला अधिकारी घेतात."
        ],
        "n": "181 वर कॉल करा. ते वन स्टॉप सेंटरशी जोडतील.",
        "o": []
      },
      "hi": {
        "ack": "यह बताना आसान नहीं है। जो हुआ वह आपकी गलती नहीं है।",
        "fu": "क्या आप अभी सुरक्षित जगह पर हैं?",
        "a": [
          "जल्द से जल्द अस्पताल जाएँ। इलाज मुफ़्त है। 72 घंटे में गर्भनिरोधक व HIV रोकथाम उपचार अधिक असरदार है।",
          "हो सके तो नहाएँ नहीं, कपड़े न बदलें। कपड़े कागज़ की थैली में रखें।",
          "मेडिकल जाँच के लिए FIR ज़रूरी नहीं। अस्पताल पुलिस को बताता है, पर शिकायत करना आपका फ़ैसला है।",
          "किसी भी थाने में ज़ीरो FIR (BNSS धारा 173) होती है। बयान महिला अधिकारी लेती हैं।"
        ],
        "n": "181 पर कॉल करें। वे वन स्टॉप सेंटर से जोड़ेंगे।",
        "o": []
      },
      "en": {
        "ack": "This is hard to talk about. What happened is not your fault.",
        "fu": "Are you in a safe place now?",
        "a": [
          "Go to a hospital as soon as you can. Treatment is free. Emergency contraception and HIV prevention work best within 72 hours.",
          "If you can, don't bathe or change clothes. Keep clothes in a paper bag.",
          "An FIR is not needed for a medical examination. The hospital informs police, but filing a complaint is your choice.",
          "You can file a \"Zero FIR\" at any police station (BNSS section 173). A woman officer records your statement."
        ],
        "n": "Call 181. They will connect you to the One Stop Centre.",
        "o": []
      }
    }
  },
  "selfharm": {
    "risk": "P1",
    "intent": "CONNECT",
    "topic": "Self-harm thoughts",
    "hl": [
      14416,
      112
    ],
    "plan": false,
    "evidence": null,
    "url": null,
    "text": {
      "mr": {
        "ack": "हे सांगितलंत ते बरं केलंत. तुम्ही एकट्या नाही.",
        "fu": "तुम्ही आत्ता सुरक्षित आहात का?",
        "a": [
          "टेली-मानस 14416 वर प्रशिक्षित समुपदेशक 24 तास, मोफत बोलतात.",
          "आत्ता धोका असेल तर 112 वर कॉल करा.",
          "जवळच्या विश्वासू व्यक्तीला आत्ताच सांगा किंवा बोलावून घ्या."
        ],
        "n": "14416 वर आत्ता कॉल करा.",
        "o": []
      },
      "hi": {
        "ack": "आपने यह बताया, अच्छा किया। आप अकेली नहीं हैं।",
        "fu": "क्या आप अभी सुरक्षित हैं?",
        "a": [
          "टेली-मानस 14416 पर प्रशिक्षित काउंसलर 24 घंटे, मुफ़्त बात करते हैं।",
          "अभी खतरा हो तो 112 पर कॉल करें।",
          "किसी भरोसेमंद व्यक्ति को अभी बताएँ या बुला लें।"
        ],
        "n": "अभी 14416 पर कॉल करें।",
        "o": []
      },
      "en": {
        "ack": "Thank you for telling me. You are not alone.",
        "fu": "Are you safe right now?",
        "a": [
          "Tele-MANAS 14416 has trained counsellors, free, 24 hours.",
          "If you are in immediate danger, call 112.",
          "Tell someone you trust now, or ask them to come to you."
        ],
        "n": "Call 14416 now.",
        "o": []
      }
    }
  },
  "child": {
    "risk": "P1",
    "intent": "CONNECT",
    "topic": "Child safety",
    "hl": [
      1098,
      112
    ],
    "plan": false,
    "evidence": null,
    "url": null,
    "text": {
      "mr": {
        "ack": "तुम्ही लक्ष दिलंत, हे चांगलं केलंत. आधी मुलांची सुरक्षितता.",
        "fu": "",
        "a": [
          "मुलीशी शांतपणे, दोष न देता बोला. ती जे सांगेल त्यावर विश्वास ठेवा.",
          "तिला त्या व्यक्तीसोबत एकटं सोडू नका.",
          "1098 चाइल्ड हेल्पलाइन 24 तास मोफत.",
          "POCSO कायद्यानुसार मुलांवरील लैंगिक अत्याचाराची माहिती पोलिसांना देणं बंधनकारक आहे. 1098 किंवा पोलीस मार्गदर्शन करतील."
        ],
        "n": "1098 वर कॉल करून सल्ला घ्या.",
        "o": []
      },
      "hi": {
        "ack": "आपने ध्यान दिया, अच्छा किया। बच्चों की सुरक्षा पहले।",
        "fu": "",
        "a": [
          "बेटी से शांति से, बिना दोष दिए बात करें। वह जो कहे उस पर भरोसा करें।",
          "उसे उस व्यक्ति के साथ अकेला न छोड़ें।",
          "1098 चाइल्ड हेल्पलाइन 24 घंटे मुफ़्त।",
          "POCSO के तहत बच्चों पर यौन अपराध की सूचना पुलिस को देना अनिवार्य है। 1098 या पुलिस मार्गदर्शन करेंगे।"
        ],
        "n": "1098 पर कॉल करके सलाह लें।",
        "o": []
      },
      "en": {
        "ack": "It is good that you noticed. The child's safety comes first.",
        "fu": "",
        "a": [
          "Talk to her calmly, without blame. Believe what she tells you.",
          "Don't leave her alone with that person.",
          "Child Helpline 1098 is free, 24 hours.",
          "Under POCSO, reporting child sexual abuse to police is mandatory. 1098 or police will guide you."
        ],
        "n": "Call 1098 for advice.",
        "o": []
      }
    }
  }
};

const RULES: { id: string; re: RegExp }[] = [
  {
    "id": "p0self",
    "source": "(आत्ता|आता|now|abhi|atta|aata|अभी).{0,30}(जीव देणार|जीव देते|आत्महत्या|मरणार|suicide|kill myself|jeev denar|mar jaungi|मर जाऊँगी)|गोळ्या घेतल्या|विष घेतलं|zeher kha|poison",
    "flags": "i"
  },
  {
    "id": "p0",
    "source": "(आत्ता|आता|सध्या|right now|अभी|abhi|atta).{0,40}(मारत|मारतोय|मारहाण|मार रहा|मार रही|hitting|beating|attack|हल्ला|maar raha|marat)|मारत आहे|मारत आहेत|मार रहा है|mala marat aahe|maar raha hai|(चाकू|सुरा|कोयता|बंदूक|knife|gun|weapon|chaku)|वाचवा|बचाओ|bachao|vachva|help me now|save me|अपहरण|kidnap|किडनॅप|रक्त येत आहे|bleeding badly|(is|are|he's|hes|she's|they're|keeps|keep)\\s+(beating|hitting|attacking|choking|strangling|hurting|slapping)\\s+me|(beating|hitting|attacking|choking|strangling)\\s+me(\\s+right)?\\s+now|(going|trying|wants?)\\s+to\\s+kill\\s+me|will\\s+kill\\s+me|maar\\s+rahe|mar\\s+raha",
    "flags": "i"
  },
  {
    "id": "selfharm",
    "source": "आत्महत्या|जीव द्या|जीव देण|मरायचं|मरून जा|जगायचं नाही|मर जाना|जीना नहीं|suicide|kill myself|end my life|खुदकुशी|marayche|jagaycha nahi",
    "flags": "i"
  },
  {
    "id": "sexual",
    "source": "बलात्कार|rape|जबरदस्ती संबंध|लैंगिक अत्याचार|sexual assault|balatkar",
    "flags": "i"
  },
  {
    "id": "sextortion",
    "source": "(फोटो|photo|व्हिडिओ|video|pics?|images?).{0,50}(धमकी|धमकाव|threat|viral|व्हायरल|leak|पसरव|blackmail|ब्लॅकमेल)|(धमकी|धमकाव|threat|dhamki|blackmail|ब्लॅकमेल).{0,50}(फोटो|photo|video|व्हिडिओ)|sextortion",
    "flags": "i"
  },
  {
    "id": "stalking",
    "source": "follow कर|पाठलाग|पीछा|stalk|following me|मागे मागे|मागे येत|pathlag|peecha|pichha",
    "flags": "i"
  },
  {
    "id": "dv",
    "source": "(नवरा|नवऱ्या|पती|husband|सासू|सासरे|सासरचे|in-laws|partner|navra|nawra|pati).{0,40}(मारतो|मारते|मारतात|हात उचल|मारहाण|धमकी|धमकाव|threat|hits|beats|beat me|hit me|slaps?|kicks?|abuse|छळ|marto|maarta)|घरगुती हिंसा|domestic violence",
    "flags": "i"
  },
  {
    "id": "child",
    "source": "(मुलगी|मुलीला|मुलाला|बाळ|child|daughter|बेटी|mulgi|mulila).{0,60}(घाबरते|घाबरतो|स्पर्श|touch|नातेवाईक|abuse|अत्याचार|darti)|बालविवाह|child marriage|बाल विवाह",
    "flags": "i"
  }
].map((r: { id: string; source: string; flags: string }) => ({ id: r.id, re: new RegExp(r.source, r.flags) }));

/** Returns the id of the first safety rule her message triggers, or null. */
export function safetyRule(message: string): string | null {
  for (const r of RULES) if (r.re.test(message)) return r.id;
  return null;
}
