import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

// ============================================
// JOBS API
// ============================================
export const getJobs = async (params?: { status?: string; limit?: number }) => {
  try {
    const response = await api.get('/jobs', { params })
    return response.data
  } catch (error) {
    // Mock data fallback
    return {
      jobs: [
        {
          id: '1',
          title: 'Senior Full Stack Developer',
          department: 'IT',
          location: 'Bangalore',
          jobType: 'Remote',
          experienceRange: '3-5',
          salaryMin: 15,
          salaryMax: 25,
          educationLevel: 'Bachelor',
          description: 'Looking for experienced full stack developer...',
          status: 'open',
          applicants_count: 45,
        },
        {
          id: '2',
          title: 'Product Manager',
          department: 'Product',
          location: 'Mumbai',
          jobType: 'Hybrid',
          experienceRange: '5+',
          salaryMin: 20,
          salaryMax: 35,
          educationLevel: 'Master',
          description: 'Seeking experienced product manager...',
          status: 'open',
          applicants_count: 28,
        },
      ],
    }
  }
}

export const createJob = async (jobData: any) => {
  try {
    const response = await api.post('/jobs', jobData)
    return response.data
  } catch (error) {
    // Mock success
    return { success: true, job_id: 'mock-' + Date.now() }
  }
}

export const getJobById = async (jobId: string) => {
  try {
    const response = await api.get(`/jobs/${jobId}`)
    return response.data
  } catch (error) {
    return {
      id: jobId,
      title: 'Senior Full Stack Developer',
      department: 'IT',
      location: 'Bangalore',
      applicants_count: 45,
    }
  }
}

// ============================================
// CANDIDATES API
// ============================================
export const getCandidateProfile = async (candidateId: string) => {
  try {
    const response = await api.get(`/candidates/${candidateId}`)
    return response.data
  } catch (error) {
    return {
      id: candidateId,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 9876543210',
      location: 'Bangalore',
      experience: 5,
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      education: 'Bachelor',
      expectedSalary: 2000000,
      cvUrl: null,
    }
  }
}

export const updateCandidateProfile = async (candidateId: string, data: any) => {
  try {
    const response = await api.put(`/candidates/${candidateId}`, data)
    return response.data
  } catch (error) {
    return { success: true }
  }
}

export const getCandidatesByJob = async (jobId: string) => {
  try {
    const response = await api.get(`/jobs/${jobId}/candidates`)
    return response.data
  } catch (error) {
    return {
      candidates: [
        {
          id: '1',
          name: 'Sarah Johnson',
          location: 'Bangalore',
          experience: 4,
          currentSalary: 1200000,
          expectedSalary: 1800000,
          skills: ['React', 'TypeScript', 'Node.js'],
          matchScore: 92,
          values: { integrity: 5, honesty: 5, discipline: 4, hardWork: 5, gratitude: 4 },
          status: 'applied',
        },
        {
          id: '2',
          name: 'Michael Chen',
          location: 'Mumbai',
          experience: 6,
          currentSalary: 1500000,
          expectedSalary: 2200000,
          skills: ['Python', 'Django', 'AWS', 'Docker'],
          matchScore: 88,
          values: { integrity: 4, honesty: 5, discipline: 5, hardWork: 4, gratitude: 5 },
          status: 'shortlisted',
        },
        {
          id: '3',
          name: 'Priya Sharma',
          location: 'Pune',
          experience: 3,
          currentSalary: 900000,
          expectedSalary: 1500000,
          skills: ['Vue.js', 'JavaScript', 'CSS'],
          matchScore: 78,
          values: { integrity: 5, honesty: 4, discipline: 4, hardWork: 5, gratitude: 5 },
          status: 'applied',
        },
      ],
    }
  }
}

// ============================================
// APPLIED JOBS (CANDIDATE VIEW)
// ============================================
export const getAppliedJobs = async (candidateId: string) => {
  try {
    const response = await api.get(`/candidates/${candidateId}/applied-jobs`)
    return response.data
  } catch (error) {
    return {
      jobs: [
        {
          id: '1',
          title: 'Senior Full Stack Developer',
          company: 'Tech Corp',
          status: 'shortlisted',
          matchScore: 92,
          appliedDate: '2025-11-15',
        },
        {
          id: '2',
          title: 'Frontend Developer',
          company: 'Startup Inc',
          status: 'interview',
          matchScore: 85,
          appliedDate: '2025-11-20',
        },
        {
          id: '3',
          title: 'Full Stack Engineer',
          company: 'Enterprise Ltd',
          status: 'applied',
          matchScore: 78,
          appliedDate: '2025-12-01',
        },
      ],
    }
  }
}

// ============================================
// INTERVIEWS & TASKS
// ============================================
export const getInterviews = async (candidateId: string) => {
  try {
    const response = await api.get(`/candidates/${candidateId}/interviews`)
    return response.data
  } catch (error) {
    return {
      interviews: [
        {
          id: '1',
          jobTitle: 'Senior Full Stack Developer',
          company: 'Tech Corp',
          date: '2025-12-10T10:00:00',
          meetingLink: 'https://meet.google.com/abc-defg-hij',
          status: 'scheduled',
        },
      ],
      tasks: [
        {
          id: '1',
          jobTitle: 'Frontend Developer',
          description: 'Build a responsive dashboard using React',
          deadline: '2025-12-12',
          status: 'pending',
        },
      ],
    }
  }
}

export const submitTask = async (taskId: string) => {
  try {
    const response = await api.post(`/tasks/${taskId}/submit`)
    return response.data
  } catch (error) {
    return { success: true }
  }
}

// ============================================
// FEEDBACK API
// ============================================
export const submitFeedback = async (data: {
  candidateId: string
  jobId: string
  comment: string
  values: { integrity: number; honesty: number; discipline: number; hardWork: number; gratitude: number }
  decision: 'accept' | 'reject' | 'hold' | 'task'
}) => {
  try {
    const response = await api.post('/feedback', data)
    return response.data
  } catch (error) {
    return { success: true }
  }
}

export const getCandidateFeedback = async (candidateId: string) => {
  try {
    const response = await api.get(`/candidates/${candidateId}/feedback`)
    return response.data
  } catch (error) {
    return {
      feedback: [
        {
          jobTitle: 'Senior Full Stack Developer',
          company: 'Tech Corp',
          comment: 'Excellent technical skills and communication',
          values: { integrity: 5, honesty: 5, discipline: 4, hardWork: 5, gratitude: 4 },
          decision: 'accept',
          date: '2025-12-05',
        },
      ],
    }
  }
}

// ============================================
// AUTOMATION API
// ============================================
export const triggerAutomation = async (type: 'shortlist' | 'interview' | 'offer', data?: any) => {
  try {
    const response = await api.post('/automation/trigger', { type, ...data })
    return response.data
  } catch (error) {
    return { success: true, message: `${type} notification triggered` }
  }
}

// ============================================
// CLIENT DASHBOARD API
// ============================================
export const getClientDashboard = async () => {
  try {
    const response = await api.get('/client/dashboard')
    return response.data
  } catch (error) {
    return {
      jobs: [
        {
          id: '1',
          title: 'Senior Full Stack Developer',
          totalApplicants: 45,
          shortlisted: 12,
          interviewed: 5,
          offersSent: 2,
          joined: 1,
        },
        {
          id: '2',
          title: 'Product Manager',
          totalApplicants: 28,
          shortlisted: 8,
          interviewed: 3,
          offersSent: 1,
          joined: 0,
        },
      ],
    }
  }
}

export const updateCandidateStatus = async (
  candidateId: string,
  jobId: string,
  status: 'approved' | 'rejected' | 'request_more'
) => {
  try {
    const response = await api.post('/client/update-status', { candidateId, jobId, status })
    return response.data
  } catch (error) {
    return { success: true }
  }
}

export default api
