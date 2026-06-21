import { createClient } from 'next-sanity'

// Sanitize projectId: must be lowercase a-z, 0-9, dashes only
const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const projectId = /^[a-z0-9-]+$/.test(rawProjectId) ? rawProjectId : 'placeholder'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-06-01',
  useCdn: true,
})

/**
 * Client ohne CDN — für Live-Preview oder wenn immer frische Daten nötig sind.
 */
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-06-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})
