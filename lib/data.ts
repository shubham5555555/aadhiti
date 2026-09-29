import type { L } from "./kb/types";

export type Helpline = { number: string; name: L; desc: L };

export const helplines: Helpline[] = [
  {
    number: "112",
    name: { mr: "आणीबाणी", en: "Emergency", hi: "आपातकाल" },
    desc: { mr: "पोलीस, अग्निशमन, ॲम्ब्युलन्स — 24x7", en: "Police, fire & ambulance — 24x7", hi: "पुलिस, फ़ायर, एम्बुलेंस — 24x7" },
  },
  {
    number: "1091",
    name: { mr: "महिला हेल्पलाइन", en: "Women Helpline", hi: "महिला हेल्पलाइन" },
    desc: { mr: "संकटात असलेल्या महिलांसाठी", en: "For women in distress", hi: "संकट में महिलाओं के लिए" },
  },
  {
    number: "181",
    name: { mr: "One Stop Centre", en: "One Stop Centre", hi: "वन स्टॉप सेंटर" },
    desc: { mr: "घरगुती हिंसा — निवारा, कायदेशीर, वैद्यकीय मदत", en: "Domestic violence — shelter, legal, medical help", hi: "घरेलू हिंसा — आश्रय, कानूनी, चिकित्सा मदद" },
  },
  {
    number: "1930",
    name: { mr: "सायबर गुन्हे", en: "Cyber Crime", hi: "साइबर अपराध" },
    desc: { mr: "ऑनलाइन फसवणूक, धमकी, blackmail", en: "Online fraud, threats, blackmail", hi: "ऑनलाइन धोखाधड़ी, धमकी, blackmail" },
  },
  {
    number: "1098",
    name: { mr: "Childline", en: "Childline", hi: "चाइल्डलाइन" },
    desc: { mr: "18 वर्षांखालील मुलींसाठी", en: "For girls under 18", hi: "18 साल से कम उम्र की लड़कियों के लिए" },
  },
  {
    number: "14416",
    name: { mr: "Tele-MANAS", en: "Tele-MANAS", hi: "टेली-मानस" },
    desc: { mr: "मानसिक आरोग्य — मोफत counselling", en: "Mental health — free counselling", hi: "मानसिक स्वास्थ्य — मुफ़्त counselling" },
  },
  {
    number: "108",
    name: { mr: "ॲम्ब्युलन्स", en: "Ambulance", hi: "एम्बुलेंस" },
    desc: { mr: "वैद्यकीय आणीबाणी", en: "Medical emergency", hi: "चिकित्सा आपातकाल" },
  },
  {
    number: "15100",
    name: { mr: "मोफत कायदेशीर मदत", en: "Free Legal Aid", hi: "मुफ़्त कानूनी सहायता" },
    desc: { mr: "NALSA कायदेशीर सेवा", en: "NALSA legal services", hi: "NALSA कानूनी सेवाएँ" },
  },
];
