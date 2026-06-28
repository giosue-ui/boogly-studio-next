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
            <span className="font-medium text-base whitespace-nowrap px-[30px]" style={{ color: '#C4BEB2' }}>{topic}</span>
            <span className="w-[7px] h-[7px] rounded-full flex-none" style={{ background: '#FB4D26' }} />
          </span>
        ))}
      </div>
    </div>
  )
}
