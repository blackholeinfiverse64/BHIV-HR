// App Configuration
export const config = {
  // API URLs
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  agentUrl: import.meta.env.VITE_AGENT_URL || 'http://localhost:9000',
  langgraphUrl: import.meta.env.VITE_LANGGRAPH_URL || 'http://localhost:9001',
  
  // App Info
  appName: import.meta.env.VITE_APP_NAME || 'BHIV HR Platform',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // API Endpoints
  endpoints: {
    // Auth
    login: '/v1/client/login',
    register: '/v1/client/register',
    candidateLogin: '/v1/candidate/login',
    candidateRegister: '/v1/candidate/register',
    
    // Jobs
    jobs: '/v1/jobs',
    jobById: (id) => `/v1/jobs/${id}`,
    
    // Candidates
    candidates: '/v1/candidates',
    candidateById: (id) => `/v1/candidates/${id}`,
    candidateSearch: '/v1/candidates/search',
    
    // Matching
    match: '/match',
    batchMatch: '/batch-match',
    analyze: (id) => `/analyze/${id}`,
    
    // Applications
    applications: '/v1/applications',
    applicationById: (id) => `/v1/applications/${id}`,
    
    // Clients
    clients: '/v1/clients',
    clientById: (id) => `/v1/clients/${id}`,
    
    // Analytics
    analytics: '/v1/analytics/overview',
    healthDetailed: '/health/detailed',
    
    // Security
    twoFaSetup: '/v1/2fa/setup',
    twoFaVerify: '/v1/2fa/verify-setup',
    twoFaLogin: '/v1/2fa/login-with-2fa',
    
    // LangGraph Workflows
    workflows: '/workflows',
    workflowStart: '/workflows/application/start',
    workflowStatus: (id) => `/workflows/${id}/status`,
    sendNotification: '/tools/send-notification',
  },
  
  // Pagination
  defaultPageSize: 10,
  maxPageSize: 100,
  
  // File Upload
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: ['.pdf', '.doc', '.docx'],
  
  // Toast Messages Duration (ms)
  toastDuration: 5000,
}

export default config
