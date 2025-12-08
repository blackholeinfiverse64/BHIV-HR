import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, MapPin, Briefcase, DollarSign, Clock } from 'lucide-react'
import Layout from '../../components/Layout'
import toast from 'react-hot-toast'

// Mock data
const mockAppliedJobs = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    company: 'Tech Corp',
    location: 'Bangalore',
    status: 'Interview',
    matchScore: 92,
    appliedDate: '2025-12-01',
    salary: '₹20-25 LPA',
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'StartupXYZ',
    location: 'Mumbai',
    status: 'Shortlisted',
    matchScore: 88,
    appliedDate: '2025-12-03',
    salary: '₹25-35 LPA',
  },
  {
    id: 3,
    title: 'Frontend Developer',
    company: 'Digital Solutions',
    location: 'Remote',
    status: 'Applied',
    matchScore: 85,
    appliedDate: '2025-12-05',
    salary: '₹15-20 LPA',
  },
]

export default function CandidateJobs() {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Interview':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'Shortlisted':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'Applied':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'Offer':
        return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'Rejected':
        return 'bg-red-100 text-red-700 border-red-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const filteredJobs = mockAppliedJobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Layout userType="candidate">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
          <p className="text-gray-600">Track your job applications and their status</p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-purple-200/50 p-6 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by job title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-all"
              />
            </div>
            <button className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 font-medium transition-all">
              <Filter className="h-4 w-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Applications', value: mockAppliedJobs.length, color: 'from-blue-500 to-indigo-600' },
            { label: 'Shortlisted', value: mockAppliedJobs.filter(j => j.status === 'Shortlisted').length, color: 'from-green-500 to-emerald-600' },
            { label: 'Interviews', value: mockAppliedJobs.filter(j => j.status === 'Interview').length, color: 'from-purple-500 to-pink-600' },
            { label: 'Avg Match', value: '88%', color: 'from-orange-500 to-red-600' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-purple-200/50 p-6 shadow-lg">
              <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
              <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Jobs List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-purple-200/50 p-6 shadow-lg">
          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-5 rounded-xl border-2 border-gray-200/50 bg-gradient-to-r from-white to-purple-50/30 hover:border-purple-400 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-1">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 font-medium mb-2">{job.company}</p>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {job.salary}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Applied {new Date(job.appliedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <span className={`inline-block px-4 py-2 rounded-lg border-2 font-semibold text-sm ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                      <div className="text-center">
                        <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {job.matchScore}%
                        </p>
                        <p className="text-xs text-gray-500">Match Score</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 py-2 rounded-lg border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 font-medium transition-all">
                      View Details
                    </button>
                    <button className="flex-1 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium hover:shadow-lg hover:scale-105 transition-all">
                      Track Status
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Briefcase className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">No applications found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
