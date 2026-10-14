"use client";

import { useState } from "react";
import type { SiteSettings } from "@/lib/server/models";
import { withBasePath } from "@/lib/utils";

const suggestedImages = [
  { src: "/images/ui/ceylon-coast-palms.jpg", label: "Southern coast" },
  { src: "/images/ui/ceylon-rail-hills.jpg", label: "Hill-country railway" },
  { src: "/images/ui/ceylon-temple-lights.jpg", label: "Temple evening" },
  { src: "/images/ui/ceylon-safari-field.jpg", label: "Wildlife safari" },
  { src: "/images/ui/ceylon-monastery-steps.jpg", label: "Cultural heritage" },
  { src: "/images/ui/ceylon-heritage-park.jpg", label: "Ancient city" },
];

type HeroSettings = SiteSettings["homeHero"];

export function AdminContentEditor({ initialHero }: { initialHero: HeroSettings }) {
  const [hero, setHero] = useState(initialHero);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  function toggleImage(src: string) {
    setHero((current) => ({ ...current, images: current.images.includes(src)
      ? current.images.length > 1 ? current.images.filter((image) => image !== src) : current.images
      : [...current.images, src] }));
    setStatus("idle");
  }

  function moveImage(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= hero.images.length) return;
    const images = [...hero.images];
    [images[index], images[nextIndex]] = [images[nextIndex], images[index]];
    setHero({ ...hero, images });
    setStatus("idle");
  }

  async function saveContent() {
    setStatus("saving");
    const response = await fetch(withBasePath("/api/settings"), {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ homeHero: hero }),
    });
    setStatus(response.ok ? "saved" : "error");
  }

  return (
    <div className="mt-5 border border-slate-200 bg-slate-50 p-4 sm:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div><p className="text-sm font-semibold text-slate-950">Homepage image rotation</p><p className="mt-1 text-sm text-slate-500">Choose suggested images, set their order, and control how visitors see them.</p></div>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700"><input type="checkbox" checked={hero.autoRotate} onChange={(event) => setHero({ ...hero, autoRotate: event.target.checked })} className="h-5 w-5 accent-sky-600" />Auto-rotate</label>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-slate-700">Homepage headline<input value={hero.title} onChange={(event) => setHero({ ...hero, title: event.target.value })} className="mt-1 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 font-normal outline-none focus:border-sky-500" /></label>
        <label className="text-sm font-semibold text-slate-700">Change image every<select value={hero.rotationIntervalSeconds} onChange={(event) => setHero({ ...hero, rotationIntervalSeconds: Number(event.target.value) })} disabled={!hero.autoRotate} className="mt-1 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 font-normal disabled:opacity-50"><option value={30}>30 seconds</option><option value={60}>1 minute</option><option value={120}>2 minutes</option><option value={300}>5 minutes</option></select></label>
      </div>
      <label className="mt-4 block text-sm font-semibold text-slate-700">Homepage description<textarea value={hero.description} onChange={(event) => setHero({ ...hero, description: event.target.value })} rows={3} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-normal outline-none focus:border-sky-500" /></label>
      <div className="mt-5">
        <p className="text-sm font-semibold text-slate-700">Suggested images</p><p className="mt-1 text-xs text-slate-500">Select up to eight. At least one image must stay active.</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {suggestedImages.map((image) => { const selected = hero.images.includes(image.src); return (
            <button key={image.src} type="button" onClick={() => toggleImage(image.src)} aria-pressed={selected} className={`overflow-hidden rounded-lg border-2 bg-white text-left transition ${selected ? "border-sky-500 shadow-md" : "border-transparent hover:border-slate-300"}`}>
              <div className="h-24 bg-cover bg-center" style={{ backgroundImage: `url(${withBasePath(image.src)})` }} /><div className="flex items-center justify-between gap-2 p-3"><span className="text-xs font-semibold text-slate-800">{image.label}</span><span className={`text-xs font-bold ${selected ? "text-sky-700" : "text-slate-400"}`}>{selected ? "Selected" : "Add"}</span></div>
            </button>); })}
        </div>
      </div>
      <div className="mt-5"><p className="text-sm font-semibold text-slate-700">Display order</p><div className="mt-2 space-y-2">
        {hero.images.map((src, index) => <div key={src} className="flex items-center gap-3 border border-slate-200 bg-white p-2"><div className="h-12 w-20 shrink-0 bg-cover bg-center" style={{ backgroundImage: `url(${withBasePath(src)})` }} /><span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-700">{suggestedImages.find((image) => image.src === src)?.label ?? src}</span><button type="button" onClick={() => moveImage(index, -1)} disabled={index === 0} className="px-2 py-1 text-sm font-bold text-slate-600 disabled:opacity-25" aria-label="Move image earlier">↑</button><button type="button" onClick={() => moveImage(index, 1)} disabled={index === hero.images.length - 1} className="px-2 py-1 text-sm font-bold text-slate-600 disabled:opacity-25" aria-label="Move image later">↓</button></div>)}
      </div></div>
      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-4"><button type="button" onClick={saveContent} disabled={status === "saving"} className="rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-500 disabled:opacity-60">{status === "saving" ? "Saving…" : "Publish changes"}</button>{status === "saved" && <span className="text-sm font-semibold text-emerald-700">Published to the homepage</span>}{status === "error" && <span className="text-sm font-semibold text-rose-700">Could not save. Please try again.</span>}</div>
    </div>
  );
}
