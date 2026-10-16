import { cookies } from "next/headers";

import { createSessionToken, sessionCookie, verifyAdminCredentials } from "@/lib/server/auth";
import { cleanString, enforceRateLimit, jsonError, readJsonObject } from "@/lib/server/http";

export async function POST(request: Request) {
  const limited = enforceRateLimit(request, "admin-login", 5, 15 * 60 * 1000);
  if (limited) return limited;
  const body = await readJsonObject(request, 4_096);
  if (!body) return jsonError("Invalid request body.");
  const email = cleanString(body?.email, 200).toLowerCase();
  const password = cleanString(body?.password, 200);
  if (!verifyAdminCredentials(email, password)) return jsonError("Invalid email or password.", 401);

  (await cookies()).set(sessionCookie.name, createSessionToken(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: request.headers.get("x-forwarded-proto") === "https:" || new URL(request.url).protocol === "https:",
    path: "/",
    maxAge: sessionCookie.maxAge,
  });
  return Response.json({ user: { email, role: "admin" } });
}
