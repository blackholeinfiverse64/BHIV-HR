import api from './axiosConfig'
import config from '@/config'

const { endpoints } = config

export const candidatesAPI = {
  // Get all candidates with optional filters
  getCandidates: async (params = {}) => {
    const response = await api.get(endpoints.candidates, { params })
    return response.data
  },

  // Get single candidate by ID
  getCandidateById: async (id) => {
    const response = await api.get(endpoints.candidateById(id))
    return response.data
  },

  // Create new candidate
  createCandidate: async (candidateData) => {
    const response = await api.post(endpoints.candidates, candidateData)
    return response.data
  },

  // Update candidate profile
  updateCandidate: async (id, candidateData) => {
    const response = await api.put(endpoints.candidateById(id), candidateData)
    return response.data
  },

  // Delete candidate
  deleteCandidate: async (id) => {
    const response = await api.delete(endpoints.candidateById(id))
    return response.data
  },

  // Search candidates
  searchCandidates: async (query, filters = {}) => {
    const response = await api.post(endpoints.candidateSearch, { query, ...filters })
    return response.data
  },

  // Get candidate applications
  getCandidateApplications: async (candidateId) => {
    const response = await api.get(`${endpoints.candidateById(candidateId)}/applications`)
    return response.data
  },

  // Update candidate status
  updateCandidateStatus: async (candidateId, status) => {
    const response = await api.patch(`${endpoints.candidateById(candidateId)}/status`, { status })
    return response.data
  },

  // Upload resume
  uploadResume: async (candidateId, file) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await api.post(`${endpoints.candidateById(candidateId)}/resume`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },

  // Add notes to candidate
  addNote: async (candidateId, note) => {
    const response = await api.post(`${endpoints.candidateById(candidateId)}/notes`, { note })
    return response.data
  },
}

export default candidatesAPI
