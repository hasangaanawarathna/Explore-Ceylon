import { NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import { ADMIN_SESSION_COOKIE, createAdminSession, passwordMatches } from "@/lib/server/admin-auth";

export async function POST(request: Request) {
  let credentials: { password?: unknown };
  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid login request." }, { status: 400 });
  }

  const password = typeof credentials.password === "string" ? credentials.password : "";

  try {
    if (!passwordMatches(password)) return NextResponse.json({ error: "Incorrect password" }, { status: 401 });

    let accessToken: string | undefined;
    let refreshToken: string | undefined;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    const supabaseAdminEmail = process.env.ADMIN_SUPABASE_EMAIL;
    const supabaseAdminPassword = process.env.ADMIN_SUPABASE_PASSWORD || password;
    if (supabaseUrl && supabaseKey) {
      if (!supabaseAdminEmail) throw new Error("ADMIN_SUPABASE_EMAIL is not configured.");
      const { data: supabaseAuth, error: supabaseError } = await createSupabaseClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      }).auth.signInWithPassword({ email: supabaseAdminEmail, password: supabaseAdminPassword });
      if (supabaseError || !supabaseAuth.session) {
        throw new Error(`Dashboard Supabase session could not be created: ${supabaseError?.message ?? "No session returned"}`);
      } else {
        accessToken = supabaseAuth.session.access_token;
        refreshToken = supabaseAuth.session.refresh_token;
      }
    }

    const session = await createAdminSession();
    const response = NextResponse.json({
      success: true,
      accessToken,
      refreshToken,
    });
    response.cookies.set(ADMIN_SESSION_COOKIE, session.value, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: session.maxAge,
      expires: session.expires,
    });
    return response;
  } catch (error) {
    console.error("Admin login configuration error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Admin data access is not configured." }, { status: 503 });
  }
}
