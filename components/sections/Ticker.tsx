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
    <div className="overflow-hidden py-[18px]" style={{ background: 'var(--carbon)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="flex w-max items-center animate-marquee hover:[animation-play-state:paused]">
        {doubled.map((topic, i) => (
          <span key={i} className="flex items-center">
            <span className="text-muted font-medium text-base whitespace-nowrap px-[30px]">{topic}</span>
            <span className="w-[7px] h-[7px] rounded-full bg-white flex-none" />
          </span>
        ))}
      </div>
    </div>
  )
}
