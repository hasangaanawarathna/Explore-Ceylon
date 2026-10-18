"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch(`${basePath}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: String(form.get("password")) }),
      });
      const result = (await response.json()) as { error?: string; accessToken?: string; refreshToken?: string };
      if (!response.ok) return setError(result.error ?? "Unable to sign in.");
      if (result.accessToken && result.refreshToken) {
        const { error: sessionError } = await createClient().auth.setSession({
          access_token: result.accessToken,
          refresh_token: result.refreshToken,
        });
        if (sessionError) {
          await fetch(`${basePath}/api/admin/logout`, { method: "POST" });
          return setError("Unable to start the dashboard session.");
        }
      }
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
      <label className="grid gap-2 text-sm font-semibold text-slate-700">Password
        <input name="password" type="password" required autoComplete="current-password" className="h-12 rounded-xl border border-slate-300 px-4 font-normal outline-none focus:border-sky-500" />
      </label>
      {error && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
      <button disabled={loading} className="min-h-12 rounded-full bg-sky-600 px-5 font-semibold text-white disabled:opacity-60">{loading ? "Signing in..." : "Sign in"}</button>
    </form>
  );
}
