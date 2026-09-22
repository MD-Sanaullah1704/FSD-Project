import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(form.email, form.password);
      navigate(user.role === "recruiter" ? "/recruiter/manage-jobs" : "/jobs");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid login credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 border border-slate-100 rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold text-center text-slate-900 mb-2">Welcome Back</h2>
        <p className="text-xs text-center text-slate-500 mb-6">Sign in to access your dashboard</p>

        {error && (
          <div className="p-3 mb-4 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="you@domain.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-slate-900 transition"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-slate-900 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white font-semibold py-2.5 rounded-xl hover:bg-slate-800 transition disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-slate-500 text-xs mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;