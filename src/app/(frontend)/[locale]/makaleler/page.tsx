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
    <div style={{ background: '#faf8f4' }}>
      <PageHeader title={t('articles')} subtitle={tSite('description')} />

      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-12 sm:py-16">
        {articles.docs.length === 0 ? (
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
              <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1.5" rx="2" />
              <path d="M8 8h8M8 12h5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <p className="text-lg" style={{ color: '#6b5a4e' }}>{tArticles('noArticles')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.docs.map((article: any) => (
              <Link
                key={article.id}
                href={`/${locale}/makaleler/${article.slug}`}
                className="group rounded-lg overflow-hidden hover-lift transition-all duration-300"
                style={{
                  background: '#faf8f4',
                  border: '1px solid rgba(45,41,38,0.06)',
                }}
              >
                <div
                  className="h-48 sm:h-52 flex items-center justify-center relative overflow-hidden"
                  style={{ background: 'rgba(45,41,38,0.03)' }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ color: '#e8dcc8' }}>
                    <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1.5" rx="2" />
                    <path d="M8 8h8M8 12h5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%232d2926' stroke-width='0.5'/%3E%3C/svg%3E\")",
                      backgroundSize: '60px 60px',
                    }}
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-xs font-semibold tracking-wide uppercase"
                      style={{ color: '#a63d2f' }}
                    >
                      {tArticles('category')}
                    </span>
                    <span className="text-xs" style={{ color: '#a89279' }}>
                      {new Date(article.publishedAt).toLocaleDateString(locale)}
                    </span>
                  </div>
                  <h2
                    className="text-lg sm:text-xl leading-snug"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 600,
                      color: '#2d2926',
                    }}
                  >
                    {article.title}
                  </h2>
                  {article.excerpt && (
                    <p className="text-sm mt-2 line-clamp-2" style={{ color: '#6b5a4e' }}>
                      {article.excerpt}
                    </p>
                  )}
                  <div
                    className="mt-4 flex items-center gap-1 text-sm font-semibold tracking-wide"
                    style={{ color: '#a63d2f', fontFamily: "'Noto Sans', system-ui, sans-serif" }}
                  >
                    <span>{tArticles('readMore')}</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform group-hover:translate-x-1"
                    >
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
