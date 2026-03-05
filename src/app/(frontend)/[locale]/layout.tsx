import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PatternOverlay } from '@/components/PatternOverlay'
import { ScrollToTop } from '@/components/ScrollToTop'

const locales = ['tr', 'av', 'ru', 'en']

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <PatternOverlay />
      <Header locale={locale} />
      <main className="relative z-[1]">{children}</main>
      <Footer />
      <ScrollToTop />
    </NextIntlClientProvider>
  )
}
