const User = require("../models/User");

const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;

    user.skills =
      req.body.skills || user.skills;

    user.companyName =
      req.body.companyName || user.companyName;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      skills: updatedUser.skills,
      companyName: updatedUser.companyName,
      resume: updatedUser.resume,
    });
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
};

const uploadResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "Please upload a file",
    });
  }

  const user = await User.findById(req.user._id);

  user.resume = `/${req.file.path.replace(
    /\\/g,
    "/"
  )}`;

  await user.save();

  res.json({
    message: "Resume uploaded successfully",
    resumeUrl: user.resume,
  });
};

module.exports = {
  updateUserProfile,
  uploadResume,
};