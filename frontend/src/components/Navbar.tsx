import { useAuth } from '../contexts/AuthContext'
import { Search, Bell, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSidebarContext } from './Layout'
import ThemeToggle from './ThemeToggle'

interface NavbarProps {
  userType: 'candidate' | 'recruiter' | 'client'
}

export default function Navbar({ userType }: NavbarProps) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { collapsed, setCollapsed } = useSidebarContext()

  const getGradient = () => {
    if (userType === 'candidate') return 'from-green-600 to-emerald-600'
    if (userType === 'recruiter') return 'from-purple-600 to-pink-600'
    return 'from-blue-600 to-indigo-600'
  }

  return (
    <nav className={`fixed top-0 right-0 z-50 h-18 backdrop-blur-xl bg-background/80 border-b border-border/50 shadow-lg transition-all duration-300 ${
      collapsed ? 'left-16' : 'left-64'
    }`}>
      <div className="h-full px-6 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8 hidden lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-muted/50 border-2 border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <button className="h-11 w-11 rounded-xl hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 relative"
            title="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-destructive rounded-full animate-pulse"></span>
          </button>

          {/* User Profile */}
          <button 
            onClick={() => navigate(`/${userType}/profile`)}
            className="h-11 w-11 rounded-xl hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
            title={user?.email || 'Profile'}
          >
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  )
}
