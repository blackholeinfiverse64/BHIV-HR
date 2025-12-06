import { createContext, useContext, useReducer, useEffect } from 'react'
import { authAPI } from '@/services/api'

// Initial State
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  userType: null, // 'client' | 'candidate' | 'admin'
  permissions: [],
}

// Action Types
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  UPDATE_USER: 'UPDATE_USER',
  SET_ERROR: 'SET_ERROR',
}

// Reducer
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload }
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        userType: action.payload.userType,
        permissions: action.payload.permissions || [],
        isAuthenticated: true,
        isLoading: false,
      }
    case AUTH_ACTIONS.LOGOUT:
      return { ...initialState, isLoading: false }
    case AUTH_ACTIONS.UPDATE_USER:
      return { ...state, user: { ...state.user, ...action.payload } }
    default:
      return state
  }
}

// Context
const AuthContext = createContext(null)

// Provider Component
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = () => {
      try {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')
        const userType = localStorage.getItem('userType')

        if (token && user) {
          dispatch({
            type: AUTH_ACTIONS.LOGIN_SUCCESS,
            payload: {
              token,
              user: JSON.parse(user),
              userType: userType || 'client',
              permissions: [],
            },
          })
        } else {
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false })
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        dispatch({ type: AUTH_ACTIONS.LOGOUT })
      }
    }

    initAuth()
  }, [])

  // Login Client
  const loginClient = async (credentials) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true })
      const response = await authAPI.loginClient(credentials)
      
      const { token, client, ...rest } = response
      const user = client || rest

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('userType', 'client')

      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: {
          token,
          user,
          userType: 'client',
          permissions: user.permissions || [],
        },
      })

      return { success: true, user }
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false })
      throw error
    }
  }

  // Login Candidate
  const loginCandidate = async (credentials) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true })
      const response = await authAPI.loginCandidate(credentials)
      
      const { token, candidate, ...rest } = response
      const user = candidate || rest

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('userType', 'candidate')

      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: {
          token,
          user,
          userType: 'candidate',
          permissions: [],
        },
      })

      return { success: true, user }
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false })
      throw error
    }
  }

  // Register Client
  const registerClient = async (clientData) => {
    try {
      const response = await authAPI.registerClient(clientData)
      return { success: true, data: response }
    } catch (error) {
      throw error
    }
  }

  // Register Candidate
  const registerCandidate = async (candidateData) => {
    try {
      const response = await authAPI.registerCandidate(candidateData)
      return { success: true, data: response }
    } catch (error) {
      throw error
    }
  }

  // Logout
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('userType')
    localStorage.removeItem('apiKey')
    dispatch({ type: AUTH_ACTIONS.LOGOUT })
  }

  // Update User
  const updateUser = (userData) => {
    const updatedUser = { ...state.user, ...userData }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    dispatch({ type: AUTH_ACTIONS.UPDATE_USER, payload: userData })
  }

  // 2FA Setup
  const setup2FA = async () => {
    if (!state.user?.client_id) throw new Error('No user logged in')
    return await authAPI.setup2FA(state.user.client_id)
  }

  // Verify 2FA
  const verify2FA = async (token) => {
    if (!state.user?.client_id) throw new Error('No user logged in')
    return await authAPI.verify2FASetup(state.user.client_id, token)
  }

  // Check Permission
  const hasPermission = (permission) => {
    return state.permissions.includes(permission) || state.userType === 'admin'
  }

  const value = {
    ...state,
    loginClient,
    loginCandidate,
    registerClient,
    registerCandidate,
    logout,
    updateUser,
    setup2FA,
    verify2FA,
    hasPermission,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
