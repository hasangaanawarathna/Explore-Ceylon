import type { BlogPost, Destination, NavItem, Testimonial, TravelPackage, ValueItem } from "@/types";

export const navigationItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Packages", href: "/packages" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const destinations: Destination[] = [
  {
    slug: "sigiriya",
    name: "Sigiriya",
    location: "Central Province",
    region: "Heritage Triangle",
    summary:
      "An iconic rock fortress surrounded by ancient gardens, frescoes, and panoramic views.",
    image: "/images/hero-sri-lanka.svg",
    price: "From $180",
    duration: "2 days",
    bestTime: "May to September",
    activities: ["Climb the rock fortress", "Sunrise photography", "Village cycling"],
  },
  {
    slug: "ella",
    name: "Ella",
    location: "Uva Province",
    region: "Hill Country",
    summary:
      "Railway curves, tea plantations, and cool mountain air make Ella a favorite escape.",
    image: "/images/hero-sri-lanka.svg",
    price: "From $145",
    duration: "3 days",
    bestTime: "December to April",
    activities: ["Nine Arches Bridge", "Little Adam's Peak", "Tea estate tours"],
  },
  {
    slug: "mirissa",
    name: "Mirissa",
    location: "Southern Coast",
    region: "Beaches",
    summary:
      "A relaxed coastal town with whale watching, golden beaches, and lively sunset dining.",
    image: "/images/hero-sri-lanka.svg",
    price: "From $220",
    duration: "2 days",
    bestTime: "November to April",
    activities: ["Whale watching", "Beach hopping", "Surf lessons"],
  },
  {
    slug: "kandy",
    name: "Kandy",
    location: "Central Province",
    region: "Cultural Capital",
    summary:
      "A spiritual and cultural hub with lakeside charm, temples, and traditional dance.",
    image: "/images/hero-sri-lanka.svg",
    price: "From $160",
    duration: "2 days",
    bestTime: "December to April",
    activities: ["Temple of the Tooth", "Botanical gardens", "Cultural performances"],
  },
  {
    slug: "trincomalee",
    name: "Trincomalee",
    location: "Eastern Coast",
    region: "Ocean Adventures",
    summary:
      "A broad natural harbor, calm waters, and long beaches perfect for family travel.",
    image: "/images/hero-sri-lanka.svg",
    price: "From $210",
    duration: "3 days",
    bestTime: "May to October",
    activities: ["Pigeon Island snorkeling", "Hot springs", "Beach stays"],
  },
  {
    slug: "yala",
    name: "Yala",
    location: "Southeastern Wildlife Reserve",
    region: "Safari",
    summary:
      "Lions, leopards, elephants, and migratory birds create a high-impact wildlife journey.",
    image: "/images/hero-sri-lanka.svg",
    price: "From $275",
    duration: "2 days",
    bestTime: "February to July",
    activities: ["Jeep safari", "Birdwatching", "Photography drives"],
  },
];

export const packages: TravelPackage[] = [
  {
    slug: "coast-and-culture",
    title: "Coast and Culture Escape",
    summary:
      "A balanced route through Colombo, Galle, Mirissa, and Kandy with premium stays.",
    price: "From $690",
    duration: "6 days",
    category: "Best for first-time visitors",
    image: "/images/hero-sri-lanka.svg",
    features: ["Private transfers", "4-star stays", "Guided city tours"],
  },
  {
    slug: "highland-adventure",
    title: "Highland Adventure Trail",
    summary:
      "For travelers who want tea country, scenic rail journeys, and cooler mountain air.",
    price: "From $540",
    duration: "5 days",
    category: "Nature and adventure",
    image: "/images/hero-sri-lanka.svg",
    features: ["Ella train ride", "Waterfall hikes", "Tea experiences"],
  },
  {
    slug: "wildlife-and-waves",
    title: "Wildlife and Waves Journey",
    summary:
      "Combine safari mornings with laid-back beach afternoons on a seamless route.",
    price: "From $725",
    duration: "7 days",
    category: "Family-friendly premium",
    image: "/images/hero-sri-lanka.svg",
    features: ["Safari planning", "Beach resorts", "Family support"],
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Maya Thompson",
    location: "London, United Kingdom",
    quote:
      "The itinerary felt thoughtful and premium from the first page. It made trip planning much easier.",
    rating: 5,
  },
  {
    name: "Arjun Perera",
    location: "Sydney, Australia",
    quote:
      "Clear destination details, elegant design, and a strong sense of place throughout the experience.",
    rating: 5,
  },
  {
    name: "Sofia Mendes",
    location: "Lisbon, Portugal",
    quote:
      "The curated packages are exactly the kind of guidance travelers need when exploring a new country.",
    rating: 5,
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "best-time-to-visit-sri-lanka",
    title: "When to visit Sri Lanka by region",
    excerpt:
      "Understand monsoon patterns, beach seasons, and the best months for hill country escapes.",
    category: "Travel guide",
    readTime: "5 min read",
  },
  {
    slug: "family-friendly-itineraries",
    title: "Family-friendly itineraries that work",
    excerpt:
      "A practical route structure for families who want comfort, scenery, and lower travel fatigue.",
    category: "Planning",
    readTime: "4 min read",
  },
  {
    slug: "hidden-gems-in-sri-lanka",
    title: "Hidden gems worth adding to your route",
    excerpt:
      "Go beyond the headline attractions with villages, viewpoints, and quieter coastal escapes.",
    category: "Hidden places",
    readTime: "6 min read",
  },
];

export const whyChooseUs: ValueItem[] = [
  {
    label: "01",
    title: "Curated itineraries",
    description:
      "Routes are designed to reduce friction and maximize the quality of each travel day.",
  },
  {
    label: "02",
    title: "Premium stays",
    description:
      "We showcase handpicked hotels, villas, and boutique stays with clear expectations.",
  },
  {
    label: "03",
    title: "Local knowledge",
    description:
      "The content is shaped to feel authentic and useful for foreign and local travelers alike.",
  },
  {
    label: "04",
    title: "Fast booking flow",
    description:
      "The frontend is ready for booking, enquiry, and payments once the backend is connected.",
  },
];

export function getDestinationBySlug(slug: string) {
  return destinations.find((destination) => destination.slug === slug);
}

export function getPackageBySlug(slug: string) {
  return packages.find((travelPackage) => travelPackage.slug === slug);
}