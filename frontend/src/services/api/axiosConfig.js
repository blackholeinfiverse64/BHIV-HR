import axios from 'axios'
import config from '@/config'

// Create axios instance with default config
const api = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    const apiKey = localStorage.getItem('apiKey')
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else if (apiKey) {
      config.headers.Authorization = `Bearer ${apiKey}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error
    
    if (response) {
      switch (response.status) {
        case 401:
          // Unauthorized - Clear token and redirect to login
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          window.location.href = '/login'
          break
        case 403:
          console.error('Forbidden access')
          break
        case 404:
          console.error('Resource not found')
          break
        case 500:
          console.error('Server error')
          break
        default:
          console.error('API Error:', response.data?.message || 'Unknown error')
      }
    } else if (error.request) {
      console.error('Network error - No response received')
    } else {
      console.error('Request error:', error.message)
    }
    
    return Promise.reject(error)
  }
)

// Agent Service API
export const agentApi = axios.create({
  baseURL: config.agentUrl,
  timeout: 60000, // Longer timeout for AI operations
  headers: {
    'Content-Type': 'application/json',
  },
})

agentApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  const apiKey = localStorage.getItem('apiKey')
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  } else if (apiKey) {
    config.headers.Authorization = `Bearer ${apiKey}`
  }
  
  return config
})

// LangGraph Service API
export const langgraphApi = axios.create({
  baseURL: config.langgraphUrl,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
})

langgraphApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  const apiKey = localStorage.getItem('apiKey')
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  } else if (apiKey) {
    config.headers.Authorization = `Bearer ${apiKey}`
  }
  
  return config
})

export default api
