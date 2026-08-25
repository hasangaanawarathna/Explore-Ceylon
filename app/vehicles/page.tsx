import Image from "next/image";
import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Travel Vehicles",
  description:
    "Find and connect with Explore Ceylon for private cars, vans, SUVs, coaches, and airport transfers in Sri Lanka.",
};

const vehicleOptions = [
  {
    name: "Private Car",
    capacity: "1 to 3 guests",
    luggage: "2 medium bags",
    bestFor: "Airport pickups, city transfers, couples, and short routes.",
    priceHint: "Best value",
  },
  {
    name: "SUV",
    capacity: "3 to 4 guests",
    luggage: "3 to 4 bags",
    bestFor: "Hill country drives, families, and routes with more luggage.",
    priceHint: "Comfort pick",
  },
  {
    name: "Van",
    capacity: "5 to 8 guests",
    luggage: "6 to 8 bags",
    bestFor: "Family tours, small groups, multi-day packages, and flexible stops.",
    priceHint: "Group favorite",
  },
  {
    name: "Mini Coach",
    capacity: "10 to 20 guests",
    luggage: "Group luggage",
    bestFor: "Company outings, school trips, wedding guests, and large tours.",
    priceHint: "Request quote",
  },
];

const steps = [
  {
    title: "Tell us your route",
    text: "Share pickup place, drop-off place, travel date, time, guest count, and luggage count.",
  },
  {
    title: "We match the vehicle",
    text: "We suggest the right size so the ride is comfortable without paying for extra seats you do not need.",
  },
  {
    title: "Confirm and connect",
    text: "You get the vehicle type, driver contact, route plan, and final price before the trip starts.",
  },
];

const routeExamples = [
  "Bandaranaike Airport to Colombo",
  "Colombo to Sigiriya and Kandy",
  "Kandy to Ella scenic route",
  "Ella to Yala and Mirissa",
  "Galle, Bentota, and southern coast transfers",
  "Custom round tours across Sri Lanka",
];

const rideHailingApps = [
  {
    name: "PickMe",
    url: "https://pickme.lk/",
    description:
      "A local Sri Lankan ride-hailing app for taxis, tuk tuks, vans, delivery, and quick city rides.",
    bestFor: "Short trips, tuk tuk rides, airport transfers, and local city travel.",
    tone: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  },
  {
    name: "HelaGo",
    url: "https://www.helago.lk/",
    description:
      "A Sri Lankan ride-hailing platform where passengers can compare driver offers and choose a suitable ride.",
    bestFor: "Fare comparison, tuk tuk and car rides, local transfers, and flexible app-based bookings.",
    tone: "bg-amber-50 text-amber-700 ring-amber-100",
  },
  {
    name: "Uber",
    url: "https://www.uber.com/lk/en/",
    description:
      "An international ride-hailing app available in Sri Lanka for app-based ride booking.",
    bestFor: "City pickups, airport rides, point-to-point travel, and cashless app bookings.",
    tone: "bg-slate-100 text-slate-800 ring-slate-200",
  },
];

export default function VehiclesPage() {
  return (
    <div className="bg-slate-50">
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <SectionTitle
            eyebrow="Travel vehicles"
            title="Find the right vehicle for your Sri Lanka trip"
            description="Choose a private car, SUV, van, or coach for airport transfers, destination routes, day tours, and full holiday packages."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="tel:+94770132675" className="w-full sm:w-auto">
              Call now
            </Button>
            <Button
              href="https://wa.me/94770132675?text=Hello%20Explore%20Ceylon%2C%20I%20need%20a%20travel%20vehicle%20for%20my%20trip."
              variant="outline"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto"
            >
              WhatsApp enquiry
            </Button>
          </div>
          <div className="mt-8 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="font-semibold text-slate-950">Phone</p>
              <a href="tel:+94770132675" className="mt-1 block text-sky-700">
                +94 77 0132675
              </a>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="font-semibold text-slate-950">Email</p>
              <a href="mailto:hasangaanawarathna@gmail.com" className="mt-1 block break-all text-sky-700">
                hasangaanawarathna@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/70 sm:rounded-[2rem]">
          <Image
            src="/images/vehicle-transfer.svg"
            alt="Travel vehicle on a Sri Lanka route"
            width={1200}
            height={820}
            priority
            className="h-full min-h-[300px] w-full object-cover sm:min-h-[360px]"
          />
          <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-slate-950/85 p-4 text-white backdrop-blur sm:bottom-5 sm:left-5 sm:right-5 sm:rounded-3xl sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">
              Fast vehicle matching
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-200">
              Send your pickup, destination, date, guests, and bags. We connect you with a suitable vehicle and driver.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-4">
          {vehicleOptions.map((vehicle) => (
            <article
              key={vehicle.name}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-semibold text-slate-950">{vehicle.name}</h2>
                <span className="shrink-0 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
                  {vehicle.priceHint}
                </span>
              </div>
              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <p>
                  <span className="font-semibold text-slate-900">Capacity:</span>{" "}
                  {vehicle.capacity}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Luggage:</span>{" "}
                  {vehicle.luggage}
                </p>
                <p className="leading-6">{vehicle.bestFor}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
        <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50 sm:rounded-[2rem] sm:p-6 lg:grid-cols-[0.78fr_1.22fr] lg:gap-8 lg:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
              App rides in Sri Lanka
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              PickMe and Uber are useful for quick rides
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Customers can use ride-hailing apps for simple point-to-point trips. For
              multi-day tours, long routes, large luggage, or driver coordination, Explore
              Ceylon can arrange the vehicle directly.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {rideHailingApps.map((app) => (
              <article key={app.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-semibold text-slate-950">{app.name}</h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${app.tone}`}
                  >
                    Ride app
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">{app.description}</p>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  <span className="font-semibold text-slate-950">Best for:</span>{" "}
                  {app.bestFor}
                </p>
                <Button
                  href={app.url}
                  variant="outline"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 w-full"
                >
                  Open {app.name}
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
              How customers find it
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              Simple route details are enough to start
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              A perfect vehicle depends on route distance, group size, luggage, pickup time, and the roads you will travel. Send those details and we will guide the customer to the right option.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-slate-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_0.85fr] lg:gap-8 lg:px-8">
        <div className="rounded-2xl bg-slate-950 p-5 text-white sm:rounded-[2rem] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
            Popular routes
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {routeExamples.map((route) => (
              <div key={route} className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-slate-100">
                {route}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:rounded-[2rem] sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-950">Ready to connect?</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Send the trip details now. We will reply with the recommended vehicle, estimated price, and next steps.
          </p>
          <div className="mt-6 grid gap-3">
            <Button href="/booking" className="w-full">
              Send booking details
            </Button>
            <Button href="mailto:hasangaanawarathna@gmail.com" variant="outline" className="w-full">
              Email vehicle request
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
