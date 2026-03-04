import { getPayloadClient } from '@/lib/payload'
import { setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { notFound } from 'next/navigation'
import Link from 'next/link'

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

    return <ArticleContent article={article} locale={locale} />
  } catch {
    notFound()
  }
}

function ArticleContent({ article, locale }: { article: any; locale: string }) {
  const tArticles = useTranslations('articles')
  const tNav = useTranslations('nav')

  return (
    <div>
      {/* Dark header */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#153324' }}>
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Link
            href={`/${locale}/makaleler`}
            className="inline-flex items-center gap-2 text-sm mb-6 transition-colors hover:opacity-80"
            style={{ color: '#d4a853' }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 8H3M7 4l-4 4 4 4" />
            </svg>
            {tNav('articles')}
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <time className="text-sm" style={{ color: '#b8a78e' }}>
              {new Date(article.publishedAt).toLocaleDateString(locale)}
            </time>
            {article.isAutoTranslated && (
              <span
                className="text-xs font-medium px-2.5 py-1 rounded-full"
                style={{ backgroundColor: 'rgba(184, 92, 56, 0.15)', color: '#e8a07a' }}
              >
                {tArticles('autoTranslated')}
              </span>
            )}
            {article.source && (
              <span className="text-sm" style={{ color: '#9c8b72' }}>
                {tArticles('source')}: {article.source}
              </span>
            )}
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: '#f3efe8' }}
          >
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="mt-4 text-lg leading-relaxed" style={{ color: '#b8a78e' }}>
              {article.excerpt}
            </p>
          )}
        </div>

        {/* Mountain silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-12">
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0 48 L0 32 L180 18 L360 28 L540 8 L720 24 L900 12 L1080 30 L1260 16 L1440 26 L1440 48Z" fill="#fdfbf7" />
          </svg>
        </div>

        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(212, 168, 83, 0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </section>

      {/* Article body */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div
          className="prose prose-lg max-w-none"
          style={{ color: '#3f3730' }}
        >
          {/* Content will come from rich text editor */}
          <p style={{ color: '#7d6e59', fontStyle: 'italic' }}>
            {article.excerpt || ''}
          </p>
        </div>
      </div>
    </div>
  )
}
