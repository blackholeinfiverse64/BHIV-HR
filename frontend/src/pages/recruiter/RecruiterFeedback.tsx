import { useState } from 'react'
import Layout from '../../components/Layout'
import { MessageSquare, Send, Shield, Heart, Award, Zap, Star } from 'lucide-react'
import toast from 'react-hot-toast'

const valueLabels = [
  { key: 'integrity', label: 'Integrity', icon: Shield },
  { key: 'honesty', label: 'Honesty', icon: Heart },
  { key: 'discipline', label: 'Discipline', icon: Award },
  { key: 'hardWork', label: 'Hard Work', icon: Zap },
  { key: 'gratitude', label: 'Gratitude', icon: Star },
]

export default function RecruiterFeedback() {
  const [formData, setFormData] = useState({
    candidateName: '',
    jobTitle: '',
    comment: '',
    values: {
      integrity: 3,
      honesty: 3,
      discipline: 3,
      hardWork: 3,
      gratitude: 3,
    },
    decision: '',
  })

  const handleSliderChange = (key: string, value: number) => {
    setFormData({
      ...formData,
      values: { ...formData.values, [key]: value },
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.decision) {
      toast.error('Please select a decision')
      return
    }
    // API call would go here
    toast.success('Feedback submitted successfully!')
    // Reset form
    setFormData({
      candidateName: '',
      jobTitle: '',
      comment: '',
      values: {
        integrity: 3,
        honesty: 3,
        discipline: 3,
        hardWork: 3,
        gratitude: 3,
      },
      decision: '',
    })
  }

  const getDecisionColor = (decision: string) => {
    if (decision === 'accept') return 'border-green-500 bg-green-50'
    if (decision === 'reject') return 'border-red-500 bg-red-50'
    if (decision === 'hold') return 'border-yellow-500 bg-yellow-50'
    return 'border-gray-300 bg-white'
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Candidate Feedback Form</h1>
            <p className="text-gray-600">Provide feedback and assessment for candidates after interviews</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-blue-600" />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Candidate Info */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-blue-200/50 p-6 shadow-lg space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-600" />
              Candidate Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Candidate Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.candidateName}
                  onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Enter candidate name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Enter job title"
                />
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-blue-200/50 p-6 shadow-lg space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-600" />
              Interview Comments
            </h2>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Feedback <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                placeholder="Provide detailed feedback about the candidate's performance, skills, and fit for the role..."
              />
            </div>
          </div>

          {/* Values Assessment */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-purple-200/50 p-6 shadow-lg space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-600" />
                Professional Values Assessment
              </h2>
              <p className="text-sm text-gray-500">Rate each value from 0 to 5</p>
            </div>

            <div className="space-y-6">
              {valueLabels.map(({ key, label, icon: Icon }) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="font-semibold text-gray-900">{label}</span>
                    </div>
                    <span className="text-2xl font-bold text-purple-600">{formData.values[key as keyof typeof formData.values]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="1"
                    value={formData.values[key as keyof typeof formData.values]}
                    onChange={(e) => handleSliderChange(key, parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Poor</span>
                    <span>Fair</span>
                    <span>Good</span>
                    <span>Very Good</span>
                    <span>Excellent</span>
                    <span>Outstanding</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Decision */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-blue-200/50 p-6 shadow-lg space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-600" />
              Hiring Decision
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, decision: 'accept' })}
                className={`p-6 rounded-xl border-3 transition-all ${
                  formData.decision === 'accept' ? getDecisionColor('accept') : 'border-gray-200 bg-white hover:border-green-300'
                }`}
              >
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                  <p className="font-bold text-gray-900">Accept</p>
                  <p className="text-xs text-gray-500 mt-1">Move forward with hiring</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, decision: 'hold' })}
                className={`p-6 rounded-xl border-3 transition-all ${
                  formData.decision === 'hold' ? getDecisionColor('hold') : 'border-gray-200 bg-white hover:border-yellow-300'
                }`}
              >
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-yellow-100 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-2xl">⏸</span>
                  </div>
                  <p className="font-bold text-gray-900">Hold</p>
                  <p className="text-xs text-gray-500 mt-1">Keep in consideration</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, decision: 'reject' })}
                className={`p-6 rounded-xl border-3 transition-all ${
                  formData.decision === 'reject' ? getDecisionColor('reject') : 'border-gray-200 bg-white hover:border-red-300'
                }`}
              >
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-red-100 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-2xl">✕</span>
                  </div>
                  <p className="font-bold text-gray-900">Reject</p>
                  <p className="text-xs text-gray-500 mt-1">Not a fit for this role</p>
                </div>
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 font-semibold text-lg"
          >
            <Send className="h-5 w-5" />
            Submit Feedback
          </button>
        </form>
      </div>
    </Layout>
  )
}
