import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import Link from 'next/link'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return <HomeContent locale={locale} />
}

function HomeContent({ locale }: { locale: string }) {
  const t = useTranslations('home')
  const tSite = useTranslations('site')

  return (
    <div>
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className="relative overflow-hidden gradient-warm" style={{ margin: '-2rem -1rem 0', padding: '0' }}>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="max-w-3xl">
            {/* Decorative label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 max-w-12" style={{ backgroundColor: '#d4a853' }} />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: '#d4a853' }}
              >
                Dağıstan · Avar
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                color: '#f3efe8',
              }}
            >
              {tSite('tagline')}
            </h1>

            <p
              className="text-lg sm:text-xl leading-relaxed mb-10 max-w-xl"
              style={{ color: '#b8a78e' }}
            >
              {tSite('description')}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/makaleler`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300"
                style={{
                  backgroundColor: '#d4a853',
                  color: '#153324',
                }}
              >
                Keşfet
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
              <Link
                href={`/${locale}/sozluk`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300"
                style={{
                  border: '1px solid rgba(212, 168, 83, 0.3)',
                  color: '#d4a853',
                }}
              >
                Sözlük
              </Link>
            </div>
          </div>
        </div>

        {/* Mountain silhouette at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0 120 L0 80 L120 50 L240 70 L360 30 L480 55 L600 15 L720 50 L840 25 L960 60 L1080 35 L1200 65 L1320 40 L1440 75 L1440 120Z" fill="#fdfbf7" opacity="0.12" />
            <path d="M0 120 L0 90 L180 60 L320 78 L480 40 L640 68 L800 35 L960 72 L1120 45 L1280 70 L1440 55 L1440 120Z" fill="#fdfbf7" />
          </svg>
        </div>

        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(212, 168, 83, 0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
      </section>

      {/* ═══════════════ CONTENT AREA ═══════════════ */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ─── News + Word of Day Grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 sm:mt-16">

          {/* Latest News */}
          <section className="lg:col-span-2 animate-fade-up">
            <SectionHeader title={t('latestNews')} />
            <div className="space-y-4">
              {[
                { title: 'Dağıstan\'da kültürel festival hazırlıkları', date: '4 Mart 2026', tag: 'Kültür' },
                { title: 'Avarca eğitim programı genişliyor', date: '3 Mart 2026', tag: 'Eğitim' },
                { title: 'Gunib Kalesi restorasyon çalışmaları', date: '2 Mart 2026', tag: 'Tarih' },
              ].map((item, i) => (
                <article
                  key={i}
                  className="group flex gap-5 p-4 rounded-xl transition-all duration-300 cursor-pointer hover-lift"
                  style={{ backgroundColor: '#f7f2e8', border: '1px solid transparent' }}
                  onMouseEnter={(e: any) => {
                    e.currentTarget.style.backgroundColor = '#fff'
                    e.currentTarget.style.borderColor = '#e8e0d4'
                  }}
                  onMouseLeave={(e: any) => {
                    e.currentTarget.style.backgroundColor = '#f7f2e8'
                    e.currentTarget.style.borderColor = 'transparent'
                  }}
                >
                  {/* Placeholder image */}
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: '#e8e0d4' }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: '#b8a78e' }}>
                      <path d="M4 16l4-4 4 4 4-8 4 4" stroke="currentColor" strokeWidth="1.5" />
                      <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: 'rgba(45, 90, 61, 0.08)', color: '#2d5a3d' }}
                      >
                        {item.tag}
                      </span>
                      <span className="text-xs" style={{ color: '#9c8b72' }}>{item.date}</span>
                    </div>
                    <h3
                      className="text-base sm:text-lg font-semibold leading-snug"
                      style={{ color: '#2a2520' }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm mt-1 line-clamp-2" style={{ color: '#7d6e59' }}>
                      Bu haberin içeriği yakında eklenecektir. Takipte kalın.
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Word of the Day */}
          <section className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <SectionHeader title={t('wordOfTheDay')} />
            <div
              className="relative rounded-2xl overflow-hidden p-6 sm:p-8"
              style={{
                background: 'linear-gradient(160deg, #153324 0%, #1e4430 60%, #0d2218 100%)',
              }}
            >
              {/* Decorative diamond */}
              <div className="absolute top-4 right-4 opacity-10">
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <path d="M30 0 L60 30 L30 60 L0 30 Z" stroke="#d4a853" strokeWidth="1" fill="none" />
                  <path d="M30 10 L50 30 L30 50 L10 30 Z" stroke="#d4a853" strokeWidth="0.5" fill="none" />
                </svg>
              </div>

              <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#d4a853' }}>
                Авар мацӀ
              </p>

              <p
                className="text-4xl sm:text-5xl mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: '#f3efe8' }}
              >
                Росдал
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'rgba(212, 168, 83, 0.15)', color: '#d4a853' }}>
                  Köy
                </span>
                <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: '#b8a78e' }}>
                  Village
                </span>
                <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: '#b8a78e' }}>
                  Село
                </span>
              </div>

              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderLeft: '3px solid #d4a853' }}
              >
                <p
                  className="text-base italic mb-1"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#e8e0d4' }}
                >
                  &ldquo;Дир росдал гъоркьаб рукъ буго&rdquo;
                </p>
                <p className="text-sm" style={{ color: '#9c8b72' }}>
                  &ldquo;Benim köyümde güzel bir ev var&rdquo;
                </p>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(212, 168, 83, 0.15)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#d4a853">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>
                <span className="text-xs" style={{ color: '#9c8b72' }}>Telaffuzu dinle</span>
              </div>
            </div>
          </section>
        </div>

        {/* ─── Articles Section ─── */}
        <section className="mt-16 sm:mt-20 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <SectionHeader title={t('latestArticles')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Avar Halısının Geometrik Sırları', category: 'Kültür', image: '🏔' },
              { title: 'Dağıstan\'ın Kadim Dilleri', category: 'Dil', image: '📜' },
              { title: 'Gunib: Tarihin Zirvesi', category: 'Tarih', image: '⛰' },
            ].map((item, i) => (
              <article
                key={i}
                className="group rounded-2xl overflow-hidden hover-lift cursor-pointer"
                style={{ backgroundColor: '#fff', border: '1px solid #e8e0d4' }}
              >
                {/* Image placeholder */}
                <div
                  className="h-48 sm:h-52 flex items-center justify-center text-5xl relative overflow-hidden"
                  style={{ backgroundColor: '#f3efe8' }}
                >
                  <span>{item.image}</span>
                  {/* Geometric overlay pattern */}
                  <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, #153324 0px, #153324 1px, transparent 1px, transparent 20px)`,
                  }} />
                </div>
                <div className="p-5 sm:p-6">
                  <span
                    className="text-xs font-semibold tracking-wide uppercase"
                    style={{ color: '#b85c38' }}
                  >
                    {item.category}
                  </span>
                  <h3
                    className="text-lg sm:text-xl mt-2 leading-snug"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, color: '#2a2520' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm mt-2 leading-relaxed" style={{ color: '#7d6e59' }}>
                    Yakında detaylı içerik eklenecektir...
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium" style={{ color: '#2d5a3d' }}>
                    <span>Devamını oku</span>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ─── Gallery Section ─── */}
        <section className="mt-16 sm:mt-20 mb-12 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <SectionHeader title={t('photoGallery')} />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: 'Dağ Manzarası', emoji: '🏔️' },
              { label: 'Avar Halısı', emoji: '🪡' },
              { label: 'Kadim Köy', emoji: '🏘️' },
              { label: 'Geleneksel Dans', emoji: '💃' },
              { label: 'Gunib Kalesi', emoji: '🏰' },
              { label: 'Yemek Kültürü', emoji: '🫓' },
              { label: 'El Sanatları', emoji: '🏺' },
              { label: 'Doğa', emoji: '🌿' },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
                style={{ backgroundColor: '#f3efe8' }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-4xl sm:text-5xl">
                  {item.emoji}
                </div>
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex items-end p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(13, 34, 24, 0.8) 0%, transparent 60%)' }}
                >
                  <span className="text-xs sm:text-sm font-medium" style={{ color: '#f3efe8' }}>
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Cultural Quote Banner ─── */}
        <section
          className="relative rounded-2xl overflow-hidden p-8 sm:p-12 mb-16 text-center"
          style={{ backgroundColor: '#f7f2e8', border: '1px solid #e8e0d4' }}
        >
          <div className="avar-pattern h-5 absolute top-0 left-0 right-0 opacity-40" />
          <div className="relative z-10">
            <svg width="32" height="32" viewBox="0 0 32 32" className="mx-auto mb-4" style={{ color: '#d4a853' }}>
              <path d="M16 2 L30 16 L16 30 L2 16 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M16 8 L24 16 L16 24 L8 16 Z" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
            </svg>
            <blockquote
              className="text-2xl sm:text-3xl lg:text-4xl mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 500, fontStyle: 'italic', color: '#2a2520' }}
            >
              &ldquo;Гьалмагъ — вацасан кьолаб&rdquo;
            </blockquote>
            <p className="text-base sm:text-lg" style={{ color: '#7d6e59' }}>
              &ldquo;Dost — kardeşten yakındır&rdquo;
            </p>
            <p className="text-sm mt-2" style={{ color: '#9c8b72' }}>
              — Avar atasözü
            </p>
          </div>
          <div className="avar-pattern h-5 absolute bottom-0 left-0 right-0 opacity-40" />
        </section>

      </div>
    </div>
  )
}

/* ─── Reusable section header ─── */
function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <h2
        className="text-xl sm:text-2xl"
        style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: '#2a2520' }}
      >
        {title}
      </h2>
      <div className="flex-1 h-px" style={{ backgroundColor: '#e8e0d4' }} />
    </div>
  )
}
