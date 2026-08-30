import { useRef, useCallback } from 'react'
import { useAppStore } from '../../store/appStore'
import { InputPanel } from '../input/InputPanel'
import { OutputPanel } from '../output/OutputPanel'
import { ValidationPanel } from '../validation/ValidationPanel'
import { Drawer } from '../ui/Drawer'

export function SplitPane() {
  const validationPanelOpen = useAppStore((s) => s.validationPanelOpen)
  const setValidationPanelOpen = useAppStore((s) => s.setValidationPanelOpen)
  const issues = useAppStore((s) => s.issues)
  const editorRef = useRef<HTMLTextAreaElement | null>(null)

  const scrollToLine = useCallback((lineNumber: number) => {
    const el = editorRef.current
    if (!el) return

    const text = el.value
    const lines = text.split('\n')

    let charOffset = 0
    for (let i = 0; i < lineNumber - 1; i++) {
      charOffset += (lines[i]?.length ?? 0) + 1
    }

    const lineEnd = charOffset + (lines[lineNumber - 1]?.length ?? 0)
    el.focus()
    el.setSelectionRange(charOffset, lineEnd)

    const lineHeight = 20
    el.scrollTop = Math.max(0, (lineNumber - 1) * lineHeight - el.clientHeight / 2)
  }, [])

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="w-[30%] flex flex-col border-r border-border overflow-hidden shrink-0">
        <InputPanel />
      </div>

      <div className="flex flex-1 min-w-0 flex-col overflow-hidden">
        <OutputPanel editorRef={editorRef} />
      </div>

      <Drawer
        isOpen={validationPanelOpen}
        onClose={() => setValidationPanelOpen(false)}
        title={issues.length > 0 ? `Validation (${issues.length})` : 'Validation'}
      >
        <ValidationPanel onScrollToLine={scrollToLine} />
      </Drawer>
    </div>
  )
}
