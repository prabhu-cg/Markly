import { useState } from 'react'
import type { ReactNode } from 'react'
import { Drawer } from '../ui/Drawer'

interface InfoDrawerProps {
  label: string
  title: string
  description: string
  children: ReactNode
}

export function InfoDrawer({ label, title, description, children }: InfoDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className="transition-colors hover:text-text">
        {label}
      </button>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title={title} description={description}>
        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5 text-sm leading-relaxed text-text-muted">
          {children}
        </div>
      </Drawer>
    </>
  )
}
