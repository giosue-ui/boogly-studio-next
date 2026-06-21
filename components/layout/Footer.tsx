import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border mt-24">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <p className="text-primary font-bold text-lg mb-2">
              Boogly<span className="text-accent">.</span>
            </p>
            <p className="text-secondary text-sm leading-relaxed">
              Echte Menschen. Echte Begegnungen.<br />
              Social Video aus Stuttgart.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-primary font-semibold text-sm mb-4">Navigation</p>
            <ul className="space-y-2">
              {[
                { href: '/events', label: 'Events & Castings' },
                { href: '/ueber-uns', label: 'Über uns' },
                { href: '/kontakt', label: 'Kontakt' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <p className="text-primary font-semibold text-sm mb-4">Folg uns</p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://instagram.com/boogly.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary text-sm hover:text-primary transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/@boogly.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary text-sm hover:text-primary transition-colors"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted text-sm">
            © {year} Boogly Studio. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            <Link href="/datenschutz" className="text-muted text-sm hover:text-secondary transition-colors">
              Datenschutz
            </Link>
            <Link href="/impressum" className="text-muted text-sm hover:text-secondary transition-colors">
              Impressum
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
