import { cookies } from "next/headers";

import { createSessionToken, sessionCookie, verifyAdminCredentials } from "@/lib/server/auth";
import { cleanString, enforceRateLimit, jsonError, readJsonObject } from "@/lib/server/http";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient as createSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const limited = enforceRateLimit(request, "admin-login", 5, 15 * 60 * 1000);
  if (limited) return limited;
  const body = await readJsonObject(request, 4_096);
  if (!body) return jsonError("Invalid request body.");
  const email = cleanString(body?.email, 200).toLowerCase();
  const password = cleanString(body?.password, 200);
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) return jsonError("Invalid email or password.", 401);
    const { data: profile } = await supabase.from("admin_profiles").select("role, is_active").eq("user_id", data.user.id).eq("is_active", true).maybeSingle();
    if (!profile) {
      await supabase.auth.signOut();
      return jsonError("This account is not authorized for administration.", 403);
    }
    return Response.json({ user: { email: data.user.email, role: profile.role } });
  }
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
