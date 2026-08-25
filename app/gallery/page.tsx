import Image from "next/image";

import { SectionTitle } from "@/components/SectionTitle";
import { withBasePath } from "@/lib/utils";

const galleryItems = [
  {
    title: "Soft heritage light",
    image: "/images/ui/ceylon-heritage-park.jpg",
    description: "Calm green space, temple silhouettes, and a soft evening sky.",
    className: "md:col-span-2",
  },
  {
    title: "Monastic rhythm",
    image: "/images/ui/ceylon-monastery-steps.jpg",
    description: "Warm brick, saffron robes, and a quiet sense of movement.",
    className: "",
  },
  {
    title: "Coastal color",
    image: "/images/ui/ceylon-coast-palms.jpg",
    description: "Blue water, palms, and sunlit edges for a brighter island mood.",
    className: "",
  },
  {
    title: "Hill-country motion",
    image: "/images/ui/ceylon-rail-hills.jpg",
    description: "A vivid rail scene framed by dense hill-country greenery.",
    className: "",
  },
  {
    title: "Evening ceremony",
    image: "/images/ui/ceylon-temple-lights.jpg",
    description: "Temple lights, stone paths, and a more refined evening atmosphere.",
    className: "md:col-span-2",
  },
  {
    title: "Open-field adventure",
    image: "/images/ui/ceylon-safari-field.jpg",
    description: "Wide fields, safari energy, and a cinematic sense of scale.",
    className: "xl:col-span-3",
  },
];

export default function GalleryPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-4 py-12 sm:space-y-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <SectionTitle
        eyebrow="Gallery"
        title="Visual moments from the island"
        description="A polished image wall for mood, texture, and atmosphere across the Explore Ceylon experience."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {galleryItems.map((item, index) => (
          <div
            key={item.title}
            className={`group relative min-h-72 overflow-hidden rounded-2xl bg-slate-950 p-5 text-white shadow-xl shadow-slate-200/50 sm:min-h-80 sm:rounded-[2rem] sm:p-6 ${item.className}`}
          >
            <Image
              src={withBasePath(item.image)}
              alt=""
              fill
              sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.04),rgba(2,6,23,0.68))]" />
            <div className="relative flex h-full flex-col justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/80">
                0{index + 1}
              </p>
              <div>
                <h3 className="text-xl font-semibold sm:text-2xl">{item.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-7 text-white/80">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
