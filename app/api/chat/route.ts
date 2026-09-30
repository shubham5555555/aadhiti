// AI answers for the website chat. The engine lives in lib/server/answer.ts (shared with WhatsApp).
import type { AgeGroup, Lang } from "@/lib/kb";
import { rateLimited } from "@/lib/server/rateLimit";
import { AGES, MAX_CHARS, answerQuestion, cleanHistory } from "@/lib/server/answer";

export async function POST(req: Request) {
  if (!process.env.GEMINI_API_KEY) return Response.json({ error: "AI is not configured" }, { status: 503 });
  if (rateLimited(req, "chat", 20)) return Response.json({ error: "Too many requests" }, { status: 429 });

  let input: { message?: unknown; lang?: unknown; age?: unknown; history?: unknown; profile?: unknown };
  try {
    input = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const message = typeof input.message === "string" ? input.message.trim() : "";
  const uiLang: Lang = input.lang === "en" || input.lang === "hi" ? input.lang : "mr";
  const age = AGES.includes(input.age as AgeGroup) ? (input.age as AgeGroup) : null;
  if (!message || message.length > MAX_CHARS) return Response.json({ error: "Message must be 1–800 characters" }, { status: 400 });

  const out = await answerQuestion({ message, uiLang, age, history: cleanHistory(input.history), profile: input.profile });
  return out ? Response.json(out) : Response.json({ error: "AI unavailable" }, { status: 502 });
}
