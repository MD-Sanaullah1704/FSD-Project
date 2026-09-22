import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Briefcase,
  ChevronRight,
  ChevronDown,
  Building2,
  GraduationCap,
  Rocket,
  Code2,
  Laptop,
  Cpu,
  Globe,
  Sparkles,
  ArrowRight,
  Building,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Multi-segment search states
  const [keyword, setKeyword] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.append("search", keyword.trim());
    if (location.trim()) params.append("location", location.trim());
    if (experience) params.append("experience", experience);
    navigate(`/jobs?${params.toString()}`);
  };

  // Quick category tiles
  const quickCategories = [
    { label: "Remote", icon: Laptop, query: "Remote" },
    { label: "MNC", icon: Building2, query: "MNC" },
    { label: "Fresher", icon: GraduationCap, query: "Fresher" },
    { label: "Internship", icon: Briefcase, query: "Internship" },
    { label: "Engineering", icon: Code2, query: "Engineering" },
    { label: "Startup", icon: Rocket, query: "Startup" },
    { label: "Cloud & DevOps", icon: Cpu, query: "DevOps" },
    { label: "Full Stack", icon: Globe, query: "Full Stack" },
  ];

  // Featured hiring companies
  const featuredCompanies = [
    {
      name: "Stripe",
      logo: "S",
      rating: "4.8",
      reviews: "1.2k+ reviews",
      tag: "Fintech Leader",
      openings: 24,
    },
    {
      name: "Atlassian",
      logo: "A",
      rating: "4.7",
      reviews: "3.4k+ reviews",
      tag: "Product & SaaS",
      openings: 42,
    },
    {
      name: "Razorpay",
      logo: "R",
      rating: "4.6",
      reviews: "2.1k+ reviews",
      tag: "Unicorn Startup",
      openings: 18,
    },
    {
      name: "Databricks",
      logo: "D",
      rating: "4.9",
      reviews: "950+ reviews",
      tag: "AI & Data Lakehouse",
      openings: 31,
    },
  ];

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 border-b border-slate-100 dark:border-[#12355a] overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-80 bg-gradient-to-b from-brand-cyan/10 via-transparent to-transparent pointer-events-none blur-3xl -z-10" />

        <div className="max-w-5xl mx-auto px-6 text-center">
          {/* Active Metric Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-cyan-light dark:bg-brand-cyan/15 border border-brand-cyan/25 px-3.5 py-1.5 rounded-full text-brand-cyan font-semibold text-xs mb-6 shadow-xs">
            <Sparkles size={14} className="text-brand-cyan" />
            <span>Over 5,00,000+ verified tech roles active</span>
          </div>

          {/* Centered Primary Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-brand-navy dark:text-white tracking-tight leading-[1.15]">
            Connecting ambition with{" "}
            <span className="text-brand-cyan">the right opportunity.</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
            Thousands of verified opportunities across top product firms and cutting-edge startups.
          </p>

          {/* Unified Multi-Segment Pill Search Bar */}
          <form
            onSubmit={handleSearch}
            className="mt-10 max-w-4xl mx-auto bg-white dark:bg-[#08233e] p-2.5 rounded-3xl lg:rounded-full border border-slate-200/90 dark:border-[#12355a] shadow-xl shadow-slate-200/60 dark:shadow-none flex flex-col lg:flex-row items-center gap-2 transition"
          >
            {/* Segment 1: Skills / Designations / Companies */}
            <div className="flex-1 flex items-center gap-3 px-4 py-2.5 w-full">
              <Search size={18} className="text-slate-400 dark:text-slate-500 shrink-0" />
              <input
                type="text"
                placeholder="Enter skills / designations / companies"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full text-xs sm:text-sm bg-transparent text-brand-navy dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none"
              />
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block w-[1px] h-8 bg-slate-200 dark:bg-[#12355a]" />

            {/* Segment 2: Experience Dropdown */}
            <div className="flex items-center gap-2 px-4 py-2.5 w-full lg:w-auto relative cursor-pointer">
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="appearance-none bg-transparent text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium outline-none cursor-pointer pr-6 w-full lg:w-40"
              >
                <option value="" className="dark:bg-[#08233e]">Select experience</option>
                <option value="fresher" className="dark:bg-[#08233e]">Fresher (Less than 1 yr)</option>
                <option value="1-3" className="dark:bg-[#08233e]">1 - 3 years</option>
                <option value="3-5" className="dark:bg-[#08233e]">3 - 5 years</option>
                <option value="5+" className="dark:bg-[#08233e]">5+ years</option>
              </select>
              <ChevronDown size={14} className="text-slate-400 absolute right-4 pointer-events-none" />
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block w-[1px] h-8 bg-slate-200 dark:bg-[#12355a]" />

            {/* Segment 3: Location */}
            <div className="flex-1 flex items-center gap-3 px-4 py-2.5 w-full">
              <MapPin size={18} className="text-slate-400 dark:text-slate-500 shrink-0" />
              <input
                type="text"
                placeholder="Enter location / Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-xs sm:text-sm bg-transparent text-brand-navy dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none"
              />
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full lg:w-auto bg-brand-cyan hover:bg-brand-cyan-hover text-white text-xs sm:text-sm font-semibold px-8 py-3 rounded-full transition duration-150 flex items-center justify-center gap-2 shadow-sm shrink-0"
            >
              Search
            </button>
          </form>

          {/* Quick-Filter Category Tiles */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {quickCategories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(`/jobs?search=${encodeURIComponent(cat.query)}`)}
                  className="flex items-center justify-between gap-2.5 px-4 py-3 rounded-2xl bg-white dark:bg-[#08233e] border border-slate-200/80 dark:border-[#12355a] hover:border-brand-cyan dark:hover:border-brand-cyan hover:shadow-md transition-all cursor-pointer group text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:bg-brand-cyan-light dark:group-hover:bg-brand-cyan/20 group-hover:text-brand-cyan transition">
                      <cat.icon size={16} />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-brand-navy dark:text-slate-200 group-hover:text-brand-cyan transition">
                      {cat.label}
                    </span>
                  </div>
                  <ChevronRight size={14} className="text-slate-400 group-hover:text-brand-cyan group-hover:translate-x-0.5 transition shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Companies Section */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-brand-navy dark:text-white">
              Top companies hiring now
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Connect directly with verified engineering teams and unicorns.
            </p>
          </div>
          <Link
            to="/jobs"
            className="text-xs font-semibold text-brand-cyan hover:underline inline-flex items-center gap-1"
          >
            View all companies <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredCompanies.map((comp, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-[#08233e] border border-slate-100 dark:border-[#12355a] hover:border-brand-cyan dark:hover:border-brand-cyan transition shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy dark:bg-[#12355a] text-white flex items-center justify-center font-bold text-sm">
                    {comp.logo}
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                    ★ {comp.rating}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-brand-navy dark:text-white">{comp.name}</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">{comp.reviews}</p>
                <span className="inline-block mt-3 text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md">
                  {comp.tag}
                </span>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-[#12355a] flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {comp.openings} Openings
                </span>
                <Link
                  to={`/jobs?search=${encodeURIComponent(comp.name)}`}
                  className="text-xs font-semibold text-brand-cyan hover:underline"
                >
                  View jobs
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Candidate Value Proposition Grid */}
      <section className="py-16 bg-slate-50/60 dark:bg-[#08233e]/30 border-y border-slate-100 dark:border-[#12355a]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-brand-navy dark:text-white">
              Why engineers choose JobSphere
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
              Engineered for speed, zero spam, and authentic technical screening.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Building,
                title: "Direct Recruiter Inbox",
                desc: "Your application routes straight to the hiring manager’s pipeline without intermediate bots.",
              },
              {
                icon: TrendingUp,
                title: "Live Status Synchronization",
                desc: "Track whether your profile is Under Review, Shortlisted, or Decided in real time.",
              },
              {
                icon: Sparkles,
                title: "Transparent Salary Bands",
                desc: "Compensation figures are published upfront so you can evaluate expectations immediately.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#08233e] p-6 rounded-2xl border border-slate-100 dark:border-[#12355a] shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-cyan-light dark:bg-brand-cyan/20 text-brand-cyan flex items-center justify-center mb-4">
                  <feature.icon size={20} />
                </div>
                <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruiter / Seeker Conversion Box */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="relative overflow-hidden bg-brand-navy dark:bg-[#08233e] text-white rounded-3xl p-8 sm:p-12 border border-brand-navy-dark dark:border-[#12355a] shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="font-bold tracking-wider text-xs uppercase text-brand-cyan block mb-2">
              For Recruiters & Employers
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Looking to scale your engineering team?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Post positions in minutes, review inbound candidate resumes, and manage pipeline progression in a unified dashboard.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/jobs"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl transition"
            >
              Search Open Roles
            </Link>
            {!user && (
              <Link
                to="/register"
                className="bg-brand-cyan hover:bg-brand-cyan-hover text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl transition shadow-sm"
              >
                Post a Job Free
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;