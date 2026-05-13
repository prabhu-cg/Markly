import { CheckCircle, Copy, Download } from 'phosphor-react'
import { useAppStore } from '../../store/appStore'
import { useClipboard } from '../../hooks/useClipboard'
import { downloadMarkdown } from '../../lib/utils/download'
import { Button } from '../ui/Button'

export function OutputToolbar() {
  const { previewTab, setPreviewTab, output, issues, validationPanelOpen, setValidationPanelOpen, rawInput, jsonMode } = useAppStore()
  const { copy, copied } = useClipboard()
  const isJsonOutput = rawInput?.type === 'json'

  const handleCopy = async () => {
    await copy(output)
  }

  const handleDownload = () => {
    downloadMarkdown(output, 'output.md')
  }

  return (
    <div className="h-10 flex items-center justify-between px-4 border-b border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900/50 shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-slate-600 dark:text-zinc-400 uppercase tracking-wider">
          Markdown
        </span>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={previewTab === 'preview'}
            onChange={(e) => setPreviewTab(e.target.checked ? 'preview' : 'raw')}
            className="sr-only"
          />
          <div className={`w-9 h-5 rounded-full transition-colors ${
            previewTab === 'preview'
              ? 'bg-purple-600 dark:bg-purple-500'
              : 'bg-slate-300 dark:bg-zinc-600'
          }`}>
            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
              previewTab === 'preview' ? 'translate-x-4' : 'translate-x-0.5'
            } mt-0.5`} />
          </div>
          <span className="text-xs font-medium text-slate-600 dark:text-zinc-400">
            HTML Preview
          </span>
        </label>
      </div>

      <div className="flex gap-2">
        {isJsonOutput && (
          <div className="flex items-center px-2 py-1 rounded text-xs bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-700">
            JSON mode: <span className="font-medium ml-1 capitalize">{jsonMode}</span>
          </div>
        )}
        <Button
          size="sm"
          variant={validationPanelOpen ? 'default' : 'ghost'}
          onClick={() => setValidationPanelOpen(!validationPanelOpen)}
        >
          <CheckCircle size={16} />
          {issues.length > 0 ? `Validate (${issues.length})` : 'Validate'}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCopy}
          disabled={!output}
        >
          <Copy size={16} />
          {copied ? 'Copied!' : 'Copy'}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleDownload}
          disabled={!output}
        >
          <Download size={16} />
          Download .md
        </Button>
      </div>
    </div>
  )
}
