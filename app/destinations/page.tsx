import { DestinationCard } from "@/components/DestinationCard";
import { SearchBar } from "@/components/SearchBar";
import { SectionTitle } from "@/components/SectionTitle";
import { destinations } from "@/lib/constants";
import { getUsdToLkrRate } from "@/lib/utils";

export default async function DestinationsPage() {
  const usdToLkrRate = await getUsdToLkrRate();

  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-4 py-12 sm:space-y-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <SectionTitle
        eyebrow="Destinations"
        title="Browse the places that make Sri Lanka unforgettable"
        description="Use the search panel to explore the island by season, style, and travel goals."
      />
      <SearchBar />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.slug}
            destination={destination}
            usdToLkrRate={usdToLkrRate}
          />
        ))}
      </div>
    </div>
  );
}
