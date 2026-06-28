import type { Config } from 'tailwindcss'

/**
 * Design-System — übernommen aus Website A (boogly-startseite.html).
 * Die semantischen Namen (primary, surface, accent …) bleiben gleich wie zuvor,
 * damit bestehende Komponenten ohne Umschreiben automatisch das neue Design erben.
 * Geändert wurden nur die WERTE (Blau/Grün statt Lime) und die Fonts.
 */
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Flächen (warm)
        background: '#1A1A18', // ink
        surface: '#232220', // carbon
        'surface-2': '#2C2A27',
        border: '#34322D', // line
        'border-hover': '#45413A',
        // Text (warm)
        primary: '#F2EEE4', // paper / creme
        secondary: '#C4BEB2', // body
        muted: '#9A948A', // mist
        dim: '#7C776D',
        // Primärfarbe = Koralle (Name 'accent' bleibt)
        accent: '#FB4D26',
        'accent-hover': '#E63E18',
        'accent-deep': '#C2350F',
        'accent-tint': '#FF8A6B',
        'accent-subtle': 'rgba(251,77,38,0.10)',
        'accent-border': 'rgba(251,77,38,0.25)',
        // Sekundär-Akzent = Blau (Name 'green' bleibt, für CTA / Tape)
        green: '#2F55F0',
        'green-ink': '#F2EEE4',
      },
      fontFamily: {
        // Selbst gehostete Fonts via next/font (CSS-Variablen, kein Google-Request)
        sans: ['var(--font-text)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        logo: ['var(--font-display)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        container: '1180px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        marquee: 'marquee 42s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
