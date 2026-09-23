const Application = require("../models/Application");
const Job = require("../models/Job");

const applyToJob = async (req, res) => {
  const { jobId } = req.params;
  const { resumeUrl } = req.body;

  const existingApp = await Application.findOne({
    job: jobId,
    applicant: req.user._id,
  });

  if (existingApp) {
    return res.status(400).json({
      message: "You have already applied to this job",
    });
  }

  const application = await Application.create({
    job: jobId,
    applicant: req.user._id,
    resumeUrl: resumeUrl || req.user.resume,
  });

  res.status(201).json(application);
};

const getMyApplications = async (req, res) => {
  const applications = await Application.find({
    applicant: req.user._id,
  })
    .populate("job")
    .sort({ createdAt: -1 });

  res.json(applications);
};

const getJobApplicants = async (req, res) => {
  const job = await Job.findById(req.params.jobId);

  if (!job) {
    return res.status(404).json({
      message: "Job not found",
    });
  }

  if (
    job.postedBy.toString() !==
    req.user._id.toString()
  ) {
    return res.status(403).json({
      message: "Not authorized",
    });
  }

  const applicants = await Application.find({
    job: req.params.jobId,
  })
    .populate(
      "applicant",
      "name email resume skills"
    )
    .sort({ createdAt: -1 });

  res.json(applicants);
};

const updateApplicationStatus = async (req, res) => {
  const { status } = req.body;

  const application = await Application.findById(
    req.params.id
  );

  if (!application) {
    return res.status(404).json({
      message: "Application not found",
    });
  }

  application.status = status;

  await application.save();

  res.json(application);
};

module.exports = {
  applyToJob,
  getMyApplications,
  getJobApplicants,
  updateApplicationStatus,
};