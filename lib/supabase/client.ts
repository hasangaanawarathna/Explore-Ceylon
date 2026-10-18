"use client";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { requireSupabaseConfig } from "@/lib/supabase/config";
import { createSessionOnlyStorage, supabaseAuthStorageKey } from "@/lib/supabase/session-storage";

// The SQL migrations are the schema source of truth; generated database types can
// replace this untyped client later without changing callers.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let client: ReturnType<typeof createSupabaseClient<any>> | undefined;

export function createClient() {
  const { url, publishableKey } = requireSupabaseConfig();
  const storageKey = supabaseAuthStorageKey(url);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client ??= createSupabaseClient<any>(url, publishableKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: createSessionOnlyStorage(window.sessionStorage),
      storageKey,
    },
  });
  // Remove credentials written by the former durable-login implementation.
  try {
    window.localStorage.removeItem(storageKey);
    window.localStorage.removeItem("explore-ceylon-admin-session-started-at");
  } catch {
    // The session-only client still works when durable browser storage is blocked.
  }
  return client;
}
