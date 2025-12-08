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
      <div className="min-h-screen bg-gray-50/50">
        <Navbar userType={userType} />
        <Sidebar userType={userType} />
        <main 
          className={`pt-16 transition-all duration-300 ${
            collapsed ? 'ml-16' : 'ml-64'
          }`}
        >
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarContext.Provider>
  )
}
