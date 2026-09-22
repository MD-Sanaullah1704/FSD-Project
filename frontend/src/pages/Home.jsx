import { Link } from "react-router-dom";
import { ArrowRight, Search, Briefcase, Building2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-200">
      {/* Hero Header */}
      <section className="pt-16 pb-20 border-b border-slate-100 dark:border-[#12355a] bg-gradient-to-b from-brand-navy-light/40 dark:from-[#08233e]/50 to-transparent text-center transition-colors">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-brand-cyan-light dark:bg-brand-cyan/15 border border-brand-cyan/20 px-3 py-1 rounded-full text-brand-cyan font-semibold text-xs mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
            Over 1,200+ Verified Positions Active
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-brand-navy dark:text-white tracking-tight leading-tight">
            Find technical roles at <br className="hidden sm:inline" />
            <span className="text-brand-cyan">fast-moving startups.</span>
          </h1>

          <p className="mt-5 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto font-normal">
            Direct recruiter access, verified salary bands, and zero repetitive multi-page application forms.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/jobs"
              className="inline-flex items-center justify-center gap-2 bg-brand-navy dark:bg-brand-cyan hover:bg-brand-navy-dark dark:hover:bg-brand-cyan-hover text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-sm"
            >
              Browse Openings <ArrowRight size={15} />
            </Link>
            {!user && (
              <Link
                to="/register"
                className="bg-white dark:bg-[#08233e] border border-slate-200 dark:border-[#12355a] text-brand-navy dark:text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-[#12355a]/60 transition"
              >
                Hire as Recruiter
              </Link>
            )}
          </div>

          {/* Social Proof Stats */}
          <div className="mt-14 pt-10 border-t border-slate-100 dark:border-[#12355a] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div>
              <p className="text-2xl font-bold text-brand-navy dark:text-white">10k+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Active candidates</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-brand-navy dark:text-white">800+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Partner companies</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-brand-navy dark:text-white">24 hrs</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Avg. response time</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-brand-navy dark:text-white">100%</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Direct hiring</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16 max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
        {[
          {
            icon: Search,
            title: "Verified Listings",
            desc: "Filter by compensation ranges, location flexibility, and required tech stacks in real time.",
          },
          {
            icon: Briefcase,
            title: "1-Click Submissions",
            desc: "Attach your portfolio or resume directly to hiring managers with no automated screening bots.",
          },
          {
            icon: Building2,
            title: "Candidate Tracking",
            desc: "Monitor your application pipeline from initial review to decisions in a dedicated dashboard.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl border border-slate-100 dark:border-[#12355a] bg-brand-navy-light/30 dark:bg-[#08233e] transition"
          >
            <item.icon size={20} className="text-brand-cyan mb-3" />
            <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-1">
              {item.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;