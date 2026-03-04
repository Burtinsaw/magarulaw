import { defineRouting } from 'next-intl/routing'

export const locales = ['tr', 'av', 'ru', 'en'] as const
export type Locale = (typeof locales)[number]

export const routing = defineRouting({
  locales,
  defaultLocale: 'tr',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/haberler': {
      tr: '/haberler',
      av: '/хабарал',
      ru: '/novosti',
      en: '/news',
    },
    '/makaleler': {
      tr: '/makaleler',
      av: '/макъалаби',
      ru: '/stati',
      en: '/articles',
    },
    '/sozluk': {
      tr: '/sozluk',
      av: '/словарь',
      ru: '/slovar',
      en: '/dictionary',
    },
    '/galeri': {
      tr: '/galeri',
      av: '/галерея',
      ru: '/galereya',
      en: '/gallery',
    },
    '/hakkimizda': {
      tr: '/hakkimizda',
      av: '/гӀуниб',
      ru: '/o-nas',
      en: '/about',
    },
  },
})
