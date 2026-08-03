import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Manage Explore Ceylon bookings, packages, leads, and content.",
};

const stats = [
  { label: "New enquiries", value: "128", change: "+14 this week" },
  { label: "Confirmed trips", value: "36", change: "+8 this month" },
  { label: "Package drafts", value: "12", change: "5 need review" },
  { label: "Revenue forecast", value: "$64k", change: "Q3 pipeline" },
];

const bookings = [
  {
    id: "EC-1048",
    guest: "Nimali Perera",
    trip: "Southern Coast Escape",
    date: "Aug 12",
    value: "$1,240",
    status: "Approve",
  },
  {
    id: "EC-1047",
    guest: "Dilan Fernando",
    trip: "Hill Country Retreat",
    date: "Aug 14",
    value: "$980",
    status: "Paid",
  },
  {
    id: "EC-1046",
    guest: "Sajini Jayawardena",
    trip: "Yala Wildlife Safari",
    date: "Aug 18",
    value: "$1,620",
    status: "Plan",
  },
  {
    id: "EC-1045",
    guest: "Arun Silva",
    trip: "Sigiriya Heritage Loop",
    date: "Aug 21",
    value: "$760",
    status: "Contact",
  },
];

const itineraryQueue = [
  { route: "Colombo - Kandy - Ella", progress: 82, owner: "Maya" },
  { route: "Galle - Mirissa - Yala", progress: 64, owner: "Ruwan" },
  { route: "Sigiriya - Trincomalee", progress: 48, owner: "Anika" },
];

const contentTasks = [
  { title: "Refresh gallery images", area: "Gallery", priority: "High" },
  { title: "Publish seasonal offers", area: "Packages", priority: "Medium" },
  { title: "Update Ella travel guide", area: "Blog", priority: "Medium" },
  { title: "Review contact submissions", area: "Leads", priority: "High" },
];

const navItems = ["Overview", "Bookings", "Packages", "Content", "Reports"];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Approve: "bg-amber-100 text-amber-800",
    Paid: "bg-emerald-100 text-emerald-800",
    Plan: "bg-sky-100 text-sky-800",
    Contact: "bg-rose-100 text-rose-800",
  };

  return (
    <span
      className={`inline-flex min-w-20 justify-center rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function AdminPage() {
  return (
    <div className="bg-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
        <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] lg:w-64">
          <div className="border border-slate-200 bg-white p-4 shadow-sm">
            <div className="border-b border-slate-200 pb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Explore Ceylon
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-950">
                Admin
              </h1>
            </div>

            <nav className="mt-4 space-y-1">
              {navItems.map((item, index) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`block px-3 py-2 text-sm font-medium transition ${
                    index === 0
                      ? "bg-slate-950 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="mt-6 border-t border-slate-200 pt-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Today
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-950">
                12 live requests
              </p>
              <p className="mt-1 text-sm text-slate-500">
                4 require approval before noon.
              </p>
            </div>
          </div>
        </aside>

        <main className="flex-1 space-y-6">
          <section
            id="overview"
            className="border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                  Operations dashboard
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">
                  Booking and content control center
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  Track customer enquiries, package readiness, itinerary work,
                  and publishing tasks from one focused workspace.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link
                  href="/booking"
                  className="bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500"
                >
                  New booking
                </Link>
                <Link
                  href="/packages"
                  className="border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  Manage packages
                </Link>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-950">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-sky-700">{stat.change}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.45fr_0.9fr]">
            <div
              id="bookings"
              className="border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                    Bookings
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-950">
                    Recent travel requests
                  </h3>
                </div>
                <Link
                  href="/contact"
                  className="text-sm font-semibold text-sky-700 hover:text-sky-800"
                >
                  View leads
                </Link>
              </div>

              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-y border-slate-200 bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
                      <th className="px-3 py-3 font-semibold">ID</th>
                      <th className="px-3 py-3 font-semibold">Guest</th>
                      <th className="px-3 py-3 font-semibold">Trip</th>
                      <th className="px-3 py-3 font-semibold">Date</th>
                      <th className="px-3 py-3 font-semibold">Value</th>
                      <th className="px-3 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-slate-200">
                        <td className="px-3 py-4 font-mono text-xs text-slate-500">
                          {booking.id}
                        </td>
                        <td className="px-3 py-4 font-semibold text-slate-950">
                          {booking.guest}
                        </td>
                        <td className="px-3 py-4 text-slate-600">{booking.trip}</td>
                        <td className="px-3 py-4 text-slate-600">{booking.date}</td>
                        <td className="px-3 py-4 font-semibold text-slate-950">
                          {booking.value}
                        </td>
                        <td className="px-3 py-4">
                          <StatusBadge status={booking.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div
              id="packages"
              className="border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Packages
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-950">
                Itinerary queue
              </h3>

              <div className="mt-5 space-y-5">
                {itineraryQueue.map((item) => (
                  <div key={item.route}>
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <p className="font-semibold text-slate-950">{item.route}</p>
                      <p className="text-slate-500">{item.owner}</p>
                    </div>
                    <div className="mt-3 h-2 bg-slate-100">
                      <div
                        className="h-full bg-sky-600"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <p className="mt-2 text-xs font-medium text-slate-500">
                      {item.progress}% ready
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="content"
            className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="border border-slate-200 bg-slate-950 p-5 text-white shadow-sm sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
                Priority
              </p>
              <h3 className="mt-2 text-xl font-semibold">Next best actions</h3>
              <div className="mt-5 grid gap-3">
                {["Approve paid bookings", "Assign itinerary owners", "Check image updates", "Reply to hot leads"].map(
                  (action) => (
                    <button
                      key={action}
                      className="border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-medium text-slate-100 transition hover:bg-white/10"
                      type="button"
                    >
                      {action}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Content
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-950">
                Publishing tasks
              </h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {contentTasks.map((task) => (
                  <div key={task.title} className="border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                        {task.area}
                      </p>
                      <span className="text-xs font-semibold text-sky-700">
                        {task.priority}
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-slate-950">
                      {task.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="reports"
            className="border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="grid gap-5 md:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                  Reports
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-950">
                  Weekly snapshot
                </h3>
              </div>
              <div className="border-l border-slate-200 pl-5">
                <p className="text-2xl font-semibold text-slate-950">74%</p>
                <p className="mt-1 text-sm text-slate-600">Lead response rate</p>
              </div>
              <div className="border-l border-slate-200 pl-5">
                <p className="text-2xl font-semibold text-slate-950">4.8/5</p>
                <p className="mt-1 text-sm text-slate-600">Average guest rating</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
