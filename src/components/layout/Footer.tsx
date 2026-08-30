import { Logo } from './Logo'
import { InfoDrawer } from './InfoDrawer'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-3">
          <div className="flex justify-center sm:justify-start">
            <Logo className="h-6 w-auto" />
          </div>

          <p className="justify-self-center text-center text-xs text-text-muted">
            &copy; {CURRENT_YEAR} Markly. Document to Markdown Converter
          </p>

          <nav className="flex flex-wrap items-center justify-center gap-5 text-xs text-text-muted sm:justify-self-end">
            <InfoDrawer label="About" title="About" description="What Markly is, and why it exists.">
              <p>
                Markly turns documents and rough text into clean, well-formatted Markdown. Drop in
                a Word document, plain text, JSON, or messy Markdown, and it normalizes headings,
                lists, and spacing, then flags anything that still needs a look.
              </p>
              <p>
                Built with React, TypeScript, Tailwind CSS, Zustand, and Unified/Remark. No
                accounts, no dashboards — drop a file in and go.
              </p>
              <p>
                Markly is an independent side project by Prabhu Raja. Questions or feedback:{' '}
                <a
                  href="mailto:prabhu_cg@proton.me"
                  className="underline underline-offset-2 hover:text-text"
                >
                  prabhu_cg@proton.me
                </a>
                .
              </p>
            </InfoDrawer>

            <InfoDrawer label="Privacy" title="Privacy" description="How Markly handles your files.">
              <p>
                Markly is 100% client-side. Your files and pasted text are processed entirely in
                your browser using JavaScript — nothing is ever uploaded to a server.
              </p>
              <p>
                There are no accounts, no analytics, and no cookies. The only thing Markly saves
                locally in your browser is your light/dark theme preference.
              </p>
              <p>Since nothing leaves your device, there's no third-party data handling to disclose.</p>
            </InfoDrawer>

            <InfoDrawer label="Terms" title="Terms" description="The short version.">
              <p>Markly is provided as-is, free of charge, with no warranty of any kind.</p>
              <p>
                You're responsible for the documents you convert and how you use the output.
                Markly does its best to preserve content accurately, but always review the result
                before relying on it.
              </p>
              <p>The tool may change, break, or go offline at any time without notice.</p>
            </InfoDrawer>

            <a
              href="https://github.com/prabhu-cg/Markly"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-text"
            >
              GitHub
            </a>
          </nav>
        </div>

        <p className="mt-4 text-center text-xs text-text-muted">
          Everything runs locally in your browser. Files are never uploaded, stored, or sent to a server.
        </p>
      </div>
    </footer>
  )
}
