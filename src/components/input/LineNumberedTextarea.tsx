import { useRef, useEffect, useState } from 'react'

interface LineNumberedTextareaProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  spellCheck?: boolean
}

export function LineNumberedTextarea({
  value,
  onChange,
  placeholder,
  spellCheck = false,
}: LineNumberedTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const lineNumbersRef = useRef<HTMLDivElement>(null)
  const [lineCount, setLineCount] = useState(1)

  useEffect(() => {
    if (value) {
      const lines = value.split('\n').length
      setLineCount(lines)
    } else {
      setLineCount(1)
    }
  }, [value])

  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop
    }
  }

  return (
    <div className="flex flex-1 w-full overflow-hidden bg-transparent">
      {/* Line numbers column */}
      <div
        ref={lineNumbersRef}
        className="overflow-hidden bg-surface-muted border-r border-border select-none"
      >
        <div className="flex flex-col px-3 py-3 text-right font-mono text-xs text-text-subtle leading-5">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1} className="h-5">
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        className="flex-1 w-full resize-none bg-transparent px-4 py-3 text-sm font-mono text-text placeholder:text-text-subtle focus:outline-none overflow-y-auto"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onScroll={handleScroll}
        spellCheck={spellCheck}
      />
    </div>
  )
}
