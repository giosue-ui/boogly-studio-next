import { groq } from 'next-sanity'
import { client } from './client'
import type { Event, EventSummary } from './types'

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

export async function getActiveEvents(): Promise<EventSummary[]> {
  try {
    return await client.fetch(
      groq`*[_type == "event" && status == "active"] | order(date asc) {
        ${EVENT_SUMMARY_FIELDS}
      }`,
      {},
      { next: { revalidate: 60 } }
    )
  } catch { return [] }
}

export async function getAllEvents(): Promise<EventSummary[]> {
  try {
    return await client.fetch(
      groq`*[_type == "event" && status != "draft"] | order(date desc) {
        ${EVENT_SUMMARY_FIELDS}
      }`,
      {},
      { next: { revalidate: 60 } }
    )
  } catch { return [] }
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  try {
    return await client.fetch(
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
  } catch { return null }
}

export async function getAllEventSlugs(): Promise<{ slug: string }[]> {
  try {
    const events = await client.fetch<{ slug: { current: string } }[]>(
      groq`*[_type == "event" && defined(slug.current)] { slug }`,
      {},
      { next: { revalidate: 3600 } }
    )
    return events.map((e) => ({ slug: e.slug.current }))
  } catch { return [] }
}

export async function getFeaturedEvents(): Promise<EventSummary[]> {
  try {
    return await client.fetch(
      groq`*[_type == "event" && status == "active"] | order(date asc)[0...3] {
        ${EVENT_SUMMARY_FIELDS}
      }`,
      {},
      { next: { revalidate: 60 } }
    )
  } catch { return [] }
}
