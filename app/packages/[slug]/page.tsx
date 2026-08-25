import { notFound } from "next/navigation";

import { Button } from "@/components/Button";
import { PriceDisplay } from "@/components/PriceDisplay";
import { SectionTitle } from "@/components/SectionTitle";
import { getPackageBySlug, packages } from "@/lib/constants";
import { getUsdToLkrRate } from "@/lib/utils";

interface PackageDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return packages.map((travelPackage) => ({
    slug: travelPackage.slug,
  }));
}

export default async function PackageDetailsPage({ params }: PackageDetailsPageProps) {
  const { slug } = await params;
  const travelPackage = getPackageBySlug(slug);

  if (!travelPackage) {
    notFound();
  }

  const usdToLkrRate = await getUsdToLkrRate();

  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-4 py-12 sm:space-y-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <SectionTitle
        eyebrow={travelPackage.category}
        title={travelPackage.title}
        description={travelPackage.summary}
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
        <div className="rounded-2xl bg-slate-950 p-5 text-white shadow-2xl shadow-slate-950/20 sm:rounded-[2rem] sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/10 p-5 sm:rounded-3xl">
              <p className="text-sm text-slate-300">Starting price</p>
              <PriceDisplay
                usdAmount={travelPackage.priceUsd}
                usdToLkrRate={usdToLkrRate}
                theme="dark"
                size="lg"
                className="mt-3"
              />
            </div>
            <div className="rounded-2xl bg-white/10 p-5 sm:rounded-3xl">
              <p className="text-sm text-slate-300">Duration</p>
              <p className="mt-2 text-2xl font-semibold">{travelPackage.duration}</p>
            </div>
          </div>
          <h2 className="mt-8 text-2xl font-semibold">Included features</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {travelPackage.features.map((feature) => (
              <div key={feature} className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-200 sm:rounded-3xl">
                {feature}
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:rounded-[2rem] sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-950">Package overview</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            This detail page is ready for itinerary days, room categories, terms, and a
            booking checkout flow when the backend is introduced.
          </p>
          <Button href="/booking" className="mt-8 w-full">
            Enquire now
          </Button>
        </aside>
      </div>
    </div>
  );
}
