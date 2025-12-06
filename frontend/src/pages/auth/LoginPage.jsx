import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { Mail, Lock, Eye, EyeOff, Building2, User } from 'lucide-react'

export function LoginPage() {
  const [userType, setUserType] = useState('client')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    client_id: '',
    email: '',
    password: '',
  })

  const { loginClient, loginCandidate } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (userType === 'client') {
        await loginClient({
          client_id: formData.client_id,
          password: formData.password,
        })
        toast.success('Welcome back!', 'You have been logged in successfully.')
      } else {
        await loginCandidate({
          email: formData.email,
          password: formData.password,
        })
        toast.success('Welcome back!', 'You have been logged in successfully.')
      }
      navigate('/')
    } catch (error) {
      toast.error(
        'Login Failed',
        error.response?.data?.detail || 'Invalid credentials. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold">Welcome back</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Sign in to your account to continue
        </p>
      </div>

      <Tabs value={userType} onValueChange={setUserType} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="client" className="gap-2">
            <Building2 className="h-4 w-4" />
            Client
          </TabsTrigger>
          <TabsTrigger value="candidate" className="gap-2">
            <User className="h-4 w-4" />
            Candidate
          </TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <TabsContent value="client" className="space-y-4 mt-0">
            <div className="space-y-2">
              <label className="text-sm font-medium">Client ID</label>
              <Input
                name="client_id"
                placeholder="Enter your client ID"
                icon={Building2}
                value={formData.client_id}
                onChange={handleChange}
                required
              />
            </div>
          </TabsContent>

          <TabsContent value="candidate" className="space-y-4 mt-0">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                icon={Mail}
                value={formData.email}
                onChange={handleChange}
                required={userType === 'candidate'}
              />
            </div>
          </TabsContent>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                icon={Lock}
                value={formData.password}
                onChange={handleChange}
                required
                className="pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-border" />
              <span className="text-sm">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full" loading={isLoading}>
            Sign In
          </Button>
        </form>
      </Tabs>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary font-semibold hover:underline">
          Sign up
        </Link>
      </p>

      {/* Demo Credentials */}
      <div className="rounded-xl bg-muted/50 p-4 border border-border/50">
        <p className="text-xs text-muted-foreground font-medium mb-2">Demo Credentials:</p>
        <p className="text-xs text-muted-foreground">
          Client ID: <code className="bg-background px-1 rounded">TECH001</code>
        </p>
        <p className="text-xs text-muted-foreground">
          Password: <code className="bg-background px-1 rounded">demo123</code>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
