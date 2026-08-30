import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
}

export function Toast({
  message,
  type = 'info',
  duration = 3000,
}: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  if (!visible) return null

  const bgColor =
    type === 'success'
      ? 'bg-success-surface text-success ring-1 ring-success/20'
      : type === 'error'
        ? 'bg-danger-surface text-danger ring-1 ring-danger/20'
        : 'bg-surface-muted text-text ring-1 ring-border'

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium shadow-lg transition-all duration-300 ${bgColor} ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      }`}
    >
      {message}
    </div>
  )
}
