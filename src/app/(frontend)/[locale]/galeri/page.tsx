import { getPayloadClient } from '@/lib/payload'
import { setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { PageHeader } from '@/components/PageHeader'

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  let galleries: any = { docs: [] }
  try {
    const payload = await getPayloadClient()
    galleries = await payload.find({
      collection: 'gallery',
      locale: locale as any,
      limit: 20,
      sort: '-createdAt',
    })
  } catch {
    // DB might not be available
  }

  return <GalleryContent galleries={galleries} />
}

function GalleryContent({ galleries }: { galleries: any }) {
  const t = useTranslations('nav')
  const tGallery = useTranslations('gallery')

  return (
    <div style={{ background: '#faf8f4' }}>
      <PageHeader title={t('gallery')} subtitle="Дагъистан · Avaristán · Dagestan" />

      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-12 sm:py-16">
        {galleries.docs.length === 0 ? (
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
              <circle cx="8.5" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3 16l5-5 3 3 4-4 6 6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <p className="text-lg" style={{ color: '#6b5a4e' }}>{tGallery('noPhotos')}</p>
          </div>
        ) : (
          <div className="space-y-14">
            {galleries.docs.map((gallery: any) => (
              <section key={gallery.id}>
                <div className="flex items-center gap-4 mb-6">
                  <h2
                    className="text-xl sm:text-2xl"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 700,
                      color: '#2d2926',
                    }}
                  >
                    {gallery.title}
                  </h2>
                  <div className="flex-1 h-px" style={{ background: 'rgba(45,41,38,0.08)' }} />
                  {gallery.images && (
                    <span className="text-sm" style={{ color: '#a89279' }}>
                      {gallery.images.length} {tGallery('photos')}
                    </span>
                  )}
                </div>
                {gallery.description && (
                  <p className="text-sm mb-6" style={{ color: '#6b5a4e' }}>
                    {gallery.description}
                  </p>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {gallery.images?.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                      style={{ background: 'rgba(45,41,38,0.03)' }}
                    >
                      {typeof item.image === 'object' && item.image?.url ? (
                        <img
                          src={item.image.url}
                          alt={item.caption || gallery.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            style={{ color: '#e8dcc8' }}
                          >
                            <rect
                              x="3"
                              y="3"
                              width="18"
                              height="18"
                              rx="3"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                            <circle cx="8.5" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M3 16l5-5 3 3 4-4 6 6" stroke="currentColor" strokeWidth="1.5" />
                          </svg>
                        </div>
                      )}
                      {/* Hover overlay */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4"
                        style={{
                          background: 'linear-gradient(to top, rgba(26,23,20,0.8) 0%, transparent 60%)',
                        }}
                      >
                        {item.caption && (
                          <span
                            className="text-xs sm:text-sm font-semibold"
                            style={{ color: '#f5f0e6', fontFamily: "'Noto Sans', system-ui" }}
                          >
                            {item.caption}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
