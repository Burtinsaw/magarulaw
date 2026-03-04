import { getPayloadClient } from '@/lib/payload'
import { setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  let articles: any = { docs: [] }
  try {
    const payload = await getPayloadClient()
    articles = await payload.find({
      collection: 'articles',
      locale: locale as any,
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 20,
    })
  } catch {
    // DB might not be available
  }

  return <ArticlesContent articles={articles} locale={locale} />
}

function ArticlesContent({ articles, locale }: { articles: any; locale: string }) {
  const t = useTranslations('nav')
  const tArticles = useTranslations('articles')

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{t('articles')}</h1>
      {articles.docs.length === 0 ? (
        <p className="text-gray-500">{"Hen\u00FCz makale yok. / No articles yet."}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.docs.map((article: any) => (
            <Link
              key={article.id}
              href={`/${locale}/makaleler/${article.slug}`}
              className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gray-200" />
              <div className="p-4">
                <h2 className="font-semibold text-lg">{article.title}</h2>
                {article.excerpt && (
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">{article.excerpt}</p>
                )}
                <p className="text-gray-400 text-xs mt-2">
                  {new Date(article.publishedAt).toLocaleDateString(locale)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
