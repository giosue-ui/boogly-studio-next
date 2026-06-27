import Link from 'next/link'
import type { Metadata } from 'next'
import { getFeaturedEvents, getHomePage } from '@/lib/sanity/queries'
import { EventCard } from '@/components/events/EventCard'
import { Hero } from '@/components/sections/Hero'
import { Ticker } from '@/components/sections/Ticker'
import { AboutCard } from '@/components/sections/AboutCard'
import { Steps } from '@/components/sections/Steps'
import { FinalCta } from '@/components/sections/FinalCta'
import { FaqSection } from '@/components/sections/FaqSection'
import { SectionHeading } from '@/components/ui/SectionHeading'

export const metadata: Metadata = {
  title: 'Boogly Studio – Echte Menschen. Echte Begegnungen.',
}

export default async function HomePage() {
  const [home, featuredEvents] = await Promise.all([getHomePage(), getFeaturedEvents()])

  return (
    <>
      <Hero
        eyebrow={home?.heroEyebrow}
        headline={home?.heroHeadline}
        text={home?.heroText}
        primaryCta={home?.heroPrimaryCta}
        secondaryCta={home?.heroSecondaryCta}
      />

      <Ticker topics={home?.tickerTopics} />

      <AboutCard
        eyebrow={home?.aboutEyebrow}
        headline={home?.aboutHeadline}
        paragraphs={home?.aboutParagraphs}
        stats={home?.aboutStats}
      />

      <Steps
        id="castings"
        eyebrow={home?.stepsEyebrow}
        headline={home?.stepsHeadline}
        steps={home?.steps}
      />

      {/* Aktuelle Castings (dynamisch aus Sanity) */}
      <section className="px-6 sm:px-10 pb-[104px] max-w-container mx-auto">
        <div className="flex items-end justify-between mb-10">
          <SectionHeading eyebrow="Aktuelle Castings" title="Jetzt bewerben" align="left" />
          <Link href="/events" className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-primary transition-colors">
            Alle Events
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {featuredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl p-12 text-center" style={{ background: 'var(--carbon)', border: '1px solid var(--line)' }}>
            <p className="text-4xl mb-4">🎬</p>
            <p className="text-muted">Gerade keine aktiven Castings. Schau bald wieder rein!</p>
          </div>
        )}
      </section>

      <FinalCta
        eyebrow={home?.ctaEyebrow}
        headline={home?.ctaHeadline}
        text={home?.ctaText}
        button={home?.ctaButton}
      />

      <FaqSection
        eyebrow={home?.faqEyebrow}
        headline={home?.faqHeadline}
        items={home?.faqItems?.map((f) => ({ _id: f._id, question: f.question, answer: f.answer }))}
      />
    </>
  )
}
