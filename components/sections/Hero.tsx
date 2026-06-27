import { GooglyEyes } from '@/components/ui/GooglyEyes'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import type { CtaButton } from '@/lib/sanity/types'

type HeroProps = {
  eyebrow?: string
  headline?: string
  text?: string
  primaryCta?: CtaButton
  secondaryCta?: CtaButton
}

const D = {
  eyebrow: 'Human-Interest-Studio · Stuttgart',
  headline: 'Echte Menschen.\nEchte Begegnungen.',
  text: 'Boogly.Studio ist ein Ort für echte Begegnungen. Von Dating über Debatten bis zu persönlichen Geschichten bringen wir Menschen zusammen und schaffen Gespräche, die bewegen.',
  primary: { label: '▶ Jetzt schauen', href: 'https://youtube.com/@BooglyStudio' },
  secondary: { label: 'Aktuelle Castings', href: '/events' },
}

export function Hero({ eyebrow, headline, text, primaryCta, secondaryCta }: HeroProps) {
  const lines = (headline || D.headline).split('\n')
  const primary = primaryCta?.label ? primaryCta : D.primary
  const secondary = secondaryCta?.label ? secondaryCta : D.secondary

  return (
    <section className="hero-radial relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-[90px] pb-[100px] overflow-hidden">
      <div className="dot-grid absolute inset-0 opacity-70 pointer-events-none" />

      <GooglyEyes count={2} size={78} gap={26} className="relative mb-10" />

      <div className="relative mb-[22px]">
        <Eyebrow>{eyebrow || D.eyebrow}</Eyebrow>
      </div>

      <h1 className="relative font-display font-extrabold text-primary text-[clamp(40px,6.4vw,76px)] leading-none max-w-[15ch]">
        {lines.map((line, i) => (
          <span key={i}>
            {line}
            {i < lines.length - 1 && <br />}
          </span>
        ))}
      </h1>

      <p className="relative text-secondary text-[clamp(17px,2.1vw,21px)] max-w-[56ch] mt-[26px]">
        {text || D.text}
      </p>

      <div className="relative flex flex-wrap gap-3.5 justify-center mt-10">
        <Button href={primary.href} variant="primary" size="lg">{primary.label}</Button>
        <Button href={secondary.href} variant="ghost" size="lg">{secondary.label}</Button>
      </div>
    </section>
  )
}
