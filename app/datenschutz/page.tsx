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

      <h1 className="font-display text-3xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
        Datenschutzerklärung
      </h1>
      <p className="text-xs mb-10" style={{ color: 'var(--dim)' }}>
        Stand: Juni 2026
      </p>

      <div className="space-y-10 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
        <Section title="1. Verantwortlicher">
          <p>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            <br />
            <br />
            Giosuele Visalli
            <br />
            Birkenwaldstraße 27
            <br />
            70191 Stuttgart, Deutschland
            <br />
            E-Mail: <Mail />
          </p>
        </Section>

        <Section title="2. Hosting (Vercel)">
          <p>
            Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA gehostet.
            Beim Aufruf werden automatisch technische Daten in Server-Logfiles verarbeitet: IP-Adresse,
            Datum und Uhrzeit des Zugriffs, aufgerufene Seite, übertragene Datenmenge, Browser-Typ und
            Betriebssystem. Diese Verarbeitung ist für den sicheren und stabilen Betrieb technisch
            erforderlich. Logfiles werden in der Regel nach kurzer Zeit automatisch gelöscht.
            Die Übermittlung in die USA stützt sich auf die EU-Standardvertragsklauseln
            (Art. 46 Abs. 2 lit. c DSGVO). Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
            Interesse an einem funktionsfähigen Webauftritt).
          </p>
        </Section>

        <Section title="3. Verschlüsselung (TLS/SSL)">
          <p>
            Diese Website nutzt aus Sicherheitsgründen eine TLS-/SSL-Verschlüsselung (erkennbar an
            „https://" in der Adresszeile). Dadurch sind die zwischen deinem Browser und unserem Server
            übertragenen Daten für Dritte nicht mitlesbar.
          </p>
        </Section>

        <Section title="4. Schriftarten (selbst gehostet)">
          <p>
            Die auf dieser Website verwendeten Schriftarten werden <strong>lokal von unserem eigenen
            Server</strong> ausgeliefert (Self-Hosting). Es findet <strong>keine Verbindung zu Google
            Fonts</strong> oder anderen externen Anbietern statt, und es wird <strong>keine IP-Adresse
            an Dritte übertragen</strong>.
          </p>
        </Section>

        <Section title="5. Inhalte & CMS (Sanity)">
          <p>
            Die redaktionellen Inhalte dieser Website (z. B. Castings, Events, Texte, Bilder) werden mit
            dem Content-Management-System Sanity verwaltet, betrieben von Sanity AS, Strandveien 43,
            1366 Lysaker, Norwegen. Beim Laden von Bildern stellt dein Browser eine Verbindung zum
            Sanity-Content-Netzwerk (cdn.sanity.io) her, wobei deine IP-Adresse übertragen wird. Eine
            Verarbeitung kann auch auf Servern außerhalb der EU (u. a. USA) erfolgen; in diesem Fall
            stützt sie sich auf die EU-Standardvertragsklauseln. Rechtsgrundlage: Art. 6 Abs. 1 lit. f
            DSGVO (berechtigtes Interesse an der Bereitstellung der Inhalte).{' '}
            <Ext href="https://www.sanity.io/legal/privacy">Datenschutzerklärung von Sanity</Ext>
          </p>
        </Section>

        <Section title="6. Bewerbungsformular">
          <p className="mb-3">
            Wenn du dich über das Bewerbungsformular bewirbst, erheben wir: Vor- und Nachname,
            E-Mail-Adresse, Social-Media-Profile (Instagram, optional TikTok/YouTube), das gewählte
            Format/Event, ausgewählte Themen sowie deine Freitexte (Vorstellung, Motivation). Diese
            Daten nutzen wir ausschließlich zur Prüfung und Bearbeitung deiner Bewerbung.
          </p>
          <p className="mb-3">
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung/Durchführung eines
            (vor-)vertraglichen Verhältnisses) sowie deine Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO,
            die du durch Ankreuzen der Einwilligungs-Checkbox im Formular erteilst. Du kannst deine
            Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen (E-Mail an <Mail />).
          </p>
          <p>
            Deine Bewerbungsdaten werden nach Abschluss des jeweiligen Bewerbungsverfahrens, spätestens
            jedoch nach 12 Monaten, gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten
            entgegenstehen oder du einer längeren Speicherung zustimmst.
          </p>
        </Section>

        <Section title="7. Kontaktformular & Kontakt per E-Mail">
          <p>
            Wenn du uns über das Kontaktformular oder per E-Mail kontaktierst, verarbeiten wir die von
            dir gemachten Angaben (Name, E-Mail-Adresse, Nachricht) zur Bearbeitung deiner Anfrage. Die
            Daten werden über unseren E-Mail-Dienstleister Brevo (siehe Ziff. 8) an uns zugestellt.
            Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (bei vertragsbezogenen Anfragen) bzw.
            Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung). Wir speichern diese
            Daten, bis die Anfrage abschließend bearbeitet ist und keine gesetzlichen
            Aufbewahrungspflichten entgegenstehen.
          </p>
        </Section>

        <Section title="8. E-Mail-Versand (Brevo)">
          <p>
            Für den Versand von Bestätigungs- und Benachrichtigungs-E-Mails nutzen wir Brevo, angeboten
            von Brevo SAS, 106 boulevard Haussmann, 75008 Paris, Frankreich. Brevo verarbeitet die für
            den Versand erforderlichen Daten (insb. Name und E-Mail-Adresse) auf Servern innerhalb der
            EU. Rechtsgrundlage: Art. 6 Abs. 1 lit. b und lit. f DSGVO.{' '}
            <Ext href="https://www.brevo.com/de/legal/privacypolicy/">Datenschutzerklärung von Brevo</Ext>
          </p>
        </Section>

        <Section title="9. Bewerberdatenbank (Airtable)">
          <p>
            Eingegangene Bewerbungen speichern wir in einer Airtable-Datenbank. Airtable wird betrieben
            von Formagrid Inc. (Airtable), 799 Market Street, San Francisco, CA 94103, USA. Die
            Übermittlung in die USA stützt sich auf die EU-Standardvertragsklauseln. Rechtsgrundlage:
            Art. 6 Abs. 1 lit. b und lit. a DSGVO.{' '}
            <Ext href="https://www.airtable.com/company/privacy">Datenschutzerklärung von Airtable</Ext>
          </p>
        </Section>

        <Section title="10. Verwaltungsbereich (Studio)">
          <p>
            Der nicht-öffentliche Verwaltungsbereich (/studio) ist nur für autorisierte Redakteure nach
            Anmeldung zugänglich und setzt hierfür technisch notwendige Funktions-Cookies bzw. lokalen
            Speicher. Für normale Besucher der Website werden dort keine Daten verarbeitet.
          </p>
        </Section>

        <Section title="11. Externe Links / Social Media">
          <p>
            Diese Website enthält Verlinkungen zu YouTube (Google Ireland Ltd.), Instagram und TikTok.
            Es werden <strong>keine Inhalte dieser Dienste eingebettet</strong> – es handelt sich um
            einfache Links. Erst beim Klick verlässt du unsere Website; ab dann sind die jeweiligen
            Anbieter für die Datenverarbeitung verantwortlich.
          </p>
        </Section>

        <Section title="12. Cookies & Tracking">
          <p>
            Diese Website setzt <strong>keine</strong> Tracking- oder Marketing-Cookies und verwendet
            <strong> keine</strong> Analyse-Dienste (kein Google Analytics, kein Retargeting). Es findet
            kein Profiling und keine automatisierte Entscheidungsfindung statt.
          </p>
        </Section>

        <Section title="13. Deine Rechte">
          <p>
            Du hast jederzeit das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung
            (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie
            Widerspruch gegen die Verarbeitung (Art. 21 DSGVO). Erteilte Einwilligungen kannst du
            jederzeit mit Wirkung für die Zukunft widerrufen. Wende dich dazu an <Mail />.
          </p>
        </Section>

        <Section title="14. Beschwerderecht">
          <p>
            Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig ist
            der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg
            (LfDI BW), Lautenschlagerstraße 20, 70173 Stuttgart.{' '}
            <Ext href="https://www.baden-wuerttemberg.datenschutz.de">www.baden-wuerttemberg.datenschutz.de</Ext>
          </p>
        </Section>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display font-bold text-base mb-3" style={{ color: 'var(--text)' }}>
        {title}
      </h2>
      {children}
    </section>
  )
}

function Mail() {
  return (
    <a href="mailto:hallo@boogly.studio" style={{ color: 'var(--blue)' }}>
      hallo@boogly.studio
    </a>
  )
}

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)' }}>
      {children}
    </a>
  )
}
