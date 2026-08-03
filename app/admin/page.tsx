import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Manage Explore Ceylon bookings, packages, leads, and content.",
};

const stats = [
  { label: "New enquiries", value: "128", change: "+14 this week", tone: "sky" },
  { label: "Confirmed trips", value: "36", change: "+8 this month", tone: "emerald" },
  { label: "Package drafts", value: "12", change: "5 need review", tone: "amber" },
  { label: "Revenue forecast", value: "$64k", change: "Q3 pipeline", tone: "rose" },
];

const bookings = [
  {
    id: "EC-1048",
    guest: "Nimali Perera",
    trip: "Southern Coast Escape",
    date: "Aug 12",
    value: "$1,240",
    status: "Approve",
    payment: "Deposit due",
    agent: "Maya",
  },
  {
    id: "EC-1047",
    guest: "Dilan Fernando",
    trip: "Hill Country Retreat",
    date: "Aug 14",
    value: "$980",
    status: "Paid",
    payment: "Settled",
    agent: "Ruwan",
  },
  {
    id: "EC-1046",
    guest: "Sajini Jayawardena",
    trip: "Yala Wildlife Safari",
    date: "Aug 18",
    value: "$1,620",
    status: "Plan",
    payment: "Quote sent",
    agent: "Anika",
  },
  {
    id: "EC-1045",
    guest: "Arun Silva",
    trip: "Sigiriya Heritage Loop",
    date: "Aug 21",
    value: "$760",
    status: "Contact",
    payment: "Unconfirmed",
    agent: "Maya",
  },
];

const itineraryQueue = [
  { route: "Colombo - Kandy - Ella", progress: 82, owner: "Maya", due: "Today" },
  { route: "Galle - Mirissa - Yala", progress: 64, owner: "Ruwan", due: "Aug 6" },
  { route: "Sigiriya - Trincomalee", progress: 48, owner: "Anika", due: "Aug 8" },
];

const packagePipeline = [
  {
    name: "Coast and Culture Escape",
    inventory: "18 seats",
    price: "$690",
    visibility: "Published",
    lastEdited: "2h ago",
  },
  {
    name: "Highland Adventure Trail",
    inventory: "9 seats",
    price: "$540",
    visibility: "Featured",
    lastEdited: "Yesterday",
  },
  {
    name: "Wildlife and Waves Journey",
    inventory: "14 seats",
    price: "$725",
    visibility: "Draft",
    lastEdited: "3d ago",
  },
];

const leadFunnel = [
  { stage: "Unread", count: 24, color: "bg-rose-500" },
  { stage: "Quoted", count: 42, color: "bg-amber-500" },
  { stage: "Negotiating", count: 31, color: "bg-sky-500" },
  { stage: "Won", count: 36, color: "bg-emerald-500" },
];

const calendarItems = [
  { time: "09:30", title: "Airport pickup confirmation", owner: "Ops" },
  { time: "11:00", title: "Yala safari supplier call", owner: "Ruwan" },
  { time: "14:15", title: "Review gallery upload", owner: "Content" },
  { time: "16:00", title: "Highland quote follow-up", owner: "Maya" },
];

const teamWorkload = [
  { name: "Maya", role: "Lead planner", tasks: 8, capacity: 72 },
  { name: "Ruwan", role: "Supplier ops", tasks: 6, capacity: 58 },
  { name: "Anika", role: "Content editor", tasks: 5, capacity: 46 },
];

const contentTasks = [
  { title: "Refresh gallery images", area: "Gallery", priority: "High", status: "Review" },
  { title: "Publish seasonal offers", area: "Packages", priority: "Medium", status: "Draft" },
  { title: "Update Ella travel guide", area: "Blog", priority: "Medium", status: "Writing" },
  { title: "Review contact submissions", area: "Leads", priority: "High", status: "Inbox" },
];

const paymentAlerts = [
  { label: "Deposits due", value: "$8,420", note: "7 invoices" },
  { label: "Refund checks", value: "$620", note: "2 pending" },
  { label: "Supplier payouts", value: "$11,300", note: "Friday batch" },
];

const reportRows = [
  { label: "Lead response rate", value: "74%", width: "74%", color: "bg-sky-500" },
  { label: "Quote conversion", value: "41%", width: "41%", color: "bg-emerald-500" },
  { label: "Package readiness", value: "68%", width: "68%", color: "bg-amber-500" },
];

const quickActions = [
  "Approve booking",
  "Create package",
  "Assign guide",
  "Send invoice",
  "Publish story",
  "Export report",
];

const navItems = [
  "Overview",
  "Bookings",
  "Packages",
  "Leads",
  "Content",
  "Payments",
  "Reports",
  "Settings",
];

const toneStyles: Record<string, string> = {
  sky: "border-sky-200 bg-sky-50 text-sky-700",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
  amber: "border-amber-200 bg-amber-50 text-amber-700",
  rose: "border-rose-200 bg-rose-50 text-rose-700",
};

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Approve: "bg-amber-100 text-amber-800",
    Paid: "bg-emerald-100 text-emerald-800",
    Plan: "bg-sky-100 text-sky-800",
    Contact: "bg-rose-100 text-rose-800",
    Published: "bg-emerald-100 text-emerald-800",
    Featured: "bg-indigo-100 text-indigo-800",
    Draft: "bg-slate-200 text-slate-700",
  };

  return (
    <span
      className={`inline-flex min-w-20 justify-center rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] ?? "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}

function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
      {children}
    </p>
  );
}

export default function AdminPage() {
  return (
    <div className="bg-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
        <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] lg:w-64">
          <div className="border border-slate-200 bg-white p-4 shadow-sm">
            <div className="border-b border-slate-200 pb-4">
              <SectionKicker>Explore Ceylon</SectionKicker>
              <h1 className="mt-2 text-2xl font-semibold text-slate-950">Admin</h1>
              <p className="mt-2 text-sm text-slate-500">Tuesday, Aug 4</p>
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
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <SectionKicker>Operations dashboard</SectionKicker>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">
                  Booking and content control center
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  Track customer enquiries, package readiness, itinerary work,
                  publishing tasks, payments, and weekly performance from one workspace.
                </p>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <Link
                  href="/booking"
                  className="bg-sky-600 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-sky-500"
                >
                  New booking
                </Link>
                <Link
                  href="/packages"
                  className="border border-slate-300 bg-white px-4 py-2 text-center text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  Manage packages
                </Link>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="border border-slate-200 bg-slate-50 p-4">
                  <div
                    className={`inline-flex border px-2.5 py-1 text-xs font-semibold ${
                      toneStyles[stat.tone]
                    }`}
                  >
                    {stat.change}
                  </div>
                  <p className="mt-4 text-sm font-medium text-slate-600">{stat.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-950">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.45fr_0.9fr]">
            <div className="border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <SectionKicker>Command bar</SectionKicker>
                  <h3 className="mt-2 text-xl font-semibold text-slate-950">
                    Find work and trigger actions
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <select className="h-10 border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700">
                    <option>All statuses</option>
                    <option>Needs approval</option>
                    <option>Paid</option>
                    <option>Drafts</option>
                  </select>
                  <input
                    className="h-10 min-w-0 border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-sky-400 sm:w-64"
                    placeholder="Search guest, route, package"
                  />
                </div>
              </div>
              <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    className="border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-800 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-800"
                    type="button"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            <div id="leads" className="border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionKicker>Leads</SectionKicker>
              <h3 className="mt-2 text-xl font-semibold text-slate-950">
                Funnel health
              </h3>
              <div className="mt-5 space-y-4">
                {leadFunnel.map((stage) => (
                  <div key={stage.stage}>
                    <div className="flex items-center justify-between text-sm">
                      <p className="font-semibold text-slate-800">{stage.stage}</p>
                      <p className="text-slate-500">{stage.count} leads</p>
                    </div>
                    <div className="mt-2 h-2 bg-slate-100">
                      <div
                        className={`h-full ${stage.color}`}
                        style={{ width: `${Math.min(stage.count * 2, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="bookings"
            className="border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <SectionKicker>Bookings</SectionKicker>
                <h3 className="mt-2 text-xl font-semibold text-slate-950">
                  Recent travel requests
                </h3>
              </div>
              <Link
                href="/contact"
                className="text-sm font-semibold text-sky-700 hover:text-sky-800"
              >
                View lead inbox
              </Link>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-y border-slate-200 bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
                    <th className="px-3 py-3 font-semibold">ID</th>
                    <th className="px-3 py-3 font-semibold">Guest</th>
                    <th className="px-3 py-3 font-semibold">Trip</th>
                    <th className="px-3 py-3 font-semibold">Date</th>
                    <th className="px-3 py-3 font-semibold">Value</th>
                    <th className="px-3 py-3 font-semibold">Payment</th>
                    <th className="px-3 py-3 font-semibold">Agent</th>
                    <th className="px-3 py-3 font-semibold">Status</th>
                    <th className="px-3 py-3 font-semibold">Action</th>
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
                      <td className="px-3 py-4 text-slate-600">{booking.payment}</td>
                      <td className="px-3 py-4 text-slate-600">{booking.agent}</td>
                      <td className="px-3 py-4">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="px-3 py-4">
                        <button
                          type="button"
                          className="border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
                        >
                          Open
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div
              id="packages"
              className="border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <SectionKicker>Packages</SectionKicker>
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
                    <div className="mt-2 flex items-center justify-between text-xs font-medium text-slate-500">
                      <p>{item.progress}% ready</p>
                      <p>Due {item.due}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionKicker>Package manager</SectionKicker>
              <h3 className="mt-2 text-xl font-semibold text-slate-950">
                Inventory and publishing
              </h3>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[620px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-y border-slate-200 bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
                      <th className="px-3 py-3 font-semibold">Package</th>
                      <th className="px-3 py-3 font-semibold">Seats</th>
                      <th className="px-3 py-3 font-semibold">Price</th>
                      <th className="px-3 py-3 font-semibold">Visibility</th>
                      <th className="px-3 py-3 font-semibold">Edited</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packagePipeline.map((item) => (
                      <tr key={item.name} className="border-b border-slate-200">
                        <td className="px-3 py-4 font-semibold text-slate-950">
                          {item.name}
                        </td>
                        <td className="px-3 py-4 text-slate-600">{item.inventory}</td>
                        <td className="px-3 py-4 text-slate-600">{item.price}</td>
                        <td className="px-3 py-4">
                          <StatusBadge status={item.visibility} />
                        </td>
                        <td className="px-3 py-4 text-slate-500">{item.lastEdited}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionKicker>Schedule</SectionKicker>
              <h3 className="mt-2 text-xl font-semibold text-slate-950">
                Today&apos;s operations
              </h3>
              <div className="mt-5 divide-y divide-slate-200">
                {calendarItems.map((item) => (
                  <div key={`${item.time}-${item.title}`} className="flex gap-4 py-4">
                    <p className="w-14 font-mono text-xs font-semibold text-slate-500">
                      {item.time}
                    </p>
                    <div>
                      <p className="text-sm font-semibold text-slate-950">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{item.owner}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionKicker>Team</SectionKicker>
              <h3 className="mt-2 text-xl font-semibold text-slate-950">
                Workload by owner
              </h3>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {teamWorkload.map((member) => (
                  <div key={member.name} className="border border-slate-200 bg-slate-50 p-4">
                    <p className="text-lg font-semibold text-slate-950">{member.name}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      {member.role}
                    </p>
                    <p className="mt-4 text-sm text-slate-600">{member.tasks} active tasks</p>
                    <div className="mt-3 h-2 bg-white">
                      <div
                        className="h-full bg-emerald-500"
                        style={{ width: `${member.capacity}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="content" className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="border border-slate-200 bg-slate-950 p-5 text-white shadow-sm sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
                Priority
              </p>
              <h3 className="mt-2 text-xl font-semibold">Next best actions</h3>
              <div className="mt-5 grid gap-3">
                {[
                  "Approve paid bookings",
                  "Assign itinerary owners",
                  "Check image updates",
                  "Reply to hot leads",
                ].map((action) => (
                  <button
                    key={action}
                    className="border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-medium text-slate-100 transition hover:bg-white/10"
                    type="button"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionKicker>Content</SectionKicker>
              <h3 className="mt-2 text-xl font-semibold text-slate-950">
                Publishing workflow
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
                    <p className="mt-2 text-xs font-medium text-slate-500">
                      Status: {task.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="payments" className="border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <SectionKicker>Payments</SectionKicker>
                <h3 className="mt-2 text-xl font-semibold text-slate-950">
                  Billing alerts
                </h3>
              </div>
              <button
                type="button"
                className="border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
              >
                Download CSV
              </button>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {paymentAlerts.map((alert) => (
                <div key={alert.label} className="border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-medium text-slate-600">{alert.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">
                    {alert.value}
                  </p>
                  <p className="mt-2 text-xs font-medium text-slate-500">
                    {alert.note}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section
            id="reports"
            className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionKicker>Reports</SectionKicker>
              <h3 className="mt-2 text-xl font-semibold text-slate-950">
                Weekly snapshot
              </h3>
              <div className="mt-5 space-y-5">
                {reportRows.map((row) => (
                  <div key={row.label}>
                    <div className="flex items-center justify-between text-sm">
                      <p className="font-semibold text-slate-800">{row.label}</p>
                      <p className="text-slate-500">{row.value}</p>
                    </div>
                    <div className="mt-2 h-3 bg-slate-100">
                      <div className={`h-full ${row.color}`} style={{ width: row.width }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div id="settings" className="border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionKicker>Settings</SectionKicker>
              <h3 className="mt-2 text-xl font-semibold text-slate-950">
                Admin controls
              </h3>
              <div className="mt-5 space-y-3">
                {[
                  ["Booking approvals", "Require manager approval above $1,000"],
                  ["Package visibility", "Keep draft packages hidden from guests"],
                  ["Content review", "Route gallery changes through editorial review"],
                ].map(([label, description]) => (
                  <label
                    key={label}
                    className="flex items-start justify-between gap-4 border border-slate-200 bg-slate-50 p-4"
                  >
                    <span>
                      <span className="block text-sm font-semibold text-slate-950">
                        {label}
                      </span>
                      <span className="mt-1 block text-sm text-slate-500">
                        {description}
                      </span>
                    </span>
                    <input className="mt-1 h-5 w-5 accent-sky-600" type="checkbox" defaultChecked />
                  </label>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
