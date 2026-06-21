import Link from 'next/link'
import { type ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  className?: string
  external?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-accent hover:bg-accent-hover text-white font-semibold shadow-lg shadow-accent/20 hover:shadow-accent/30',
  secondary:
    'bg-surface-2 hover:bg-border text-primary border border-border font-medium',
  ghost:
    'text-secondary hover:text-primary hover:bg-surface-2 font-medium',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-sm rounded-xl',
  lg: 'px-8 py-4 text-base rounded-xl',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  disabled,
  loading,
  onClick,
  className = '',
  external,
}: ButtonProps) {
  const classes = `
    inline-flex items-center justify-center gap-2
    transition-all duration-200 cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `.trim()

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={classes}
    >
      {loading && (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
}
