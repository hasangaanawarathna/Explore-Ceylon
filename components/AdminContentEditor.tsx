"use client";

import { ChangeEvent, useState } from "react";

import { destinations, packages } from "@/lib/constants";

type ContentKind = "hero" | "destination" | "package";

type EditableContent = {
  hero: {
    title: string;
    description: string;
    image: string;
  };
  destinations: Record<string, { summary: string; image: string }>;
  packages: Record<string, { summary: string; image: string }>;
};

const storageKey = "explore-ceylon-admin-content";

const defaultContent: EditableContent = {
  hero: {
    title: "Discover the Hidden Beauty of Sri Lanka",
    description:
      "Plan coastal escapes, hill-country retreats, wildlife journeys, and family adventures with curated itineraries built for memorable, low-friction travel.",
    image: "/images/ui/ceylon-coast-palms.jpg",
  },
  destinations: Object.fromEntries(
    destinations.map((destination) => [destination.slug, { summary: destination.summary, image: destination.image }]),
  ),
  packages: Object.fromEntries(
    packages.map((travelPackage) => [travelPackage.slug, { summary: travelPackage.summary, image: travelPackage.image }]),
  ),
};

function loadContent(): EditableContent {
  if (typeof window === "undefined") return defaultContent;

  try {
    const saved = window.localStorage.getItem(storageKey);
    return saved ? { ...defaultContent, ...JSON.parse(saved) } : defaultContent;
  } catch {
    return defaultContent;
  }
}

export function AdminContentEditor() {
  const [content, setContent] = useState<EditableContent>(() => loadContent());
  const [kind, setKind] = useState<ContentKind>("hero");
  const [selectedSlug, setSelectedSlug] = useState(destinations[0].slug);
  const [saved, setSaved] = useState(false);

  const selectedItem = kind === "destination"
    ? destinations.find((item) => item.slug === selectedSlug)
    : packages.find((item) => item.slug === selectedSlug);
  const selectedValues = kind === "destination"
    ? content.destinations[selectedSlug]
    : content.packages[selectedSlug];

  function updateContent(field: "title" | "description" | "image" | "summary", value: string) {
    setContent((current) => {
      if (kind === "hero") return { ...current, hero: { ...current.hero, [field === "summary" ? "description" : field]: value } };
      const collection = kind === "destination" ? "destinations" : "packages";
      return { ...current, [collection]: { ...current[collection], [selectedSlug]: { ...current[collection][selectedSlug], [field]: value } } };
    });
    setSaved(false);
  }

  function saveContent() {
    window.localStorage.setItem(storageKey, JSON.stringify(content));
    setSaved(true);
  }

  function resetContent() {
    setContent(defaultContent);
    window.localStorage.removeItem(storageKey);
    setSaved(false);
  }

  function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateContent("image", String(reader.result));
    reader.readAsDataURL(file);
  }

  return (
    <div className="mt-5 border border-slate-200 bg-slate-50 p-4 sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-950">Edit published content</p>
          <p className="mt-1 text-sm text-slate-500">Changes are saved in this browser and can be previewed immediately.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["hero", "destination", "package"] as ContentKind[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => { setKind(option); setSelectedSlug(option === "destination" ? destinations[0].slug : packages[0].slug); }}
              className={`rounded-full px-3 py-2 text-sm font-semibold capitalize ${kind === option ? "bg-slate-950 text-white" : "border border-slate-300 bg-white text-slate-700"}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {kind !== "hero" && (
        <select
          value={selectedSlug}
          onChange={(event) => setSelectedSlug(event.target.value)}
          className="mt-4 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-800 sm:w-80"
        >
          {(kind === "destination" ? destinations : packages).map((item) => (
            <option key={item.slug} value={item.slug}>{"name" in item ? item.name : item.title}</option>
          ))}
        </select>
      )}

      <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_220px]">
        <div className="space-y-3">
          {kind === "hero" && (
            <label className="block text-sm font-semibold text-slate-700">
              Hero title
              <input value={content.hero.title} onChange={(event) => updateContent("title", event.target.value)} className="mt-1 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 font-normal outline-none focus:border-sky-500" />
            </label>
          )}
          <label className="block text-sm font-semibold text-slate-700">
            {kind === "hero" ? "Description" : "Summary"}
            <textarea
              value={kind === "hero" ? content.hero.description : selectedValues?.summary ?? ""}
              onChange={(event) => updateContent(kind === "hero" ? "description" : "summary", event.target.value)}
              rows={4}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-normal outline-none focus:border-sky-500"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-700">
            Image URL
            <input value={kind === "hero" ? content.hero.image : selectedValues?.image ?? ""} onChange={(event) => updateContent("image", event.target.value)} className="mt-1 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 font-normal outline-none focus:border-sky-500" placeholder="/images/ui/your-image.jpg" />
          </label>
          <label className="inline-flex cursor-pointer items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-sky-400">
            Upload image
            <input type="file" accept="image/*" onChange={uploadImage} className="sr-only" />
          </label>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="h-36 bg-slate-200" style={{ backgroundImage: `url(${kind === "hero" ? content.hero.image : selectedValues?.image})`, backgroundPosition: "center", backgroundSize: "cover" }} />
          <p className="p-3 text-xs text-slate-500">{selectedItem ? ("name" in selectedItem ? selectedItem.name : selectedItem.title) : "Hero preview"}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-4">
        <button type="button" onClick={saveContent} className="rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-500">Save changes</button>
        <button type="button" onClick={resetContent} className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-400">Reset defaults</button>
        {saved && <span className="text-sm font-semibold text-emerald-700">Saved locally</span>}
      </div>
    </div>
  );
}