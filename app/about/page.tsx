import { SectionTitle } from "@/components/SectionTitle";
import { whyChooseUs } from "@/lib/constants";

const stats = [
  { value: "30+", label: "destination ideas" },
  { value: "12", label: "seasonal route templates" },
  { value: "1", label: "shared premium vision" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-20 px-6 py-16 lg:px-8 lg:py-20">
      <SectionTitle
        eyebrow="About"
        title="A modern travel brand built around Sri Lanka"
        description="Explore Ceylon is a frontend foundation for a premium travel business that highlights destinations, stories, and booking experiences with clarity."
      />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
          <h2 className="text-2xl font-semibold text-slate-950">Our mission</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Present Sri Lanka in a way that feels elevated, practical, and easy to
            trust. The site is designed to support foreign visitors, local weekend
            travelers, families, and adventure seekers.
          </p>
          <p className="mt-4 text-base leading-8 text-slate-600">
            The architecture intentionally leaves room for future backend services like
            authentication, booking workflows, payments, and administration.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[2rem] bg-slate-950 p-6 text-white">
              <p className="text-3xl font-semibold">{stat.value}</p>
              <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle
          eyebrow="Principles"
          title="Why the experience is structured this way"
          description="These principles shape the visual language and product direction for the first release."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {whyChooseUs.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                {item.label}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}