import type { PortableTextBlock } from '@portabletext/react'

export type SanityImage = {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  alt?: string
}

export type EventStatus = 'active' | 'completed' | 'draft'

export type Event = {
  _id: string
  _createdAt: string
  _updatedAt: string
  title: string
  slug: { current: string }
  status: EventStatus
  shortDescription: string
  description?: PortableTextBlock[]
  coverImage?: SanityImage
  date?: string
  location?: string
  applicationDeadline?: string
  format: string
  requirements?: string
  themes?: string[]
  maxParticipants?: number
  seoTitle?: string
  seoDescription?: string
}

export type EventSummary = Pick<
  Event,
  | '_id'
  | 'title'
  | 'slug'
  | 'status'
  | 'shortDescription'
  | 'coverImage'
  | 'date'
  | 'location'
  | 'applicationDeadline'
  | 'format'
>

/* ──────────────────────────────────────────────────────────────
   Site Settings (Singleton) — Header, Footer, Navigation, Social
   ────────────────────────────────────────────────────────────── */
export type NavLink = { label: string; href: string }
export type NavItem = NavLink & { children?: NavLink[] }
export type FooterColumn = { title: string; links: NavLink[] }
export type SocialLink = { label: string; url: string }

export type SiteSettings = {
  brandName: string
  brandSuffix: string
  watchCtaLabel: string
  watchCtaUrl: string
  nav: NavItem[]
  footerTagline: string
  footerColumns: FooterColumn[]
  socials: SocialLink[]
  copyright: string
}

/* ──────────────────────────────────────────────────────────────
   Home Page (Singleton) — alle Startseiten-Sektionen
   ────────────────────────────────────────────────────────────── */
export type Stat = { value: string; label: string }
export type Step = { num: string; title: string; text: string }
export type CtaButton = { label: string; href: string }

export type FaqItem = {
  _id: string
  question: string
  answer?: PortableTextBlock[]
}

export type HomePage = {
  heroEyebrow?: string
  heroHeadline?: string
  heroText?: string
  heroPrimaryCta?: CtaButton
  heroSecondaryCta?: CtaButton
  tickerTopics?: string[]
  aboutEyebrow?: string
  aboutHeadline?: string
  aboutParagraphs?: string[]
  aboutStats?: Stat[]
  stepsEyebrow?: string
  stepsHeadline?: string
  steps?: Step[]
  ctaEyebrow?: string
  ctaHeadline?: string
  ctaText?: string
  ctaButton?: CtaButton
  faqEyebrow?: string
  faqHeadline?: string
  faqItems?: FaqItem[]
}

/* ──────────────────────────────────────────────────────────────
   Über uns + generische Seiten
   ────────────────────────────────────────────────────────────── */
export type AboutPage = {
  eyebrow?: string
  title?: string
  body?: PortableTextBlock[]
  image?: SanityImage
}

export type Page = {
  _id: string
  title: string
  slug: { current: string }
  body?: PortableTextBlock[]
  seoTitle?: string
  seoDescription?: string
}
