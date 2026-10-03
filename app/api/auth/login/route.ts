import { cookies } from "next/headers";

import { createSessionToken, sessionCookie } from "@/lib/server/auth";
import { cleanString, jsonError } from "@/lib/server/http";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const email = cleanString(body?.email, 200).toLowerCase();
  const password = cleanString(body?.password, 200);
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@exploreceylon.lk").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "ChangeMe123!";

  if (email !== adminEmail || password !== adminPassword) return jsonError("Invalid email or password.", 401);

  (await cookies()).set(sessionCookie.name, createSessionToken(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: request.headers.get("x-forwarded-proto") === "https:" || new URL(request.url).protocol === "https:",
    path: "/",
    maxAge: sessionCookie.maxAge,
  });
  return Response.json({ user: { email, role: "admin" } });
}
