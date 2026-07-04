export type NavItem = {
  label: string;
  href: string;
};

export type Destination = {
  slug: string;
  name: string;
  location: string;
  region: string;
  summary: string;
  image: string;
  price: string;
  duration: string;
  bestTime: string;
  activities: string[];
};

export type TravelPackage = {
  slug: string;
  title: string;
  summary: string;
  price: string;
  duration: string;
  category: string;
  image: string;
  features: string[];
};

export type Testimonial = {
  name: string;
  location: string;
  quote: string;
  rating: number;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
};

export type ValueItem = {
  label: string;
  title: string;
  description: string;
};