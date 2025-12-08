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
      className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40 shadow-2xl flex flex-col ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >

      {/* Navbar Space - Logo as Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`h-18 border-b border-sidebar-border flex items-center w-full hover:bg-muted/30 transition-all duration-300 group flex-shrink-0 ${
          collapsed ? 'justify-center px-2' : 'px-4'
        }`}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <div className="h-11 w-11 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300" style={{ background: 'var(--gradient-primary)' }}>
          <span className="text-white font-bold text-lg">B</span>
        </div>
        {!collapsed && (
          <h1 className="ml-3 text-xl font-heading font-bold gradient-text">BHIV HR</h1>
        )}
      </button>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto scrollbar-thin">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                  collapsed ? 'justify-center px-2' : 'px-4'
                } ${
                  isActive
                    ? 'bg-primary text-white font-semibold shadow-lg shadow-primary/30'
                    : 'text-sidebar-foreground hover:bg-muted/50 hover:scale-105 active:scale-95'
                }`
              }
              title={collapsed ? link.label : ''}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </NavLink>
          )
        })}
      </nav>

      {/* User Info & Logout Section */}
      <div className="bg-sidebar p-3 space-y-3 flex-shrink-0 mt-auto">
        {/* User Info */}
        {!collapsed ? (
          <div className="flex items-center gap-3 px-1">
            <div className="relative">
              <div className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg" style={{ background: 'var(--gradient-primary)' }}>
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success border-2 border-sidebar animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-sidebar-foreground truncate">{user?.email?.split('@')[0] || 'User'}</p>
              <p className="text-xs text-muted-foreground capitalize">{userType}</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="relative">
              <div className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg" style={{ background: 'var(--gradient-primary)' }}>
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success border-2 border-sidebar animate-pulse" />
            </div>
          </div>
        )}
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`flex items-center gap-2 py-2 rounded-lg text-sm font-medium bg-destructive text-white hover:bg-destructive/90 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl ${
            collapsed ? 'justify-center px-2 w-10 h-10' : 'px-3'
          }`}
          title={collapsed ? 'Logout' : ''}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}
