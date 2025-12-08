import { useState } from 'react'
import Layout from '../../components/Layout'
import { CheckCircle, XCircle, MoreHorizontal, Star, MapPin, Briefcase, DollarSign } from 'lucide-react'
import toast from 'react-hot-toast'

// Mock data
const mockCandidates = [
  {
    id: '1',
    name: 'John Doe',
    jobTitle: 'Senior Software Engineer',
    matchScore: 92,
    experience: '5 years',
    location: 'San Francisco, CA',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    salary: '$120,000',
    values: { integrity: 5, honesty: 5, discipline: 4, hardWork: 5, gratitude: 4 },
    status: 'pending',
  },
  {
    id: '2',
    name: 'Jane Smith',
    jobTitle: 'Full Stack Developer',
    matchScore: 88,
    experience: '7 years',
    location: 'New York, NY',
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    salary: '$130,000',
    values: { integrity: 5, honesty: 4, discipline: 5, hardWork: 5, gratitude: 5 },
    status: 'pending',
  },
  {
    id: '3',
    name: 'Michael Chen',
    jobTitle: 'Backend Engineer',
    matchScore: 85,
    experience: '3 years',
    location: 'Austin, TX',
    skills: ['Java', 'Spring Boot', 'MySQL', 'Kubernetes'],
    salary: '$95,000',
    values: { integrity: 4, honesty: 5, discipline: 4, hardWork: 4, gratitude: 5 },
    status: 'pending',
  },
]

export default function ClientReview() {
  const [candidates, setCandidates] = useState(mockCandidates)

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'from-green-500 to-emerald-600'
    if (score >= 80) return 'from-blue-500 to-indigo-600'
    if (score >= 70) return 'from-yellow-500 to-orange-600'
    return 'from-red-500 to-pink-600'
  }

  const getValuesAverage = (values: Record<string, number>) => {
    const total = Object.values(values).reduce((sum, val) => sum + val, 0)
    return (total / Object.keys(values).length).toFixed(1)
  }

  const handleApprove = (id: string, name: string) => {
    setCandidates(candidates.map((c) => (c.id === id ? { ...c, status: 'approved' } : c)))
    toast.success(`${name} has been approved!`)
  }

  const handleReject = (id: string, name: string) => {
    setCandidates(candidates.map((c) => (c.id === id ? { ...c, status: 'rejected' } : c)))
    toast.error(`${name} has been rejected.`)
  }

  const handleRequestMore = (name: string) => {
    toast.success(`Requested more information for ${name}.`)
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Review Shortlisted Candidates</h1>
          <p className="text-gray-600">Evaluate and approve candidates recommended by your recruiter</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border-2 border-green-200/50 p-5 shadow-lg text-center">
            <p className="text-sm text-gray-600 mb-1">Total Candidates</p>
            <p className="text-3xl font-bold text-green-600">{candidates.length}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border-2 border-blue-200/50 p-5 shadow-lg text-center">
            <p className="text-sm text-gray-600 mb-1">Pending Review</p>
            <p className="text-3xl font-bold text-blue-600">{candidates.filter((c) => c.status === 'pending').length}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border-2 border-green-200/50 p-5 shadow-lg text-center">
            <p className="text-sm text-gray-600 mb-1">Approved</p>
            <p className="text-3xl font-bold text-green-600">{candidates.filter((c) => c.status === 'approved').length}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border-2 border-red-200/50 p-5 shadow-lg text-center">
            <p className="text-sm text-gray-600 mb-1">Rejected</p>
            <p className="text-3xl font-bold text-red-600">{candidates.filter((c) => c.status === 'rejected').length}</p>
          </div>
        </div>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 gap-6">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className={`bg-white/80 backdrop-blur-sm rounded-2xl border-2 p-6 shadow-lg hover:shadow-xl transition-all ${
                candidate.status === 'approved'
                  ? 'border-green-300'
                  : candidate.status === 'rejected'
                  ? 'border-red-300'
                  : 'border-green-200/50'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center text-3xl font-bold text-green-600">
                    {candidate.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{candidate.name}</h3>
                    <p className="text-gray-600 mb-2">{candidate.jobTitle}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {candidate.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {candidate.experience}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {candidate.salary}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`px-4 py-2 rounded-lg bg-gradient-to-r ${getMatchColor(candidate.matchScore)} text-white font-bold text-lg shadow-md`}>
                    {candidate.matchScore}%
                  </div>
                  {candidate.status !== 'pending' && (
                    <span
                      className={`px-4 py-2 rounded-lg font-bold text-sm ${
                        candidate.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {candidate.status.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Key Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Values */}
              <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
                <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Star className="h-4 w-4 text-purple-600" />
                  Professional Values Assessment
                </p>
                <div className="grid grid-cols-5 gap-3">
                  {Object.entries(candidate.values).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{value}</p>
                      <p className="text-xs text-gray-600 capitalize">{key}</p>
                    </div>
                  ))}
                  <div className="text-center border-l-2 border-purple-300 pl-2">
                    <p className="text-2xl font-bold text-purple-600">{getValuesAverage(candidate.values)}</p>
                    <p className="text-xs text-gray-600">Average</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {candidate.status === 'pending' && (
                <div className="flex items-center gap-3 pt-4 border-t-2 border-gray-100">
                  <button
                    onClick={() => handleApprove(candidate.id, candidate.name)}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 font-semibold"
                  >
                    <CheckCircle className="h-5 w-5" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(candidate.id, candidate.name)}
                    className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 font-semibold"
                  >
                    <XCircle className="h-5 w-5" />
                    Reject
                  </button>
                  <button
                    onClick={() => handleRequestMore(candidate.name)}
                    className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2 font-semibold"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                    Request More Info
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
