import { Eyebrow } from '@/components/ui/Eyebrow'
import type { Stat } from '@/lib/sanity/types'

type AboutProps = {
  eyebrow?: string
  headline?: string
  paragraphs?: string[]
  stats?: Stat[]
}

const D = {
  eyebrow: 'Über uns',
  headline: 'Wir behalten die Gesellschaft im Auge.',
  paragraphs: [
    'Wir sind ein junges Human-Interest-Studio aus Stuttgart. Wir produzieren Social-First-Formate, in denen die unterschiedlichsten Menschen aufeinandertreffen, ihre Meinung teilen und ehrlich miteinander reden.',
    'Kein Drehbuch, keine Schauspieler — nur echte Geschichten, gut erzählt. Unser Ziel: Inhalte, die unterhalten und gleichzeitig etwas über uns als Gesellschaft erzählen.',
  ],
  stats: [
    { value: '100% echt', label: 'echte Menschen, kein Skript' },
    { value: 'Social-First', label: 'gemacht für YouTube, TikTok & Reels' },
    { value: 'Auf Augenhöhe', label: 'wir fragen, statt zu urteilen' },
  ] as Stat[],
}

export function AboutCard({ eyebrow, headline, paragraphs, stats }: AboutProps) {
  const paras = paragraphs?.length ? paragraphs : D.paragraphs
  const statList = stats?.length ? stats : D.stats

  return (
    <section className="section px-6 sm:px-10 py-[104px] max-w-container mx-auto" id="ueber-uns">
      <div
        className="relative overflow-hidden rounded-[28px] p-9 sm:p-[58px] grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-[54px] items-center"
        style={{ background: 'linear-gradient(135deg,#ffffff,#fcfaf4)', border: '1px solid var(--line)' }}
      >
        {/* „oo"-Textur */}
        <div
          className="absolute -right-8 -top-10 font-display font-extrabold text-[120px] leading-[0.8] w-[240px] break-all opacity-50 pointer-events-none select-none"
          style={{ color: '#ece3d2', letterSpacing: '.04em' }}
          aria-hidden
        >
          oo oooo oo oooooo oo oo oooo oo
        </div>

        <div className="relative">
          <Eyebrow>{eyebrow || D.eyebrow}</Eyebrow>
          <h2 className="font-display font-extrabold text-[36px] text-primary mt-3.5 mb-[18px]">{headline || D.headline}</h2>
          {paras.map((p, i) => (
            <p key={i} className="text-secondary text-[16.5px] mb-3.5">{p}</p>
          ))}
        </div>

        <div className="relative flex flex-col gap-4">
          {statList.map((s, i) => (
            <div key={i} className="flex items-center gap-[18px] rounded-[18px] px-6 py-[22px]" style={{ background: 'var(--ink)', border: '1px solid var(--line)' }}>
              <span className="w-1 h-[38px] rounded flex-none" style={{ background: 'var(--blue)' }} />
              <div>
                <b className="font-display text-[21px] font-extrabold block text-primary">{s.value}</b>
                <span className="text-muted text-sm">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
