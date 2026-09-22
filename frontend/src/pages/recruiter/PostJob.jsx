import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJobListing } from "../../services/jobService";

const PostJob = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "Full-time",
    requirements: "",
    minSalary: "",
    maxSalary: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await createJobListing({
        title: form.title,
        company: form.company,
        location: form.location,
        jobType: form.jobType,
        description: form.description,
        requirements: form.requirements
          ? form.requirements.split(",").map((req) => req.trim()).filter(Boolean)
          : [],
        salaryRange: {
          min: form.minSalary ? Number(form.minSalary) : 0,
          max: form.maxSalary ? Number(form.maxSalary) : 0,
        },
      });
      navigate("/recruiter/manage-jobs");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create job listing.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="bg-white p-8 border border-slate-100 rounded-2xl shadow-sm">
        <h1 className="text-xl font-bold text-slate-900 mb-2">Create Job Posting</h1>
        <p className="text-xs text-slate-500 mb-6">
          Publish an open position to our candidate community.
        </p>

        {error && (
          <div className="p-3 mb-4 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Job Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Senior Frontend Engineer"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-slate-900 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Company</label>
              <input
                type="text"
                required
                placeholder="Company Name"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-slate-900 transition"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Location</label>
              <input
                type="text"
                required
                placeholder="e.g. Remote / Bengaluru"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-slate-900 transition"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Employment Type</label>
            <select
              value={form.jobType}
              onChange={(e) => setForm({ ...form, jobType: e.target.value })}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-slate-900 bg-white"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Min Annual Salary ($)</label>
              <input
                type="number"
                placeholder="e.g. 60000"
                value={form.minSalary}
                onChange={(e) => setForm({ ...form, minSalary: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-slate-900 transition"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Max Annual Salary ($)</label>
              <input
                type="number"
                placeholder="e.g. 90000"
                value={form.maxSalary}
                onChange={(e) => setForm({ ...form, maxSalary: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-slate-900 transition"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Skills / Requirements (comma-separated)
            </label>
            <input
              type="text"
              placeholder="React, TypeScript, Node.js, Tailwind"
              value={form.requirements}
              onChange={(e) => setForm({ ...form, requirements: e.target.value })}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-slate-900 transition"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Job Description</label>
            <textarea
              rows={5}
              required
              placeholder="Outline responsibilities, team dynamics, and expectations..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-slate-900 transition"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl transition disabled:opacity-50"
          >
            {submitting ? "Publishing..." : "Publish Job Posting"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;