import assert from "node:assert/strict";
import { rm } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { verifyAdminCredentials } from "../lib/server/auth";
import { isEmail, isValidTravelDate, readJsonObject } from "../lib/server/http";

test("email and travel-date validation rejects malformed input", () => {
  assert.equal(isEmail("traveller@example.com"), true);
  assert.equal(isEmail("not-an-email"), false);
  assert.equal(isValidTravelDate("2026-99-99"), false);
  assert.equal(isValidTravelDate("not-a-date"), false);
  assert.equal(isValidTravelDate("2099-12-31"), true);
});

test("JSON request parsing enforces object and size limits", async () => {
  const valid = new Request("http://localhost/api/test", {
    method: "POST",
    body: JSON.stringify({ name: "Test" }),
  });
  assert.deepEqual(await readJsonObject(valid, 1_024), { name: "Test" });

  const array = new Request("http://localhost/api/test", {
    method: "POST",
    body: JSON.stringify(["invalid"]),
  });
  assert.equal(await readJsonObject(array, 1_024), null);

  const oversized = new Request("http://localhost/api/test", {
    method: "POST",
    body: JSON.stringify({ value: "x".repeat(100) }),
  });
  assert.equal(await readJsonObject(oversized, 20), null);
});

test("admin credentials are checked against configured values", () => {
  const environment = process.env as Record<string, string | undefined>;
  const previous = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    nodeEnv: process.env.NODE_ENV,
  };
  environment.NODE_ENV = "test";
  process.env.ADMIN_EMAIL = "owner@example.com";
  process.env.ADMIN_PASSWORD = "long-test-password";
  try {
    assert.equal(verifyAdminCredentials("owner@example.com", "long-test-password"), true);
    assert.equal(verifyAdminCredentials("owner@example.com", "wrong"), false);
  } finally {
    process.env.ADMIN_EMAIL = previous.email;
    process.env.ADMIN_PASSWORD = previous.password;
    environment.NODE_ENV = previous.nodeEnv;
  }
});

test("database creates and persists records in an isolated directory", async () => {
  const directory = path.join(process.cwd(), ".tmp", `backend-test-${process.pid}`);
  process.env.DATA_DIRECTORY = directory;
  try {
    const { createEnquiry, readDatabase, updateDatabase } = await import("../lib/server/database");
    const enquiry = createEnquiry({
      name: "Test Traveller",
      email: "traveller@example.com",
      phone: "",
      subject: "Test enquiry",
      message: "This is a test enquiry message.",
    });
    await updateDatabase((database) => database.enquiries.push(enquiry));
    const database = await readDatabase();
    assert.equal(database.enquiries.length, 1);
    assert.equal(database.enquiries[0]?.id, enquiry.id);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
