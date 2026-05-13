import { useState, useEffect } from 'react'
import { Trash, CaretDown, CaretUp } from 'phosphor-react'
import { useAppStore } from '../../store/appStore'
import { useInputMode } from '../../hooks/useInputMode'
import { useConversion } from '../../hooks/useConversion'
import { Button } from '../ui/Button'
import { ConfirmDialog } from '../ui/ConfirmDialog'
import { DropZone } from './DropZone'
import { PasteArea } from './PasteArea'
import { JsonModeSelector } from './JsonModeSelector'

export function InputPanel() {
  const rawInput = useAppStore((s) => s.rawInput)
  const jsonMode = useAppStore((s) => s.jsonMode)
  const reset = useAppStore((s) => s.reset)
  const { run } = useConversion()
  useInputMode()
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [showUploadZone, setShowUploadZone] = useState(false)
  const isJsonInput = rawInput?.type === 'json'

  const hasInput = !!rawInput

  useEffect(() => {
    if (isJsonInput && rawInput) {
      run()
    }
  }, [jsonMode, isJsonInput, rawInput, run])

  const handleClearAll = () => {
    reset()
    setShowClearConfirm(false)
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="h-10 flex items-center justify-between px-4 border-b border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900/50 shrink-0">
        <span className="text-xs font-medium text-slate-600 dark:text-zinc-400 uppercase tracking-wider">
          Input
        </span>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowUploadZone(!showUploadZone)}
            variant="ghost"
            size="sm"
            title={showUploadZone ? 'Hide upload area' : 'Show upload area'}
          >
            {showUploadZone ? <CaretUp size={16} /> : <CaretDown size={16} />}
          </Button>
          <Button
            onClick={() => setShowClearConfirm(true)}
            variant="ghost"
            size="sm"
            disabled={!hasInput && !rawInput}
          >
            <Trash size={16} />
            Clear All
          </Button>
        </div>
      </div>

      {showUploadZone && <DropZone />}

      {isJsonInput && <JsonModeSelector />}

      {showUploadZone && <div className="h-px bg-slate-200 dark:bg-zinc-800 mx-4 shrink-0" />}
      <div className="flex-1 flex flex-col overflow-hidden">
        <PasteArea />
      </div>


      <ConfirmDialog
        isOpen={showClearConfirm}
        title="Clear Everything?"
        message="This will delete all input files, text, output markdown, and preview. This action cannot be undone."
        confirmText="Clear All"
        cancelText="Cancel"
        onConfirm={handleClearAll}
        onCancel={() => setShowClearConfirm(false)}
        isDangerous
      />
    </div>
  )
}
