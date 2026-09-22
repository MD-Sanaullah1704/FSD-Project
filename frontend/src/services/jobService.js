import API from "./api";

export const fetchJobs = async (params = {}) => {
  const res = await API.get("/jobs", { params });
  return res.data;
};

export const fetchJobById = async (id) => {
  const res = await API.get(`/jobs/${id}`);
  return res.data;
};

export const createJobListing = async (jobData) => {
  const res = await API.post("/jobs", jobData);
  return res.data;
};

export const deleteJobListing = async (id) => {
  const res = await API.delete(`/jobs/${id}`);
  return res.data;
};