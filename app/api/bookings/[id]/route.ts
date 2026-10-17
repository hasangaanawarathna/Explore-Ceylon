import { requireAdmin } from "@/lib/server/auth";
import { updateRecordStatus } from "@/lib/server/database";
import { cleanString, jsonError } from "@/lib/server/http";
import type { BookingStatus } from "@/lib/server/models";

const statuses: BookingStatus[] = ["pending", "approved", "paid", "completed", "cancelled"];

export async function PATCH(request: Request, context: RouteContext<"/api/bookings/[id]">) {
  if (!(await requireAdmin())) return jsonError("Unauthorized.", 401);
  const { id } = await context.params;
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const status = cleanString(body?.status) as BookingStatus;
  if (!statuses.includes(status)) return jsonError("Invalid booking status.");
  const booking = await updateRecordStatus("bookings", id, status);
  return booking ? Response.json({ booking }) : jsonError("Booking not found.", 404);
}
