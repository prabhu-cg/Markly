import { FileText, ListChecks, Lock, Lightning } from 'phosphor-react'
import type { IconProps } from 'phosphor-react'

interface Reason {
  icon: React.ComponentType<IconProps>
  title: string
  body: string
}

const REASONS: Reason[] = [
  {
    icon: ListChecks,
    title: 'Cleans as it converts',
    body: 'Normalizes headings, lists and spacing, then flags anything that still needs a look.',
  },
  {
    icon: FileText,
    title: 'Every format in, Markdown out',
    body: 'DOCX, TXT, JSON and Markdown — one converter handles all of it.',
  },
  {
    icon: Lock,
    title: 'Nothing leaves your browser',
    body: '100% client-side. Your documents are never uploaded or stored.',
  },
  {
    icon: Lightning,
    title: 'Free, no sign-up',
    body: 'No account, no install. Just drop a file and go.',
  },
]

export function FeatureStrip() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 border-t border-border pt-8 sm:mt-16 sm:grid-cols-2 sm:pt-10 lg:grid-cols-4">
      {REASONS.map(({ icon: Icon, title, body }) => (
        <div key={title} className="flex flex-col gap-2">
          <Icon size={20} weight="bold" className="text-primary" aria-hidden="true" />
          <h3 className="text-sm font-semibold text-text">{title}</h3>
          <p className="text-sm text-text-muted">{body}</p>
        </div>
      ))}
    </div>
  )
}
