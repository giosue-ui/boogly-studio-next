import { ImageResponse } from 'next/og'

// Apple-Touch-Icon (iOS Homescreen): Koralle-Kachel mit Googly-Eyes.
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

const eye = (justify: 'flex-start' | 'flex-end' | 'center', align: 'flex-start' | 'flex-end' | 'center') => (
  <div
    style={{
      display: 'flex',
      width: 60,
      height: 60,
      borderRadius: 60,
      background: '#1A1A18',
      alignItems: align,
      justifyContent: justify,
      padding: 9,
    }}
  >
    <div style={{ width: 25, height: 25, borderRadius: 25, background: '#FB4D26' }} />
  </div>
)

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          background: '#FB4D26',
          borderRadius: 40,
        }}
      >
        {eye('flex-end', 'center')}
        {eye('center', 'flex-end')}
      </div>
    ),
    { ...size }
  )
}
