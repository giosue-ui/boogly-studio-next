/** @type {import('next').NextConfig} */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.boogly.studio'

// Strenge CSP für die öffentliche Website.
// (Next.js braucht 'unsafe-inline' für Bootstrap-/Flight-Skripte; kein 'unsafe-eval'.)
const siteCSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: https://cdn.sanity.io",
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self' https://*.sanity.io https://*.apicdn.sanity.io",
  "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
  'upgrade-insecure-requests',
].join('; ')

// Permissive CSP nur für das Sanity-Studio (braucht eval/blob/websocket).
const studioCSP = [
  "default-src 'self' https: data: blob:",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: blob:",
  "style-src 'self' 'unsafe-inline' https:",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https:",
  "connect-src 'self' https: wss: data: blob:",
  "worker-src 'self' blob:",
  "frame-src 'self' https:",
  "frame-ancestors 'none'",
].join('; ')

const baseSecurityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-DNS-Prefetch-Control', value: 'off' },
]

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  poweredByHeader: false,
  async headers() {
    return [
      // Basis-Security-Header für ALLE Pfade (inkl. /studio)
      {
        source: '/(.*)',
        headers: baseSecurityHeaders,
      },
      // Strenge CSP für alles AUSSER dem Studio
      {
        source: '/((?!studio).*)',
        headers: [{ key: 'Content-Security-Policy', value: siteCSP }],
      },
      // Permissive CSP nur fürs Studio
      {
        source: '/studio/:path*',
        headers: [{ key: 'Content-Security-Policy', value: studioCSP }],
      },
      // CORS nur für die API — auf die kanonische Domain begrenzt
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: SITE_URL },
          { key: 'Access-Control-Allow-Methods', value: 'POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ]
  },
}

export default nextConfig
