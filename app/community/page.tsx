import type { Metadata } from 'next'
import { PageShell, InfoCard } from '@/components/sections/PageShell'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Community',
  description: 'Werde Teil der Boogly-Community — sei bei Drehs dabei, bring deine Themen ein und verpasse kein Casting.',
}

export default function CommunityPage() {
  return (
    <PageShell
      eyebrow="Community"
      title="Werde Teil unserer Community"
      intro="Boogly lebt von echten Menschen und ihren Geschichten. Werde Teil der Community und sei näher dran an dem, was wir machen."
    >
      <div className="grid sm:grid-cols-2 gap-5 mb-12">
        <InfoCard title="Zuerst Bescheid wissen">
          Erfahre als Erstes von neuen Castings und Formaten — bevor sie öffentlich ausgeschrieben werden.
        </InfoCard>
        <InfoCard title="Deine Themen einbringen">
          Du entscheidest mit, worüber wir reden. Schick uns Themen, die dich bewegen, und gestalte unsere Inhalte mit.
        </InfoCard>
        <InfoCard title="Hinter die Kulissen">
          Behind-the-Scenes, Einblicke in den Dreh und exklusive Updates direkt aus dem Studio.
        </InfoCard>
        <InfoCard title="Echte Begegnungen">
          Lern andere kennen, die wie du Lust auf ehrliche Gespräche und neue Perspektiven haben.
        </InfoCard>
      </div>

      <div className="rounded-3xl p-10 text-center" style={{ background: 'var(--carbon)', border: '1px solid var(--line)' }}>
        <h2 className="font-display text-primary text-2xl font-bold mb-3">Bleib in Kontakt</h2>
        <p className="text-secondary mb-7 max-w-lg mx-auto">
          Folg uns auf Social Media und schau dir aktuelle Castings an — so verpasst du nichts.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button href="https://instagram.com/boogly.studio" variant="primary">Instagram folgen</Button>
          <Button href="/events" variant="ghost">Aktuelle Castings</Button>
        </div>
      </div>
    </PageShell>
  )
}
