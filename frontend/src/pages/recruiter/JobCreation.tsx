import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { createJob } from '../../services/api'
import FormInput from '../../components/FormInput'
import { Briefcase, Save } from 'lucide-react'

export default function JobCreation() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    employmentType: 'full-time',
    experienceRequired: '',
    salaryRange: '',
    educationLevel: '',
    certifications: '',
    description: '',
  })

  const createMutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      toast.success('Job created successfully!')
      navigate('/recruiter/dashboard')
    },
    onError: () => {
      toast.error('Failed to create job')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      ...formData,
      experienceRequired: parseInt(formData.experienceRequired) || 0,
      certifications: formData.certifications.split(',').map(c => c.trim()),
    }
    createMutation.mutate(data)
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold mb-2">Create New Job</h1>
          <p className="text-muted-foreground">Post a new job opening</p>
        </div>
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
          <Briefcase className="h-8 w-8 text-primary" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl border-2 border-border bg-card p-6 space-y-6">
          <h3 className="font-semibold text-lg mb-4">Job Details</h3>

          <FormInput
            label="Job Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Senior Software Engineer"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              placeholder="Engineering"
              required
            />
            <FormInput
              label="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Bangalore, India"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Employment Type</label>
              <select
                value={formData.employmentType}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                className="w-full h-12 rounded-xl border-2 border-border bg-background px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                required
              >
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <FormInput
              label="Experience Required (years)"
              type="number"
              value={formData.experienceRequired}
              onChange={(e) => setFormData({ ...formData, experienceRequired: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Salary Range"
              value={formData.salaryRange}
              onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
              placeholder="10-15 LPA"
              required
            />
            <FormInput
              label="Education Level"
              value={formData.educationLevel}
              onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
              placeholder="Bachelor, Master"
              required
            />
          </div>

          <FormInput
            label="Certifications"
            value={formData.certifications}
            onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
            placeholder="AWS, Azure (comma separated)"
            helperText="Optional certifications, separate with commas"
          />

          <div>
            <label className="block text-sm font-medium mb-2">Job Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full min-h-[200px] rounded-xl border-2 border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y"
              placeholder="Describe the role, responsibilities, and requirements..."
              required
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-white font-bold hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {createMutation.isPending ? 'Creating...' : 'Create Job'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/recruiter/dashboard')}
            className="px-6 py-3 rounded-xl border-2 border-border hover:bg-muted transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
