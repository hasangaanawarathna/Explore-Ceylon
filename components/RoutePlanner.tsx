"use client";

import { useMemo, useState } from "react";

import type { Destination, RestaurantStop } from "@/types";

type RoutePlannerProps = {
  destinations: Destination[];
  popularStartPoints: string[];
  restaurantStops: RestaurantStop[];
};

function buildGoogleMapsUrl(startPoint: string, finishPoint: string, stops: RestaurantStop[]) {
  const params = new URLSearchParams({
    api: "1",
    origin: `${startPoint}, Sri Lanka`,
    destination: `${finishPoint}, Sri Lanka`,
    travelmode: "driving",
  });

  if (stops.length > 0) {
    params.set(
      "waypoints",
      stops.map((stop) => `${stop.name}, ${stop.location}, Sri Lanka`).join("|"),
    );
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export function RoutePlanner({
  destinations,
  popularStartPoints,
  restaurantStops,
}: RoutePlannerProps) {
  const [selectedDestinationSlug, setSelectedDestinationSlug] = useState(destinations[0]?.slug ?? "");
  const selectedDestination = destinations.find(
    (destination) => destination.slug === selectedDestinationSlug,
  );
  const [startPoint, setStartPoint] = useState(popularStartPoints[0] ?? "");
  const [finishPoint, setFinishPoint] = useState(selectedDestination?.name ?? "");
  const [customStartPoint, setCustomStartPoint] = useState("");
  const [includeRestaurants, setIncludeRestaurants] = useState(true);

  const effectiveStartPoint = startPoint === "Custom" ? customStartPoint : startPoint;
  const effectiveFinishPoint = finishPoint.trim() || selectedDestination?.name || "";

  const suggestedRestaurants = useMemo(() => {
    if (!selectedDestination) {
      return restaurantStops.slice(0, 3);
    }

    const destinationWords = [
      selectedDestination.name,
      selectedDestination.location,
      selectedDestination.region,
    ].map((value) => value.toLowerCase());

    const directMatches = restaurantStops.filter((stop) => {
      const searchable = `${stop.location} ${stop.routeArea}`.toLowerCase();
      return destinationWords.some((word) => searchable.includes(word) || word.includes(stop.routeArea.toLowerCase()));
    });

    const startMatches = restaurantStops.filter((stop) =>
      effectiveStartPoint.toLowerCase().includes(stop.location.toLowerCase()),
    );

    const blendedStops = [...startMatches, ...directMatches, ...restaurantStops];
    return blendedStops
      .filter((stop, index, allStops) => allStops.findIndex((item) => item.name === stop.name) === index)
      .slice(0, 3);
  }, [effectiveStartPoint, restaurantStops, selectedDestination]);

  const activeRestaurantStops = includeRestaurants ? suggestedRestaurants : [];
  const mapsUrl = buildGoogleMapsUrl(effectiveStartPoint, effectiveFinishPoint, activeRestaurantStops);
  const routeSteps = [
    { label: "Start", value: effectiveStartPoint || "Choose a start point" },
    ...activeRestaurantStops.map((stop) => ({
      label: stop.timing,
      value: `${stop.name}, ${stop.location}`,
    })),
    { label: "Finish", value: effectiveFinishPoint || "Choose a finish point" },
  ];

  function handleDestinationChange(slug: string) {
    const destination = destinations.find((item) => item.slug === slug);
    setSelectedDestinationSlug(slug);
    if (destination) {
      setFinishPoint(destination.name);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <form className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 md:p-8">
        <div className="grid gap-5">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Destination you choose
            <select
              value={selectedDestinationSlug}
              onChange={(event) => handleDestinationChange(event.target.value)}
              className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-sky-400 focus:bg-white"
            >
              {destinations.map((destination) => (
                <option key={destination.slug} value={destination.slug}>
                  {destination.name}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Start point
            <select
              value={startPoint}
              onChange={(event) => setStartPoint(event.target.value)}
              className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-sky-400 focus:bg-white"
            >
              {popularStartPoints.map((point) => (
                <option key={point}>{point}</option>
              ))}
              <option>Custom</option>
            </select>
          </label>

          {startPoint === "Custom" ? (
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Custom start point
              <input
                value={customStartPoint}
                onChange={(event) => setCustomStartPoint(event.target.value)}
                placeholder="Example: Hikkaduwa"
                className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-sky-400 focus:bg-white"
              />
            </label>
          ) : null}

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Finishing point
            <input
              value={finishPoint}
              onChange={(event) => setFinishPoint(event.target.value)}
              placeholder="Example: Ella"
              className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-sky-400 focus:bg-white"
            />
          </label>

          <label className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
            Include restaurants on route
            <input
              type="checkbox"
              checked={includeRestaurants}
              onChange={(event) => setIncludeRestaurants(event.target.checked)}
              className="h-5 w-5 accent-sky-600"
            />
          </label>
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 transition hover:-translate-y-0.5 hover:bg-sky-500"
        >
          Open route with restaurants
        </a>
      </form>

      <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/20 md:p-8">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">
              Route preview
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              {effectiveStartPoint || "Start point"} to {effectiveFinishPoint || "finish point"}
            </h2>
          </div>
          {selectedDestination ? (
            <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-slate-200 ring-1 ring-white/10">
              {selectedDestination.duration} · {selectedDestination.region}
            </div>
          ) : null}
        </div>

        <div className="mt-6 space-y-4">
          {routeSteps.map((step, index) => (
            <div key={`${step.label}-${step.value}`} className="grid grid-cols-[2.5rem_1fr] gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-950">
                  {index + 1}
                </div>
                {index < routeSteps.length - 1 ? <div className="h-full min-h-8 w-px bg-white/20" /> : null}
              </div>
              <div className="pb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">
                  {step.label}
                </p>
                <p className="mt-1 text-lg font-semibold text-white">{step.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {activeRestaurantStops.map((stop) => (
            <article key={stop.name} className="rounded-2xl bg-white p-4 text-slate-950">
              <p className="text-sm font-semibold">{stop.name}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-sky-700">
                {stop.location}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{stop.bestFor}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
