'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

const localeConfig = [
  { code: 'tr', label: 'TR', name: 'Türkçe' },
  { code: 'av', label: 'АВ', name: 'Авар' },
  { code: 'ru', label: 'RU', name: 'Рус' },
  { code: 'en', label: 'EN', name: 'Eng' },
]

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function switchLocale(newLocale: string) {
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  return (
    <div className="flex items-center rounded-lg overflow-hidden" style={{ border: '1px solid #e8e0d4' }}>
      {localeConfig.map((loc, i) => (
        <button
          key={loc.code}
          onClick={() => switchLocale(loc.code)}
          title={loc.name}
          className="px-2.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200"
          style={{
            backgroundColor: locale === loc.code ? '#153324' : 'transparent',
            color: locale === loc.code ? '#d4a853' : '#9c8b72',
            borderLeft: i > 0 ? '1px solid #e8e0d4' : 'none',
          }}
          onMouseEnter={(e) => {
            if (locale !== loc.code) {
              e.currentTarget.style.backgroundColor = '#f3efe8'
              e.currentTarget.style.color = '#3f3730'
            }
          }}
          onMouseLeave={(e) => {
            if (locale !== loc.code) {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#9c8b72'
            }
          }}
        >
          {loc.label}
        </button>
      ))}
    </div>
  )
}
