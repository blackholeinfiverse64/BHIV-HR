import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { triggerAutomation } from '../../services/api'
import { Zap, Mail, Calendar, FileCheck, Send } from 'lucide-react'

const automations = [
  {
    id: 'shortlist',
    title: 'Send Shortlist Notifications',
    description: 'Notify all shortlisted candidates via email',
    icon: Mail,
    color: 'from-primary/20 to-primary/10',
    textColor: 'text-primary',
  },
  {
    id: 'interview',
    title: 'Schedule Interview Reminders',
    description: 'Send interview reminders to candidates and interviewers',
    icon: Calendar,
    color: 'from-secondary/20 to-secondary/10',
    textColor: 'text-secondary',
  },
  {
    id: 'offer',
    title: 'Send Offer Letters',
    description: 'Generate and send offer letters to selected candidates',
    icon: FileCheck,
    color: 'from-success/20 to-success/10',
    textColor: 'text-success',
  },
  {
    id: 'rejection',
    title: 'Send Rejection Emails',
    description: 'Notify rejected candidates with feedback',
    icon: Send,
    color: 'from-warning/20 to-warning/10',
    textColor: 'text-warning',
  },
]

export default function AutomationPanel() {
  const triggerMutation = useMutation({
    mutationFn: triggerAutomation,
    onSuccess: (_, variables) => {
      toast.success(`${variables.type} automation triggered successfully!`)
    },
    onError: () => {
      toast.error('Failed to trigger automation')
    },
  })

  const handleTrigger = (type: string) => {
    if (window.confirm(`Are you sure you want to trigger ${type} automation?`)) {
      triggerMutation.mutate({ type, jobId: 'all' })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold mb-2">Automation Panel</h1>
          <p className="text-muted-foreground">Trigger automated workflows for candidate management</p>
        </div>
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
          <Zap className="h-8 w-8 text-primary" />
        </div>
      </div>

      <div className="rounded-2xl border-2 border-warning/50 bg-warning/5 p-4">
        <p className="text-sm text-warning-foreground">
          <strong>Note:</strong> Automation actions will be executed immediately. Make sure all data is
          up to date before triggering.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {automations.map((automation) => {
          const Icon = automation.icon
          return (
            <div
              key={automation.id}
              className="rounded-2xl border-2 border-border bg-card p-6 space-y-4 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`h-12 w-12 rounded-xl bg-gradient-to-br ${automation.color} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className={`h-6 w-6 ${automation.textColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{automation.title}</h3>
                  <p className="text-sm text-muted-foreground">{automation.description}</p>
                </div>
              </div>

              <button
                onClick={() => handleTrigger(automation.id)}
                disabled={triggerMutation.isPending}
                className={`w-full h-11 rounded-xl font-bold bg-gradient-to-r ${automation.color} ${automation.textColor} hover:shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50`}
              >
                {triggerMutation.isPending ? 'Triggering...' : 'Trigger Automation'}
              </button>
            </div>
          )
        })}
      </div>

      <div className="rounded-2xl border-2 border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold text-lg">Automation History</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
            <div>
              <p className="font-medium">Shortlist Notifications</p>
              <p className="text-sm text-muted-foreground">Triggered by John Doe</p>
            </div>
            <p className="text-xs text-muted-foreground">2 hours ago</p>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
            <div>
              <p className="font-medium">Interview Reminders</p>
              <p className="text-sm text-muted-foreground">Triggered by Jane Smith</p>
            </div>
            <p className="text-xs text-muted-foreground">1 day ago</p>
          </div>
        </div>
      </div>
    </div>
  )
}
