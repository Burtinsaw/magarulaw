export function SectionHeader({
  label,
  title,
  titleAccent,
  dark = false,
}: {
  label: string
  title: string
  titleAccent?: string
  dark?: boolean
}) {
  return (
    <div className="mb-10 reveal">
      <div
        className="flex items-center gap-2 mb-2 text-[0.7rem] font-semibold tracking-[0.18em] uppercase"
        style={{
          fontFamily: "'Noto Sans', system-ui, sans-serif",
          color: dark ? '#ddb866' : '#a63d2f',
        }}
      >
        <span
          className="w-6 h-[2px]"
          style={{ background: dark ? '#ddb866' : '#a63d2f' }}
        />
        {label}
      </div>
      <h2
        className="leading-[1.15] tracking-[-0.01em]"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 700,
          fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
          color: dark ? '#f5f0e6' : '#2d2926',
        }}
      >
        {title}{' '}
        {titleAccent && (
          <em style={{ color: dark ? '#ddb866' : '#a63d2f' }}>{titleAccent}</em>
        )}
      </h2>
    </div>
  )
}
