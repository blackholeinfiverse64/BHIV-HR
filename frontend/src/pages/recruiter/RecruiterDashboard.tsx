import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getJobs } from '../../services/api'
import { Briefcase, Users, TrendingUp } from 'lucide-react'

export default function RecruiterDashboard() {
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ['recruiter-jobs'],
    queryFn: getJobs,
  })

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  const stats = {
    activeJobs: data?.jobs?.filter((j: any) => j.status === 'active').length || 0,
    totalApplicants: data?.jobs?.reduce((sum: number, j: any) => sum + (j.applicantCount || 0), 0) || 0,
    avgMatchScore: 82,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold mb-2">Recruiter Dashboard</h1>
        <p className="text-muted-foreground">Manage jobs and review applicants</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border-2 border-border bg-gradient-to-br from-primary/5 to-primary/10 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Jobs</p>
              <p className="text-3xl font-bold">{stats.activeJobs}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-border bg-gradient-to-br from-secondary/5 to-secondary/10 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Applicants</p>
              <p className="text-3xl font-bold">{stats.totalApplicants}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-secondary/20 flex items-center justify-center">
              <Users className="h-6 w-6 text-secondary" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-border bg-gradient-to-br from-success/5 to-success/10 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg Match Score</p>
              <p className="text-3xl font-bold">{stats.avgMatchScore}%</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-success/20 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/recruiter/jobs/create')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-white font-bold hover:shadow-xl hover:scale-105 transition-all"
        >
          Create New Job
        </button>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Active Jobs</h2>
        <div className="grid gap-4">
          {data?.jobs?.map((job: any) => (
            <div
              key={job.id}
              onClick={() => navigate(`/recruiter/applicants/${job.id}`)}
              className="rounded-2xl border-2 border-border bg-card p-6 hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.department}</p>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                      {job.location}
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-xs font-medium">
                      {job.employmentType}
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-success/10 text-success text-xs font-medium">
                      {job.applicantCount || 0} Applicants
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      job.status === 'active'
                        ? 'bg-success/10 text-success'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
