const DEFAULT_TOPICS = [
  'Politik & Gesellschaft',
  'Dating & Beziehungen',
  'Geld & Karriere',
  'Glaube & Werte',
  'Ernährung & Lifestyle',
  'Feminismus & Gleichberechtigung',
  'Migration & Identität',
  'Generation & Alter',
  'Bildung & Zukunft',
]

export function Ticker({ topics }: { topics?: string[] }) {
  const list = topics?.length ? topics : DEFAULT_TOPICS
  // Zwei Durchläufe für nahtlose Endlosschleife
  const doubled = [...list, ...list]

  return (
    <div className="overflow-hidden py-[18px]" style={{ background: '#1A1A18', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex w-max items-center animate-marquee hover:[animation-play-state:paused]">
        {doubled.map((topic, i) => (
          <span key={i} className="flex items-center">
            <span
              className="font-mono font-medium text-sm uppercase tracking-[0.14em] whitespace-nowrap px-[30px]"
              style={{ color: '#9A948A' }}
            >
              {topic}
            </span>
            <span
              className="w-[7px] h-[7px] rounded-full flex-none"
              style={{ background: i % 2 === 0 ? '#2F55F0' : '#FB4D26' }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
