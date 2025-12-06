import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Zap, Mail, Lock, User, Phone, MapPin, ArrowLeft } from 'lucide-react'
import FormInput from '../../components/FormInput'
import toast from 'react-hot-toast'
import { useAuth } from '../../contexts/AuthContext'

type RoleType = 'candidate' | 'recruiter' | 'client'

export default function AuthPage() {
  const { role } = useParams<{ role: RoleType }>()
  const navigate = useNavigate()
  const { signIn, signUp } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
  })

  const roleConfig = {
    candidate: {
      title: 'Candidate',
      gradient: 'from-primary to-primary/80',
      dashboardPath: '/candidate/profile',
      description: 'Find your dream job',
    },
    recruiter: {
      title: 'Recruiter',
      gradient: 'from-secondary to-secondary/80',
      dashboardPath: '/recruiter/dashboard',
      description: 'Manage your hiring pipeline',
    },
    client: {
      title: 'Client',
      gradient: 'from-info to-info/80',
      dashboardPath: '/client/dashboard',
      description: 'Review and approve candidates',
    },
  }

  const config = roleConfig[role as RoleType] || roleConfig.candidate

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { user, error } = await signIn(loginData.email, loginData.password)
      
      if (error || !user) {
        setLoading(false)
        return
      }

      // Store role in localStorage
      localStorage.setItem('role', role || 'candidate')
      localStorage.setItem(`${role}_id`, user.id)
      
      navigate(config.dashboardPath)
    } catch (error) {
      toast.error('Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (signupData.password !== signupData.confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }

    if (signupData.password.length < 6) {
      toast.error('Password must be at least 6 characters!')
      return
    }

    setLoading(true)

    try {
      const { user, error } = await signUp(
        signupData.email,
        signupData.password,
        {
          name: signupData.name,
          phone: signupData.phone,
          location: signupData.location,
          role: role || 'candidate',
        }
      )

      if (error || !user) {
        setLoading(false)
        return
      }

      // Store role in localStorage
      localStorage.setItem('role', role || 'candidate')
      localStorage.setItem(`${role}_id`, user.id)

      // Navigate to dashboard (or show email verification message)
      navigate(config.dashboardPath)
    } catch (error) {
      toast.error('Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to role selection
        </button>

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block">
            <div className={`h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-xl`}>
              <Zap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="font-heading text-3xl font-bold">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-muted-foreground">
            {config.title} Portal - {config.description}
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl border-2 border-border bg-card p-8 shadow-xl">
          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <FormInput
                label="Email Address"
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                placeholder="your.email@example.com"
                required
                icon={<Mail className="h-5 w-5" />}
              />

              <FormInput
                label="Password"
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                placeholder="Enter your password"
                required
                icon={<Lock className="h-5 w-5" />}
              />

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <button type="button" className="text-primary hover:underline">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full h-12 rounded-xl font-bold text-white bg-gradient-to-r ${config.gradient} hover:shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-6">
              <FormInput
                label="Full Name"
                value={signupData.name}
                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                placeholder="John Doe"
                required
                icon={<User className="h-5 w-5" />}
              />

              <FormInput
                label="Email Address"
                type="email"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                placeholder="your.email@example.com"
                required
                icon={<Mail className="h-5 w-5" />}
              />

              <FormInput
                label="Phone Number"
                type="tel"
                value={signupData.phone}
                onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                placeholder="+91 1234567890"
                required
                icon={<Phone className="h-5 w-5" />}
              />

              <FormInput
                label="Location"
                value={signupData.location}
                onChange={(e) => setSignupData({ ...signupData, location: e.target.value })}
                placeholder="City, Country"
                required
                icon={<MapPin className="h-5 w-5" />}
              />

              <FormInput
                label="Password"
                type="password"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                placeholder="Minimum 6 characters"
                required
                icon={<Lock className="h-5 w-5" />}
                helperText="At least 6 characters"
              />

              <FormInput
                label="Confirm Password"
                type="password"
                value={signupData.confirmPassword}
                onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                placeholder="Re-enter password"
                required
                icon={<Lock className="h-5 w-5" />}
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full h-12 rounded-xl font-bold text-white bg-gradient-to-r ${config.gradient} hover:shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
          )}

          {/* Toggle Login/Signup */}
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </span>{' '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-semibold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs text-muted-foreground">
          <p>Supabase authentication will be integrated</p>
        </div>
      </div>
    </div>
  )
}
