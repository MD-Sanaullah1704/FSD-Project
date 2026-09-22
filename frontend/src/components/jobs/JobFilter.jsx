import { Search, MapPin, Filter } from "lucide-react";

const JobFilter = ({
  search,
  setSearch,
  location,
  setLocation,
  jobType,
  setJobType,
  onSearch,
}) => {
  return (
    <form
      onSubmit={onSearch}
      className="bg-white dark:bg-[#08233e] p-3 rounded-2xl border border-slate-200 dark:border-[#12355a] shadow-sm mb-8 flex flex-col md:flex-row items-center gap-3 transition"
    >
      {/* Keyword Search */}
      <div className="flex-1 flex items-center gap-2 px-3 py-2 w-full">
        <Search size={18} className="text-slate-400 dark:text-slate-500 shrink-0" />
        <input
          type="text"
          placeholder="Title, skill, or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs sm:text-sm bg-transparent text-brand-navy dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none"
        />
      </div>

      <div className="hidden md:block w-[1px] h-7 bg-slate-200 dark:bg-[#12355a]" />

      {/* Location Filter */}
      <div className="flex-1 flex items-center gap-2 px-3 py-2 w-full">
        <MapPin size={18} className="text-slate-400 dark:text-slate-500 shrink-0" />
        <input
          type="text"
          placeholder="Location (e.g. Remote, Bengaluru)..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full text-xs sm:text-sm bg-transparent text-brand-navy dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none"
        />
      </div>

      <div className="hidden md:block w-[1px] h-7 bg-slate-200 dark:bg-[#12355a]" />

      {/* Job Type Dropdown */}
      <div className="flex items-center gap-2 px-3 py-2 w-full md:w-auto">
        <Filter size={16} className="text-slate-400 dark:text-slate-500 shrink-0" />
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="bg-transparent text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium outline-none cursor-pointer w-full md:w-36"
        >
          <option value="" className="dark:bg-[#08233e]">All Types</option>
          <option value="Full-time" className="dark:bg-[#08233e]">Full-time</option>
          <option value="Part-time" className="dark:bg-[#08233e]">Part-time</option>
          <option value="Contract" className="dark:bg-[#08233e]">Contract</option>
          <option value="Internship" className="dark:bg-[#08233e]">Internship</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full md:w-auto bg-brand-cyan hover:bg-brand-cyan-hover text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-xl transition shadow-sm shrink-0"
      >
        Filter
      </button>
    </form>
  );
};

export default JobFilter;