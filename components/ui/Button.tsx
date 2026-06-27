import Link from 'next/link'
import { type ReactNode } from 'react'

/**
 * Wiederverwendbarer Button im Design von Website A.
 * Varianten: primary (Blau) · green (CTA) · ghost (Rahmen) · secondary (Fläche)
 */
type Variant = 'primary' | 'green' | 'ghost' | 'secondary'
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
  primary: 'bg-accent hover:bg-accent-hover text-white font-semibold hover:-translate-y-px',
  green: 'bg-green text-green-ink font-bold hover:brightness-105 hover:-translate-y-px',
  ghost: 'border border-border text-primary hover:border-muted hover:bg-white/[0.03] font-semibold',
  secondary: 'bg-surface-2 hover:bg-border text-primary border border-border font-medium',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-full',
  md: 'px-6 py-3 text-[15px] rounded-full',
  lg: 'px-[30px] py-[15px] text-base rounded-full',
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
    const isExternal = external || href.startsWith('http')
    if (isExternal) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} disabled={disabled || loading} onClick={onClick} className={classes}>
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
