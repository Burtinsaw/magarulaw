import { getPayloadClient } from '@/lib/payload'
import { setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  let news: any = { docs: [] }
  try {
    const payload = await getPayloadClient()
    news = await payload.find({
      collection: 'articles',
      locale: locale as any,
      where: {
        status: { equals: 'published' },
      },
      sort: '-publishedAt',
      limit: 20,
    })
  } catch {
    // DB might not be available
  }

  return <NewsContent news={news} locale={locale} />
}

function NewsContent({ news, locale }: { news: any; locale: string }) {
  const t = useTranslations('nav')

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{t('news')}</h1>
      {news.docs.length === 0 ? (
        <p className="text-gray-500">{"Hen\u00FCz haber yok. / No news yet."}</p>
      ) : (
        <div className="space-y-6">
          {news.docs.map((article: any) => (
            <article key={article.id} className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-gray-500 text-sm mt-1">
                {new Date(article.publishedAt).toLocaleDateString(locale)}
              </p>
              {article.excerpt && (
                <p className="text-gray-700 mt-2">{article.excerpt}</p>
              )}
              {article.isAutoTranslated && (
                <span className="inline-block mt-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  {"Otomatik \u00E7eviri"}
                </span>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
