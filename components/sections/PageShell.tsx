import { type ReactNode } from 'react'
import { Eyebrow } from '@/components/ui/Eyebrow'

/** Wiederverwendbares Layout für einfache Inhaltsseiten (Hero + Inhalt). */
export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string
  title: string
  intro?: string
  children?: ReactNode
}) {
  return (
    <>
      <section className="hero-radial px-6 sm:px-10 pt-24 pb-12 text-center">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="font-display font-extrabold text-primary text-[clamp(34px,5vw,56px)] leading-tight mt-4 mb-5">
          {title}
        </h1>
        {intro && <p className="text-secondary text-xl max-w-2xl mx-auto">{intro}</p>}
      </section>
      {children && <section className="container pb-24 max-w-3xl">{children}</section>}
    </>
  )
}

/** Karte für Feature-/Info-Blöcke. */
export function InfoCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl p-6" style={{ background: 'var(--carbon)', border: '1px solid var(--line)' }}>
      <h3 className="font-display text-primary font-bold text-lg mb-2">{title}</h3>
      <p className="text-secondary text-sm leading-relaxed">{children}</p>
    </div>
  )
}
