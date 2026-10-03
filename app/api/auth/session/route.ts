import { getAdminSession } from "@/lib/server/auth";

export async function GET() {
  const session = await getAdminSession();
  return session
    ? Response.json({ user: { email: session.email, role: "admin" } })
    : Response.json({ user: null }, { status: 401 });
}
