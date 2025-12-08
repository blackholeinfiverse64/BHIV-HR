import Layout from '../../components/Layout'
import { Briefcase, Calendar, FileText, TrendingUp, Clock, CheckCircle } from 'lucide-react'

export default function CandidateDashboard() {
  return (
    <Layout userType="candidate">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Candidate Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your job search overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-purple-200/50 p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-lg">+3 New</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">12</p>
            <p className="text-sm text-gray-600">Active Applications</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-blue-200/50 p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-lg">This Week</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">3</p>
            <p className="text-sm text-gray-600">Upcoming Interviews</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-green-200/50 p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-lg">66%</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">8</p>
            <p className="text-sm text-gray-600">Shortlisted</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-orange-200/50 p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-lg">88%</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">4.2</p>
            <p className="text-sm text-gray-600">Avg Match Score</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Applications */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-purple-200/50 p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-600" />
              Recent Applications
            </h2>
            <div className="space-y-3">
              {[
                { company: 'Tech Corp', position: 'Senior Developer', status: 'Reviewing', color: 'blue' },
                { company: 'StartupXYZ', position: 'Full Stack Engineer', status: 'Shortlisted', color: 'green' },
                { company: 'InnovateLabs', position: 'Frontend Lead', status: 'Interview', color: 'purple' },
              ].map((app, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-purple-50/30 border border-gray-200">
                  <div>
                    <p className="font-bold text-gray-900">{app.company}</p>
                    <p className="text-sm text-gray-600">{app.position}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold bg-${app.color}-100 text-${app.color}-700`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Interviews */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-blue-200/50 p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-600" />
              Upcoming Interviews
            </h2>
            <div className="space-y-3">
              {[
                { company: 'Tech Corp', date: 'Dec 10, 2025', time: '2:00 PM', type: 'Technical Round' },
                { company: 'StartupXYZ', date: 'Dec 12, 2025', time: '10:00 AM', type: 'HR Round' },
                { company: 'InnovateLabs', date: 'Dec 15, 2025', time: '3:30 PM', type: 'Final Round' },
              ].map((interview, idx) => (
                <div key={idx} className="flex items-start justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50/30 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{interview.company}</p>
                      <p className="text-sm text-gray-600">{interview.type}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {interview.date} • {interview.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-purple-200/50 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Profile Completion</h2>
              <p className="text-sm text-gray-600">Complete your profile to increase visibility</p>
            </div>
            <span className="text-3xl font-bold text-purple-600">85%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all" style={{ width: '85%' }} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-gray-700">Basic Info</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-gray-700">Experience</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-gray-700">Skills</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4 text-gray-400" />
              <span className="text-gray-400">Certifications</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
