import type { Metadata } from 'next'
import { PageShell, InfoCard } from '@/components/sections/PageShell'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Offene Stellen',
  description: 'Arbeite mit Boogly Studio — wir suchen Menschen, die Social-Video mit echten Geschichten gestalten wollen.',
}

export default function OffeneStellenPage() {
  return (
    <PageShell
      eyebrow="Offene Stellen"
      title="Arbeite mit uns"
      intro="Wir sind ein junges Studio aus Stuttgart und wachsen. Wenn du Lust hast, echte Geschichten in starke Formate zu verwandeln, lern uns kennen."
    >
      <div className="grid sm:grid-cols-2 gap-5 mb-12">
        <InfoCard title="Kamera & Schnitt">
          Du drehst gern, hast ein Auge für Social-Video und bringst Tempo in den Schnitt? Dann passt du zu uns.
        </InfoCard>
        <InfoCard title="Redaktion & Konzept">
          Du findest Themen, die Menschen bewegen, und entwickelst daraus Formate? Wir freuen uns auf deine Ideen.
        </InfoCard>
        <InfoCard title="Social Media">
          Du kennst die Plattformen, ihre Sprache und ihren Rhythmus? Hilf uns, unsere Reichweite auszubauen.
        </InfoCard>
        <InfoCard title="Praktikum & Aushilfe">
          Du willst lernen und mit anpacken? Auch ohne lange Erfahrung — erzähl uns, was dich antreibt.
        </InfoCard>
      </div>

      <div className="rounded-3xl p-10 text-center" style={{ background: 'var(--carbon)', border: '1px solid var(--line)' }}>
        <h2 className="font-display text-primary text-2xl font-bold mb-3">Initiativbewerbung</h2>
        <p className="text-secondary mb-7 max-w-lg mx-auto">
          Aktuell keine passende Stelle dabei? Schreib uns trotzdem — gute Leute finden bei uns immer einen Weg.
        </p>
        <Button href="/kontakt" variant="primary">Jetzt bewerben</Button>
      </div>
    </PageShell>
  )
}
