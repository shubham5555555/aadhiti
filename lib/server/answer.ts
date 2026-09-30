// The AI answer engine shared by the website chat (/api/chat) and WhatsApp (/api/wati/webhook).
// Follows the AADHI TI prototype's rules: grounded in the reviewed knowledge base, the schemes
// registry and the helpline list. Fixed safety scripts run before this (see lib/safetyScripts).
import { understand, type AgeGroup, type Lang, type Topic } from "@/lib/kb";
import { SCHEMES } from "@/lib/schemes";
import { helplines } from "@/lib/data";
import type { AiAnswer, AiModule, ChatTurn } from "@/lib/ai";
import { detectLang } from "@/lib/detectLang";
import { hasAbuse } from "@/lib/server/langGuard";

export const MAX_CHARS = 800;
const LANG_NAME: Record<Lang, string> = {
  mr: "Marathi",
  en: "English",
  hi: "Hindi",
};
export const AGES: AgeGroup[] = ["girl", "18", "30", "40", "50"];
const AGE_BAND: Record<AgeGroup, string> = {
  girl: "13-17",
  "18": "18-29",
  "30": "30-44",
  "40": "45-59",
  "50": "60+",
};
const HELPLINE_NUMBERS = helplines.map((h) => Number(h.number));
const MODULES: AiModule[] = [
  "scheme",
  "income",
  "health",
  "wellbeing",
  "safety",
  "none",
];

// Everything the model may state as fact. Schemes the registry hasn't confirmed are marked.
const KNOWLEDGE = [
  "HELPLINES: " +
    helplines.map((h) => `${h.number} (${h.name.en}: ${h.desc.en})`).join("; "),
  "SCHEMES:",
  ...SCHEMES.map(
    (s) =>
      `- ${s.name.en} [${s.status === "official" ? "confirmed" : "needs confirmation"}, checked ${s.lastChecked}]: ${s.what.en} Who: ${s.who.en.join("; ")}. Benefit: ${s.benefit.en}. Apply: ${s.apply.en.join("; ")}.`,
  ),
  "OFFICES: Anganwadi sevika; Setu / Aaple Sarkar centre; Tahsil office Shrivardhan; One Stop Centre (Sakhi) via 181; free legal aid 15100.",
].join("\n");

const TALUKA_NAMES: Record<string, string> = {
  shrivardhan: "Shrivardhan",
  mhasla: "Mhasla",
  mangaon: "Mangaon",
  tala: "Tala",
  roha: "Roha",
  alibag: "Alibag",
  murud: "Murud",
  mahad: "Mahad",
  pen: "Pen",
  panvel: "Panvel",
};
const CHILD_TEXT: Record<string, string> = {
  baby: "a baby under 1",
  toddler: "a child aged 1-3",
  preschool: "a child aged 3-6",
  school: "a child aged 6-10",
  girl: "a daughter aged 10-18",
};

// Basic information from onboarding (never her name). Only known values are kept.
function profileLine(raw: unknown) {
  const p = (raw && typeof raw === "object" ? raw : {}) as Record<
    string,
    unknown
  >;
  const parts: string[] = [];
  const taluka =
    typeof p.taluka === "string" ? TALUKA_NAMES[p.taluka] : undefined;
  if (taluka) parts.push(`lives in ${taluka} taluka, Raigad`);
  if (p.stage === "pregnant") {
    const m = Number(p.month);
    parts.push(m >= 1 && m <= 9 ? `is pregnant (month ${m})` : "is pregnant");
  } else if (p.stage === "breastfeeding") parts.push("is breastfeeding");
  const kids = Array.isArray(p.children)
    ? p.children.map((c) => CHILD_TEXT[String(c)]).filter(Boolean)
    : [];
  if (kids.length) parts.push(`has ${kids.join(", ")} at home`);
  return parts.length
    ? `About the user: she ${parts.join("; ")}. Use this only when it matters (schemes, health, nutrition, nearest office); do not repeat it back to her.`
    : "";
}

function rulesPrompt(
  al: Lang,
  age: AgeGroup | null,
  grounding: string,
  about = "",
) {
  return `You are AADHI TI AI ("आधी ती"), a women's information and support assistant for rural and small-town Maharashtra, India. Pilot area: Shrivardhan taluka, Raigad district. User age band: ${age ? AGE_BAND[age] : "unknown"}. ${about}
Understand Marathi, Hindi, English and mixed or romanized text (for example "Mala business start karaycha aahe"). Reply in ${LANG_NAME[al]}.
Build every reply in this order. 1. UNDERSTAND: one short sentence that shows you understood her need. 2. ANSWER: 2-4 short plain points. 3. SAFETY CHECK: one question, only if danger, injury, threat or a minor might be involved. 4. NEXT STEP: one immediate action. 5. CONNECT: helplines or services from the list. 6. SOURCE.
About the app: AADHI TI is an initiative of Hon'ble Minister Ms. Aditi Tai Tatkare, Cabinet Minister in the Government of Maharashtra, Minister of Women & Child Development, and MLA for Shrivardhan (built as a prototype by Brahmaastra.ai); her initiatives include Majhi Ladki Bahin, Adishakti Abhiyan, the Single Women Policy (being drafted) and child-marriage-free Maharashtra. If asked about her, share only this; do not discuss politics, parties, elections or controversies, and never speak for her.
Never diagnose or prescribe. Never give final legal advice or predict outcomes. Never pretend to be police or a government officer. Never invent a scheme, benefit, amount, deadline or phone number: use only KNOWLEDGE below; if something is not covered, say what to confirm and where (Anganwadi sevika, Setu/Aaple Sarkar centre, Tahsil office). If a scheme is marked "needs confirmation", say so. No victim blaming. If the user is 13-17, use age-appropriate words, encourage telling a trusted adult and include 1098.
Risk: P0 = immediate danger (violence now, weapon, abduction, self-harm intent): reply in 2 short lines pointing to 112. P1 = abuse, threats, stalking, sexual violence, child safety. P2 = harassment, control, distress. P3 = information.
Style: write the way a trained community worker (ASHA, Anganwadi sevika or SHG coordinator) talks to a woman in her village. Use plain, short sentences and everyday spoken words, not formal or textbook language. In Marathi use तुम्ही; in Hindi use आप and feminine verb forms for her; in English speak to her as "you". Do not open with "Here's" or "Let's", and do not repeat her question back to her. Do not use em dashes, en dashes, arrows, emoji, headings, bullet symbols or markdown in any field.
Tone and quality: always respectful, warm and calm, like a trusted elder sister or ASHA tai. Never use abusive, vulgar, sexual or insulting words, slang or sarcasm, in any language, even if she does; if she is angry or uses such words, do not repeat them, stay kind, and help with what she needs. Never blame, shame, lecture or moralise. Give specific, practical advice she can act on today: name the actual helpline, office (Anganwadi, gram panchayat, Setu/Aaple Sarkar centre, PHC, Tahsil office, police station, One Stop Centre) and what to carry. Never suggest anything illegal or unsafe (no confronting an abuser alone, no revenge, no unverified medicines or home remedies for serious symptoms). For medical or legal questions, give general guidance and tell her who can confirm. If her message is unclear, give what help you can and put one short clarifying question in next_step. Write in simple everyday words in the same script she uses (Devanagari for Marathi and Hindi); common English words people use locally (PCOS, UPI, Aadhaar) are fine. Options must be natural follow-up questions she might ask, in her language.
Keep the whole reply under 110 words.
${grounding ? "REVIEWED CONTENT to base your answer on (rephrase, keep the facts):\n" + grounding + "\n" : ""}KNOWLEDGE:
${KNOWLEDGE}`;
}

const schema = {
  type: "OBJECT",
  properties: {
    intent: {
      type: "STRING",
      enum: ["LEARN", "CHECK", "FIND", "ACT", "CONNECT"],
    },
    risk: { type: "STRING", enum: ["P0", "P1", "P2", "P3"] },
    understand: { type: "STRING" },
    answer: { type: "ARRAY", items: { type: "STRING" } },
    safety_check: { type: "STRING", description: "One question, or empty" },
    next_step: { type: "STRING" },
    options: {
      type: "ARRAY",
      items: { type: "STRING" },
      description: "Up to 3 short follow-up questions she might tap",
    },
    helplines: {
      type: "ARRAY",
      items: { type: "INTEGER" },
      description: "Numbers from HELPLINES that fit, or empty",
    },
    module: { type: "STRING", enum: MODULES },
    source: {
      type: "STRING",
      description: "Official source used, or general guidance",
    },
    verify: {
      type: "STRING",
      description: "One line on what to confirm, or empty",
    },
  },
  required: ["intent", "risk", "understand", "answer", "next_step"],
};

function grounding(topic: Topic, lang: Lang) {
  return JSON.stringify({
    understand: topic.understand[lang],
    answer: topic.answer.map((a) => a[lang]),
    next_step: topic.next[lang],
  });
}

async function callGemini(body: unknown, key: string, model: string) {
  return fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: { "x-goog-api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
}

const clip = (v: unknown, n: number) => String(v ?? "").slice(0, n);

export type AnswerInput = {
  message: string;
  uiLang: Lang;
  age: AgeGroup | null;
  history: ChatTurn[];
  profile?: unknown;
};

/** Cleans conversation memory coming from outside (last 6 turns, trimmed). */
export function cleanHistory(raw: unknown): ChatTurn[] {
  return Array.isArray(raw)
    ? (raw as ChatTurn[])
        .filter(
          (t) =>
            (t?.role === "user" || t?.role === "assistant") &&
            typeof t.text === "string",
        )
        .slice(-6)
        .map((t) => ({ role: t.role, text: t.text.slice(0, 600) }))
    : [];
}

/** Asks Gemini for a structured answer. Returns null if AI isn't configured or fails. */
export async function answerQuestion({
  message,
  uiLang,
  age,
  history,
  profile,
}: AnswerInput): Promise<AiAnswer | null> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;

  const al = detectLang(message, uiLang);
  const local = understand(message, age);
  const base = local.kind === "topic" ? local.topic : null;

  const body = {
    systemInstruction: {
      parts: [
        {
          text: rulesPrompt(
            al,
            age,
            base ? grounding(base, al) : "",
            profileLine(profile),
          ),
        },
      ],
    },
    contents: [
      ...history.map((t) => ({
        role: t.role === "user" ? "user" : "model",
        parts: [{ text: t.text }],
      })),
      { role: "user", parts: [{ text: message }] },
    ],
    generationConfig: {
      temperature: 0.35,
      maxOutputTokens: 1000,
      thinkingConfig: { thinkingBudget: 0 },
      responseMimeType: "application/json",
      responseSchema: schema,
    },
    // She needs to talk frankly about abuse and harassment; keep only the most harmful content blocked.
    safetySettings: [
      "HARM_CATEGORY_HARASSMENT",
      "HARM_CATEGORY_HATE_SPEECH",
      "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      "HARM_CATEGORY_DANGEROUS_CONTENT",
    ].map((category) => ({ category, threshold: "BLOCK_ONLY_HIGH" })),
  };

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  let res = await callGemini(body, key, model);
  if (!res.ok && res.status !== 400) res = await callGemini(body, key, model); // one retry for flaky errors
  if (!res.ok) {
    console.error(
      "Gemini failed",
      res.status,
      (await res.text()).slice(0, 300),
    );
    return null;
  }

  try {
    const data = await res.json();
    const d = JSON.parse(
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "",
    );
    const answer = (Array.isArray(d.answer) ? d.answer : [])
      .map((a: unknown) => clip(a, 300))
      .filter(Boolean)
      .slice(0, 5);
    if (!d.understand || answer.length === 0) throw new Error("incomplete");
    // Never send anything with abusive words; the caller falls back to reviewed content.
    const all = [
      d.understand,
      ...answer,
      d.safety_check,
      d.next_step,
      ...(Array.isArray(d.options) ? d.options : []),
    ].join(" ");
    if (hasAbuse(all)) throw new Error("blocked language");

    // Only numbers from our own helpline list; minors always get 1098.
    let hl = (Array.isArray(d.helplines) ? d.helplines : [])
      .map(Number)
      .filter((n: number) => HELPLINE_NUMBERS.includes(n));
    if (age === "girl" && !hl.includes(1098)) hl = [...hl, 1098];
    const risk = ["P0", "P1", "P2", "P3"].includes(d.risk)
      ? d.risk
      : base?.emergency
        ? "P1"
        : "P3";

    return {
      intent: ["LEARN", "CHECK", "FIND", "ACT", "CONNECT"].includes(d.intent)
        ? d.intent
        : "LEARN",
      risk,
      understand: clip(d.understand, 300),
      answer,
      safetyCheck: clip(d.safety_check, 200),
      nextStep: clip(d.next_step, 300),
      options: (Array.isArray(d.options) ? d.options : [])
        .map((o: unknown) => clip(o, 120))
        .filter(Boolean)
        .slice(0, 3),
      helplines: hl.slice(0, 4),
      module: MODULES.includes(d.module) ? d.module : "none",
      source: clip(d.source || "General guidance", 160),
      verify: clip(d.verify, 200),
      lang: al,
      topicId: base?.id ?? null,
    };
  } catch (e) {
    console.error(
      "Gemini response unusable",
      e instanceof Error ? e.message : "parse error",
    );
    return null;
  }
}
