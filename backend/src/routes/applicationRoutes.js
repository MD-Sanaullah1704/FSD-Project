const express = require("express");
const router = express.Router();

const {
  applyToJob,
  getMyApplications,
  getJobApplicants,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

router.post(
  "/:jobId",
  protect,
  authorize("seeker"),
  applyToJob
);

router.get(
  "/my-applications",
  protect,
  authorize("seeker"),
  getMyApplications
);

router.get(
  "/job/:jobId",
  protect,
  authorize("recruiter"),
  getJobApplicants
);

router.put(
  "/:id/status",
  protect,
  authorize("recruiter"),
  updateApplicationStatus
);

module.exports = router;