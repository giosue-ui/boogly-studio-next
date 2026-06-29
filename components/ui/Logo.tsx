'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { usePupilFollow } from './GooglyEyes'

/**
 * Wortmarke „b[oo]gly.studio" mit zwei Googly-Eyes als „oo".
 * onDark = helle Variante für dunkle Flächen (Header/Footer).
 */
export function Logo({
  href = '/',
  size = 25,
  brand = 'boogly',
  suffix = '.studio',
  onDark = false,
  onLight = false,
}: {
  href?: string
  size?: number
  brand?: string
  suffix?: string
  onDark?: boolean
  onLight?: boolean
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  usePupilFollow(ref)

  // onLight = dunkle Schrift auf hellem Header; onDark/Default = creme Schrift auf dunkler Fläche
  const letterColor = onLight ? '#1A1A18' : onDark ? '#F2EEE4' : 'var(--paper)'
  const eyeBg = onLight ? '#1A1A18' : onDark ? '#F2EEE4' : 'var(--paper)'
  const pupilBg = onLight ? '#F2EEE4' : onDark ? '#1A1A18' : 'var(--ink)'

  const ooIndex = brand.toLowerCase().indexOf('oo')
  const pre = ooIndex >= 0 ? brand.slice(0, ooIndex) : brand
  const post = ooIndex >= 0 ? brand.slice(ooIndex + 2) : ''

  const eye = (
    <span
      className="relative inline-flex items-center justify-center rounded-full flex-none"
      style={{ width: '0.62em', height: '0.62em', margin: '0 .015em', transform: 'translateY(.04em)', background: eyeBg }}
    >
      <i
        data-pupil
        className="absolute rounded-full"
        style={{ width: '42%', height: '42%', background: pupilBg, transition: 'transform .12s ease-out' }}
      />
    </span>
  )

  return (
    <Link
      ref={ref}
      href={href}
      aria-label={`${brand}${suffix}`}
      className="inline-flex items-center font-display font-extrabold leading-none hover:opacity-90 transition-opacity"
      style={{ fontSize: size, letterSpacing: '-0.04em', color: letterColor }}
    >
      {pre}
      {ooIndex >= 0 ? (
        <>
          {eye}
          {eye}
        </>
      ) : null}
      {post}
      <span style={{ color: 'var(--blue)' }}>{suffix}</span>
    </Link>
  )
}
