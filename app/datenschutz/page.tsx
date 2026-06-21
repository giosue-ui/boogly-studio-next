import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung – Boogly Studio',
  robots: { index: false },
}

export default function DatenschutzPage() {
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
        className="text-3xl font-bold mb-2"
        style={{ fontFamily: '"Space Grotesk", sans-serif', color: 'var(--text)' }}
      >
        Datenschutzerklärung
      </h1>
      <p className="text-xs mb-10" style={{ color: 'var(--hint, rgba(240,237,232,0.25))' }}>
        Stand: Juni 2026
      </p>

      <div className="space-y-10 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>

        <section>
          <h2 className="font-semibold text-base mb-3" style={{ color: 'var(--text)' }}>
            1. Verantwortlicher
          </h2>
          <p>
            Giosuele Visalli<br />
            Birkenwaldstraße 27<br />
            70191 Stuttgart<br />
            E-Mail:{' '}
            <a href="mailto:hallo@boogly.studio" style={{ color: 'var(--accent)' }}>
              hallo@boogly.studio
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-3" style={{ color: 'var(--text)' }}>
            2. Hosting (Vercel)
          </h2>
          <p>
            Diese Website wird bei Vercel Inc., 340 Pine Street, Suite 701, San Francisco,
            CA 94104, USA gehostet. Beim Aufruf der Website werden automatisch technische Daten
            (IP-Adresse, Browser, Uhrzeit, aufgerufene Seiten) in Server-Logfiles gespeichert.
            Diese Daten sind für den Betrieb technisch notwendig und werden nicht mit anderen
            Daten zusammengeführt. Die Übermittlung in die USA erfolgt auf Grundlage der
            EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO).
            Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-3" style={{ color: 'var(--text)' }}>
            3. Google Fonts
          </h2>
          <p>
            Diese Website lädt Schriftarten über Google Fonts von Google LLC,
            1600 Amphitheatre Parkway, Mountain View, CA 94043, USA. Dabei wird deine
            IP-Adresse beim Seitenaufruf an Google übermittelt. Die Einbindung erfolgt auf
            Grundlage unseres berechtigten Interesses an einer einheitlichen Darstellung
            (Art. 6 Abs. 1 lit. f DSGVO). Weitere Informationen:{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)' }}
            >
              policies.google.com/privacy
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-3" style={{ color: 'var(--text)' }}>
            4. Inhalte & CMS (Sanity)
          </h2>
          <p>
            Die Inhalte dieser Website (Castings, Events) werden über Sanity.io verwaltet,
            betrieben von Sanity AS, Strandveien 43, 1366 Lysaker, Norwegen. Sanity verarbeitet
            Inhaltsdaten auf europäischen Servern. Bei normaler Nutzung der Website werden keine
            personenbezogenen Daten an Sanity übermittelt.
            Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-3" style={{ color: 'var(--text)' }}>
            5. Bewerbungsformular & Datenverarbeitung
          </h2>
          <p className="mb-4">
            Wenn du dich über das Bewerbungsformular bewirbst, werden folgende Daten erhoben:
            Vor- und Nachname, E-Mail-Adresse, Social-Media-Profile (Instagram, TikTok, YouTube),
            Informationen zum gewählten Format sowie Freitexte (Vorstellung, Motivation, Themen).
            Diese Daten werden ausschließlich zur Prüfung und Bearbeitung deiner Bewerbung genutzt.
          </p>

          <h3 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>
            5a. Brevo (E-Mail-Versand)
          </h3>
          <p className="mb-4">
            Für den automatisierten Versand von Bestätigungs- und Annahme-E-Mails nutzen wir
            Brevo (ehemals Sendinblue), angeboten von Brevo SAS, 55 rue d'Amsterdam, 75008 Paris,
            Frankreich. Brevo ist ein EU-ansässiger Anbieter und verarbeitet deine E-Mail-Adresse
            sowie deinen Namen ausschließlich auf europäischen Servern — ein Drittlandtransfer
            findet nicht statt. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.{' '}
            <a
              href="https://www.brevo.com/de/legal/privacypolicy/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)' }}
            >
              Datenschutzerklärung von Brevo
            </a>
          </p>

          <h3 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>
            5b. Airtable (Bewerberdatenbank)
          </h3>
          <p>
            Deine Bewerbungsdaten werden in einer Airtable-Datenbank gespeichert. Airtable wird
            betrieben von Formagrid Inc. (Airtable), 799 Market Street, San Francisco, CA 94103,
            USA. Die Übermittlung in die USA erfolgt auf Grundlage der EU-Standardvertragsklauseln.
            Deine Daten werden nach Abschluss des Bewerbungsverfahrens, spätestens nach 12 Monaten,
            gelöscht. Auf Wunsch löschen wir deine Daten jederzeit vorzeitig —
            schreib uns an{' '}
            <a href="mailto:hallo@boogly.studio" style={{ color: 'var(--accent)' }}>
              hallo@boogly.studio
            </a>.{' '}
            <a
              href="https://www.airtable.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)' }}
            >
              Datenschutzerklärung von Airtable
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-3" style={{ color: 'var(--text)' }}>
            6. Rechtsgrundlage für die Bewerbungsverarbeitung
          </h2>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung eines Vertragsverhältnisses)
            sowie deine ausdrückliche Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO, die du durch
            Ankreuzen der Einwilligungserklärung im Formular erteilst. Du kannst deine Einwilligung
            jederzeit mit Wirkung für die Zukunft widerrufen.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-3" style={{ color: 'var(--text)' }}>
            7. Kontakt per E-Mail
          </h2>
          <p>
            Wenn du uns per E-Mail kontaktierst, werden deine Angaben zur Bearbeitung deiner
            Anfrage gespeichert. Diese Daten geben wir nicht ohne deine Einwilligung weiter.
            Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-3" style={{ color: 'var(--text)' }}>
            8. Externe Links / Social Media
          </h2>
          <p>
            Diese Website enthält Links zu YouTube (Google LLC), Instagram und TikTok. Beim Klick
            auf diese Links verlässt du unsere Website. Für die Datenverarbeitung auf den
            verlinkten Seiten sind die jeweiligen Anbieter verantwortlich.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-3" style={{ color: 'var(--text)' }}>
            9. Cookies & Tracking
          </h2>
          <p>
            Diese Website setzt keine Tracking-Cookies und verwendet keine Analytics-Dienste
            (kein Google Analytics, kein Retargeting).
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-3" style={{ color: 'var(--text)' }}>
            10. Deine Rechte
          </h2>
          <p>
            Du hast das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17),
            Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und
            Widerspruch (Art. 21 DSGVO). Wende dich dazu jederzeit an:{' '}
            <a href="mailto:hallo@boogly.studio" style={{ color: 'var(--accent)' }}>
              hallo@boogly.studio
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-3" style={{ color: 'var(--text)' }}>
            11. Beschwerderecht
          </h2>
          <p>
            Du hast das Recht, dich bei der zuständigen Datenschutz-Aufsichtsbehörde zu
            beschweren. In Baden-Württemberg ist das der Landesbeauftragte für den Datenschutz
            und die Informationsfreiheit (LfDI BW), Lautenschlagerstraße 20, 70173 Stuttgart,{' '}
            <a
              href="https://www.baden-wuerttemberg.datenschutz.de"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)' }}
            >
              www.baden-wuerttemberg.datenschutz.de
            </a>
          </p>
        </section>

      </div>
    </div>
  )
}
