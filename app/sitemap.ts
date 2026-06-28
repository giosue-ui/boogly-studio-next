import type { MetadataRoute } from 'next'
import { getAllEventSlugs, getAllPageSlugs } from '@/lib/sanity/queries'

const BASE = 'https://www.boogly.studio'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticPaths = [
    '',
    '/events',
    '/ueber-uns',
    '/faq',
    '/kontakt',
    '/community',
    '/shop',
    '/offene-stellen',
    '/kooperationen',
    '/impressum',
    '/datenschutz',
  ]
  const entries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${BASE}${p}`,
    lastModified: now,
  }))

  try {
    const [events, pages] = await Promise.all([getAllEventSlugs(), getAllPageSlugs()])
    for (const e of events) entries.push({ url: `${BASE}/events/${e.slug}`, lastModified: now })
    for (const p of pages) entries.push({ url: `${BASE}/${p.slug}`, lastModified: now })
  } catch {
    // Sanity nicht erreichbar — statische Einträge genügen
  }

  return entries
}
