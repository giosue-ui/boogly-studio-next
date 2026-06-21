'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/events', label: 'Castings' },
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/faq', label: 'FAQ' },
]

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{ background: 'rgba(12,12,12,0.9)', borderColor: 'rgba(255,255,255,0.07)' }}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-[60px]">
          {/* Logo */}
          <Link
            href="/"
            className="text-[18px] tracking-tight hover:opacity-80 transition-opacity"
            style={{ fontFamily: '"Archivo Black", sans-serif', color: 'var(--text)', letterSpacing: '0.02em' }}
          >
            BOOGLY.STUDIO
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors"
                style={{ color: pathname.startsWith(link.href) ? 'var(--text)' : 'var(--muted)' }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://youtube.com/@BooglyStudio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold px-4 py-2 rounded-lg transition-opacity hover:opacity-90 inline-flex items-center gap-2"
              style={{ background: 'var(--accent)', color: '#0c0c0c' }}
            >
              ▶ Jetzt schauen
            </a>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2 transition-colors"
            style={{ color: 'var(--muted)' }}
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
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t py-4 space-y-3" style={{ borderColor: 'var(--border)' }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-2 py-2 transition-colors"
                style={{ color: 'var(--muted)' }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://youtube.com/@BooglyStudio"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm font-semibold px-4 py-3 rounded-lg text-center"
              style={{ background: 'var(--accent)', color: '#0c0c0c' }}
              onClick={() => setMenuOpen(false)}
            >
              ▶ Jetzt schauen
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
