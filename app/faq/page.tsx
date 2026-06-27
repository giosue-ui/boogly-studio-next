import type { Metadata } from 'next'
import Link from 'next/link'
import { getFaqItems } from '@/lib/sanity/queries'
import { FaqSection } from '@/components/sections/FaqSection'
import { Eyebrow } from '@/components/ui/Eyebrow'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Alles, was du wissen musst, bevor du dich bei Boogly Studio bewirbst.',
}

export default async function FAQPage() {
  const items = await getFaqItems()

  return (
    <>
      <section className="hero-radial px-6 sm:px-10 pt-24 pb-12 text-center">
        <Eyebrow>FAQ</Eyebrow>
        <h1 className="font-display font-extrabold text-primary text-[clamp(34px,5vw,56px)] leading-tight mt-4 mb-5">
          Häufige Fragen
        </h1>
        <p className="text-secondary text-xl max-w-2xl mx-auto">Alles, was du wissen musst, bevor du dich bewirbst.</p>
      </section>

      <FaqSection
        withHeading={false}
        items={items.length ? items.map((f) => ({ _id: f._id, question: f.question, answer: f.answer })) : undefined}
      />

      <div className="px-6 sm:px-10 pb-24 max-w-[800px] mx-auto">
        <div className="rounded-3xl p-10 text-center" style={{ background: 'var(--carbon)', border: '1px solid var(--line)' }}>
          <h2 className="font-display text-primary text-2xl font-bold mb-3">Noch eine Frage?</h2>
          <p className="text-secondary mb-6">Schreib uns direkt – wir antworten innerhalb von 24 Stunden.</p>
          <Link href="/kontakt" className="inline-block text-sm font-semibold px-6 py-3 rounded-full transition-colors bg-accent hover:bg-accent-hover text-white">
            Kontakt aufnehmen →
          </Link>
        </div>
      </div>
    </>
  )
}
