// Text-to-speech for the call bot, via ElevenLabs. The API key stays on the server.
import { rateLimited } from "@/lib/server/rateLimit";

const MAX_CHARS = 500;
const LANGS = new Set(["mr", "hi", "en"]);

// Call scripts repeat a lot, so keep recent audio in memory instead of paying for it again.
const cache = new Map<string, ArrayBuffer>();
const CACHE_LIMIT = 200;

// ElevenLabs allows only a few requests in parallel on this plan, so queue ours (max 2 at once).
const MAX_PARALLEL = 2;
let active = 0;
const waiting: (() => void)[] = [];
async function withSlot<T>(fn: () => Promise<T>): Promise<T> {
  if (active >= MAX_PARALLEL) await new Promise<void>((r) => waiting.push(r));
  active++;
  try {
    return await fn();
  } finally {
    active--;
    waiting.shift()?.();
  }
}

const num = (v: string | undefined, fallback: number) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

export async function POST(req: Request) {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key || !process.env.ELEVENLABS_VOICE_HI) return Response.json({ error: "Voice is not configured" }, { status: 503 });

  if (rateLimited(req, "tts", 40)) return Response.json({ error: "Too many requests" }, { status: 429 });

  let body: { text?: unknown; lang?: unknown; voice?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const text = typeof body.text === "string" ? body.text.trim() : "";
  const lang = typeof body.lang === "string" && LANGS.has(body.lang) ? body.lang : "hi";
  if (!text || text.length > MAX_CHARS) return Response.json({ error: "Text must be 1–500 characters" }, { status: 400 });

  // Female (default) or male caller. Falls back to the female voice if no male voice is set.
  const gender = body.voice === "male" && process.env.ELEVENLABS_VOICE_MALE ? "male" : "female";
  const voice = gender === "male" ? process.env.ELEVENLABS_VOICE_MALE : process.env.ELEVENLABS_VOICE_HI;

  const cacheKey = `${gender}:${lang}:${text}`;
  const hit = cache.get(cacheKey);
  if (hit) return audio(hit);

  const request = () =>
    fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_64`, {
      method: "POST",
      headers: { "xi-api-key": key, "Content-Type": "application/json", Accept: "audio/mpeg" },
      body: JSON.stringify({
        text,
        model_id: process.env.ELEVENLABS_MODEL || "eleven_v3",
        language_code: lang,
        voice_settings: {
          stability: num(process.env.ELEVENLABS_STABILITY, 0.4),
          similarity_boost: 0.75,
          style: num(process.env.ELEVENLABS_STYLE, 0.4),
          use_speaker_boost: true,
          speed: num(process.env.ELEVENLABS_SPEED, 0.97),
        },
      }),
    });

  let res = await withSlot(request);
  for (let attempt = 1; res.status === 429 && attempt <= 2; attempt++) {
    // Still busy (e.g. another tab): wait a moment and try again.
    await new Promise((r) => setTimeout(r, 1200 * attempt));
    res = await withSlot(request);
  }

  if (!res.ok) {
    // Don't leak provider details to the browser; the client falls back to the device voice.
    console.error("ElevenLabs TTS failed", res.status, (await res.text()).slice(0, 300));
    return Response.json({ error: "Voice unavailable" }, { status: 502 });
  }

  const buf = await res.arrayBuffer();
  if (cache.size >= CACHE_LIMIT) cache.delete(cache.keys().next().value as string);
  cache.set(cacheKey, buf);
  return audio(buf);
}

function audio(buf: ArrayBuffer) {
  return new Response(buf, { headers: { "Content-Type": "audio/mpeg", "Cache-Control": "private, max-age=86400" } });
}
