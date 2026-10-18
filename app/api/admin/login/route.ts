import { NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import { ADMIN_SESSION_COOKIE, createAdminSession, isValidEmail, passwordMatches } from "@/lib/server/admin-auth";
import { sendAdminLoginNotification } from "@/lib/server/admin-login-email";

export async function POST(request: Request) {
  let credentials: { email?: unknown; password?: unknown };
  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid login request." }, { status: 400 });
  }

  const email = typeof credentials.email === "string" ? credentials.email.trim().toLowerCase() : "";
  const password = typeof credentials.password === "string" ? credentials.password : "";
  if (!isValidEmail(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });

  try {
    if (!passwordMatches(password)) return NextResponse.json({ error: "Incorrect password." }, { status: 401 });

    let accessToken: string | undefined;
    let refreshToken: string | undefined;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    const supabaseAdminEmail = process.env.ADMIN_SUPABASE_EMAIL;
    if (supabaseUrl && supabaseKey && supabaseAdminEmail) {
      const { data: supabaseAuth, error: supabaseError } = await createSupabaseClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      }).auth.signInWithPassword({ email: supabaseAdminEmail, password });
      if (supabaseError || !supabaseAuth.session) {
        console.error("Dashboard Supabase session could not be created:", supabaseError?.message ?? "No session returned");
      } else {
        accessToken = supabaseAuth.session.access_token;
        refreshToken = supabaseAuth.session.refresh_token;
      }
    }

    const session = await createAdminSession(email);
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
    });

    try {
      await sendAdminLoginNotification(email);
    } catch (error) {
      console.error("Admin login notification delivery failed:", error instanceof Error ? error.message : "Unknown error");
    }
    return response;
  } catch (error) {
    console.error("Admin login configuration error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Admin login is not configured." }, { status: 500 });
  }
}
