import type { IssueFilter } from '../../types'

interface IssueFilterProps {
  filter: IssueFilter
  counts: { errors: number; warnings: number; suggestions: number }
  onChange: (partial: Partial<IssueFilter>) => void
}

export function IssueFilter({ filter, counts, onChange }: IssueFilterProps) {
  return (
    <div className="flex gap-2 px-4 py-2 border-b border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900/50 shrink-0">
      <button
        onClick={() => onChange({ errors: !filter.errors })}
        className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-colors ${
          filter.errors
            ? 'bg-slate-300 dark:bg-zinc-700 text-slate-900 dark:text-zinc-100'
            : 'bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
        }`}
      >
        <div className="w-2 h-2 rounded-full bg-red-400" />
        Errors ({counts.errors})
      </button>
      <button
        onClick={() => onChange({ warnings: !filter.warnings })}
        className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-colors ${
          filter.warnings
            ? 'bg-slate-300 dark:bg-zinc-700 text-slate-900 dark:text-zinc-100'
            : 'bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
        }`}
      >
        <div className="w-2 h-2 rounded-full bg-amber-400" />
        Warnings ({counts.warnings})
      </button>
      <button
        onClick={() => onChange({ suggestions: !filter.suggestions })}
        className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-colors ${
          filter.suggestions
            ? 'bg-slate-300 dark:bg-zinc-700 text-slate-900 dark:text-zinc-100'
            : 'bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
        }`}
      >
        <div className="w-2 h-2 rounded-full bg-sky-400" />
        Suggestions ({counts.suggestions})
      </button>
    </div>
  )
}
