/**
 * Brevo (ehem. Sendinblue) E-Mail-Integration
 * Sendet Transaktions-E-Mails über die Brevo API — Design im Boogly-Look.
 */

const BREVO_API_KEY = process.env.BREVO_API_KEY!
const BREVO_URL = 'https://api.brevo.com/v3/smtp/email'

const SENDER = { name: 'Boogly Studio', email: 'hallo@boogly.studio' }

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

/* ────────────────────────────────────────────────────────────────
   Design-Bausteine (Boogly-Look · hell · Koralle-Akzent)
   Tabellen-Layout + Inline-Styles für maximale E-Mail-Kompatibilität.
   ──────────────────────────────────────────────────────────────── */

const C = {
  canvas: '#ece7db',
  card: '#ffffff',
  cardLine: '#e3dccc',
  cream: '#f2eee4',
  ink: '#1a1a18',
  body: '#5a554c',
  muted: '#8a857a',
  dim: '#a39d90',
  coral: '#fb4d26',
  infoBg: '#f7f3ea',
  ff: "'Archivo',Arial,sans-serif",
  ffHeavy: "'Archivo','Arial Black',sans-serif",
  ffMono: "'Space Mono',monospace",
}

/** Rahmen-Layout: heller Canvas + 600px-Karte. `preheader` ist versteckter Vorschautext. */
function emailLayout(cardRows: string, preheader = ''): string {
  return `<!DOCTYPE html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700;800;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet"></head>
<body style="margin:0;padding:0;background:${C.canvas};">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.canvas};">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.canvas};">
<tr><td align="center" style="padding:24px 12px 44px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:${C.card};border:1px solid ${C.cardLine};border-radius:20px;overflow:hidden;">
${cardRows}
</table>
</td></tr></table>
</body></html>`
}

/** Heller Hero-Block: Logo + Eyebrow + Headline. */
function heroBlock(eyebrow: string, headline: string): string {
  return `<tr><td style="background:${C.cream};padding:0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td align="center" style="padding:32px 40px 4px;">
<span style="font-family:${C.ffHeavy};font-weight:800;font-size:24px;letter-spacing:-1px;color:${C.ink};">boogly<span style="color:${C.coral};">.studio</span></span>
</td></tr>
<tr><td align="center" style="padding:22px 40px 34px;">
<div style="font-family:${C.ffMono};font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:${C.coral};">${eyebrow}</div>
<div style="font-family:${C.ffHeavy};font-weight:900;font-size:36px;line-height:1.04;letter-spacing:-1px;color:${C.ink};margin-top:14px;">${headline}</div>
</td></tr>
</table></td></tr>`
}

/** Heller Footer. */
function footerBlock(): string {
  return `<tr><td style="background:${C.cream};border-top:1px solid ${C.cardLine};padding:26px 40px;">
<p style="font-family:${C.ff};font-size:13px;line-height:1.6;color:${C.muted};margin:0 0 8px;text-align:center;">
Boogly Studio · Human-Interest-Studio aus Stuttgart<br>
<a href="mailto:hallo@boogly.studio" style="color:${C.body};text-decoration:none;">hallo@boogly.studio</a>
</p>
<p style="font-family:${C.ffMono};font-size:11px;letter-spacing:.06em;color:${C.dim};margin:0;text-align:center;">© 2026 BOOGLY.STUDIO</p>
</td></tr>`
}

/** Info-Zeile (Label + Wert) in einer hellen Karte. */
function infoRow(label: string, value: string, last = false): string {
  const border = last ? '' : `border-bottom:1px solid ${C.cardLine};`
  return `<tr><td style="padding:18px 22px;${border}">
<span style="font-family:${C.ffMono};font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:${C.muted};">${label}</span><br>
<span style="font-family:${C.ff};font-size:16px;font-weight:700;color:${C.ink};">${value}</span>
</td></tr>`
}

/* ────────────────────────────────────────────────────────────────
   1) Bestätigungs-E-Mail an den Bewerber
   ──────────────────────────────────────────────────────────────── */
export async function sendApplicationConfirmation(params: {
  name: string
  email: string
  eventTitle: string
  format: string
}): Promise<void> {
  const name = esc(params.name)
  const eventTitle = esc(params.eventTitle)
  const format = esc(params.format)
  const email = esc(params.email)

  const step = (n: string, text: string, last = false) =>
    `<tr>
<td valign="top" width="38" style="font-family:${C.ffHeavy};font-weight:900;font-size:20px;color:${C.coral};">${n}</td>
<td style="font-family:${C.ff};font-size:15px;line-height:1.55;color:${C.body};${last ? '' : 'padding-bottom:14px;'}">${text}</td>
</tr>`

  const cardRows = `
${heroBlock('Bewerbung eingegangen', `Danke, ${name}!`)}

<tr><td style="padding:34px 48px 4px;">
<p style="font-family:${C.ff};font-size:16px;line-height:1.6;color:${C.body};margin:0;text-align:center;">
Deine Bewerbung für <strong style="color:${C.ink};">${eventTitle}</strong> ist bei uns angekommen. Wir schauen sie uns in Ruhe an und melden uns, wenn du zum Format passt.
</p></td></tr>

<tr><td style="padding:26px 40px 6px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.infoBg};border:1px solid ${C.cardLine};border-radius:14px;">
${infoRow('Format', format)}
${infoRow('Deine E-Mail', email, true)}
</table></td></tr>

<tr><td style="padding:28px 48px 0;">
<div style="font-family:${C.ffMono};font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:${C.coral};text-align:center;padding-bottom:16px;">So geht's weiter</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${step('01', 'Wir sichten deine Bewerbung.')}
${step('02', 'Passt es, melden wir uns per E-Mail mit den Details.')}
${step('03', 'Drehtag in Stuttgart — echt, entspannt, ohne Skript.', true)}
</table></td></tr>

<tr><td align="center" style="padding:32px 40px 8px;">
<table role="presentation" cellpadding="0" cellspacing="0"><tr>
<td align="center" style="background:${C.ink};border-radius:999px;">
<a href="https://www.boogly.studio/events" style="display:inline-block;font-family:${C.ff};font-size:15px;font-weight:700;color:${C.cream};text-decoration:none;padding:14px 30px;">Weitere Castings ansehen</a>
</td></tr></table></td></tr>

<tr><td align="center" style="padding:14px 48px 34px;">
<p style="font-family:${C.ff};font-size:14px;line-height:1.55;color:${C.muted};margin:0;">
Bis dahin: schau bei uns auf <a href="https://youtube.com/@BooglyStudio" style="color:${C.coral};text-decoration:none;font-weight:600;">YouTube</a> vorbei.
</p></td></tr>

${footerBlock()}`

  await sendBrevoEmail({
    sender: SENDER,
    to: [{ name: params.name, email: params.email }],
    replyTo: SENDER,
    subject: `Deine Bewerbung ist eingegangen – danke, ${params.name}!`,
    htmlContent: emailLayout(cardRows, 'Deine Bewerbung ist bei uns eingegangen — so geht’s weiter.'),
  })
}

/* ────────────────────────────────────────────────────────────────
   2) Interne Benachrichtigung: neue Bewerbung
   ──────────────────────────────────────────────────────────────── */
export async function sendApplicationNotification(params: {
  applicantName: string
  applicantEmail: string
  eventTitle: string
  format: string
  instagram?: string
  bio?: string
  motivation?: string
  themen?: string
  airtableOk?: boolean
}): Promise<void> {
  const notificationEmail = process.env.BREVO_NOTIFICATION_EMAIL || 'hallo@boogly.studio'
  const name = esc(params.applicantName)
  const mail = esc(params.applicantEmail)
  const eventTitle = esc(params.eventTitle)
  const format = esc(params.format)

  const row = (label: string, value: string, last = false) => {
    const border = last ? '' : `border-bottom:1px solid ${C.cardLine};`
    return `<tr><td style="padding:14px 20px;${border}font-family:${C.ff};font-size:14px;color:${C.muted};width:120px;vertical-align:top;">${label}</td><td style="padding:14px 20px;${border}font-family:${C.ff};font-size:14px;color:${C.ink};">${value}</td></tr>`
  }

  // Warnbanner, falls die Airtable-Speicherung fehlgeschlagen ist
  const warning =
    params.airtableOk === false
      ? `<tr><td style="padding:0 40px;"><div style="background:#fdece6;border:1px solid #f5b79f;border-radius:12px;padding:14px 18px;font-family:${C.ff};font-size:14px;color:#8a2c10;">⚠️ <strong>Airtable-Speicherung fehlgeschlagen</strong> — bitte diese Bewerbung manuell sichern. Alle Daten stehen unten.</div></td></tr>`
      : ''

  const optional = (label: string, value?: string) =>
    value && value.trim() ? row(label, esc(value).replace(/\n/g, '<br>')) : ''

  const cardRows = `
${heroBlock('Neue Bewerbung', name)}
${warning}
<tr><td style="padding:${warning ? '18px' : '26px'} 40px 34px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.infoBg};border:1px solid ${C.cardLine};border-radius:14px;">
${row('E-Mail', `<a href="mailto:${mail}" style="color:${C.coral};text-decoration:none;">${mail}</a>`)}
${params.instagram ? row('Instagram', esc(params.instagram)) : ''}
${row('Event', eventTitle)}
${row('Format', format)}
${optional('Themen', params.themen)}
${optional('Vorstellung', params.bio)}
${optional('Motivation', params.motivation)}
</table></td></tr>
${footerBlock()}`

  await sendBrevoEmail({
    sender: SENDER,
    to: [{ name: 'Boogly Studio', email: notificationEmail }],
    replyTo: { name: params.applicantName, email: params.applicantEmail },
    subject: `Neue Bewerbung: ${params.applicantName} – ${params.eventTitle}`,
    htmlContent: emailLayout(cardRows, `Neue Bewerbung von ${params.applicantName}`),
  })
}

/* ────────────────────────────────────────────────────────────────
   3) Interne Benachrichtigung: neue Kontaktanfrage
   ──────────────────────────────────────────────────────────────── */
export async function sendContactNotification(params: {
  name: string
  email: string
  message: string
}): Promise<void> {
  const notificationEmail = process.env.BREVO_NOTIFICATION_EMAIL || 'hallo@boogly.studio'
  const name = esc(params.name)
  const mail = esc(params.email)
  const message = esc(params.message).replace(/\n/g, '<br>')

  const cardRows = `
${heroBlock('Neue Kontaktanfrage', name)}
<tr><td style="padding:26px 40px 6px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.infoBg};border:1px solid ${C.cardLine};border-radius:14px;">
<tr><td style="padding:14px 20px;border-bottom:1px solid ${C.cardLine};font-family:${C.ff};font-size:14px;color:${C.muted};width:120px;">E-Mail</td><td style="padding:14px 20px;border-bottom:1px solid ${C.cardLine};font-family:${C.ff};font-size:14px;color:${C.ink};"><a href="mailto:${mail}" style="color:${C.coral};text-decoration:none;">${mail}</a></td></tr>
</table></td></tr>
<tr><td style="padding:18px 40px 34px;">
<div style="font-family:${C.ffMono};font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:${C.muted};padding-bottom:8px;">Nachricht</div>
<div style="font-family:${C.ff};font-size:15px;line-height:1.6;color:${C.body};background:${C.infoBg};border:1px solid ${C.cardLine};border-radius:14px;padding:18px 22px;">${message}</div>
</td></tr>
${footerBlock()}`

  await sendBrevoEmail({
    sender: { name: 'Boogly Studio Website', email: 'noreply@boogly.studio' },
    to: [{ name: 'Boogly Studio', email: notificationEmail }],
    replyTo: { name: params.name, email: params.email },
    subject: `Neue Kontaktanfrage von ${params.name}`,
    htmlContent: emailLayout(cardRows, `Neue Kontaktanfrage von ${params.name}`),
  })
}
