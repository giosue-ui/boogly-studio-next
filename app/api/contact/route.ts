import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendContactNotification } from '@/lib/brevo'

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(5000),
  website: z.string().max(0).optional(), // Honeypot
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
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
      message: `Betreff: ${data.subject}\n\n${data.message}`,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[contact] Fehler:', error)
    return NextResponse.json({ error: 'Serverfehler.' }, { status: 500 })
  }
}
