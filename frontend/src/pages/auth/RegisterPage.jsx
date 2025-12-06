import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { Mail, Lock, Eye, EyeOff, Building2, User, Phone, MapPin } from 'lucide-react'

export function RegisterPage() {
  const [userType, setUserType] = useState('client')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Client fields
    client_id: '',
    company_name: '',
    // Candidate fields
    name: '',
    email: '',
    phone: '',
    location: '',
    // Common
    password: '',
    confirm_password: '',
  })

  const { registerClient, registerCandidate } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirm_password) {
      toast.error('Password Mismatch', 'Passwords do not match. Please try again.')
      return
    }

    setIsLoading(true)

    try {
      if (userType === 'client') {
        await registerClient({
          client_id: formData.client_id,
          company_name: formData.company_name,
          password: formData.password,
        })
        toast.success('Registration Successful!', 'Your client account has been created.')
      } else {
        await registerCandidate({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          password: formData.password,
        })
        toast.success('Registration Successful!', 'Your candidate account has been created.')
      }
      navigate('/login')
    } catch (error) {
      toast.error(
        'Registration Failed',
        error.response?.data?.detail || 'An error occurred. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold">Create an account</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Get started with BHIV HR Platform
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
                placeholder="Choose a unique client ID"
                icon={Building2}
                value={formData.client_id}
                onChange={handleChange}
                required={userType === 'client'}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Name</label>
              <Input
                name="company_name"
                placeholder="Enter your company name"
                value={formData.company_name}
                onChange={handleChange}
                required={userType === 'client'}
              />
            </div>
          </TabsContent>

          <TabsContent value="candidate" className="space-y-4 mt-0">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                name="name"
                placeholder="Enter your full name"
                icon={User}
                value={formData.name}
                onChange={handleChange}
                required={userType === 'candidate'}
              />
            </div>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input
                  name="phone"
                  placeholder="Phone number"
                  icon={Phone}
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  name="location"
                  placeholder="City, Country"
                  icon={MapPin}
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>
          </TabsContent>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
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

          <div className="space-y-2">
            <label className="text-sm font-medium">Confirm Password</label>
            <Input
              name="confirm_password"
              type="password"
              placeholder="Confirm your password"
              icon={Lock}
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />
          </div>

          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" className="rounded border-border mt-1" required />
            <span className="text-sm text-muted-foreground">
              I agree to the{' '}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </span>
          </label>

          <Button type="submit" className="w-full" loading={isLoading}>
            Create Account
          </Button>
        </form>
      </Tabs>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link to="/login" className="text-primary font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default RegisterPage
