import { requireAdmin } from "@/lib/server/auth";
import { createBooking, insertBooking, readDatabase } from "@/lib/server/database";
import { cleanString, enforceRateLimit, isEmail, isValidTravelDate, jsonError, readJsonObject } from "@/lib/server/http";

export async function GET() {
  if (!(await requireAdmin())) return jsonError("Unauthorized.", 401);
  const database = await readDatabase();
  return Response.json({ bookings: database.bookings });
}

export async function POST(request: Request) {
  const limited = enforceRateLimit(request, "booking", 10, 60 * 1000);
  if (limited) return limited;
  const body = await readJsonObject(request);
  if (!body) return jsonError("Invalid request body.");
  const name = cleanString(body?.name, 120);
  const email = cleanString(body?.email, 200).toLowerCase();
  const phone = cleanString(body?.phone, 50);
  const destination = cleanString(body?.destination, 120);
  const startPoint = cleanString(body?.startPoint, 200);
  const finishPoint = cleanString(body?.finishPoint, 200);
  const travelDate = cleanString(body?.travelDate, 20);
  const notes = cleanString(body?.notes, 2000);
  const guests = Number(body.guests);
  if (
    !name ||
    !isEmail(email) ||
    !phone ||
    !destination ||
    !startPoint ||
    !finishPoint ||
    !isValidTravelDate(travelDate) ||
    !Number.isInteger(guests) ||
    guests < 1 ||
    guests > 100
  ) {
    return jsonError("Complete all required booking fields with a valid email, current or future travel date, and 1–100 guests.");
  }
  const booking = createBooking({ name, email, phone, destination, startPoint, finishPoint, travelDate, guests, notes });
  await insertBooking(booking);
  return Response.json({ booking, message: `Booking request ${booking.id} has been received.` }, { status: 201 });
}
