import { Link } from 'react-router-dom'
import { Bell, Settings, User, LogOut, Zap } from 'lucide-react'

interface NavbarProps {
  userType: 'candidate' | 'recruiter' | 'client'
}

export default function Navbar({ userType }: NavbarProps) {
  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_id')
    window.location.href = '/candidate/login'
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-xl bg-card/95 border-b border-border shadow-sm">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to={`/${userType}`} className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="font-heading font-bold text-xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            BHIV HR
          </span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button className="h-9 w-9 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
            <Bell className="h-4 w-4" />
          </button>
          <button className="h-9 w-9 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
            <Settings className="h-4 w-4" />
          </button>
          <div className="h-8 w-px bg-border mx-2" />
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-muted transition-colors">
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium capitalize">{userType}</span>
          </button>
          <button
            onClick={handleLogout}
            className="h-9 w-9 rounded-lg hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </nav>
  )
}
