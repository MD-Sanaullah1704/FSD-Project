import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "seeker",
    companyName: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await register(form);
      navigate(user.role === "recruiter" ? "/recruiter/post-job" : "/jobs");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white p-8 border border-slate-100 rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold text-center text-slate-900 mb-2">Create an Account</h2>
        <p className="text-xs text-center text-slate-500 mb-6">Choose how you plan to use JobSphere</p>

        {error && (
          <div className="p-3 mb-4 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Role Selector Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setForm({ ...form, role: "seeker" })}
              className={`py-2 rounded-lg font-semibold transition ${
                form.role === "seeker"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Job Seeker
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, role: "recruiter" })}
              className={`py-2 rounded-lg font-semibold transition ${
                form.role === "recruiter"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Recruiter
            </button>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Alex Morgan"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-slate-900 transition"
            />
          </div>

          {form.role === "recruiter" && (
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Company Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Stripe, Airbnb"
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-slate-900 transition"
              />
            </div>
          )}

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
              minLength={6}
              placeholder="At least 6 characters"
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
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-slate-500 text-xs mt-6">
          Already registered?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;