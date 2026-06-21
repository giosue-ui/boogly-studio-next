import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Impressum – Boogly Studio',
  robots: { index: false },
}

export default function ImpressumPage() {
  return (
    <div className="container py-24 max-w-2xl">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm mb-10 transition-colors"
        style={{ color: 'var(--muted)' }}
      >
        ← Zurück
      </Link>

      <h1
        className="text-3xl font-bold mb-10"
        style={{ fontFamily: '"Space Grotesk", sans-serif', color: 'var(--text)' }}
      >
        Impressum
      </h1>

      <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>

        <section>
          <h2 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>
            Angaben gemäß § 5 TMG
          </h2>
          <p>
            Giosuele Visalli<br />
            Birkenwaldstraße 27<br />
            70191 Stuttgart<br />
            Deutschland
          </p>
        </section>

        <section>
          <h2 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>
            Kontakt
          </h2>
          <p>
            E-Mail:{' '}
            <a
              href="mailto:hallo@boogly.studio"
              className="transition-colors"
              style={{ color: 'var(--accent)' }}
            >
              hallo@boogly.studio
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>
            Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)
          </h2>
          <p>
            Giosuele Visalli<br />
            Birkenwaldstraße 27<br />
            70191 Stuttgart
          </p>
        </section>

        <section>
          <p>
            Boogly Studio ist ein nicht-eingetragenes Einzelunternehmen. Keine Umsatzsteuer-ID
            vorhanden (Kleinunternehmerregelung § 19 UStG).
          </p>
        </section>

      </div>
    </div>
  )
}
