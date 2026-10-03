import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "explore_ceylon_admin";
const maxAge = 60 * 60 * 8;

function secret() {
  return process.env.AUTH_SECRET || "development-only-change-this-secret";
}

function signature(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

export function createSessionToken(email: string) {
  const payload = Buffer.from(JSON.stringify({ email, expiresAt: Date.now() + maxAge * 1000 })).toString("base64url");
  return `${payload}.${signature(payload)}`;
}

export function verifySessionToken(token?: string) {
  if (!token) return null;
  const [payload, suppliedSignature] = token.split(".");
  if (!payload || !suppliedSignature) return null;
  const expected = signature(payload);
  if (expected.length !== suppliedSignature.length || !timingSafeEqual(Buffer.from(expected), Buffer.from(suppliedSignature))) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString()) as { email: string; expiresAt: number };
    return session.expiresAt > Date.now() ? session : null;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  return verifySessionToken((await cookies()).get(cookieName)?.value);
}

export async function requireAdmin() {
  return Boolean(await getAdminSession());
}

export const sessionCookie = { name: cookieName, maxAge };
