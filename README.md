MERN Job Portal & Recruitment Platform
A full-stack web application designed to connect job seekers with recruiters. The platform supports role-based access control, JWT-based authentication, real-time job searching and filtering, job posting management, and applicant tracking.

Table of Contents
Features

Tech Stack

Architecture & Data Models

API Endpoints

Project Structure

Getting Started

Prerequisites

Backend Setup

Frontend Setup

Database Seeding

Environment Variables

Demo Credentials

Features
For Job Seekers
Authentication & Profile: Secure registration and login using JWT.

Job Discovery: Browse and search job listings with dynamic filters (keywords, job type, location).

Application Management: Submit applications with portfolio/resume links and track application status (Pending, Reviewed, Accepted, Rejected) in a dedicated dashboard.

For Recruiters
Job Posting & CRUD: Create, view, and delete job openings with salary ranges, categories, and technical requirements.

Applicant Review Dashboard: View candidates who applied for each specific posting.

Status Updates: Update applicant recruitment stages in real time.

Tech Stack
Frontend: React.js, Tailwind CSS, Axios, React Router v6, Context API

Backend: Node.js, Express.js

Database: MongoDB Atlas with Mongoose ODM

Security & Auth: JSON Web Tokens (JWT), Bcrypt.js

Architecture & Data Models
User Schema: Stores credentials, role (seeker or recruiter), and profile attributes.

Job Schema: Includes title, description, company, location, requirements, salary range, job type, and references the posting recruiter (postedBy). Indexed with MongoDB $text for keyword search.

Application Schema: Manages relations between User and Job, tracking submission dates, resume URLs, and application statuses. A unique compound index prevents duplicate submissions.

API Endpoints
Authentication (/api/auth)
POST /api/auth/register – Register a new seeker or recruiter account.

POST /api/auth/login – Validate credentials and issue JWT.

GET /api/auth/me – Fetch current session profile (Protected).

Job Listings (/api/jobs)
GET /api/jobs – Fetch jobs with query filters (search, jobType, location).

GET /api/jobs/:id – Fetch single job listing details.

POST /api/jobs – Publish a new job (Recruiter only).

DELETE /api/jobs/:id – Remove a job listing (Recruiter only).

Job Applications (/api/applications)
POST /api/applications/:jobId – Apply to a job listing (Seeker only).

GET /api/applications/my-applications – List user's submitted applications (Seeker only).

GET /api/applications/job/:jobId – Retrieve all applicants for a specific posting (Recruiter only).

PATCH /api/applications/:id/status – Update candidate application status (Recruiter only).

Project Structure
Plaintext
mern-job-portal/
├── backend/
│   ├── src/
│   │   ├── config/          # MongoDB Atlas connection
│   │   ├── controllers/     # Route logic (auth, jobs, applications)
│   │   ├── middleware/      # JWT verification & role authorization
│   │   ├── models/          # Mongoose schemas (User, Job, Application)
│   │   ├── routes/          # Express route definitions
│   │   ├── utils/           # JWT generation helper
│   │   ├── app.js           # Express app setup & CORS
│   │   ├── seed.js          # Database seeding script
│   │   └── server.js        # Server listener
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Navbar, ProtectedRoute, shared UI
│   │   ├── context/         # AuthContext provider
│   │   ├── pages/           # Home, Login, Register, Jobs, Dashboards
│   │   ├── services/        # Axios API client & endpoints
│   │   ├── App.jsx          # Router & route definitions
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── package.json
└── README.md
Getting Started
Prerequisites
Node.js (v18+ recommended)

npm or yarn

A MongoDB Atlas database connection string

Backend Setup
Open a terminal and navigate to the backend directory:

Bash
cd backend
Install dependencies:

Bash
npm install
Create a .env file in the backend/ root directory (refer to Environment Variables).

Start the backend development server:

Bash
npm run dev
The backend server will run on http://localhost:5000.

Frontend Setup
Open a new terminal and navigate to the frontend directory:

Bash
cd frontend
Install dependencies:

Bash
npm install
Create a .env file in the frontend/ directory (refer to Environment Variables).

Start the frontend development server:

Bash
npm run dev
The client will run on http://localhost:5173.

Database Seeding
To quickly populate MongoDB with sample recruiters, applicants, and job listings:

Bash
cd backend
npm run seed
Environment Variables
Backend (backend/.env)
Code snippet
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/jobportal?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
CLIENT_URL=http://localhost:5173
Frontend (frontend/.env)
Code snippet
VITE_API_BASE_URL=http://localhost:5000/api
