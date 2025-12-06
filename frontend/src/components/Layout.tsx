import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

interface LayoutProps {
  userType: 'candidate' | 'recruiter' | 'client'
}

export default function Layout({ userType }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar userType={userType} />
      <div className="flex">
        <Sidebar userType={userType} />
        <main className="flex-1 ml-64 mt-16 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
