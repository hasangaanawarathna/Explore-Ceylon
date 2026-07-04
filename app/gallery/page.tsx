import { SectionTitle } from "@/components/SectionTitle";

const galleryItems = [
  { title: "Sunrise at Sigiriya", tone: "from-amber-500 to-orange-600" },
  { title: "Tea country views", tone: "from-emerald-500 to-teal-600" },
  { title: "Southern coast nights", tone: "from-fuchsia-500 to-rose-600" },
  { title: "Wildlife safari", tone: "from-lime-500 to-green-700" },
  { title: "Cultural heritage", tone: "from-indigo-500 to-sky-600" },
  { title: "Mountain railways", tone: "from-cyan-500 to-blue-600" },
];

export default function GalleryPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-14 px-6 py-16 lg:px-8 lg:py-20">
      <SectionTitle
        eyebrow="Gallery"
        title="A visual preview of the island"
        description="The gallery is structured as a flexible showcase for destination photography and future media assets."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {galleryItems.map((item, index) => (
          <div
            key={item.title}
            className={`group relative min-h-72 overflow-hidden rounded-[2rem] bg-gradient-to-br ${item.tone} p-6 text-white shadow-xl shadow-slate-200/50`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_35%)] opacity-80" />
            <div className="relative flex h-full flex-col justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/80">
                0{index + 1}
              </p>
              <div>
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-7 text-white/80">
                  Replace this panel with destination photography, reels, or curated trip
                  memories.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}