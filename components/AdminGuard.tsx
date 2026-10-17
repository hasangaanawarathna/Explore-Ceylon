"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { assertAdmin } from "@/lib/supabase/repository";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  useEffect(() => { assertAdmin().then((user) => { if (user) setAllowed(true); else router.replace("/admin/login"); }).catch(() => router.replace("/admin/login")); }, [router]);
  if (!allowed) return <div className="mx-auto min-h-[70vh] max-w-7xl px-4 py-16 text-sm text-slate-600">Verifying administrator access...</div>;
  return children;
}
