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
