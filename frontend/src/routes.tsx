import { Routes, Route, Navigate } from 'react-router-dom'

// Components
import ProtectedRoute from './components/ProtectedRoute'

// Auth Pages
import SplashScreen from './pages/SplashScreen'
import AuthPage from './pages/auth/AuthPage'

// Candidate Pages
import CandidateProfile from './pages/candidate/CandidateProfile'

// Recruiter Pages
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard'

// Client Pages
import ClientDashboard from './pages/client/ClientDashboard'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Splash & Auth */}
      <Route path="/" element={<SplashScreen />} />
      <Route path="/auth/:role" element={<AuthPage />} />

      {/* Candidate Dashboard */}
      <Route path="/candidate/profile" element={
        <ProtectedRoute>
          <CandidateProfile />
        </ProtectedRoute>
      } />

      {/* Recruiter Dashboard */}
      <Route path="/recruiter/dashboard" element={
        <ProtectedRoute>
          <RecruiterDashboard />
        </ProtectedRoute>
      } />

      {/* Client Dashboard */}
      <Route path="/client/dashboard" element={
        <ProtectedRoute>
          <ClientDashboard />
        </ProtectedRoute>
      } />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
