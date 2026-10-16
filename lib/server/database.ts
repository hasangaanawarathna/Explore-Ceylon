import { randomUUID } from "node:crypto";
import { mkdir, open, readFile, rename, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import { destinations, packages } from "@/lib/constants";
import type { Booking, Database, Enquiry } from "@/lib/server/models";

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

export async function readDatabase(): Promise<Database> {
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

export async function updateDatabase<T>(mutate: (database: Database) => T | Promise<T>): Promise<T> {
  let result!: T;
  const operation = writeQueue.then(async () => {
    const releaseLock = await acquireWriteLock();
    const temporaryPath = `${databasePath}.${process.pid}.${randomUUID()}.tmp`;
    try {
      const database = await readDatabase();
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

export function createEnquiry(input: Omit<Enquiry, "id" | "status" | "createdAt" | "updatedAt">): Enquiry {
  const now = new Date().toISOString();
  return { ...input, id: `ENQ-${randomUUID().slice(0, 8).toUpperCase()}`, status: "new", createdAt: now, updatedAt: now };
}

export function createBooking(input: Omit<Booking, "id" | "status" | "createdAt" | "updatedAt">): Booking {
  const now = new Date().toISOString();
  return { ...input, id: `EC-${randomUUID().slice(0, 8).toUpperCase()}`, status: "pending", createdAt: now, updatedAt: now };
}
