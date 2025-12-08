import { useState } from 'react'
import Layout from '../../components/Layout'
import { Calendar, Video, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

// Mock data
const mockInterviews = [
  {
    id: 1,
    jobTitle: 'Senior Full Stack Developer',
    company: 'Tech Corp',
    date: '2025-12-15',
    time: '10:00 AM',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    type: 'Technical Round',
    status: 'upcoming',
  },
  {
    id: 2,
    jobTitle: 'Product Manager',
    company: 'StartupXYZ',
    date: '2025-12-18',
    time: '02:00 PM',
    meetingLink: 'https://zoom.us/j/123456789',
    type: 'HR Round',
    status: 'upcoming',
  },
]

const mockTasks = [
  {
    id: 1,
    jobTitle: 'Senior Full Stack Developer',
    company: 'Tech Corp',
    taskTitle: 'Build a REST API',
    description: 'Create a Node.js REST API with authentication and CRUD operations',
    deadline: '2025-12-20',
    status: 'pending',
    submittedAt: null,
  },
  {
    id: 2,
    jobTitle: 'Frontend Developer',
    company: 'Digital Solutions',
    taskTitle: 'Create Landing Page',
    description: 'Build a responsive landing page using React and Tailwind CSS',
    deadline: '2025-12-22',
    status: 'submitted',
    submittedAt: '2025-12-10',
  },
]

export default function CandidateInterviews() {
  const [tasks, setTasks] = useState(mockTasks)

  const handleMarkSubmitted = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: 'submitted', submittedAt: new Date().toISOString().split('T')[0] }
        : task
    ))
    toast.success('Task marked as submitted!')
  }

  const handleJoinMeeting = (link: string) => {
    window.open(link, '_blank')
    toast.success('Opening meeting link...')
  }

  return (
    <Layout userType="candidate">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Interviews & Tasks</h1>
          <p className="text-gray-600">Manage your upcoming interviews and assigned tasks</p>
        </div>

        {/* Upcoming Interviews */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-purple-200/50 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
              <Video className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Interviews</h2>
          </div>

          <div className="space-y-4">
            {mockInterviews.length > 0 ? (
              mockInterviews.map((interview) => (
                <div
                  key={interview.id}
                  className="p-5 rounded-xl border-2 border-gray-200/50 bg-gradient-to-r from-white to-blue-50/30 hover:border-blue-400 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{interview.jobTitle}</h3>
                      <p className="text-gray-600 font-medium mb-3">{interview.company}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">{new Date(interview.date).toLocaleDateString()}</span>
                        </span>
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-200">
                          <Clock className="h-4 w-4 text-purple-600" />
                          <span className="font-medium">{interview.time}</span>
                        </span>
                        <span className="px-3 py-1.5 rounded-lg bg-green-50 border border-green-200 text-green-700 font-semibold">
                          {interview.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleJoinMeeting(interview.meetingLink)}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:shadow-lg hover:scale-105 transition-all"
                    >
                      <Video className="h-4 w-4" />
                      Join Meeting
                    </button>
                    <button className="px-6 py-2.5 rounded-lg border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 font-medium transition-all">
                      Add to Calendar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">No upcoming interviews</p>
              </div>
            )}
          </div>
        </div>

        {/* Assigned Tasks */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-purple-200/50 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Assigned Tasks</h2>
          </div>

          <div className="space-y-4">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-5 rounded-xl border-2 border-gray-200/50 bg-gradient-to-r from-white to-purple-50/30 hover:border-purple-400 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{task.taskTitle}</h3>
                        {task.status === 'submitted' && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-green-100 border border-green-200 text-green-700 text-sm font-semibold">
                            <CheckCircle className="h-4 w-4" />
                            Submitted
                          </span>
                        )}
                        {task.status === 'pending' && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-yellow-100 border border-yellow-200 text-yellow-700 text-sm font-semibold">
                            <AlertCircle className="h-4 w-4" />
                            Pending
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 font-medium mb-3">{task.company} - {task.jobTitle}</p>
                      <p className="text-gray-700 mb-3">{task.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 border border-red-200">
                          <Clock className="h-4 w-4 text-red-600" />
                          <span className="font-medium text-red-700">Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
                        </span>
                        {task.submittedAt && (
                          <span className="text-green-600 font-medium">
                            Submitted on {new Date(task.submittedAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {task.status === 'pending' && (
                      <button
                        onClick={() => handleMarkSubmitted(task.id)}
                        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium hover:shadow-lg hover:scale-105 transition-all"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Mark as Submitted
                      </button>
                    )}
                    <button className="px-6 py-2.5 rounded-lg border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 font-medium transition-all">
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">No assigned tasks</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
