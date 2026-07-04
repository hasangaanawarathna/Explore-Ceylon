import { Button } from "@/components/Button";
import { SectionTitle } from "@/components/SectionTitle";

export default function BookingPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-14 px-6 py-16 lg:px-8 lg:py-20">
      <SectionTitle
        eyebrow="Booking"
        title="Reserve your next Sri Lanka experience"
        description="This starter page is ready for booking logic, payment integrations, and confirmations later on."
      />
      <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <form className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Full name
              <input className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-sky-400 focus:bg-white" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Email address
              <input type="email" className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-sky-400 focus:bg-white" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Destination
              <select className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-sky-400 focus:bg-white">
                <option>Sigiriya</option>
                <option>Ella</option>
                <option>Mirissa</option>
                <option>Kandy</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Travel date
              <input type="date" className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-sky-400 focus:bg-white" />
            </label>
          </div>
          <label className="mt-5 grid gap-2 text-sm font-medium text-slate-700">
            Notes
            <textarea className="min-h-40 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-400 focus:bg-white" />
          </label>
          <Button href="/booking" className="mt-6 w-full">
            Submit booking request
          </Button>
        </form>

        <aside className="space-y-4 rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-950/20">
          <h2 className="text-2xl font-semibold">What happens next</h2>
          <p className="text-sm leading-7 text-slate-300">
            In a future release, this form can connect to a backend service, generate
            email confirmations, and support secure payment processing.
          </p>
          <div className="space-y-3 text-sm text-slate-300">
            <p>1. Submit an enquiry</p>
            <p>2. Receive itinerary confirmation</p>
            <p>3. Complete payment and travel details</p>
          </div>
        </aside>
      </div>
    </div>
  );
}