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
    'bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white',
  ghost:
    'bg-transparent hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100',
  danger:
    'bg-red-600 hover:bg-red-500 active:bg-red-700 text-white',
  'danger-outline':
    'bg-transparent border border-red-600 text-red-600 dark:border-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30',
  secondary:
    'bg-slate-300 dark:bg-zinc-700 hover:bg-slate-400 dark:hover:bg-zinc-600 active:bg-slate-500 dark:active:bg-zinc-800 text-slate-900 dark:text-white',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-md',
  md: 'px-4 py-2 text-sm rounded-lg',
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
    'inline-flex items-center justify-center gap-1.5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
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
