import type { Metadata } from 'next'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { getAboutPage } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

export const metadata: Metadata = {
  title: 'Über uns',
  description: 'Lern Boogly Studio kennen — wer wir sind, was uns antreibt und warum wir authentische Geschichten erzählen.',
}

export default async function UeberUnsPage() {
  const about = await getAboutPage()

  return (
    <div className="container py-16">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <Eyebrow>{about?.eyebrow || 'Über uns'}</Eyebrow>
        <h1 className="font-display text-primary text-4xl sm:text-5xl font-extrabold leading-tight mt-3 mb-6">
          {about?.title || 'Wir glauben an die Kraft echter Geschichten.'}
        </h1>
      </div>

      {about?.image && (
        <div className="relative aspect-video rounded-3xl overflow-hidden mb-16" style={{ border: '1px solid var(--line)' }}>
          <Image src={urlFor(about.image).width(1200).url()} alt={about.image.alt || 'Boogly Studio'} fill className="object-cover" />
        </div>
      )}

      {about?.body ? (
        <div className="prose-boogly max-w-3xl text-lg">
          <PortableText value={about.body} />
        </div>
      ) : (
        <DefaultAbout />
      )}

      {/* CTA */}
      <section className="mt-20 rounded-3xl p-12 text-center" style={{ background: 'var(--carbon)', border: '1px solid var(--line)' }}>
        <h2 className="font-display text-primary text-3xl font-bold mb-4">Teil der Geschichte werden</h2>
        <p className="text-secondary text-lg max-w-xl mx-auto mb-8">
          Wir suchen immer nach echten, mutigen Menschen für unsere Formate. Keine Erfahrung nötig — nur Persönlichkeit.
        </p>
        <Button href="/events" size="lg">Aktuelle Castings ansehen →</Button>
      </section>
    </div>
  )
}

/** Fallback-Inhalt, solange „Über uns" im CMS leer ist. */
function DefaultAbout() {
  return (
    <>
      <p className="text-secondary text-xl leading-relaxed max-w-3xl mb-16">
        Boogly Studio ist eine Video-Produktionsfirma aus Stuttgart. Wir produzieren Social-Video-Formate, die Menschen
        verbinden — keine perfekte Inszenierung, sondern echte Persönlichkeiten, echte Meinungen, echte Begegnungen.
      </p>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
        <div>
          <h2 className="font-display text-primary text-3xl font-bold mb-5">Unsere Mission</h2>
          <div className="space-y-4 text-secondary leading-relaxed">
            <p>
              Social Media ist oft poliert, inszeniert und weit weg vom echten Leben. Wir glauben, dass gerade das
              Unvollkommene, das Ehrliche, das Authentische Menschen bewegt und verbindet.
            </p>
            <p>
              Unsere Formate sind Räume, in denen echte Menschen über echte Themen sprechen — Liebe, Geld, Gesellschaft,
              Beziehungen. Unzensiert, unperfekt, ungefiltert.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Produzierte Formate', value: '5+' },
            { label: 'Bewerbungen erhalten', value: '200+' },
            { label: 'Views generiert', value: '500K+' },
            { label: 'Community-Mitglieder', value: '10K+' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl p-6 text-center" style={{ background: 'var(--carbon)', border: '1px solid var(--line)' }}>
              <p className="font-display text-3xl font-extrabold mb-1" style={{ color: 'var(--blue)' }}>{stat.value}</p>
              <p className="text-secondary text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-primary text-3xl font-bold mb-8">Unsere Formate</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'Ansichtssache', desc: 'Verschiedene Menschen, eine Frage — unterschiedliche Perspektiven zu gesellschaftlichen Themen. Das Format, das Gespräche anfacht.', icon: '💬' },
            { name: 'Umzingelt', desc: 'Eine Person im Mittelpunkt, umgeben von fremden Meinungen und unerwarteten Fragen. Direkt, persönlich, überraschend.', icon: '🎯' },
          ].map((format) => (
            <div key={format.name} className="rounded-2xl p-6" style={{ background: 'var(--carbon)', border: '1px solid var(--line)' }}>
              <span className="text-3xl mb-4 block">{format.icon}</span>
              <h3 className="font-display text-primary font-bold text-xl mb-3">{format.name}</h3>
              <p className="text-secondary text-sm leading-relaxed">{format.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
