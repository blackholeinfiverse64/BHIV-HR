import api from './axiosConfig'
import config from '@/config'

const { endpoints } = config

export const jobsAPI = {
  // Get all jobs with optional filters
  getJobs: async (params = {}) => {
    const response = await api.get(endpoints.jobs, { params })
    return response.data
  },

  // Get single job by ID
  getJobById: async (id) => {
    const response = await api.get(endpoints.jobById(id))
    return response.data
  },

  // Create new job
  createJob: async (jobData) => {
    const response = await api.post(endpoints.jobs, jobData)
    return response.data
  },

  // Update existing job
  updateJob: async (id, jobData) => {
    const response = await api.put(endpoints.jobById(id), jobData)
    return response.data
  },

  // Delete job
  deleteJob: async (id) => {
    const response = await api.delete(endpoints.jobById(id))
    return response.data
  },

  // Get job applications
  getJobApplications: async (jobId) => {
    const response = await api.get(`${endpoints.jobById(jobId)}/applications`)
    return response.data
  },

  // Get job statistics
  getJobStats: async (jobId) => {
    const response = await api.get(`${endpoints.jobById(jobId)}/stats`)
    return response.data
  },

  // Batch operations
  batchUpdateStatus: async (jobIds, status) => {
    const response = await api.post(`${endpoints.jobs}/batch-status`, { job_ids: jobIds, status })
    return response.data
  },
}

export default jobsAPI
