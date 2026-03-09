import type { ReactNode } from 'react'
import { setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { PageHeader } from '@/components/PageHeader'
import lessonsData from '@/data/lessons.json'

const levelColors: Record<string, { bg: string; text: string; border: string }> = {
  A1: { bg: 'rgba(34,139,34,0.08)', text: '#228b22', border: 'rgba(34,139,34,0.2)' },
  A2: { bg: 'rgba(44,82,130,0.08)', text: '#2c5282', border: 'rgba(44,82,130,0.2)' },
  B1: { bg: 'rgba(197,151,62,0.08)', text: '#c5973e', border: 'rgba(197,151,62,0.2)' },
  B2: { bg: 'rgba(166,61,47,0.08)', text: '#a63d2f', border: 'rgba(166,61,47,0.2)' },
}

const lessonIcons: Record<string, ReactNode> = {
  alfabe: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 7V4h16v3" /><path d="M9 20h6" /><path d="M12 4v16" />
    </svg>
  ),
  selamlasma: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  sayilar: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 17l6-6-6-6" /><path d="M12 19h8" />
    </svg>
  ),
  'temel-fiiller': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  'isimler-cogullar': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  ),
  'temel-kelimeler': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" /><path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
}

function getWordCount(lesson: (typeof lessonsData)[0]): number {
  const sections = lesson.content.sections
  if (!sections) return 0
  let count = 0
  for (const s of sections) {
    if ('words' in s && Array.isArray(s.words)) count += s.words.length
    if ('phrases' in s && Array.isArray(s.phrases)) count += s.phrases.length
  }
  return count
}

export default async function LessonsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <LessonsContent locale={locale} />
}

function LessonsContent({ locale }: { locale: string }) {
  const t = useTranslations('lessons')
  const tNav = useTranslations('nav')

  return (
    <div style={{ background: '#faf8f4' }}>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-12 sm:py-16">
        {/* Level filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {['A1', 'A2', 'B1', 'B2'].map((level) => {
            const colors = levelColors[level]
            const count = lessonsData.filter((l) => l.level === level).length
            return (
              <span
                key={level}
                className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  background: colors.bg,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                }}
              >
                {level} ({count})
              </span>
            )
          })}
        </div>

        {/* Lesson cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessonsData.map((lesson) => {
            const colors = levelColors[lesson.level] || levelColors.A1
            const wordCount = getWordCount(lesson)
            const icon = lessonIcons[lesson.id]

            return (
              <Link
                key={lesson.id}
                href={`/${locale}/dersler/${lesson.id}`}
                className="group relative rounded-xl p-6 transition-all duration-300 hover:translate-y-[-4px]"
                style={{
                  background: 'rgba(45,41,38,0.02)',
                  border: '1px solid rgba(45,41,38,0.06)',
                }}
              >
                {/* Level badge */}
                <span
                  className="absolute top-4 right-4 px-2.5 py-1 rounded-md text-xs font-bold tracking-wider"
                  style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                >
                  {lesson.level}
                </span>

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: 'rgba(197,151,62,0.08)', color: '#c5973e' }}
                >
                  {icon}
                </div>

                {/* Order number */}
                <span
                  className="text-xs font-semibold uppercase tracking-widest mb-2 block"
                  style={{ color: '#a89279' }}
                >
                  {t('level')} {lesson.level} &middot; #{lesson.order}
                </span>

                {/* Title */}
                <h3
                  className="text-lg mb-1 group-hover:text-[#c5973e] transition-colors"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 700,
                    color: '#2d2926',
                  }}
                >
                  {lesson.title_tr}
                </h3>

                {/* Avar title */}
                <p className="text-sm mb-3" style={{ color: '#a89279', fontStyle: 'italic' }}>
                  {lesson.title_av}
                </p>

                {/* Description */}
                <p className="text-sm line-clamp-2 mb-4" style={{ color: '#6b5a4e' }}>
                  {lesson.description_tr}
                </p>

                {/* Word count + CTA */}
                <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: '1px solid rgba(45,41,38,0.06)' }}>
                  <span className="text-xs font-medium" style={{ color: '#a89279' }}>
                    {wordCount} {wordCount > 0 ? t('words') : ''}
                  </span>
                  <span
                    className="text-sm font-semibold group-hover:translate-x-1 transition-transform"
                    style={{ color: '#c5973e' }}
                  >
                    {t('startLesson')} →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
