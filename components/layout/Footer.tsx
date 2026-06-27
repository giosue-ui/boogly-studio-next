import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import type { SiteSettings, FooterColumn, SocialLink } from '@/lib/sanity/types'

const DEFAULT_TAGLINE =
  'Human-Interest-Studio — echte Menschen, echte Geschichten. Wir behalten die Gesellschaft im Auge. Social Video aus Stuttgart.'

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: 'Entdecken',
    links: [
      { label: 'Castings', href: '/events' },
      { label: 'Über uns', href: '/ueber-uns' },
      { label: 'Jetzt schauen', href: 'https://youtube.com/@BooglyStudio' },
    ],
  },
  {
    title: 'Weiteres',
    links: [
      { label: 'Community', href: '/community' },
      { label: 'Shop', href: '/shop' },
      { label: 'Offene Stellen', href: '/offene-stellen' },
      { label: 'Kooperationen', href: '/kooperationen' },
      { label: 'Kontakt', href: '/kontakt' },
    ],
  },
]

const DEFAULT_SOCIALS: SocialLink[] = [
  { label: 'YouTube', url: 'https://youtube.com/@BooglyStudio' },
  { label: 'Instagram', url: 'https://instagram.com/boogly.studio' },
  { label: 'TikTok', url: 'https://tiktok.com/@boogly.studio' },
]

export function Footer({ settings }: { settings?: SiteSettings | null }) {
  const tagline = settings?.footerTagline || DEFAULT_TAGLINE
  const columns = settings?.footerColumns?.length ? settings.footerColumns : DEFAULT_COLUMNS
  const socials = settings?.socials?.length ? settings.socials : DEFAULT_SOCIALS
  const copyright = settings?.copyright || '© 2026 BOOGLY.STUDIO · ALLE RECHTE VORBEHALTEN'

  return (
    <>
      <div className="tape h-[7px]" />
      <footer style={{ background: 'var(--carbon)' }} className="px-6 sm:px-10 pt-16 pb-9">
        <div className="max-w-container mx-auto grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Logo size={24} brand={settings?.brandName || 'boogly'} suffix={settings?.brandSuffix || '.studio'} />
            <p className="text-muted text-[14.5px] max-w-[34ch] mt-5 leading-[1.55]">{tagline}</p>
          </div>

          {/* Link-Spalten */}
          {columns.map((col) => (
            <div key={col.title}>
              <h5 className="font-mono text-xs uppercase tracking-[0.12em] text-dim mb-4">{col.title}</h5>
              {col.links.map((l) => (
                <FootLink key={l.label} href={l.href} label={l.label} />
              ))}
            </div>
          ))}

          {/* Social */}
          <div>
            <h5 className="font-mono text-xs uppercase tracking-[0.12em] text-dim mb-4">Folge uns</h5>
            {socials.map((s) => (
              <FootLink key={s.label} href={s.url} label={s.label} />
            ))}
          </div>
        </div>

        <div
          className="max-w-container mx-auto mt-11 pt-6 flex flex-wrap justify-between gap-3 font-mono text-xs tracking-[0.06em] text-dim"
          style={{ borderTop: '1px solid var(--line)' }}
        >
          <span>{copyright}</span>
          <span>
            <Link href="/datenschutz" className="text-dim hover:text-muted transition-colors">DATENSCHUTZ</Link>
            {' · '}
            <Link href="/impressum" className="text-dim hover:text-muted transition-colors">IMPRESSUM</Link>
          </span>
        </div>
      </footer>
    </>
  )
}

function FootLink({ href, label }: { href: string; label: string }) {
  const external = href.startsWith('http')
  const cls = 'block text-muted hover:text-primary text-[14.5px] py-1.5 transition-colors'
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {label}
    </a>
  ) : (
    <Link href={href || '#'} className={cls}>
      {label}
    </Link>
  )
}
