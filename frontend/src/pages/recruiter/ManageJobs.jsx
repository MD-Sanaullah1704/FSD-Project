import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { fetchJobs, deleteJobListing } from "../../services/jobService";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const ManageJobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isSubscribed = true;

    const loadRecruiterJobs = async () => {
      try {
        const data = await fetchJobs();
        if (isSubscribed) {
          const myJobs = data.filter(
            (job) => (job.postedBy?._id || job.postedBy) === (user?._id || user?.id)
          );
          setJobs(myJobs);
        }
      } catch (err) {
        console.error("Failed to load recruiter jobs:", err);
      } finally {
        if (isSubscribed) setLoading(false);
      }
    };

    if (user) {
      loadRecruiterJobs();
    }

    return () => {
      isSubscribed = false;
    };
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job listing?")) return;
    try {
      await deleteJobListing(id);
      setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete listing.");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Manage Job Postings</h1>
          <p className="text-xs text-slate-500 mt-0.5">Review and manage positions posted by your account.</p>
        </div>
        <Link
          to="/recruiter/post-job"
          className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
        >
          <PlusCircle size={14} />
          Post New Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center">
          <p className="text-xs text-slate-500 mb-4">You have not created any job postings yet.</p>
          <Link
            to="/recruiter/post-job"
            className="inline-flex bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
          >
            Create Your First Listing
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Type</th>
                <th className="p-4">Location</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobs.map((job) => (
                <tr key={job._id} className="hover:bg-slate-50/50 transition">
                  <td className="p-4 font-semibold text-slate-900">{job.title}</td>
                  <td className="p-4 text-slate-500">{job.jobType}</td>
                  <td className="p-4 text-slate-500">{job.location}</td>
                  <td className="p-4 text-right space-x-4">
                    <Link
                      to={`/recruiter/jobs/${job._id}/applicants`}
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      View Applicants
                    </Link>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="text-rose-600 hover:underline font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageJobs;