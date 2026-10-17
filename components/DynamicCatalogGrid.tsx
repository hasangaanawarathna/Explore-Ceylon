"use client";

import { useEffect, useState } from "react";
import { DestinationCard } from "@/components/DestinationCard";
import { PackageCard } from "@/components/PackageCard";
import { getCatalog } from "@/lib/supabase/repository";
import type { Destination, TravelPackage } from "@/types";

export function DynamicDestinations({ initial, usdToLkrRate, limit }: { initial: Destination[]; usdToLkrRate: number; limit?: number }) {
  const [items, setItems] = useState(initial);
  useEffect(() => { getCatalog().then((data) => setItems(data.destinations)).catch(() => undefined); }, []);
  return <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{items.slice(0, limit).map((item) => <DestinationCard key={item.slug} destination={item} usdToLkrRate={usdToLkrRate} />)}</div>;
}

export function DynamicPackages({ initial, usdToLkrRate, limit }: { initial: TravelPackage[]; usdToLkrRate: number; limit?: number }) {
  const [items, setItems] = useState(initial);
  useEffect(() => { getCatalog().then((data) => setItems(data.packages)).catch(() => undefined); }, []);
  return <div className="grid gap-6 lg:grid-cols-3">{items.slice(0, limit).map((item) => <PackageCard key={item.slug} travelPackage={item} usdToLkrRate={usdToLkrRate} />)}</div>;
}
