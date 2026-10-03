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
    return database.settings;
  });
  return Response.json({ settings });
}
