import React from 'react'

type BadgeColor = 'warning' | 'info' | 'danger' | 'success'

interface BadgeProps {
  color: BadgeColor
  children: React.ReactNode
}

const colorClasses: Record<BadgeColor, string> = {
  warning: 'bg-warning-surface text-warning',
  info: 'bg-info-surface text-info',
  danger: 'bg-danger-surface text-danger',
  success: 'bg-success-surface text-success',
}

export function Badge({ color, children }: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClasses[color]}`}
    >
      {children}
    </div>
  )
}
