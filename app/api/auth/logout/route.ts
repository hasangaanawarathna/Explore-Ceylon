import { cookies } from "next/headers";
import { sessionCookie } from "@/lib/server/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient as createSupabaseClient } from "@/lib/supabase/server";

export async function POST() {
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseClient();
    await supabase.auth.signOut();
  }
  (await cookies()).delete(sessionCookie.name);
  return Response.json({ ok: true });
}
