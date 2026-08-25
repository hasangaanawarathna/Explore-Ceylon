import Image from "next/image";

import { Button } from "@/components/Button";

interface HeroProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

const heroStats = [
  { value: "25+", label: "destinations" },
  { value: "7 day", label: "sample route" },
  { value: "24/7", label: "travel support" },
];

const routeStops = ["Sigiriya", "Kandy", "Ella", "Mirissa"];

const tripNotes = [
  "Private transfers",
  "Boutique stays",
  "Local experiences",
];

export function Hero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[#fff8ed]">
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(180deg,rgba(255,248,237,0),rgba(14,116,144,0.12))]" />

      <div className="mx-auto grid min-h-[calc(100vh-76px)] w-full max-w-7xl items-center gap-12 px-6 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-teal-700 sm:text-sm">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-2xl text-5xl font-semibold tracking-tight text-balance text-slate-950 sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={primaryCta.href}>{primaryCta.label}</Button>
            <Button href={secondaryCta.href} variant="outline">
              {secondaryCta.label}
            </Button>
          </div>

          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-teal-900/10 bg-white/75 p-4 shadow-sm shadow-teal-900/5"
              >
                <p className="text-2xl font-semibold text-slate-950">{stat.value}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[520px]">
          <div className="absolute left-8 right-0 top-0 h-[72%] overflow-hidden rounded-[2rem] bg-teal-950 shadow-2xl shadow-teal-950/20">
            <Image
              src="/images/hero-sri-lanka.svg"
              alt="Sri Lankan coastal landscape"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.34))]" />
            <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-950/10">
              Island grand tour
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full max-w-lg rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/14">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
                  Recommended route
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                  Culture, hills and coast
                </h2>
              </div>
              <div className="rounded-2xl bg-teal-50 px-4 py-3 text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
                  From
                </p>
                <p className="text-xl font-semibold text-teal-950">$690</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {routeStops.map((stop) => (
                <span
                  key={stop}
                  className="rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700"
                >
                  {stop}
                </span>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {tripNotes.map((note) => (
                <div
                  key={note}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-700"
                >
                  {note}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
