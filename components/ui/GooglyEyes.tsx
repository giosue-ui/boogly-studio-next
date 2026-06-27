'use client'

import { useEffect, useRef, type RefObject } from 'react'

/**
 * Hook: lässt alle [data-pupil]-Elemente innerhalb von rootRef dem Mauszeiger folgen.
 * Wird von GooglyEyes (Hero) und vom Logo (Header/Footer) geteilt.
 */
export function usePupilFollow(rootRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    // Barrierefreiheit: Wer reduzierte Bewegung bevorzugt, bekommt keine Augen-Animation.
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const pupils = Array.from(root.querySelectorAll<HTMLElement>('[data-pupil]'))
    if (pupils.length === 0) return

    let frame = 0
    function move(mx: number, my: number) {
      pupils.forEach((p) => {
        const eye = p.parentElement
        if (!eye) return
        const r = eye.getBoundingClientRect()
        if (!r.width) return
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const ang = Math.atan2(my - cy, mx - cx)
        const reach = r.width * 0.2
        const d = Math.min(reach, Math.hypot(mx - cx, my - cy) / 12)
        p.style.transform = `translate(${Math.cos(ang) * d}px, ${Math.sin(ang) * d}px)`
      })
    }

    // rAF-gedrosselt: max. ein Update pro Frame (Performance).
    const onMove = (e: MouseEvent) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        move(e.clientX, e.clientY)
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [rootRef])
}

/**
 * Googly-Eyes — Signatur-Interaktion aus Website A.
 * Die Pupillen folgen dem Mauszeiger. Bewusst als Client-Component gekapselt,
 * damit der Rest der Seite Server-gerendert bleibt (Performance + SEO).
 */
type GooglyEyesProps = {
  /** Anzahl Augen (Standard 2) */
  count?: number
  /** Durchmesser je Auge in px */
  size?: number
  /** Abstand zwischen den Augen in px */
  gap?: number
  className?: string
}

export function GooglyEyes({ count = 2, size = 78, gap = 26, className = '' }: GooglyEyesProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  usePupilFollow(rootRef)

  return (
    <div ref={rootRef} className={`flex ${className}`} style={{ gap }}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="relative inline-flex items-center justify-center rounded-full flex-none"
          style={{
            width: size,
            height: size,
            background: 'var(--paper)',
            boxShadow: size > 40 ? '0 10px 36px rgba(0,0,0,.4)' : undefined,
          }}
        >
          <i
            data-pupil
            className="absolute rounded-full"
            style={{
              width: '42%',
              height: '42%',
              background: 'var(--ink)',
              transition: 'transform .12s ease-out',
            }}
          />
        </span>
      ))}
    </div>
  )
}
