import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut, PlusCircle, Sun, Moon } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../context/ThemeContext";
import logoLight from "../../assets/logo.png";
import logoDark from "../../assets/logo-dark.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinkStyle = ({ isActive }) =>
    `text-xs sm:text-sm font-medium transition duration-150 ${
      isActive
        ? "text-brand-cyan font-bold"
        : "text-slate-600 dark:text-slate-300 hover:text-brand-cyan dark:hover:text-brand-cyan"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#08233e]/90 backdrop-blur-md border-b border-slate-100 dark:border-[#12355a] transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Switch */}
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={darkMode ? logoDark : logoLight}
            alt="Job Portal"
            className="w-9 h-9 object-contain"
          />
          <span className="font-extrabold text-lg tracking-tight text-brand-navy dark:text-white">
            JobSphere<span className="text-brand-cyan">.</span>
          </span>
        </Link>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navLinkStyle}>Home</NavLink>
          <NavLink to="/jobs" className={navLinkStyle}>Browse Jobs</NavLink>
          {user?.role === "seeker" && (
            <NavLink to="/seeker/my-applications" className={navLinkStyle}>
              My Applications
            </NavLink>
          )}
          {user?.role === "recruiter" && (
            <NavLink to="/recruiter/manage-jobs" className={navLinkStyle}>
              Recruiter Hub
            </NavLink>
          )}
        </nav>

        {/* Right Section Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-xl text-slate-500 hover:text-brand-navy dark:text-slate-300 dark:hover:text-brand-cyan hover:bg-slate-100 dark:hover:bg-[#12355a]/60 transition"
          >
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              {user.role === "recruiter" && (
                <Link
                  to="/recruiter/post-job"
                  className="hidden sm:flex items-center gap-1.5 bg-brand-cyan hover:bg-brand-cyan-hover text-white text-xs font-semibold px-3 py-2 rounded-xl transition shadow-sm"
                >
                  <PlusCircle size={14} />
                  Post Job
                </Link>
              )}

              <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-[#12355a]">
                <div className="w-8 h-8 rounded-full bg-brand-cyan-light dark:bg-brand-cyan/20 text-brand-cyan flex items-center justify-center text-xs font-bold border border-brand-cyan/30">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block text-left text-xs">
                  <p className="font-semibold text-brand-navy dark:text-white leading-tight">
                    {user.name}
                  </p>
                  <p className="text-slate-400 capitalize">{user.role}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                title="Sign Out"
                className="text-slate-400 hover:text-rose-500 p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-cyan px-3 py-1.5 transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-brand-navy dark:bg-brand-cyan dark:hover:bg-brand-cyan-hover text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition shadow-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;