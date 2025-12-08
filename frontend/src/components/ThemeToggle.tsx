import { Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    // Load theme from localStorage or default to light
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'light'
    setTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement
    
    // Remove all theme classes
    root.removeAttribute('data-theme')
    root.classList.remove('dark')
    
    // Apply new theme
    if (newTheme === 'dark') {
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
    } else {
      root.setAttribute('data-theme', 'light')
    }
    
    localStorage.setItem('theme', newTheme)
  }

  const cycleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    
    setTheme(nextTheme)
    applyTheme(nextTheme)
  }

  const getIcon = () => {
    return theme === 'light' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />
  }

  const getLabel = () => {
    return theme === 'light' ? 'Light' : 'Dark'
  }

  return (
    <button
      onClick={cycleTheme}
      className="h-11 px-4 rounded-xl flex items-center gap-2 font-medium text-sm transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-accent hover:text-accent-foreground"
      title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} theme`}
    >
      {getIcon()}
      <span className="hidden sm:inline">{getLabel()}</span>
    </button>
  )
}
