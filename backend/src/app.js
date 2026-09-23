const express = require("express");
const cors = require("cors");
const path = require("path");

const {
  errorHandler,
  notFound,
} = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// CORS
app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      "http://localhost:5173",
    credentials: true,
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads folder
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "../uploads")
  )
);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use(
  "/api/applications",
  applicationRoutes
);
app.use("/api/users", userRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;