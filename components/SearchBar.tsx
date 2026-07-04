import { Button } from "@/components/Button";

export function SearchBar() {
  return (
    <form
      action="/destinations"
      method="get"
      className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 lg:grid-cols-[1.2fr_1fr_1fr_auto]"
    >
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Destination
        <input
          name="destination"
          type="text"
          placeholder="Sigiriya, Ella, Mirissa..."
          className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Travel style
        <select
          name="style"
          className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white"
        >
          <option>Adventure</option>
          <option>Family</option>
          <option>Luxury</option>
          <option>Culture</option>
          <option>Beach</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Month
        <select
          name="month"
          className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white"
        >
          <option>Any time</option>
          <option>January</option>
          <option>February</option>
          <option>March</option>
          <option>April</option>
          <option>May</option>
          <option>June</option>
        </select>
      </label>
      <div className="flex items-end">
        <Button href="/destinations" className="h-12 w-full px-6">
          Search
        </Button>
      </div>
    </form>
  );
}