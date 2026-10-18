"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = ["Overview", "Bookings", "Packages", "Leads", "Content", "Payments", "Reports", "Settings"];

export function AdminNavigation() {
  const [open, setOpen] = useState(false);

  return (
    <aside className="min-w-0 lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] lg:w-64 lg:shrink-0">
      <div className="rounded-2xl bg-[#102a2e] p-4 text-white shadow-xl shadow-slate-300/40 lg:min-h-full lg:rounded-none">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 lg:block lg:pb-5">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-200/70">Explore Ceylon</p>
            <h1 className="mt-1 text-xl font-semibold tracking-tight text-white lg:mt-2 lg:text-2xl">Admin</h1>
            <div className="mt-2 hidden items-center gap-2 text-sm text-teal-100/70 lg:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />Workspace live
            </div>
          </div>
          <button type="button" className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/20 px-4 text-sm font-semibold text-white lg:hidden" aria-expanded={open} aria-controls="admin-navigation" onClick={() => setOpen((current) => !current)}>
            {open ? "Close menu" : "Menu"}
          </button>
        </div>

        <div id="admin-navigation" className={`${open ? "block" : "hidden"} lg:block`}>
          <nav className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:mt-5 lg:block lg:space-y-1">
            {navItems.map((item, index) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className={`flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-medium transition ${index === 0 ? "bg-[#d9f3ed] text-[#102a2e]" : "text-teal-50/75 hover:bg-white/10 hover:text-white"}`}>
                {item}
              </a>
            ))}
          </nav>
          <div className="mt-5 border-t border-white/10 pt-4 lg:mt-6">
            <Link href="/" className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#102a2e] transition hover:bg-teal-50">View Website</Link>
            <p className="mt-4 hidden text-xs uppercase tracking-[0.18em] text-teal-100/50 lg:block">Today</p>
            <p className="mt-2 hidden text-sm font-semibold text-white lg:block">12 live requests</p>
            <p className="mt-1 hidden text-sm text-teal-100/60 lg:block">4 require approval before noon.</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
