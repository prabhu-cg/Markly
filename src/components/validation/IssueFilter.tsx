import type { IssueFilter } from '../../types'

interface IssueFilterProps {
  filter: IssueFilter
  counts: { errors: number; warnings: number; suggestions: number }
  onChange: (partial: Partial<IssueFilter>) => void
}

export function IssueFilter({ filter, counts, onChange }: IssueFilterProps) {
  return (
    <div className="flex gap-2 px-4 py-2 border-b border-border bg-surface-muted shrink-0">
      <button
        onClick={() => onChange({ errors: !filter.errors })}
        className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-colors ${
          filter.errors
            ? 'bg-border-strong/30 text-text'
            : 'bg-surface text-text-muted hover:text-text'
        }`}
      >
        <div className="w-2 h-2 rounded-full bg-danger" />
        Errors ({counts.errors})
      </button>
      <button
        onClick={() => onChange({ warnings: !filter.warnings })}
        className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-colors ${
          filter.warnings
            ? 'bg-border-strong/30 text-text'
            : 'bg-surface text-text-muted hover:text-text'
        }`}
      >
        <div className="w-2 h-2 rounded-full bg-warning" />
        Warnings ({counts.warnings})
      </button>
      <button
        onClick={() => onChange({ suggestions: !filter.suggestions })}
        className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-colors ${
          filter.suggestions
            ? 'bg-border-strong/30 text-text'
            : 'bg-surface text-text-muted hover:text-text'
        }`}
      >
        <div className="w-2 h-2 rounded-full bg-info" />
        Suggestions ({counts.suggestions})
      </button>
    </div>
  )
}
