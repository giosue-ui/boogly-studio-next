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
    <div className="relative overflow-hidden" style={{ background: 'radial-gradient(700px 400px at 50% 120%, #24201d 0%, #1a1a18 60%)', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="cta-rings absolute inset-0 opacity-50 pointer-events-none" />
      <section className="relative text-center px-6 sm:px-10 py-[108px] max-w-[760px] mx-auto z-[2]">
        <Eyebrow color="blue">{eyebrow || D.eyebrow}</Eyebrow>
        <h2 className="font-display font-extrabold text-[clamp(32px,4.6vw,52px)] leading-[1.05] text-[#F2EEE4] mt-3.5">{headline || D.headline}</h2>
        <p className="text-[#C4BEB2] text-lg max-w-[54ch] mx-auto mt-[22px] mb-9">{text || D.text}</p>
        <Button href={btn.href} variant="cream" size="lg">{btn.label}</Button>
      </section>
    </div>
  )
}
