const express = require("express");
const router = express.Router();

const {
  updateUserProfile,
  uploadResume,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

router.put(
  "/profile",
  protect,
  updateUserProfile
);

router.post(
  "/upload-resume",
  protect,
  upload.single("resume"),
  uploadResume
);

module.exports = router;