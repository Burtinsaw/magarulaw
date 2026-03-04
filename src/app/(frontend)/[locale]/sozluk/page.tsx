import { getPayloadClient } from '@/lib/payload'
import { setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'

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
      <h1 className="text-3xl font-bold mb-8">{tNav('dictionary')}</h1>

      <div className="mb-8">
        <input
          type="text"
          placeholder={t('search')}
          className="w-full max-w-md px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none"
        />
      </div>

      {words.docs.length === 0 ? (
        <p className="text-gray-500">{"S\u00F6zl\u00FCk hen\u00FCz bo\u015F. / Dictionary is empty."}</p>
      ) : (
        <div className="space-y-3">
          {words.docs.map((word: any) => (
            <div key={word.id} className="border rounded-lg p-4 hover:bg-emerald-50 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xl font-bold text-emerald-800">{word.wordAvar}</span>
                  {word.pronunciation && (
                    <span className="text-gray-400 text-sm ml-2">[{word.pronunciation}]</span>
                  )}
                  {word.partOfSpeech && (
                    <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      {word.partOfSpeech}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                <div><span className="text-gray-400">{t('turkish')}:</span> {word.wordTurkish}</div>
                {word.wordRussian && <div><span className="text-gray-400">{t('russian')}:</span> {word.wordRussian}</div>}
                {word.wordEnglish && <div><span className="text-gray-400">{t('english')}:</span> {word.wordEnglish}</div>}
              </div>
              {word.exampleAvar && (
                <div className="mt-2 text-sm text-gray-600 italic">
                  &quot;{word.exampleAvar}&quot; — &quot;{word.exampleTurkish}&quot;
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
