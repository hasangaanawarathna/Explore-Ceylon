import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient as createSupabaseClient } from "@/lib/supabase/server";

const cookieName = "explore_ceylon_admin";
const maxAge = 60 * 60 * 8;

const developmentCredentials = {
  email: "admin@exploreceylon.lk",
  password: "ChangeMe123!",
  secret: "development-only-change-this-secret",
};

function configuredValue(name: "ADMIN_EMAIL" | "ADMIN_PASSWORD" | "AUTH_SECRET") {
  const value = process.env[name]?.trim();
  if (value) return value;

  if (process.env.NODE_ENV === "production") {
    throw new Error(`${name} must be configured in production.`);
  }

  return name === "ADMIN_EMAIL"
    ? developmentCredentials.email
    : name === "ADMIN_PASSWORD"
      ? developmentCredentials.password
      : developmentCredentials.secret;
}

function secret() {
  const value = configuredValue("AUTH_SECRET");
  if (process.env.NODE_ENV === "production" && value.length < 32) {
    throw new Error("AUTH_SECRET must contain at least 32 characters in production.");
  }
  return value;
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function verifyAdminCredentials(email: string, password: string) {
  const configuredEmail = configuredValue("ADMIN_EMAIL").toLowerCase();
  const configuredPassword = configuredValue("ADMIN_PASSWORD");

  if (process.env.NODE_ENV === "production" && configuredPassword.length < 12) {
    throw new Error("ADMIN_PASSWORD must contain at least 12 characters in production.");
  }

  return safeEqual(email, configuredEmail) && safeEqual(password, configuredPassword);
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
  if (!safeEqual(expected, suppliedSignature)) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString()) as { email: string; expiresAt: number };
    return session.expiresAt > Date.now() ? session : null;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    const { data: profile } = await supabase
      .from("admin_profiles")
      .select("user_id, role, is_active")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .maybeSingle();
    return profile ? { email: user.email ?? "", expiresAt: 0, userId: user.id, role: profile.role } : null;
  }
  return verifySessionToken((await cookies()).get(cookieName)?.value);
}

export async function requireAdmin() {
  return Boolean(await getAdminSession());
}

export const sessionCookie = { name: cookieName, maxAge };
