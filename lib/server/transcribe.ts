// Turns a WhatsApp voice note into text with Gemini (audio understanding), so it can be answered
// exactly like a typed message. Nothing is stored.

const PROMPT =
  "Transcribe this voice message exactly as spoken. It is most likely Marathi, Hindi or English, or a mix, " +
  "from a woman in rural Maharashtra. Write Marathi and Hindi in Devanagari script and English in Latin script. " +
  "Do not translate, summarise, answer or add anything. If there is no clear speech, reply with exactly: [unclear]";

/** Returns the spoken text, or null if it can't be understood or Gemini fails. */
export async function transcribe(
  audio: ArrayBuffer,
  mimeType: string,
): Promise<string | null> {
  const key = process.env.GEMINI_API_KEY;
  if (!key || audio.byteLength === 0 || audio.byteLength > 15 * 1024 * 1024)
    return null;

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      signal: AbortSignal.timeout(25_000),
      headers: { "x-goog-api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                inlineData: {
                  mimeType: mimeType.split(";")[0] || "audio/ogg",
                  data: Buffer.from(audio).toString("base64"),
                },
              },
              { text: PROMPT },
            ],
          },
        ],
        generationConfig: {
          temperature: 0,
          maxOutputTokens: 600,
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    },
  );
  if (!res.ok) {
    console.error("Gemini transcription failed", res.status);
    return null;
  }
  const data = await res.json();
  const text = String(
    data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "",
  ).trim();
  if (!text || /^\[?unclear\]?$/i.test(text)) return null;
  return text.slice(0, 800);
}
