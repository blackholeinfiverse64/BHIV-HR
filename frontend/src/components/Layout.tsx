import { ReactNode, useState, createContext, useContext } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: ReactNode
  userType?: 'candidate' | 'recruiter' | 'client'
}

interface SidebarContextType {
  collapsed: boolean
  setCollapsed: (value: boolean) => void
}

const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
  setCollapsed: () => {},
})

export const useSidebarContext = () => useContext(SidebarContext)

export default function Layout({ children, userType = 'candidate' }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div className="min-h-screen bg-background">
        <Navbar userType={userType} />
        <Sidebar userType={userType} />
        <main 
          className={`pt-18 min-h-screen transition-all duration-300 px-6 py-8 ${
            collapsed ? 'ml-16' : 'ml-64'
          }`}
        >
          {children}
        </main>
        
        {/* Overlay for mobile */}
        {!collapsed && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
            onClick={() => setCollapsed(true)}
          />
        )}
      </div>
    </SidebarContext.Provider>
  )
}
