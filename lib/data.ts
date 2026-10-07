import type { L } from "./kb/types";

export type Helpline = { number: string; name: L; desc: L };

export const helplines: Helpline[] = [
  {
    number: "112",
    name: { mr: "आपत्कालीन सेवा", en: "Emergency services", hi: "आपातकालीन सेवाएँ" },
    desc: { mr: "पोलीस, अग्निशमन आणि रुग्णवाहिका सेवा — २४ तास उपलब्ध", en: "Police, fire and ambulance services — available 24 hours a day", hi: "पुलिस, दमकल और एम्बुलेंस सेवा — २४ घंटे उपलब्ध" },
  },
  {
    number: "1091",
    name: { mr: "महिला हेल्पलाइन", en: "Women's Helpline", hi: "महिला हेल्पलाइन" },
    desc: { mr: "संकटात असलेल्या महिलांसाठी", en: "For women in distress", hi: "संकट में महिलाओं के लिए" },
  },
  {
    number: "181",
    name: { mr: "One Stop Centre", en: "One Stop Centre", hi: "वन स्टॉप सेंटर" },
    desc: { mr: "घरगुती हिंसाचाराच्या प्रकरणांत निवारा, कायदेशीर व वैद्यकीय मदत", en: "Shelter, legal and medical help in cases of domestic violence", hi: "घरेलू हिंसा के मामलों में आश्रय, कानूनी और चिकित्सा सहायता" },
  },
  {
    number: "1930",
    name: { mr: "सायबर गुन्हे", en: "Cybercrime Helpline", hi: "साइबर अपराध" },
    desc: { mr: "ऑनलाइन फसवणूक, धमक्या आणि ब्लॅकमेलिंग", en: "Online fraud, threats and blackmail", hi: "ऑनलाइन धोखाधड़ी, धमकियाँ और ब्लैकमेलिंग" },
  },
  {
    number: "1098",
    name: { mr: "Child Helpline", en: "Child Helpline", hi: "बाल हेल्पलाइन" },
    desc: { mr: "18 वर्षांखालील मुलींसाठी", en: "For children under 18", hi: "18 साल से कम उम्र की लड़कियों के लिए" },
  },
  {
    number: "14416",
    name: { mr: "Tele-MANAS", en: "Tele-MANAS", hi: "टेली-मानस" },
    desc: { mr: "मानसिक आरोग्यासाठी मदत आणि मोफत समुपदेशन", en: "Mental health support and free counselling", hi: "मानसिक स्वास्थ्य सहायता और मुफ़्त परामर्श" },
  },
  {
    number: "108",
    name: { mr: "ॲम्ब्युलन्स", en: "Ambulance", hi: "एम्बुलेंस" },
    desc: { mr: "वैद्यकीय आणीबाणी", en: "For medical emergencies", hi: "चिकित्सा आपातकाल" },
  },
  {
    number: "15100",
    name: { mr: "मोफत कायदेशीर मदत", en: "Free Legal Aid", hi: "मुफ़्त कानूनी सहायता" },
    desc: { mr: "NALSA (राष्ट्रीय विधी सेवा प्राधिकरण) कडून मोफत कायदेशीर सेवा", en: "Free legal services from NALSA (National Legal Services Authority)", hi: "NALSA (राष्ट्रीय विधिक सेवा प्राधिकरण) से मुफ़्त कानूनी सेवाएँ" },
  },
];
