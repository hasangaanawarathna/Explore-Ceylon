import { Button } from "@/components/Button";

export function SearchBar() {
  return (
    <form
      action="/destinations"
      method="get"
      className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/70 sm:rounded-[2rem] sm:p-5 lg:grid-cols-[1.2fr_1fr_1fr_auto]"
    >
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Destination
        <input
          name="destination"
          type="text"
          placeholder="Sigiriya, Ella, Mirissa..."
          className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white sm:rounded-2xl sm:text-sm"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Travel style
        <select
          name="style"
          className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white sm:rounded-2xl sm:text-sm"
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
          className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white sm:rounded-2xl sm:text-sm"
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
