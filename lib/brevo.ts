/**
 * Brevo (ehem. Sendinblue) E-Mail-Integration
 * Sendet Transaktions-E-Mails øber Brevo Templates.
 */

const BREVO_API_KEY = process.env.BREVO_API_KEY!
const BREVO_URL = 'https://api.brevo.com/v3/smtp/email'

/**
 * Escaped Nutzereingaben für die HTML-E-Mails (Schutz vor HTML-/Script-Injection).
 */
function esc(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

async function sendBrevoEmail(payload: object): Promise<void> {
  if (!BREVO_API_KEY) {
    console.warn('[Brevo] API-Key fehlt — E-Mail wird nicht gesendet.')
    return
  }

  const response = await fetch(BREVO_URL, {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('[Brevo] E-Mail-Fehler:', error)
    // Nicht werfen — E-Mail-Fehler soll Bewerbung nicht blockieren
  }
}

/**
 * Sendet die Bestätigungs-E-Mail an den Bewerber.
 * Nutzt Template ID aus BREVO_CONFIRMATION_TEMPLATE_ID.
 */
export async function sendApplicationConfirmation(params: {
  name: string
  email: string
  eventTitle: string
  format: string
}): Promise<void> {
  const templateId = parseInt(process.env.BREVO_CONFIRMATION_TEMPLATE_ID || '1', 10)

  await sendBrevoEmail({
    templateId,
    to: [{ name: params.name, email: params.email }],
    replyTo: { name: 'Boogly Studio', email: 'hallo@boogly.studio' },
    params: {
      name: params.name,
      eventTitle: params.eventTitle,
      format: params.format,
      email: params.email,
    },
  })
}

/**
 * Sendet eine Benachrichtigung an Boogly Studio bei neuer Bewerbung.
 * Nutzt einfaches HTML-E-Mail (kein Template nötig).
 */
export async function sendApplicationNotification(params: {
  applicantName: string
  applicantEmail: string
  eventTitle: string
  format: string
}): Promise<void> {
  const notificationEmail = process.env.BREVO_NOTIFICATION_EMAIL || 'hallo@boogly.studio'

  await sendBrevoEmail({
    sender: { name: 'Boogly Studio', email: 'hallo@boogly.studio' },
    to: [{ name: 'Boogly Studio', email: notificationEmail }],
    replyTo: { name: params.applicantName, email: params.applicantEmail },
    subject: `🎬 Neue Bewerbung: ${params.applicantName} – ${params.eventTitle}`,
    htmlContent: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #fb4d26; background: #1a1a18; padding: 16px; border-radius: 8px;">
          Neue Bewerbung eingegangen
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${esc(params.applicantName)}</td></tr>
          <tr style="background: #f5f5f5;"><td style="padding: 8px; font-weight: bold;">E-Mail:</td><td style="padding: 8px;"><a href="mailto:${esc(params.applicantEmail)}">${esc(params.applicantEmail)}</a></td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Event:</td><td style="padding: 8px;">${esc(params.eventTitle)}</td></tr>
          <tr style="background: #f5f5f5;"><td style="padding: 8px; font-weight: bold;">Format:</td><td style="padding: 8px;">${esc(params.format)}</td></tr>
        </table>
        <p style="margin-top: 24px; color: #666; font-size: 14px;">
          Diese Nachricht wurde automatisch von boogly.studio gesendet.
        </p>
      </div>
    `,
  })
}

/**
 * Sendet eine Kontaktanfrage-Benachrichtigung.
 */
export async function sendContactNotification(params: {
  name: string
  email: string
  message: string
}): Promise<void> {
  const notificationEmail = process.env.BREVO_NOTIFICATION_EMAIL || 'hallo@boogly.studio'

  // Einfaches Template-freies E-Mail für Kontaktanfragen
  await sendBrevoEmail({
    sender: { name: 'Boogly Studio Website', email: 'noreply@boogly.studio' },
    to: [{ name: 'Boogly Studio', email: notificationEmail }],
    replyTo: { name: params.name, email: params.email },
    subject: `Neue Kontaktanfrage von ${params.name}`,
    htmlContent: `
      <h2>Neue Kontaktanfrage</h2>
      <p><strong>Name:</strong> ${esc(params.name)}</p>
      <p><strong>E-Mail:</strong> ${esc(params.email)}</p>
      <p><strong>Nachricht:</strong></p>
      <p>${esc(params.message).replace(/\n/g, '<br>')}</p>
    `,
  })
}
