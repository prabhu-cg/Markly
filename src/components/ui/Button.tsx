import React from 'react'

type ButtonVariant = 'default' | 'ghost' | 'danger' | 'danger-outline' | 'secondary'
type ButtonSize = 'sm' | 'md'

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  default:
    'bg-primary hover:bg-primary-hover active:bg-primary-hover text-primary-foreground',
  ghost:
    'bg-transparent hover:bg-surface text-text-muted hover:text-text',
  danger:
    'bg-danger hover:opacity-90 active:opacity-80 text-white',
  'danger-outline':
    'bg-transparent border border-danger text-danger hover:bg-danger-surface',
  secondary:
    'bg-surface border border-border-strong hover:bg-background text-text',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-md',
  md: 'px-4 py-2 text-sm rounded-md',
}

export function Button({
  variant = 'default',
  size = 'md',
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-1.5 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : ''

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabledClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
