import api from './axiosConfig'
import config from '@/config'

const { endpoints } = config

export const applicationsAPI = {
  // Get all applications with filters
  getApplications: async (params = {}) => {
    const response = await api.get(endpoints.applications, { params })
    return response.data
  },

  // Get single application
  getApplicationById: async (id) => {
    const response = await api.get(endpoints.applicationById(id))
    return response.data
  },

  // Create application (candidate applies)
  createApplication: async (applicationData) => {
    const response = await api.post(endpoints.applications, applicationData)
    return response.data
  },

  // Update application status
  updateApplicationStatus: async (id, status, notes = '') => {
    const response = await api.patch(`${endpoints.applicationById(id)}/status`, { status, notes })
    return response.data
  },

  // Get applications by job
  getApplicationsByJob: async (jobId, params = {}) => {
    const response = await api.get(`/v1/jobs/${jobId}/applications`, { params })
    return response.data
  },

  // Get applications by candidate
  getApplicationsByCandidate: async (candidateId, params = {}) => {
    const response = await api.get(`/v1/candidates/${candidateId}/applications`, { params })
    return response.data
  },

  // Schedule interview
  scheduleInterview: async (applicationId, interviewData) => {
    const response = await api.post(`${endpoints.applicationById(applicationId)}/interview`, interviewData)
    return response.data
  },

  // Reject application
  rejectApplication: async (applicationId, reason = '') => {
    const response = await api.post(`${endpoints.applicationById(applicationId)}/reject`, { reason })
    return response.data
  },

  // Move to next stage
  advanceApplication: async (applicationId) => {
    const response = await api.post(`${endpoints.applicationById(applicationId)}/advance`)
    return response.data
  },

  // Withdraw application (candidate)
  withdrawApplication: async (applicationId) => {
    const response = await api.post(`${endpoints.applicationById(applicationId)}/withdraw`)
    return response.data
  },
}

export default applicationsAPI
