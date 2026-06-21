/**
 * Airtable-Integration
 * Speichert Bewerbungen direkt über die Airtable REST API.
 * Kein SDK nötig — einfacher fetch-Aufruf.
 */

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!
const TABLE_NAME = process.env.AIRTABLE_BEWERBUNGEN_TABLE || 'Bewerbungen'

export type ApplicationData = {
  name: string
  email: string
  instagram: string
  tiktok?: string
  youtube?: string
  format: string
  bio: string
  motivation: string
  themen: string
  alter?: string
  ort?: string
  tel?: string
}

export async function saveApplication(data: ApplicationData): Promise<{ id: string }> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    throw new Error('Airtable-Konfiguration fehlt. Bitte AIRTABLE_API_KEY und AIRTABLE_BASE_ID setzen.')
  }

  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(TABLE_NAME)}`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        Name: data.name,
        'E-Mail': data.email,
        Instagram: data.instagram,
        TikTok: data.tiktok || '',
        YouTube: data.youtube || '',
        Format: data.format,
        Vorstellung: data.bio,
        Motivation: data.motivation,
        Themen: data.themen,
        Bewerbungsdatum: new Date().toISOString().split('T')[0],
        Status: 'Neu',
      },
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('[Airtable] Fehler beim Speichern:', error)
    throw new Error(`Airtable-Fehler: ${response.status}`)
  }

  const result = await response.json()
  return { id: result.id }
}
