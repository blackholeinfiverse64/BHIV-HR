import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '@/context/ThemeContext'
import { useAuth } from '@/context/AuthContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import { Button } from '@/components/ui/Button'
import { AvatarWithStatus } from '@/components/ui/Avatar'
import { getInitials } from '@/lib/utils'
import {
  Sun,
  Moon,
  Bell,
  Search,
  Menu,
  Settings,
  LogOut,
  User,
  Building2,
  ChevronDown,
} from 'lucide-react'

export function Header({ onMenuClick }) {
  const { theme, toggleTheme, isDark } = useTheme()
  const { user, logout, userType } = useAuth()
  const location = useLocation()

  const getPageTitle = () => {
    const path = location.pathname
    if (path === '/') return 'Dashboard'
    if (path.includes('/jobs')) return 'Jobs'
    if (path.includes('/candidates')) return 'Candidates'
    if (path.includes('/applications')) return 'Applications'
    if (path.includes('/matching')) return 'AI Matching'
    if (path.includes('/analytics')) return 'Analytics'
    if (path.includes('/settings')) return 'Settings'
    return 'Dashboard'
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-18 backdrop-blur-xl bg-background/80 border-b border-border/50 shadow-lg">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div className="hidden md:block">
              <h1 className="font-heading text-xl font-bold text-foreground">
                BHIV HR
              </h1>
              <p className="text-xs text-muted-foreground">Enterprise Platform</p>
            </div>
          </Link>

          <div className="hidden lg:block ml-6">
            <h2 className="text-lg font-semibold text-foreground">{getPageTitle()}</h2>
          </div>
        </div>

        {/* Center - Search (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search jobs, candidates..."
              className="w-full h-11 pl-11 pr-4 rounded-xl border-2 border-border bg-background/50 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-xl"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-xl">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive animate-pulse" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="py-4 text-center text-sm text-muted-foreground">
                No new notifications
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 rounded-xl pl-2 pr-3">
                <AvatarWithStatus
                  fallback={getInitials(user?.name || user?.client_id || 'U')}
                  status="online"
                  size="sm"
                />
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold">{user?.name || user?.client_id || 'User'}</p>
                  <p className="text-xs text-muted-foreground capitalize">{userType || 'Client'}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{user?.name || user?.client_id || 'User'}</span>
                  <span className="text-xs text-muted-foreground font-normal">
                    {user?.email || 'user@example.com'}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={logout}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default Header
