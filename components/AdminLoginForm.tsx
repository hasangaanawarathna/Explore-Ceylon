"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { clearAdminSessionStarted, markAdminSessionStarted } from "@/lib/supabase/admin-session";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    try {
      const supabase = createClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError || !data.user) {
        setError("Invalid email address or password.");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("admin_profiles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("is_active", true)
        .maybeSingle();
      if (profileError || !profile) {
        await supabase.auth.signOut();
        clearAdminSessionStarted();
        setError("This account does not have active administrator access.");
        return;
      }

      markAdminSessionStarted();
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-8 grid gap-5">
      <label className="grid gap-2 text-sm font-semibold text-slate-700">Email address
        <input name="email" type="email" required autoComplete="email" inputMode="email" className="h-12 rounded-xl border border-slate-300 px-4 font-normal outline-none focus:border-sky-500" />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">Password
        <input name="password" type="password" required autoComplete="current-password" className="h-12 rounded-xl border border-slate-300 px-4 font-normal outline-none focus:border-sky-500" />
      </label>
      {error && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
      <button disabled={loading} className="min-h-12 rounded-full bg-sky-600 px-5 font-semibold text-white disabled:opacity-60">{loading ? "Signing in..." : "Sign in"}</button>
    </form>
  );
}
