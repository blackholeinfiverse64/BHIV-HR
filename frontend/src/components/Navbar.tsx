import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Search, Bell, Sun, Moon, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface NavbarProps {
  userType: 'candidate' | 'recruiter' | 'client'
}

export default function Navbar({ userType }: NavbarProps) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)

  const getGradient = () => {
    if (userType === 'candidate') return 'from-green-600 to-emerald-600'
    if (userType === 'recruiter') return 'from-purple-600 to-pink-600'
    return 'from-blue-600 to-indigo-600'
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r ${getGradient()} shadow-lg`}>
      <div className="h-16 px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <h1 className="text-xl font-bold text-white hidden md:block">BHIV HR Platform</h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8 hidden lg:block">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-12 pr-4 py-2 bg-white/20 backdrop-blur-sm text-white placeholder-white/60 rounded-lg border-2 border-white/30 focus:border-white/60 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="h-10 w-10 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5 text-white" />}
          </button>

          {/* Notifications */}
          <button className="h-10 w-10 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all relative"
            title="Notifications">
            <Bell className="h-5 w-5 text-white" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <button 
            onClick={() => navigate(`/${userType}/profile`)}
            className="h-10 w-10 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all"
            title={user?.email || 'Profile'}
          >
            <User className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </nav>
  )
}
