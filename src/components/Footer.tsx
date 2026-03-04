import Link from 'next/link'
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const year = new Date().getFullYear()

  return (
    <footer className="relative" style={{ backgroundColor: '#153324', color: '#d4c8b5' }}>
      {/* Avar pattern divider */}
      <div className="avar-pattern-border h-2" style={{ filter: 'brightness(0.7)' }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg viewBox="0 0 40 40" className="w-8 h-8">
                <path d="M20 4 L36 32 L4 32 Z" fill="#d4a853" opacity="0.8" />
                <path d="M20 12 L30 32 L10 32 Z" fill="#d4a853" />
              </svg>
              <span
                className="text-xl"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: '#f3efe8' }}
              >
                MagaruLaw
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#b8a78e' }}>
              Dağıstan Avar halkının kültürünü, dilini ve tarihini
              korumak ve gelecek nesillere aktarmak için kurulmuş
              dijital platform.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: '#d4a853' }}
            >
              Sayfalar
            </h3>
            <ul className="space-y-2">
              {[
                { label: tNav('news'), href: '#' },
                { label: tNav('articles'), href: '#' },
                { label: tNav('dictionary'), href: '#' },
                { label: tNav('gallery'), href: '#' },
                { label: tNav('about'), href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <span
                    className="text-sm transition-colors cursor-pointer"
                    style={{ color: '#b8a78e' }}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Community */}
          <div>
            <h3
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: '#d4a853' }}
            >
              Topluluk
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: '#b8a78e' }}>
              <li>{t('becomeAuthor')}</li>
              <li>{t('contact')}</li>
            </ul>

            {/* Decorative Avar phrase */}
            <div
              className="mt-6 p-4 rounded-lg"
              style={{ backgroundColor: 'rgba(212, 168, 83, 0.08)', border: '1px solid rgba(212, 168, 83, 0.15)' }}
            >
              <p
                className="text-lg italic"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#d4a853' }}
              >
                &ldquo;МацӀ — халкъалъул рухӀ&rdquo;
              </p>
              <p className="text-xs mt-1" style={{ color: '#9c8b72' }}>
                &ldquo;Dil — halkın ruhudur&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{ borderTop: '1px solid rgba(212, 200, 181, 0.15)' }}
        >
          <p className="text-xs" style={{ color: '#7d6e59' }}>
            &copy; {year} MagaruLaw. {t('rights')}
          </p>
          <p className="text-xs" style={{ color: '#5e5243' }}>
            ♦ Дагъистан · Avaristán · Dagestan ♦
          </p>
        </div>
      </div>
    </footer>
  )
}
