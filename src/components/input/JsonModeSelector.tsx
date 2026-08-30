import { useAppStore } from '../../store/appStore'
import type { JsonMode } from '../../types'

const modes: { value: JsonMode; label: string; description: string }[] = [
  {
    value: 'readable',
    label: 'Readable',
    description: 'Headings, lists, and structure',
  },
  {
    value: 'table',
    label: 'Table',
    description: 'Arrays as HTML tables',
  },
  {
    value: 'code',
    label: 'Code',
    description: 'JSON in code block',
  },
]

export function JsonModeSelector() {
  const jsonMode = useAppStore((s) => s.jsonMode)
  const setJsonMode = useAppStore((s) => s.setJsonMode)

  return (
    <div className="mx-4 mt-3 mb-2 p-3 rounded-md bg-surface-muted border border-border">
      <div className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
        JSON Output Mode
      </div>
      <div className="space-y-2">
        {modes.map((mode) => (
          <label
            key={mode.value}
            className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-surface transition-colors"
          >
            <input
              type="radio"
              name="json-mode"
              value={mode.value}
              checked={jsonMode === mode.value}
              onChange={() => setJsonMode(mode.value)}
              className="h-4 w-4 cursor-pointer accent-primary"
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-text">{mode.label}</div>
              <div className="text-xs text-text-subtle">{mode.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}
