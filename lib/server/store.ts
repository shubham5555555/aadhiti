// Tiny key-value store for the WhatsApp bot: de-duplicating webhook retries, short chat memory and
// per-number rate limits. Uses Upstash Redis (REST) when configured — needed on Vercel, where memory
// isn't shared between requests — and falls back to process memory for local development.
// No dependency: Upstash's REST API takes a Redis command as a JSON array.

const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token =
  process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
export const hasRedis = Boolean(url && token);

async function redis<T = unknown>(
  command: (string | number)[],
): Promise<T | null> {
  const res = await fetch(url!, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`store ${res.status}`);
  const data = (await res.json()) as { result?: T };
  return data.result ?? null;
}

// ---- in-memory fallback (single process only) ----
const mem = new Map<string, { value: string; expires: number }>();
function memGet(key: string) {
  const hit = mem.get(key);
  if (!hit) return null;
  if (hit.expires < Date.now()) {
    mem.delete(key);
    return null;
  }
  return hit.value;
}
function memSet(key: string, value: string, ttlSec: number) {
  if (mem.size > 5000) mem.delete(mem.keys().next().value as string);
  mem.set(key, { value, expires: Date.now() + ttlSec * 1000 });
}

/** Sets the key only if it doesn't exist. Returns true the first time (used to drop duplicate webhooks). */
export async function setOnce(key: string, ttlSec: number): Promise<boolean> {
  if (hasRedis)
    return (await redis(["SET", key, "1", "EX", ttlSec, "NX"])) === "OK";
  if (memGet(key) !== null) return false;
  memSet(key, "1", ttlSec);
  return true;
}

export async function getJSON<T>(key: string): Promise<T | null> {
  const raw = hasRedis ? await redis<string>(["GET", key]) : memGet(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function setJSON(key: string, value: unknown, ttlSec: number) {
  const raw = JSON.stringify(value);
  if (hasRedis) await redis(["SET", key, raw, "EX", ttlSec]);
  else memSet(key, raw, ttlSec);
}

/** Counts events in a fixed window; returns the new count. */
export async function bump(key: string, windowSec: number): Promise<number> {
  if (hasRedis) {
    const n = Number(await redis(["INCR", key]));
    if (n === 1) await redis(["EXPIRE", key, windowSec]);
    return n;
  }
  const n = Number(memGet(key) ?? 0) + 1;
  const hit = mem.get(key);
  memSet(
    key,
    String(n),
    hit
      ? Math.max(1, Math.round((hit.expires - Date.now()) / 1000))
      : windowSec,
  );
  return n;
}

// ---- per-key lock: handle one message per chat at a time ----
// Without it, a slow reply (e.g. a voice note) can save its older state over a quicker one that came after.
const memLocks = new Map<string, Promise<unknown>>();

/** Runs fn while holding a lock for key (waits up to ~50s for an earlier message to finish). */
export async function withLock<T>(key: string, fn: () => Promise<T>): Promise<T> {
  if (!hasRedis) {
    const prev = memLocks.get(key) ?? Promise.resolve();
    const run = prev.catch(() => {}).then(fn);
    memLocks.set(key, run);
    try {
      return await run;
    } finally {
      if (memLocks.get(key) === run) memLocks.delete(key);
    }
  }
  const lockKey = `lock:${key}`;
  const me = `${Date.now()}-${Math.random()}`;
  const deadline = Date.now() + 50_000;
  // If Redis is unreachable, carry on without the lock rather than drop her message.
  let locked = false;
  try {
    while (!(locked = (await redis(["SET", lockKey, me, "PX", 60_000, "NX"])) === "OK") && Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, 400));
    }
  } catch {
    locked = false;
  }
  try {
    return await fn();
  } finally {
    if (locked) {
      try {
        if ((await redis<string>(["GET", lockKey])) === me) await redis(["DEL", lockKey]);
      } catch {}
    }
  }
}
