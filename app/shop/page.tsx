import type { Metadata } from 'next'
import { PageShell } from '@/components/sections/PageShell'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Boogly-Merch ist in Arbeit. Bald gibt es hier Produkte rund um echte Menschen und echte Geschichten.',
}

export default function ShopPage() {
  return (
    <PageShell eyebrow="Shop" title="Bald verfügbar" intro="Unser Shop ist gerade in Arbeit.">
      <div className="rounded-3xl p-12 text-center" style={{ background: 'var(--carbon)', border: '1px solid var(--line)' }}>
        <p className="text-5xl mb-5">🧢</p>
        <h2 className="font-display text-primary text-2xl font-bold mb-3">Merch kommt</h2>
        <p className="text-secondary mb-7 max-w-lg mx-auto">
          Wir arbeiten an Produkten rund um Boogly — echte Menschen, echte Geschichten, zum Anziehen.
          Folg uns, um den Launch nicht zu verpassen.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button href="https://instagram.com/boogly.studio" variant="primary">Updates auf Instagram</Button>
          <Button href="/kontakt" variant="ghost">Frag uns etwas</Button>
        </div>
      </div>
    </PageShell>
  )
}
