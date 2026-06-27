import { groq } from 'next-sanity'
import { client } from './client'
import type {
  Event,
  EventSummary,
  SiteSettings,
  HomePage,
  FaqItem,
  AboutPage,
  Page,
} from './types'

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

/* ──────────────────────────────────────────────────────────────
   Site Settings · Home · FAQ · About · generische Seiten
   Alle mit try/catch → null/[] als Fallback, damit Build & Seite
   auch ohne befülltes CMS funktionieren (Komponenten haben Defaults).
   ────────────────────────────────────────────────────────────── */

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await client.fetch(
      groq`*[_type == "siteSettings"][0]{
        brandName, brandSuffix, watchCtaLabel, watchCtaUrl,
        nav[]{ label, href, children[]{ label, href } },
        footerTagline,
        footerColumns[]{ title, links[]{ label, href } },
        socials[]{ label, url },
        copyright
      }`,
      {},
      { next: { revalidate: 60 } }
    )
  } catch { return null }
}

export async function getHomePage(): Promise<HomePage | null> {
  try {
    return await client.fetch(
      groq`*[_type == "homePage"][0]{
        heroEyebrow, heroHeadline, heroText,
        heroPrimaryCta{ label, href }, heroSecondaryCta{ label, href },
        tickerTopics,
        aboutEyebrow, aboutHeadline, aboutParagraphs,
        aboutStats[]{ value, label },
        stepsEyebrow, stepsHeadline,
        steps[]{ num, title, text },
        ctaEyebrow, ctaHeadline, ctaText, ctaButton{ label, href },
        faqEyebrow, faqHeadline,
        "faqItems": faqItems[]->{ _id, question, answer }
      }`,
      {},
      { next: { revalidate: 60 } }
    )
  } catch { return null }
}

export async function getFaqItems(): Promise<FaqItem[]> {
  try {
    return await client.fetch(
      groq`*[_type == "faqItem"] | order(order asc, _createdAt asc){ _id, question, answer }`,
      {},
      { next: { revalidate: 60 } }
    )
  } catch { return [] }
}

export async function getAboutPage(): Promise<AboutPage | null> {
  try {
    return await client.fetch(
      groq`*[_type == "aboutPage"][0]{
        eyebrow, title, body, image{ asset, hotspot, alt }
      }`,
      {},
      { next: { revalidate: 60 } }
    )
  } catch { return null }
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    return await client.fetch(
      groq`*[_type == "page" && slug.current == $slug][0]{
        _id, title, slug, body, seoTitle, seoDescription
      }`,
      { slug },
      { next: { revalidate: 60 } }
    )
  } catch { return null }
}

export async function getAllPageSlugs(): Promise<{ slug: string }[]> {
  try {
    const pages = await client.fetch<{ slug: { current: string } }[]>(
      groq`*[_type == "page" && defined(slug.current)]{ slug }`,
      {},
      { next: { revalidate: 3600 } }
    )
    return pages.map((p) => ({ slug: p.slug.current }))
  } catch { return [] }
}
