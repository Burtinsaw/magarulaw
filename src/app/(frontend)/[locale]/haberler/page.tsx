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
    <div>
      <PageHeader title={t('news')} subtitle={tSite('description')} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {news.docs.length === 0 ? (
          <div
            className="text-center py-16 rounded-2xl"
            style={{ backgroundColor: '#f7f2e8', border: '1px solid #e8e0d4' }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="mx-auto mb-4" style={{ color: '#b8a78e' }}>
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
              <path d="M7 8h10M7 12h6M7 16h8" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <p className="text-lg" style={{ color: '#7d6e59' }}>{tNews('noNews')}</p>
          </div>
        ) : (
          <div className="space-y-5">
            {news.docs.map((article: any) => (
              <article
                key={article.id}
                className="group rounded-xl p-5 sm:p-6 transition-all duration-300 hover-lift border border-transparent hover:border-[#e8e0d4] hover:bg-white"
                style={{ backgroundColor: '#f7f2e8' }}
              >
                <div className="flex gap-5">
                  <div
                    className="w-20 h-20 sm:w-28 sm:h-28 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: '#e8e0d4' }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: '#9c8b72' }}>
                      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M7 8h10M7 12h6M7 16h8" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs" style={{ color: '#9c8b72' }}>
                        {new Date(article.publishedAt).toLocaleDateString(locale)}
                      </span>
                      {article.isAutoTranslated && (
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: 'rgba(184, 92, 56, 0.1)', color: '#b85c38' }}
                        >
                          {tNews('autoTranslated')}
                        </span>
                      )}
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
