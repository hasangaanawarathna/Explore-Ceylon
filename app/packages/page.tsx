import { DynamicPackages } from "@/components/DynamicCatalogGrid";
import { SectionTitle } from "@/components/SectionTitle";
import { packages } from "@/lib/constants";
import { getUsdToLkrRate } from "@/lib/utils";

export default async function PackagesPage() {
  const usdToLkrRate = await getUsdToLkrRate();

  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-4 py-12 sm:space-y-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <SectionTitle
        eyebrow="Tour packages"
        title="Curated journeys built for smooth planning"
        description="Each package is designed to feel polished, practical, and easy to compare."
      />
      <DynamicPackages initial={packages} usdToLkrRate={usdToLkrRate} />
    </div>
  );
}
