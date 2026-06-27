import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import type { CtaButton } from '@/lib/sanity/types'

const D = {
  eyebrow: 'Mach mit',
  headline: 'Ein Thema, das dir am Herzen liegt?',
  text: 'Ob Gleichberechtigung, Glaube, Geld oder Liebe — wenn dich ein Thema besonders bewegt, erzähl uns deine Sicht. Schick uns deine Perspektive oder kurz deine Story, und vielleicht bist du in einem unserer nächsten Formate dabei.',
  button: { label: 'Erzähl uns deine Geschichte', href: '/kontakt' },
}

export function FinalCta({
  eyebrow,
  headline,
  text,
  button,
}: {
  eyebrow?: string
  headline?: string
  text?: string
  button?: CtaButton
}) {
  const btn = button?.label ? button : D.button

  return (
    <div className="relative overflow-hidden" style={{ background: 'var(--carbon)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="cta-rings absolute inset-0 opacity-50 pointer-events-none" />
      <section className="relative text-center px-6 sm:px-10 py-[108px] max-w-[760px] mx-auto z-[2]">
        <Eyebrow color="green">{eyebrow || D.eyebrow}</Eyebrow>
        <h2 className="font-display font-extrabold text-[clamp(32px,4.6vw,52px)] leading-[1.05] text-primary mt-3.5">{headline || D.headline}</h2>
        <p className="text-secondary text-lg max-w-[54ch] mx-auto mt-[22px] mb-9">{text || D.text}</p>
        <Button href={btn.href} variant="green" size="lg">{btn.label}</Button>
      </section>
    </div>
  )
}
