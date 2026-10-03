import { requireAdmin } from "@/lib/server/auth";
import { updateDatabase } from "@/lib/server/database";
import { cleanString, jsonError } from "@/lib/server/http";
import type { EnquiryStatus } from "@/lib/server/models";

const statuses: EnquiryStatus[] = ["new", "contacted", "quoted", "won", "closed"];

export async function PATCH(request: Request, context: RouteContext<"/api/enquiries/[id]">) {
  if (!(await requireAdmin())) return jsonError("Unauthorized.", 401);
  const { id } = await context.params;
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const status = cleanString(body?.status) as EnquiryStatus;
  if (!statuses.includes(status)) return jsonError("Invalid enquiry status.");
  const enquiry = await updateDatabase((database) => {
    const item = database.enquiries.find((candidate) => candidate.id === id);
    if (item) Object.assign(item, { status, updatedAt: new Date().toISOString() });
    return item;
  });
  return enquiry ? Response.json({ enquiry }) : jsonError("Enquiry not found.", 404);
}
