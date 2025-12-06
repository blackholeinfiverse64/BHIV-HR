import { useQuery } from '@tanstack/react-query'
import { getCandidateFeedback } from '../../services/api'
import { MessageSquare, Star } from 'lucide-react'

const values = ['Integrity', 'Honesty', 'Discipline', 'Hard Work', 'Gratitude']

export default function CandidateFeedback() {
  const candidateId = localStorage.getItem('candidate_id') || 'demo-candidate'

  const { data, isLoading } = useQuery({
    queryKey: ['candidate-feedback', candidateId],
    queryFn: () => getCandidateFeedback(candidateId),
  })

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold mb-2">Feedback & Values</h1>
        <p className="text-muted-foreground">View feedback from employers</p>
      </div>

      <div className="space-y-4">
        {data?.feedback?.map((item: any, index: number) => (
          <div key={index} className="rounded-2xl border-2 border-border bg-card p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{item.jobTitle}</h3>
              <p className="text-sm text-muted-foreground">{item.company}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
            </div>

            <div className="rounded-xl bg-muted/50 p-4">
              <p className="text-sm">{item.comment}</p>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 text-warning" />
                Values Assessment
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {values.map((value) => {
                  const key = value.toLowerCase().replace(' ', '')
                  const score = item.values[key] || 0
                  return (
                    <div key={value} className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{score}/5</div>
                      <div className="text-xs text-muted-foreground">{value}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-border">
              <span className="text-sm font-medium">Decision:</span>
              <span
                className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                  item.decision === 'accept'
                    ? 'bg-success/10 text-success'
                    : item.decision === 'reject'
                    ? 'bg-destructive/10 text-destructive'
                    : 'bg-warning/10 text-warning'
                }`}
              >
                {item.decision.toUpperCase()}
              </span>
            </div>
          </div>
        ))}

        {!data?.feedback?.length && (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No feedback yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
