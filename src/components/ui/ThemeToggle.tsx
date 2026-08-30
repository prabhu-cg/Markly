import { useState, useEffect } from 'react'
import { Sun, Moon } from 'phosphor-react'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    setIsDark(html.classList.contains('dark'))
  }, [])

  const handleToggle = () => {
    const html = document.documentElement
    html.classList.toggle('dark')
    const newIsDark = html.classList.contains('dark')
    setIsDark(newIsDark)
    localStorage.setItem('markly-theme', newIsDark ? 'dark' : 'light')
  }

  return (
    <button
      onClick={handleToggle}
      className="flex h-9 w-9 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface hover:text-text"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun size={18} weight="bold" /> : <Moon size={18} weight="bold" />}
    </button>
  )
}
