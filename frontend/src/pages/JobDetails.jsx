import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, DollarSign, Briefcase } from "lucide-react";
import { fetchJobById } from "../services/jobService";
import { applyToJob } from "../services/applicationService";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "../components/common/LoadingSpinner";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [job, setJob] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJobById(id)
      .then(setJob)
      .catch((err) => setError(err.response?.data?.message || "Job not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");
    if (user.role !== "seeker") {
      return setError("Recruiter accounts cannot submit applications.");
    }

    setSubmitting(true);
    setError("");

    try {
      await applyToJob(id, { resumeUrl });
      setApplied(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit application.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!job) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center text-xs text-rose-600">
        {error || "Position unavailable."}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
        {/* Header Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
            <p className="text-xs font-medium text-slate-500 mt-1">{job.company}</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
            {job.jobType}
          </span>
        </div>

        {/* Metadata Pills */}
        <div className="flex flex-wrap items-center gap-5 text-xs text-slate-500 my-6 pb-6 border-b border-slate-100">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-slate-400" />
            {job.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Briefcase size={14} className="text-slate-400" />
            {job.jobType}
          </span>
          {job.salaryRange && job.salaryRange.max > 0 && (
            <span className="flex items-center gap-1 font-medium text-emerald-700">
              <DollarSign size={14} className="text-emerald-600" />
              ${job.salaryRange.min?.toLocaleString()} - ${job.salaryRange.max?.toLocaleString()}
            </span>
          )}
        </div>

        {/* Requirements */}
        {job.requirements && job.requirements.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
              Required Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {job.requirements.map((req, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-slate-50 border border-slate-100 text-slate-700 px-2.5 py-1 rounded-lg"
                >
                  {req}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
            Job Description
          </h2>
          <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
            {job.description}
          </div>
        </div>

        {/* Application Form */}
        <div className="pt-6 border-t border-slate-100">
          {applied ? (
            <div className="p-4 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-xl border border-emerald-100">
              Application submitted successfully. Track status inside your Seeker Dashboard.
            </div>
          ) : (
            <form onSubmit={handleApply} className="space-y-4">
              <h3 className="font-bold text-sm text-slate-900">Apply for this Position</h3>
              {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Resume / Portfolio Link (Google Drive, LinkedIn, or Portfolio URL)
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/..."
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-slate-900 transition"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-6 py-2.5 rounded-xl transition disabled:opacity-50"
              >
                {submitting ? "Submitting Application..." : "Submit Application"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;