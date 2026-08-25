import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/Button";
import { navigationItems } from "@/lib/constants";
import { withBasePath } from "@/lib/utils";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={withBasePath("/icons/explore-mark.svg")}
            alt="Explore Ceylon"
            width={34}
            height={34}
            priority
          />
          <div>
            <p className="text-base font-semibold leading-none text-slate-950 sm:text-lg">
              Explore Ceylon
            </p>
            <p className="mt-1 hidden text-xs uppercase tracking-[0.24em] text-slate-500 sm:block">
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
          <summary
            aria-label="Open navigation menu"
            className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm shadow-slate-200/50"
          >
            <span className="grid gap-1">
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
            </span>
          </summary>
          <div className="fixed left-4 right-4 top-16 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-300/40 sm:absolute sm:left-auto sm:right-0 sm:top-14 sm:w-80 sm:rounded-3xl sm:p-4">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 sm:rounded-2xl"
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
