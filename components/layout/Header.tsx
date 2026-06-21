'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/events', label: 'Events' },
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/kontakt', label: 'Kontakt' },
]

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-primary font-bold text-xl tracking-tight hover:text-accent transition-colors"
          >
            Boogly<span className="text-accent">.</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname.startsWith(link.href)
                    ? 'text-primary'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/events"
              className="bg-accent hover:bg-accent-hover text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Jetzt bewerben
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2 text-secondary hover:text-primary"
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
          <div className="md:hidden border-t border-border py-4 space-y-3 animate-fade-in">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-2 py-2 text-secondary hover:text-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/events"
              className="block bg-accent text-white text-sm font-semibold px-4 py-3 rounded-lg text-center"
              onClick={() => setMenuOpen(false)}
            >
              Jetzt bewerben
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
