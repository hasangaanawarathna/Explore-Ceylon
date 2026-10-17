"use client";

import { createClient } from "@/lib/supabase/client";
import type { Booking, Enquiry, SiteSettings } from "@/lib/server/models";
import type { Destination, TravelPackage } from "@/types";

type Row = Record<string, unknown>;

export const destinationFromRow = (row: Row): Destination => ({ slug: String(row.slug), name: String(row.name), location: String(row.location), region: String(row.region), summary: String(row.summary), image: String(row.image), price: `From $${Number(row.price_usd)}`, priceUsd: Number(row.price_usd), duration: String(row.duration), bestTime: String(row.best_time), activities: (row.activities as string[]) ?? [], googleMapsUrl: String(row.google_maps_url) });
export const packageFromRow = (row: Row): TravelPackage => ({ slug: String(row.slug), title: String(row.title), summary: String(row.summary), image: String(row.image), price: `From $${Number(row.price_usd)}`, priceUsd: Number(row.price_usd), duration: String(row.duration), category: String(row.category), features: (row.features as string[]) ?? [] });
export const bookingFromRow = (row: Row): Booking => ({ id: String(row.id), name: String(row.name), email: String(row.email), phone: String(row.phone), destination: String(row.destination), startPoint: String(row.start_point), finishPoint: String(row.finish_point), travelDate: String(row.travel_date), guests: Number(row.guests), notes: String(row.notes ?? ""), status: row.status as Booking["status"], createdAt: String(row.created_at), updatedAt: String(row.updated_at) });
export const enquiryFromRow = (row: Row): Enquiry => ({ id: String(row.id), name: String(row.name), email: String(row.email), phone: String(row.phone ?? ""), subject: String(row.subject), message: String(row.message), status: row.status as Enquiry["status"], createdAt: String(row.created_at), updatedAt: String(row.updated_at) });

export async function getCatalog() {
  const supabase = createClient();
  const [destinations, packages] = await Promise.all([
    supabase.from("destinations").select("*").order("sort_order"),
    supabase.from("travel_packages").select("*").order("sort_order"),
  ]);
  if (destinations.error) throw destinations.error;
  if (packages.error) throw packages.error;
  return { destinations: (destinations.data ?? []).map(destinationFromRow), packages: (packages.data ?? []).map(packageFromRow) };
}

export async function getSettings() {
  const { data, error } = await createClient().from("site_settings").select("value").eq("key", "main").single();
  if (error) throw error;
  return data.value as SiteSettings;
}

export async function assertAdmin() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  const { data } = await supabase.from("admin_profiles").select("role").eq("user_id", user.id).eq("is_active", true).maybeSingle();
  return data ? user : null;
}

export function publicId(prefix: "EC" | "ENQ") {
  return `${prefix}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}
