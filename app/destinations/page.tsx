import { DestinationCard } from "@/components/DestinationCard";
import { SearchBar } from "@/components/SearchBar";
import { SectionTitle } from "@/components/SectionTitle";
import { destinations } from "@/lib/constants";

export default function DestinationsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-14 px-6 py-16 lg:px-8 lg:py-20">
      <SectionTitle
        eyebrow="Destinations"
        title="Browse the places that make Sri Lanka unforgettable"
        description="Use the search panel to explore the island by season, style, and travel goals."
      />
      <SearchBar />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {destinations.map((destination) => (
          <DestinationCard key={destination.slug} destination={destination} />
        ))}
      </div>
    </div>
  );
}