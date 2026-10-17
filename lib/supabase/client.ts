"use client";

import { createBrowserClient } from "@supabase/ssr";
import { requireSupabaseConfig } from "@/lib/supabase/config";

let client: ReturnType<typeof createBrowserClient> | undefined;

export function createClient() {
  const { url, publishableKey } = requireSupabaseConfig();
  client ??= createBrowserClient(url, publishableKey);
  return client;
}
