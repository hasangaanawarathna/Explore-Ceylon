"use client";

import { useState } from "react";
import type { Destination, TravelPackage } from "@/types";
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

  function choose(nextKind: Kind, slug = "") {
    setKind(nextKind); setSelected(slug); setMessage("");
    const item = items[nextKind].find((candidate) => candidate.slug === slug) ?? (nextKind === "destinations" ? blankDestination : blankPackage);
    setDraft(JSON.stringify(item, null, 2));
  }

  async function save() {
    setMessage("Saving...");
    try {
      const item = JSON.parse(draft) as Destination | TravelPackage;
      const response = await fetch(withBasePath("/api/catalog"), { method: selected ? "PATCH" : "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ kind, item }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Save failed.");
      setItems((current) => ({ ...current, [kind]: [...current[kind].filter((candidate) => candidate.slug !== result.item.slug), result.item] }));
      setSelected(result.item.slug); setMessage("Saved.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Invalid JSON."); }
  }

  async function remove() {
    if (!selected || !window.confirm(`Delete ${selected}? This cannot be undone.`)) return;
    const response = await fetch(withBasePath("/api/catalog"), { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ kind, slug: selected }) });
    if (!response.ok) return setMessage("Delete failed.");
    setItems((current) => ({ ...current, [kind]: current[kind].filter((candidate) => candidate.slug !== selected) }));
    choose(kind); setMessage("Deleted.");
  }

  return (
    <div className="mt-5 grid gap-4 lg:grid-cols-[0.35fr_0.65fr]">
      <div className="border border-slate-200 bg-slate-50 p-4">
        <div className="flex gap-2">
          {(["destinations", "packages"] as Kind[]).map((value) => <button key={value} onClick={() => choose(value)} className={`rounded-full px-3 py-2 text-xs font-semibold capitalize ${kind === value ? "bg-slate-950 text-white" : "bg-white text-slate-700"}`}>{value}</button>)}
        </div>
        <button onClick={() => choose(kind)} className="mt-4 w-full rounded-lg border border-sky-300 bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-800">Create new</button>
        <div className="mt-3 space-y-2">{items[kind].map((item) => <button key={item.slug} onClick={() => choose(kind, item.slug)} className={`w-full border px-3 py-2 text-left text-sm ${selected === item.slug ? "border-sky-500 bg-white" : "border-slate-200 bg-white/60"}`}>{"name" in item ? item.name : item.title}<span className="block text-xs text-slate-500">{item.slug}</span></button>)}</div>
      </div>
      <div>
        <p className="text-sm text-slate-600">Edit the structured record. Arrays such as activities and features must remain JSON arrays.</p>
        <textarea value={draft} onChange={(event) => setDraft(event.target.value)} rows={18} spellCheck={false} className="mt-3 w-full rounded-lg border border-slate-300 bg-slate-950 p-4 font-mono text-xs text-slate-100 outline-none focus:border-sky-500" />
        <div className="mt-3 flex flex-wrap items-center gap-3"><button onClick={save} className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white">Save record</button>{selected && <button onClick={remove} className="rounded-lg border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-700">Delete</button>}<span className="text-sm text-slate-600">{message}</span></div>
      </div>
    </div>
  );
}
