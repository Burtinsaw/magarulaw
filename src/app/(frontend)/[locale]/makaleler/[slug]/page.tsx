import { getPayloadClient } from '@/lib/payload'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'articles',
      locale: locale as any,
      where: { slug: { equals: slug } },
      limit: 1,
    })

    const article = result.docs[0]
    if (!article) notFound()

    return (
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
          <time>{new Date(article.publishedAt).toLocaleDateString(locale)}</time>
          {article.isAutoTranslated && (
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
              {"Otomatik \u00E7eviri"}
            </span>
          )}
          {article.source && <span>{"Kaynak: "}{article.source}</span>}
        </div>
        {article.excerpt && (
          <p className="text-lg text-gray-600 mb-8">{article.excerpt}</p>
        )}
      </article>
    )
  } catch {
    notFound()
  }
}
