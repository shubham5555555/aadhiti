// Shape of an AI answer returned by /api/chat (shared by the route and the chat UI).
// Mirrors the AADHI TI prototype's reply order: understand → answer → safety check → next step → connect → source.
import type { Risk } from "./safetyScripts";

export type AiModule = "scheme" | "income" | "health" | "wellbeing" | "safety" | "none";

export type AiAnswer = {
  intent: "LEARN" | "CHECK" | "FIND" | "ACT" | "CONNECT";
  risk: Risk;
  understand: string;
  answer: string[];
  /** One safety question, or "" when no danger is involved. */
  safetyCheck: string;
  nextStep: string;
  /** Up to 3 short follow-up questions she might tap. */
  options: string[];
  helplines: number[];
  module: AiModule;
  source: string;
  /** What to confirm and where, or "". */
  verify: string;
  /** Language the answer is written in. */
  lang: "mr" | "hi" | "en";
  /** A written knowledge-base topic this answer was grounded in, for its action buttons. */
  topicId: string | null;
};

/** One earlier turn, for conversation memory. */
export type ChatTurn = { role: "user" | "assistant"; text: string };
