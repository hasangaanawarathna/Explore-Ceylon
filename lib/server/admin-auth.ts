import "server-only";
import { timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "explore_ceylon_admin";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 30;

type SessionPayload = { expiresAt: number };

function toBase64Url(value: string | ArrayBuffer) {
  const bytes = typeof value === "string" ? new TextEncoder().encode(value) : new Uint8Array(value);
  return Buffer.from(bytes).toString("base64url");
}

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured.");
  return secret;
}

async function sign(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return toBase64Url(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value)));
}

export async function createAdminSession() {
  const expires = new Date(Date.now() + SESSION_DURATION_SECONDS * 1000);
  const payload = toBase64Url(JSON.stringify({
    expiresAt: expires.getTime(),
  } satisfies SessionPayload));
  return { value: `${payload}.${await sign(payload)}`, maxAge: SESSION_DURATION_SECONDS, expires };
}

export async function verifyAdminSession(token?: string): Promise<SessionPayload | null> {
  if (!token) return null;
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) return null;

  const expected = await sign(payload);
  const suppliedBytes = Buffer.from(signature);
  const expectedBytes = Buffer.from(expected);
  if (suppliedBytes.length !== expectedBytes.length || !timingSafeEqual(suppliedBytes, expectedBytes)) return null;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as SessionPayload;
    return typeof session.expiresAt === "number" && session.expiresAt > Date.now() ? session : null;
  } catch {
    return null;
  }
}

export function passwordMatches(candidate: string) {
  const configured = process.env.ADMIN_PASSWORD;
  if (!configured) throw new Error("ADMIN_PASSWORD is not configured.");
  const candidateBytes = Buffer.from(candidate);
  const configuredBytes = Buffer.from(configured);
  return candidateBytes.length === configuredBytes.length && timingSafeEqual(candidateBytes, configuredBytes);
}
