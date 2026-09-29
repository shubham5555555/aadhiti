// Tiny in-memory, per-IP rate limiter for the API routes (protects the paid API keys).
// Resets when the server restarts — fine for a single-instance demo.

const hits = new Map<string, number[]>();

export function rateLimited(req: Request, bucket: string, limit: number, windowMs = 60_000): boolean {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "local";
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}
