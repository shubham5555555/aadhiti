// Shared types for the AADHI TI knowledge base.

export type Lang = "mr" | "en" | "hi";

/** Localised string — every user-facing text exists in Marathi, English and Hindi. */
export type L = { mr: string; en: string; hi: string };

/** "girl" = 10–18. The others are adult life stages from the spec (18+, 30+, 40+, 50+). */
export type AgeGroup = "girl" | "18" | "30" | "40" | "50";

/** The five user intents from the spec. */
export type Intent = "learn" | "check" | "find" | "act" | "connect";

/**
 * A next-step button. href is one of:
 *  - "tel:<number>"  (only numbers from HELPLINES below)
 *  - an internal route: "/call", "/call?mode=fake", "/everyday", "/schemes", "/schemes#<id>", "/awareness", "/safe-shrivardhan"
 *  - "https://cybercrime.gov.in" (the only external URL allowed)
 */
export type Action = { label: L; href: string };

export type Topic = {
  /** snake_case, unique across the whole knowledge base */
  id: string;
  intent: Intent;
  /** Short chip label (2–6 words) */
  title: L;
  /**
   * Lowercase match keywords in all three languages, including everyday phrasing a woman might
   * type without knowing the "correct" term (e.g. "नवरा फोन तपासतो", "phone check").
   * Include Devanagari (Marathi + Hindi) and romanised forms ("pati maarta hai").
   */
  keywords: string[];
  /** UNDERSTAND — 1–2 sentences naming what this situation may be, warm and non-judgemental. */
  understand: L;
  /** ANSWER — 3–5 short practical points. */
  answer: L[];
  /** NEXT STEP — one sentence, ideally a question or a clear action. */
  next: L;
  actions?: Action[];
  /** Adds a limitations notice in the UI: not a doctor / lawyer / counsellor / police. */
  sensitive?: "medical" | "legal" | "crisis" | "child";
  /** True when the user may be in immediate danger — UI shows a red emergency card first. */
  emergency?: boolean;
  /** Restrict to these age groups. Omit = everyone. */
  ages?: AgeGroup[];
  /** Extra line shown only to girls (10–18), e.g. "Tell a trusted adult. Call 1098." */
  girlNote?: L;
};

/** Numbers that may appear in answers and tel: actions. Do not use any other number. */
export const HELPLINES = {
  emergency: "112",
  women: "1091",
  womenOneStop: "181",
  cyber: "1930",
  child: "1098",
  mentalHealth: "14416", // Tele-MANAS
  ambulance: "108",
  maternalAmbulance: "102",
  legalAid: "15100", // NALSA
  ncwWhatsapp: "7827170170",
} as const;
