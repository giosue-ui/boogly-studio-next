import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-06-01',
  useCdn: true, // Für öffentliche Read-Anfragen — schnell & gecacht
})

/**
 * Client ohne CDN — für Live-Preview oder wenn immer frische Daten nötig sind.
 */
export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-06-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})
