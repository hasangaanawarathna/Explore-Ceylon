import Link from "next/link";

import type { Destination } from "@/types";
import { cn } from "@/lib/utils";

interface DestinationCardProps {
  destination: Destination;
}

const destinationGradients: Record<string, string> = {
  Sigiriya: "from-amber-500 via-orange-500 to-rose-500",
  Ella: "from-emerald-500 via-teal-500 to-cyan-500",
  Mirissa: "from-fuchsia-500 via-rose-500 to-orange-500",
  Kandy: "from-indigo-500 via-violet-500 to-sky-500",
  Trincomalee: "from-sky-500 via-cyan-500 to-emerald-500",
  Yala: "from-lime-500 via-emerald-500 to-green-600",
};

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg shadow-slate-200/60 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300/70"
    >
      <div
        className={cn(
          "flex h-52 flex-col justify-between bg-gradient-to-br p-6 text-white",
          destinationGradients[destination.name] ?? "from-slate-700 via-slate-800 to-slate-950",
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur">
            {destination.region}
          </span>
          <span className="rounded-full bg-black/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            {destination.duration}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/80">
            {destination.location}
          </p>
          <h3 className="mt-2 text-2xl font-semibold">{destination.name}</h3>
        </div>
      </div>

      <div className="p-6">
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
        <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5 text-sm">
          <span className="font-semibold text-slate-950">{destination.price}</span>
          <span className="text-slate-500">Best time: {destination.bestTime}</span>
        </div>
      </div>
    </Link>
  );
}