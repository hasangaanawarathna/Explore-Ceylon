export function jsonError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

export function cleanString(value: unknown, maximum = 2000) {
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
