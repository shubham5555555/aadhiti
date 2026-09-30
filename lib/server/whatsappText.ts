// Turns AADHI TI answers into WhatsApp messages (WhatsApp formatting: *bold*, _italic_).
import type { AiAnswer } from "@/lib/ai";
import { helplines } from "@/lib/data";
import type { Lang, Topic } from "@/lib/kb";
import { SAFETY_SCRIPTS } from "@/lib/safetyScripts";

const t3 = (lang: Lang, mr: string, hi: string, en: string) =>
  lang === "en" ? en : lang === "hi" ? hi : mr;

const helplineLine = (n: number, lang: Lang) => {
  const h = helplines.find((x) => Number(x.number) === n);
  return h ? `${n} (${h.name[lang]})` : String(n);
};

const contacts = (numbers: number[], lang: Lang) =>
  numbers.length
    ? `*${t3(lang, "संपर्क", "संपर्क", "Call")}:* ${numbers.map((n) => helplineLine(n, lang)).join(", ")}`
    : "";

const bullets = (items: string[]) => items.map((a) => `• ${a}`).join("\n");

const followUps = (options: string[], lang: Lang) =>
  options.length
    ? `${t3(lang, "तुम्ही हेही विचारू शकता:", "आप यह भी पूछ सकती हैं:", "You can also ask:")}\n${options.map((o, i) => `${i + 1}. ${o}`).join("\n")}`
    : "";

const join = (parts: string[]) => parts.filter(Boolean).join("\n\n");

/** Approved safety script (P0/P1) — never AI. */
export function scriptMessage(scriptId: string, lang: Lang): string {
  const s = SAFETY_SCRIPTS[scriptId];
  const al: Lang = s?.text[lang] ? lang : "mr";
  const x = s?.text[al];
  if (!s || !x) return emergencyMessage(lang);
  return join([
    `*${x.ack}*`,
    x.fu
      ? `*${t3(al, "सुरक्षा प्रश्न", "सुरक्षा सवाल", "Safety check")}:* ${x.fu}\n${t3(al, "धोका असेल तर आत्ता 112 वर कॉल करा.", "खतरा हो तो अभी 112 पर कॉल करें।", "If you are in danger, call 112 now.")}`
      : "",
    bullets(x.a),
    `*${t3(al, "पुढचं पाऊल", "अगला कदम", "Next step")}:* ${x.n}`,
    contacts(s.hl, al),
    s.url ? s.url : "",
    `_${t3(al, "मंजूर सुरक्षा माहिती", "स्वीकृत सुरक्षा जानकारी", "Approved safety guidance")}_`,
  ]);
}

/** AI answer (grounded in reviewed content). */
export function aiMessage(a: AiAnswer): string {
  const lang = a.lang;
  return join([
    a.risk === "P0"
      ? `*${t3(lang, "आत्ता धोका असेल तर लगेच 112 वर कॉल करा.", "अभी खतरा हो तो तुरंत 112 पर कॉल करें।", "If you are in danger now, call 112 immediately.")}*`
      : "",
    `*${a.understand}*`,
    a.safetyCheck
      ? `*${t3(lang, "सुरक्षा प्रश्न", "सुरक्षा सवाल", "Safety check")}:* ${a.safetyCheck}`
      : "",
    bullets(a.answer),
    a.nextStep
      ? `*${t3(lang, "पुढचं पाऊल", "अगला कदम", "Next step")}:* ${a.nextStep}`
      : "",
    contacts(a.helplines, lang),
    followUps(a.options, lang),
    `_${t3(lang, "स्रोत", "स्रोत", "Source")}: ${a.source}${a.verify ? ` · ${a.verify}` : ""}_\n_${
      a.topicId
        ? t3(
            lang,
            "तपासलेल्या माहितीवर आधारित AI उत्तर",
            "जाँची गई जानकारी पर आधारित AI जवाब",
            "AI answer based on reviewed information",
          )
        : t3(
            lang,
            "AI उत्तर (अजून तपासलेलं नाही)",
            "AI जवाब (अभी जाँचा नहीं गया)",
            "AI answer (not reviewed yet)",
          )
    }_`,
  ]);
}

/** Written knowledge-base answer, used when the AI is unavailable. */
export function topicMessage(topic: Topic, lang: Lang): string {
  return join([
    topic.emergency
      ? `*${t3(lang, "धोका असेल तर आत्ता 112 वर कॉल करा.", "खतरा हो तो अभी 112 पर कॉल करें।", "If you are in danger, call 112 now.")}*`
      : "",
    `*${topic.title[lang]}*`,
    topic.understand[lang],
    bullets(topic.answer.map((x) => x[lang])),
    `*${t3(lang, "पुढचं पाऊल", "अगला कदम", "Next step")}:* ${topic.next[lang]}`,
  ]);
}

export function emergencyMessage(lang: Lang): string {
  return t3(
    lang,
    "*धोका असेल तर आत्ता 112 वर कॉल करा.*\nमहिला हेल्पलाइन 1091 आणि 181, दोन्ही मोफत, 24 तास.",
    "*खतरा हो तो अभी 112 पर कॉल करें।*\nमहिला हेल्पलाइन 1091 और 181, दोनों मुफ़्त, 24 घंटे।",
    "*If you are in danger, call 112 now.*\nWomen's helplines 1091 and 181 are free, 24 hours.",
  );
}

export function welcomeMessage(lang: Lang): string {
  return t3(
    lang,
    "नमस्कार! मी *आधी ती (AADHI TI)*. सुरक्षा, आरोग्य, हक्क, योजना, कमाई, शिक्षण, कुटुंब — काहीही तुमच्या शब्दांत विचारा. सगळं गोपनीय आहे.\n\nउदा.\n• माझ्या मागे कोणीतरी येतंय\n• लाडकी बहीण योजनेसाठी मी पात्र आहे का?\n• PCOS म्हणजे काय?\n\nहिंदी किंवा English मध्येही लिहू शकता. धोका असेल तर आत्ता *112*.",
    "नमस्ते! मैं *आधी ती (AADHI TI)* हूँ। सुरक्षा, सेहत, अधिकार, योजनाएँ, कमाई, पढ़ाई, परिवार — कुछ भी अपने शब्दों में पूछिए। सब गोपनीय है।\n\nजैसे\n• कोई मेरा पीछा कर रहा है\n• क्या मैं लाडकी बहीण योजना के लिए पात्र हूँ?\n• PCOS क्या है?\n\nमराठी या English में भी लिख सकती हैं। खतरा हो तो अभी *112*।",
    "Hello! I'm *AADHI TI*. Ask anything in your own words — safety, health, rights, schemes, earning, education, family. Everything is private.\n\nFor example\n• Someone is following me\n• Am I eligible for Ladki Bahin?\n• What is PCOS?\n\nYou can also write in Marathi or Hindi. If you are in danger, call *112* now.",
  );
}

/** When she is upset or uses harsh words: stay kind, never mirror them. */
export function calmMessage(lang: Lang): string {
  return t3(
    lang,
    "मी तुमच्यासोबत आहे. राग येणं, त्रास होणं साहजिक आहे. काय झालं ते थोडक्यात सांगाल का? मी मदत करायचा प्रयत्न करते. धोका असेल तर आत्ता *112*, महिला हेल्पलाइन *181*.",
    "मैं आपके साथ हूँ। गुस्सा या परेशानी होना स्वाभाविक है। क्या हुआ, थोड़ा बताएँगी? मैं मदद की कोशिश करूँगी। खतरा हो तो अभी *112*, महिला हेल्पलाइन *181*।",
    "I'm here with you. It's natural to feel angry or upset. Could you tell me a little about what happened? I'll try to help. If you are in danger, call *112*; women's helpline *181*.",
  );
}

export function unknownMessage(lang: Lang): string {
  return t3(
    lang,
    "मला नीट समजलं नाही, पण मी तुमच्यासोबत आहे. थोडं अजून सांगाल का — काय होतंय, कधीपासून? धोका असेल तर आत्ता *112*.",
    "मुझे ठीक से समझ नहीं आया, पर मैं आपके साथ हूँ। थोड़ा और बताएँगी — क्या हो रहा है, कब से? खतरा हो तो अभी *112*।",
    "I didn't quite understand, but I'm here with you. Could you tell me a little more — what is happening, and since when? If you are in danger, call *112* now.",
  );
}

export function textOnlyMessage(lang: Lang): string {
  return t3(
    lang,
    "सध्या मी फक्त लिहिलेले संदेश वाचू शकते. कृपया तुमचा प्रश्न लिहून पाठवा. धोका असेल तर आत्ता *112*.",
    "अभी मैं सिर्फ़ लिखे हुए संदेश पढ़ सकती हूँ। कृपया अपना सवाल लिखकर भेजें। खतरा हो तो अभी *112*।",
    "For now I can only read typed messages. Please type your question. If you are in danger, call *112* now.",
  );
}

export function slowDownMessage(lang: Lang): string {
  return t3(
    lang,
    "खूप संदेश आले आहेत. थोड्या वेळाने पुन्हा लिहा. धोका असेल तर आत्ता *112*.",
    "बहुत सारे संदेश आ गए हैं। थोड़ी देर बाद फिर लिखें। खतरा हो तो अभी *112*।",
    "That's a lot of messages. Please write again in a little while. If you are in danger, call *112* now.",
  );
}
