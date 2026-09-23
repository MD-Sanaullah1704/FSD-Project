const Job = require("../models/Job");

const getJobs = async (req, res) => {
  try {
    const {
      search,
      location,
      experience,
      category,
    } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          company: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (location) {
      query.location = {
        $regex: location,
        $options: "i",
      };
    }

    if (experience) {
      query.experienceLevel = experience;
    }

    if (category) {
      query.category = {
        $regex: category,
        $options: "i",
      };
    }

    const jobs = await Job.find(query)
      .populate("postedBy", "name companyName")
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getJobById = async (req, res) => {
  const job = await Job.findById(req.params.id).populate(
    "postedBy",
    "name companyName email"
  );

  if (job) {
    res.json(job);
  } else {
    res.status(404).json({
      message: "Job not found",
    });
  }
};

const createJob = async (req, res) => {
  const {
    title,
    company,
    location,
    jobType,
    experienceLevel,
    category,
    description,
    requirements,
    salary,
  } = req.body;

  const job = new Job({
    title,
    company: company || req.user.companyName,
    location,
    jobType,
    experienceLevel,
    category,
    description,
    requirements,
    salary,
    postedBy: req.user._id,
  });

  const createdJob = await job.save();

  res.status(201).json(createdJob);
};

const deleteJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

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
      message: "Not authorized to delete this job",
    });
  }

  await job.deleteOne();

  res.json({
    message: "Job removed",
  });
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  deleteJob,
};