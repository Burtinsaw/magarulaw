import { writeFileSync } from 'fs'
const d = process.env.COMP

writeFileSync(d + '/LanguageSwitcher.tsx', `'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

const localeConfig = [
  { code: 'tr', label: 'TR', name: 'T\u00fcrk\u00e7e' },
  { code: 'av', label: '\u0410\u0412', name: '\u0410\u0432\u0430\u0440' },
  { code: 'ru', label: 'RU', name: '\u0420\u0443\u0441' },
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
    <div className="flex gap-[2px] rounded-md p-[3px]" style={{ background: 'rgba(255,255,255,0.06)' }}>
      {localeConfig.map((loc) => (
        <button
          key={loc.code}
          onClick={() => switchLocale(loc.code)}
          title={loc.name}
          className="px-2.5 py-1 text-[0.7rem] font-semibold tracking-[0.05em] rounded transition-all duration-200"
          style={{
            fontFamily: "'Noto Sans', system-ui, sans-serif",
            backgroundColor: locale === loc.code ? '#c5973e' : 'transparent',
            color: locale === loc.code ? '#1a1714' : '#a89279',
          }}
        >
          {loc.label}
        </button>
      ))}
    </div>
  )
}
`)
console.log('LanguageSwitcher done')
