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
        // Flächen (helles Theme)
        background: '#F2EEE4', // creme
        surface: '#FCFAF4', // warmes Weiß (Karten)
        'surface-2': '#FFFFFF',
        border: '#E3DCCC',
        'border-hover': '#CFC6B2',
        // Text (dunkel dominant)
        primary: '#1A1A18',
        secondary: '#555049',
        muted: '#837E73',
        dim: '#9A948A',
        // Akzent = Koralle (sparsam)
        accent: '#FB4D26',
        'accent-hover': '#E63E18',
        'accent-deep': '#C2350F',
        'accent-tint': '#FF8A6B',
        'accent-subtle': 'rgba(251,77,38,0.10)',
        'accent-border': 'rgba(251,77,38,0.22)',
        // 'green' = ebenfalls Koralle (Name bleibt, für CTA / Tape)
        green: '#FB4D26',
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
