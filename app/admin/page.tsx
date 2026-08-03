import { SectionTitle } from "@/components/SectionTitle";

const metrics = [
  { value: "128", label: "Pending enquiries", detail: "+14 this week" },
  { value: "42", label: "Live package drafts", detail: "6 awaiting review" },
  { value: "9.8k", label: "Monthly visits", detail: "+18% from last month" },
  { value: "$64k", label: "Estimated revenue", detail: "Projected this quarter" },
];

const recentBookings = [
  {
    traveler: "Nimali Perera",
    trip: "Southern coast escape",
    status: "Ready for approval",
    time: "10 min ago",
  },
  {
    traveler: "Dilan Fernando",
    trip: "Hill country retreat",
    status: "Payment verified",
    time: "32 min ago",
  },
  {
    traveler: "Sajini Jayawardena",
    trip: "Wildlife safari",
    status: "Awaiting itinerary",
    time: "1 hr ago",
  },
];

const quickActions = [
  "Approve new bookings",
  "Publish updated itinerary",
  "Review destination gallery",
  "Send follow-up to leads",
];

const contentQueue = [
  { title: "Ella waterfall guide", status: "Draft ready" },
  { title: "Beach resort package", status: "Needs image update" },
  { title: "Seasonal offers banner", status: "Scheduled for review" },
];

export default function AdminPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-6 py-16 lg:px-8 lg:py-20">
      <SectionTitle
        eyebrow="Admin"
        title="Operations dashboard for your travel platform"
        description="Monitor bookings, content progress, and high-priority tasks from one polished workspace."
      />

      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-200/70">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-sky-900 px-8 py-8 text-white lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
                Admin control center
              </p>
              <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Welcome back, operations manager
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                Keep travel requests moving, review package updates, and stay ahead of the
                next round of customer enquiries.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-sky-200">Today</p>
              <p className="mt-2 text-2xl font-semibold">12 live requests</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 bg-slate-50/70 p-6 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-3xl font-semibold text-slate-950">{metric.value}</p>
              <p className="mt-2 text-sm font-medium text-slate-700">{metric.label}</p>
              <p className="mt-3 text-sm text-sky-700">{metric.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
                Recent bookings
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                New requests that need attention
              </h2>
            </div>
            <a href="/booking" className="text-sm font-semibold text-sky-700 hover:text-sky-800">
              View all
            </a>
          </div>

          <div className="mt-6 space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking.traveler}
                className="flex flex-col gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-slate-950">{booking.traveler}</p>
                  <p className="mt-1 text-sm text-slate-600">{booking.trip}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-800">
                    {booking.status}
                  </span>
                  <span className="text-sm text-slate-500">{booking.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-2xl shadow-slate-950/20">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
              Quick actions
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {quickActions.map((action) => (
                <li key={action} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  {action}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
              Content queue
            </p>
            <div className="mt-6 space-y-4">
              {contentQueue.map((item) => (
                <div key={item.title} className="rounded-[1.25rem] bg-slate-50 p-4">
                  <p className="font-semibold text-slate-950">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}