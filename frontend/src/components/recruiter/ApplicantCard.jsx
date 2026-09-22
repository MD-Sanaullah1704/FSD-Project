import { ExternalLink } from "lucide-react";
import ApplicantStatusDropdown from "./ApplicantStatusDropdown";

const ApplicantCard = ({ applicantData, onStatusChange }) => {
  const { applicant, resumeUrl, status, createdAt, _id } = applicantData;

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h4 className="font-bold text-sm text-slate-900">{applicant?.name}</h4>
        <p className="text-xs text-slate-500 mt-0.5">{applicant?.email}</p>
        <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
          <span>Applied: {new Date(createdAt).toLocaleDateString()}</span>
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-medium inline-flex items-center gap-1 hover:underline"
            >
              Resume Link <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
      <ApplicantStatusDropdown
        status={status}
        onChange={(newStatus) => onStatusChange(_id, newStatus)}
      />
    </div>
  );
};

export default ApplicantCard;