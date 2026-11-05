import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Impressum – Boogly Studio',
  robots: { index: false },
}

export default function ImpressumPage() {
  return (
    <div className="dark-page">
    <div className="container py-24 max-w-2xl">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm mb-10 transition-colors"
        style={{ color: 'var(--muted)' }}
      >
        ← Zurück
      </Link>

      <h1 className="font-display text-3xl font-extrabold mb-10" style={{ color: 'var(--text)' }}>
        Impressum
      </h1>

      <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>

        <section>
          <h2 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>
            Angaben gemäß § 5 DDG
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
              href="mailto:giosuecreates@gmail.com"
              className="transition-colors"
              style={{ color: 'var(--accent)' }}
            >
              giosuecreates@gmail.com
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
          <h2 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>
            Umsatzsteuer-Identifikationsnummer
          </h2>
          <p>
            USt-IdNr. gemäß § 27a UStG: DE465244038
          </p>
        </section>

      </div>
    </div>
    </div>
  )
}
