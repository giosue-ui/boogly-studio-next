import { groq } from 'next-sanity'
import { client } from './client'
import type { Event, EventSummary } from './types'

// ─── Felder für Übersichtslisten ──────────────────────────────────────────────
const EVENT_SUMMARY_FIELDS = groq`
  _id,
  title,
  slug,
  status,
  shortDescription,
  coverImage { asset, hotspot, alt },
  date,
  location,
  applicationDeadline,
  format
`

// ─── Alle aktiven Events (für Homepage & Events-Seite) ────────────────────────
export async function getActiveEvents(): Promise<EventSummary[]> {
  return client.fetch(
    groq`*[_type == "event" && status == "active"] | order(date asc) {
      ${EVENT_SUMMARY_FIELDS}
    }`,
    {},
    { next: { revalidate: 60 } } // ISR: alle 60 Sekunden neu laden
  )
}

// ─── Alle Events (für Events-Übersichtsseite) ─────────────────────────────────
export async function getAllEvents(): Promise<EventSummary[]> {
  return client.fetch(
    groq`*[_type == "event" && status != "draft"] | order(date desc) {
      ${EVENT_SUMMARY_FIELDS}
    }`,
    {},
    { next: { revalidate: 60 } }
  )
}

// ─── Ein einzelnes Event per Slug ─────────────────────────────────────────────
export async function getEventBySlug(slug: string): Promise<Event | null> {
  return client.fetch(
    groq`*[_type == "event" && slug.current == $slug][0] {
      _id,
      _updatedAt,
      title,
      slug,
      status,
      shortDescription,
      description,
      coverImage { asset, hotspot, alt },
      date,
      location,
      applicationDeadline,
      format,
      requirements,
      themes,
      maxParticipants,
      seoTitle,
      seoDescription
    }`,
    { slug },
    { next: { revalidate: 60 } }
  )
}

// ─── Slugs aller Events (für generateStaticParams) ────────────────────────────
export async function getAllEventSlugs(): Promise<{ slug: string }[]> {
  const events = await client.fetch<{ slug: { current: string } }[]>(
    groq`*[_type == "event" && defined(slug.current)] { slug }`,
    {},
    { next: { revalidate: 3600 } }
  )
  return events.map((e) => ({ slug: e.slug.current }))
}

// ─── Featured Events (max. 3, nur aktive) ─────────────────────────────────────
export async function getFeaturedEvents(): Promise<EventSummary[]> {
  return client.fetch(
    groq`*[_type == "event" && status == "active"] | order(date asc)[0...3] {
      ${EVENT_SUMMARY_FIELDS}
    }`,
    {},
    { next: { revalidate: 60 } }
  )
}
