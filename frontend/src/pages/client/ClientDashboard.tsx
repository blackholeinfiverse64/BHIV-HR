import { useQuery } from '@tanstack/react-query'
import { getClientDashboard } from '../../services/api'
import { Users, UserCheck, Calendar, FileCheck, CheckCircle, TrendingUp } from 'lucide-react'

export default function ClientDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['client-dashboard'],
    queryFn: getClientDashboard,
  })

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  const stats = [
    {
      label: 'Total Applicants',
      value: data?.totalApplicants || 0,
      icon: Users,
      color: 'from-primary/20 to-primary/10',
      textColor: 'text-primary',
    },
    {
      label: 'Shortlisted',
      value: data?.shortlisted || 0,
      icon: UserCheck,
      color: 'from-secondary/20 to-secondary/10',
      textColor: 'text-secondary',
    },
    {
      label: 'Interviewed',
      value: data?.interviewed || 0,
      icon: Calendar,
      color: 'from-warning/20 to-warning/10',
      textColor: 'text-warning',
    },
    {
      label: 'Offers Extended',
      value: data?.offers || 0,
      icon: FileCheck,
      color: 'from-info/20 to-info/10',
      textColor: 'text-info',
    },
    {
      label: 'Joined',
      value: data?.joined || 0,
      icon: CheckCircle,
      color: 'from-success/20 to-success/10',
      textColor: 'text-success',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold mb-2">Client Dashboard</h1>
        <p className="text-muted-foreground">Overview of recruitment progress across all positions</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="rounded-2xl border-2 border-border bg-gradient-to-br from-card to-card/50 p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <Icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Per-Job Breakdown */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Position-wise Breakdown</h2>
        <div className="space-y-4">
          {data?.jobs?.map((job: any) => (
            <div key={job.id} className="rounded-2xl border-2 border-border bg-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.department}</p>
                </div>
                <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                  {job.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-3 rounded-xl bg-muted/50">
                  <p className="text-2xl font-bold text-primary">{job.applicants}</p>
                  <p className="text-xs text-muted-foreground mt-1">Applicants</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/50">
                  <p className="text-2xl font-bold text-secondary">{job.shortlisted}</p>
                  <p className="text-xs text-muted-foreground mt-1">Shortlisted</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/50">
                  <p className="text-2xl font-bold text-warning">{job.interviewed}</p>
                  <p className="text-xs text-muted-foreground mt-1">Interviewed</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/50">
                  <p className="text-2xl font-bold text-info">{job.offers}</p>
                  <p className="text-xs text-muted-foreground mt-1">Offers</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/50">
                  <p className="text-2xl font-bold text-success">{job.joined}</p>
                  <p className="text-xs text-muted-foreground mt-1">Joined</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Recruitment Progress</span>
                  <span className="font-semibold">{job.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary via-secondary to-success transition-all"
                    style={{ width: `${job.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
