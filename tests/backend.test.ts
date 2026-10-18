import assert from "node:assert/strict";
import test from "node:test";

import { destinationFromRow, packageFromRow } from "../lib/supabase/repository";
import { MAX_IMAGE_BYTES, storagePathFromPublicUrl, validateImageFile } from "../lib/supabase/storage";
import { createSessionOnlyStorage, supabaseAuthStorageKey } from "../lib/supabase/session-storage";

test("Supabase destination rows map to application models", () => {
  const item = destinationFromRow({ slug: "ella", name: "Ella", location: "Uva", region: "Hills", summary: "Tea country", image: "/ella.jpg", price_usd: 145, duration: "3 days", best_time: "December", activities: ["Hiking"], google_maps_url: "https://maps.example" });
  assert.equal(item.slug, "ella");
  assert.equal(item.priceUsd, 145);
  assert.deepEqual(item.activities, ["Hiking"]);
});

test("Supabase package rows map to application models", () => {
  const item = packageFromRow({ slug: "coast", title: "Coast", summary: "Beach trip", image: "/coast.jpg", price_usd: 690, duration: "6 days", category: "Beach", features: ["Transfers"] });
  assert.equal(item.title, "Coast");
  assert.equal(item.price, "From $690");
});

test("catalog image validation accepts supported files within 5 MB", () => {
  assert.equal(validateImageFile({ type: "image/jpeg", size: MAX_IMAGE_BYTES }), null);
  assert.match(validateImageFile({ type: "image/gif", size: 100 }) ?? "", /JPG/);
  assert.match(validateImageFile({ type: "image/webp", size: MAX_IMAGE_BYTES + 1 }) ?? "", /5 MB/);
});

test("managed public image URLs resolve to safe Storage object paths", () => {
  assert.equal(storagePathFromPublicUrl("https://example.supabase.co/storage/v1/object/public/destination-images/packages/coast/photo.webp"), "packages/coast/photo.webp");
  assert.equal(storagePathFromPublicUrl("/images/local.jpg"), null);
});

test("admin authentication uses session-scoped storage", () => {
  const values = new Map<string, string>();
  const browserSession = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
    removeItem: (key: string) => { values.delete(key); },
  };
  const storage = createSessionOnlyStorage(browserSession);
  storage.setItem("auth", "session");
  assert.equal(storage.getItem("auth"), "session");
  storage.removeItem("auth");
  assert.equal(storage.getItem("auth"), null);
  assert.equal(supabaseAuthStorageKey("https://project-ref.supabase.co"), "sb-project-ref-auth-token");
});
