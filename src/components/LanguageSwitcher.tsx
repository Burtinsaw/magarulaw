'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

const localeLabels: Record<string, string> = {
  tr: 'TR',
  av: 'АВ',
  ru: 'RU',
  en: 'EN',
}

const locales = ['tr', 'av', 'ru', 'en']

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function switchLocale(newLocale: string) {
    // Replace the current locale prefix in the pathname
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  return (
    <div className="flex gap-1">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`px-2 py-1 text-sm rounded transition-colors ${
            locale === loc
              ? 'bg-emerald-700 text-white font-bold'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {localeLabels[loc]}
        </button>
      ))}
    </div>
  )
}
