import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return <HomeContent />
}

function HomeContent() {
  const t = useTranslations('home')
  const tSite = useTranslations('site')

  return (
    <div>
      {/* Hero Section */}
      <section className="relative rounded-2xl bg-gradient-to-r from-emerald-800 to-emerald-600 text-white p-12 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {tSite('tagline')}
        </h1>
        <p className="text-lg text-emerald-100 max-w-2xl">
          {tSite('description')}
        </p>
      </section>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Latest News */}
        <section className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">{t('latestNews')}</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-gray-50">
              <p className="text-gray-500 text-sm">{"Hen\u00FCz haber eklenmemi\u015F / No news yet"}</p>
            </div>
          </div>
        </section>

        {/* Word of the Day */}
        <section>
          <h2 className="text-2xl font-bold mb-6">{t('wordOfTheDay')}</h2>
          <div className="p-6 border-2 border-emerald-200 rounded-xl bg-emerald-50">
            <p className="text-3xl font-bold text-emerald-800 mb-2">{"\u0420\u043E\u0441\u0434\u0430\u043B"}</p>
            <p className="text-lg text-gray-700">{"K\u00F6y / Village / \u0421\u0435\u043B\u043E"}</p>
            <p className="text-sm text-gray-500 mt-2 italic">
              &quot;{"\u0414\u0438\u0440 \u0440\u043E\u0441\u0434\u0430\u043B \u0433\u044A\u043E\u0440\u043A\u044C\u0430\u0431 \u0440\u0443\u043A\u044A \u0431\u0443\u0433\u043E"}&quot;
            </p>
            <p className="text-sm text-gray-500">
              &quot;{"Benim k\u00F6y\u00FCmde g\u00FCzel bir ev var"}&quot;
            </p>
          </div>
        </section>
      </div>

      {/* Latest Articles */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">{t('latestArticles')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-xl overflow-hidden">
              <div className="h-48 bg-gray-200" />
              <div className="p-4">
                <p className="text-gray-400 text-sm">{"Yak\u0131nda / Coming soon"}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Photo Gallery Preview */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">{t('photoGallery')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg" />
          ))}
        </div>
      </section>
    </div>
  )
}
