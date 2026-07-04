import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/Button";
import { navigationItems } from "@/lib/constants";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/icons/explore-mark.svg"
            alt="Explore Ceylon"
            width={36}
            height={36}
            priority
          />
          <div>
            <p className="text-lg font-semibold leading-none text-slate-950">
              Explore Ceylon
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-500">
              Discover Sri Lanka
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-sky-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/booking">Book Now</Button>
        </div>

        <details className="group relative lg:hidden">
          <summary className="list-none rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm shadow-slate-200/50">
            Menu
          </summary>
          <div className="absolute right-0 top-14 w-72 rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-300/40">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Button href="/booking" className="mt-4 w-full">
              Book Now
            </Button>
          </div>
        </details>
      </div>
    </header>
  );
}