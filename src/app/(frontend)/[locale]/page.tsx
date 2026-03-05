import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import Image from 'next/image'
import { SectionHeader } from '@/components/SectionHeader'
import { FeatureCard } from '@/components/FeatureCard'
import { HeroSection } from '@/components/HeroSection'
import { ScrollReveal } from '@/components/ScrollReveal'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations('home')

  return (
    <>
      {/* Hero */}
      <HeroSection locale={locale} tagline={t('tagline')} description={t('description')} />

      {/* Features */}
      <section className="relative py-14 lg:py-20" style={{ background: '#faf8f4' }}>
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background:
              'repeating-linear-gradient(90deg, #a63d2f 0px, #a63d2f 12px, #c5973e 12px, #c5973e 16px, #2c5282 16px, #2c5282 28px, #c5973e 28px, #c5973e 32px)',
          }}
        />
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <SectionHeader label="Platform" title={t('featuresTitle')} />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
            {featureCards.map((card, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <FeatureCard
                  index={i}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  linkText={card.linkText}
                  href={`/${locale}/${card.href}`}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="relative py-14 lg:py-20" style={{ background: '#faf8f4' }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <SectionHeader label="Blog" title={t('articlesTitle')} />
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 mt-12">
            {/* Featured article */}
            <ScrollReveal>
              <Link
                href={`/${locale}/makaleler/avar-mutfagi`}
                className="group relative block rounded-lg overflow-hidden min-h-[400px]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80&fit=crop"
                  alt="Avar mutfak kulturu"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(26,23,20,0.9) 0%, rgba(26,23,20,0.3) 50%, transparent 100%)',
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <span
                    className="inline-block px-3 py-1 rounded text-[0.7rem] font-semibold uppercase tracking-wider mb-3"
                    style={{
                      background: 'rgba(197,151,62,0.2)',
                      color: '#ddb866',
                      fontFamily: "'Noto Sans', system-ui",
                    }}
                  >
                    Kultur
                  </span>
                  <h3
                    className="text-[1.4rem] lg:text-[1.6rem] mb-2"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 700,
                      color: '#f5f0e6',
                    }}
                  >
                    Avar Mutfak Kulturu: Hinkal ve Otesi
                  </h3>
                  <p className="text-[0.88rem]" style={{ color: '#a89279' }}>
                    5 dk okuma
                  </p>
                </div>
              </Link>
            </ScrollReveal>

            {/* Article list */}
            <div className="flex flex-col gap-4">
              {articleListItems.map((item, i) => (
                <ScrollReveal key={i} delay={i * 80}>
                  <Link
                    href={`/${locale}/makaleler/${item.slug}`}
                    className="group flex gap-4 p-4 rounded-lg transition-all duration-300 hover:translate-x-1"
                    style={{
                      background: 'rgba(45,41,38,0.02)',
                      border: '1px solid rgba(45,41,38,0.06)',
                    }}
                  >
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 relative">
                      <Image src={item.img} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className="text-[0.95rem] mb-1 line-clamp-2"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontWeight: 600,
                          color: '#2d2926',
                        }}
                      >
                        {item.title}
                      </h4>
                      <span className="text-[0.78rem]" style={{ color: '#a89279' }}>
                        {item.meta}
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section transition */}
      <div className="section-fade-to-dark" />

      {/* Dictionary (dark) */}
      <section
        className="relative py-14 lg:py-20 overflow-hidden"
        style={{ background: '#2d2926', color: '#e8dcc8' }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(44,82,130,0.3), transparent), radial-gradient(ellipse 50% 40% at 80% 50%, rgba(166,61,47,0.2), transparent)',
          }}
        />
        <div className="relative max-w-[1320px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <SectionHeader label="Sozluk" title={t('dictionaryTitle')} dark />
          </ScrollReveal>

          {/* Search */}
          <ScrollReveal>
            <div className="max-w-[560px] mx-auto mt-10 mb-12">
              <div
                className="flex items-center gap-3 px-5 py-3 rounded-lg"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a89279" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Kelime ara..."
                  className="bg-transparent border-none outline-none flex-1 text-[0.95rem] placeholder:text-[#6b5a4e]"
                  style={{ color: '#e8dcc8', fontFamily: "'Source Serif 4', serif" }}
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Word cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {dictWords.map((word, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div
                  className="p-5 rounded-lg transition-all duration-300 hover:translate-y-[-4px]"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <h4
                    className="text-[1.15rem] mb-1"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 700,
                      color: '#ddb866',
                    }}
                  >
                    {word.word}
                  </h4>
                  <p className="text-[0.82rem] mb-2" style={{ color: '#a89279' }}>
                    {word.translations}
                  </p>
                  <p className="text-[0.85rem] italic" style={{ color: 'rgba(232,220,200,0.6)' }}>
                    {word.example}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href={`/${locale}/sozluk`}
              className="btn btn-outline"
              style={{ borderColor: 'rgba(197,151,62,0.4)', color: '#ddb866' }}
            >
              Tum Sozluge Git
            </Link>
          </div>
        </div>
      </section>

      {/* Section transition */}
      <div className="section-fade-to-light" />

      {/* Gallery */}
      <section className="py-14 lg:py-20" style={{ background: '#faf8f4' }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <SectionHeader label="Galeri" title={t('galleryTitle')} />
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mt-12 auto-rows-[200px] lg:auto-rows-[240px]">
            {galleryItems.map((item, i) => (
              <ScrollReveal
                key={i}
                delay={i * 60}
                className={i === 0 ? 'col-span-2 row-span-2' : ''}
              >
                <div className="group relative w-full h-full rounded-lg overflow-hidden cursor-pointer">
                  <Image
                    src={item.img}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                    style={{
                      background: 'linear-gradient(to top, rgba(26,23,20,0.8), transparent 60%)',
                    }}
                  >
                    <span
                      className="text-[0.85rem] font-semibold"
                      style={{ color: '#f5f0e6', fontFamily: "'Noto Sans', system-ui" }}
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-14 lg:py-20" style={{ background: '#f5f0e6' }}>
        <div
          className="absolute left-0 right-0 h-[3px]"
          style={{
            background:
              'repeating-linear-gradient(90deg, #a63d2f 0px, #a63d2f 12px, #c5973e 12px, #c5973e 16px, #2c5282 16px, #2c5282 28px, #c5973e 28px, #c5973e 32px)',
          }}
        />
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <SectionHeader label="Haberler" title={t('newsTitle')} />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {newsItems.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div
                  className="flex gap-5 p-5 rounded-lg transition-all duration-300 hover:translate-y-[-4px]"
                  style={{ background: '#faf8f4', border: '1px solid rgba(45,41,38,0.06)' }}
                >
                  <div
                    className="flex-shrink-0 w-16 h-16 rounded-lg flex flex-col items-center justify-center"
                    style={{ background: 'rgba(166,61,47,0.08)' }}
                  >
                    <span
                      className="text-[1.4rem] leading-none font-bold"
                      style={{ color: '#a63d2f', fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.day}
                    </span>
                    <span
                      className="text-[0.65rem] uppercase font-semibold tracking-wider"
                      style={{ color: '#a89279' }}
                    >
                      {item.month}
                    </span>
                  </div>
                  <div>
                    <h4
                      className="text-[1rem] mb-1"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontWeight: 600,
                        color: '#2d2926',
                      }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-[0.85rem] line-clamp-2" style={{ color: '#6b5a4e' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/* ── Static data ── */

const featureCards = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
    title: 'Makaleler',
    description: 'Avar tarihi, kulturu ve dilini konu alan derinlemesine arastirma yazilari.',
    linkText: 'Makaleleri Oku',
    href: 'makaleler',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    title: 'Sozluk',
    description: 'Avarca-Turkce-Rusca-Ingilizce kapsamli sozluk ve dil kaynaklari.',
    linkText: 'Sozluge Git',
    href: 'sozluk',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
    title: 'Galeri',
    description: 'Geleneksel sanatlar, dogal guzellikler ve kulturel miras fotograflari.',
    linkText: 'Galeriyi Goruntule',
    href: 'galeri',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
    title: 'Dersler',
    description: 'Avarca dil dersleri, gramer kaynaklari ve interaktif ogrenme araclari.',
    linkText: 'Derslere Basla',
    href: 'dersler',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
        <path d="M10 9H8" />
      </svg>
    ),
    title: 'Haberler',
    description: 'Avar toplulugu ve kulturel etkinlikler hakkinda guncel haberler.',
    linkText: 'Haberleri Oku',
    href: 'haberler',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'Topluluk',
    description: 'Avar diasporasi ve kultur meraklilari icin katilimci topluluk alani.',
    linkText: 'Topluluga Katil',
    href: 'topluluk',
  },
]

const articleListItems = [
  {
    slug: 'avar-dili-tarihi',
    title: 'Avar Dilinin Tarihi ve Gelisimi',
    meta: '8 dk okuma',
    img: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=200&q=80&fit=crop',
  },
  {
    slug: 'kafkas-sanati',
    title: 'Kafkas Hali Sanati ve Geometrik Desenler',
    meta: '6 dk okuma',
    img: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=200&q=80&fit=crop',
  },
  {
    slug: 'dagistan-cografyasi',
    title: 'Dagistanin Cografyasi ve Dogal Guzellikleri',
    meta: '7 dk okuma',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80&fit=crop',
  },
  {
    slug: 'avar-muzigi',
    title: 'Geleneksel Avar Muzigi ve Enstrumanlari',
    meta: '5 dk okuma',
    img: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&q=80&fit=crop',
  },
]

const dictWords = [
  {
    word: 'Maga',
    translations: 'TR: Gunes / RU: Solntse / EN: Sun',
    example: '"Maga bokana kana." - Gunes dogdu.',
  },
  {
    word: 'Mehed',
    translations: 'TR: Dag / RU: Gora / EN: Mountain',
    example: '"Mehed ghurula buga." - Dag yuksek.',
  },
  {
    word: 'Rakhel',
    translations: 'TR: Yildiz / RU: Zvezda / EN: Star',
    example: '"Rakhulzabi ts\'ola." - Yildizlar parlak.',
  },
  {
    word: 'Eber',
    translations: 'TR: Su / RU: Voda / EN: Water',
    example: '"Eber ts\'ad buk\'una." - Su temiz.',
  },
  {
    word: 'Rosal',
    translations: 'TR: Orman / RU: Les / EN: Forest',
    example: '"Rosda ghveda buga." - Orman buyuk.',
  },
  {
    word: 'Xan',
    translations: 'TR: Ev / RU: Dom / EN: Home',
    example: '"Xan bokana buga." - Ev sicak.',
  },
]

const galleryItems = [
  {
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&fit=crop',
    label: 'Kafkas Daglari',
  },
  {
    img: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=600&q=80&fit=crop',
    label: 'Geleneksel Hali',
  },
  {
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80&fit=crop',
    label: 'Yerel Mutfak',
  },
  {
    img: 'https://images.unsplash.com/photo-1544376383-f6418ae57526?w=600&q=80&fit=crop',
    label: 'Tarihi Kale',
  },
  {
    img: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&q=80&fit=crop',
    label: 'Geleneksel Muzik',
  },
  {
    img: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&q=80&fit=crop',
    label: 'El Yazmalari',
  },
]

const newsItems = [
  {
    day: '28',
    month: 'Sub',
    title: 'Avar Dil Festivali 2026',
    desc: 'Yillik Avar dil ve kultur festivali Makhachkala\'da duzenleniyor.',
  },
  {
    day: '15',
    month: 'Sub',
    title: 'Yeni Sozluk Guncellemesi',
    desc: '2.400 yeni kelime eklendi. Toplam kelime sayisi 12.400\'u gecti.',
  },
  {
    day: '03',
    month: 'Sub',
    title: 'Online Avarca Kursu Basladi',
    desc: 'Ucretsiz online Avarca dil kursu kayitlari acildi.',
  },
  {
    day: '20',
    month: 'Oca',
    title: 'Kultur Fotografcilik Yarismasi',
    desc: 'Kafkas kulturu temali fotografcilik yarismasi sonuclandi.',
  },
]
