import Link from 'next/link'
import type { Metadata } from 'next'
import { getFeaturedEvents } from '@/lib/sanity/queries'
import { EventCard } from '@/components/events/EventCard'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Boogly Studio – Echte Menschen. Echte Begegnungen.',
}

export default async function HomePage() {
  const featuredEvents = await getFeaturedEvents()

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Gradient blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative pt-24 pb-20 sm:pt-32 sm:pb-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-accent-subtle border border-accent/20 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-accent text-sm font-medium">Neue Castings offen</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-black leading-[1.05] tracking-tight mb-6">
              Echte{' '}
              <span className="text-gradient">Menschen</span>
              .<br />
              Echte{' '}
              <span className="text-gradient">Begegnungen</span>.
            </h1>

            <p className="text-secondary text-xl leading-relaxed max-w-2xl mb-10">
              Boogly Studio produziert authentische Social-Video-Formate, die bewegen.
              Werde Teil unserer Community und bring deine echte Persönlichkeit auf den Bildschirm.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button href="/events" size="lg">
                Aktuelle Castings entdecken →
              </Button>
              <Button href="/ueber-uns" variant="secondary" size="lg">
                Was ist Boogly Studio?
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Events ───────────────────────────────────────────────── */}
      <section className="container pb-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">
              Aktuelle Castings
            </p>
            <h2 className="text-primary text-3xl sm:text-4xl font-bold">
              Jetzt bewerben
            </h2>
          </div>
          <Link
            href="/events"
            className="hidden sm:flex items-center gap-2 text-secondary hover:text-primary text-sm font-medium transition-colors"
          >
            Alle Events
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {featuredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="bg-surface border border-border rounded-2xl p-12 text-center">
            <p className="text-4xl mb-4">🎬</p>
            <p className="text-secondary">Gerade keine aktiven Castings. Schau bald wieder rein!</p>
          </div>
        )}
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="border-t border-border py-24">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">So läuft es ab</p>
            <h2 className="text-primary text-3xl sm:text-4xl font-bold">Dein Weg ins Format</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Casting entdecken',
                desc: 'Schau dir unsere aktuellen Formate an und finde das, das zu dir passt.',
              },
              {
                step: '02',
                title: 'Bewerben',
                desc: 'Füll das Formular aus und zeig uns, wer du bist. Keine Scheu – wir wollen dich kennenlernen.',
              },
              {
                step: '03',
                title: 'Dabei sein',
                desc: 'Wenn wir denken, dass du zum Format passt, melden wir uns. Dann geht\'s los.',
              },
            ].map((item) => (
              <div key={item.step} className="bg-surface border border-border rounded-2xl p-6">
                <span className="text-accent text-4xl font-black opacity-60">{item.step}</span>
                <h3 className="text-primary font-bold text-lg mt-3 mb-2">{item.title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="container pb-24">
        <div className="bg-gradient-to-br from-accent/10 to-amber-500/5 border border-accent/20 rounded-3xl p-12 text-center">
          <h2 className="text-primary text-3xl sm:text-4xl font-bold mb-4">
            Bereit, deine Geschichte zu erzählen?
          </h2>
          <p className="text-secondary text-lg max-w-xl mx-auto mb-8">
            Kein Casting, keine Perfektion — nur echte Persönlichkeit.
          </p>
          <Button href="/events" size="lg">
            Alle Castings ansehen →
          </Button>
        </div>
      </section>
    </>
  )
}
