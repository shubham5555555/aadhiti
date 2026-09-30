// WATI (WhatsApp Business API) client. Docs: https://docs.wati.io
// Uses the v3 API: POST {base}/api/ext/v3/conversations/messages/text with a Bearer token.

const BASE = (process.env.WATI_API_URL || "https://live-mt-server.wati.io").replace(/\/+$/, "");
const MAX_WHATSAPP = 4000; // WhatsApp's limit is 4096 characters

export const watiConfigured = () => Boolean(process.env.WATI_API_TOKEN);

/**
 * Sends a text message into an open conversation (within WhatsApp's 24-hour window).
 * `target` is a WATI conversationId, a phone number, or "channel:phone".
 */
export async function sendText(target: string, text: string): Promise<boolean> {
  const tokenRaw = process.env.WATI_API_TOKEN;
  if (!tokenRaw) return false;
  // The dashboard sometimes shows the token with its "Bearer " prefix; accept either.
  const token = tokenRaw.replace(/^Bearer\s+/i, "");
  const body = JSON.stringify({ target, text: text.slice(0, MAX_WHATSAPP) });

  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch(`${BASE}/api/ext/v3/conversations/messages/text`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", Accept: "application/json" },
      body,
      cache: "no-store",
    });
    if (res.ok) return true;
    // Retry once on rate limits and server errors; never log message text or numbers.
    if (res.status !== 429 && res.status < 500) {
      console.error("WATI send failed", res.status);
      return false;
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
  console.error("WATI send failed after retry");
  return false;
}
