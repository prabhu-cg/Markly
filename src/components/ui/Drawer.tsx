import { X } from 'phosphor-react'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
}

export function Drawer({ isOpen, onClose, title, description, children }: DrawerProps) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-surface shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-text">{title}</h2>
            {description && <p className="mt-1 text-sm text-text-muted">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-md p-1.5 text-text-muted transition-colors hover:bg-background hover:text-text"
          >
            <X size={18} weight="bold" />
          </button>
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
      </div>
    </>
  )
}
