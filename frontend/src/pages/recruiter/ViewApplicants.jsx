import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getJobApplicants, updateApplicationStatus } from "../../services/applicationService";
import ApplicantCard from "../../components/recruiter/ApplicantCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const ViewApplicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isSubscribed = true;

    const fetchApplicants = async () => {
      try {
        const data = await getJobApplicants(jobId);
        if (isSubscribed) setApplicants(data);
      } catch (err) {
        console.error("Failed to load applicants:", err);
      } finally {
        if (isSubscribed) setLoading(false);
      }
    };

    fetchApplicants();

    return () => {
      isSubscribed = false;
    };
  }, [jobId]);

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await updateApplicationStatus(appId, newStatus);
      setApplicants((prev) =>
        prev.map((app) => (app._id === appId ? { ...app, status: newStatus } : app))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status.");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Link
        to="/recruiter/manage-jobs"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 mb-6 transition"
      >
        <ArrowLeft size={14} /> Back to Job Management
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Job Applicants</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Review portfolio submissions and update candidate stages.
        </p>
      </div>

      {applicants.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center">
          <p className="text-xs text-slate-500">No candidates have applied to this position yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {applicants.map((applicant) => (
            <ApplicantCard
              key={applicant._id}
              applicantData={applicant}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewApplicants;