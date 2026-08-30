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
    <div className="h-10 flex items-center justify-between px-4 border-b border-border bg-surface-muted shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
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
              ? 'bg-primary'
              : 'bg-border-strong'
          }`}>
            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
              previewTab === 'preview' ? 'translate-x-4' : 'translate-x-0.5'
            } mt-0.5`} />
          </div>
          <span className="text-xs font-medium text-text-muted">
            HTML Preview
          </span>
        </label>
      </div>

      <div className="flex gap-2">
        {isJsonOutput && (
          <div className="flex items-center px-2 py-1 rounded text-xs bg-info-surface text-info border border-info/20">
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
          title="Download .md"
        >
          <Download size={16} />
          <span className="hidden lg:inline">Download .md</span>
        </Button>
      </div>
    </div>
  )
}
