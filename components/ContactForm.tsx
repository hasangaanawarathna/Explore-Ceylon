"use client";

import { FormEvent, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { publicId } from "@/lib/supabase/repository";

export function ContactForm() {
  const [state, setState] = useState<{ loading: boolean; error: string; success: string }>({ loading: false, error: "", success: "" });
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setState({ loading: true, error: "", success: "" });
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    try {
      const { error } = await createClient().from("enquiries").insert({ id: publicId("ENQ"), name: String(values.name).trim(), email: String(values.email).trim().toLowerCase(), phone: String(values.phone ?? "").trim() || null, subject: String(values.subject).trim(), message: String(values.message).trim(), status: "new" });
      if (error) throw error;
      form.reset();
      setState({ loading: false, error: "", success: "Your enquiry has been received." });
    } catch {
      setState({ loading: false, error: "Could not send your enquiry. Check your connection and form details, then try again.", success: "" });
    } finally {
      submitting.current = false;
    }
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50 sm:rounded-[2rem] sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-700">Full name<input name="name" autoComplete="name" required maxLength={120} className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-base outline-none focus:border-sky-400 focus:bg-white sm:rounded-2xl sm:text-sm" /></label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">Email address<input name="email" required type="email" inputMode="email" autoComplete="email" maxLength={200} className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-base outline-none focus:border-sky-400 focus:bg-white sm:rounded-2xl sm:text-sm" /></label>
      </div>
      <label className="mt-5 grid gap-2 text-sm font-medium text-slate-700">Phone (optional)<input name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={50} pattern="[+0-9() .-]{7,50}" title="Enter a valid phone number using digits and common phone symbols." className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-base outline-none focus:border-sky-400 focus:bg-white sm:rounded-2xl sm:text-sm" /></label>
      <label className="mt-5 grid gap-2 text-sm font-medium text-slate-700">Subject<input name="subject" required maxLength={200} className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-base outline-none focus:border-sky-400 focus:bg-white sm:rounded-2xl sm:text-sm" /></label>
      <label className="mt-5 grid gap-2 text-sm font-medium text-slate-700">Message<textarea name="message" required minLength={10} maxLength={4000} className="min-h-40 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base outline-none focus:border-sky-400 focus:bg-white sm:rounded-3xl sm:text-sm" /></label>
      {state.error && <p role="alert" className="mt-5 rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{state.error}</p>}
      {state.success && <p role="status" className="mt-5 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{state.success}</p>}
      <button type="submit" disabled={state.loading} aria-busy={state.loading} className="mt-6 min-h-11 w-full rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-60">{state.loading ? "Sending..." : "Send enquiry"}</button>
    </form>
  );
}
