import api from './axiosConfig'
import config from '@/config'

const { endpoints } = config

export const authAPI = {
  // Client Authentication
  loginClient: async (credentials) => {
    const response = await api.post(endpoints.login, credentials)
    return response.data
  },

  registerClient: async (clientData) => {
    const response = await api.post(endpoints.register, clientData)
    return response.data
  },

  // Candidate Authentication
  loginCandidate: async (credentials) => {
    const response = await api.post(endpoints.candidateLogin, credentials)
    return response.data
  },

  registerCandidate: async (candidateData) => {
    const response = await api.post(endpoints.candidateRegister, candidateData)
    return response.data
  },

  // 2FA Operations
  setup2FA: async (clientId) => {
    const response = await api.post(endpoints.twoFaSetup, { client_id: clientId })
    return response.data
  },

  verify2FASetup: async (clientId, token) => {
    const response = await api.post(endpoints.twoFaVerify, { client_id: clientId, token })
    return response.data
  },

  loginWith2FA: async (clientId, password, token) => {
    const response = await api.post(endpoints.twoFaLogin, { client_id: clientId, password, token })
    return response.data
  },

  // Token Management
  setToken: (token) => {
    localStorage.setItem('token', token)
  },

  getToken: () => {
    return localStorage.getItem('token')
  },

  removeToken: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user))
  },

  getUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('apiKey')
    window.location.href = '/login'
  },
}

export default authAPI
