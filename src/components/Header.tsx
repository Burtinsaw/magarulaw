'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useState, useEffect } from 'react'

export function Header({ locale }: { locale: string }) {
  const t = useTranslations('nav')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navItems = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/haberler`, label: t('news') },
    { href: `/${locale}/makaleler`, label: t('articles') },
    { href: `/${locale}/sozluk`, label: t('dictionary') },
    { href: `/${locale}/galeri`, label: t('gallery') },
    { href: `/${locale}/dersler`, label: t('languageLessons') },
    { href: `/${locale}/hakkimizda`, label: t('about') },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[1000] h-[72px]" style={{ transition: 'box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)', boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.2)' : 'none' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(26,23,20,0.92) 0%, rgba(26,23,20,0.85) 100%)', backdropFilter: 'blur(20px) saturate(1.4)', WebkitBackdropFilter: 'blur(20px) saturate(1.4)' }} />
        <div className="relative flex items-center justify-between h-full max-w-[1320px] mx-auto px-6 lg:px-10">
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <div className="w-9 h-9 relative">
              <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
                <path d="M18 2L32 10V26L18 34L4 26V10L18 2Z" stroke="#c5973e" strokeWidth="1.5" fill="none"/>
                <path d="M18 8L26 13V23L18 28L10 23V13L18 8Z" stroke="#c5973e" strokeWidth="1" fill="none" opacity="0.5"/>
                <path d="M18 14L22 16.5V21.5L18 24L14 21.5V16.5L18 14Z" fill="#c5973e" opacity="0.3"/>
              </svg>
            </div>
            <span className="text-[1.35rem] tracking-[0.04em]" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: '#f5f0e6' }}>
              Magaru<span style={{ color: '#c5973e' }}>Law</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="relative text-[0.82rem] font-medium uppercase tracking-[0.08em] transition-colors duration-300 hover:text-[#f5f0e6] group" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif", color: '#a89279' }}>
                {item.label}
                <span className="absolute bottom-[-4px] left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-300" style={{ background: '#c5973e' }} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button className="lg:hidden flex flex-col gap-[5px] p-2 z-[1010]" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              <span className="block w-[22px] h-[2px] rounded-sm transition-all duration-300" style={{ background: '#f5f0e6', transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
              <span className="block w-[22px] h-[2px] rounded-sm transition-all duration-300" style={{ background: '#f5f0e6', opacity: mobileOpen ? 0 : 1 }} />
              <span className="block w-[22px] h-[2px] rounded-sm transition-all duration-300" style={{ background: '#f5f0e6', transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
            </button>
          </div>
        </div>
      </header>

      <nav className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-6 transition-opacity duration-[400ms]" style={{ background: 'linear-gradient(160deg, #1a1714 0%, #1c2a1e 40%, #1a2540 100%)', opacity: mobileOpen ? 1 : 0, pointerEvents: mobileOpen ? 'all' : 'none' }}>
        {navItems.map((item, i) => (
          <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="text-[1.8rem] font-semibold tracking-[0.02em] transition-all duration-300 hover:text-[#ddb866] hover:translate-x-2" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#e8dcc8', opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)', transition: `opacity 0.3s ease ${0.1 + i * 0.05}s, transform 0.3s ease ${0.1 + i * 0.05}s, color 0.3s ease` }}>
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  )
}
