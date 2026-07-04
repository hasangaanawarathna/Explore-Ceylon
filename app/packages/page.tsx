import { PackageCard } from "@/components/PackageCard";
import { SectionTitle } from "@/components/SectionTitle";
import { packages } from "@/lib/constants";

export default function PackagesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-14 px-6 py-16 lg:px-8 lg:py-20">
      <SectionTitle
        eyebrow="Tour packages"
        title="Curated journeys built for smooth planning"
        description="Each package is designed to feel polished, practical, and easy to compare."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {packages.map((travelPackage) => (
          <PackageCard key={travelPackage.slug} travelPackage={travelPackage} />
        ))}
      </div>
    </div>
  );
}