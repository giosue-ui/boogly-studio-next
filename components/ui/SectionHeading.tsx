import { type ReactNode } from 'react'
import { Eyebrow } from './Eyebrow'

/** Zentrierter Sektionskopf: Eyebrow + Headline. */
export function SectionHeading({
  eyebrow,
  title,
  eyebrowColor = 'blue',
  align = 'center',
  className = '',
}: {
  eyebrow?: string
  title: ReactNode
  eyebrowColor?: 'blue' | 'green'
  align?: 'center' | 'left'
  className?: string
}) {
  return (
    <div className={`${align === 'center' ? 'text-center' : ''} ${className}`}>
      {eyebrow && (
        <div className="mb-3.5">
          <Eyebrow color={eyebrowColor}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 className="font-display font-extrabold text-primary text-[clamp(30px,4.2vw,50px)] leading-[1.05]">
        {title}
      </h2>
    </div>
  )
}
