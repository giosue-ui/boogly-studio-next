import type { Metadata } from 'next'
import { ContactForm } from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Schreib uns — für Kooperationen, Fragen oder Feedback.',
}

export default function KontaktPage() {
  return (
    <div className="container py-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Kontakt</p>
          <h1 className="font-display text-primary text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            Schreib uns.
          </h1>
          <p className="text-secondary text-xl max-w-xl">
            Für Kooperationen, Presse-Anfragen, Fragen oder Feedback — wir freuen uns über jede Nachricht.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* ── Form ── */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* ── Info ── */}
          <aside className="lg:col-span-2 space-y-6">
            <div className="bg-surface border border-border rounded-2xl p-6">
              <h3 className="text-primary font-bold text-base mb-4">Andere Wege</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-muted text-xs uppercase tracking-wider mb-1">Instagram</p>
                  <a
                    href="https://instagram.com/boogly.studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm font-medium hover:text-accent transition-colors"
                  >
                    @boogly.studio
                  </a>
                </div>
                <div>
                  <p className="text-muted text-xs uppercase tracking-wider mb-1">TikTok</p>
                  <a
                    href="https://tiktok.com/@boogly.studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm font-medium hover:text-accent transition-colors"
                  >
                    @boogly.studio
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6">
              <h3 className="text-primary font-bold text-base mb-3">Casting-Bewerbungen</h3>
              <p className="text-secondary text-sm leading-relaxed">
                Für Bewerbungen zu unseren Formaten bitte direkt über die jeweilige Event-Seite bewerben —
                nicht über dieses Formular.
              </p>
              <a
                href="/events"
                className="inline-block mt-4 text-accent text-sm font-medium hover:underline"
              >
                Aktuelle Castings ansehen →
              </a>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6">
              <h3 className="text-primary font-bold text-base mb-3">Antwortzeit</h3>
              <p className="text-secondary text-sm leading-relaxed">
                Wir antworten normalerweise innerhalb von 1–3 Werktagen.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
