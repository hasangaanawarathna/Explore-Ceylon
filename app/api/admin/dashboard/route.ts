import { requireAdmin } from "@/lib/server/auth";
import { readDatabase } from "@/lib/server/database";
import { jsonError } from "@/lib/server/http";

export async function GET() {
  if (!(await requireAdmin())) return jsonError("Unauthorized.", 401);
  const database = await readDatabase();
  return Response.json({
    counts: {
      newEnquiries: database.enquiries.filter((item) => item.status === "new").length,
      openBookings: database.bookings.filter((item) => !["completed", "cancelled"].includes(item.status)).length,
      confirmedTrips: database.bookings.filter((item) => ["approved", "paid"].includes(item.status)).length,
      destinations: database.destinations.length,
      packages: database.packages.length,
    },
    recentEnquiries: database.enquiries.slice(0, 10),
    recentBookings: database.bookings.slice(0, 10),
  });
}
