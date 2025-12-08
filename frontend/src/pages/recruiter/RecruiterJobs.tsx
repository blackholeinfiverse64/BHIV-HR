import { useState } from 'react'
import Layout from '../../components/Layout'
import { Plus, Briefcase, Save } from 'lucide-react'
import toast from 'react-hot-toast'

export default function RecruiterJobs() {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    jobType: 'Full-Time',
    experienceMin: '',
    experienceMax: '',
    salaryMin: '',
    salaryMax: '',
    education: '',
    certifications: '',
    description: '',
    contractPeriod: '',
    workingHours: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // API call would go here
    toast.success('Job posted successfully!')
    // Reset form
    setFormData({
      title: '',
      department: '',
      location: '',
      jobType: 'Full-Time',
      experienceMin: '',
      experienceMax: '',
      salaryMin: '',
      salaryMax: '',
      education: '',
      certifications: '',
      description: '',
      contractPeriod: '',
      workingHours: '',
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Layout userType="recruiter">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Job Posting</h1>
            <p className="text-gray-600">Fill in the details below to post a new job opening</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
            <Briefcase className="h-6 w-6 text-blue-600" />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-blue-200/50 p-8 shadow-lg space-y-6">
          {/* Job Title & Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="e.g., Senior Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Department <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="e.g., Engineering"
              />
            </div>
          </div>

          {/* Location & Job Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="e.g., San Francisco, CA (Remote)"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Type <span className="text-red-500">*</span>
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors bg-white"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          {/* Experience Range */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Experience Range (Years) <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="experienceMin"
                value={formData.experienceMin}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Min (e.g., 3)"
              />
              <input
                type="number"
                name="experienceMax"
                value={formData.experienceMax}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Max (e.g., 5)"
              />
            </div>
          </div>

          {/* Salary Range */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Salary Range (USD) <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="salaryMin"
                value={formData.salaryMin}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Min (e.g., 80000)"
              />
              <input
                type="number"
                name="salaryMax"
                value={formData.salaryMax}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Max (e.g., 120000)"
              />
            </div>
          </div>

          {/* Education */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Education Requirements <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="e.g., Bachelor's degree in Computer Science or related field"
            />
          </div>

          {/* Certifications */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Certifications (Optional)</label>
            <input
              type="text"
              name="certifications"
              value={formData.certifications}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="e.g., AWS Certified Solutions Architect, PMP (comma-separated)"
            />
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors resize-none"
              placeholder="Describe the role, responsibilities, and key requirements..."
            />
          </div>

          {/* Contract Period & Working Hours */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Contract Period (Optional)</label>
              <input
                type="text"
                name="contractPeriod"
                value={formData.contractPeriod}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="e.g., 12 months"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Working Hours (Optional)</label>
              <input
                type="text"
                name="workingHours"
                value={formData.workingHours}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="e.g., 9 AM - 5 PM EST"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center gap-4 pt-6 border-t-2 border-gray-200">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 font-semibold text-lg"
            >
              <Plus className="h-5 w-5" />
              Post Job
            </button>
            <button
              type="button"
              className="px-6 py-4 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2 font-semibold"
            >
              <Save className="h-5 w-5" />
              Save Draft
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
