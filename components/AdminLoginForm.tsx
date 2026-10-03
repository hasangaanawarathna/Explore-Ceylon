"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
    });
    const result = await response.json();
    setLoading(false);
    if (!response.ok) return setError(result.error || "Login failed.");
    router.replace("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mt-8 grid gap-5">
      <label className="grid gap-2 text-sm font-semibold text-slate-700">Email
        <input name="email" type="email" required autoComplete="username" className="h-12 rounded-xl border border-slate-300 px-4 font-normal outline-none focus:border-sky-500" />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">Password
        <input name="password" type="password" required autoComplete="current-password" className="h-12 rounded-xl border border-slate-300 px-4 font-normal outline-none focus:border-sky-500" />
      </label>
      {error && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
      <button disabled={loading} className="min-h-12 rounded-full bg-sky-600 px-5 font-semibold text-white disabled:opacity-60">{loading ? "Signing in..." : "Sign in"}</button>
    </form>
  );
}
