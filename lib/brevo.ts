/**
 * Brevo (ehem. Sendinblue) E-Mail-Integration
 * Sendet Transaktions-E-Mails über Brevo Templates.
 */

const BREVO_API_KEY = process.env.BREVO_API_KEY!
const BREVO_URL = 'https://api.brevo.com/v3/smtp/email'

type EmailParams = Record<string, string | number>

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
 * Nutzt Template ID aus BREVO_NOTIFICATION_TEMPLATE_ID.
 */
export async function sendApplicationNotification(params: {
  applicantName: string
  applicantEmail: string
  eventTitle: string
  format: string
}): Promise<void> {
  const templateId = parseInt(process.env.BREVO_NOTIFICATION_TEMPLATE_ID || '2', 10)
  const notificationEmail = process.env.BREVO_NOTIFICATION_EMAIL || 'hallo@boogly.studio'

  await sendBrevoEmail({
    templateId,
    to: [{ name: 'Boogly Studio', email: notificationEmail }],
    params: {
      applicantName: params.applicantName,
      applicantEmail: params.applicantEmail,
      eventTitle: params.eventTitle,
      format: params.format,
    },
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
      <p><strong>Name:</strong> ${params.name}</p>
      <p><strong>E-Mail:</strong> ${params.email}</p>
      <p><strong>Nachricht:</strong></p>
      <p>${params.message.replace(/\n/g, '<br>')}</p>
    `,
  })
}
