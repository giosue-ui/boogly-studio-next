import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { saveApplication } from '@/lib/airtable'
import { sendApplicationConfirmation, sendApplicationNotification } from '@/lib/brevo'

// ─── Validierungsschema ────────────────────────────────────────────────────────
const ApplySchema = z.object({
  // Pflichtfelder
  name: z.string().min(2, 'Name ist zu kurz').max(100),
  email: z.string().email('Ungültige E-Mail-Adresse'),
  instagram: z.string().min(1, 'Instagram-Handle ist Pflicht'),
  format: z.string().min(1, 'Format/Event ist Pflicht'),
  eventTitle: z.string().min(1, 'Event-Titel ist Pflicht'),
  bio: z.string().min(20, 'Vorstellung ist zu kurz (min. 20 Zeichen)').max(2000),
  motivation: z.string().min(20, 'Motivation ist zu kurz (min. 20 Zeichen)').max(2000),
  themen: z.string().min(1, 'Bitte mindestens ein Thema auswählen'),

  // Optionale Felder
  tiktok: z.string().optional(),
  youtube: z.string().url('Ungültige YouTube-URL').optional().or(z.literal('')),

  // Honeypot (Spam-Schutz)
  website: z.string().max(0, 'Bot erkannt').optional(),
})

// ─── Rate Limiting (einfach, in-memory) ───────────────────────────────────────
const submissionTimestamps = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 Minuten
  const maxRequests = 3

  const timestamps = (submissionTimestamps.get(ip) || []).filter(
    (ts) => now - ts < windowMs
  )

  if (timestamps.length >= maxRequests) return true

  timestamps.push(now)
  submissionTimestamps.set(ip, timestamps)
  return false
}

// ─── Handler ──────────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  // CORS Preflight
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200 })
  }

  try {
    // Rate Limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Zu viele Anfragen. Bitte warte 15 Minuten.' },
        { status: 429 }
      )
    }

    // Body parsen
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Ungültiges JSON.' }, { status: 400 })
    }

    // Validierung
    const result = ApplySchema.safeParse(body)
    if (!result.success) {
      const firstError = result.error.errors[0]?.message || 'Validierungsfehler'
      return NextResponse.json({ error: firstError }, { status: 400 })
    }

    const data = result.data

    // Honeypot check
    if (data.website) {
      // Stille Antwort an Bots
      return NextResponse.json({ ok: true })
    }

    // 1. In Airtable speichern (nicht blockierend — E-Mails werden trotzdem gesendet)
    saveApplication({
      name: data.name,
      email: data.email,
      instagram: data.instagram,
      tiktok: data.tiktok,
      youtube: data.youtube,
      format: data.format,
      bio: data.bio,
      motivation: data.motivation,
      themen: data.themen,
    }).catch((err) => console.error('[apply] Airtable-Fehler:', err))

    // 2. Bestätigungs-E-Mail an Bewerber
    await sendApplicationConfirmation({
      name: data.name,
      email: data.email,
      eventTitle: data.eventTitle,
      format: data.format,
    }).catch((err) => console.error('[apply] Bestätigungsmail fehlgeschlagen:', err))

    // 3. Benachrichtigung an Boogly Studio
    await sendApplicationNotification({
      applicantName: data.name,
      applicantEmail: data.email,
      eventTitle: data.eventTitle,
      format: data.format,
    }).catch((err) => console.error('[apply] Benachrichtigungsmail fehlgeschlagen:', err))

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[apply] Unerwarteter Fehler:', error)
    return NextResponse.json(
      { error: 'Serverfehler. Bitte versuche es erneut.' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200 })
}
