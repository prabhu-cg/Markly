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
      className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-200 dark:bg-zinc-800/50 hover:bg-slate-300 dark:hover:bg-zinc-700/50 border border-slate-300 dark:border-zinc-700/50 hover:border-slate-400 dark:hover:border-zinc-600 transition-colors text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}
