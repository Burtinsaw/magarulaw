export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden" style={{ background: '#1a1714' }}>
      {/* Kilim strip top border */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{
          background:
            'repeating-linear-gradient(90deg, #a63d2f 0px, #a63d2f 12px, #c5973e 12px, #c5973e 16px, #2c5282 16px, #2c5282 28px, #c5973e 28px, #c5973e 32px)',
        }}
      />

      {/* Radial gradient overlays */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(30,58,95,0.4) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(122,31,31,0.25) 0%, transparent 50%)',
        }}
      />

      <div
        className="relative z-10 mx-auto max-w-[1320px] px-6 lg:px-10 py-16 sm:py-20"
        style={{ paddingTop: 'calc(72px + 3rem)' }}
      >
        <div className="flex items-center gap-3 mb-5">
          <span className="w-10 h-px" style={{ background: '#c5973e' }} />
          <svg width="14" height="14" viewBox="0 0 16 16" style={{ color: '#c5973e' }}>
            <path d="M8 1 L15 8 L8 15 L1 8 Z" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
          <span className="w-10 h-px" style={{ background: '#c5973e' }} />
        </div>
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            color: '#f5f0e6',
            lineHeight: 1.15,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-3 text-base sm:text-lg max-w-[560px]"
            style={{ color: '#a89279', fontFamily: "'Source Serif 4', serif", lineHeight: 1.7 }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Mountain silhouette at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-12">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0 48 L0 32 L180 18 L360 28 L540 8 L720 24 L900 12 L1080 30 L1260 16 L1440 26 L1440 48Z"
            fill="#faf8f4"
          />
        </svg>
      </div>

      {/* Diamond pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23c5973e' stroke-width='0.5'/%3E%3C/svg%3E\")",
          backgroundSize: '60px 60px',
        }}
      />
    </section>
  )
}
