import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { getMyApplications } from "../../services/applicationService";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isSubscribed = true;

    const fetchApplications = async () => {
      try {
        const data = await getMyApplications();
        if (isSubscribed) setApplications(data);
      } catch (err) {
        console.error("Failed to load applications:", err);
      } finally {
        if (isSubscribed) setLoading(false);
      }
    };

    fetchApplications();

    return () => {
      isSubscribed = false;
    };
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Rejected":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Reviewed":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Applications</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Track the recruitment stages of your submitted applications.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center">
          <p className="text-xs text-slate-500 mb-4">You have not applied to any positions yet.</p>
          <Link
            to="/jobs"
            className="inline-flex bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
          >
            Explore Jobs
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">Position</th>
                <th className="p-4">Company</th>
                <th className="p-4">Date Applied</th>
                <th className="p-4">Resume Link</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.map((app) => (
                <tr key={app._id} className="hover:bg-slate-50/50 transition">
                  <td className="p-4 font-semibold text-slate-900">{app.job?.title || "Archived Job"}</td>
                  <td className="p-4 text-slate-600">{app.job?.company || "N/A"}</td>
                  <td className="p-4 text-slate-400">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    {app.resumeUrl ? (
                      <a
                        href={app.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline inline-flex items-center gap-1 font-medium"
                      >
                        View Link <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span className="text-slate-400">None attached</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <span
                      className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
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

export default MyApplications;