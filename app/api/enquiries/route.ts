import { createEnquiry, readDatabase, updateDatabase } from "@/lib/server/database";
import { requireAdmin } from "@/lib/server/auth";
import { cleanString, isEmail, jsonError } from "@/lib/server/http";

export async function GET() {
  if (!(await requireAdmin())) return jsonError("Unauthorized.", 401);
  const database = await readDatabase();
  return Response.json({ enquiries: database.enquiries });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const name = cleanString(body?.name, 120);
  const email = cleanString(body?.email, 200).toLowerCase();
  const phone = cleanString(body?.phone, 50);
  const subject = cleanString(body?.subject, 200);
  const message = cleanString(body?.message, 4000);
  if (!name || !isEmail(email) || !subject || message.length < 10) {
    return jsonError("Name, a valid email, subject, and a message of at least 10 characters are required.");
  }
  const enquiry = createEnquiry({ name, email, phone, subject, message });
  await updateDatabase((database) => database.enquiries.unshift(enquiry));
  return Response.json({ enquiry, message: "Your enquiry has been received." }, { status: 201 });
}
