import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-black text-slate-900">404</h1>
      <h2 className="text-lg font-bold text-slate-800 mt-2">Page Not Found</h2>
      <p className="text-xs text-slate-500 mt-1 max-w-sm">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="mt-6 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;