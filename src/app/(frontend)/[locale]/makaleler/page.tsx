import { getPayloadClient } from '@/lib/payload'
import { setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { PageHeader } from '@/components/PageHeader'

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
  const tSite = useTranslations('site')

  return (
    <div>
      <PageHeader title={t('articles')} subtitle={tSite('description')} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {articles.docs.length === 0 ? (
          <div
            className="text-center py-16 rounded-2xl"
            style={{ backgroundColor: '#f7f2e8', border: '1px solid #e8e0d4' }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="mx-auto mb-4" style={{ color: '#b8a78e' }}>
              <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1.5" rx="2" />
              <path d="M8 8h8M8 12h5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <p className="text-lg" style={{ color: '#7d6e59' }}>{tArticles('noArticles')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.docs.map((article: any) => (
              <Link
                key={article.id}
                href={`/${locale}/makaleler/${article.slug}`}
                className="group rounded-2xl overflow-hidden hover-lift border transition-all duration-300"
                style={{ backgroundColor: '#fff', borderColor: '#e8e0d4' }}
              >
                <div
                  className="h-48 sm:h-52 flex items-center justify-center relative overflow-hidden"
                  style={{ backgroundColor: '#f3efe8' }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ color: '#d4c8b5' }}>
                    <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1.5" rx="2" />
                    <path d="M8 8h8M8 12h5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, #153324 0px, #153324 1px, transparent 1px, transparent 20px)',
                  }} />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: '#b85c38' }}>
                      {tArticles('category')}
                    </span>
                    <span className="text-xs" style={{ color: '#9c8b72' }}>
                      {new Date(article.publishedAt).toLocaleDateString(locale)}
                    </span>
                  </div>
                  <h2
                    className="text-lg sm:text-xl leading-snug"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, color: '#2a2520' }}
                  >
                    {article.title}
                  </h2>
                  {article.excerpt && (
                    <p className="text-sm mt-2 line-clamp-2" style={{ color: '#7d6e59' }}>
                      {article.excerpt}
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium" style={{ color: '#2d5a3d' }}>
                    <span>{tArticles('readMore')}</span>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
