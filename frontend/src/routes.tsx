import { Routes, Route, Navigate } from 'react-router-dom'

// Components
import ProtectedRoute from './components/ProtectedRoute'

// Auth Pages
import SplashScreen from './pages/SplashScreen'
import AuthPage from './pages/auth/AuthPage'

// Candidate Pages
import CandidateDashboard from './pages/candidate/CandidateDashboard'
import CandidateProfile from './pages/candidate/CandidateProfile'
import CandidateJobs from './pages/candidate/CandidateJobs'
import CandidateInterviews from './pages/candidate/CandidateInterviews'
import CandidateFeedback from './pages/candidate/CandidateFeedback'

// Recruiter Pages
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard'
import RecruiterJobs from './pages/recruiter/RecruiterJobs'
import RecruiterAutomation from './pages/recruiter/RecruiterAutomation'

// Client Pages
import ClientDashboard from './pages/client/ClientDashboard'
import ClientReports from './pages/client/ClientReports'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Splash & Auth */}
      <Route path="/" element={<SplashScreen />} />
      <Route path="/auth/:role" element={<AuthPage />} />

      {/* Candidate Routes */}
      <Route path="/candidate" element={<Navigate to="/candidate/dashboard" replace />} />
      <Route path="/candidate/dashboard" element={
        <ProtectedRoute>
          <CandidateDashboard />
        </ProtectedRoute>
      } />
      <Route path="/candidate/profile" element={
        <ProtectedRoute>
          <CandidateProfile />
        </ProtectedRoute>
      } />
      <Route path="/candidate/jobs" element={
        <ProtectedRoute>
          <CandidateJobs />
        </ProtectedRoute>
      } />
      <Route path="/candidate/interviews" element={
        <ProtectedRoute>
          <CandidateInterviews />
        </ProtectedRoute>
      } />
      <Route path="/candidate/feedback" element={
        <ProtectedRoute>
          <CandidateFeedback />
        </ProtectedRoute>
      } />

      {/* Recruiter Routes */}
      <Route path="/recruiter" element={<Navigate to="/recruiter/dashboard" replace />} />
      <Route path="/recruiter/dashboard" element={
        <ProtectedRoute>
          <RecruiterDashboard />
        </ProtectedRoute>
      } />
      <Route path="/recruiter/jobs" element={
        <ProtectedRoute>
          <RecruiterJobs />
        </ProtectedRoute>
      } />
      <Route path="/recruiter/automation" element={
        <ProtectedRoute>
          <RecruiterAutomation />
        </ProtectedRoute>
      } />

      {/* Client Routes */}
      <Route path="/client" element={<Navigate to="/client/dashboard" replace />} />
      <Route path="/client/dashboard" element={
        <ProtectedRoute>
          <ClientDashboard />
        </ProtectedRoute>
      } />
      <Route path="/client/reports" element={
        <ProtectedRoute>
          <ClientReports />
        </ProtectedRoute>
      } />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
