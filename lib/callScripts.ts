import type { L } from "./kb/types";

export const safetyCallScript: L[] = [
  {
    mr: "नमस्कार, मी AADHI TI. मी तुमच्यासोबत फोनवर आहे.",
    en: "Hi, this is AADHI TI. I'm on the line with you.",
    hi: "नमस्ते, मैं AADHI TI हूँ। मैं आपके साथ फ़ोन पर हूँ।",
  },
  {
    mr: "तुम्ही सुरक्षित पोहोचेपर्यंत मी सोबत राहीन. तुम्ही कुठे जात आहात?",
    en: "I'll stay with you until you reach safely. Where are you headed?",
    hi: "जब तक आप सुरक्षित नहीं पहुँचतीं, मैं साथ रहूँगी। आप कहाँ जा रही हैं?",
  },
];

export const callReplies: { option: L; reply: L }[] = [
  {
    option: { mr: "मी घरी चालत जात आहे", en: "I'm walking home", hi: "मैं घर पैदल जा रही हूँ" },
    reply: {
      mr: "ठीक आहे. उजेड आणि लोक असलेल्या मुख्य रस्त्यावरून चाला. मी तुमचं location पाहत आहे. एखादी खूण ओलांडली की मला सांगा.",
      en: "Okay. Keep to the main road with lights and people. I'm following your location. Tell me when you pass a landmark.",
      hi: "ठीक है। रोशनी और लोगों वाली मुख्य सड़क पर चलिए। मैं आपकी location देख रही हूँ। कोई निशानी पार करें तो बताइए।",
    },
  },
  {
    option: { mr: "कोणीतरी माझ्या मागे येतंय", en: "Someone is following me", hi: "कोई मेरा पीछा कर रहा है" },
    reply: {
      mr: "शांत राहा. आत्ता जवळच्या दुकानात किंवा गर्दीच्या ठिकाणी जा. मी तुमच्या विश्वासू व्यक्तींना कळवत आहे आणि 112 ला जोडू शकते. माझ्याशी बोलत राहा.",
      en: "Stay calm. Walk into the nearest shop or crowded place right now. I'm alerting your trusted contacts and can connect you to 112. Keep talking to me.",
      hi: "शांत रहिए। अभी पास की दुकान या भीड़ वाली जगह में जाइए। मैं आपके भरोसेमंद लोगों को सूचना दे रही हूँ और 112 से जोड़ सकती हूँ। मुझसे बात करती रहिए।",
    },
  },
  {
    option: { mr: "मी रिक्षा / गाडीत आहे", en: "I'm in an auto / cab", hi: "मैं ऑटो / कैब में हूँ" },
    reply: {
      mr: "समजलं. गाडीचा नंबर मी नोंदवला आहे. खिडकी थोडी उघडी ठेवा. रस्ता बदलला तर लगेच सांगा, मी तुमच्या माणसांना कळवेन.",
      en: "Got it. I've noted the vehicle details. Keep the window slightly open. If the route changes, tell me and I'll alert your contacts.",
      hi: "समझ गई। गाड़ी का नंबर मैंने नोट कर लिया है। खिड़की थोड़ी खुली रखिए। रास्ता बदले तो तुरंत बताइए, मैं आपके लोगों को सूचना दूँगी।",
    },
  },
  {
    option: { mr: "माझं location पाठवा", en: "Share my location", hi: "मेरी location भेजिए" },
    reply: {
      mr: "झालं. तुमचं live location तुमच्या तीन विश्वासू व्यक्तींना पाठवलं आहे. पुढचा एक तास ते तुम्हाला पाहू शकतील.",
      en: "Done. Your live location is shared with your three trusted contacts. They can follow you for the next hour.",
      hi: "हो गया। आपकी live location तीन भरोसेमंद लोगों को भेज दी है। अगले एक घंटे तक वे आपको देख सकेंगे।",
    },
  },
  {
    option: { mr: "मी सुरक्षित पोहोचले", en: "I've reached safely", hi: "मैं सुरक्षित पहुँच गई" },
    reply: {
      mr: "खूप छान! तुम्ही सुरक्षित आहात याचा आनंद आहे. मी तुमच्या माणसांना कळवते. काळजी घ्या!",
      en: "That's wonderful. I'm so glad you're safe. I'll let your contacts know. Take care!",
      hi: "बहुत अच्छा! आप सुरक्षित हैं, यह सुनकर ख़ुशी हुई। मैं आपके लोगों को बता देती हूँ। ध्यान रखिए!",
    },
  },
];

export const fakeCallScript: L[] = [
  { mr: "हॅलो बाळा? तू आत्ता कुठे आहेस?", en: "Hello dear? Where are you right now?", hi: "हैलो बेटा? तुम अभी कहाँ हो?" },
  { mr: "मी इथेच कोपऱ्यावर आहे, मला मुख्य रस्ता दिसतोय.", en: "I'm just around the corner, I can see the main road.", hi: "मैं यहीं नुक्कड़ पर हूँ, मुझे मेन रोड दिख रही है।" },
  { mr: "तिथेच थांब, मी दोन मिनिटांत तुला घ्यायला येतेय.", en: "Stay right there, I'm coming to pick you up in two minutes.", hi: "वहीं रुको, मैं दो मिनट में तुम्हें लेने आ रही हूँ।" },
  { mr: "तुझा भाऊ पण माझ्यासोबत आहे. फोन चालू ठेव, बरं का?", en: "Your brother is with me too. Keep the phone on, okay?", hi: "तुम्हारा भाई भी मेरे साथ है। फ़ोन चालू रखना, ठीक है?" },
];
