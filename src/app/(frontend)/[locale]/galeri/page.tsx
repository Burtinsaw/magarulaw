import { getPayloadClient } from '@/lib/payload'
import { setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'

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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{t('gallery')}</h1>
      {galleries.docs.length === 0 ? (
        <p className="text-gray-500">{"Hen\u00FCz foto\u011Fraf eklenmemi\u015F. / No photos yet."}</p>
      ) : (
        <div className="space-y-12">
          {galleries.docs.map((gallery: any) => (
            <section key={gallery.id}>
              <h2 className="text-xl font-semibold mb-4">{gallery.title}</h2>
              {gallery.description && (
                <p className="text-gray-600 mb-4">{gallery.description}</p>
              )}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {gallery.images?.map((item: any, idx: number) => (
                  <div key={idx} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                    {typeof item.image === 'object' && item.image?.url && (
                      <img
                        src={item.image.url}
                        alt={item.caption || gallery.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
