import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getJobs } from '../../services/api'
import { Briefcase, Users, TrendingUp, Plus, Search, Filter, Calendar } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import Layout from '../../components/Layout'

export default function RecruiterDashboard() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: ['recruiter-jobs'],
    queryFn: () => getJobs(),
  })

  const handleLogout = async () => {
    await signOut()
    localStorage.removeItem('role')
    localStorage.removeItem('recruiter_id')
    navigate('/')
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  const stats = {
    activeJobs: data?.jobs?.filter((j: any) => j.status === 'active').length || 0,
    totalApplicants: data?.jobs?.reduce((sum: number, j: any) => sum + (j.applicantCount || 0), 0) || 0,
    avgMatchScore: 82,
  }

  const recentJobs = data?.jobs?.slice(0, 5) || []

  return (
    <Layout userType="recruiter">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border-2 border-purple-200/50 bg-white/80 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Jobs</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{stats.activeJobs}</p>
              </div>
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <Briefcase className="h-7 w-7 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span>+12% from last month</span>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-pink-200/50 bg-white/80 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Applicants</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">{stats.totalApplicants}</p>
              </div>
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                <Users className="h-7 w-7 text-pink-600" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span>+25% from last month</span>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-purple-200/50 bg-white/80 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Match Score</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{stats.avgMatchScore}%</p>
              </div>
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <TrendingUp className="h-7 w-7 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span>+5% from last month</span>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-purple-200/50 p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs, candidates..."
                className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-all"
              />
            </div>
            <button className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 font-medium transition-all">
              <Filter className="h-4 w-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Recent Jobs */}
        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-purple-200/50 p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Job Postings</h2>
            <button className="text-blue-600 font-semibold hover:underline hover:text-blue-700 transition-colors">View All</button>
          </div>
          
          <div className="space-y-4">
            {recentJobs.length > 0 ? (
              recentJobs.map((job: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-5 rounded-xl border-2 border-gray-200/50 bg-gradient-to-r from-white to-purple-50/30 hover:border-purple-400 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition-colors">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.department} • {job.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{job.applicantCount || 0}</p>
                      <p className="text-sm text-gray-600">Applicants</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(job.createdAt || Date.now()).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Briefcase className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">No jobs posted yet</p>
                <button className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 transition-all">
                  <Plus className="h-4 w-4" />
                  Post Your First Job
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
