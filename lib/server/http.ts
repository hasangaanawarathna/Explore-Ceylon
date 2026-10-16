export function jsonError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

export function cleanString(value: unknown, maximum = 2000) {
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidTravelDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) return false;

  const todayParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Colombo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    todayParts.find((item) => item.type === type)?.value ?? "";
  const today = `${part("year")}-${part("month")}-${part("day")}`;
  return value >= today;
}

type RateLimitEntry = { count: number; resetsAt: number };
const rateLimits = new Map<string, RateLimitEntry>();

export function enforceRateLimit(
  request: Request,
  scope: string,
  limit: number,
  windowMilliseconds: number,
) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const client = forwardedFor || request.headers.get("x-real-ip") || "unknown";
  const key = `${scope}:${client}`;
  const now = Date.now();
  const current = rateLimits.get(key);

  if (!current || current.resetsAt <= now) {
    rateLimits.set(key, { count: 1, resetsAt: now + windowMilliseconds });
    return null;
  }

  current.count += 1;
  if (current.count <= limit) return null;

  const retryAfter = Math.max(1, Math.ceil((current.resetsAt - now) / 1000));
  return Response.json(
    { error: "Too many requests. Please try again later." },
    { status: 429, headers: { "Retry-After": String(retryAfter) } },
  );
}

export async function readJsonObject(request: Request, maximumBytes = 16_384) {
  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > maximumBytes) return null;

  const text = await request.text().catch(() => "");
  if (!text || Buffer.byteLength(text, "utf8") > maximumBytes) return null;

  try {
    const value: unknown = JSON.parse(text);
    return typeof value === "object" && value !== null && !Array.isArray(value)
      ? value as Record<string, unknown>
      : null;
  } catch {
    return null;
  }
}
