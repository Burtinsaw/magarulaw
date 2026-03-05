import { getPayloadClient } from '@/lib/payload'
import { setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { PageHeader } from '@/components/PageHeader'

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
  const tNews = useTranslations('news')
  const tSite = useTranslations('site')

  return (
    <div style={{ background: '#faf8f4' }}>
      <PageHeader title={t('news')} subtitle={tSite('description')} />

      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-12 sm:py-16">
        {news.docs.length === 0 ? (
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
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
              <path d="M7 8h10M7 12h6M7 16h8" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <p className="text-lg" style={{ color: '#6b5a4e' }}>{tNews('noNews')}</p>
          </div>
        ) : (
          <div className="space-y-5">
            {news.docs.map((article: any) => (
              <article
                key={article.id}
                className="group rounded-lg p-5 sm:p-6 transition-all duration-300 hover-lift"
                style={{
                  background: 'rgba(45,41,38,0.02)',
                  border: '1px solid rgba(45,41,38,0.06)',
                }}
              >
                <div className="flex gap-5">
                  <div
                    className="w-20 h-20 sm:w-28 sm:h-28 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ background: 'rgba(166,61,47,0.06)' }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: '#a63d2f' }}>
                      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M7 8h10M7 12h6M7 16h8" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs" style={{ color: '#a89279' }}>
                        {new Date(article.publishedAt).toLocaleDateString(locale)}
                      </span>
                      {article.isAutoTranslated && (
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(166,61,47,0.08)', color: '#a63d2f' }}
                        >
                          {tNews('autoTranslated')}
                        </span>
                      )}
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
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
