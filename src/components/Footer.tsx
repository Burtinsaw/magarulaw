import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            &copy; {year} MagaruLaw. {t('rights')}
          </div>
          <div className="flex gap-6 text-sm text-gray-600">
            <span>{t('about')}</span>
            <span>{t('contact')}</span>
            <span>{t('becomeAuthor')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
