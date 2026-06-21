import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/lib/sanity/client'
import type { EventSummary } from '@/lib/sanity/types'

const builder = imageUrlBuilder(client)

function urlFor(source: EventSummary['coverImage']) {
  return builder.image(source as object)
}

function isDeadlineSoon(deadline?: string): boolean {
  if (!deadline) return false
  const days = (new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  return days > 0 && days <= 7
}

export function EventCard({ event }: { event: EventSummary }) {
  const deadlineSoon = isDeadlineSoon(event.applicationDeadline)

  return (
    <Link
      href={`/events/${event.slug.current}`}
      className="group block bg-surface border border-border rounded-2xl overflow-hidden
                 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5
                 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-video bg-surface-2 overflow-hidden">
        {event.coverImage ? (
          <Image
            src={urlFor(event.coverImage).width(600).height(338).url()}
            alt={event.coverImage.alt || event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl opacity-20">🎬</span>
          </div>
        )}
        {/* Status badge */}
        <div className="absolute top-3 left-3">
          {event.status === 'active' ? (
            <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-semibold px-2.5 py-1 rounded-full">
              ● Offen
            </span>
          ) : (
            <span className="bg-zinc-800/80 text-zinc-400 text-xs font-semibold px-2.5 py-1 rounded-full">
              Abgeschlossen
            </span>
          )}
        </div>
        {deadlineSoon && (
          <div className="absolute top-3 right-3">
            <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-semibold px-2.5 py-1 rounded-full">
              ⏰ Frist bald
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-2">
          {event.format}
        </p>
        <h3 className="text-primary font-bold text-lg leading-tight mb-3 group-hover:text-accent transition-colors">
          {event.title}
        </h3>
        <p className="text-secondary text-sm leading-relaxed line-clamp-2 mb-4">
          {event.shortDescription}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 text-xs text-muted">
          {event.date && (
            <span className="flex items-center gap-1">
              📅 {format(new Date(event.date), 'd. MMMM yyyy', { locale: de })}
            </span>
          )}
          {event.location && (
            <span className="flex items-center gap-1">
              📍 {event.location}
            </span>
          )}
          {event.applicationDeadline && (
            <span className={`flex items-center gap-1 ${deadlineSoon ? 'text-orange-400' : ''}`}>
              ⏳ bis {format(new Date(event.applicationDeadline), 'd.M.yyyy', { locale: de })}
            </span>
          )}
        </div>
      </div>

      {/* Footer CTA */}
      {event.status === 'active' && (
        <div className="px-5 pb-5">
          <div className="border-t border-border pt-4">
            <span className="text-accent text-sm font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">
              Jetzt bewerben
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      )}
    </Link>
  )
}
