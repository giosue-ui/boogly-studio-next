import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendContactNotification } from '@/lib/brevo'

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10).max(5000),
  website: z.string().max(0).optional(), // Honeypot
})

// ─── Rate Limiting (einfach, in-memory) ───────────────────────────────────────
const submissionTimestamps = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 Minuten
  const maxRequests = 5
  const timestamps = (submissionTimestamps.get(ip) || []).filter((ts) => now - ts < windowMs)
  if (timestamps.length >= maxRequests) return true
  timestamps.push(now)
  submissionTimestamps.set(ip, timestamps)
  return false
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Zu viele Anfragen. Bitte warte kurz.' }, { status: 429 })
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Ungültiges JSON.' }, { status: 400 })
    }
    const result = ContactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0]?.message || 'Validierungsfehler' },
        { status: 400 }
      )
    }

    const data = result.data

    if (data.website) {
      return NextResponse.json({ ok: true })
    }

    await sendContactNotification({
      name: data.name,
      email: data.email,
      message: data.subject ? `Betreff: ${data.subject}\n\n${data.message}` : data.message,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[contact] Fehler:', error)
    return NextResponse.json({ error: 'Serverfehler.' }, { status: 500 })
  }
}
