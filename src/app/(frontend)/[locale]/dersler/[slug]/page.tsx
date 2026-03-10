import { setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/PageHeader'
import lessonsData from '@/data/lessons.json'

const levelColors: Record<string, { bg: string; text: string }> = {
  A1: { bg: 'rgba(34,139,34,0.08)', text: '#228b22' },
  A2: { bg: 'rgba(44,82,130,0.08)', text: '#2c5282' },
  B1: { bg: 'rgba(197,151,62,0.08)', text: '#c5973e' },
  B2: { bg: 'rgba(166,61,47,0.08)', text: '#a63d2f' },
}

export function generateStaticParams() {
  return lessonsData.map((lesson) => ({ slug: lesson.id }))
}

export default async function LessonDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const lesson = lessonsData.find((l) => l.id === slug)
  if (!lesson) notFound()

  const currentIndex = lessonsData.findIndex((l) => l.id === slug)
  const prevLesson = currentIndex > 0 ? lessonsData[currentIndex - 1] : null
  const nextLesson = currentIndex < lessonsData.length - 1 ? lessonsData[currentIndex + 1] : null

  return <LessonContent lesson={lesson} locale={locale} prevLesson={prevLesson} nextLesson={nextLesson} />
}

function LessonContent({
  lesson,
  locale,
  prevLesson,
  nextLesson,
}: {
  lesson: (typeof lessonsData)[0]
  locale: string
  prevLesson: (typeof lessonsData)[0] | null
  nextLesson: (typeof lessonsData)[0] | null
}) {
  const t = useTranslations('lessons')
  const colors = levelColors[lesson.level] || levelColors.A1

  return (
    <div style={{ background: '#faf8f4' }}>
      <PageHeader
        title={lesson.title_tr}
        subtitle={`${lesson.title_av} — ${lesson.level}`}
      />

      <div className="mx-auto max-w-[900px] px-6 lg:px-10 py-12 sm:py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm" style={{ color: '#a89279' }}>
          <Link href={`/${locale}/dersler`} className="hover:text-[#c5973e] transition-colors">
            {t('backToLessons')}
          </Link>
          <span>/</span>
          <span style={{ color: '#2d2926' }}>#{lesson.order} {lesson.title_tr}</span>
        </div>

        {/* Level badge + description */}
        <div className="mb-8">
          <span
            className="inline-block px-3 py-1 rounded-md text-xs font-bold tracking-wider mb-3"
            style={{ background: colors.bg, color: colors.text }}
          >
            {t('level')} {lesson.level}
          </span>
          <p className="text-base" style={{ color: '#6b5a4e', fontFamily: "'Source Serif 4', serif", lineHeight: 1.7 }}>
            {lesson.description_tr}
          </p>
        </div>

        {/* Intro */}
        {lesson.content.intro_tr && (
          <div
            className="rounded-lg p-5 mb-8"
            style={{
              background: 'rgba(197,151,62,0.04)',
              borderLeft: '4px solid #c5973e',
            }}
          >
            <p className="text-sm" style={{ color: '#2d2926', fontFamily: "'Source Serif 4', serif", lineHeight: 1.8 }}>
              {lesson.content.intro_tr}
            </p>
          </div>
        )}

        {/* Alphabet grid (special for alfabe lesson) */}
        {'alphabet' in lesson.content && lesson.content.alphabet && (
          <div className="mb-10">
            <h2
              className="text-xl mb-5"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: '#2d2926' }}
            >
              {t('alphabet')}
            </h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {(lesson.content.alphabet as string[]).map((letter, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center py-3 rounded-lg text-center text-lg font-semibold transition-all duration-200 hover:translate-y-[-2px]"
                  style={{
                    background: letter.includes('I') || letter.includes('ъ') || letter.includes('ь')
                      ? 'rgba(197,151,62,0.08)'
                      : 'rgba(45,41,38,0.03)',
                    border: '1px solid rgba(45,41,38,0.06)',
                    color: letter.includes('I') || letter.includes('ъ') || letter.includes('ь')
                      ? '#c5973e'
                      : '#2d2926',
                    fontFamily: "'Playfair Display', Georgia, serif",
                  }}
                >
                  {letter}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Special sounds */}
        {'special_sounds' in lesson.content && lesson.content.special_sounds && (
          <div className="mb-10">
            <h2
              className="text-xl mb-5"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: '#2d2926' }}
            >
              {t('specialSounds')}
            </h2>
            <div className="space-y-3">
              {(lesson.content.special_sounds as Array<{ letters: string; description_tr: string }>).map((sound, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-lg"
                  style={{ background: 'rgba(45,41,38,0.02)', border: '1px solid rgba(45,41,38,0.06)' }}
                >
                  <span
                    className="text-lg font-bold flex-shrink-0 min-w-[120px]"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#c5973e' }}
                  >
                    {sound.letters}
                  </span>
                  <span className="text-sm" style={{ color: '#6b5a4e' }}>
                    {sound.description_tr}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sections (phrases & words) */}
        {'sections' in lesson.content && lesson.content.sections && (
          <div className="space-y-10">
            {(lesson.content.sections as any[]).map((section, si) => (
              <div key={si}>
                <h2
                  className="text-xl mb-5 flex items-center gap-3"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: '#2d2926' }}
                >
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: 'rgba(197,151,62,0.1)', color: '#c5973e' }}
                  >
                    {si + 1}
                  </span>
                  {section.title_tr}
                </h2>

                {section.description_tr && (
                  <p className="text-sm mb-4" style={{ color: '#6b5a4e', fontFamily: "'Source Serif 4', serif" }}>
                    {section.description_tr}
                  </p>
                )}

                {/* Phrases table */}
                {'phrases' in section && section.phrases && (
                  <div className="space-y-2">
                    {section.phrases.map((phrase: any, pi: number) => (
                      <div
                        key={pi}
                        className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 p-4 rounded-lg transition-all duration-200 hover:translate-x-1"
                        style={{ background: 'rgba(45,41,38,0.02)', border: '1px solid rgba(45,41,38,0.06)' }}
                      >
                        <span
                          className="text-lg font-bold min-w-[200px]"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#2d2926' }}
                        >
                          {phrase.av}
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-medium" style={{ color: '#2d2926' }}>
                            {phrase.tr}
                          </span>
                          <span className="text-xs" style={{ color: '#a89279' }}>
                            {phrase.ru}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Words table */}
                {'words' in section && section.words && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ borderBottom: '2px solid rgba(197,151,62,0.2)' }}>
                          {'num' in section.words[0] && (
                            <th className="text-left py-3 px-3 font-semibold text-xs uppercase tracking-wider" style={{ color: '#a89279' }}>#</th>
                          )}
                          <th className="text-left py-3 px-3 font-semibold text-xs uppercase tracking-wider" style={{ color: '#a89279' }}>{t('avar')}</th>
                          {'av_plural' in section.words[0] && (
                            <th className="text-left py-3 px-3 font-semibold text-xs uppercase tracking-wider" style={{ color: '#a89279' }}>{t('plural')}</th>
                          )}
                          <th className="text-left py-3 px-3 font-semibold text-xs uppercase tracking-wider" style={{ color: '#a89279' }}>{t('turkish')}</th>
                          <th className="text-left py-3 px-3 font-semibold text-xs uppercase tracking-wider hidden sm:table-cell" style={{ color: '#a89279' }}>{t('russian')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.words.map((word: any, wi: number) => (
                          <tr
                            key={wi}
                            className="transition-colors hover:bg-[rgba(197,151,62,0.04)]"
                            style={{ borderBottom: '1px solid rgba(45,41,38,0.06)' }}
                          >
                            {'num' in word && (
                              <td className="py-3 px-3 font-mono text-sm" style={{ color: '#a89279' }}>{word.num}</td>
                            )}
                            <td
                              className="py-3 px-3 font-bold text-base"
                              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#2d2926' }}
                            >
                              {word.av}
                            </td>
                            {'av_plural' in word && (
                              <td className="py-3 px-3" style={{ color: '#c5973e', fontWeight: 600 }}>
                                {word.av_plural}
                              </td>
                            )}
                            <td className="py-3 px-3 font-medium" style={{ color: '#2d2926' }}>{word.tr}</td>
                            <td className="py-3 px-3 hidden sm:table-cell" style={{ color: '#a89279' }}>{word.ru}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Noun class forms for verbs */}
                    {section.words.some((w: any) => w.class_prefixes) && (
                      <div className="mt-4 space-y-2">
                        <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#a89279' }}>
                          {t('nounClasses')}
                        </h4>
                        {section.words
                          .filter((w: any) => w.class_prefixes)
                          .map((w: any, ci: number) => (
                            <div
                              key={ci}
                              className="rounded-lg p-4"
                              style={{ background: 'rgba(45,41,38,0.03)', border: '1px solid rgba(45,41,38,0.06)' }}
                            >
                              <p className="text-sm font-bold mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#2d2926' }}>
                                {w.av} <span style={{ color: '#a89279', fontWeight: 400 }}>— {w.tr}</span>
                              </p>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                                <div className="p-2 rounded" style={{ background: 'rgba(44,82,130,0.06)' }}>
                                  <span style={{ color: '#a89279' }}>♂ {t('male')}: </span>
                                  <span className="font-semibold" style={{ color: '#2c5282' }}>{w.class_prefixes.m}</span>
                                </div>
                                <div className="p-2 rounded" style={{ background: 'rgba(166,61,47,0.06)' }}>
                                  <span style={{ color: '#a89279' }}>♀ {t('female')}: </span>
                                  <span className="font-semibold" style={{ color: '#a63d2f' }}>{w.class_prefixes.f}</span>
                                </div>
                                <div className="p-2 rounded" style={{ background: 'rgba(197,151,62,0.06)' }}>
                                  <span style={{ color: '#a89279' }}>{t('thing')}: </span>
                                  <span className="font-semibold" style={{ color: '#c5973e' }}>{w.class_prefixes.n}</span>
                                </div>
                                <div className="p-2 rounded" style={{ background: 'rgba(45,41,38,0.04)' }}>
                                  <span style={{ color: '#a89279' }}>{t('plural2')}: </span>
                                  <span className="font-semibold" style={{ color: '#2d2926' }}>{w.class_prefixes.pl}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}

                    {/* Example sentences (for words with examples) */}
                    {section.words.some((w: any) => w.example_av) && (
                      <div className="mt-4 space-y-2">
                        {section.words
                          .filter((w: any) => w.example_av)
                          .map((w: any, ei: number) => (
                            <div
                              key={ei}
                              className="rounded-lg p-4"
                              style={{
                                background: 'rgba(197,151,62,0.04)',
                                borderLeft: '3px solid #c5973e',
                              }}
                            >
                              <p
                                className="text-sm font-semibold mb-1"
                                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#2d2926' }}
                              >
                                {w.example_av}
                              </p>
                              <p className="text-xs" style={{ color: '#6b5a4e' }}>
                                {w.example_tr}
                              </p>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div
          className="flex items-center justify-between mt-12 pt-8"
          style={{ borderTop: '2px solid rgba(45,41,38,0.06)' }}
        >
          {prevLesson ? (
            <Link
              href={`/${locale}/dersler/${prevLesson.id}`}
              className="group flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#c5973e]"
              style={{ color: '#6b5a4e' }}
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <div>
                <span className="block text-xs" style={{ color: '#a89279' }}>{t('prevLesson')}</span>
                {prevLesson.title_tr}
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextLesson ? (
            <Link
              href={`/${locale}/dersler/${nextLesson.id}`}
              className="group flex items-center gap-2 text-sm font-medium text-right transition-colors hover:text-[#c5973e]"
              style={{ color: '#6b5a4e' }}
            >
              <div>
                <span className="block text-xs" style={{ color: '#a89279' }}>{t('nextLesson')}</span>
                {nextLesson.title_tr}
              </div>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  )
}
