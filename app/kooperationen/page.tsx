import type { Metadata } from 'next'
import { PageShell, InfoCard } from '@/components/sections/PageShell'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Kooperationen',
  description: 'Kooperiere mit Boogly Studio — für Marken, Creator und Organisationen, die authentische Social-Video-Inhalte suchen.',
}

export default function KooperationenPage() {
  return (
    <PageShell
      eyebrow="Kooperationen"
      title="Lass uns zusammenarbeiten"
      intro="Ob Marke, Creator oder Organisation: Wir erzählen Geschichten, die Menschen wirklich erreichen — authentisch, nahbar und Social-First."
    >
      <div className="grid sm:grid-cols-2 gap-5 mb-12">
        <InfoCard title="Marken & Unternehmen">
          Wir produzieren Formate, die zu eurer Botschaft passen — ohne, dass es nach Werbung aussieht.
        </InfoCard>
        <InfoCard title="Creator & Talents">
          Du hast eine starke Stimme oder Reichweite? Lass uns gemeinsam etwas Echtes auf die Beine stellen.
        </InfoCard>
        <InfoCard title="Vereine & Organisationen">
          Ihr habt ein Thema, das gehört werden soll? Wir geben ihm eine Bühne mit echten Menschen.
        </InfoCard>
        <InfoCard title="Locations & Partner">
          Räume, Technik, Ideen — wenn ihr beitragen wollt, finden wir gemeinsam das passende Format.
        </InfoCard>
      </div>

      <div className="rounded-3xl p-10 text-center" style={{ background: 'var(--carbon)', border: '1px solid var(--line)' }}>
        <h2 className="font-display text-primary text-2xl font-bold mb-3">Anfrage senden</h2>
        <p className="text-secondary mb-7 max-w-lg mx-auto">
          Erzähl uns kurz von deiner Idee — wir melden uns in der Regel innerhalb von 1–3 Werktagen.
        </p>
        <Button href="/kontakt" variant="primary">Kooperation anfragen</Button>
      </div>
    </PageShell>
  )
}
