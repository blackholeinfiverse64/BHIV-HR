import api from './axiosConfig'
import config from '@/config'

const { endpoints } = config

export const analyticsAPI = {
  // Get overview analytics
  getOverview: async () => {
    const response = await api.get(endpoints.analytics)
    return response.data
  },

  // Get detailed health status
  getHealthDetailed: async () => {
    const response = await api.get(endpoints.healthDetailed)
    return response.data
  },

  // Get hiring metrics
  getHiringMetrics: async (params = {}) => {
    const response = await api.get('/v1/analytics/hiring', { params })
    return response.data
  },

  // Get job performance metrics
  getJobMetrics: async (jobId) => {
    const response = await api.get(`/v1/analytics/jobs/${jobId}`)
    return response.data
  },

  // Get candidate pipeline metrics
  getPipelineMetrics: async (params = {}) => {
    const response = await api.get('/v1/analytics/pipeline', { params })
    return response.data
  },

  // Get time-to-hire statistics
  getTimeToHire: async (params = {}) => {
    const response = await api.get('/v1/analytics/time-to-hire', { params })
    return response.data
  },

  // Get source effectiveness
  getSourceMetrics: async () => {
    const response = await api.get('/v1/analytics/sources')
    return response.data
  },

  // Export analytics report
  exportReport: async (reportType, format = 'csv') => {
    const response = await api.get(`/v1/reports/${reportType}/export.${format}`, {
      responseType: 'blob',
    })
    return response.data
  },

  // Get dashboard stats
  getDashboardStats: async () => {
    const response = await api.get('/v1/analytics/dashboard')
    return response.data
  },
}

export default analyticsAPI
