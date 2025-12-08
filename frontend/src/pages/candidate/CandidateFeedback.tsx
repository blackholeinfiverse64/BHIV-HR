import Layout from '../../components/Layout'
import { MessageSquare, Heart, Award, Shield, Zap, Star } from 'lucide-react'

// Mock data
const mockFeedback = {
  overallRating: 4.5,
  comments: [
    {
      from: 'Tech Corp - HR Team',
      date: '2025-12-10',
      comment: 'Excellent technical skills and great communication. Shows strong problem-solving abilities.',
      rating: 5,
    },
    {
      from: 'StartupXYZ - Hiring Manager',
      date: '2025-12-08',
      comment: 'Good cultural fit. Demonstrated strong leadership potential during the interview.',
      rating: 4,
    },
  ],
  values: {
    integrity: 5,
    honesty: 5,
    discipline: 4,
    hardWork: 5,
    gratitude: 4,
  },
}

const valueIcons = {
  integrity: Shield,
  honesty: Heart,
  discipline: Award,
  hardWork: Zap,
  gratitude: Star,
}

export default function CandidateFeedback() {
  const getValueColor = (value: number) => {
    if (value >= 4.5) return 'from-green-500 to-emerald-600'
    if (value >= 3.5) return 'from-blue-500 to-indigo-600'
    if (value >= 2.5) return 'from-yellow-500 to-orange-600'
    return 'from-red-500 to-pink-600'
  }

  return (
    <Layout userType="candidate">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Feedback & Values</h1>
          <p className="text-gray-600">Review employer feedback and your professional values assessment</p>
        </div>

        {/* Overall Rating */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-purple-200/50 p-8 shadow-lg text-center">
          <p className="text-gray-600 mb-2">Overall Rating</p>
          <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {mockFeedback.overallRating}
          </div>
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-8 w-8 ${i < Math.floor(mockFeedback.overallRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">Based on {mockFeedback.comments.length} employer reviews</p>
        </div>

        {/* Values Assessment */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-purple-200/50 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <Award className="h-5 w-5 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Professional Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {Object.entries(mockFeedback.values).map(([key, value]) => {
              const Icon = valueIcons[key as keyof typeof valueIcons]
              return (
                <div key={key} className="p-5 rounded-xl border-2 border-gray-200/50 bg-gradient-to-br from-white to-purple-50/30 hover:shadow-md transition-all">
                  <div className="flex flex-col items-center text-center">
                    <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${getValueColor(value)} flex items-center justify-center mb-3 shadow-md`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <p className={`text-3xl font-bold bg-gradient-to-r ${getValueColor(value)} bg-clip-text text-transparent mb-1`}>
                      {value}
                    </p>
                    <p className="text-xs text-gray-600 font-medium capitalize">{key}</p>
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-3 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${getValueColor(value)} rounded-full transition-all`}
                        style={{ width: `${(value / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-blue-50 border-2 border-blue-200">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> These values are assessed by employers during the interview process and reflect your professional conduct and character.
            </p>
          </div>
        </div>

        {/* Employer Comments */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-purple-200/50 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Employer Feedback</h2>
          </div>

          <div className="space-y-4">
            {mockFeedback.comments.length > 0 ? (
              mockFeedback.comments.map((feedback, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border-2 border-gray-200/50 bg-gradient-to-r from-white to-blue-50/30 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900">{feedback.from}</h3>
                      <p className="text-sm text-gray-500">{new Date(feedback.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < feedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{feedback.comment}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <MessageSquare className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">No feedback yet</p>
                <p className="text-sm text-gray-400 mt-2">Feedback will appear here after your interviews</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
