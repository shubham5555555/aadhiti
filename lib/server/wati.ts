// WATI (WhatsApp Business API) client. Docs: https://docs.wati.io
// Uses the v3 API (text + interactive buttons/lists) with a Bearer token.
import type { Menu } from "./waMenu";

const BASE = (
  process.env.WATI_API_URL || "https://live-mt-server.wati.io"
).replace(/\/+$/, "");
const MAX_WHATSAPP = 4000; // WhatsApp's limit is 4096 characters

export const watiConfigured = () => Boolean(process.env.WATI_API_TOKEN);

const authHeaders = () => ({
  // The dashboard sometimes shows the token with its "Bearer " prefix; accept either.
  Authorization: `Bearer ${(process.env.WATI_API_TOKEN ?? "").replace(/^Bearer\s+/i, "")}`,
  "Content-Type": "application/json",
  Accept: "application/json",
});

/** POSTs to a WATI v3 endpoint, retrying once on rate limits / server errors. Never logs content. */
async function post(path: string, payload: unknown): Promise<boolean> {
  if (!process.env.WATI_API_TOKEN) return false;
  const body = JSON.stringify(payload);
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch(`${BASE}${path}`, {
      method: "POST",
      headers: authHeaders(),
      body,
      cache: "no-store",
    });
    if (res.ok) return true;
    if (res.status !== 429 && res.status < 500) {
      console.error("WATI request failed", path, res.status);
      return false;
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
  console.error("WATI request failed after retry", path);
  return false;
}

/**
 * Sends a text message into an open conversation (within WhatsApp's 24-hour window).
 * `target` is a WATI conversationId, a phone number, or "channel:phone".
 */
export async function sendText(target: string, text: string): Promise<boolean> {
  return post("/api/ext/v3/conversations/messages/text", {
    target,
    text: text.slice(0, MAX_WHATSAPP),
  });
}

/** Sends WhatsApp reply buttons (max 3) or a list; returns false if WATI rejects it. */
export async function sendInteractive(
  target: string,
  menu: Menu,
): Promise<boolean> {
  if (menu.kind === "buttons") {
    return post("/api/ext/v3/conversations/messages/interactive", {
      target,
      type: "buttons",
      button_message: {
        body: menu.body.slice(0, 1024),
        footer: menu.footer?.slice(0, 60) || null,
        buttons: menu.buttons
          .slice(0, 3)
          .map((b) => ({ text: b.title.slice(0, 20) })),
      },
    });
  }
  return post("/api/ext/v3/conversations/messages/interactive", {
    target,
    type: "list",
    list_message: {
      header: menu.header?.slice(0, 60) || null,
      body: menu.body.slice(0, 1024),
      footer: menu.footer?.slice(0, 60) || null,
      button_text: menu.button.slice(0, 20),
      sections: menu.sections.map((s) => ({
        title: s.title.slice(0, 24),
        rows: s.rows
          .slice(0, 10)
          .map((r) => ({
            title: r.title.slice(0, 24),
            description: r.description?.slice(0, 72) || null,
          })),
      })),
    },
  });
}
