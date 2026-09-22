import { Search } from "lucide-react";

const JobFilter = ({ search, setSearch, jobType, setJobType, onSearch }) => {
  return (
    <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm mb-8">
      <form onSubmit={onSearch} className="flex flex-col md:flex-row gap-2.5">
        <div className="flex-1 flex items-center gap-2.5 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search by job title, skill, or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent w-full text-xs sm:text-sm outline-none text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs sm:text-sm text-slate-700 outline-none cursor-pointer"
        >
          <option value="">All Employment Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <button
          type="submit"
          className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm px-6 py-2 rounded-xl transition"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default JobFilter;