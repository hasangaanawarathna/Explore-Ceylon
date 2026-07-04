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
  { value: "25+", label: "curated destinations" },
  { value: "100%", label: "mobile responsive" },
  { value: "Fast", label: "booking-ready frontend" },
];

export function Hero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-sri-lanka.svg"
          alt="Sri Lankan coastal landscape"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,15,31,0.92),rgba(8,15,31,0.72),rgba(8,15,31,0.28))]" />
      </div>

      <div className="mx-auto grid min-h-[88vh] w-full max-w-7xl items-end px-6 py-16 lg:px-8 lg:py-20">
        <div className="max-w-3xl pb-4 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">
            {eyebrow}
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={primaryCta.href}>{primaryCta.label}</Button>
            <Button href={secondaryCta.href} variant="secondary">
              {secondaryCta.label}
            </Button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur"
              >
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className="mt-1 text-sm leading-6 text-slate-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}