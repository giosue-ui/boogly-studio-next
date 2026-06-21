import Link from 'next/link'
import type { Metadata } from 'next'
import { getFeaturedEvents } from '@/lib/sanity/queries'
import { EventCard } from '@/components/events/EventCard'

export const metadata: Metadata = {
  title: 'Boogly Studio – Echte Menschen. Echte Begegnungen.',
}

const THEMEN = [
  'Politik & Gesellschaft',
  'Dating & Beziehungen',
  'Geld & Karriere',
  'Glaube & Werte',
  'Ernährung & Lifestyle',
  'Feminismus & Gleichberechtigung',
  'Migration & Identität',
  'Generation & Alter',
  'Bildung & Zukunft',
]

export default async function HomePage() {
  const featuredEvents = await getFeaturedEvents()

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: 'var(--black)' }}>
        <div className="container relative pt-28 pb-24 sm:pt-36 sm:pb-32">
          <div className="max-w-4xl">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-sm font-medium"
              style={{
                background: 'var(--accent-bg)',
                border: '1px solid var(--accent-border)',
                color: 'var(--accent)',
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
              Neu in Deutschland
            </div>

            <h1
              className="text-5xl sm:text-7xl font-black leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: '"Space Grotesk", sans-serif', color: 'var(--text)' }}
            >
              Echte Menschen.<br />
              <span style={{ color: 'var(--accent)' }}>Echte Begegnungen.</span>
            </h1>

            <p className="text-xl leading-relaxed max-w-2xl mb-10" style={{ color: 'var(--muted)' }}>
              Boogly Studio lässt die unterschiedlichsten Menschen aufeinandertreffen –
              ungefiltert, ungeschönt und immer nah am echten Leben.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
                style={{ background: 'var(--accent)', color: '#0c0c0c' }}
              >
                Jetzt bewerben
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
                style={{
                  border: '1px solid var(--border-hover)',
                  color: 'var(--text)',
                  background: 'transparent',
                }}
              >
                Formate entdecken
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee ──────────────────────────────────────────────────────── */}
      <div
        className="border-y py-4 overflow-hidden"
        style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
      >
        <p className="text-sm" style={{ color: 'var(--muted)', textAlign: 'center', letterSpacing: '0.05em' }}>
          {[...THEMEN, ...THEMEN].join('  ·  ')}
        </p>
      </div>

      {/* ── Featured Events ───────────────────────────────────────────────── */}
      <section className="container py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: 'var(--accent)' }}
            >
              Aktuelle Castings
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: '"Space Grotesk", sans-serif', color: 'var(--text)' }}
            >
              Jetzt bewerben
            </h2>
          </div>
          <Link
            href="/events"
            className="hidden sm:flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
            style={{ color: 'var(--muted)' }}
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
          <div
            className="rounded-2xl p-12 text-center"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <p className="text-4xl mb-4">🎬</p>
            <p style={{ color: 'var(--muted)' }}>Gerade keine aktiven Castings. Schau bald wieder rein!</p>
          </div>
        )}
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="py-24 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="container">
          <div className="text-center mb-16">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: 'var(--accent)' }}
            >
              So läuft es ab
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: '"Space Grotesk", sans-serif', color: 'var(--text)' }}
            >
              Dein Weg ins Format
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Casting entdecken', desc: 'Schau dir unsere aktuellen Formate an und finde das, das zu dir passt.' },
              { step: '02', title: 'Bewerben', desc: 'Füll das Formular aus und zeig uns, wer du bist. Keine Scheu – wir wollen dich kennenlernen.' },
              { step: '03', title: 'Dabei sein', desc: "Wenn wir denken, dass du zum Format passt, melden wir uns. Dann geht's los." },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl p-6"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <span
                  className="text-4xl font-black"
                  style={{ color: 'var(--accent)', opacity: 0.6, fontFamily: '"Space Grotesk", sans-serif' }}
                >
                  {item.step}
                </span>
                <h3 className="font-bold text-lg mt-3 mb-2" style={{ color: 'var(--text)' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="container pb-24">
        <div
          className="rounded-3xl p-12 text-center"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: '"Space Grotesk", sans-serif', color: 'var(--text)' }}
          >
            Bereit, deine Geschichte zu erzählen?
          </h2>
          <p className="text-lg max-w-xl mx-auto mb-8" style={{ color: 'var(--muted)' }}>
            Kein Casting, keine Perfektion — nur echte Persönlichkeit.
          </p>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent)', color: '#0c0c0c' }}
          >
            Alle Castings ansehen →
          </Link>
        </div>
      </section>
    </>
  )
}
