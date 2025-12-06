import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  User,
  Briefcase,
  Users,
  FileText,
  Calendar,
  MessageSquare,
  Zap,
  BarChart3,
  CheckSquare,
} from 'lucide-react'

interface SidebarProps {
  userType: 'candidate' | 'recruiter' | 'client'
}

export default function Sidebar({ userType }: SidebarProps) {
  const candidateLinks = [
    { to: '/candidate/profile', icon: User, label: 'My Profile' },
    { to: '/candidate/applied-jobs', icon: Briefcase, label: 'Applied Jobs' },
    { to: '/candidate/interviews', icon: Calendar, label: 'Interviews & Tasks' },
    { to: '/candidate/feedback', icon: MessageSquare, label: 'Feedback' },
  ]

  const recruiterLinks = [
    { to: '/recruiter', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/recruiter/jobs/new', icon: Briefcase, label: 'Create Job' },
    { to: '/recruiter/automation', icon: Zap, label: 'Automation' },
  ]

  const clientLinks = [
    { to: '/client', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/client/analytics', icon: BarChart3, label: 'Analytics' },
  ]

  const links = userType === 'candidate' ? candidateLinks : userType === 'recruiter' ? recruiterLinks : clientLinks

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-border bg-card/50 backdrop-blur-sm overflow-y-auto">
      <nav className="p-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`
            }
          >
            <link.icon className="h-5 w-5" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Role Switcher */}
      <div className="p-4 border-t border-border mt-4">
        <p className="text-xs text-muted-foreground mb-3 font-semibold uppercase">Switch Role</p>
        <div className="space-y-1">
          <a
            href="/candidate"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              userType === 'candidate' ? 'bg-muted text-foreground' : 'hover:bg-muted/50'
            }`}
          >
            <User className="h-4 w-4" />
            Candidate
          </a>
          <a
            href="/recruiter"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              userType === 'recruiter' ? 'bg-muted text-foreground' : 'hover:bg-muted/50'
            }`}
          >
            <Users className="h-4 w-4" />
            Recruiter
          </a>
          <a
            href="/client"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              userType === 'client' ? 'bg-muted text-foreground' : 'hover:bg-muted/50'
            }`}
          >
            <CheckSquare className="h-4 w-4" />
            Client
          </a>
        </div>
      </div>
    </aside>
  )
}
