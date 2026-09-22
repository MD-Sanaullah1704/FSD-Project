import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import NotFound from "./pages/NotFound";

import MyApplications from "./pages/seeker/MyApplications";
import Profile from "./pages/seeker/Profile";

import PostJob from "./pages/recruiter/PostJob";
import ManageJobs from "./pages/recruiter/ManageJobs";
import ViewApplicants from "./pages/recruiter/ViewApplicants";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-main)] transition-colors duration-200 font-sans">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<ProtectedRoute allowedRoles={["seeker"]} />}>
                  <Route path="/seeker/my-applications" element={<MyApplications />} />
                  <Route path="/seeker/profile" element={<Profile />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={["recruiter"]} />}>
                  <Route path="/recruiter/post-job" element={<PostJob />} />
                  <Route path="/recruiter/manage-jobs" element={<ManageJobs />} />
                  <Route path="/recruiter/jobs/:jobId/applicants" element={<ViewApplicants />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;