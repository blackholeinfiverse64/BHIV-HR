import { useQuery } from '@tanstack/react-query'
import { getAppliedJobs } from '../../services/api'
import Table from '../../components/Table'
import { Briefcase } from 'lucide-react'

export default function AppliedJobs() {
  const candidateId = localStorage.getItem('candidate_id') || 'demo-candidate'

  const { data, isLoading } = useQuery({
    queryKey: ['applied-jobs', candidateId],
    queryFn: () => getAppliedJobs(candidateId),
  })

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      applied: 'bg-secondary/10 text-secondary',
      shortlisted: 'bg-warning/10 text-warning',
      interview: 'bg-info/10 text-info',
      offer: 'bg-success/10 text-success',
      rejected: 'bg-destructive/10 text-destructive',
    }
    return colors[status] || 'bg-secondary/10 text-secondary'
  }

  const columns = [
    { key: 'title', label: 'Job Title' },
    { key: 'company', label: 'Company' },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <span className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize ${getStatusColor(value)}`}>
          {value}
        </span>
      ),
    },
    {
      key: 'matchScore',
      label: 'Match %',
      render: (value: number) => (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden max-w-[100px]">
            <div
              className="h-full bg-gradient-to-r from-primary to-success"
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="font-semibold text-sm">{value}%</span>
        </div>
      ),
    },
    { key: 'appliedDate', label: 'Applied Date' },
  ]

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold mb-2">Applied Jobs</h1>
          <p className="text-muted-foreground">Track your job applications</p>
        </div>
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
          <Briefcase className="h-8 w-8 text-primary" />
        </div>
      </div>

      <Table columns={columns} data={data?.jobs || []} />
    </div>
  )
}
