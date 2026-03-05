import { type ReactNode } from 'react'

const accentColors = [
  { bar: '#a63d2f', iconBg: 'rgba(166,61,47,0.08)', iconColor: '#a63d2f' },
  { bar: '#2c5282', iconBg: 'rgba(44,82,130,0.08)', iconColor: '#2c5282' },
  { bar: '#2d6a4f', iconBg: 'rgba(45,106,79,0.08)', iconColor: '#2d6a4f' },
  { bar: '#c5973e', iconBg: 'rgba(197,151,62,0.08)', iconColor: '#c5973e' },
  { bar: '#c4593e', iconBg: 'rgba(196,89,62,0.08)', iconColor: '#c4593e' },
  { bar: '#4a7ab5', iconBg: 'rgba(74,122,181,0.08)', iconColor: '#4a7ab5' },
]

export function FeatureCard({
  index, icon, title, description, linkText, href,
}: {
  index: number; icon: ReactNode; title: string; description: string; linkText: string; href: string
}) {
  const accent = accentColors[index % accentColors.length]
  return (
    <div className="reveal group relative rounded-md p-6 lg:p-8 overflow-hidden border transition-all duration-300 cursor-pointer hover:-translate-y-1.5 hover:shadow-lg" style={{ background: '#faf8f4', borderColor: 'rgba(45,41,38,0.06)' }}>
      <div className="absolute top-0 left-0 w-[3px] h-0 group-hover:h-full transition-all duration-400" style={{ background: accent.bar }} />
      <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5" style={{ background: accent.iconBg, color: accent.iconColor }}>{icon}</div>
      <h3 className="text-[1.2rem] mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: '#2d2926' }}>{title}</h3>
      <p className="text-[0.92rem] leading-[1.7]" style={{ color: '#6b5a4e' }}>{description}</p>
      <a href={href} className="inline-flex items-center gap-1.5 mt-4 text-[0.78rem] font-semibold tracking-[0.04em] group-hover:gap-2.5 transition-all duration-300" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif", color: '#a63d2f' }}>
        {linkText}
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </a>
    </div>
  )
}
