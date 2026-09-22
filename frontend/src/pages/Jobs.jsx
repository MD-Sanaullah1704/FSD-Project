import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchJobs } from "../services/jobService";
import JobFilter from "../components/jobs/JobFilter";
import JobList from "../components/jobs/JobList";
import LoadingSpinner from "../components/common/LoadingSpinner";

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialized directly from URL query parameters (e.g. from the home page)
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [jobType, setJobType] = useState(searchParams.get("jobType") || "");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch job listings whenever filter values change
  useEffect(() => {
    let isSubscribed = true;

    const loadJobs = async () => {
      setLoading(true);
      try {
        const data = await fetchJobs({ search, location, jobType });
        if (isSubscribed) setJobs(data);
      } catch (err) {
        console.error("Failed to load jobs:", err);
      } finally {
        if (isSubscribed) setLoading(false);
      }
    };

    loadJobs();

    return () => {
      isSubscribed = false;
    };
  }, [search, location, jobType]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = {};
    if (search) params.search = search;
    if (location) params.location = location;
    if (jobType) params.jobType = jobType;
    setSearchParams(params);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-brand-navy dark:text-white">
          Explore Open Roles
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Verified technical opportunities updated in real time.
        </p>
      </div>

      <JobFilter
        search={search}
        setSearch={setSearch}
        location={location}
        setLocation={setLocation}
        jobType={jobType}
        setJobType={setJobType}
        onSearch={handleSearch}
      />

      {loading ? <LoadingSpinner /> : <JobList jobs={jobs} />}
    </div>
  );
};

export default Jobs;