import type { L } from "./kb/types";

export type VoiceGender = "female" | "male";

/** A line with male verb forms where the language needs them (Hindi and Marathi first person). */
type GL = L & { male?: Partial<L> };
export const said = (l: GL, g: VoiceGender): L => (g === "male" && l.male ? { ...l, ...l.male } : l);

// ---------- AI safety call (two-way: she taps a reply, AADHI TI answers) ----------

export const safetyCallScript: GL[] = [
  {
    mr: "नमस्कार, मी AADHI TI. मी तुमच्यासोबत फोनवर आहे.",
    en: "Hi, this is AADHI TI. I'm on the line with you.",
    hi: "नमस्ते, मैं AADHI TI हूँ। मैं आपके साथ फ़ोन पर हूँ।",
  },
  {
    mr: "तुम्ही सुरक्षित पोहोचेपर्यंत मी सोबत राहीन. तुम्ही कुठे जात आहात?",
    en: "I'll stay with you until you reach safely. Where are you headed?",
    hi: "जब तक आप सुरक्षित नहीं पहुँचतीं, मैं साथ रहूँगी। आप कहाँ जा रही हैं?",
    male: { hi: "जब तक आप सुरक्षित नहीं पहुँचतीं, मैं साथ रहूँगा। आप कहाँ जा रही हैं?" },
  },
];

export const callReplies: { option: L; reply: GL }[] = [
  {
    option: { mr: "मी घरी चालत जात आहे", en: "I'm walking home", hi: "मैं घर पैदल जा रही हूँ" },
    reply: {
      mr: "ठीक आहे. उजेड आणि लोक असलेल्या मुख्य रस्त्यावरून चाला. मी तुमचं location पाहत आहे. एखादी खूण ओलांडली की मला सांगा.",
      en: "Okay. Keep to the main road with lights and people. I'm following your location. Tell me when you pass a landmark.",
      hi: "ठीक है। रोशनी और लोगों वाली मुख्य सड़क पर चलिए। मैं आपकी location देख रही हूँ। कोई निशानी पार करें तो बताइए।",
      male: { hi: "ठीक है। रोशनी और लोगों वाली मुख्य सड़क पर चलिए। मैं आपकी location देख रहा हूँ। कोई निशानी पार करें तो बताइए।" },
    },
  },
  {
    option: { mr: "कोणीतरी माझ्या मागे येतंय", en: "Someone is following me", hi: "कोई मेरा पीछा कर रहा है" },
    reply: {
      mr: "शांत राहा. आत्ता जवळच्या दुकानात किंवा गर्दीच्या ठिकाणी जा. मी तुमच्या विश्वासू व्यक्तींना कळवत आहे आणि 112 ला जोडू शकते. माझ्याशी बोलत राहा.",
      en: "Stay calm. Walk into the nearest shop or crowded place right now. I'm alerting your trusted contacts and can connect you to 112. Keep talking to me.",
      hi: "शांत रहिए। अभी पास की दुकान या भीड़ वाली जगह में जाइए। मैं आपके भरोसेमंद लोगों को सूचना दे रही हूँ और 112 से जोड़ सकती हूँ। मुझसे बात करती रहिए।",
      male: {
        mr: "शांत राहा. आत्ता जवळच्या दुकानात किंवा गर्दीच्या ठिकाणी जा. मी तुमच्या विश्वासू व्यक्तींना कळवत आहे आणि 112 ला जोडू शकतो. माझ्याशी बोलत राहा.",
        hi: "शांत रहिए। अभी पास की दुकान या भीड़ वाली जगह में जाइए। मैं आपके भरोसेमंद लोगों को सूचना दे रहा हूँ और 112 से जोड़ सकता हूँ। मुझसे बात करती रहिए।",
      },
    },
  },
  {
    option: { mr: "मी रिक्षा / गाडीत आहे", en: "I'm in an auto / cab", hi: "मैं ऑटो / कैब में हूँ" },
    reply: {
      mr: "समजलं. गाडीचा नंबर मी नोंदवला आहे. खिडकी थोडी उघडी ठेवा. रस्ता बदलला तर लगेच सांगा, मी तुमच्या माणसांना कळवेन.",
      en: "Got it. I've noted the vehicle details. Keep the window slightly open. If the route changes, tell me and I'll alert your contacts.",
      hi: "समझ गई। गाड़ी का नंबर मैंने नोट कर लिया है। खिड़की थोड़ी खुली रखिए। रास्ता बदले तो तुरंत बताइए, मैं आपके लोगों को सूचना दूँगी।",
      male: { hi: "समझ गया। गाड़ी का नंबर मैंने नोट कर लिया है। खिड़की थोड़ी खुली रखिए। रास्ता बदले तो तुरंत बताइए, मैं आपके लोगों को सूचना दूँगा।" },
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
      male: {
        mr: "खूप छान! तुम्ही सुरक्षित आहात याचा आनंद आहे. मी तुमच्या माणसांना कळवतो. काळजी घ्या!",
        hi: "बहुत अच्छा! आप सुरक्षित हैं, यह सुनकर ख़ुशी हुई। मैं आपके लोगों को बता देता हूँ। ध्यान रखिए!",
      },
    },
  },
];

// ---------- Fake incoming call (one-sided: only the caller speaks) ----------
// Each line is followed by a pause long enough for her to answer out loud ("हो आई", "येते"),
// so anyone nearby hears a real two-way conversation.

export type FakeLine = { text: L; pause: number };

export const defaultCaller: Record<VoiceGender, L> = {
  female: { mr: "आई", en: "Maa", hi: "माँ" },
  male: { mr: "बाबा", en: "Papa", hi: "पापा" },
};

export const fakeCallScript: Record<VoiceGender, FakeLine[]> = {
  female: [
    { text: { mr: "हॅलो? अगं कुठे आहेस तू? कधीपासून फोन करतेय मी.", en: "Hello? Where are you? I've been calling you for ages.", hi: "हैलो? कहाँ हो तुम? कब से फ़ोन कर रही हूँ।" }, pause: 3400 },
    { text: { mr: "बरं बरं. ऐक, तुझ्या भावाला घेऊन मी निघालेय. पाच मिनिटांत पोहोचू.", en: "Okay, okay. Listen, I've left with your brother. We'll be there in five minutes.", hi: "अच्छा अच्छा। सुनो, मैं तुम्हारे भाई को लेकर निकल गई हूँ। पाँच मिनट में पहुँचते हैं।" }, pause: 3200 },
    { text: { mr: "तू तिथेच उजेडात थांब, दुकानाजवळ. कुठे एकटी जाऊ नकोस, बरं का?", en: "Wait right there where it's bright, near the shop. Don't go anywhere alone, okay?", hi: "तुम वहीं रोशनी में रुको, दुकान के पास। कहीं अकेले मत जाना, ठीक है?" }, pause: 3600 },
    { text: { mr: "हो, मला तुझं location दिसतंय. आम्ही जवळच आहोत.", en: "Yes, I can see your location. We're close.", hi: "हाँ, मुझे तुम्हारी location दिख रही है। हम पास ही हैं।" }, pause: 3800 },
    { text: { mr: "फोन ठेवू नकोस. माझ्याशी बोलत राहा.", en: "Don't hang up. Keep talking to me.", hi: "फ़ोन मत रखना। मुझसे बात करती रहो।" }, pause: 5000 },
  ],
  male: [
    { text: { mr: "हॅलो? बाळा, कुठे आहेस? कधीपासून फोन करतोय मी.", en: "Hello? Where are you, beta? I've been calling you for ages.", hi: "हैलो? बेटा, कहाँ हो? कब से फ़ोन कर रहा हूँ।" }, pause: 3400 },
    { text: { mr: "बरं. ऐक, मी गाडी घेऊन निघालोय. पाच मिनिटांत तिथे पोहोचतो.", en: "Okay. Listen, I've left with the car. I'll be there in five minutes.", hi: "अच्छा। सुनो, मैं गाड़ी लेकर निकल गया हूँ। पाँच मिनट में वहाँ पहुँचता हूँ।" }, pause: 3200 },
    { text: { mr: "तू तिथेच उजेडात थांब, दुकानाजवळ. कुठे एकटी जाऊ नकोस, समजलं?", en: "Wait right there where it's bright, near the shop. Don't go anywhere alone, understood?", hi: "तुम वहीं रोशनी में रुको, दुकान के पास। कहीं अकेले मत जाना, समझी?" }, pause: 3600 },
    { text: { mr: "हो, मला तुझं location दिसतंय. मी जवळच आहे.", en: "Yes, I can see your location. I'm close.", hi: "हाँ, मुझे तुम्हारी location दिख रही है। मैं पास ही हूँ।" }, pause: 3800 },
    { text: { mr: "फोन ठेवू नकोस. माझ्याशी बोलत राहा.", en: "Don't hang up. Keep talking to me.", hi: "फ़ोन मत रखना। मुझसे बात करती रहो।" }, pause: 5000 },
  ],
};

/** Short check-ins after the script, spaced out, until she hangs up. */
export const fakeCallFillers: Record<VoiceGender, L[]> = {
  female: [
    { mr: "हं... हो, ऐकतेय मी.", en: "Mm... yes, I'm listening.", hi: "हम्म... हाँ, सुन रही हूँ।" },
    { mr: "अजून तिथेच आहेस ना?", en: "You're still there, right?", hi: "अभी भी वहीं हो ना?" },
    { mr: "आलोच, कोपऱ्यावर आहोत.", en: "Almost there, we're at the corner.", hi: "बस आ गए, नुक्कड़ पर हैं।" },
    { mr: "हो हो, दिसतेय मला तू. थांब.", en: "Yes, I can see you. Wait there.", hi: "हाँ हाँ, दिख रही हो तुम। रुको।" },
  ],
  male: [
    { mr: "हं... हो, ऐकतोय मी.", en: "Mm... yes, I'm listening.", hi: "हम्म... हाँ, सुन रहा हूँ।" },
    { mr: "अजून तिथेच आहेस ना?", en: "You're still there, right?", hi: "अभी भी वहीं हो ना?" },
    { mr: "आलोच, कोपऱ्यावर आहे.", en: "Almost there, I'm at the corner.", hi: "बस आ गया, नुक्कड़ पर हूँ।" },
    { mr: "हो हो, दिसतेस मला. थांब.", en: "Yes, I can see you. Wait there.", hi: "हाँ हाँ, दिख रही हो। रुको।" },
  ],
};
