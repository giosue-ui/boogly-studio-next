import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0c0c0c',
        surface: '#161616',
        'surface-2': '#1e1e1e',
        border: 'rgba(255,255,255,0.07)',
        'border-hover': 'rgba(255,255,255,0.15)',
        primary: '#f0ede8',
        secondary: 'rgba(240,237,232,0.6)',
        muted: 'rgba(240,237,232,0.35)',
        accent: '#c8f55a',
        'accent-hover': '#b8e84a',
        'accent-subtle': 'rgba(200,245,90,0.1)',
        'accent-border': 'rgba(200,245,90,0.25)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        logo: ['"Archivo Black"', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
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
      },
    },
  },
  plugins: [],
}

export default config
