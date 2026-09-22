import { Link } from "react-router-dom";
import { MapPin, DollarSign } from "lucide-react";

const JobCard = ({ job }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-slate-300 hover:shadow-sm transition flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-sm">
              {job.company?.charAt(0)}
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-snug">{job.title}</h2>
              <p className="text-xs font-medium text-slate-500">{job.company}</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
            {job.jobType}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-500 my-3">
          <span className="flex items-center gap-1">
            <MapPin size={13} />
            {job.location}
          </span>
          {job.salaryRange && job.salaryRange.max > 0 && (
            <span className="flex items-center gap-0.5 font-medium text-emerald-700">
              <DollarSign size={13} />
              {job.salaryRange.min?.toLocaleString()} - {job.salaryRange.max?.toLocaleString()}
            </span>
          )}
        </div>

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {job.description}
        </p>

        {job.requirements?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-5">
            {job.requirements.slice(0, 3).map((r, i) => (
              <span
                key={i}
                className="text-[10px] bg-slate-50 border border-slate-100 text-slate-600 px-2 py-0.5 rounded"
              >
                {r}
              </span>
            ))}
            {job.requirements.length > 3 && (
              <span className="text-[10px] text-slate-400 self-center">
                +{job.requirements.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      <Link
        to={`/jobs/${job._id}`}
        className="w-full text-center bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-800 text-xs font-semibold py-2 rounded-xl border border-slate-200 hover:border-slate-900 transition"
      >
        View Details
      </Link>
    </div>
  );
};

export default JobCard;