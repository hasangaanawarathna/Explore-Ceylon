import { AdminLoginForm } from "@/components/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-lg items-center px-4 py-16">
      <section className="w-full rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/70">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Secure workspace</p>
        <h1 className="mt-3 text-3xl font-semibold">Admin sign in</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">Use your authorized Supabase administrator account.</p>
        <AdminLoginForm />
      </section>
    </div>
  );
}
