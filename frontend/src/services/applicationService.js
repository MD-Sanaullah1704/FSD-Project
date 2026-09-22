import API from "./api";

export const applyToJob = async (jobId, data) => {
  const res = await API.post(`/applications/${jobId}`, data);
  return res.data;
};

export const getMyApplications = async () => {
  const res = await API.get("/applications/my-applications");
  return res.data;
};

export const getJobApplicants = async (jobId) => {
  const res = await API.get(`/applications/job/${jobId}`);
  return res.data;
};

export const updateApplicationStatus = async (applicationId, status) => {
  const res = await API.patch(`/applications/${applicationId}/status`, { status });
  return res.data;
};