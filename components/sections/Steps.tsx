import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Step } from '@/lib/sanity/types'

const D: { eyebrow: string; headline: string; steps: Step[] } = {
  eyebrow: 'So läuft es ab',
  headline: 'Dein Weg ins Format',
  steps: [
    { num: '01', title: 'Casting entdecken', text: 'Schau dir unsere aktuellen Formate an und finde das, das zu dir passt.' },
    { num: '02', title: 'Bewerben', text: 'Füll das Formular aus und zeig uns, wer du bist. Keine Scheu – wir wollen dich kennenlernen.' },
    { num: '03', title: 'Dabei sein', text: "Wenn wir denken, dass du zum Format passt, melden wir uns. Dann geht's los." },
  ],
}

export function Steps({
  eyebrow,
  headline,
  steps,
  id,
}: {
  eyebrow?: string
  headline?: string
  steps?: Step[]
  id?: string
}) {
  const list = steps?.length ? steps : D.steps

  return (
    <section id={id} className="px-6 sm:px-10 py-[104px] max-w-container mx-auto">
      <SectionHeading eyebrow={eyebrow || D.eyebrow} title={headline || D.headline} className="mb-[52px]" />
      <div className="grid md:grid-cols-3 gap-6">
        {list.map((s) => (
          <div
            key={s.num}
            className="rounded-[22px] p-8 sm:p-9 transition-all duration-200 hover:-translate-y-[3px]"
            style={{ background: 'var(--carbon)', border: '1px solid var(--line)' }}
          >
            <div className="font-display text-[46px] font-extrabold leading-none" style={{ color: 'var(--text)' }}>{s.num}</div>
            <h3 className="font-display text-[21px] font-bold text-primary mt-4 mb-2.5">{s.title}</h3>
            <p className="text-muted text-[15.5px]">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
