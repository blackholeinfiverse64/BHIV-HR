import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'

// Auth Pages
import SplashScreen from './pages/SplashScreen'
import AuthPage from './pages/auth/AuthPage'

// Candidate Pages
import CandidateProfile from './pages/candidate/CandidateProfile'
import AppliedJobs from './pages/candidate/AppliedJobs'
import InterviewPanel from './pages/candidate/InterviewPanel'
import CandidateFeedback from './pages/candidate/CandidateFeedback'

// Recruiter Pages
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard'
import JobCreation from './pages/recruiter/JobCreation'
import ApplicantsMatching from './pages/recruiter/ApplicantsMatching'
import RecruiterFeedback from './pages/recruiter/RecruiterFeedback'
import AutomationPanel from './pages/recruiter/AutomationPanel'

// Client Pages
import ClientDashboard from './pages/client/ClientDashboard'
import ShortlistReview from './pages/client/ShortlistReview'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Splash & Auth */}
      <Route path="/" element={<SplashScreen />} />
      <Route path="/auth/:role" element={<AuthPage />} />

      {/* Candidate Routes */}
      <Route path="/candidate" element={<Layout userType="candidate" />}>
        <Route index element={<Navigate to="/candidate/profile" replace />} />
        <Route path="profile" element={<CandidateProfile />} />
        <Route path="applied-jobs" element={<AppliedJobs />} />
        <Route path="interviews" element={<InterviewPanel />} />
        <Route path="feedback" element={<CandidateFeedback />} />
      </Route>

      {/* Recruiter Routes */}
      <Route path="/recruiter" element={<Layout userType="recruiter" />}>
        <Route index element={<RecruiterDashboard />} />
        <Route path="jobs/new" element={<JobCreation />} />
        <Route path="jobs/:jobId/applicants" element={<ApplicantsMatching />} />
        <Route path="feedback/:candidateId" element={<RecruiterFeedback />} />
        <Route path="automation" element={<AutomationPanel />} />
      </Route>

      {/* Client Routes */}
      <Route path="/client" element={<Layout userType="client" />}>
        <Route index element={<ClientDashboard />} />
        <Route path="jobs/:jobId/shortlist" element={<ShortlistReview />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
