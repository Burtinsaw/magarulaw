import { setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { PageHeader } from '@/components/PageHeader'

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return <AboutContent />
}

function AboutContent() {
  const t = useTranslations('about')

  return (
    <div>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* Stats bar */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 sm:mb-16 rounded-2xl p-6 sm:p-8"
          style={{ backgroundColor: '#153324' }}
        >
          {(['population', 'language', 'region', 'diaspora'] as const).map((key) => (
            <div key={key} className="text-center">
              <p
                className="text-2xl sm:text-3xl mb-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: '#d4a853' }}
              >
                {t(`stats.${key}`)}
              </p>
              <p className="text-xs sm:text-sm" style={{ color: '#b8a78e' }}>
                {t(`stats.${key}Label`)}
              </p>
            </div>
          ))}
        </div>

        {/* Content sections */}
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Intro */}
          <p
            className="text-lg sm:text-xl leading-relaxed"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#3f3730' }}
          >
            {t('intro')}
          </p>

          {/* Mission */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(212, 168, 83, 0.12)' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" style={{ color: '#d4a853' }}>
                  <path d="M8 1 L15 8 L8 15 L1 8 Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
                </svg>
              </div>
              <h2
                className="text-xl sm:text-2xl"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: '#2a2520' }}
              >
                {t('missionTitle')}
              </h2>
            </div>
            <p className="leading-relaxed" style={{ color: '#5e5243' }}>
              {t('mission')}
            </p>
          </section>

          {/* About Avar People */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(45, 90, 61, 0.08)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: '#2d5a3d' }}>
                  <path d="M12 2L20 18H4L12 2Z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <h2
                className="text-xl sm:text-2xl"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: '#2a2520' }}
              >
                {t('peopleTitle')}
              </h2>
            </div>
            <p className="leading-relaxed" style={{ color: '#5e5243' }}>
              {t('people')}
            </p>
          </section>

          {/* Contribute */}
          <section
            className="rounded-2xl p-6 sm:p-8"
            style={{ backgroundColor: '#f7f2e8', border: '1px solid #e8e0d4' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(184, 92, 56, 0.1)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: '#b85c38' }}>
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <h2
                className="text-xl sm:text-2xl"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: '#2a2520' }}
              >
                {t('contributeTitle')}
              </h2>
            </div>
            <p className="leading-relaxed" style={{ color: '#5e5243' }}>
              {t('contribute')}
            </p>
          </section>

          {/* Avar proverb */}
          <div className="text-center py-8">
            <svg width="24" height="24" viewBox="0 0 24 24" className="mx-auto mb-3" style={{ color: '#d4a853' }}>
              <path d="M12 2 L22 12 L12 22 L2 12 Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
              <path d="M12 6 L18 12 L12 18 L6 12 Z" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.5" />
            </svg>
            <blockquote
              className="text-xl sm:text-2xl mb-2"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 500, fontStyle: 'italic', color: '#2a2520' }}
            >
              &ldquo;МацӀ — халкъалъул рухӀ&rdquo;
            </blockquote>
            <p className="text-sm" style={{ color: '#9c8b72' }}>
              &ldquo;Dil — halkın ruhudur&rdquo; — Avar atasözü
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
