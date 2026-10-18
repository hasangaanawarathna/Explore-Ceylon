"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/Button";
import { ResilientImage } from "@/components/ResilientImage";
import { navigationItems } from "@/lib/constants";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    const closeOutside = (event: PointerEvent) => { if (!menuRef.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full min-w-0 max-w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full min-w-0 max-w-7xl items-center justify-between gap-2 px-3 py-3 min-[360px]:gap-3 min-[360px]:px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 flex-1 items-center gap-2 min-[360px]:gap-3" aria-label="Explore Ceylon home">
          <ResilientImage
            src="/images/explore-ceylon-logo-nav.png"
            alt=""
            width={96}
            height={96}
            priority
            className="h-9 w-9 shrink-0 object-contain sm:h-11 sm:w-11"
          />
          <div className="min-w-0">
            <p className="truncate text-base font-semibold leading-none text-slate-950 sm:text-lg">Explore Ceylon</p>
            <p className="mt-1 hidden text-xs uppercase tracking-[0.24em] text-slate-500 sm:block">Discover Sri Lanka</p>
          </div>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} className="text-sm font-medium text-slate-600 transition hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600">{item.label}</Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/admin" className="text-sm font-semibold text-slate-600 transition hover:text-sky-700">Admin Login</Link>
          <Button href="/booking">Book Now</Button>
        </div>

        <div ref={menuRef} className="relative shrink-0 lg:hidden">
          <button type="button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((current) => !current)} className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm shadow-slate-200/50">
            <span className="grid gap-1" aria-hidden="true">
              <span className={`block h-0.5 w-5 rounded-full bg-current transition ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 rounded-full bg-current transition ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 rounded-full bg-current transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </span>
          </button>
          {open && (
            <nav id="mobile-navigation" aria-label="Mobile navigation" className="fixed left-3 right-3 top-16 max-h-[calc(100dvh-5rem)] max-w-[calc(100vw-1.5rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-300/40 min-[360px]:left-4 min-[360px]:right-4 min-[360px]:max-w-[calc(100vw-2rem)] sm:absolute sm:left-auto sm:right-0 sm:top-14 sm:w-80 sm:max-w-[calc(100vw-3rem)] sm:rounded-3xl sm:p-4">
              <div className="space-y-1">
                {navigationItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} aria-current={pathname === item.href ? "page" : undefined} className="block min-h-11 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 sm:rounded-2xl">{item.label}</Link>)}
              </div>
              <Button href="/booking" onClick={() => setOpen(false)} className="mt-4 w-full">Book Now</Button>
              <Link href="/admin" onClick={() => setOpen(false)} className="mt-2 block min-h-11 rounded-xl px-4 py-3 text-center text-sm font-semibold text-slate-600 hover:bg-slate-50 sm:rounded-2xl">Admin Login</Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
