import { NavLink, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context/AuthContext'
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  Brain,
  BarChart3,
  Settings,
  HelpCircle,
  X,
  Workflow,
  Building2,
  UserCircle,
  Shield,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const navigation = {
  client: [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Jobs', href: '/jobs', icon: Briefcase },
    { name: 'Candidates', href: '/candidates', icon: Users },
    { name: 'Applications', href: '/applications', icon: FileText },
    { name: 'AI Matching', href: '/matching', icon: Brain },
    { name: 'Workflows', href: '/workflows', icon: Workflow },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  ],
  candidate: [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Browse Jobs', href: '/jobs', icon: Briefcase },
    { name: 'My Applications', href: '/applications', icon: FileText },
    { name: 'My Profile', href: '/profile', icon: UserCircle },
  ],
  admin: [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Jobs', href: '/jobs', icon: Briefcase },
    { name: 'Candidates', href: '/candidates', icon: Users },
    { name: 'Clients', href: '/clients', icon: Building2 },
    { name: 'Applications', href: '/applications', icon: FileText },
    { name: 'AI Matching', href: '/matching', icon: Brain },
    { name: 'Workflows', href: '/workflows', icon: Workflow },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Security', href: '/security', icon: Shield },
  ],
}

const bottomNavigation = [
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help & Support', href: '/help', icon: HelpCircle },
]

export function Sidebar({ isOpen, onClose }) {
  const location = useLocation()
  const { userType } = useAuth()
  
  const navItems = navigation[userType] || navigation.client

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-18 h-[calc(100vh-4.5rem)] w-64 border-r border-border bg-sidebar z-40 transition-transform duration-300 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Close button for mobile */}
          <div className="flex justify-end p-2 lg:hidden">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4">
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href || 
                  (item.href !== '/' && location.pathname.startsWith(item.href))

                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                    {isActive && (
                      <div className="ml-auto h-2 w-2 rounded-full bg-primary-foreground" />
                    )}
                  </NavLink>
                )
              })}
            </div>
          </nav>

          {/* Bottom Navigation */}
          <div className="border-t border-border p-3">
            <div className="space-y-1">
              {bottomNavigation.map((item) => {
                const isActive = location.pathname === item.href

                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </NavLink>
                )
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-4">
              <p className="text-xs text-muted-foreground">
                BHIV HR Platform v1.0.0
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                © 2025 All rights reserved
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
