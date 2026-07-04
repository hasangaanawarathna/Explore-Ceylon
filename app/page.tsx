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

export default function Home() {
  return (
    <div className="space-y-24 pb-24">
      <Hero
        eyebrow="Premium travel experiences in Sri Lanka"
        title="Discover the Hidden Beauty of Sri Lanka"
        description="Plan coastal escapes, hill-country retreats, wildlife journeys, and family adventures with curated itineraries built for memorable, low-friction travel."
        primaryCta={{ label: "Search tours", href: "/destinations" }}
        secondaryCta={{ label: "Explore packages", href: "/packages" }}
      />

      <section className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <SearchBar />
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <SectionTitle
          eyebrow="Featured destinations"
          title="Six places that define the island"
          description="From misty highlands to sunlit beaches, these destinations cover the essential Sri Lankan travel experience."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {destinations.slice(0, 6).map((destination) => (
            <DestinationCard key={destination.slug} destination={destination} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <SectionTitle
          eyebrow="Popular packages"
          title="Premium journeys for every travel style"
          description="Each package is designed to balance iconic landmarks, authentic experiences, and smooth logistics."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {packages.slice(0, 3).map((travelPackage) => (
            <PackageCard key={travelPackage.slug} travelPackage={travelPackage} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
        <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-950/20">
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
                className="rounded-3xl border border-white/10 bg-white/5 p-5"
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

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
          <SectionTitle
            eyebrow="Testimonials"
            title="Trusted by leisure and adventure travelers"
            description="A polished platform is only useful when it helps people confidently choose the right trip."
          />
          <div className="mt-8 space-y-4">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.name}
                className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200"
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

      <section className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <SectionTitle
          eyebrow="Travel blog"
          title="Stories, guides, and practical travel insight"
          description="Use the blog to surface local advice, seasonal planning tips, and destination spotlights."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <article
              key={post.slug}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50"
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
