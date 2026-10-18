"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    fetch(`${basePath}/api/admin/session`, { cache: "no-store" })
      .then((response) => {
        if (response.ok) setAllowed(true);
        else router.replace("/admin/login");
      })
      .catch(() => router.replace("/admin/login"));
  }, [router]);
  if (!allowed) return <div className="mx-auto min-h-[70vh] max-w-7xl px-4 py-16 text-sm text-slate-600">Verifying administrator access...</div>;
  return children;
}
