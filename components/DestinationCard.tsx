import Link from "next/link";

import { PriceDisplay } from "@/components/PriceDisplay";
import type { Destination } from "@/types";
import { cn } from "@/lib/utils";

interface DestinationCardProps {
  destination: Destination;
  usdToLkrRate: number;
}

const destinationGradients: Record<string, string> = {
  Sigiriya: "from-amber-500 via-orange-500 to-rose-500",
  Ella: "from-emerald-500 via-teal-500 to-cyan-500",
  Mirissa: "from-fuchsia-500 via-rose-500 to-orange-500",
  Kandy: "from-indigo-500 via-violet-500 to-sky-500",
  Trincomalee: "from-sky-500 via-cyan-500 to-emerald-500",
  Yala: "from-lime-500 via-emerald-500 to-green-600",
};

export function DestinationCard({ destination, usdToLkrRate }: DestinationCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300/70 sm:rounded-[2rem]">
      <Link href={`/destinations/${destination.slug}`} className="block">
        <div
          className={cn(
            "flex h-44 flex-col justify-between bg-gradient-to-br p-5 text-white sm:h-52 sm:p-6",
            destinationGradients[destination.name] ??
              "from-slate-700 via-slate-800 to-slate-950",
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur sm:tracking-[0.2em]">
              {destination.region}
            </span>
            <span className="rounded-full bg-black/15 px-3 py-1 text-xs font-semibold backdrop-blur">
              {destination.duration}
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-sm sm:tracking-[0.24em]">
              {destination.location}
            </p>
            <h3 className="mt-2 text-2xl font-semibold">{destination.name}</h3>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <p className="text-sm leading-7 text-slate-600">{destination.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {destination.activities.map((activity) => (
              <span
                key={activity}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
              >
                {activity}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-end sm:justify-between">
            <PriceDisplay usdAmount={destination.priceUsd} usdToLkrRate={usdToLkrRate} />
            <span className="text-sm text-slate-500">
              Best time: {destination.bestTime}
            </span>
          </div>
        </div>
      </Link>
      <div className="px-5 pb-5 sm:px-6 sm:pb-6">
        <a
          href={destination.googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-sky-50 px-4 text-sm font-semibold text-sky-700 transition hover:bg-sky-100 hover:text-sky-800 sm:w-auto sm:bg-transparent sm:px-0"
        >
          Open in Google Maps
        </a>
      </div>
    </article>
  );
}
