import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getCandidatesByJob, updateCandidateStatus } from '../../services/api'
import Table from '../../components/Table'
import { CheckCircle, XCircle, ExternalLink } from 'lucide-react'

export default function ShortlistReview() {
  const [selectedJob, setSelectedJob] = useState('all')

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['shortlisted-candidates', selectedJob],
    queryFn: () => getCandidatesByJob(selectedJob),
  })

  const updateMutation = useMutation({
    mutationFn: ({
      candidateId,
      status,
    }: {
      candidateId: string
      status: 'approved' | 'rejected'
    }) => updateCandidateStatus(candidateId, status),
    onSuccess: (_, variables) => {
      toast.success(
        `Candidate ${variables.status === 'approved' ? 'approved' : 'rejected'} successfully!`
      )
      refetch()
    },
    onError: () => {
      toast.error('Failed to update candidate status')
    },
  })

  const handleAction = (candidateId: string, status: 'approved' | 'rejected') => {
    if (window.confirm(`Are you sure you want to ${status} this candidate?`)) {
      updateMutation.mutate({ candidateId, status })
    }
  }

  const columns = [
    { key: 'name', label: 'Candidate Name' },
    {
      key: 'matchScore',
      label: 'Match Score',
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
    { key: 'experience', label: 'Experience (yrs)' },
    {
      key: 'skills',
      label: 'Top Skills',
      render: (value: string[]) => (
        <div className="flex gap-1 flex-wrap max-w-[200px]">
          {value.slice(0, 3).map((skill, i) => (
            <span key={i} className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs">
              {skill}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: 'values',
      label: 'Values Score',
      render: (value: any) => {
        const avg =
          Object.values(value).reduce((sum: number, v: any) => sum + v, 0) /
          Object.values(value).length
        return (
          <div className="text-center">
            <span className="text-lg font-bold text-success">{avg.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">/5</span>
          </div>
        )
      },
    },
    {
      key: 'id',
      label: 'Actions',
      render: (value: string, row: any) => (
        <div className="flex gap-2">
          <button
            onClick={() => window.open(row.resumeUrl, '_blank')}
            className="p-2 rounded-lg hover:bg-muted transition-all"
            title="View Resume"
          >
            <ExternalLink className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleAction(value, 'approved')}
            disabled={updateMutation.isPending}
            className="p-2 rounded-lg hover:bg-success/10 transition-all disabled:opacity-50"
            title="Approve"
          >
            <CheckCircle className="h-4 w-4 text-success" />
          </button>
          <button
            onClick={() => handleAction(value, 'rejected')}
            disabled={updateMutation.isPending}
            className="p-2 rounded-lg hover:bg-destructive/10 transition-all disabled:opacity-50"
            title="Reject"
          >
            <XCircle className="h-4 w-4 text-destructive" />
          </button>
        </div>
      ),
    },
  ]

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold mb-2">Shortlist Review</h1>
          <p className="text-muted-foreground">Review and approve shortlisted candidates</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Filter by Job</label>
          <select
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
            className="h-11 rounded-xl border-2 border-border bg-background px-4 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          >
            <option value="all">All Jobs</option>
            {data?.jobs?.map((job: any) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Table columns={columns} data={data?.candidates || []} />
    </div>
  )
}
