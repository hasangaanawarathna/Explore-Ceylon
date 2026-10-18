"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { assertAdmin } from "@/lib/supabase/repository";
import { clearAdminSessionStarted, ensureAdminSessionStarted, isStoredAdminSessionWithinLimit } from "@/lib/supabase/admin-session";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    let active = true;
    const supabase = createClient();
    const verify = async () => {
      if (!isStoredAdminSessionWithinLimit()) {
        clearAdminSessionStarted();
        await supabase.auth.signOut();
        if (active) router.replace("/admin/login");
        return;
      }
      const admin = await assertAdmin();
      if (!active) return;
      if (admin) {
        // Adopt valid sessions created before the 30-day marker was introduced.
        ensureAdminSessionStarted();
        setAllowed(true);
      }
      else router.replace("/admin/login");
    };

    void verify().catch(() => router.replace("/admin/login"));
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        clearAdminSessionStarted();
        setAllowed(false);
        router.replace("/admin/login");
      }
    });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [router]);
  if (!allowed) return <div className="mx-auto min-h-[70vh] max-w-7xl px-4 py-16 text-sm text-slate-600">Verifying administrator access...</div>;
  return children;
}
