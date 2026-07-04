import Link from "next/link";

import { navigationItems } from "@/lib/constants";

const footerColumns = [
  {
    title: "Explore",
    links: ["Destinations", "Packages", "Gallery", "Blog"],
  },
  {
    title: "Company",
    links: ["About", "Contact", "Booking", "Admin"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
            Explore Ceylon
          </p>
          <p className="mt-4 max-w-md text-2xl font-semibold tracking-tight text-balance">
            A premium travel platform for discovering Sri Lanka.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
            Built as a fast, responsive frontend foundation for future booking,
            payments, and admin features.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">
            Navigation
          </h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">
            Future ready
          </h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="font-semibold text-white">{column.title}</p>
                <p className="mt-2 leading-7">{column.links.join(" / ")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs uppercase tracking-[0.24em] text-slate-400">
        Explore Ceylon. Frontend architecture for premium travel discovery.
      </div>
    </footer>
  );
}