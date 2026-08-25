import { notFound } from "next/navigation";

import { Button } from "@/components/Button";
import { PriceDisplay } from "@/components/PriceDisplay";
import { SectionTitle } from "@/components/SectionTitle";
import { destinations, getDestinationBySlug } from "@/lib/constants";
import { getUsdToLkrRate } from "@/lib/utils";

interface DestinationDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return destinations.map((destination) => ({
    slug: destination.slug,
  }));
}

export default async function DestinationDetailsPage({ params }: DestinationDetailsPageProps) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  const usdToLkrRate = await getUsdToLkrRate();

  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-4 py-12 sm:space-y-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <SectionTitle
        eyebrow={destination.region}
        title={destination.name}
        description={destination.summary}
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-2xl bg-slate-950 p-5 text-white shadow-2xl shadow-slate-950/20 sm:rounded-[2rem] sm:p-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-5 sm:rounded-3xl">
              <p className="text-sm text-slate-300">Price</p>
              <PriceDisplay
                usdAmount={destination.priceUsd}
                usdToLkrRate={usdToLkrRate}
                theme="dark"
                size="lg"
                className="mt-3"
              />
            </div>
            <div className="rounded-2xl bg-white/10 p-5 sm:rounded-3xl">
              <p className="text-sm text-slate-300">Duration</p>
              <p className="mt-2 text-2xl font-semibold">{destination.duration}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5 sm:rounded-3xl">
              <p className="text-sm text-slate-300">Best season</p>
              <p className="mt-2 text-lg font-semibold">{destination.bestTime}</p>
            </div>
          </div>
          <h2 className="mt-8 text-2xl font-semibold">What to do</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {destination.activities.map((activity) => (
              <div key={activity} className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-200 sm:rounded-3xl">
                {activity}
              </div>
            ))}
          </div>
          <Button href={destination.googleMapsUrl} target="_blank" rel="noreferrer" className="mt-8 w-full">
            Open in Google Maps
          </Button>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:rounded-[2rem] sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-950">Travel notes</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            This detail page is a starter layout for future dynamic content, maps,
            reviews, and booking widgets.
          </p>
          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <p>Region: {destination.region}</p>
            <p>Category: Curated experience</p>
            <p>Ideal for: Leisure and discovery</p>
          </div>
          <Button href="/booking" className="mt-8 w-full">
            Book this destination
          </Button>
        </aside>
      </div>
    </div>
  );
}
