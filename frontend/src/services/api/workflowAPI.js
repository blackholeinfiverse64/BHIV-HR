import { langgraphApi } from './axiosConfig'
import config from '@/config'

const { endpoints } = config

export const workflowAPI = {
  // Get all workflows
  getWorkflows: async () => {
    const response = await langgraphApi.get(endpoints.workflows)
    return response.data
  },

  // Start a new workflow
  startWorkflow: async (workflowData) => {
    const response = await langgraphApi.post(endpoints.workflowStart, workflowData)
    return response.data
  },

  // Get workflow status
  getWorkflowStatus: async (workflowId) => {
    const response = await langgraphApi.get(endpoints.workflowStatus(workflowId))
    return response.data
  },

  // Resume paused workflow
  resumeWorkflow: async (workflowId, data = {}) => {
    const response = await langgraphApi.post(`/workflows/${workflowId}/resume`, data)
    return response.data
  },

  // Cancel workflow
  cancelWorkflow: async (workflowId) => {
    const response = await langgraphApi.post(`/workflows/${workflowId}/cancel`)
    return response.data
  },

  // Send notification via workflow
  sendNotification: async (notificationData) => {
    const response = await langgraphApi.post(endpoints.sendNotification, notificationData)
    return response.data
  },

  // Test LangGraph integration
  testIntegration: async () => {
    const response = await langgraphApi.get('/test-integration')
    return response.data
  },

  // Get workflow health
  getWorkflowHealth: async () => {
    const response = await langgraphApi.get('/health')
    return response.data
  },
}

export default workflowAPI
