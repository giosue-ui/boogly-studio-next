import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Über uns',
  description: 'Lern Boogly Studio kennen — wer wir sind, was uns antreibt und warum wir authentische Geschichten erzählen.',
}

export default function UeberUnsPage() {
  return (
    <div className="container py-16">
      {/* Header */}
      <div className="max-w-3xl mb-20">
        <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Über uns</p>
        <h1 className="text-primary text-4xl sm:text-5xl font-black leading-tight mb-6">
          Wir glauben an die Kraft echter Geschichten.
        </h1>
        <p className="text-secondary text-xl leading-relaxed">
          Boogly Studio ist eine Video-Produktionsfirma aus Stuttgart. Wir produzieren Social-Video-Formate,
          die Menschen verbinden — keine perfekte Inszenierung, sondern echte Persönlichkeiten, echte Meinungen,
          echte Begegnungen.
        </p>
      </div>

      {/* Mission */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
        <div>
          <h2 className="text-primary text-3xl font-bold mb-5">Unsere Mission</h2>
          <div className="space-y-4 text-secondary leading-relaxed">
            <p>
              Social Media ist oft poliert, inszeniert und weit weg vom echten Leben.
              Wir glauben, dass gerade das Unvollkommene, das Ehrliche, das Authentische Menschen bewegt und verbindet.
            </p>
            <p>
              Unsere Formate sind Räume, in denen echte Menschen über echte Themen sprechen —
              Liebe, Geld, Gesellschaft, Beziehungen. Unzensiert, unperfekt, ungefiltert.
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
            <div key={stat.label} className="bg-surface border border-border rounded-2xl p-6 text-center">
              <p className="text-accent text-3xl font-black mb-1">{stat.value}</p>
              <p className="text-secondary text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Formate */}
      <section className="mb-20">
        <h2 className="text-primary text-3xl font-bold mb-8">Unsere Formate</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: 'Ansichtssache',
              desc: 'Verschiedene Menschen, eine Frage — unterschiedliche Perspektiven zu gesellschaftlichen Themen. Das Format, das Gespräche anfacht.',
              icon: '💬',
            },
            {
              name: 'Umzingelt',
              desc: 'Eine Person im Mittelpunkt, umgeben von fremden Meinungen und unerwarteten Fragen. Direkt, persönlich, überraschend.',
              icon: '🎯',
            },
          ].map((format) => (
            <div key={format.name} className="bg-surface border border-border rounded-2xl p-6">
              <span className="text-3xl mb-4 block">{format.icon}</span>
              <h3 className="text-primary font-bold text-xl mb-3">{format.name}</h3>
              <p className="text-secondary text-sm leading-relaxed">{format.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-accent/10 to-amber-500/5 border border-accent/20 rounded-3xl p-12 text-center">
        <h2 className="text-primary text-3xl font-bold mb-4">Teil der Geschichte werden</h2>
        <p className="text-secondary text-lg max-w-xl mx-auto mb-8">
          Wir suchen immer nach echten, mutigen Menschen für unsere Formate.
          Keine Erfahrung nötig — nur Persönlichkeit.
        </p>
        <Button href="/events" size="lg">
          Aktuelle Castings ansehen →
        </Button>
      </section>
    </div>
  )
}
