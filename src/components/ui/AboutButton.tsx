import { useState } from 'react'
import { AboutModal } from './AboutModal'

export function AboutButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-200 dark:bg-zinc-800/50 hover:bg-slate-300 dark:hover:bg-zinc-700/50 border border-slate-300 dark:border-zinc-700/50 hover:border-slate-400 dark:hover:border-zinc-600 transition-colors text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
        title="About this tool"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </button>

      <AboutModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
