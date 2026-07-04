import { Button } from "@/components/Button";
import { SectionTitle } from "@/components/SectionTitle";

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-16 px-6 py-16 lg:px-8 lg:py-20">
      <SectionTitle
        eyebrow="Contact"
        title="Start a conversation about your trip"
        description="Use this page as the future enquiry entry point for planning, pricing, and custom itinerary support."
      />

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6 rounded-[2rem] bg-slate-950 p-8 text-white">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
              Reach us
            </p>
            <h2 className="mt-3 text-2xl font-semibold">We respond with useful details</h2>
          </div>
          <div className="space-y-4 text-sm leading-7 text-slate-300">
            <p>Email: hello@exploreceylon.travel</p>
            <p>Phone: +94 77 123 4567</p>
            <p>Hours: Monday to Friday, 9:00 AM to 6:00 PM</p>
            <p>Location: Colombo, Sri Lanka</p>
          </div>
          <Button href="/booking" variant="secondary">
            Book a trip
          </Button>
        </div>

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
          </div>
          <label className="mt-5 grid gap-2 text-sm font-medium text-slate-700">
            Subject
            <input className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-sky-400 focus:bg-white" />
          </label>
          <label className="mt-5 grid gap-2 text-sm font-medium text-slate-700">
            Message
            <textarea className="min-h-40 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-400 focus:bg-white" />
          </label>
          <Button href="/contact" className="mt-6 w-full">
            Send enquiry
          </Button>
        </form>
      </div>
    </div>
  );
}