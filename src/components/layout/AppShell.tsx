import { useAppStore } from '../../store/appStore'
import { Toast } from '../ui/Toast'
import { ModeIndicator } from '../input/ModeIndicator'
import { ThemeToggle } from '../ui/ThemeToggle'
import { AboutButton } from '../ui/AboutButton'
import { SplitPane } from './SplitPane'

export function AppShell() {
  const errorMessage = useAppStore((s) => s.errorMessage)

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100">
      <header className="flex flex-col border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-gradient-to-b dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 shrink-0">
        {/* Main header row */}
        <div className="h-16 flex items-center justify-between px-6">
          {/* Brand section with icon */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30 shadow-lg shadow-purple-500/20">
              <svg className="w-6 h-6" viewBox="0 0 48 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" />
              </svg>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Markly</h1>
                <span className="text-xs font-medium text-purple-600 dark:text-purple-400/80 tracking-wider">v2.0</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                Smart document to markdown converter
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ModeIndicator />
            <ThemeToggle />
            <AboutButton />
          </div>
        </div>

      </header>

      <SplitPane />

      {errorMessage && (
        <Toast
          message={errorMessage}
          type="error"
          duration={3000}
        />
      )}
    </div>
  )
}
