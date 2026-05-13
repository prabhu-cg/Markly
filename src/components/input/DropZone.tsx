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
      <div className="m-4 flex items-center gap-2 rounded-lg bg-slate-200 dark:bg-zinc-800 px-3 py-2 text-sm">
        <svg
          className="h-4 w-4 text-slate-500 dark:text-zinc-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M8 16.5a1 1 0 11-2 0 1 1 0 012 0zM15 7a2 2 0 11-4 0 2 2 0 014 0z" />
          <path
            fillRule="evenodd"
            d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633z"
          />
        </svg>
        <span className="truncate text-slate-700 dark:text-zinc-300">{filename}</span>
        <button
          onClick={() => setRawInput(null)}
          className="ml-auto text-slate-500 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-zinc-300"
        >
          ✕
        </button>
      </div>
    )
  }

  return (
    <div
      className={`m-4 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-3 py-10 shrink-0 cursor-pointer ${
        isDragging
          ? 'border-purple-500 bg-purple-50 dark:bg-purple-500/10 shadow-lg shadow-purple-500/20'
          : 'border-slate-300 dark:border-zinc-700 hover:border-purple-400 dark:hover:border-purple-500/50 hover:bg-slate-100 dark:hover:bg-zinc-900/50 bg-slate-50 dark:bg-zinc-900/30'
      }`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <div className={`transition-transform ${isDragging ? 'scale-110' : 'scale-100'}`}>
        <svg
          className={`h-12 w-12 transition-colors ${
            isDragging ? 'text-purple-500 dark:text-purple-400' : 'text-slate-400 dark:text-zinc-500'
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
        <p className="text-sm font-medium text-slate-700 dark:text-zinc-300">
          Drop files here or{' '}
          <label className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 underline cursor-pointer font-semibold">
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
        <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">
          Supports all formats: Word, Text, Markdown, and JSON
        </p>
      </div>
      <div className="flex gap-2 mt-3 flex-wrap justify-center max-w-xs">
        <div style={{ display: 'inline-flex', height: '28px', alignItems: 'center', justifyContent: 'center', padding: '0 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600, backgroundColor: '#fce7f3', color: '#be123c', border: '1px solid #fbcfe8', whiteSpace: 'nowrap', boxSizing: 'border-box' }}>
          .docx
        </div>
        <div style={{ display: 'inline-flex', height: '28px', alignItems: 'center', justifyContent: 'center', padding: '0 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600, backgroundColor: '#dbeafe', color: '#1e40af', border: '1px solid #bfdbfe', whiteSpace: 'nowrap', boxSizing: 'border-box' }}>
          .txt
        </div>
        <div style={{ display: 'inline-flex', height: '28px', alignItems: 'center', justifyContent: 'center', padding: '0 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600, backgroundColor: '#cffafe', color: '#0369a1', border: '1px solid #a5f3fc', whiteSpace: 'nowrap', boxSizing: 'border-box' }}>
          .md
        </div>
        <div style={{ display: 'inline-flex', height: '28px', alignItems: 'center', justifyContent: 'center', padding: '0 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600, backgroundColor: '#f3e8ff', color: '#6b21a8', border: '1px solid #e9d5ff', whiteSpace: 'nowrap', boxSizing: 'border-box' }}>
          .json
        </div>
      </div>
    </div>
  )
}
