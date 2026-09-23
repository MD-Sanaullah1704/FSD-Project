const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    jobType: {
      type: String,
      enum: [
        "Full-time",
        "Part-time",
        "Remote",
        "Internship",
        "Contract",
      ],
      default: "Full-time",
    },

    experienceLevel: {
      type: String,
      enum: ["fresher", "1-3", "3-5", "5+"],
      required: true,
    },

    category: {
      type: String,
      default: "Engineering",
    },

    description: {
      type: String,
      required: true,
    },

    requirements: [
      {
        type: String,
      },
    ],

    salary: {
      type: String,
      default: "Not disclosed",
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Text search
jobSchema.index({
  title: "text",
  company: "text",
  description: "text",
});

module.exports = mongoose.model("Job", jobSchema);