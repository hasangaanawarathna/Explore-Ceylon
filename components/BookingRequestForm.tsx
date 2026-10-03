"use client";

import { FormEvent, useState } from "react";
import type { Destination } from "@/types";

export function BookingRequestForm({ destinations }: { destinations: Destination[] }) {
  const [state, setState] = useState({ loading: false, error: "", success: "" });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ loading: true, error: "", success: "" });
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const response = await fetch("/api/bookings", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(values) });
    const result = await response.json();
    if (!response.ok) return setState({ loading: false, error: result.error || "Could not submit this booking.", success: "" });
    form.reset();
    setState({ loading: false, error: "", success: result.message });
  }

  const field = "h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-base outline-none focus:border-sky-400 focus:bg-white sm:text-sm";
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50 sm:rounded-[2rem] sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Booking request</p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-950">Send your trip details</h2>
      <form onSubmit={submit} className="mt-7 grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">Full name<input name="name" required className={field} /></label>
        <label className="grid gap-2 text-sm font-medium">Email<input name="email" type="email" required className={field} /></label>
        <label className="grid gap-2 text-sm font-medium">Phone<input name="phone" required className={field} /></label>
        <label className="grid gap-2 text-sm font-medium">Destination<select name="destination" required className={field}>{destinations.map((item) => <option key={item.slug}>{item.name}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-medium">Start point<input name="startPoint" required placeholder="Airport, hotel, or town" className={field} /></label>
        <label className="grid gap-2 text-sm font-medium">Finish point<input name="finishPoint" required placeholder="Final town or hotel" className={field} /></label>
        <label className="grid gap-2 text-sm font-medium">Travel date<input name="travelDate" type="date" required min={new Date().toISOString().slice(0, 10)} className={field} /></label>
        <label className="grid gap-2 text-sm font-medium">Guests<input name="guests" type="number" required min="1" max="100" defaultValue="2" className={field} /></label>
        <label className="grid gap-2 text-sm font-medium md:col-span-2">Notes<textarea name="notes" maxLength={2000} rows={4} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-400 focus:bg-white" /></label>
        {state.error && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700 md:col-span-2">{state.error}</p>}
        {state.success && <p role="status" className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700 md:col-span-2">{state.success}</p>}
        <button disabled={state.loading} className="min-h-12 rounded-full bg-sky-600 px-5 font-semibold text-white disabled:opacity-60 md:col-span-2">{state.loading ? "Submitting..." : "Request booking"}</button>
      </form>
    </section>
  );
}
