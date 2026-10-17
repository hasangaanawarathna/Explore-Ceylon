"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/Hero";
import { getSettings } from "@/lib/supabase/repository";
import type { SiteSettings } from "@/lib/server/models";

export function DynamicHero({ initial }: { initial: SiteSettings["homeHero"] }) {
  const [hero, setHero] = useState(initial);
  useEffect(() => { getSettings().then((settings) => setHero(settings.homeHero)).catch(() => undefined); }, []);
  return <Hero eyebrow="Premium travel experiences in Sri Lanka" title={hero.title} description={hero.description} images={hero.images} autoRotate={hero.autoRotate} rotationIntervalSeconds={hero.rotationIntervalSeconds} primaryCta={{ label: "Search tours", href: "/destinations" }} secondaryCta={{ label: "Explore packages", href: "/packages" }} />;
}
