import { useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { getCandidatesByJob } from '../../services/api'
import Table from '../../components/Table'
import { ExternalLink, CheckCircle, XCircle, ClipboardList } from 'lucide-react'

export default function ApplicantsMatching() {
  const { jobId } = useParams()
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ['job-candidates', jobId],
    queryFn: () => getCandidatesByJob(jobId || ''),
    enabled: !!jobId,
  })

  const handleAction = (candidateId: string, action: string) => {
    if (action === 'feedback') {
      navigate(`/recruiter/feedback/${jobId}/${candidateId}`)
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
            onClick={() => handleAction(value, 'feedback')}
            className="p-2 rounded-lg hover:bg-muted transition-all"
            title="Give Feedback"
          >
            <ClipboardList className="h-4 w-4 text-primary" />
          </button>
          <button
            onClick={() => handleAction(value, 'shortlist')}
            className="p-2 rounded-lg hover:bg-success/10 transition-all"
            title="Shortlist"
          >
            <CheckCircle className="h-4 w-4 text-success" />
          </button>
          <button
            onClick={() => handleAction(value, 'reject')}
            className="p-2 rounded-lg hover:bg-destructive/10 transition-all"
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
      <div>
        <h1 className="font-heading text-3xl font-bold mb-2">Applicant Matching</h1>
        <p className="text-muted-foreground">
          Review candidates for {data?.jobTitle || 'this position'}
        </p>
      </div>

      <Table columns={columns} data={data?.candidates || []} />
    </div>
  )
}
