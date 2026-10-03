import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

import { destinations, packages } from "@/lib/constants";
import type { Booking, Database, Enquiry } from "@/lib/server/models";

const dataDirectory = process.env.DATA_DIRECTORY
  ? path.resolve(process.env.DATA_DIRECTORY)
  : path.join(process.cwd(), "data");
const databasePath = path.join(dataDirectory, "explore-ceylon.json");
let writeQueue = Promise.resolve();

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
    },
  };
}

async function ensureDatabase() {
  await mkdir(dataDirectory, { recursive: true });
  try {
    await readFile(databasePath, "utf8");
  } catch {
    await writeFile(databasePath, JSON.stringify(seedDatabase(), null, 2), "utf8");
  }
}

export async function readDatabase(): Promise<Database> {
  await ensureDatabase();
  return JSON.parse(await readFile(databasePath, "utf8")) as Database;
}

export async function updateDatabase<T>(mutate: (database: Database) => T | Promise<T>): Promise<T> {
  let result!: T;
  const operation = writeQueue.then(async () => {
    const database = await readDatabase();
    result = await mutate(database);
    const temporaryPath = `${databasePath}.tmp`;
    await writeFile(temporaryPath, JSON.stringify(database, null, 2), "utf8");
    await rename(temporaryPath, databasePath);
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
