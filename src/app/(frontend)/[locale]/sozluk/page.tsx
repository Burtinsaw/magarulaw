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
    <div style={{ background: '#faf8f4' }}>
      <PageHeader title={tNav('dictionary')} subtitle="Авар мацӀ — Avar Dili" />

      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-12 sm:py-16">
        {/* Search bar */}
        <div className="mb-8">
          <div className="relative max-w-lg">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: '#a89279' }}
            >
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <input
              type="text"
              placeholder={t('search')}
              className="w-full pl-12 pr-4 py-3.5 rounded-lg text-sm transition-colors focus:outline-none"
              style={{
                background: 'rgba(45,41,38,0.03)',
                border: '1.5px solid rgba(45,41,38,0.08)',
                color: '#2d2926',
                fontFamily: "'Source Serif 4', serif",
              }}
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[t('allWords'), 'Gunluk', 'Doga', 'Aile', 'Yemek'].map((cat, i) => (
            <button
              key={cat}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={
                i === 0
                  ? { background: '#2d2926', color: '#ddb866' }
                  : {
                      background: 'rgba(45,41,38,0.03)',
                      color: '#6b5a4e',
                      border: '1px solid rgba(45,41,38,0.08)',
                    }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {words.docs.length === 0 ? (
          <div
            className="text-center py-16 rounded-lg"
            style={{ background: 'rgba(45,41,38,0.02)', border: '1px solid rgba(45,41,38,0.06)' }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              className="mx-auto mb-4"
              style={{ color: '#a89279' }}
            >
              <path
                d="M4 19V5a2 2 0 012-2h8l6 6v10a2 2 0 01-2 2H6a2 2 0 01-2-2z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="M14 3v6h6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <p className="text-lg" style={{ color: '#6b5a4e' }}>Sozluk henuz bos.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {words.docs.map((word: any) => (
              <div
                key={word.id}
                className="rounded-lg p-5 transition-all duration-200 hover:translate-y-[-2px]"
                style={{
                  background: 'rgba(45,41,38,0.02)',
                  border: '1px solid rgba(45,41,38,0.06)',
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className="text-2xl"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontWeight: 700,
                          color: '#2d2926',
                        }}
                      >
                        {word.wordAvar}
                      </span>
                      {word.pronunciation && (
                        <span className="text-sm" style={{ color: '#a89279' }}>
                          [{word.pronunciation}]
                        </span>
                      )}
                      {word.partOfSpeech && (
                        <span
                          className="text-xs font-medium px-2.5 py-1 rounded-full"
                          style={{ background: 'rgba(166,61,47,0.06)', color: '#a63d2f' }}
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
                    <span
                      className="text-xs font-semibold tracking-wide uppercase"
                      style={{ color: '#a89279' }}
                    >
                      {t('turkish')}:
                    </span>
                    <span className="text-sm font-medium" style={{ color: '#2d2926' }}>
                      {word.wordTurkish}
                    </span>
                  </div>
                  {word.wordRussian && (
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-semibold tracking-wide uppercase"
                        style={{ color: '#a89279' }}
                      >
                        {t('russian')}:
                      </span>
                      <span className="text-sm font-medium" style={{ color: '#2d2926' }}>
                        {word.wordRussian}
                      </span>
                    </div>
                  )}
                  {word.wordEnglish && (
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-semibold tracking-wide uppercase"
                        style={{ color: '#a89279' }}
                      >
                        {t('english')}:
                      </span>
                      <span className="text-sm font-medium" style={{ color: '#2d2926' }}>
                        {word.wordEnglish}
                      </span>
                    </div>
                  )}
                </div>

                {/* Example sentence */}
                {word.exampleAvar && (
                  <div
                    className="mt-3 rounded-lg p-3"
                    style={{
                      background: 'rgba(197,151,62,0.04)',
                      borderLeft: '3px solid #c5973e',
                    }}
                  >
                    <p
                      className="text-sm italic"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        color: '#2d2926',
                      }}
                    >
                      &ldquo;{word.exampleAvar}&rdquo;
                    </p>
                    {word.exampleTurkish && (
                      <p className="text-xs mt-1" style={{ color: '#a89279' }}>
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
