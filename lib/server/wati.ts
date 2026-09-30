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

/** Calls a WATI v3 endpoint, retrying once on rate limits / server errors. Never logs content. */
async function request(
  method: "POST" | "PUT",
  path: string,
  payload: unknown,
): Promise<boolean> {
  if (!process.env.WATI_API_TOKEN) return false;
  const body = JSON.stringify(payload);
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch(`${BASE}${path}`, {
      method,
      headers: authHeaders(),
      body,
      cache: "no-store",
    });
    if (res.ok) return true;
    if (res.status !== 429 && res.status < 500) {
      console.error(
        "WATI request failed",
        path.replace(/\/conversations\/[^/]+\//, "/conversations/…/"),
        res.status,
      );
      return false;
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
  console.error("WATI request failed after retry");
  return false;
}
const post = (path: string, payload: unknown) => request("POST", path, payload);

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
        rows: s.rows.slice(0, 10).map((r) => ({
          title: r.title.slice(0, 24),
          description: r.description?.slice(0, 72) || null,
        })),
      })),
    },
  });
}

/** Downloads a media file (e.g. her voice note). Tries WATI's message id, then WhatsApp's. */
export async function getMedia(
  ids: (string | undefined)[],
): Promise<{ data: ArrayBuffer; type: string } | null> {
  if (!process.env.WATI_API_TOKEN) return null;
  for (const id of ids.filter(Boolean) as string[]) {
    const res = await fetch(
      `${BASE}/api/ext/v3/conversations/messages/file/${encodeURIComponent(id)}`,
      {
        headers: { ...authHeaders(), Accept: "application/octet-stream" },
        cache: "no-store",
      },
    );
    if (res.ok) {
      const type = res.headers.get("content-type") ?? "audio/ogg";
      if (type.includes("json")) continue; // an error envelope, not the file
      return { data: await res.arrayBuffer(), type };
    }
  }
  console.error("WATI media download failed");
  return null;
}

/** Uploads and sends a file (used for voice replies). */
export async function sendFile(
  target: string,
  data: ArrayBuffer,
  fileName: string,
  mime: string,
  caption?: string,
): Promise<boolean> {
  if (!process.env.WATI_API_TOKEN) return false;
  const form = new FormData();
  form.append("target", target);
  form.append("file", new Blob([data], { type: mime }), fileName);
  if (caption) form.append("caption", caption.slice(0, 1000));
  const { Authorization } = authHeaders();
  const res = await fetch(`${BASE}/api/ext/v3/conversations/messages/file`, {
    method: "POST",
    headers: { Authorization },
    body: form,
    cache: "no-store",
  });
  if (!res.ok) console.error("WATI file send failed", res.status);
  return res.ok;
}

/** Hands the conversation to a person in WATI's Team Inbox (operator by email and/or a team). */
export async function handToHuman(
  conversation: string,
  phone: string,
): Promise<boolean> {
  const email = process.env.WATI_HANDOFF_EMAIL;
  const team = process.env.WATI_HANDOFF_TEAM;
  if (!email && !team) return false;
  const results = await Promise.all([
    email
      ? request(
          "PUT",
          `/api/ext/v3/conversations/${encodeURIComponent(conversation)}/operator`,
          { assignee_email: email },
        )
      : Promise.resolve(false),
    team
      ? request("PUT", "/api/ext/v3/contacts/teams", {
          target: phone,
          teams: [team],
        })
      : Promise.resolve(false),
    request(
      "PUT",
      `/api/ext/v3/conversations/${encodeURIComponent(conversation)}/status`,
      { new_status: "open" },
    ),
  ]);
  return results[0] || results[1];
}

export const handoffConfigured = () =>
  Boolean(process.env.WATI_HANDOFF_EMAIL || process.env.WATI_HANDOFF_TEAM);

/** Sends a file (e.g. a photo) from a public URL, with an optional caption. */
export async function sendFileUrl(
  target: string,
  fileUrl: string,
  caption?: string,
): Promise<boolean> {
  return post("/api/ext/v3/conversations/messages/fileViaUrl", {
    target,
    file_url: fileUrl,
    caption: caption?.slice(0, 1000) || null,
  });
}
