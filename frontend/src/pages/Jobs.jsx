import { useState, useEffect } from "react";
import { fetchJobs } from "../services/jobService";
import JobFilter from "../components/jobs/JobFilter";
import JobList from "../components/jobs/JobList";
import LoadingSpinner from "../components/common/LoadingSpinner";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("");
  const [loading, setLoading] = useState(true);

  // Initial load and filter change
  useEffect(() => {
    let isSubscribed = true;

    const getJobs = async () => {
      setLoading(true);
      try {
        const data = await fetchJobs({ search: "", jobType });
        if (isSubscribed) setJobs(data);
      } catch (err) {
        console.error("Failed to load jobs:", err);
      } finally {
        if (isSubscribed) setLoading(false);
      }
    };

    getJobs();

    return () => {
      isSubscribed = false;
    };
  }, [jobType]);

  // Search form submit
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await fetchJobs({ search, jobType });
      setJobs(data);
    } catch (err) {
      console.error("Failed to search jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Explore Open Roles</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Verified technical opportunities updated in real time.
        </p>
      </div>

      <JobFilter
        search={search}
        setSearch={setSearch}
        jobType={jobType}
        setJobType={setJobType}
        onSearch={handleSearch}
      />

      {loading ? <LoadingSpinner /> : <JobList jobs={jobs} />}
    </div>
  );
};

export default Jobs;