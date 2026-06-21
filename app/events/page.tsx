import type { Metadata } from 'next'
import { getAllEvents } from '@/lib/sanity/queries'
import { EventCard } from '@/components/events/EventCard'

export const metadata: Metadata = {
  title: 'Events & Castings',
  description: 'Alle aktuellen und vergangenen Events und Castings von Boogly Studio.',
}

export default async function EventsPage() {
  const events = await getAllEvents()
  const active = events.filter((e) => e.status === 'active')
  const completed = events.filter((e) => e.status === 'completed')

  return (
    <div className="container py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
          Castings & Formate
        </p>
        <h1 className="text-primary text-4xl sm:text-5xl font-black mb-4">
          Alle Events
        </h1>
        <p className="text-secondary text-lg max-w-2xl">
          Entdecke unsere Formate und bewirb dich. Jede Stimme zählt.
        </p>
      </div>

      {/* Active Events */}
      {active.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-primary font-bold text-2xl">Aktuelle Castings</h2>
            <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-500/30">
              {active.length} offen
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {active.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* Completed Events */}
      {completed.length > 0 && (
        <section>
          <h2 className="text-primary font-bold text-2xl mb-6 flex items-center gap-3">
            Vergangene Events
            <span className="text-muted text-sm font-normal">({completed.length})</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-70">
            {completed.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {events.length === 0 && (
        <div className="text-center py-24">
          <p className="text-6xl mb-6">🎬</p>
          <h2 className="text-primary text-2xl font-bold mb-3">Noch keine Events</h2>
          <p className="text-secondary">Schau bald wieder rein – wir planen gerade Neues.</p>
        </div>
      )}
    </div>
  )
}
