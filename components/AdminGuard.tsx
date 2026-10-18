"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { assertAdmin } from "@/lib/supabase/repository";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";
const AUTH_CHECK_TIMEOUT_MS = 10_000;

function redirectToLogin() {
  window.location.replace(`${basePath}/admin/login/`);
}

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    let active = true;
    const supabase = createClient();
    const verify = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        if (active) redirectToLogin();
        return;
      }

      let timeout: ReturnType<typeof setTimeout> | undefined;
      const admin = await Promise.race([
        assertAdmin(),
        new Promise<null>((resolve) => {
          timeout = setTimeout(() => resolve(null), AUTH_CHECK_TIMEOUT_MS);
        }),
      ]);
      if (timeout) clearTimeout(timeout);
      if (!active) return;
      if (admin) setAllowed(true);
      else {
        await supabase.auth.signOut({ scope: "local" });
        redirectToLogin();
      }
    };

    void verify().catch(() => {
      if (active) redirectToLogin();
    });
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        setAllowed(false);
        redirectToLogin();
      }
    });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);
  if (!allowed) return <div className="mx-auto min-h-[70vh] max-w-7xl px-4 py-16 text-sm text-slate-600">Verifying administrator access...</div>;
  return children;
}
