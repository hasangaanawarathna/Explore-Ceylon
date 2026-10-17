"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/Button";
import { ResilientImage } from "@/components/ResilientImage";

interface HeroProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  images: string[];
  autoRotate: boolean;
  rotationIntervalSeconds: number;
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
  images,
  autoRotate,
  rotationIntervalSeconds,
}: HeroProps) {
  const [activeImage, setActiveImage] = useState(0);
  const currentImage = images[activeImage] ?? images[0];

  useEffect(() => {
    if (!autoRotate || images.length < 2) return;
    const timer = window.setInterval(
      () => setActiveImage((current) => (current + 1) % images.length),
      rotationIntervalSeconds * 1000,
    );
    return () => window.clearInterval(timer);
  }, [autoRotate, images.length, rotationIntervalSeconds]);

  return (
    <section className="relative isolate overflow-hidden bg-[#fff8ed]">
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(180deg,rgba(255,248,237,0),rgba(14,116,144,0.12))]" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:min-h-[calc(100vh-76px)] lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-teal-700 sm:text-sm">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-balance text-slate-950 sm:mt-5 sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:mt-6 sm:text-xl sm:leading-8">
            {description}
          </p>

          <div className="mt-7 grid gap-3 sm:mt-8 sm:flex sm:flex-wrap sm:gap-4">
            <Button href={primaryCta.href} className="w-full sm:w-auto">
              {primaryCta.label}
            </Button>
            <Button href={secondaryCta.href} variant="outline" className="w-full sm:w-auto">
              {secondaryCta.label}
            </Button>
          </div>

          <div className="mt-8 grid max-w-2xl gap-3 sm:mt-10 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-teal-900/10 bg-white/75 p-4 shadow-sm shadow-teal-900/5 sm:rounded-2xl"
              >
                <p className="text-2xl font-semibold text-slate-950">{stat.value}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[430px] sm:min-h-[500px] lg:min-h-[560px]">
          <div className="absolute left-0 right-0 top-0 h-[68%] overflow-hidden rounded-2xl bg-teal-950 shadow-2xl shadow-teal-950/20 sm:left-8 sm:h-[74%] sm:rounded-[2rem]">
            {currentImage && <ResilientImage
              key={currentImage}
              src={currentImage}
              alt="A scenic Sri Lankan travel experience"
              fill
              preload
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.02),rgba(15,23,42,0.48))]" />
            <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900 shadow-lg shadow-slate-950/10 sm:left-6 sm:top-6 sm:px-4 sm:text-sm">
              Island grand tour
            </div>
            {images.length > 1 && (
              <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-slate-950/55 px-3 py-2 backdrop-blur-sm" aria-label="Choose hero image">
                {images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    aria-label={`Show image ${index + 1}`}
                    aria-current={index === activeImage}
                    onClick={() => setActiveImage(index)}
                    className={`h-2.5 rounded-full transition-all ${index === activeImage ? "w-7 bg-white" : "w-2.5 bg-white/55 hover:bg-white/80"}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="absolute -left-1 top-20 hidden h-44 w-36 overflow-hidden rounded-[1.25rem] border-4 border-white bg-white shadow-2xl shadow-slate-950/20 lg:block">
            <ResilientImage
              src="/images/ui/ceylon-rail-hills.jpg"
              alt=""
              fill
              sizes="144px"
              className="object-cover"
            />
          </div>

          <div className="absolute right-0 top-[42%] hidden h-32 w-48 overflow-hidden rounded-[1.25rem] border-4 border-white bg-white shadow-2xl shadow-slate-950/20 xl:block">
            <ResilientImage
              src="/images/ui/ceylon-temple-lights.jpg"
              alt=""
              fill
              sizes="192px"
              className="object-cover"
            />
          </div>

          <div className="absolute bottom-0 left-0 w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/14 sm:max-w-lg sm:rounded-[1.5rem] sm:p-5">
            <div className="grid gap-3 sm:flex sm:items-start sm:justify-between sm:gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
                  Recommended route
                </p>
                <h2 className="mt-2 text-xl font-semibold text-slate-950 sm:text-2xl">
                  Culture, hills and coast
                </h2>
              </div>
              <div className="w-fit rounded-xl bg-teal-50 px-4 py-3 text-left sm:rounded-2xl sm:text-right">
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

            <div className="mt-4 grid gap-2 sm:mt-5 sm:grid-cols-3 sm:gap-3">
              {tripNotes.map((note) => (
                <div
                  key={note}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-700 sm:rounded-2xl"
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
