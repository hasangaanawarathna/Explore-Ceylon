import Link from "next/link";

import { PriceDisplay } from "@/components/PriceDisplay";
import { ResilientImage } from "@/components/ResilientImage";
import type { TravelPackage } from "@/types";

interface PackageCardProps {
  travelPackage: TravelPackage;
  usdToLkrRate: number;
}

export function PackageCard({ travelPackage, usdToLkrRate }: PackageCardProps) {
  return (
    <Link
      href={`/packages/${travelPackage.slug}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 text-white shadow-xl shadow-slate-900/10 transition duration-300 hover:-translate-y-1 hover:shadow-2xl sm:rounded-[2rem]"
    >
      <div
        className="relative flex h-48 flex-col justify-between overflow-hidden p-5 sm:h-56 sm:p-6"
      >
        <ResilientImage src={travelPackage.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,6,23,0.9),rgba(15,23,42,0.6))]" />
        <div className="relative flex items-center justify-between gap-3">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-sky-200 backdrop-blur sm:tracking-[0.2em]">
            {travelPackage.category}
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
            {travelPackage.duration}
          </span>
        </div>
        <div className="relative">
          <PriceDisplay
            usdAmount={travelPackage.priceUsd}
            usdToLkrRate={usdToLkrRate}
            theme="dark"
          />
          <h3 className="mt-2 text-2xl font-semibold">{travelPackage.title}</h3>
        </div>
      </div>

      <div className="p-5 sm:p-6">
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
