import api from "./api";

// Sample mock data for offline frontend testing
const MOCK_JOBS = [
  {
    _id: "mock-1",
    title: "Senior Full Stack Engineer",
    company: "Stripe",
    location: "Remote",
    jobType: "Full-time",
    description: "Design and implement scalable payment orchestration APIs and modern React internal dashboards.",
    requirements: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    salaryRange: { min: 130000, max: 170000 },
    createdAt: new Date().toISOString(),
  },
  {
    _id: "mock-2",
    title: "Frontend Architect",
    company: "Razorpay",
    location: "Bengaluru, India",
    jobType: "Full-time",
    description: "Lead UI architecture for checkout flow applications with strict sub-second performance targets.",
    requirements: ["React", "Tailwind CSS", "Next.js", "GraphQL"],
    salaryRange: { min: 95000, max: 140000 },
    createdAt: new Date().toISOString(),
  },
  {
    _id: "mock-3",
    title: "DevOps / Infrastructure Intern",
    company: "Databricks",
    location: "Remote",
    jobType: "Internship",
    description: "Assist with automated CI/CD pipeline optimization and Kubernetes container orchestration.",
    requirements: ["Docker", "Kubernetes", "AWS", "Linux"],
    salaryRange: { min: 45000, max: 65000 },
    createdAt: new Date().toISOString(),
  },
];

export const fetchJobs = async (params = {}) => {
  try {
    const { data } = await api.get("/jobs", { params });
    return data;
  } catch {
    // If backend is offline, filter through mock data so UI functions properly
    let results = [...MOCK_JOBS];
    if (params.search) {
      const q = params.search.toLowerCase();
      results = results.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.requirements.some((r) => r.toLowerCase().includes(q))
      );
    }
    if (params.jobType) {
      results = results.filter((j) => j.jobType === params.jobType);
    }
    return results;
  }
};

export const fetchJobById = async (id) => {
  try {
    const { data } = await api.get(`/jobs/${id}`);
    return data;
  } catch {
    return MOCK_JOBS.find((j) => j._id === id) || MOCK_JOBS[0];
  }
};

export const createJobListing = async (jobData) => {
  const { data } = await api.post("/jobs", jobData);
  return data;
};

export const deleteJobListing = async (id) => {
  const { data } = await api.delete(`/jobs/${id}`);
  return data;
};