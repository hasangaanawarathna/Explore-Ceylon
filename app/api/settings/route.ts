import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/server/auth";
import { readDatabase, updateDatabase } from "@/lib/server/database";
import { jsonError } from "@/lib/server/http";

export async function GET() {
  if (!(await requireAdmin())) return jsonError("Unauthorized.", 401);
  return Response.json({ settings: (await readDatabase()).settings });
}

export async function PATCH(request: Request) {
  if (!(await requireAdmin())) return jsonError("Unauthorized.", 401);
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body) return jsonError("Invalid request body.");
  const settings = await updateDatabase((database) => {
    if (typeof body.hideDraftPackages === "boolean") database.settings.hideDraftPackages = body.hideDraftPackages;
    if (typeof body.requireContentReview === "boolean") database.settings.requireContentReview = body.requireContentReview;
    const threshold = Number(body.bookingApprovalThresholdUsd);
    if (Number.isFinite(threshold) && threshold >= 0) database.settings.bookingApprovalThresholdUsd = threshold;
    if (body.homeHero && typeof body.homeHero === "object") {
      const hero = body.homeHero as Record<string, unknown>;
      if (typeof hero.title === "string" && hero.title.trim()) database.settings.homeHero.title = hero.title.trim().slice(0, 120);
      if (typeof hero.description === "string" && hero.description.trim()) database.settings.homeHero.description = hero.description.trim().slice(0, 500);
      if (typeof hero.autoRotate === "boolean") database.settings.homeHero.autoRotate = hero.autoRotate;
      const interval = Number(hero.rotationIntervalSeconds);
      if (Number.isFinite(interval) && interval >= 10 && interval <= 3600) database.settings.homeHero.rotationIntervalSeconds = interval;
      if (Array.isArray(hero.images)) {
        const images = hero.images.filter((image): image is string =>
          typeof image === "string" && image.startsWith("/images/")
        ).slice(0, 8);
        if (images.length) database.settings.homeHero.images = images;
      }
    }
    return database.settings;
  });
  revalidatePath("/");
  return Response.json({ settings });
}
