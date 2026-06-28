'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Logo } from '@/components/ui/Logo'
import type { SiteSettings, NavItem } from '@/lib/sanity/types'

// Fallback-Navigation (= Website A), falls noch nichts im CMS gepflegt ist.
const DEFAULT_NAV: NavItem[] = [
  { label: 'Castings', href: '/events' },
  { label: 'Über uns', href: '/ueber-uns' },
  {
    label: 'Weiteres',
    href: '',
    children: [
      { label: 'Werde Teil unserer Community', href: '/community' },
      { label: 'Shop', href: '/shop' },
      { label: 'Offene Stellen — Arbeite mit uns', href: '/offene-stellen' },
      { label: 'Kooperationen', href: '/kooperationen' },
      { label: 'Kontakt aufnehmen', href: '/kontakt' },
    ],
  },
]

const DEFAULT_CTA = { label: '▶ Jetzt schauen', url: 'https://youtube.com/@BooglyStudio' }

export function Header({ settings }: { settings?: SiteSettings | null }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const nav = settings?.nav?.length ? settings.nav : DEFAULT_NAV
  const ctaLabel = settings?.watchCtaLabel || DEFAULT_CTA.label
  const ctaUrl = settings?.watchCtaUrl || DEFAULT_CTA.url
  const brandName = settings?.brandName || 'boogly'
  const brandSuffix = settings?.brandSuffix || '.studio'

  return (
    <header
      className="sticky top-0 z-[60] border-b backdrop-blur-md"
      style={{ background: 'rgba(242,238,228,0.82)', borderColor: 'var(--line)' }}
    >
      <div className="flex items-center justify-between px-6 sm:px-10 py-4">
        <Logo brand={brandName} suffix={brandSuffix} size={25} />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-9">
          {nav.map((item) =>
            item.children?.length ? (
              <div key={item.label} className="relative group">
                <button className="flex items-center gap-1.5 text-[15px] font-medium text-primary hover:text-accent-tint transition-colors">
                  {item.label} <span className="text-xs">▾</span>
                </button>
                <div
                  className="absolute top-[calc(100%+16px)] left-1/2 -translate-x-1/2 translate-y-2 min-w-[268px] p-2.5 rounded-2xl
                             opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                             transition-all duration-200"
                  style={{ background: 'var(--carbon)', border: '1px solid var(--line)', boxShadow: '0 22px 50px rgba(0,0,0,.5)' }}
                >
                  {item.children.map((child) => (
                    <DropdownLink key={child.label} href={child.href} label={child.label} />
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href || '#'}
                className="text-[15px] font-medium text-primary hover:text-accent-tint transition-colors"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <a
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 bg-[#1A1A18] hover:bg-black text-[#F2EEE4] font-semibold text-[15px] px-[22px] py-2.5 rounded-full transition-colors whitespace-nowrap"
        >
          {ctaLabel}
        </a>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2 text-muted"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü öffnen"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t px-6 py-4 space-y-1" style={{ borderColor: 'var(--line)' }}>
          {nav.flatMap((item) =>
            item.children?.length
              ? item.children.map((c) => (
                  <MobileLink key={c.label} href={c.href} label={c.label} onClick={() => setMenuOpen(false)} />
                ))
              : [<MobileLink key={item.label} href={item.href || '#'} label={item.label} onClick={() => setMenuOpen(false)} />]
          )}
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm font-semibold px-4 py-3 mt-2 rounded-full text-center bg-[#1A1A18] text-[#F2EEE4]"
            onClick={() => setMenuOpen(false)}
          >
            {ctaLabel}
          </a>
        </div>
      )}
    </header>
  )
}

function DropdownLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href || '#'}
      className="block px-[15px] py-[11px] rounded-[10px] text-[14.5px] text-muted hover:text-primary transition-colors"
      style={{ background: 'transparent' }}
    >
      {label}
    </Link>
  )
}

function MobileLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <Link href={href || '#'} className="block px-2 py-2 text-muted hover:text-primary transition-colors" onClick={onClick}>
      {label}
    </Link>
  )
}
