import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/lib/sanity/client'
import { getEventBySlug, getAllEventSlugs } from '@/lib/sanity/queries'
import { ApplicationForm } from '@/components/forms/ApplicationForm'
import { Button } from '@/components/ui/Button'

const builder = imageUrlBuilder(client)

// ─── Static params ────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  try {
    const slugs = await getAllEventSlugs()
    return slugs.map(({ slug }) => ({ slug }))
  } catch {
    return []
  }
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const event = await getEventBySlug(params.slug)
  if (!event) return { title: 'Event nicht gefunden' }

  return {
    title: event.seoTitle || event.title,
    description: event.seoDescription || event.shortDescription,
    openGraph: {
      images: event.coverImage
        ? [builder.image(event.coverImage as object).width(1200).height(630).url()]
        : [],
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function EventDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const event = await getEventBySlug(params.slug)
  if (!event) notFound()

  const isActive = event.status === 'active'
  const deadline = event.applicationDeadline ? new Date(event.applicationDeadline) : null
  const deadlinePassed = deadline ? deadline < new Date() : false

  return (
    <div className="container py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted mb-8">
        <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/events" className="hover:text-secondary transition-colors">Events</Link>
        <span>/</span>
        <span className="text-secondary truncate max-w-xs">{event.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* ── Main content ── */}
        <div className="lg:col-span-2">
          {/* Cover image */}
          {event.coverImage && (
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 bg-surface">
              <Image
                src={builder.image(event.coverImage as object).width(1200).height(675).url()}
                alt={event.coverImage.alt || event.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Title */}
          <div className="mb-8">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              {event.format}
            </p>
            <h1 className="font-display text-primary text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
              {event.title}
            </h1>
            <p className="text-secondary text-xl leading-relaxed">
              {event.shortDescription}
            </p>
          </div>

          {/* Description */}
          {event.description && (
            <div className="prose-boogly mb-10">
              <PortableText value={event.description} />
            </div>
          )}

          {/* Requirements */}
          {event.requirements && (
            <div className="bg-surface border border-border rounded-2xl p-6 mb-10">
              <h3 className="text-primary font-bold text-lg mb-3">Was wir suchen</h3>
              <p className="text-secondary text-sm leading-relaxed whitespace-pre-line">
                {event.requirements}
              </p>
            </div>
          )}

          {/* ── Application form ── */}
          {isActive && !deadlinePassed ? (
            <div id="bewerbung" className="border-t border-border pt-10 scroll-mt-24">
              <h2 className="font-display text-primary text-3xl font-bold mb-2">Bewirb dich jetzt</h2>
              <p className="text-secondary mb-8">
                Füll das Formular aus und zeig uns, wer du bist. Wir lesen jede Bewerbung persönlich.
              </p>
              <ApplicationForm
                eventTitle={event.title}
                format={event.format}
                themes={event.themes}
              />
            </div>
          ) : (
            <div className="bg-surface border border-border rounded-2xl p-8 text-center">
              <p className="text-4xl mb-3">🔒</p>
              <h3 className="text-primary font-bold text-xl mb-2">
                {deadlinePassed ? 'Bewerbungsfrist abgelaufen' : 'Casting abgeschlossen'}
              </h3>
              <p className="text-secondary mb-6">
                Für dieses Format werden keine Bewerbungen mehr angenommen.
              </p>
              <Button href="/events" variant="secondary">
                Andere Events ansehen
              </Button>
            </div>
          )}
        </div>

        {/* ── Sidebar ── */}
        <aside className="space-y-4">
          <div className="bg-surface border border-border rounded-2xl p-6 sticky top-24">
            <h3 className="text-primary font-bold text-base mb-5">Event-Details</h3>

            <dl className="space-y-4">
              <div>
                <dt className="text-muted text-xs uppercase tracking-wider mb-1">Status</dt>
                <dd>
                  {isActive ? (
                    <span className="inline-flex items-center gap-1.5 text-green-400 text-sm font-semibold">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Bewerbungen offen
                    </span>
                  ) : (
                    <span className="text-muted text-sm">Abgeschlossen</span>
                  )}
                </dd>
              </div>

              {event.date && (
                <div>
                  <dt className="text-muted text-xs uppercase tracking-wider mb-1">Datum</dt>
                  <dd className="text-primary text-sm font-medium">
                    {format(new Date(event.date), "d. MMMM yyyy, HH:mm 'Uhr'", { locale: de })}
                  </dd>
                </div>
              )}

              {event.location && (
                <div>
                  <dt className="text-muted text-xs uppercase tracking-wider mb-1">Ort</dt>
                  <dd className="text-primary text-sm font-medium">{event.location}</dd>
                </div>
              )}

              {deadline && (
                <div>
                  <dt className="text-muted text-xs uppercase tracking-wider mb-1">Bewerbungsfrist</dt>
                  <dd className={`text-sm font-medium ${deadlinePassed ? 'text-muted line-through' : 'text-primary'}`}>
                    {format(deadline, "d. MMMM yyyy", { locale: de })}
                  </dd>
                </div>
              )}

              {event.format && (
                <div>
                  <dt className="text-muted text-xs uppercase tracking-wider mb-1">Format</dt>
                  <dd className="text-primary text-sm font-medium">{event.format}</dd>
                </div>
              )}
            </dl>

            {isActive && !deadlinePassed && (
              <div className="mt-6 pt-6 border-t border-border">
                <a
                  href="#bewerbung"
                  className="block w-full bg-[#1A1A18] hover:bg-black text-[#F2EEE4] text-sm font-semibold py-3 rounded-xl text-center transition-colors"
                >
                  Jetzt bewerben ↓
                </a>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
