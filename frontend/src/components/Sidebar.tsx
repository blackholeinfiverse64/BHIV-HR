import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useSidebarContext } from './Layout'
import {
  LayoutDashboard,
  User,
  Briefcase,
  Calendar,
  MessageSquare,
  Zap,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react'

interface SidebarProps {
  userType: 'candidate' | 'recruiter' | 'client'
}

export default function Sidebar({ userType }: SidebarProps) {
  const { collapsed, setCollapsed } = useSidebarContext()
  const { signOut, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  const candidateLinks = [
    { to: '/candidate/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/candidate/profile', icon: User, label: 'Candidate Profile' },
    { to: '/candidate/jobs', icon: Briefcase, label: 'Applied Jobs' },
    { to: '/candidate/interviews', icon: Calendar, label: 'Interviews' },
    { to: '/candidate/feedback', icon: MessageSquare, label: 'Feedback' },
  ]

  const recruiterLinks = [
    { to: '/recruiter/dashboard', icon: LayoutDashboard, label: 'Recruiter Dashboard' },
    { to: '/recruiter/jobs', icon: Briefcase, label: 'Create Job' },
    { to: '/recruiter/automation', icon: Zap, label: 'Automation' },
  ]

  const clientLinks = [
    { to: '/client/dashboard', icon: LayoutDashboard, label: 'Client Dashboard' },
    { to: '/client/reports', icon: BarChart3, label: 'Client Analytics' },
  ]

  const links = userType === 'candidate' ? candidateLinks : userType === 'recruiter' ? recruiterLinks : clientLinks

  const getGradient = () => {
    if (userType === 'candidate') return 'from-green-600 to-emerald-600'
    if (userType === 'recruiter') return 'from-purple-600 to-pink-600'
    return 'from-blue-600 to-indigo-600'
  }

  const getActiveColor = () => {
    if (userType === 'candidate') return 'bg-green-100 text-green-700 border-green-300'
    if (userType === 'recruiter') return 'bg-purple-100 text-purple-700 border-purple-300'
    return 'bg-blue-100 text-blue-700 border-blue-300'
  }

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`absolute -right-3 top-6 h-6 w-6 rounded-full bg-white border border-gray-300 text-gray-600 flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all z-50`}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>

      {/* User Info */}
      {!collapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${getGradient()} flex items-center justify-center text-white font-semibold text-sm shadow-sm`}>
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-800 truncate">{user?.email?.split('@')[0] || 'User'}</p>
              <p className="text-xs text-gray-500 capitalize">{userType}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100%-180px)]">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? `${getActiveColor()}`
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
              title={collapsed ? link.label : ''}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </NavLink>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200 bg-white">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          title={collapsed ? 'Logout' : ''}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}
