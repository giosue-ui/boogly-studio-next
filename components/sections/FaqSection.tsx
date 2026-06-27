import { PortableText, type PortableTextBlock } from '@portabletext/react'
import { SectionHeading } from '@/components/ui/SectionHeading'

export type FaqEntry = {
  _id?: string
  question: string
  answer?: PortableTextBlock[] | string
}

const D: FaqEntry[] = [
  { question: 'Muss ich eine öffentliche Person sein?', answer: 'Nein. Wir suchen ausdrücklich Menschen aus allen Lebensbereichen – Studenten, Handwerker, Eltern, Rentner, Aktivisten, Konservative. Deine Perspektive ist das Wichtigste, nicht deine Bekanntheit.' },
  { question: 'Wie läuft ein Drehtag ab?', answer: "Du kommst zu uns nach Stuttgart. Es gibt ein kurzes Briefing, dann lernst du dein Gegenüber kennen – und los geht's. Der Drehtag dauert in der Regel 2–3 Stunden. Für Verpflegung ist gesorgt, du musst einfach du selbst sein." },
  { question: 'Werde ich bezahlt?', answer: 'In der Startphase erfolgt die Teilnahme ehrenamtlich. Du bekommst das fertige Video für deine eigenen Kanäle und profitierst von der Reichweite des Formats.' },
  { question: 'Kann ich das Video ablehnen, wenn es veröffentlicht wird?', answer: 'Du unterschreibst vor dem Drehtag eine Einverständniserklärung. Eine nachträgliche Ablehnung ist in Ausnahmefällen möglich – wir besprechen das offen im Vorgespräch.' },
  { question: 'Ich habe eine starke Meinung – ist das ein Problem?', answer: 'Ganz im Gegenteil – genau das suchen wir. Solange du respektvoll bleibst und das Gespräch führen willst (nicht gewinnen), bist du perfekt für Ansichtssache.' },
  { question: 'Wo finden die Drehs statt?', answer: 'Unsere Drehs finden in Stuttgart statt. Wenn du weiter weg wohnst, kein Problem – bewirb dich trotzdem. Wenn dein Profil passt, finden wir gemeinsam einen Weg.' },
]

export function FaqSection({
  eyebrow,
  headline,
  items,
  withHeading = true,
}: {
  eyebrow?: string
  headline?: string
  items?: FaqEntry[]
  withHeading?: boolean
}) {
  const list = items?.length ? items : D

  return (
    <section className="px-6 sm:px-10 py-[104px] max-w-container mx-auto">
      {withHeading && (
        <SectionHeading eyebrow={eyebrow || 'FAQ'} title={headline || 'Häufige Fragen'} className="mb-[52px]" />
      )}
      <div className="max-w-[800px] mx-auto">
        {list.map((item, i) => (
          <details
            key={item._id || i}
            className="group rounded-2xl mb-3.5 overflow-hidden"
            style={{ background: 'var(--carbon)', border: '1px solid var(--line)' }}
          >
            <summary className="flex justify-between items-center gap-4 cursor-pointer px-[26px] py-[23px] font-display text-lg font-bold text-primary list-none [&::-webkit-details-marker]:hidden">
              {item.question}
              <span className="text-[26px] font-normal leading-none transition-transform duration-200 group-open:rotate-45" style={{ color: 'var(--blue)' }}>+</span>
            </summary>
            <div className="px-[26px] pb-6 text-secondary text-base leading-[1.6]">
              {typeof item.answer === 'string' ? (
                <p>{item.answer}</p>
              ) : item.answer ? (
                <PortableText value={item.answer} />
              ) : null}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
