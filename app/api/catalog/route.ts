import { deleteCatalogItem, readDatabase, saveCatalogItem } from "@/lib/server/database";
import { requireAdmin } from "@/lib/server/auth";
import { cleanString, jsonError, readJsonObject } from "@/lib/server/http";
import type { Destination, TravelPackage } from "@/types";
import { revalidatePath } from "next/cache";

export async function GET() {
  const database = await readDatabase();
  return Response.json({ destinations: database.destinations, packages: database.packages });
}

function parseItem(body: Record<string, unknown>): { kind: "destinations"; item: Destination } | { kind: "packages"; item: TravelPackage } | null {
  const kind: "destinations" | "packages" | null = body.kind === "destinations" || body.kind === "packages" ? body.kind : null;
  const item = body.item && typeof body.item === "object" ? body.item as Record<string, unknown> : null;
  if (!kind || !item) return null;
  const slug = cleanString(item.slug, 100);
  const summary = cleanString(item.summary, 1000);
  const image = cleanString(item.image, 500);
  const duration = cleanString(item.duration, 100);
  const priceUsd = Number(item.priceUsd);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !summary || !image || !duration || !Number.isFinite(priceUsd) || priceUsd < 0) return null;
  if (kind === "destinations") {
    const destination: Destination = { slug, summary, image, duration, priceUsd, price: `From $${priceUsd}`, name: cleanString(item.name, 120), location: cleanString(item.location, 160), region: cleanString(item.region, 160), bestTime: cleanString(item.bestTime, 160), activities: Array.isArray(item.activities) ? item.activities.map((value) => cleanString(value, 160)).filter(Boolean).slice(0, 20) : [], googleMapsUrl: cleanString(item.googleMapsUrl, 500) };
    return destination.name && destination.location && destination.region && destination.bestTime && destination.googleMapsUrl ? { kind, item: destination } : null;
  }
  const travelPackage: TravelPackage = { slug, summary, image, duration, priceUsd, price: `From $${priceUsd}`, title: cleanString(item.title, 160), category: cleanString(item.category, 160), features: Array.isArray(item.features) ? item.features.map((value) => cleanString(value, 160)).filter(Boolean).slice(0, 20) : [] };
  return travelPackage.title && travelPackage.category ? { kind, item: travelPackage } : null;
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) return jsonError("Unauthorized.", 401);
  const body = await readJsonObject(request);
  const parsed = body && parseItem(body);
  if (!parsed) return jsonError("Invalid catalog item.");
  await saveCatalogItem(parsed.kind, parsed.item);
  revalidatePath("/");
  revalidatePath(parsed.kind === "destinations" ? "/destinations" : "/packages");
  revalidatePath(`/${parsed.kind}/${parsed.item.slug}`);
  return Response.json({ item: parsed.item }, { status: 201 });
}

export const PATCH = POST;

export async function DELETE(request: Request) {
  if (!(await requireAdmin())) return jsonError("Unauthorized.", 401);
  const body = await readJsonObject(request, 2048);
  const kind = body?.kind === "destinations" || body?.kind === "packages" ? body.kind : null;
  const slug = cleanString(body?.slug, 100);
  if (!kind || !slug) return jsonError("A valid catalog type and slug are required.");
  await deleteCatalogItem(kind, slug);
  revalidatePath("/");
  revalidatePath(kind === "destinations" ? "/destinations" : "/packages");
  revalidatePath(`/${kind}/${slug}`);
  return Response.json({ ok: true });
}
