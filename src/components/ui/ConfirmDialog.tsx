import { Button } from './Button'

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  isDangerous?: boolean
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isDangerous = false,
}: ConfirmDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface border border-border rounded-md shadow-lg max-w-sm mx-4">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text">{title}</h2>
        </div>

        <div className="px-6 py-4">
          <p className="text-text-muted text-sm">{message}</p>
        </div>

        <div className="px-6 py-4 border-t border-border flex gap-3 justify-end">
          <Button
            onClick={onCancel}
            variant="secondary"
            size="sm"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            variant={isDangerous ? 'danger' : 'default'}
            size="sm"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}
