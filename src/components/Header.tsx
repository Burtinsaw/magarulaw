import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header({ locale }: { locale: string }) {
  const t = useTranslations('nav')

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <Link href={`/${locale}`} className="text-2xl font-bold text-emerald-800">
          MagaruLaw
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href={`/${locale}`} className="hover:text-emerald-700">{t('home')}</Link>
          <Link href={`/${locale}/haberler`} className="hover:text-emerald-700">{t('news')}</Link>
          <Link href={`/${locale}/makaleler`} className="hover:text-emerald-700">{t('articles')}</Link>
          <Link href={`/${locale}/sozluk`} className="hover:text-emerald-700">{t('dictionary')}</Link>
          <Link href={`/${locale}/galeri`} className="hover:text-emerald-700">{t('gallery')}</Link>
          <Link href={`/${locale}/hakkimizda`} className="hover:text-emerald-700">{t('about')}</Link>
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  )
}
