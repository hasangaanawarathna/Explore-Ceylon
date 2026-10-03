import { cookies } from "next/headers";
import { sessionCookie } from "@/lib/server/auth";

export async function POST() {
  (await cookies()).delete(sessionCookie.name);
  return Response.json({ ok: true });
}
