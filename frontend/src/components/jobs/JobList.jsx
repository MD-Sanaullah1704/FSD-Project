import JobCard from "./JobCard";

const JobList = ({ jobs }) => {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-2xl">
        <p className="text-xs text-slate-500">No jobs found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
};

export default JobList;