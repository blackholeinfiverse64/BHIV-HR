import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { jobsAPI } from '@/services/api'
import { useToast } from '@/context/ToastContext'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Building2,
  Plus,
  X,
  Sparkles,
} from 'lucide-react'

export function CreateJobPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    employment_type: 'full-time',
    experience_level: 'mid',
    salary_min: '',
    salary_max: '',
    description: '',
    requirements: '',
    benefits: '',
    skills: [],
    status: 'draft',
  })

  const [newSkill, setNewSkill] = useState('')

  const createJobMutation = useMutation({
    mutationFn: jobsAPI.createJob,
    onSuccess: (data) => {
      toast.success('Job Created', 'Your job posting has been created successfully.')
      navigate(`/jobs/${data.id || data.job_id}`)
    },
    onError: (error) => {
      toast.error('Error', error.response?.data?.detail || 'Failed to create job posting.')
    },
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill('')
    }
  }

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const handleSubmit = (e, status = 'draft') => {
    e.preventDefault()
    createJobMutation.mutate({
      ...formData,
      status,
      salary_min: formData.salary_min ? parseInt(formData.salary_min) : null,
      salary_max: formData.salary_max ? parseInt(formData.salary_max) : null,
    })
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="font-heading text-3xl font-bold">Create New Job</h1>
          <p className="text-muted-foreground mt-1">
            Fill in the details to post a new job opening
          </p>
        </div>
      </div>

      <form onSubmit={(e) => handleSubmit(e, 'open')} className="space-y-6">
        {/* Basic Information */}
        <Card variant="neo" className="p-6">
          <CardHeader className="p-0 pb-6">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Basic Information
            </CardTitle>
            <CardDescription>Essential details about the position</CardDescription>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Title *</label>
              <Input
                name="title"
                placeholder="e.g., Senior Software Engineer"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => handleSelectChange('department', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  name="location"
                  placeholder="e.g., San Francisco, CA or Remote"
                  icon={MapPin}
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Employment Type</label>
                <Select
                  value={formData.employment_type}
                  onValueChange={(value) => handleSelectChange('employment_type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Experience Level</label>
                <Select
                  value={formData.experience_level}
                  onValueChange={(value) => handleSelectChange('experience_level', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                    <SelectItem value="lead">Lead / Principal</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Salary */}
        <Card variant="neo" className="p-6">
          <CardHeader className="p-0 pb-6">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Compensation
            </CardTitle>
            <CardDescription>Salary range for this position</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Minimum Salary (Annual)</label>
                <Input
                  name="salary_min"
                  type="number"
                  placeholder="e.g., 80000"
                  icon={DollarSign}
                  value={formData.salary_min}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Maximum Salary (Annual)</label>
                <Input
                  name="salary_max"
                  type="number"
                  placeholder="e.g., 120000"
                  icon={DollarSign}
                  value={formData.salary_max}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card variant="neo" className="p-6">
          <CardHeader className="p-0 pb-6">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Required Skills
            </CardTitle>
            <CardDescription>Skills candidates should possess</CardDescription>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              />
              <Button type="button" variant="secondary" onClick={addSkill}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="gap-1 pr-1">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1 h-4 w-4 rounded-full hover:bg-background/50 flex items-center justify-center"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Description */}
        <Card variant="neo" className="p-6">
          <CardHeader className="p-0 pb-6">
            <CardTitle>Job Description</CardTitle>
            <CardDescription>Detailed information about the role</CardDescription>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Description *</label>
              <textarea
                name="description"
                placeholder="Describe the role, responsibilities, and what a typical day looks like..."
                value={formData.description}
                onChange={handleChange}
                rows={6}
                required
                className="flex w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Requirements</label>
              <textarea
                name="requirements"
                placeholder="List the qualifications and experience required..."
                value={formData.requirements}
                onChange={handleChange}
                rows={4}
                className="flex w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Benefits</label>
              <textarea
                name="benefits"
                placeholder="List the benefits and perks offered..."
                value={formData.benefits}
                onChange={handleChange}
                rows={3}
                className="flex w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={(e) => handleSubmit(e, 'draft')}
            loading={createJobMutation.isPending}
          >
            Save as Draft
          </Button>
          <Button
            type="submit"
            loading={createJobMutation.isPending}
          >
            Publish Job
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateJobPage
