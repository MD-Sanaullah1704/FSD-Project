const express = require("express");
const router = express.Router();

const {
  getJobs,
  getJobById,
  createJob,
  deleteJob,
} = require("../controllers/jobController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

router
  .route("/")
  .get(getJobs)
  .post(
    protect,
    authorize("recruiter"),
    createJob
  );

router
  .route("/:id")
  .get(getJobById)
  .delete(
    protect,
    authorize("recruiter"),
    deleteJob
  );

module.exports = router;