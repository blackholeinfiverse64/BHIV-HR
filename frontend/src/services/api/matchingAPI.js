import { agentApi } from './axiosConfig'
import config from '@/config'

const { endpoints } = config

export const matchingAPI = {
  // AI-powered candidate matching for a job
  matchCandidates: async (jobData) => {
    const response = await agentApi.post(endpoints.match, jobData)
    return response.data
  },

  // Batch matching for multiple jobs
  batchMatch: async (jobs) => {
    const response = await agentApi.post(endpoints.batchMatch, { jobs })
    return response.data
  },

  // Get detailed analysis for a candidate
  analyzeCandidate: async (candidateId) => {
    const response = await agentApi.get(endpoints.analyze(candidateId))
    return response.data
  },

  // Get AI recommendations
  getRecommendations: async (jobId, candidateIds) => {
    const response = await agentApi.post('/recommendations', { job_id: jobId, candidate_ids: candidateIds })
    return response.data
  },

  // Submit feedback for AI learning
  submitFeedback: async (matchId, feedback) => {
    const response = await agentApi.post('/feedback', { match_id: matchId, ...feedback })
    return response.data
  },

  // Get matching history
  getMatchHistory: async (params = {}) => {
    const response = await agentApi.get('/match-history', { params })
    return response.data
  },

  // Get AI service health
  getAIHealth: async () => {
    const response = await agentApi.get('/health')
    return response.data
  },
}

export default matchingAPI
