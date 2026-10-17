import { randomUUID } from "node:crypto";
import { mkdir, open, readFile, rename, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import { destinations, packages } from "@/lib/constants";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient as createSupabaseClient } from "@/lib/supabase/server";
import type { Booking, Database, Enquiry } from "@/lib/server/models";
import type { Destination, TravelPackage } from "@/types";

export const defaultHomeHero = {
  title: "Discover the Hidden Beauty of Sri Lanka",
  description:
    "Plan coastal escapes, hill-country retreats, wildlife journeys, and family adventures with curated itineraries built for memorable, low-friction travel.",
  images: [
    "/images/ui/ceylon-coast-palms.jpg",
    "/images/ui/ceylon-rail-hills.jpg",
    "/images/ui/ceylon-temple-lights.jpg",
  ],
  autoRotate: true,
  rotationIntervalSeconds: 120,
};

const dataDirectory = process.env.DATA_DIRECTORY
  ? path.resolve(process.env.DATA_DIRECTORY)
  : path.join(process.cwd(), "data");
const databasePath = path.join(dataDirectory, "explore-ceylon.json");
const lockPath = `${databasePath}.lock`;
let writeQueue = Promise.resolve();

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function validateDatabase(value: unknown): asserts value is Database {
  if (
    !isRecord(value) ||
    !Array.isArray(value.destinations) ||
    !Array.isArray(value.packages) ||
    !Array.isArray(value.enquiries) ||
    !Array.isArray(value.bookings) ||
    !isRecord(value.settings)
  ) {
    throw new Error(`Database at ${databasePath} has an invalid or unsupported schema.`);
  }
}

async function delay(milliseconds: number) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function acquireWriteLock() {
  await mkdir(dataDirectory, { recursive: true });
  const startedAt = Date.now();
  while (Date.now() - startedAt < 10_000) {
    try {
      const handle = await open(lockPath, "wx");
      return async () => {
        await handle.close();
        await unlink(lockPath).catch(() => undefined);
      };
    } catch (error) {
      if (!isNodeError(error) || error.code !== "EEXIST") throw error;
      const lockAge = await stat(lockPath)
        .then((details) => Date.now() - details.mtimeMs)
        .catch(() => 0);
      if (lockAge > 30_000) await unlink(lockPath).catch(() => undefined);
      await delay(50);
    }
  }
  throw new Error("Timed out waiting for the database write lock.");
}

function seedDatabase(): Database {
  return {
    destinations,
    packages,
    enquiries: [],
    bookings: [],
    settings: {
      bookingApprovalThresholdUsd: 1000,
      hideDraftPackages: true,
      requireContentReview: true,
      homeHero: defaultHomeHero,
    },
  };
}

async function ensureDatabase() {
  await mkdir(dataDirectory, { recursive: true });
  try {
    await readFile(databasePath, "utf8");
  } catch (error) {
    if (!isNodeError(error) || error.code !== "ENOENT") throw error;
    await writeFile(databasePath, JSON.stringify(seedDatabase(), null, 2), "utf8");
  }
}

async function readLocalDatabase(): Promise<Database> {
  await ensureDatabase();
  const parsed: unknown = JSON.parse(await readFile(databasePath, "utf8"));
  validateDatabase(parsed);
  const database = parsed;
  if (!isRecord(database.settings.homeHero)) database.settings.homeHero = defaultHomeHero;
  database.settings.homeHero = {
    ...defaultHomeHero,
    ...database.settings.homeHero,
    images: database.settings.homeHero?.images?.length
      ? database.settings.homeHero.images
      : defaultHomeHero.images,
  };
  return database;
}

function destinationFromRow(row: Record<string, unknown>): Destination {
  return {
    slug: String(row.slug), name: String(row.name), location: String(row.location),
    region: String(row.region), summary: String(row.summary), image: String(row.image),
    price: `From $${Number(row.price_usd)}`, priceUsd: Number(row.price_usd),
    duration: String(row.duration), bestTime: String(row.best_time),
    activities: (row.activities as string[]) ?? [], googleMapsUrl: String(row.google_maps_url),
  };
}

function packageFromRow(row: Record<string, unknown>): TravelPackage {
  return {
    slug: String(row.slug), title: String(row.title), summary: String(row.summary),
    price: `From $${Number(row.price_usd)}`, priceUsd: Number(row.price_usd),
    duration: String(row.duration), category: String(row.category), image: String(row.image),
    features: (row.features as string[]) ?? [],
  };
}

function enquiryFromRow(row: Record<string, unknown>): Enquiry {
  return { id: String(row.id), name: String(row.name), email: String(row.email), phone: String(row.phone ?? ""), subject: String(row.subject), message: String(row.message), status: row.status as Enquiry["status"], createdAt: String(row.created_at), updatedAt: String(row.updated_at) };
}

function bookingFromRow(row: Record<string, unknown>): Booking {
  return { id: String(row.id), name: String(row.name), email: String(row.email), phone: String(row.phone), destination: String(row.destination), startPoint: String(row.start_point), finishPoint: String(row.finish_point), travelDate: String(row.travel_date), guests: Number(row.guests), notes: String(row.notes ?? ""), status: row.status as Booking["status"], createdAt: String(row.created_at), updatedAt: String(row.updated_at) };
}

export async function readDatabase(): Promise<Database> {
  if (!isSupabaseConfigured()) return readLocalDatabase();
  const supabase = await createSupabaseClient();
  const [destinationResult, packageResult, enquiryResult, bookingResult, settingsResult] = await Promise.all([
    supabase.from("destinations").select("*").order("sort_order"),
    supabase.from("travel_packages").select("*").order("sort_order"),
    supabase.from("enquiries").select("*").order("created_at", { ascending: false }),
    supabase.from("bookings").select("*").order("created_at", { ascending: false }),
    supabase.from("site_settings").select("value").eq("key", "main").maybeSingle(),
  ]);
  const error = destinationResult.error ?? packageResult.error ?? settingsResult.error;
  if (error) throw new Error(`Supabase database read failed: ${error.message}`);
  const storedSettings = (settingsResult.data?.value ?? {}) as Partial<Database["settings"]>;
  return {
    destinations: (destinationResult.data ?? []).map((row) => destinationFromRow(row)),
    packages: (packageResult.data ?? []).map((row) => packageFromRow(row)),
    // Public sessions cannot read customer records; RLS intentionally returns no data.
    enquiries: (enquiryResult.data ?? []).map((row) => enquiryFromRow(row)),
    bookings: (bookingResult.data ?? []).map((row) => bookingFromRow(row)),
    settings: { ...seedDatabase().settings, ...storedSettings, homeHero: { ...defaultHomeHero, ...storedSettings.homeHero } },
  };
}

export async function updateDatabase<T>(mutate: (database: Database) => T | Promise<T>): Promise<T> {
  let result!: T;
  const operation = writeQueue.then(async () => {
    const releaseLock = await acquireWriteLock();
    const temporaryPath = `${databasePath}.${process.pid}.${randomUUID()}.tmp`;
    try {
      const database = await readLocalDatabase();
      result = await mutate(database);
      await writeFile(temporaryPath, JSON.stringify(database, null, 2), "utf8");
      await rename(temporaryPath, databasePath);
    } finally {
      await unlink(temporaryPath).catch(() => undefined);
      await releaseLock();
    }
  });
  writeQueue = operation.catch(() => undefined);
  await operation;
  return result;
}

export async function insertEnquiry(enquiry: Enquiry) {
  if (!isSupabaseConfigured()) return updateDatabase((database) => database.enquiries.unshift(enquiry));
  const supabase = await createSupabaseClient();
  const { error } = await supabase.from("enquiries").insert({ id: enquiry.id, name: enquiry.name, email: enquiry.email, phone: enquiry.phone || null, subject: enquiry.subject, message: enquiry.message, status: enquiry.status });
  if (error) throw new Error(`Could not save enquiry: ${error.message}`);
}

export async function insertBooking(booking: Booking) {
  if (!isSupabaseConfigured()) return updateDatabase((database) => database.bookings.unshift(booking));
  const supabase = await createSupabaseClient();
  const { error } = await supabase.from("bookings").insert({ id: booking.id, name: booking.name, email: booking.email, phone: booking.phone, destination: booking.destination, start_point: booking.startPoint, finish_point: booking.finishPoint, travel_date: booking.travelDate, guests: booking.guests, notes: booking.notes || null, status: booking.status });
  if (error) throw new Error(`Could not save booking: ${error.message}`);
}

export async function updateRecordStatus(kind: "bookings" | "enquiries", id: string, status: string) {
  if (!isSupabaseConfigured()) return updateDatabase((database) => {
    const collection = kind === "bookings" ? database.bookings : database.enquiries;
    const item = collection.find((candidate) => candidate.id === id);
    if (item) Object.assign(item, { status, updatedAt: new Date().toISOString() });
    return item;
  });
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase.from(kind).update({ status }).eq("id", id).select().maybeSingle();
  if (error) throw new Error(`Could not update ${kind}: ${error.message}`);
  if (!data) return undefined;
  return kind === "bookings" ? bookingFromRow(data) : enquiryFromRow(data);
}

export async function updateSiteSettings(settings: Database["settings"]) {
  if (!isSupabaseConfigured()) return updateDatabase((database) => Object.assign(database.settings, settings));
  const supabase = await createSupabaseClient();
  const { error } = await supabase.from("site_settings").upsert({ key: "main", value: settings });
  if (error) throw new Error(`Could not update settings: ${error.message}`);
  return settings;
}

export async function saveCatalogItem(kind: "destinations" | "packages", item: Destination | TravelPackage) {
  if (!isSupabaseConfigured()) return updateDatabase((database) => {
    const collection = kind === "destinations" ? database.destinations : database.packages;
    const index = collection.findIndex((candidate) => candidate.slug === item.slug);
    if (index >= 0) Object.assign(collection[index], item);
    else (collection as Array<Destination | TravelPackage>).push(item);
    return item;
  });
  const supabase = await createSupabaseClient();
  const { error } = kind === "destinations"
    ? await supabase.from("destinations").upsert({ slug: item.slug, name: (item as Destination).name, location: (item as Destination).location, region: (item as Destination).region, summary: item.summary, image: item.image, price_usd: item.priceUsd, duration: item.duration, best_time: (item as Destination).bestTime, activities: (item as Destination).activities, google_maps_url: (item as Destination).googleMapsUrl, is_published: true }, { onConflict: "slug" })
    : await supabase.from("travel_packages").upsert({ slug: item.slug, title: (item as TravelPackage).title, summary: item.summary, image: item.image, price_usd: item.priceUsd, duration: item.duration, category: (item as TravelPackage).category, features: (item as TravelPackage).features, is_published: true }, { onConflict: "slug" });
  if (error) throw new Error(`Could not save catalog item: ${error.message}`);
  return item;
}

export async function deleteCatalogItem(kind: "destinations" | "packages", slug: string) {
  if (!isSupabaseConfigured()) return updateDatabase((database) => {
    if (kind === "destinations") database.destinations = database.destinations.filter((item) => item.slug !== slug);
    else database.packages = database.packages.filter((item) => item.slug !== slug);
  });
  const supabase = await createSupabaseClient();
  const table = kind === "destinations" ? "destinations" : "travel_packages";
  const { error } = await supabase.from(table).delete().eq("slug", slug);
  if (error) throw new Error(`Could not delete catalog item: ${error.message}`);
}

export function createEnquiry(input: Omit<Enquiry, "id" | "status" | "createdAt" | "updatedAt">): Enquiry {
  const now = new Date().toISOString();
  return { ...input, id: `ENQ-${randomUUID().slice(0, 8).toUpperCase()}`, status: "new", createdAt: now, updatedAt: now };
}

export function createBooking(input: Omit<Booking, "id" | "status" | "createdAt" | "updatedAt">): Booking {
  const now = new Date().toISOString();
  return { ...input, id: `EC-${randomUUID().slice(0, 8).toUpperCase()}`, status: "pending", createdAt: now, updatedAt: now };
}
