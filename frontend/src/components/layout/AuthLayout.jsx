import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Building2 } from 'lucide-react'

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/30">
              <Building2 className="h-7 w-7 text-white" />
            </div>
          </Link>
          <h1 className="mt-4 font-heading text-3xl font-bold text-foreground">
            BHIV HR Platform
          </h1>
          <p className="mt-2 text-muted-foreground">
            Enterprise AI-Powered Recruiting
          </p>
        </div>

        {/* Auth Content */}
        <div className="rounded-2xl backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border-2 border-gray-300/50 dark:border-gray-600/50 shadow-2xl p-8">
          <Outlet />
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          © 2025 BHIV HR Platform. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default AuthLayout
