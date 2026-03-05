'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

export function HeroSection({ locale, tagline, description }: { locale: string; tagline: string; description: string }) {
  const mountainsRef = useRef<SVGSVGElement>(null)
  const ornamentRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = 'ontouchstart' in window && window.innerWidth < 1024
    if (prefersReduced || isTouch) return
    const onScroll = () => {
      const y = window.scrollY
      if (y > window.innerHeight * 1.2) return
      if (mountainsRef.current) mountainsRef.current.style.transform = `translate3d(0, ${y * -0.3}px, 0)`
      if (ornamentRef.current) ornamentRef.current.style.transform = `translateY(calc(-50% + ${y * 0.15}px)) rotate(${y * 0.02}deg)`
      if (bgRef.current) bgRef.current.style.transform = `translate3d(0, ${y * 0.12}px, 0)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#1a1714' }}>
      <div ref={bgRef} className="absolute inset-0 z-[1]" style={{ background: "url('https://images.unsplash.com/photo-1544376383-f6418ae57526?w=1920&q=80&fit=crop') center/cover no-repeat" }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 120% 80% at 70% 50%, rgba(30,58,95,0.55) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 20% 80%, rgba(122,31,31,0.4) 0%, transparent 50%), linear-gradient(175deg, rgba(26,23,20,0.82) 0%, rgba(28,42,30,0.75) 30%, rgba(26,37,64,0.75) 60%, rgba(26,23,20,0.85) 100%)' }} />
      </div>

      <svg ref={mountainsRef} className="absolute bottom-0 z-[2] opacity-[0.15] w-[110%] -left-[5%]" viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ willChange: 'transform' }}>
        <path fill="#e8dcc8" d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,218.7C672,213,768,171,864,160C960,149,1056,171,1152,186.7C1248,203,1344,213,1392,218.7L1440,224L1440,320L0,320Z" />
        <path fill="#a89279" opacity="0.3" d="M0,256L60,240C120,224,240,192,360,192C480,192,600,224,720,229.3C840,235,960,213,1080,202.7C1200,192,1320,192,1380,192L1440,192L1440,320L0,320Z" />
      </svg>

      <div ref={ornamentRef} className="hero-ornament absolute top-1/2 right-[8%] -translate-y-1/2 w-[420px] h-[420px] z-[2] opacity-[0.07]" aria-hidden="true" style={{ animation: 'ornamentSpin 120s linear infinite', willChange: 'transform' }}>
        <svg viewBox="0 0 420 420" fill="none"><circle cx="210" cy="210" r="200" stroke="#c5973e" strokeWidth="0.5" /><circle cx="210" cy="210" r="160" stroke="#c5973e" strokeWidth="0.5" /><circle cx="210" cy="210" r="120" stroke="#c5973e" strokeWidth="0.3" /><path d="M210 10L410 210L210 410L10 210Z" stroke="#c5973e" strokeWidth="0.5" /><path d="M210 50L370 210L210 370L50 210Z" stroke="#c5973e" strokeWidth="0.3" /><path d="M210 90L330 210L210 330L90 210Z" stroke="#c5973e" strokeWidth="0.3" /></svg>
      </div>

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 lg:px-10 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center" style={{ paddingTop: 'calc(72px + 4rem)' }}>
        <div className="max-w-[600px]">
          <div className="inline-flex items-center gap-2 mb-6 text-[0.72rem] font-semibold tracking-[0.15em] uppercase" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif", color: '#c5973e', opacity: 0, animation: 'fadeInUp 0.8s ease 0.3s forwards' }}>
            <span className="w-8 h-px" style={{ background: '#c5973e' }} />
            Avar Kültür Platformu
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)', fontWeight: 800, color: '#f5f0e6', lineHeight: 1.08, letterSpacing: '-0.01em', marginBottom: '1.5rem', opacity: 0, animation: 'fadeInUp 0.8s ease 0.5s forwards' }}>{tagline}</h1>
          <p className="max-w-[480px] mb-8" style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.15rem', color: '#a89279', lineHeight: 1.8, opacity: 0, animation: 'fadeInUp 0.8s ease 0.7s forwards' }}>{description}</p>
          <div className="flex gap-4 flex-wrap" style={{ opacity: 0, animation: 'fadeInUp 0.8s ease 0.9s forwards' }}>
            <Link href={`/${locale}/makaleler`} className="btn btn-primary">
              Keşfetmeye Başla
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
            <Link href={`/${locale}/sozluk`} className="btn btn-outline">Sözlüğe Git</Link>
          </div>
        </div>
        <div className="flex flex-col gap-5 lg:justify-self-end" style={{ opacity: 0, animation: 'fadeInUp 0.8s ease 1.1s forwards' }}>
          {statCards.map((stat, i) => (
            <div key={i} className="min-w-[280px] p-5 lg:p-6 rounded-lg transition-all duration-300 hover:translate-x-[-4px]" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="leading-none mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2.4rem', fontWeight: 700, color: '#ddb866' }}>{stat.number}</div>
              <div className="text-[0.78rem] font-medium uppercase tracking-[0.06em]" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif", color: '#a89279' }}>{stat.label}</div>
              <div className="text-[0.88rem] mt-1" style={{ color: 'rgba(168,146,121,0.7)' }}>{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const statCards = [
  { number: '12,400+', label: 'Sözlük Kelimesi', desc: 'Avarca-Türkçe-Rusça karşılıklar' },
  { number: '850+', label: 'Makale', desc: 'Tarih, kültür ve dil araştırmaları' },
  { number: '4', label: 'Dil Desteği', desc: 'Türkçe, Avarca, Rusça, İngilizce' },
]
