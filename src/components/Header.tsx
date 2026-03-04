'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useState } from 'react'

export function Header({ locale }: { locale: string }) {
  const t = useTranslations('nav')
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/haberler`, label: t('news') },
    { href: `/${locale}/makaleler`, label: t('articles') },
    { href: `/${locale}/sozluk`, label: t('dictionary') },
    { href: `/${locale}/galeri`, label: t('gallery') },
    { href: `/${locale}/hakkimizda`, label: t('about') },
  ]

  return (
    <header className="relative z-50">
      {/* Decorative top bar with Avar pattern */}
      <div className="avar-pattern-border h-2" />

      <div
        className="border-b"
        style={{
          backgroundColor: '#fdfbf7',
          borderColor: '#e8e0d4',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-3 group">
              {/* Geometric mountain icon */}
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0">
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <path d="M20 4 L36 32 L4 32 Z" fill="#153324" />
                  <path d="M20 12 L30 32 L10 32 Z" fill="#2d5a3d" />
                  <path d="M14 20 L20 10 L26 20" stroke="#d4a853" strokeWidth="1.5" fill="none" />
                  <circle cx="20" cy="8" r="1.5" fill="#d4a853" />
                </svg>
              </div>
              <div>
                <span
                  className="text-xl sm:text-2xl tracking-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: '#153324' }}
                >
                  MagaruLaw
                </span>
                <span
                  className="hidden sm:block text-xs tracking-widest uppercase"
                  style={{ color: '#9c8b72', fontWeight: 500, letterSpacing: '0.15em' }}
                >
                  Avar Kültür Platformu
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                  style={{ color: '#5e5243' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#153324'
                    e.currentTarget.style.backgroundColor = '#f3efe8'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#5e5243'
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side: Language + Mobile menu */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <button
                className="lg:hidden p-2 rounded-md"
                style={{ color: '#5e5243' }}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {mobileOpen ? (
                    <path d="M6 6L18 18M6 18L18 6" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div
          className="lg:hidden border-b shadow-lg"
          style={{ backgroundColor: '#fdfbf7', borderColor: '#e8e0d4' }}
        >
          <nav className="mx-auto max-w-7xl px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                style={{ color: '#5e5243' }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
