import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured, requireSupabaseConfig } from "@/lib/supabase/config";

export async function updateSession(request: NextRequest) {
  if (!isSupabaseConfigured()) return NextResponse.next({ request });
  const { url, publishableKey } = requireSupabaseConfig();
  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });
  await supabase.auth.getUser();
  return response;
}
