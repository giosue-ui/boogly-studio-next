import { type ReactNode } from 'react'

/** Mono-Label über Headlines (z. B. „Über uns", „FAQ"). */
export function Eyebrow({
  children,
  color = 'blue',
  className = '',
}: {
  children: ReactNode
  color?: 'blue' | 'green'
  className?: string
}) {
  return (
    <span
      className={`eyebrow ${className}`}
      style={{ color: color === 'green' ? 'var(--green)' : 'var(--blue)' }}
    >
      {children}
    </span>
  )
}
