import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { getAdminSession } from "@/lib/server/auth";

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin");
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-lg items-center px-4 py-16">
      <section className="w-full rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/70">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Secure workspace</p>
        <h1 className="mt-3 text-3xl font-semibold">Admin sign in</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">Use the administrator credentials configured on the server.</p>
        <AdminLoginForm />
      </section>
    </div>
  );
}
