// Text-to-speech via ElevenLabs, shared by the call bot (/api/tts) and WhatsApp voice replies.
// The API key stays on the server.
import type { Lang } from "@/lib/kb";

export const TTS_MAX_CHARS = 500;
export type VoiceGender = "female" | "male";

export const ttsConfigured = () =>
  Boolean(process.env.ELEVENLABS_API_KEY);

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

/** Returns MP3 audio for the text, or null if voice isn't configured or ElevenLabs fails. */
export async function synthesize(
  text: string,
  lang: Lang,
  gender: VoiceGender = "female",
): Promise<ArrayBuffer | null> {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) return null;
  const said = text.trim().slice(0, TTS_MAX_CHARS);
  if (!said) return null;

  // Female (default) or male voice. Falls back to the female voice if no male voice is set.
  const g =
    gender === "male" && process.env.ELEVENLABS_VOICE_MALE ? "male" : "female";
  const voice = g === "male"
    ? process.env.ELEVENLABS_VOICE_MALE
    : process.env.ELEVENLABS_VOICE_DEFAULT || "2K3jPCTBDyFFo3BVyBpG";

  const cacheKey = `${voice}:${lang}:${said}`;
  const hit = cache.get(cacheKey);
  if (hit) return hit;

  const request = () =>
    fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_64`,
      {
        method: "POST",
        headers: {
          "xi-api-key": key,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text: said,
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
      },
    );

  let res = await withSlot(request);
  for (let attempt = 1; res.status === 429 && attempt <= 2; attempt++) {
    // Still busy (e.g. another request): wait a moment and try again.
    await new Promise((r) => setTimeout(r, 1200 * attempt));
    res = await withSlot(request);
  }
  if (!res.ok) {
    console.error(
      "ElevenLabs TTS failed",
      res.status,
      (await res.text()).slice(0, 300),
    );
    return null;
  }

  const buf = await res.arrayBuffer();
  if (cache.size >= CACHE_LIMIT)
    cache.delete(cache.keys().next().value as string);
  cache.set(cacheKey, buf);
  return buf;
}
