import { notFound } from "next/navigation";

import { Button } from "@/components/Button";
import { SectionTitle } from "@/components/SectionTitle";
import { getPackageBySlug } from "@/lib/constants";

interface PackageDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PackageDetailsPage({ params }: PackageDetailsPageProps) {
  const { slug } = await params;
  const travelPackage = getPackageBySlug(slug);

  if (!travelPackage) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-14 px-6 py-16 lg:px-8 lg:py-20">
      <SectionTitle
        eyebrow={travelPackage.category}
        title={travelPackage.title}
        description={travelPackage.summary}
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
        <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-950/20">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/10 p-5">
              <p className="text-sm text-slate-300">Starting price</p>
              <p className="mt-2 text-2xl font-semibold">{travelPackage.price}</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-5">
              <p className="text-sm text-slate-300">Duration</p>
              <p className="mt-2 text-2xl font-semibold">{travelPackage.duration}</p>
            </div>
          </div>
          <h2 className="mt-8 text-2xl font-semibold">Included features</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {travelPackage.features.map((feature) => (
              <div key={feature} className="rounded-3xl bg-white/5 px-4 py-3 text-sm text-slate-200">
                {feature}
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
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