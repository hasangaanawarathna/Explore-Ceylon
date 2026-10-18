"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import type { Destination, TravelPackage } from "@/types";
import { createClient } from "@/lib/supabase/client";
import { getCatalog } from "@/lib/supabase/repository";
import { deleteManagedImage, uploadCatalogImage, validateImageFile } from "@/lib/supabase/storage";
import { withBasePath } from "@/lib/utils";

type Kind = "destinations" | "packages";

const blankDestination: Destination = { slug: "", name: "", location: "", region: "", summary: "", image: "/images/hero-sri-lanka.svg", price: "", priceUsd: 0, duration: "", bestTime: "", activities: [], googleMapsUrl: "" };
const blankPackage: TravelPackage = { slug: "", title: "", summary: "", price: "", priceUsd: 0, duration: "", category: "", image: "/images/hero-sri-lanka.svg", features: [] };

export function AdminCatalogManager({ destinations, packages }: { destinations: Destination[]; packages: TravelPackage[] }) {
  const [kind, setKind] = useState<Kind>("destinations");
  const [items, setItems] = useState({ destinations, packages });
  const [selected, setSelected] = useState("");
  const [draft, setDraft] = useState(() => JSON.stringify(blankDestination, null, 2));
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const previewUrl = useMemo(() => imageFile ? URL.createObjectURL(imageFile) : "", [imageFile]);

  useEffect(() => { getCatalog().then(setItems).catch(() => setMessage("Could not refresh catalog.")); }, []);
  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

  function parsedDraft() {
    try { return JSON.parse(draft) as Destination | TravelPackage; } catch { return null; }
  }

  function updateField(field: string, value: string | number | string[]) {
    const item = parsedDraft();
    if (!item) return setMessage("Fix the advanced JSON before using the form fields.");
    setDraft(JSON.stringify({ ...item, [field]: value }, null, 2));
    setMessage("");
  }

  function choose(nextKind: Kind, slug = "") {
    setKind(nextKind); setSelected(slug); setMessage(""); setImageFile(null);
    const item = items[nextKind].find((candidate) => candidate.slug === slug) ?? (nextKind === "destinations" ? blankDestination : blankPackage);
    setDraft(JSON.stringify(item, null, 2));
  }

  function selectImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    event.target.value = "";
    if (!file) return;
    const error = validateImageFile(file);
    if (error) { setImageFile(null); setMessage(error); return; }
    setImageFile(file); setMessage("Preview ready. Select Upload image to confirm.");
  }

  async function uploadImage() {
    const item = parsedDraft();
    if (!item || !imageFile) return setMessage("Choose an image and make sure the record JSON is valid.");
    setUploading(true); setMessage("Uploading image...");
    let uploadedPath = "";
    let recordUpdated = false;
    try {
      const oldImage = item.image;
      const uploaded = await uploadCatalogImage(imageFile, kind, item.slug);
      uploadedPath = uploaded.path;
      const table = kind === "destinations" ? "destinations" : "travel_packages";
      if (selected) {
        const { error } = await createClient().from(table).update({ image: uploaded.publicUrl }).eq("slug", selected);
        if (error) throw error;
        recordUpdated = true;
      }
      const nextItem = { ...item, image: uploaded.publicUrl } as Destination | TravelPackage;
      setDraft(JSON.stringify(nextItem, null, 2));
      setItems((current) => ({ ...current, [kind]: current[kind].map((candidate) => candidate.slug === selected ? nextItem : candidate) }));
      setImageFile(null);
      if (selected) {
        try { await deleteManagedImage(oldImage); }
        catch { setMessage("Image updated. The previous Storage object could not be removed."); return; }
      }
      setMessage(selected ? "Image uploaded and record updated." : "Image uploaded. Save the new record to store its URL.");
    } catch (error) {
      if (uploadedPath && !recordUpdated) await createClient().storage.from("destination-images").remove([uploadedPath]).catch(() => undefined);
      setMessage(error instanceof Error ? error.message : "Image upload failed.");
    } finally { setUploading(false); }
  }

  async function removeImage() {
    const item = parsedDraft();
    if (!item?.image || !window.confirm("Remove this image from the record? The uploaded Storage object will also be deleted.")) return;
    const oldImage = item.image;
    const fallback = "/images/hero-sri-lanka.svg";
    setUploading(true); setMessage("Removing image...");
    try {
      if (selected) {
        const table = kind === "destinations" ? "destinations" : "travel_packages";
        const { error } = await createClient().from(table).update({ image: fallback }).eq("slug", selected);
        if (error) throw error;
      }
      await deleteManagedImage(oldImage);
      const nextItem = { ...item, image: fallback } as Destination | TravelPackage;
      setDraft(JSON.stringify(nextItem, null, 2)); setImageFile(null);
      setItems((current) => ({ ...current, [kind]: current[kind].map((candidate) => candidate.slug === selected ? nextItem : candidate) }));
      setMessage("Image removed.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Could not remove the image."); }
    finally { setUploading(false); }
  }

  async function save() {
    setMessage("Saving...");
    try {
      const item = JSON.parse(draft) as Destination | TravelPackage;
      const supabase = createClient();
      const { error } = kind === "destinations"
        ? await supabase.from("destinations").upsert({ slug: item.slug, name: (item as Destination).name, location: (item as Destination).location, region: (item as Destination).region, summary: item.summary, image: item.image, price_usd: item.priceUsd, duration: item.duration, best_time: (item as Destination).bestTime, activities: (item as Destination).activities, google_maps_url: (item as Destination).googleMapsUrl, is_published: true }, { onConflict: "slug" })
        : await supabase.from("travel_packages").upsert({ slug: item.slug, title: (item as TravelPackage).title, summary: item.summary, image: item.image, price_usd: item.priceUsd, duration: item.duration, category: (item as TravelPackage).category, features: (item as TravelPackage).features, is_published: true }, { onConflict: "slug" });
      if (error) throw error;
      setItems((current) => ({ ...current, [kind]: [...current[kind].filter((candidate) => candidate.slug !== item.slug), item] }));
      setSelected(item.slug); setMessage("Saved.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Invalid JSON."); }
  }

  async function remove() {
    if (!selected || !window.confirm(`Delete ${selected}? This cannot be undone.`)) return;
    const table = kind === "destinations" ? "destinations" : "travel_packages";
    const { error } = await createClient().from(table).delete().eq("slug", selected);
    if (error) return setMessage("Delete failed.");
    setItems((current) => ({ ...current, [kind]: current[kind].filter((candidate) => candidate.slug !== selected) }));
    choose(kind); setMessage("Deleted.");
  }

  return (
    <div className="mt-5 grid min-w-0 gap-4 lg:grid-cols-[0.35fr_0.65fr]">
      <div className="min-w-0 border border-slate-200 bg-slate-50 p-3 min-[360px]:p-4">
        <div className="flex min-w-0 flex-wrap gap-2">
          {(["destinations", "packages"] as Kind[]).map((value) => <button key={value} onClick={() => choose(value)} className={`rounded-full px-3 py-2 text-xs font-semibold capitalize ${kind === value ? "bg-slate-950 text-white" : "bg-white text-slate-700"}`}>{value}</button>)}
        </div>
        <button onClick={() => choose(kind)} className="mt-4 w-full rounded-lg border border-sky-300 bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-800">Create new</button>
        <div className="mt-3 space-y-2">{items[kind].map((item) => <button key={item.slug} onClick={() => choose(kind, item.slug)} className={`w-full border px-3 py-2 text-left text-sm ${selected === item.slug ? "border-sky-500 bg-white" : "border-slate-200 bg-white/60"}`}>{"name" in item ? item.name : item.title}<span className="block text-xs text-slate-500">{item.slug}</span></button>)}</div>
      </div>
      <div className="min-w-0 max-w-full">
        <p className="text-sm text-slate-600">Use the labelled fields below. Advanced JSON remains available for uncommon data changes.</p>
        <div className="mt-4 min-w-0 max-w-full rounded-xl border border-slate-200 bg-slate-50 p-3 min-[360px]:p-4">
          <div className="grid min-w-0 gap-4 sm:grid-cols-[12rem_minmax(0,1fr)] sm:items-start">
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-slate-200">
              {/* A plain img supports local previews and remote Supabase URLs in static exports. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl || withBasePath(parsedDraft()?.image || "/images/hero-sri-lanka.svg")} alt="Selected catalog image preview" className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-slate-950">Catalog photograph</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">JPG, PNG, or WebP. Maximum file size: 5 MB.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <label className="cursor-pointer rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500">
                  {parsedDraft()?.image && parsedDraft()?.image !== "/images/hero-sri-lanka.svg" ? "Replace image" : "Upload image"}
                  <input type="file" accept="image/jpeg,image/png,image/webp" onChange={selectImage} className="sr-only" />
                </label>
                {imageFile && <button type="button" onClick={uploadImage} disabled={uploading} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">{uploading ? "Uploading..." : "Confirm upload"}</button>}
                {parsedDraft()?.image && parsedDraft()?.image !== "/images/hero-sri-lanka.svg" && <button type="button" onClick={removeImage} disabled={uploading} className="rounded-lg border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-700 disabled:opacity-50">Remove image</button>}
              </div>
              {imageFile && <p className="mt-3 text-xs text-slate-500">{imageFile.name} · {(imageFile.size / 1024 / 1024).toFixed(2)} MB</p>}
            </div>
          </div>
        </div>
        {parsedDraft() && (
          <div className="mt-4 grid min-w-0 gap-4 rounded-xl border border-slate-200 bg-white p-3 min-[360px]:p-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-medium text-slate-700">Slug <span className="text-xs font-normal text-slate-500">Lowercase words separated by hyphens.</span><input value={parsedDraft()!.slug} onChange={(event) => updateField("slug", event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))} className="h-11 rounded-lg border border-slate-300 px-3 text-base sm:text-sm" /></label>
            <label className="grid gap-1.5 text-sm font-medium text-slate-700">{kind === "destinations" ? "Name" : "Title"}<input value={kind === "destinations" ? (parsedDraft() as Destination).name : (parsedDraft() as TravelPackage).title} onChange={(event) => updateField(kind === "destinations" ? "name" : "title", event.target.value)} className="h-11 rounded-lg border border-slate-300 px-3 text-base sm:text-sm" /></label>
            {kind === "destinations" && <label className="grid gap-1.5 text-sm font-medium text-slate-700">Location<input value={(parsedDraft() as Destination).location} onChange={(event) => updateField("location", event.target.value)} className="h-11 rounded-lg border border-slate-300 px-3 text-base sm:text-sm" /></label>}
            <label className="grid gap-1.5 text-sm font-medium text-slate-700">{kind === "destinations" ? "Region" : "Category"}<input value={kind === "destinations" ? (parsedDraft() as Destination).region : (parsedDraft() as TravelPackage).category} onChange={(event) => updateField(kind === "destinations" ? "region" : "category", event.target.value)} className="h-11 rounded-lg border border-slate-300 px-3 text-base sm:text-sm" /></label>
            <label className="grid gap-1.5 text-sm font-medium text-slate-700">Duration<input value={parsedDraft()!.duration} onChange={(event) => updateField("duration", event.target.value)} className="h-11 rounded-lg border border-slate-300 px-3 text-base sm:text-sm" /></label>
            <label className="grid gap-1.5 text-sm font-medium text-slate-700">Price (USD)<input type="number" min="0" step="1" value={parsedDraft()!.priceUsd} onChange={(event) => updateField("priceUsd", Number(event.target.value))} className="h-11 rounded-lg border border-slate-300 px-3 text-base sm:text-sm" /></label>
            {kind === "destinations" && <label className="grid gap-1.5 text-sm font-medium text-slate-700">Best time<input value={(parsedDraft() as Destination).bestTime} onChange={(event) => updateField("bestTime", event.target.value)} className="h-11 rounded-lg border border-slate-300 px-3 text-base sm:text-sm" /></label>}
            {kind === "destinations" && <label className="grid gap-1.5 text-sm font-medium text-slate-700">Google Maps URL<input type="url" value={(parsedDraft() as Destination).googleMapsUrl} onChange={(event) => updateField("googleMapsUrl", event.target.value)} className="h-11 rounded-lg border border-slate-300 px-3 text-base sm:text-sm" /></label>}
            <label className="grid gap-1.5 text-sm font-medium text-slate-700 sm:col-span-2">{kind === "destinations" ? "Activities" : "Features"}<span className="text-xs font-normal text-slate-500">Separate items with commas.</span><input value={(kind === "destinations" ? (parsedDraft() as Destination).activities : (parsedDraft() as TravelPackage).features).join(", ")} onChange={(event) => updateField(kind === "destinations" ? "activities" : "features", event.target.value.split(",").map((value) => value.trim()).filter(Boolean))} className="h-11 rounded-lg border border-slate-300 px-3 text-base sm:text-sm" /></label>
            <label className="grid gap-1.5 text-sm font-medium text-slate-700 sm:col-span-2">Summary<textarea rows={4} value={parsedDraft()!.summary} onChange={(event) => updateField("summary", event.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-base sm:text-sm" /></label>
          </div>
        )}
        <details className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-700">Advanced JSON editor</summary>
          <p className="mt-2 text-xs leading-5 text-slate-500">For advanced use. Invalid JSON disables the labelled form until corrected.</p>
          <textarea aria-label="Advanced catalog JSON" value={draft} onChange={(event) => setDraft(event.target.value)} rows={18} spellCheck={false} className="mt-3 w-full rounded-lg border border-slate-300 bg-slate-950 p-4 font-mono text-xs text-slate-100 outline-none focus:border-sky-500" />
        </details>
        <div className="mt-3 flex flex-wrap items-center gap-3"><button type="button" onClick={save} disabled={uploading || !parsedDraft()} className="min-h-11 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">Save record</button>{selected && <button type="button" onClick={remove} disabled={uploading} className="min-h-11 rounded-lg border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-700 disabled:opacity-50">Delete</button>}<span role="status" aria-live="polite" className="text-sm text-slate-600">{message}</span></div>
      </div>
    </div>
  );
}
