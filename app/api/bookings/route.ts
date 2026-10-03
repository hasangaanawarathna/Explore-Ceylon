import { requireAdmin } from "@/lib/server/auth";
import { createBooking, readDatabase, updateDatabase } from "@/lib/server/database";
import { cleanString, isEmail, jsonError } from "@/lib/server/http";

export async function GET() {
  if (!(await requireAdmin())) return jsonError("Unauthorized.", 401);
  const database = await readDatabase();
  return Response.json({ bookings: database.bookings });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const name = cleanString(body?.name, 120);
  const email = cleanString(body?.email, 200).toLowerCase();
  const phone = cleanString(body?.phone, 50);
  const destination = cleanString(body?.destination, 120);
  const startPoint = cleanString(body?.startPoint, 200);
  const finishPoint = cleanString(body?.finishPoint, 200);
  const travelDate = cleanString(body?.travelDate, 20);
  const notes = cleanString(body?.notes, 2000);
  const guests = Math.max(1, Math.min(100, Number(body?.guests) || 1));
  if (!name || !isEmail(email) || !phone || !destination || !startPoint || !finishPoint || !/^\d{4}-\d{2}-\d{2}$/.test(travelDate)) {
    return jsonError("Complete all required booking fields with a valid email and travel date.");
  }
  const booking = createBooking({ name, email, phone, destination, startPoint, finishPoint, travelDate, guests, notes });
  await updateDatabase((database) => database.bookings.unshift(booking));
  return Response.json({ booking, message: `Booking request ${booking.id} has been received.` }, { status: 201 });
}
