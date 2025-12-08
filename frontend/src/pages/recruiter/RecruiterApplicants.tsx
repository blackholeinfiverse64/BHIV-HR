import { useState } from 'react'
import Layout from '../../components/Layout'
import { Search, FileText, CheckCircle, XCircle, ClipboardList, Filter } from 'lucide-react'
import toast from 'react-hot-toast'

// Mock data
const mockApplicants = [
  {
    id: '1',
    name: 'John Doe',
    location: 'San Francisco, CA',
    experience: '5 years',
    salary: '$80,000 - $120,000',
    skills: ['React', 'TypeScript', 'Node.js'],
    matchScore: 92,
    values: { integrity: 5, honesty: 5, discipline: 4, hardWork: 5, gratitude: 4 },
    resumeUrl: '#',
    status: 'New',
  },
  {
    id: '2',
    name: 'Jane Smith',
    location: 'New York, NY',
    experience: '7 years',
    salary: '$100,000 - $140,000',
    skills: ['Python', 'Django', 'PostgreSQL'],
    matchScore: 88,
    values: { integrity: 5, honesty: 4, discipline: 5, hardWork: 5, gratitude: 5 },
    resumeUrl: '#',
    status: 'Reviewed',
  },
  {
    id: '3',
    name: 'Michael Chen',
    location: 'Austin, TX',
    experience: '3 years',
    salary: '$70,000 - $90,000',
    skills: ['Java', 'Spring Boot', 'AWS'],
    matchScore: 85,
    values: { integrity: 4, honesty: 5, discipline: 4, hardWork: 4, gratitude: 5 },
    resumeUrl: '#',
    status: 'New',
  },
]

export default function RecruiterApplicants() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-700 border-green-300'
    if (score >= 80) return 'bg-blue-100 text-blue-700 border-blue-300'
    if (score >= 70) return 'bg-yellow-100 text-yellow-700 border-yellow-300'
    return 'bg-red-100 text-red-700 border-red-300'
  }

  const getValuesAverage = (values: Record<string, number>) => {
    const total = Object.values(values).reduce((sum, val) => sum + val, 0)
    return (total / Object.keys(values).length).toFixed(1)
  }

  const handleShortlist = (name: string) => {
    toast.success(`${name} has been shortlisted!`)
  }

  const handleReject = (name: string) => {
    toast.error(`${name} has been rejected.`)
  }

  const handleAssignTask = (name: string) => {
    toast.success(`Task assigned to ${name}.`)
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Applicants Matching</h1>
          <p className="text-gray-600">Review and manage candidates for your job postings</p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-blue-200/50 p-6 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, skills, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="relative min-w-[200px]">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors bg-white appearance-none"
              >
                <option value="all">All Applicants</option>
                <option value="new">New</option>
                <option value="reviewed">Reviewed</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applicants Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-blue-200/50 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-b-2 border-blue-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Experience</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Salary</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Skills</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Match</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Values</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-gray-100">
                {mockApplicants.map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{applicant.name}</p>
                      <p className="text-sm text-gray-500">{applicant.status}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{applicant.location}</td>
                    <td className="px-6 py-4 text-gray-700">{applicant.experience}</td>
                    <td className="px-6 py-4 text-gray-700">{applicant.salary}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {applicant.skills.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-3 py-1 rounded-lg border-2 font-bold text-sm ${getMatchColor(applicant.matchScore)}`}>
                        {applicant.matchScore}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg font-bold text-sm">
                        ★ {getValuesAverage(applicant.values)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={applicant.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                          title="View Resume"
                        >
                          <FileText className="h-4 w-4" />
                        </a>
                        <button
                          onClick={() => handleShortlist(applicant.name)}
                          className="p-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 transition-colors"
                          title="Shortlist"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleReject(applicant.name)}
                          className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition-colors"
                          title="Reject"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleAssignTask(applicant.name)}
                          className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 transition-colors"
                          title="Assign Task"
                        >
                          <ClipboardList className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border-2 border-blue-200/50 p-5 shadow-lg text-center">
            <p className="text-sm text-gray-600 mb-1">Total Applicants</p>
            <p className="text-3xl font-bold text-blue-600">{mockApplicants.length}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border-2 border-green-200/50 p-5 shadow-lg text-center">
            <p className="text-sm text-gray-600 mb-1">High Match (≥90%)</p>
            <p className="text-3xl font-bold text-green-600">{mockApplicants.filter((a) => a.matchScore >= 90).length}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border-2 border-yellow-200/50 p-5 shadow-lg text-center">
            <p className="text-sm text-gray-600 mb-1">Pending Review</p>
            <p className="text-3xl font-bold text-yellow-600">{mockApplicants.filter((a) => a.status === 'New').length}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border-2 border-purple-200/50 p-5 shadow-lg text-center">
            <p className="text-sm text-gray-600 mb-1">Avg Values Score</p>
            <p className="text-3xl font-bold text-purple-600">
              {(mockApplicants.reduce((sum, a) => sum + parseFloat(getValuesAverage(a.values)), 0) / mockApplicants.length).toFixed(1)}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
