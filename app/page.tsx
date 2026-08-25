import Image from "next/image";

import { Button } from "@/components/Button";
import { DestinationCard } from "@/components/DestinationCard";
import { Hero } from "@/components/Hero";
import { PackageCard } from "@/components/PackageCard";
import { SearchBar } from "@/components/SearchBar";
import { SectionTitle } from "@/components/SectionTitle";
import {
  blogPosts,
  destinations,
  packages,
  testimonials,
  whyChooseUs,
} from "@/lib/constants";
import { getUsdToLkrRate } from "@/lib/utils";

export default async function Home() {
  const usdToLkrRate = await getUsdToLkrRate();

  const visualMoments = [
    {
      src: "/images/ui/ceylon-monastery-steps.jpg",
      alt: "Young monks walking down old brick steps",
      className: "min-h-[260px] sm:row-span-2 sm:min-h-[360px]",
    },
    {
      src: "/images/ui/ceylon-heritage-park.jpg",
      alt: "White stupa rising above a green park at dusk",
      className: "min-h-[220px] sm:min-h-[180px]",
    },
    {
      src: "/images/ui/ceylon-safari-field.jpg",
      alt: "Safari jeep beside an elephant in an open field",
      className: "min-h-[220px] sm:min-h-[180px]",
    },
    {
      src: "/images/ui/ceylon-rail-hills.jpg",
      alt: "Blue train crossing a stone bridge through green hills",
      className: "min-h-[220px] sm:min-h-[180px]",
    },
  ];

  return (
    <div className="space-y-16 pb-16 sm:space-y-24 sm:pb-24">
      <Hero
        eyebrow="Premium travel experiences in Sri Lanka"
        title="Discover the Hidden Beauty of Sri Lanka"
        description="Plan coastal escapes, hill-country retreats, wildlife journeys, and family adventures with curated itineraries built for memorable, low-friction travel."
        primaryCta={{ label: "Search tours", href: "/destinations" }}
        secondaryCta={{ label: "Explore packages", href: "/packages" }}
      />

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SearchBar />
      </section>

      <section className="bg-slate-950 py-16 text-white shadow-2xl shadow-slate-950/10">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10 lg:px-8">
          <div className="flex max-w-xl flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300 sm:text-sm">
              Island atmosphere
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              A richer first impression before travelers choose a route
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              From coastal color to temple evenings and hill-country movement,
              these moments set a warmer tone for planning the journey.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {visualMoments.map((moment) => (
              <div
                key={moment.src}
              className={`relative overflow-hidden rounded-2xl bg-white/5 shadow-xl shadow-black/20 sm:rounded-[1.5rem] ${moment.className}`}
              >
                <Image
                  src={moment.src}
                  alt={moment.alt}
                  fill
                  sizes="(min-width: 1024px) 28vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.02),rgba(2,6,23,0.28))]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Featured destinations"
          title="Six places that define the island"
          description="From misty highlands to sunlit beaches, these destinations cover the essential Sri Lankan travel experience."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {destinations.slice(0, 6).map((destination) => (
            <DestinationCard
              key={destination.slug}
              destination={destination}
              usdToLkrRate={usdToLkrRate}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Popular packages"
          title="Premium journeys for every travel style"
          description="Each package is designed to balance iconic landmarks, authentic experiences, and smooth logistics."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {packages.slice(0, 3).map((travelPackage) => (
            <PackageCard
              key={travelPackage.slug}
              travelPackage={travelPackage}
              usdToLkrRate={usdToLkrRate}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-8 lg:px-8">
        <div className="rounded-2xl bg-slate-950 p-5 text-white shadow-2xl shadow-slate-950/20 sm:rounded-[2rem] sm:p-8">
          <SectionTitle
            eyebrow="Why choose us"
            title="Designed for travelers who want clarity"
            description="We focus on reliable planning, curated recommendations, and a premium user experience from discovery to booking."
            dark
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:rounded-3xl"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">
                  {item.label}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:rounded-[2rem] sm:p-8">
          <SectionTitle
            eyebrow="Testimonials"
            title="Trusted by leisure and adventure travelers"
            description="A polished platform is only useful when it helps people confidently choose the right trip."
          />
          <div className="mt-8 space-y-4">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.name}
                className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 sm:rounded-3xl sm:p-6"
              >
                <blockquote className="text-sm leading-7 text-slate-700">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-950">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.location}</p>
                  </div>
                  <p className="text-sm font-semibold text-amber-600">
                    {testimonial.rating}/5
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Travel blog"
          title="Stories, guides, and practical travel insight"
          description="Use the blog to surface local advice, seasonal planning tips, and destination spotlights."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/50 sm:rounded-[2rem] sm:p-6"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                {post.category}
              </p>
              <h3 className="mt-4 text-xl font-semibold text-slate-950">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{post.excerpt}</p>
              <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
                <span>{post.readTime}</span>
                <Button href="/blog" variant="ghost" className="px-0">
                  Read more
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
