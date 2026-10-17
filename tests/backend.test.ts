import assert from "node:assert/strict";
import test from "node:test";

import { destinationFromRow, packageFromRow } from "../lib/supabase/repository";

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
