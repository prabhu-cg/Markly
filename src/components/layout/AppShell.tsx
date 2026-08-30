import { useAppStore } from '../../store/appStore'
import { Toast } from '../ui/Toast'
import { ModeIndicator } from '../input/ModeIndicator'
import { ThemeToggle } from '../ui/ThemeToggle'
import { HelpDrawer } from './HelpDrawer'
import { Logo } from './Logo'
import { Footer } from './Footer'
import { Hero } from '../marketing/Hero'
import { FeatureStrip } from '../marketing/FeatureStrip'
import { SplitPane } from './SplitPane'

export function AppShell() {
  const errorMessage = useAppStore((s) => s.errorMessage)

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <Logo className="h-8 w-auto shrink-0" />
            <div>
              <h2 className="text-lg font-extrabold leading-tight tracking-tight text-text">
                Markly
              </h2>
              <p className="text-xs leading-tight text-text-muted">Document to Markdown Converter</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ModeIndicator />
            <ThemeToggle />
            <HelpDrawer />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-12">
        <Hero />

        <div className="flex h-[560px] min-h-0 flex-col overflow-hidden rounded-md border border-border-strong bg-surface">
          <SplitPane />
        </div>

        <FeatureStrip />
      </main>

      <Footer />

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
