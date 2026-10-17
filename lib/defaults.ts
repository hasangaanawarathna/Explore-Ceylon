import type { SiteSettings } from "@/lib/server/models";

export const defaultHomeHero: SiteSettings["homeHero"] = {
  title: "Discover the Hidden Beauty of Sri Lanka",
  description: "Plan coastal escapes, hill-country retreats, wildlife journeys, and family adventures with curated itineraries built for memorable, low-friction travel.",
  images: ["/images/ui/ceylon-coast-palms.jpg", "/images/ui/ceylon-rail-hills.jpg", "/images/ui/ceylon-temple-lights.jpg"],
  autoRotate: true,
  rotationIntervalSeconds: 120,
};
