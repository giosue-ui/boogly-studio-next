'use client'

import { useEffect } from 'react'
import Link from 'next/link'

/**
 * Globale Fehlergrenze: fängt unerwartete Render-/Server-Fehler ab,
 * damit Besucher nie eine kaputte Seite sehen.
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('[app error]', error)
  }, [error])

  return (
    <div className="container py-32 text-center">
      <p className="font-display text-7xl font-extrabold mb-6" style={{ color: 'var(--blue)' }}>
        Hoppla
      </p>
      <h1 className="font-display text-primary text-3xl font-bold mb-4">Da ist etwas schiefgelaufen</h1>
      <p className="text-secondary text-lg max-w-md mx-auto mb-10">
        Ein unerwarteter Fehler ist aufgetreten. Versuch es bitte erneut oder geh zurück zur Startseite.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={reset}
          className="inline-flex items-center px-[30px] py-[15px] rounded-full font-semibold bg-accent hover:bg-accent-hover text-white transition-colors"
        >
          Erneut versuchen
        </button>
        <Link
          href="/"
          className="inline-flex items-center px-[30px] py-[15px] rounded-full font-semibold border border-border text-primary hover:border-muted transition-colors"
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  )
}
