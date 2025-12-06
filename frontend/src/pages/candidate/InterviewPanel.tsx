import { useQuery, useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getInterviews, submitTask } from '../../services/api'
import { Calendar, CheckCircle2, ExternalLink } from 'lucide-react'

export default function InterviewPanel() {
  const candidateId = localStorage.getItem('candidate_id') || 'demo-candidate'

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['interviews', candidateId],
    queryFn: () => getInterviews(candidateId),
  })

  const submitMutation = useMutation({
    mutationFn: submitTask,
    onSuccess: () => {
      toast.success('Task marked as submitted!')
      refetch()
    },
  })

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold mb-2">Interviews & Tasks</h1>
        <p className="text-muted-foreground">Manage your upcoming interviews and assigned tasks</p>
      </div>

      {/* Interviews */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Upcoming Interviews
        </h2>
        {data?.interviews?.map((interview: any) => (
          <div key={interview.id} className="rounded-2xl border-2 border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{interview.jobTitle}</h3>
                <p className="text-sm text-muted-foreground">{interview.company}</p>
                <p className="text-sm mt-2">
                  {new Date(interview.date).toLocaleString('en-US', {
                    dateStyle: 'full',
                    timeStyle: 'short',
                  })}
                </p>
              </div>
              <a
                href={interview.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:shadow-lg transition-all"
              >
                Join Meeting
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        ))}
        {!data?.interviews?.length && (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">No upcoming interviews</p>
          </div>
        )}
      </div>

      {/* Tasks */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          Assigned Tasks
        </h2>
        {data?.tasks?.map((task: any) => (
          <div key={task.id} className="rounded-2xl border-2 border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{task.jobTitle}</h3>
                <p className="text-sm text-muted-foreground mt-2">{task.description}</p>
                <p className="text-sm mt-2">
                  <span className="font-medium">Deadline:</span> {task.deadline}
                </p>
              </div>
              {task.status === 'pending' && (
                <button
                  onClick={() => submitMutation.mutate(task.id)}
                  disabled={submitMutation.isPending}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-success text-white hover:shadow-lg transition-all disabled:opacity-50"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Mark as Submitted
                </button>
              )}
              {task.status === 'submitted' && (
                <span className="px-4 py-2 rounded-lg bg-success/10 text-success font-medium">
                  Submitted
                </span>
              )}
            </div>
          </div>
        ))}
        {!data?.tasks?.length && (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">No assigned tasks</p>
          </div>
        )}
      </div>
    </div>
  )
}
