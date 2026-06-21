'use client'

import { useState } from 'react'
import Link from 'next/link'

const FAQS = [
  {
    q: 'Muss ich eine öffentliche Person sein?',
    a: 'Nein. Wir suchen ausdrücklich Menschen aus allen Lebensbereichen – Studenten, Handwerker, Eltern, Rentner, Aktivisten, Konservative. Deine Perspektive ist das Wichtigste, nicht deine Bekanntheit.',
  },
  {
    q: 'Wie läuft ein Drehtag ab?',
    a: "Du kommst zu uns nach Stuttgart. Es gibt ein kurzes Briefing, dann lernst du dein Gegenüber kennen – und los geht's. Der Drehtag dauert in der Regel 2–3 Stunden. Für Verpflegung ist gesorgt, du musst einfach du selbst sein.",
  },
  {
    q: 'Werde ich bezahlt?',
    a: 'In der Startphase erfolgt die Teilnahme ehrenamtlich. Du bekommst das fertige Video für deine eigenen Kanäle und profitierst von der Reichweite des Formats.',
  },
  {
    q: 'Kann ich das Video ablehnen, wenn es veröffentlicht wird?',
    a: 'Du unterschreibst vor dem Drehtag eine Einverständniserklärung. Eine nachträgliche Ablehnung ist in Ausnahmefällen möglich – wir besprechen das offen im Vorgespräch.',
  },
  {
    q: 'Ich habe eine starke Meinung – ist das ein Problem?',
    a: 'Ganz im Gegenteil – genau das suchen wir. Solange du respektvoll bleibst und das Gespräch führen willst (nicht gewinnen), bist du perfekt für Ansichtssache.',
  },
  {
    q: 'Wo finden die Drehs statt?',
    a: 'Unsere Drehs finden in Stuttgart statt. Wenn du weiter weg wohnst, kein Problem – bewirb dich trotzdem. Wenn dein Profil passt, finden wir gemeinsam einen Weg.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="border border-border rounded-2xl overflow-hidden"
      style={{ background: 'var(--surface)' }}
    >
      <button
        className="w-full flex items-center justify-between px-6 py-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-primary font-semibold text-base pr-4">{q}</span>
        <span
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full transition-transform"
          style={{
            background: 'var(--accent)',
            color: '#0c0c0c',
            transform: open ? 'rotate(45deg)' : 'none',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-6 pb-6">
          <p className="text-secondary leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  return (
    <div className="container py-16">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
          <h1 className="text-primary text-4xl sm:text-5xl font-black leading-tight mb-6">
            Häufige Fragen
          </h1>
          <p className="text-secondary text-xl leading-relaxed">
            Alles, was du wissen musst, bevor du dich bewirbst.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>

        <div
          className="mt-16 rounded-3xl p-10 text-center border"
          style={{
            background: 'linear-gradient(135deg, rgba(200,255,0,0.06), rgba(245,158,11,0.03))',
            borderColor: 'rgba(200,255,0,0.15)',
          }}
        >
          <h2 className="text-primary text-2xl font-bold mb-3">Noch eine Frage?</h2>
          <p className="text-secondary mb-6">Schreib uns direkt – wir antworten innerhalb von 24 Stunden.</p>
          <Link
            href="/kontakt"
            className="inline-block text-sm font-semibold px-6 py-3 rounded-xl transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent)', color: '#0c0c0c' }}
          >
            Kontakt aufnehmen →
          </Link>
        </div>
      </div>
    </div>
  )
}
