import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, Users, Briefcase, Building2 } from 'lucide-react'

export default function SplashScreen() {
  const [showRoles, setShowRoles] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRoles(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const roles = [
    {
      id: 'candidate',
      title: 'Candidate',
      description: 'Find your dream job',
      icon: Users,
      gradient: 'from-primary to-primary/80',
      path: '/auth/candidate',
    },
    {
      id: 'recruiter',
      title: 'Recruiter',
      description: 'Manage hiring process',
      icon: Briefcase,
      gradient: 'from-secondary to-secondary/80',
      path: '/auth/recruiter',
    },
    {
      id: 'client',
      title: 'Client',
      description: 'Review candidates',
      icon: Building2,
      gradient: 'from-info to-info/80',
      path: '/auth/client',
    },
  ]

  if (!showRoles) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center">
        <div className="text-center space-y-8 animate-pulse">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-3xl opacity-30 animate-pulse" />
            <div className="relative h-32 w-32 mx-auto rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.7)]">
              <Zap className="h-16 w-16 text-white" />
            </div>
          </div>
          <div>
            <h1 className="font-heading text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              BHIV HR
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">Intelligent Hiring Platform</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full space-y-12 animate-in fade-in duration-700">
        <div className="text-center space-y-4">
          <div className="inline-block">
            <div className="h-20 w-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl">
              <Zap className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold">Welcome to BHIV HR</h1>
          <p className="text-muted-foreground text-lg">Select your role to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => {
            const Icon = role.icon
            return (
              <button
                key={role.id}
                onClick={() => navigate(role.path)}
                className="group relative rounded-3xl border-2 border-border bg-card p-8 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative space-y-4">
                  <div className={`h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">{role.title}</h3>
                    <p className="text-muted-foreground">{role.description}</p>
                  </div>

                  <div className="pt-4">
                    <div className={`inline-flex items-center justify-center px-6 py-2 rounded-xl bg-gradient-to-r ${role.gradient} text-white font-semibold text-sm group-hover:shadow-lg transition-shadow`}>
                      Get Started
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>AI-powered recruitment made simple</p>
        </div>
      </div>
    </div>
  )
}
