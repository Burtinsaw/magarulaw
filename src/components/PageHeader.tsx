export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#153324' }}>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-10" style={{ backgroundColor: '#d4a853' }} />
          <svg width="16" height="16" viewBox="0 0 16 16" style={{ color: '#d4a853' }}>
            <path d="M8 1 L15 8 L8 15 L1 8 Z" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
          <div className="h-px w-10" style={{ backgroundColor: '#d4a853' }} />
        </div>
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: '#f3efe8' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-base sm:text-lg" style={{ color: '#b8a78e' }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Mountain silhouette at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-12">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0 48 L0 32 L180 18 L360 28 L540 8 L720 24 L900 12 L1080 30 L1260 16 L1440 26 L1440 48Z" fill="#fdfbf7" />
        </svg>
      </div>

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(212, 168, 83, 0.3) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />
    </section>
  )
}
