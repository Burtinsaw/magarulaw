import { getPayloadClient } from '@/lib/payload'
import { setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { PageHeader } from '@/components/PageHeader'

export default async function DictionaryPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  let words: any = { docs: [] }
  try {
    const payload = await getPayloadClient()
    words = await payload.find({
      collection: 'dictionary',
      limit: 100,
      sort: 'wordAvar',
    })
  } catch {
    // DB might not be available
  }

  return <DictionaryContent words={words} />
}

function DictionaryContent({ words }: { words: any }) {
  const t = useTranslations('dictionary')
  const tNav = useTranslations('nav')

  return (
    <div>
      <PageHeader title={tNav('dictionary')} subtitle="Авар мацӀ — Avar Dili" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Search bar */}
        <div className="mb-8">
          <div className="relative max-w-lg">
            <svg
              width="20" height="20" viewBox="0 0 24 24" fill="none"
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: '#9c8b72' }}
            >
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <input
              type="text"
              placeholder={t('search')}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm transition-colors focus:outline-none"
              style={{
                backgroundColor: '#f7f2e8',
                border: '2px solid #e8e0d4',
                color: '#2a2520',
              }}
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[t('allWords'), 'Günlük', 'Doğa', 'Aile', 'Yemek'].map((cat, i) => (
            <button
              key={cat}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={i === 0 ? {
                backgroundColor: '#153324',
                color: '#d4a853',
              } : {
                backgroundColor: '#f7f2e8',
                color: '#5e5243',
                border: '1px solid #e8e0d4',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {words.docs.length === 0 ? (
          <div
            className="text-center py-16 rounded-2xl"
            style={{ backgroundColor: '#f7f2e8', border: '1px solid #e8e0d4' }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="mx-auto mb-4" style={{ color: '#b8a78e' }}>
              <path d="M4 19V5a2 2 0 012-2h8l6 6v10a2 2 0 01-2 2H6a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M14 3v6h6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <p className="text-lg" style={{ color: '#7d6e59' }}>Sözlük henüz boş.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {words.docs.map((word: any) => (
              <div
                key={word.id}
                className="rounded-xl p-5 transition-all duration-200 border border-transparent hover:border-[#e8e0d4] hover:bg-white"
                style={{ backgroundColor: '#f7f2e8' }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className="text-2xl"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: '#153324' }}
                      >
                        {word.wordAvar}
                      </span>
                      {word.pronunciation && (
                        <span className="text-sm" style={{ color: '#9c8b72' }}>[{word.pronunciation}]</span>
                      )}
                      {word.partOfSpeech && (
                        <span
                          className="text-xs font-medium px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: 'rgba(45, 90, 61, 0.08)', color: '#2d5a3d' }}
                        >
                          {word.partOfSpeech}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Translations */}
                <div className="mt-3 flex flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: '#9c8b72' }}>{t('turkish')}:</span>
                    <span className="text-sm font-medium" style={{ color: '#3f3730' }}>{word.wordTurkish}</span>
                  </div>
                  {word.wordRussian && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: '#9c8b72' }}>{t('russian')}:</span>
                      <span className="text-sm font-medium" style={{ color: '#3f3730' }}>{word.wordRussian}</span>
                    </div>
                  )}
                  {word.wordEnglish && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: '#9c8b72' }}>{t('english')}:</span>
                      <span className="text-sm font-medium" style={{ color: '#3f3730' }}>{word.wordEnglish}</span>
                    </div>
                  )}
                </div>

                {/* Example sentence */}
                {word.exampleAvar && (
                  <div
                    className="mt-3 rounded-lg p-3"
                    style={{ backgroundColor: 'rgba(21, 51, 36, 0.04)', borderLeft: '3px solid #d4a853' }}
                  >
                    <p
                      className="text-sm italic"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#3f3730' }}
                    >
                      &ldquo;{word.exampleAvar}&rdquo;
                    </p>
                    {word.exampleTurkish && (
                      <p className="text-xs mt-1" style={{ color: '#9c8b72' }}>
                        &ldquo;{word.exampleTurkish}&rdquo;
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
