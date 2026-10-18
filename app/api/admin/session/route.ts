import { cookies } from "next/headers";

import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/server/admin-auth";

export async function GET() {
  try {
    const session = await verifyAdminSession((await cookies()).get(ADMIN_SESSION_COOKIE)?.value);
    if (!session) return Response.json({ authenticated: false }, { status: 401 });
    return Response.json({ authenticated: true, email: session.email });
  } catch {
    return Response.json({ authenticated: false }, { status: 401 });
  }
}
