import { SectionTitle } from "@/components/SectionTitle";

const metrics = [
  { value: "128", label: "pending enquiries" },
  { value: "42", label: "active package drafts" },
  { value: "9.8k", label: "monthly visits" },
  { value: "$64k", label: "estimated revenue" },
];

export default function AdminPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-14 px-6 py-16 lg:px-8 lg:py-20">
      <SectionTitle
        eyebrow="Admin"
        title="Starter dashboard for future operations"
        description="This page establishes the layout for managing bookings, content, and site metrics later."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-[2rem] bg-slate-950 p-6 text-white">
            <p className="text-3xl font-semibold">{metric.value}</p>
            <p className="mt-2 text-sm text-slate-300">{metric.label}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
          <h2 className="text-2xl font-semibold text-slate-950">Recent activity</h2>
          <div className="mt-6 space-y-4 text-sm text-slate-600">
            <p>New destination request received for Ella.</p>
            <p>Package draft updated for coastal itineraries.</p>
            <p>Gallery assets queued for seasonal refresh.</p>
          </div>
        </div>
        <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-950/20">
          <h2 className="text-2xl font-semibold">Future modules</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Authentication, role-based access, booking approvals, and CMS-style content
            editing can be layered on top of this frontend foundation.
          </p>
        </div>
      </div>
    </div>
  );
}