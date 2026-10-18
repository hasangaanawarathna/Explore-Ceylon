"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Booking, BookingStatus, Enquiry, EnquiryStatus } from "@/lib/server/models";
import { createClient } from "@/lib/supabase/client";
import { bookingFromRow, enquiryFromRow } from "@/lib/supabase/repository";

type Dashboard = { counts: Record<string, number>; recentBookings: Booking[]; recentEnquiries: Enquiry[] };

export function LiveOperations() {
  const router = useRouter();
  const [data, setData] = useState<Dashboard | null>(null);
  const [error, setError] = useState("");

  async function load() {
    const supabase = createClient();
    const [bookings, enquiries, newEnquiries, openBookings, confirmedTrips] = await Promise.all([
      supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(10),
      supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(10),
      supabase.from("enquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
      supabase.from("bookings").select("id", { count: "exact", head: true }).in("status", ["pending", "approved", "paid"]),
      supabase.from("bookings").select("id", { count: "exact", head: true }).in("status", ["approved", "paid"]),
    ]);
    if (bookings.error || enquiries.error || newEnquiries.error || openBookings.error || confirmedTrips.error) return setError("Could not load live operational data.");
    const recentBookings = (bookings.data ?? []).map(bookingFromRow);
    const recentEnquiries = (enquiries.data ?? []).map(enquiryFromRow);
    setData({ recentBookings, recentEnquiries, counts: { newEnquiries: newEnquiries.count ?? 0, openBookings: openBookings.count ?? 0, confirmedTrips: confirmedTrips.count ?? 0 } });
  }

  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(() => { load().catch(() => {
        if (!cancelled) setError("Could not load live operational data.");
      }); }, 0);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, []);

  async function changeStatus(kind: "bookings" | "enquiries", id: string, status: BookingStatus | EnquiryStatus) {
    const { error } = await createClient().from(kind).update({ status }).eq("id", id);
    if (error) return setError("The status update failed.");
    await load();
  }

  async function logout() {
    await createClient().auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <section className="min-w-0 border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Live backend</p><h2 className="mt-2 text-2xl font-semibold">Customer operations</h2></div>
        <button type="button" onClick={logout} className="min-h-11 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold">Sign out</button>
      </div>
      {error && <p className="mt-4 bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
      {!data ? <p className="mt-5 text-sm text-slate-500">Loading current records...</p> : (
        <>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Metric label="New enquiries" value={data.counts.newEnquiries} />
            <Metric label="Open bookings" value={data.counts.openBookings} />
            <Metric label="Confirmed trips" value={data.counts.confirmedTrips} />
          </div>
          <div className="mt-7 grid gap-6 xl:grid-cols-2">
            <RecordList title="Latest booking requests" empty="No booking requests yet.">
              {data.recentBookings.map((item) => <Record key={item.id} title={`${item.name} · ${item.destination}`} detail={`${item.id} · ${item.travelDate} · ${item.guests} guest(s)`}><select aria-label={`Status for ${item.id}`} value={item.status} onChange={(event) => changeStatus("bookings", item.id, event.target.value as BookingStatus)} className="h-11 w-full border border-slate-300 bg-white px-2 text-base sm:w-auto sm:text-sm"><option>pending</option><option>approved</option><option>paid</option><option>completed</option><option>cancelled</option></select></Record>)}
            </RecordList>
            <RecordList title="Latest enquiries" empty="No enquiries yet.">
              {data.recentEnquiries.map((item) => <Record key={item.id} title={`${item.name} · ${item.subject}`} detail={`${item.id} · ${item.email}`}><select aria-label={`Status for ${item.id}`} value={item.status} onChange={(event) => changeStatus("enquiries", item.id, event.target.value as EnquiryStatus)} className="h-11 w-full border border-slate-300 bg-white px-2 text-base sm:w-auto sm:text-sm"><option>new</option><option>contacted</option><option>quoted</option><option>won</option><option>closed</option></select></Record>)}
            </RecordList>
          </div>
        </>
      )}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) { return <div className="border border-slate-200 bg-slate-50 p-4"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-semibold">{value}</p></div>; }
function RecordList({ title, empty, children }: { title: string; empty: string; children: React.ReactNode }) { return <div><h3 className="font-semibold">{title}</h3><div className="mt-3 space-y-2">{children || <p className="text-sm text-slate-500">{empty}</p>}</div></div>; }
function Record({ title, detail, children }: { title: string; detail: string; children: React.ReactNode }) { return <div className="flex min-w-0 flex-col justify-between gap-3 border border-slate-200 bg-slate-50 p-3 sm:flex-row sm:items-center"><div className="min-w-0"><p className="break-words text-sm font-semibold">{title}</p><p className="mt-1 break-words text-xs text-slate-500">{detail}</p></div>{children}</div>; }
