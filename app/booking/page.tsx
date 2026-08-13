import { RoutePlanner } from "@/components/RoutePlanner";
import { SectionTitle } from "@/components/SectionTitle";
import { destinations, popularStartPoints, restaurantStops } from "@/lib/constants";

export default function BookingPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-14 px-6 py-16 lg:px-8 lg:py-20">
      <SectionTitle
        eyebrow="Route planner"
        title="Choose your location and build the way there"
        description="Select a destination, add your start and finishing points, then preview a driving route with restaurant breaks included."
      />
      <RoutePlanner
        destinations={destinations}
        popularStartPoints={popularStartPoints}
        restaurantStops={restaurantStops}
      />
    </div>
  );
}
