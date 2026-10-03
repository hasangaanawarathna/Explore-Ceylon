import { Button } from "@/components/Button";
import { SectionTitle } from "@/components/SectionTitle";
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-4 py-12 sm:space-y-16 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <SectionTitle
        eyebrow="Contact"
        title="Start a conversation about your trip"
        description="Use this page as the future enquiry entry point for planning, pricing, and custom itinerary support."
      />

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6 rounded-2xl bg-slate-950 p-5 text-white sm:rounded-[2rem] sm:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
              Reach us
            </p>
            <h2 className="mt-3 text-2xl font-semibold">We respond with useful details</h2>
          </div>
          <div className="space-y-4 text-sm leading-7 text-slate-300">
            <p>
              Email:{" "}
              <a
                href="mailto:hasangaanawarathna@gmail.com"
                className="font-semibold text-white transition hover:text-sky-200"
              >
                hasangaanawarathna@gmail.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a
                href="tel:+94770132675"
                className="font-semibold text-white transition hover:text-sky-200"
              >
                +94 77 0132675
              </a>
            </p>
            <p>Hours: Monday to Friday, 9:00 AM to 6:00 PM</p>
            <p>Location: Colombo, Sri Lanka</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10 sm:rounded-[1.5rem]">
            <iframe
              src="https://www.google.com/maps?q=Colombo,%20Sri%20Lanka&z=12&output=embed"
              title="Explore Ceylon location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full"
            />
          </div>
          <Button href="/booking" variant="secondary" className="w-full sm:w-auto">
            Book a trip
          </Button>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
