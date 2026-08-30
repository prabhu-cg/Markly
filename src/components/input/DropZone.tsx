import { useRef } from 'react'
import { useFileInput } from '../../hooks/useFileInput'
import { useAppStore } from '../../store/appStore'

export function DropZone() {
  const inputRef = useRef<HTMLInputElement>(null)
  const { onDrop, onDragOver, onDragLeave, onFileSelect, isDragging } =
    useFileInput()
  const filename = useAppStore((s) => s.rawInput?.filename)
  const setRawInput = useAppStore((s) => s.setRawInput)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileSelect(e)
  }

  if (filename) {
    return (
      <div className="m-4 flex items-center gap-2 rounded-md bg-surface-muted border border-border px-3 py-2 text-sm">
        <svg
          className="h-4 w-4 text-text-muted"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M8 16.5a1 1 0 11-2 0 1 1 0 012 0zM15 7a2 2 0 11-4 0 2 2 0 014 0z" />
          <path
            fillRule="evenodd"
            d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633z"
          />
        </svg>
        <span className="truncate text-text">{filename}</span>
        <button
          onClick={() => setRawInput(null)}
          className="ml-auto text-text-subtle hover:text-text"
        >
          ✕
        </button>
      </div>
    )
  }

  return (
    <div
      className={`m-4 rounded-md border-2 border-dashed transition-all flex flex-col items-center justify-center gap-3 py-10 shrink-0 cursor-pointer ${
        isDragging
          ? 'border-primary bg-surface-muted'
          : 'border-border-strong hover:border-primary bg-background'
      }`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <div className={`transition-transform ${isDragging ? 'scale-110' : 'scale-100'}`}>
        <svg
          className={`h-12 w-12 transition-colors ${
            isDragging ? 'text-primary' : 'text-text-subtle'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-text">
          Drop files here or{' '}
          <label className="text-primary hover:text-primary-hover underline cursor-pointer font-semibold">
            browse
            <input
              ref={inputRef}
              type="file"
              accept=".docx,.txt,.md,.markdown,.json"
              onChange={handleFileSelect}
              className="sr-only"
            />
          </label>
        </p>
        <p className="text-xs text-text-subtle mt-1">
          Supports all formats: Word, Text, Markdown, and JSON
        </p>
      </div>
      <div className="flex gap-2 mt-3 flex-wrap justify-center max-w-xs">
        {['.docx', '.txt', '.md', '.json'].map((ext) => (
          <span
            key={ext}
            className="inline-flex h-7 items-center justify-center rounded-full border border-border-strong px-3 text-xs font-medium text-text-muted"
          >
            {ext}
          </span>
        ))}
      </div>
    </div>
  )
}
