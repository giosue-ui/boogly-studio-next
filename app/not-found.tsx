import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: '404 – Seite nicht gefunden',
}

export default function NotFound() {
  return (
    <div className="container py-32 text-center">
      <p className="text-8xl font-black text-gradient opacity-30 mb-6">404</p>
      <h1 className="text-primary text-3xl font-bold mb-4">Seite nicht gefunden</h1>
      <p className="text-secondary text-lg max-w-md mx-auto mb-10">
        Diese Seite existiert nicht (mehr). Vielleicht hast du dich vertippt oder der Link ist veraltet.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button href="/">Zurück zur Startseite</Button>
        <Button href="/events" variant="secondary">Aktuelle Castings</Button>
      </div>
    </div>
  )
}
