import Layout from '../../components/Layout'
import { Zap, Mail, Bell, FileText, CheckCircle, Users } from 'lucide-react'
import toast from 'react-hot-toast'

const automationOptions = [
  {
    id: 'shortlist',
    title: 'Shortlist Notifications',
    description: 'Auto-notify candidates when they are shortlisted',
    icon: CheckCircle,
    color: 'green',
    enabled: true,
  },
  {
    id: 'rejection',
    title: 'Rejection Emails',
    description: 'Send automated rejection emails to candidates',
    icon: Mail,
    color: 'red',
    enabled: true,
  },
  {
    id: 'interview',
    title: 'Interview Reminders',
    description: 'Send interview reminders to candidates and interviewers',
    icon: Bell,
    color: 'blue',
    enabled: true,
  },
  {
    id: 'task',
    title: 'Task Assignment Alerts',
    description: 'Notify candidates when new tasks are assigned',
    icon: FileText,
    color: 'purple',
    enabled: false,
  },
  {
    id: 'feedback',
    title: 'Feedback Requests',
    description: 'Auto-request feedback from interviewers after meetings',
    icon: Users,
    color: 'yellow',
    enabled: false,
  },
]

export default function RecruiterAutomation() {
  const handleTrigger = (title: string) => {
    toast.success(`${title} triggered successfully!`)
  }

  const getColorClasses = (color: string) => {
    const colors = {
      green: {
        bg: 'bg-green-500/20',
        icon: 'text-green-600',
        button: 'bg-green-600 hover:bg-green-700',
        badge: 'bg-green-100 text-green-700',
      },
      red: {
        bg: 'bg-red-500/20',
        icon: 'text-red-600',
        button: 'bg-red-600 hover:bg-red-700',
        badge: 'bg-red-100 text-red-700',
      },
      blue: {
        bg: 'bg-blue-500/20',
        icon: 'text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700',
        badge: 'bg-blue-100 text-blue-700',
      },
      purple: {
        bg: 'bg-purple-500/20',
        icon: 'text-purple-600',
        button: 'bg-purple-600 hover:bg-purple-700',
        badge: 'bg-purple-100 text-purple-700',
      },
      yellow: {
        bg: 'bg-yellow-500/20',
        icon: 'text-yellow-600',
        button: 'bg-yellow-600 hover:bg-yellow-700',
        badge: 'bg-yellow-100 text-yellow-700',
      },
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <Layout userType="recruiter">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Automation & Notifications</h1>
            <p className="text-gray-600">Manage automated workflows and notification triggers</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
            <Zap className="h-6 w-6 text-blue-600" />
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border-2 border-blue-200/50 p-5 shadow-lg text-center">
            <p className="text-sm text-gray-600 mb-1">Active Automations</p>
            <p className="text-3xl font-bold text-blue-600">{automationOptions.filter((a) => a.enabled).length}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border-2 border-green-200/50 p-5 shadow-lg text-center">
            <p className="text-sm text-gray-600 mb-1">Notifications Sent Today</p>
            <p className="text-3xl font-bold text-green-600">142</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border-2 border-purple-200/50 p-5 shadow-lg text-center">
            <p className="text-sm text-gray-600 mb-1">Success Rate</p>
            <p className="text-3xl font-bold text-purple-600">98.5%</p>
          </div>
        </div>

        {/* Automation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {automationOptions.map((automation) => {
            const colors = getColorClasses(automation.color)
            const Icon = automation.icon

            return (
              <div
                key={automation.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-blue-200/50 p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`h-14 w-14 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`h-7 w-7 ${colors.icon}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{automation.title}</h3>
                      <p className="text-sm text-gray-600">{automation.description}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      automation.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {automation.enabled ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t-2 border-gray-100">
                  <button
                    onClick={() => handleTrigger(automation.title)}
                    disabled={!automation.enabled}
                    className={`flex-1 px-4 py-3 rounded-lg text-white font-semibold transition-all shadow-md hover:shadow-lg ${
                      automation.enabled ? colors.button : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Trigger Now
                  </button>
                  <button className="px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-all">
                    Settings
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Recent Activity Log */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-blue-200/50 p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-600" />
            Recent Activity
          </h2>

          <div className="space-y-3">
            {[
              {
                action: 'Shortlist notification sent',
                candidate: 'John Doe',
                time: '5 minutes ago',
                status: 'delivered',
              },
              {
                action: 'Interview reminder sent',
                candidate: 'Jane Smith',
                time: '1 hour ago',
                status: 'delivered',
              },
              {
                action: 'Rejection email sent',
                candidate: 'Michael Chen',
                time: '2 hours ago',
                status: 'delivered',
              },
              {
                action: 'Task assignment alert sent',
                candidate: 'Sarah Johnson',
                time: '3 hours ago',
                status: 'failed',
              },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-gray-50/50 border border-gray-200">
                <div className="flex items-center gap-4">
                  <div
                    className={`h-3 w-3 rounded-full ${activity.status === 'delivered' ? 'bg-green-500' : 'bg-red-500'}`}
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">To: {activity.candidate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{activity.time}</p>
                  <span
                    className={`text-xs font-bold ${
                      activity.status === 'delivered' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {activity.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
