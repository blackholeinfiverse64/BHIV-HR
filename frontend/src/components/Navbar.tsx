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
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm`}>
      <div className="h-16 px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-lg bg-gradient-to-r ${getGradient()} flex items-center justify-center shadow-md`}>
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <h1 className="text-lg font-semibold text-gray-800 hidden md:block tracking-tight">BHIV HR Platform</h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-8 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-9 pl-10 pr-4 rounded-lg bg-gray-50 text-gray-700 text-sm placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
