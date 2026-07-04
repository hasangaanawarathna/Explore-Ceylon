import Link from "next/link";

import type { TravelPackage } from "@/types";

interface PackageCardProps {
  travelPackage: TravelPackage;
}

export function PackageCard({ travelPackage }: PackageCardProps) {
  return (
    <Link
      href={`/packages/${travelPackage.slug}`}
      className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 text-white shadow-xl shadow-slate-900/10 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="flex h-56 flex-col justify-between bg-[linear-gradient(135deg,rgba(2,6,23,0.9),rgba(15,23,42,0.6)),url('/images/hero-sri-lanka.svg')] bg-cover bg-center p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-200 backdrop-blur">
            {travelPackage.category}
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
            {travelPackage.duration}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">
            {travelPackage.price}
          </p>
          <h3 className="mt-2 text-2xl font-semibold">{travelPackage.title}</h3>
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm leading-7 text-slate-300">{travelPackage.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {travelPackage.features.map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}