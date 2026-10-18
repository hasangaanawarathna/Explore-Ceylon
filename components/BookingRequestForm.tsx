"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import type { Destination } from "@/types";
import { createClient } from "@/lib/supabase/client";
import { publicId } from "@/lib/supabase/repository";
import { getCatalog } from "@/lib/supabase/repository";

export function BookingRequestForm({ destinations }: { destinations: Destination[] }) {
  const [state, setState] = useState({ loading: false, error: "", success: "" });
  const [availableDestinations, setAvailableDestinations] = useState(destinations);
  const submitting = useRef(false);
  useEffect(() => { getCatalog().then((catalog) => setAvailableDestinations(catalog.destinations)).catch(() => undefined); }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setState({ loading: true, error: "", success: "" });
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const id = publicId("EC");
    try {
      const { error } = await createClient().from("bookings").insert({ id, name: String(values.name).trim(), email: String(values.email).trim().toLowerCase(), phone: String(values.phone).trim(), destination: String(values.destination).trim(), start_point: String(values.startPoint).trim(), finish_point: String(values.finishPoint).trim(), travel_date: String(values.travelDate), guests: Number(values.guests), notes: String(values.notes ?? "").trim() || null, status: "pending" });
      if (error) throw error;
      form.reset();
      setState({ loading: false, error: "", success: `Booking request ${id} has been received.` });
    } catch {
      setState({ loading: false, error: "Could not submit this booking. Check your connection and form details, then try again.", success: "" });
    } finally {
      submitting.current = false;
    }
  }

  const field = "h-12 w-full min-w-0 max-w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base outline-none focus:border-sky-400 focus:bg-white sm:text-sm";
  return (
    <section className="min-w-0 max-w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/50 min-[360px]:p-5 sm:rounded-[2rem] sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Booking request</p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-950">Send your trip details</h2>
      <form onSubmit={submit} className="mt-7 grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">Full name<input name="name" autoComplete="name" required maxLength={120} className={field} /></label>
        <label className="grid gap-2 text-sm font-medium">Email<input name="email" type="email" inputMode="email" autoComplete="email" required maxLength={200} className={field} /></label>
        <label className="grid gap-2 text-sm font-medium">Phone<input name="phone" type="tel" inputMode="tel" autoComplete="tel" required maxLength={50} pattern="[+0-9() .-]{7,50}" title="Enter a valid phone number using digits and common phone symbols." className={field} /></label>
        <label className="grid gap-2 text-sm font-medium">Destination<select name="destination" required className={field}>{availableDestinations.map((item) => <option key={item.slug}>{item.name}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-medium">Start point<input name="startPoint" required maxLength={200} placeholder="Airport, hotel, or town" className={field} /></label>
        <label className="grid gap-2 text-sm font-medium">Finish point<input name="finishPoint" required maxLength={200} placeholder="Final town or hotel" className={field} /></label>
        <label className="grid gap-2 text-sm font-medium">Travel date<input name="travelDate" type="date" required min={new Date().toISOString().slice(0, 10)} className={field} /></label>
        <label className="grid gap-2 text-sm font-medium">Guests<input name="guests" type="number" required min="1" max="100" defaultValue="2" className={field} /></label>
        <label className="grid gap-2 text-sm font-medium md:col-span-2">Notes<textarea name="notes" maxLength={2000} rows={4} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-400 focus:bg-white" /></label>
        {state.error && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700 md:col-span-2">{state.error}</p>}
        {state.success && <p role="status" className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700 md:col-span-2">{state.success}</p>}
        <button type="submit" disabled={state.loading} aria-busy={state.loading} className="min-h-12 rounded-full bg-sky-600 px-5 font-semibold text-white disabled:cursor-wait disabled:opacity-60 md:col-span-2">{state.loading ? "Submitting..." : "Request booking"}</button>
      </form>
    </section>
  );
}
