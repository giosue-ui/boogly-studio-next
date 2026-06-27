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
        // Flächen
        background: '#0E0E12', // ink
        surface: '#16161C', // carbon
        'surface-2': '#1F1F28',
        border: '#2B2B36', // line
        'border-hover': '#39394A',
        // Text
        primary: '#F4F2EC', // paper
        secondary: '#B9B9C2', // body
        muted: '#9A9AA6', // mist
        dim: '#6E6E7A',
        // Primärfarbe Blau
        accent: '#3B6EF6', // blue
        'accent-hover': '#2F5FE0',
        'accent-deep': '#1C3AA8',
        'accent-tint': '#8FB0FF', // blue-tint
        'accent-subtle': 'rgba(59,110,246,0.10)',
        'accent-border': 'rgba(59,110,246,0.25)',
        // Akzent Grün (CTA / Tape)
        green: '#54D98C',
        'green-ink': '#08361F',
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
