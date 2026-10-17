"use client";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { requireSupabaseConfig } from "@/lib/supabase/config";

// The SQL migrations are the schema source of truth; generated database types can
// replace this untyped client later without changing callers.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let client: ReturnType<typeof createSupabaseClient<any>> | undefined;

export function createClient() {
  const { url, publishableKey } = requireSupabaseConfig();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client ??= createSupabaseClient<any>(url, publishableKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  });
  return client;
}
