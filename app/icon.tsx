import { ImageResponse } from 'next/og'

// Favicon: Koralle-Kachel mit zwei Googly-Eyes (Markenpalette).
export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

const eye = (justify: 'flex-start' | 'flex-end' | 'center', align: 'flex-start' | 'flex-end' | 'center') => (
  <div
    style={{
      display: 'flex',
      width: 22,
      height: 22,
      borderRadius: 22,
      background: '#1A1A18',
      alignItems: align,
      justifyContent: justify,
      padding: 3,
    }}
  >
    <div style={{ width: 9, height: 9, borderRadius: 9, background: '#F2EEE4' }} />
  </div>
)

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          background: '#F2EEE4',
          borderRadius: 15,
        }}
      >
        {eye('flex-end', 'center')}
        {eye('center', 'flex-end')}
      </div>
    ),
    { ...size }
  )
}
