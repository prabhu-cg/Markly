interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-2xl w-[400px] h-[500px] overflow-y-auto flex flex-col">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">About Markly</h2>
            <button
              onClick={onClose}
              className="text-slate-400 dark:text-zinc-400 hover:text-slate-600 dark:hover:text-zinc-200 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4 space-y-5 flex-1 overflow-y-auto">
            {/* Version & Description */}
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/20 border border-purple-200 dark:border-purple-500/40 mb-3">
                <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">v2.0.0</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Smart Document to Markdown Converter
              </h3>
              <p className="text-sm text-slate-600 dark:text-zinc-400">
                Transform documents, text, and JSON into beautifully formatted Markdown with built-in validation and formatting.
              </p>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Features</h4>
              <ul className="space-y-2">
                {[
                  'Multi-format document conversion (DOCX, TXT, MD, JSON)',
                  'Three JSON conversion modes (Readable, Table, Code)',
                  'Real-time markdown validation',
                  'Built-in cleanup and formatting',
                  'Instant preview rendering',
                  'One-click copy and download',
                  'Dark/Light mode support',
                ].map((feature, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-slate-700 dark:text-zinc-400">
                    <span className="text-purple-600 dark:text-purple-400 mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Supported Formats */}
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Supported Formats</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'Word Documents', ext: '.docx', color: 'purple' },
                  { name: 'Plain Text', ext: '.txt', color: 'blue' },
                  { name: 'Markdown', ext: '.md', color: 'cyan' },
                  { name: 'JSON Data', ext: '.json', color: 'pink' },
                ].map((format) => (
                  <div key={format.ext} className="text-xs">
                    <div className="font-medium text-slate-900 dark:text-white">{format.name}</div>
                    <div className="text-slate-500 dark:text-zinc-500">{format.ext}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology */}
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Built With</h4>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Vite', 'Unified/Remark'].map(
                  (tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded text-xs bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700">
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Why Markly?</h4>
              <ul className="space-y-1 text-sm text-slate-700 dark:text-zinc-400">
                <li>• Zero external API calls (100% client-side)</li>
                <li>• Lightning-fast processing</li>
                <li>• Professional markdown output</li>
                <li>• Unlimited document size</li>
                <li>• No data sent to servers</li>
              </ul>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-200 dark:border-zinc-800 text-xs text-slate-500 dark:text-zinc-500">
              <p>Made with ❤️ for document professionals</p>
              <p className="mt-1">© 2026 Markly. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
