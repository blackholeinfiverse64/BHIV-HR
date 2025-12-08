import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getCandidateProfile, updateCandidateProfile } from '../../services/api'
import FormInput from '../../components/FormInput'
import { User, Save, Briefcase } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import Layout from '../../components/Layout'

export default function CandidateProfile() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const candidateId = user?.id || localStorage.getItem('candidate_id') || 'demo-candidate'
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    skills: '',
    education: '',
    expectedSalary: '',
  })

  const { data: profile, isLoading } = useQuery({
    queryKey: ['candidate-profile', candidateId],
    queryFn: () => getCandidateProfile(candidateId),
  })

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        location: profile.location || '',
        experience: profile.experience?.toString() || '',
        skills: Array.isArray(profile.skills) ? profile.skills.join(', ') : '',
        education: profile.education || '',
        expectedSalary: profile.expectedSalary?.toString() || '',
      })
    }
  }, [profile])

  const updateMutation = useMutation({
    mutationFn: (data: any) => updateCandidateProfile(candidateId, data),
    onSuccess: () => {
      toast.success('Profile updated successfully!')
    },
    onError: () => {
      toast.error('Failed to update profile')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      ...formData,
      experience: parseInt(formData.experience) || 0,
      skills: formData.skills.split(',').map(s => s.trim()),
      expectedSalary: parseInt(formData.expectedSalary) || 0,
    }
    updateMutation.mutate(data)
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  const handleLogout = async () => {
    await signOut()
    localStorage.removeItem('role')
    localStorage.removeItem('candidate_id')
    navigate('/')
  }

  return (
    <Layout userType="candidate">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Card */}
          <div className="rounded-2xl border-2 border-purple-200/50 bg-white/80 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <User className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-900">Personal Information</h3>
            </div>
          <h3 className="font-semibold text-lg mb-4">Personal Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <FormInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <FormInput
              label="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
            <FormInput
              label="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Professional Details Card */}
        <div className="rounded-2xl border-2 border-purple-200/50 bg-white/80 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">Professional Details</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Total Experience (years)"
              type="number"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              required
            />
            <FormInput
              label="Education Level"
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              placeholder="e.g., Bachelor, Master"
              required
            />
            <FormInput
              label="Expected Salary (LPA)"
              type="number"
              value={formData.expectedSalary}
              onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
              helperText="Annual salary in Lakhs"
              required
            />
          </div>

          <FormInput
            label="Skills"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            placeholder="React, Node.js, Python (comma separated)"
            helperText="Separate skills with commas"
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="inline-flex items-center justify-center gap-2 rounded-xl h-12 px-8 text-sm font-bold bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50"
          >
            <Save className="h-5 w-5" />
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
      </div>
    </Layout>
  )
}
