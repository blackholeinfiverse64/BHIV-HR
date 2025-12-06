import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { submitFeedback } from '../../services/api'
import FormInput from '../../components/FormInput'
import { MessageSquare, Send } from 'lucide-react'

const values = [
  { key: 'integrity', label: 'Integrity' },
  { key: 'honesty', label: 'Honesty' },
  { key: 'discipline', label: 'Discipline' },
  { key: 'hardwork', label: 'Hard Work' },
  { key: 'gratitude', label: 'Gratitude' },
]

export default function RecruiterFeedback() {
  const { jobId, candidateId } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    comment: '',
    values: {
      integrity: 3,
      honesty: 3,
      discipline: 3,
      hardwork: 3,
      gratitude: 3,
    },
    decision: 'review',
  })

  const submitMutation = useMutation({
    mutationFn: () =>
      submitFeedback({
        jobId: jobId || '',
        candidateId: candidateId || '',
        ...formData,
      }),
    onSuccess: () => {
      toast.success('Feedback submitted successfully!')
      navigate(`/recruiter/applicants/${jobId}`)
    },
    onError: () => {
      toast.error('Failed to submit feedback')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitMutation.mutate()
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold mb-2">Submit Feedback</h1>
          <p className="text-muted-foreground">Evaluate candidate performance and values</p>
        </div>
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
          <MessageSquare className="h-8 w-8 text-primary" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl border-2 border-border bg-card p-6 space-y-6">
          <h3 className="font-semibold text-lg mb-4">Feedback Comments</h3>

          <div>
            <label className="block text-sm font-medium mb-2">Your Feedback</label>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="w-full min-h-[150px] rounded-xl border-2 border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y"
              placeholder="Provide detailed feedback about the candidate..."
              required
            />
          </div>
        </div>

        <div className="rounded-2xl border-2 border-border bg-card p-6 space-y-6">
          <h3 className="font-semibold text-lg mb-4">Values Assessment (0-5)</h3>

          <div className="space-y-6">
            {values.map(({ key, label }) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">{label}</label>
                  <span className="text-2xl font-bold text-primary">
                    {formData.values[key as keyof typeof formData.values]}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={formData.values[key as keyof typeof formData.values]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      values: {
                        ...formData.values,
                        [key]: parseInt(e.target.value),
                      },
                    })
                  }
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-muted"
                  style={{
                    background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${
                      (formData.values[key as keyof typeof formData.values] / 5) * 100
                    }%, hsl(var(--muted)) ${
                      (formData.values[key as keyof typeof formData.values] / 5) * 100
                    }%, hsl(var(--muted)) 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0</span>
                  <span>5</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border-2 border-border bg-card p-6 space-y-4">
          <h3 className="font-semibold text-lg mb-4">Decision</h3>

          <div>
            <label className="block text-sm font-medium mb-2">Select Decision</label>
            <select
              value={formData.decision}
              onChange={(e) => setFormData({ ...formData, decision: e.target.value })}
              className="w-full h-12 rounded-xl border-2 border-border bg-background px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              required
            >
              <option value="review">Under Review</option>
              <option value="accept">Accept / Shortlist</option>
              <option value="reject">Reject</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitMutation.isPending}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-white font-bold hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            {submitMutation.isPending ? 'Submitting...' : 'Submit Feedback'}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/recruiter/applicants/${jobId}`)}
            className="px-6 py-3 rounded-xl border-2 border-border hover:bg-muted transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
