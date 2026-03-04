# MagaruLaw.com Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a multilingual Avar cultural platform (TR/AV/RU/EN) with CMS, dictionary, gallery, and automated news pipeline.

**Architecture:** Payload CMS 3 running inside Next.js 15 App Router. PostgreSQL for data, Cloudinary for media, next-intl for frontend i18n routing. FreshRSS + Python cron for automated Dagestan news aggregation and translation.

**Tech Stack:** Node.js 20, Next.js 15, Payload CMS 3, PostgreSQL 16, Tailwind CSS 4, next-intl, Cloudinary, Docker, Caddy, FreshRSS, Google Cloud Translation API

---

## Task 1: Scaffold the Project

**Files:**
- Create: `E:/Projects/magarulaw/` (project root via create-payload-app)
- Create: `.env`
- Modify: `next.config.mjs`
- Modify: `package.json`

**Step 1: Create Payload + Next.js project**

```bash
cd E:/Projects/magarulaw
npx create-payload-app@latest . --db postgres --no-deps
```

Select: `blank` template when prompted. This scaffolds Next.js 15 + Payload CMS 3 with PostgreSQL adapter.

**Step 2: Create environment file**

Create `.env` at project root:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/magarulaw
PAYLOAD_SECRET=magarulaw-secret-change-in-production-min-32-chars
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GOOGLE_TRANSLATE_API_KEY=your_key_here
```

**Step 3: Install all dependencies**

```bash
cd E:/Projects/magarulaw
pnpm install
```

**Step 4: Install additional dependencies**

```bash
pnpm add next-intl @payloadcms/richtext-lexical cloudinary next-cloudinary
pnpm add -D @types/node
```

**Step 5: Verify project starts**

Make sure PostgreSQL is running, then:

```bash
pnpm dev
```

Expected: App runs at http://localhost:3000, Payload admin at http://localhost:3000/admin

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: scaffold Payload CMS + Next.js project with PostgreSQL"
```

---

## Task 2: Configure Localization (Payload + next-intl)

**Files:**
- Modify: `src/payload.config.ts`
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/request.ts`
- Create: `src/i18n/messages/tr.json`
- Create: `src/i18n/messages/av.json`
- Create: `src/i18n/messages/ru.json`
- Create: `src/i18n/messages/en.json`
- Create: `src/middleware.ts`
- Modify: `next.config.mjs`

**Step 1: Configure Payload localization**

In `src/payload.config.ts`, add localization config to `buildConfig`:

```typescript
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [],  // Will be populated in Task 3
  localization: {
    locales: [
      { label: 'Türkçe', code: 'tr' },
      { label: 'Авар мацӀ', code: 'av' },
      { label: 'Русский', code: 'ru' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'tr',
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
})
```

**Step 2: Create next-intl routing config**

Create `src/i18n/routing.ts`:

```typescript
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
```

**Step 3: Create i18n request config**

Create `src/i18n/request.ts`:

```typescript
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
```

**Step 4: Create translation message files**

Create `src/i18n/messages/tr.json`:

```json
{
  "site": {
    "name": "MagaruLaw",
    "tagline": "Avar Halkının Dijital Evi",
    "description": "Dağıstan Avar halkının kültürü, tarihi ve dili"
  },
  "nav": {
    "home": "Ana Sayfa",
    "news": "Haberler",
    "articles": "Makaleler",
    "dictionary": "Sözlük",
    "gallery": "Galeri",
    "about": "Hakkımızda",
    "languageLessons": "Dil Dersleri"
  },
  "home": {
    "latestNews": "Son Haberler",
    "latestArticles": "Son Makaleler",
    "wordOfTheDay": "Günün Kelimesi",
    "photoGallery": "Fotoğraf Galerisi",
    "viewAll": "Tümünü Gör",
    "listen": "Dinle"
  },
  "dictionary": {
    "search": "Kelime ara...",
    "avar": "Avarca",
    "turkish": "Türkçe",
    "russian": "Rusça",
    "english": "İngilizce",
    "example": "Örnek Cümle",
    "pronunciation": "Telaffuz",
    "categories": "Kategoriler",
    "allWords": "Tüm Kelimeler",
    "difficulty": "Seviye"
  },
  "articles": {
    "readMore": "Devamını Oku",
    "publishedAt": "Yayınlanma",
    "author": "Yazar",
    "category": "Kategori",
    "autoTranslated": "Bu haber otomatik çevrilmiştir"
  },
  "footer": {
    "about": "Hakkımızda",
    "contact": "İletişim",
    "becomeAuthor": "Yazar Ol",
    "rights": "Tüm hakları saklıdır"
  }
}
```

Create `src/i18n/messages/en.json`:

```json
{
  "site": {
    "name": "MagaruLaw",
    "tagline": "Digital Home of the Avar People",
    "description": "Culture, history and language of the Avar people of Dagestan"
  },
  "nav": {
    "home": "Home",
    "news": "News",
    "articles": "Articles",
    "dictionary": "Dictionary",
    "gallery": "Gallery",
    "about": "About",
    "languageLessons": "Language Lessons"
  },
  "home": {
    "latestNews": "Latest News",
    "latestArticles": "Latest Articles",
    "wordOfTheDay": "Word of the Day",
    "photoGallery": "Photo Gallery",
    "viewAll": "View All",
    "listen": "Listen"
  },
  "dictionary": {
    "search": "Search word...",
    "avar": "Avar",
    "turkish": "Turkish",
    "russian": "Russian",
    "english": "English",
    "example": "Example Sentence",
    "pronunciation": "Pronunciation",
    "categories": "Categories",
    "allWords": "All Words",
    "difficulty": "Level"
  },
  "articles": {
    "readMore": "Read More",
    "publishedAt": "Published",
    "author": "Author",
    "category": "Category",
    "autoTranslated": "This article was automatically translated"
  },
  "footer": {
    "about": "About",
    "contact": "Contact",
    "becomeAuthor": "Become an Author",
    "rights": "All rights reserved"
  }
}
```

Create `src/i18n/messages/ru.json`:

```json
{
  "site": {
    "name": "MagaruLaw",
    "tagline": "Цифровой дом аварского народа",
    "description": "Культура, история и язык аварского народа Дагестана"
  },
  "nav": {
    "home": "Главная",
    "news": "Новости",
    "articles": "Статьи",
    "dictionary": "Словарь",
    "gallery": "Галерея",
    "about": "О нас",
    "languageLessons": "Уроки языка"
  },
  "home": {
    "latestNews": "Последние новости",
    "latestArticles": "Последние статьи",
    "wordOfTheDay": "Слово дня",
    "photoGallery": "Фотогалерея",
    "viewAll": "Показать все",
    "listen": "Слушать"
  },
  "dictionary": {
    "search": "Поиск слова...",
    "avar": "Аварский",
    "turkish": "Турецкий",
    "russian": "Русский",
    "english": "Английский",
    "example": "Пример предложения",
    "pronunciation": "Произношение",
    "categories": "Категории",
    "allWords": "Все слова",
    "difficulty": "Уровень"
  },
  "articles": {
    "readMore": "Читать далее",
    "publishedAt": "Опубликовано",
    "author": "Автор",
    "category": "Категория",
    "autoTranslated": "Эта статья была переведена автоматически"
  },
  "footer": {
    "about": "О нас",
    "contact": "Контакты",
    "becomeAuthor": "Стать автором",
    "rights": "Все права защищены"
  }
}
```

Create `src/i18n/messages/av.json`:

```json
{
  "site": {
    "name": "MагӀарулав",
    "tagline": "Авар халкъалъул цӀияб хъизан",
    "description": "Дагъистаналъул авар халкъалъул культура, тарих ва мацӀ"
  },
  "nav": {
    "home": "Бетӏер хӀал",
    "news": "Хабарал",
    "articles": "МакъалабӀи",
    "dictionary": "Словарь",
    "gallery": "Галерея",
    "about": "ГӀуниб",
    "languageLessons": "МацӀалъул дарсал"
  },
  "home": {
    "latestNews": "ЦӀияб хабарал",
    "latestArticles": "ЦӀияб макъалабӀи",
    "wordOfTheDay": "Къоялъул калима",
    "photoGallery": "Суратазул галерея",
    "viewAll": "ЦинагӀи бихьизе",
    "listen": "Лъазе"
  },
  "dictionary": {
    "search": "Калима чӀезе...",
    "avar": "Авар",
    "turkish": "Туркиял",
    "russian": "Рус",
    "english": "Ингилис",
    "example": "Мисал",
    "pronunciation": "Лъималъи",
    "categories": "Категорияби",
    "allWords": "ЦинагӀиб калимаби",
    "difficulty": "ДаражӀа"
  },
  "articles": {
    "readMore": "ЦӀалдохъе",
    "publishedAt": "Печатлъана",
    "author": "Автор",
    "category": "Категория",
    "autoTranslated": "Гьаб макъала автомат таржума гьабуна"
  },
  "footer": {
    "about": "ГӀуниб",
    "contact": "Бахъ бицине",
    "becomeAuthor": "Автор гьечӀо",
    "rights": "ЦинагӀиб хӀукъуби хъвана"
  }
}
```

**Step 5: Create middleware**

Create `src/middleware.ts`:

```typescript
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: [
    '/',
    '/(tr|av|ru|en)/:path*',
    '/((?!api|admin|_next|_vercel|media|.*\\..*).*)',
  ],
}
```

**Step 6: Update next.config.mjs**

```javascript
import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

export default withPayload(withNextIntl(nextConfig))
```

**Step 7: Verify i18n works**

```bash
pnpm dev
```

Visit http://localhost:3000 — should redirect to http://localhost:3000/tr/

**Step 8: Commit**

```bash
git add -A
git commit -m "feat: configure 4-language i18n (TR/AV/RU/EN) with Payload + next-intl"
```

---

## Task 3: Create Payload Collections

**Files:**
- Create: `src/collections/Media.ts`
- Create: `src/collections/Users.ts`
- Create: `src/collections/Categories.ts`
- Create: `src/collections/Articles.ts`
- Create: `src/collections/Dictionary.ts`
- Create: `src/collections/Lessons.ts`
- Create: `src/collections/Gallery.ts`
- Modify: `src/payload.config.ts`

**Step 1: Create Media collection**

Create `src/collections/Media.ts`:

```typescript
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'audio/*'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 512 },
      { name: 'hero', width: 1920, height: 800 },
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    crop: true,
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
    { name: 'caption', type: 'text', localized: true },
  ],
}
```

**Step 2: Create Users collection**

Create `src/collections/Users.ts`:

```typescript
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'contributor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Author', value: 'author' },
        { label: 'Contributor', value: 'contributor' },
      ],
    },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
    { name: 'bio', type: 'textarea', localized: true },
    {
      name: 'preferredLanguage',
      type: 'select',
      options: [
        { label: 'Türkçe', value: 'tr' },
        { label: 'Авар мацӀ', value: 'av' },
        { label: 'Русский', value: 'ru' },
        { label: 'English', value: 'en' },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'platform', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}
```

**Step 3: Create Categories collection**

Create `src/collections/Categories.ts`:

```typescript
import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'icon', type: 'text' },
    { name: 'parent', type: 'relationship', relationTo: 'categories' },
  ],
}
```

**Step 4: Create Articles collection**

Create `src/collections/Articles.ts`:

```typescript
import type { CollectionConfig } from 'payload'
import { lexicalEditor, HeadingFeature, LinkFeature } from '@payloadcms/richtext-lexical'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, localized: true, unique: true },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
        ],
      }),
    },
    { name: 'excerpt', type: 'textarea', localized: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'category', type: 'relationship', relationTo: 'categories' },
    {
      name: 'tags',
      type: 'array',
      localized: true,
      fields: [{ name: 'tag', type: 'text' }],
    },
    { name: 'author', type: 'relationship', relationTo: 'users' },
    { name: 'source', type: 'text' },
    { name: 'sourceUrl', type: 'text' },
    { name: 'publishedAt', type: 'date', required: true },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Taslak', value: 'draft' },
        { label: 'Yayında', value: 'published' },
        { label: 'İnceleme', value: 'review' },
      ],
    },
    { name: 'isAutoTranslated', type: 'checkbox', defaultValue: false },
  ],
}
```

**Step 5: Create Dictionary collection**

Create `src/collections/Dictionary.ts`:

```typescript
import type { CollectionConfig } from 'payload'

export const Dictionary: CollectionConfig = {
  slug: 'dictionary',
  admin: {
    useAsTitle: 'wordAvar',
    defaultColumns: ['wordAvar', 'wordTurkish', 'partOfSpeech', 'category'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'wordAvar', type: 'text', required: true, label: 'Avarca' },
    { name: 'wordTurkish', type: 'text', required: true, label: 'Türkçe' },
    { name: 'wordRussian', type: 'text', label: 'Rusça' },
    { name: 'wordEnglish', type: 'text', label: 'İngilizce' },
    { name: 'pronunciation', type: 'text', label: 'Telaffuz (Latin)' },
    { name: 'audioFile', type: 'upload', relationTo: 'media', label: 'Ses Dosyası' },
    {
      name: 'partOfSpeech',
      type: 'select',
      label: 'Kelime Türü',
      options: [
        { label: 'İsim', value: 'noun' },
        { label: 'Fiil', value: 'verb' },
        { label: 'Sıfat', value: 'adjective' },
        { label: 'Zarf', value: 'adverb' },
        { label: 'Zamir', value: 'pronoun' },
        { label: 'Edat', value: 'preposition' },
        { label: 'Bağlaç', value: 'conjunction' },
        { label: 'Ünlem', value: 'interjection' },
        { label: 'Deyim', value: 'phrase' },
      ],
    },
    { name: 'exampleAvar', type: 'text', label: 'Avarca Örnek' },
    { name: 'exampleTurkish', type: 'text', label: 'Türkçe Örnek' },
    {
      name: 'category',
      type: 'select',
      label: 'Kategori',
      options: [
        { label: 'Günlük', value: 'daily' },
        { label: 'Aile', value: 'family' },
        { label: 'Yemek', value: 'food' },
        { label: 'Doğa', value: 'nature' },
        { label: 'Sayılar', value: 'numbers' },
        { label: 'Renkler', value: 'colors' },
        { label: 'Vücut', value: 'body' },
        { label: 'Zaman', value: 'time' },
        { label: 'Selamlaşma', value: 'greetings' },
        { label: 'Seyahat', value: 'travel' },
        { label: 'Ev', value: 'home' },
        { label: 'Meslek', value: 'profession' },
      ],
    },
    {
      name: 'difficulty',
      type: 'select',
      label: 'Zorluk',
      options: [
        { label: 'Başlangıç', value: 'beginner' },
        { label: 'Orta', value: 'intermediate' },
        { label: 'İleri', value: 'advanced' },
      ],
    },
    {
      name: 'relatedWords',
      type: 'relationship',
      relationTo: 'dictionary',
      hasMany: true,
      label: 'İlgili Kelimeler',
    },
  ],
}
```

**Step 6: Create Gallery collection**

Create `src/collections/Gallery.ts`:

```typescript
import type { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text', localized: true },
        { name: 'location', type: 'text' },
      ],
    },
    { name: 'album', type: 'text', localized: true },
    { name: 'photographer', type: 'text' },
    { name: 'dateTaken', type: 'date' },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text' }],
    },
  ],
}
```

**Step 7: Create Lessons collection (Faz 2 — skeleton)**

Create `src/collections/Lessons.ts`:

```typescript
import type { CollectionConfig } from 'payload'

export const Lessons: CollectionConfig = {
  slug: 'lessons',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'level',
      type: 'select',
      required: true,
      options: [
        { label: 'A1 - Başlangıç', value: 'A1' },
        { label: 'A2 - Temel', value: 'A2' },
        { label: 'B1 - Orta', value: 'B1' },
        { label: 'B2 - İleri Orta', value: 'B2' },
      ],
    },
    { name: 'order', type: 'number', required: true },
    {
      name: 'vocabularyWords',
      type: 'relationship',
      relationTo: 'dictionary',
      hasMany: true,
    },
    { name: 'content', type: 'richText', localized: true },
    {
      name: 'exercises',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Flash Kart', value: 'flashcard' },
            { label: 'Çoktan Seçmeli', value: 'multiple_choice' },
            { label: 'Boşluk Doldurma', value: 'fill_blank' },
            { label: 'Eşleştirme', value: 'matching' },
          ],
        },
        { name: 'question', type: 'text', localized: true },
        {
          name: 'options',
          type: 'array',
          fields: [{ name: 'option', type: 'text', localized: true }],
        },
        { name: 'answer', type: 'text' },
      ],
    },
    { name: 'audioLesson', type: 'upload', relationTo: 'media' },
  ],
}
```

**Step 8: Register all collections in payload.config.ts**

Update the `collections` array in `src/payload.config.ts`:

```typescript
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { Categories } from './collections/Categories'
import { Articles } from './collections/Articles'
import { Dictionary } from './collections/Dictionary'
import { Gallery } from './collections/Gallery'
import { Lessons } from './collections/Lessons'

// In buildConfig:
collections: [Users, Media, Categories, Articles, Dictionary, Gallery, Lessons],
```

**Step 9: Verify collections in admin panel**

```bash
pnpm dev
```

Visit http://localhost:3000/admin — all 7 collections should appear in sidebar.

**Step 10: Commit**

```bash
git add -A
git commit -m "feat: add all Payload collections (Articles, Dictionary, Gallery, Lessons, Media, Categories, Users)"
```

---

## Task 4: Build Frontend Layout and Navigation

**Files:**
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/app/[locale]/page.tsx`
- Create: `src/components/Header.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/components/LanguageSwitcher.tsx`
- Modify: `src/app/globals.css` (Tailwind setup)
- Create: `tailwind.config.ts` (font config)

**Step 1: Set up Tailwind with Noto Sans font**

Ensure `src/app/(frontend)/globals.css` or `src/app/globals.css` has:

```css
@import "tailwindcss";

@layer base {
  @font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
    src: url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@100..900&display=swap');
  }

  body {
    font-family: 'Noto Sans', system-ui, sans-serif;
    @apply bg-white text-gray-900 antialiased;
  }
}
```

**Step 2: Create LanguageSwitcher component**

Create `src/components/LanguageSwitcher.tsx`:

```tsx
'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next-intl/navigation'
import { routing } from '@/i18n/routing'

const localeLabels: Record<string, string> = {
  tr: 'TR',
  av: 'АВ',
  ru: 'RU',
  en: 'EN',
}

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="flex gap-1">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => router.replace(pathname, { locale: loc })}
          className={`px-2 py-1 text-sm rounded transition-colors ${
            locale === loc
              ? 'bg-emerald-700 text-white font-bold'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {localeLabels[loc]}
        </button>
      ))}
    </div>
  )
}
```

**Step 3: Create Header component**

Create `src/components/Header.tsx`:

```tsx
import { useTranslations } from 'next-intl'
import Link from 'next-intl/link'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  const t = useTranslations('nav')

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-emerald-800">
          MagaruLaw
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-emerald-700">{t('home')}</Link>
          <Link href="/haberler" className="hover:text-emerald-700">{t('news')}</Link>
          <Link href="/makaleler" className="hover:text-emerald-700">{t('articles')}</Link>
          <Link href="/sozluk" className="hover:text-emerald-700">{t('dictionary')}</Link>
          <Link href="/galeri" className="hover:text-emerald-700">{t('gallery')}</Link>
          <Link href="/hakkimizda" className="hover:text-emerald-700">{t('about')}</Link>
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  )
}
```

**Step 4: Create Footer component**

Create `src/components/Footer.tsx`:

```tsx
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            &copy; {year} MagaruLaw. {t('rights')}
          </div>
          <div className="flex gap-6 text-sm text-gray-600">
            <span>{t('about')}</span>
            <span>{t('contact')}</span>
            <span>{t('becomeAuthor')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

**Step 5: Create locale layout**

Create `src/app/(frontend)/[locale]/layout.tsx`:

```tsx
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import '../globals.css'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="mx-auto max-w-7xl px-4 py-8">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

**Step 6: Create homepage**

Create `src/app/(frontend)/[locale]/page.tsx`:

```tsx
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  // Will be async in production — simplified for MVP skeleton
  const t = useTranslations('home')
  const tSite = useTranslations('site')

  return (
    <div>
      {/* Hero Section */}
      <section className="relative rounded-2xl bg-gradient-to-r from-emerald-800 to-emerald-600 text-white p-12 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {tSite('tagline')}
        </h1>
        <p className="text-lg text-emerald-100 max-w-2xl">
          {tSite('description')}
        </p>
      </section>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Latest News */}
        <section className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">{t('latestNews')}</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-gray-50">
              <p className="text-gray-500 text-sm">Henüz haber eklenmemiş / No news yet</p>
            </div>
          </div>
        </section>

        {/* Word of the Day */}
        <section>
          <h2 className="text-2xl font-bold mb-6">{t('wordOfTheDay')}</h2>
          <div className="p-6 border-2 border-emerald-200 rounded-xl bg-emerald-50">
            <p className="text-3xl font-bold text-emerald-800 mb-2">Росдал</p>
            <p className="text-lg text-gray-700">Köy / Village / Село</p>
            <p className="text-sm text-gray-500 mt-2 italic">
              &quot;Дир росдал гъоркьаб рукъ буго&quot;
            </p>
            <p className="text-sm text-gray-500">
              &quot;Benim köyümde güzel bir ev var&quot;
            </p>
          </div>
        </section>
      </div>

      {/* Latest Articles */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">{t('latestArticles')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-xl overflow-hidden">
              <div className="h-48 bg-gray-200" />
              <div className="p-4">
                <p className="text-gray-400 text-sm">Yakında / Coming soon</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Photo Gallery Preview */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">{t('photoGallery')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg" />
          ))}
        </div>
      </section>
    </div>
  )
}
```

**Step 7: Verify frontend**

```bash
pnpm dev
```

Visit http://localhost:3000/tr/ — Homepage with hero, sections, and language switcher should render.
Visit http://localhost:3000/en/ — English translations should show.

**Step 8: Commit**

```bash
git add -A
git commit -m "feat: add frontend layout with Header, Footer, LanguageSwitcher, and Homepage"
```

---

## Task 5: Build Content Pages (Articles, Dictionary, Gallery)

**Files:**
- Create: `src/app/(frontend)/[locale]/haberler/page.tsx`
- Create: `src/app/(frontend)/[locale]/makaleler/page.tsx`
- Create: `src/app/(frontend)/[locale]/makaleler/[slug]/page.tsx`
- Create: `src/app/(frontend)/[locale]/sozluk/page.tsx`
- Create: `src/app/(frontend)/[locale]/galeri/page.tsx`
- Create: `src/app/(frontend)/[locale]/hakkimizda/page.tsx`
- Create: `src/lib/payload.ts` (Payload client helper)

**Step 1: Create Payload client helper**

Create `src/lib/payload.ts`:

```typescript
import { getPayload } from 'payload'
import config from '@payload-config'

export async function getPayloadClient() {
  return getPayload({ config })
}
```

**Step 2: Create News page**

Create `src/app/(frontend)/[locale]/haberler/page.tsx`:

```tsx
import { getPayloadClient } from '@/lib/payload'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const payload = await getPayloadClient()
  const news = await payload.find({
    collection: 'articles',
    locale: locale as any,
    where: {
      status: { equals: 'published' },
      'category.slug': { equals: 'haberler' },
    },
    sort: '-publishedAt',
    limit: 20,
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Haberler</h1>
      {news.docs.length === 0 ? (
        <p className="text-gray-500">Henüz haber yok.</p>
      ) : (
        <div className="space-y-6">
          {news.docs.map((article) => (
            <article key={article.id} className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-gray-500 text-sm mt-1">
                {new Date(article.publishedAt).toLocaleDateString(locale)}
              </p>
              {article.excerpt && (
                <p className="text-gray-700 mt-2">{article.excerpt}</p>
              )}
              {article.isAutoTranslated && (
                <span className="inline-block mt-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  Otomatik çeviri
                </span>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
```

**Step 3: Create Articles listing page**

Create `src/app/(frontend)/[locale]/makaleler/page.tsx`:

```tsx
import { getPayloadClient } from '@/lib/payload'
import { setRequestLocale } from 'next-intl/server'
import Link from 'next/link'

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const payload = await getPayloadClient()
  const articles = await payload.find({
    collection: 'articles',
    locale: locale as any,
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 20,
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Makaleler</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.docs.map((article) => (
          <Link
            key={article.id}
            href={`/${locale}/makaleler/${article.slug}`}
            className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-48 bg-gray-200" />
            <div className="p-4">
              <h2 className="font-semibold text-lg">{article.title}</h2>
              {article.excerpt && (
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {article.excerpt}
                </p>
              )}
              <p className="text-gray-400 text-xs mt-2">
                {new Date(article.publishedAt).toLocaleDateString(locale)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

**Step 4: Create Article detail page**

Create `src/app/(frontend)/[locale]/makaleler/[slug]/page.tsx`:

```tsx
import { getPayloadClient } from '@/lib/payload'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'articles',
    locale: locale as any,
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const article = result.docs[0]
  if (!article) notFound()

  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
        <time>{new Date(article.publishedAt).toLocaleDateString(locale)}</time>
        {article.isAutoTranslated && (
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
            Otomatik çeviri
          </span>
        )}
        {article.source && <span>Kaynak: {article.source}</span>}
      </div>
      <div className="prose prose-lg max-w-none">
        {article.content && <RichText data={article.content} />}
      </div>
    </article>
  )
}
```

**Step 5: Create Dictionary page**

Create `src/app/(frontend)/[locale]/sozluk/page.tsx`:

```tsx
import { getPayloadClient } from '@/lib/payload'
import { setRequestLocale } from 'next-intl/server'

export default async function DictionaryPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const payload = await getPayloadClient()
  const words = await payload.find({
    collection: 'dictionary',
    limit: 100,
    sort: 'wordAvar',
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Avarca-Türkçe Sözlük</h1>

      {/* Search bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Kelime ara..."
          className="w-full max-w-md px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none"
        />
      </div>

      {/* Word list */}
      <div className="space-y-3">
        {words.docs.map((word) => (
          <div
            key={word.id}
            className="border rounded-lg p-4 hover:bg-emerald-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xl font-bold text-emerald-800">
                  {word.wordAvar}
                </span>
                {word.pronunciation && (
                  <span className="text-gray-400 text-sm ml-2">
                    [{word.pronunciation}]
                  </span>
                )}
                {word.partOfSpeech && (
                  <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                    {word.partOfSpeech}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
              <div><span className="text-gray-400">TR:</span> {word.wordTurkish}</div>
              {word.wordRussian && <div><span className="text-gray-400">RU:</span> {word.wordRussian}</div>}
              {word.wordEnglish && <div><span className="text-gray-400">EN:</span> {word.wordEnglish}</div>}
            </div>
            {word.exampleAvar && (
              <div className="mt-2 text-sm text-gray-600 italic">
                &quot;{word.exampleAvar}&quot; — &quot;{word.exampleTurkish}&quot;
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
```

**Step 6: Create Gallery page**

Create `src/app/(frontend)/[locale]/galeri/page.tsx`:

```tsx
import { getPayloadClient } from '@/lib/payload'
import { setRequestLocale } from 'next-intl/server'

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const payload = await getPayloadClient()
  const galleries = await payload.find({
    collection: 'gallery',
    locale: locale as any,
    limit: 20,
    sort: '-createdAt',
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Fotoğraf Galerisi</h1>
      {galleries.docs.length === 0 ? (
        <p className="text-gray-500">Henüz fotoğraf eklenmemiş.</p>
      ) : (
        <div className="space-y-12">
          {galleries.docs.map((gallery) => (
            <section key={gallery.id}>
              <h2 className="text-xl font-semibold mb-4">{gallery.title}</h2>
              {gallery.description && (
                <p className="text-gray-600 mb-4">{gallery.description}</p>
              )}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {gallery.images?.map((item, idx) => (
                  <div key={idx} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                    {typeof item.image === 'object' && item.image?.url && (
                      <img
                        src={item.image.url}
                        alt={item.caption || gallery.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
```

**Step 7: Create About page**

Create `src/app/(frontend)/[locale]/hakkimizda/page.tsx`:

```tsx
import { setRequestLocale } from 'next-intl/server'

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Hakkımızda</h1>
      <div className="prose prose-lg">
        <p>
          <strong>MagaruLaw</strong>, Dağıstan&apos;ın kadim halkı olan Avarların
          kültürünü, dilini ve tarihini korumak ve yaymak amacıyla kurulmuş
          bağımsız bir dijital platformdur.
        </p>
        <h2>Misyonumuz</h2>
        <p>
          Dünya genelinde dağınık yaşayan Avar diasporasını tek bir dijital çatı
          altında buluşturmak, Avarca dilinin öğrenilmesini ve korunmasını
          desteklemek, Dağıstan&apos;dan güncel haberleri Türkçe, İngilizce ve
          Avarca olarak sunmak.
        </p>
        <h2>Avar Halkı Hakkında</h2>
        <p>
          Avarlar (Авар, МагӀарулал), Dağıstan Cumhuriyeti&apos;nin en kalabalık
          etnik grubudur. Yaklaşık 1 milyon kişilik nüfusuyla Kuzey Kafkasya&apos;nın
          en büyük halklarından biridir. Avarlar, zengin bir edebiyat, müzik ve
          el sanatları geleneğine sahiptir.
        </p>
        <h2>Katkıda Bulunun</h2>
        <p>
          Bu platform topluluk katkısıyla büyümektedir. Yazar olmak, sözlüğe
          kelime eklemek veya fotoğraf paylaşmak isterseniz bizimle iletişime
          geçin.
        </p>
      </div>
    </div>
  )
}
```

**Step 8: Verify all pages**

```bash
pnpm dev
```

Check: `/tr/`, `/tr/haberler`, `/tr/makaleler`, `/tr/sozluk`, `/tr/galeri`, `/tr/hakkimizda`

**Step 9: Commit**

```bash
git add -A
git commit -m "feat: add all MVP content pages (News, Articles, Dictionary, Gallery, About)"
```

---

## Task 6: Seed Initial Data

**Files:**
- Create: `src/seed/index.ts`
- Create: `src/seed/categories.ts`
- Create: `src/seed/dictionary.ts`

**Step 1: Create seed script for categories**

Create `src/seed/categories.ts`:

```typescript
import type { Payload } from 'payload'

const categories = [
  { slug: 'tarih-kultur', name: { tr: 'Tarih & Kültür', av: 'Тарих ва культура', ru: 'История и культура', en: 'History & Culture' }, icon: '🏛️' },
  { slug: 'haberler', name: { tr: 'Haberler', av: 'Хабарал', ru: 'Новости', en: 'News' }, icon: '📰' },
  { slug: 'diaspora', name: { tr: 'Diaspora', av: 'Диаспора', ru: 'Диаспора', en: 'Diaspora' }, icon: '🌍' },
  { slug: 'dil-egitim', name: { tr: 'Dil & Eğitim', av: 'МацӀ ва тӀалим', ru: 'Язык и образование', en: 'Language & Education' }, icon: '📚' },
  { slug: 'sanat-muzik', name: { tr: 'Sanat & Müzik', av: 'Искусство ва музыка', ru: 'Искусство и музыка', en: 'Art & Music' }, icon: '🎵' },
  { slug: 'yemek-kulturu', name: { tr: 'Yemek Kültürü', av: 'Хурагалъул культура', ru: 'Кулинария', en: 'Cuisine' }, icon: '🍽️' },
  { slug: 'kisiler', name: { tr: 'Kişiler', av: 'Инсабал', ru: 'Люди', en: 'People' }, icon: '👤' },
  { slug: 'fotograf-video', name: { tr: 'Fotoğraf & Video', av: 'Суратал ва видео', ru: 'Фото и видео', en: 'Photo & Video' }, icon: '📷' },
]

export async function seedCategories(payload: Payload) {
  for (const cat of categories) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: cat.slug } },
    })

    if (existing.docs.length === 0) {
      // Create with default locale (tr)
      const created = await payload.create({
        collection: 'categories',
        locale: 'tr',
        data: { slug: cat.slug, name: cat.name.tr, icon: cat.icon },
      })
      // Update other locales
      for (const loc of ['av', 'ru', 'en'] as const) {
        await payload.update({
          collection: 'categories',
          id: created.id,
          locale: loc,
          data: { name: cat.name[loc] },
        })
      }
      console.log(`Created category: ${cat.slug}`)
    }
  }
}
```

**Step 2: Create seed script for dictionary sample words**

Create `src/seed/dictionary.ts`:

```typescript
import type { Payload } from 'payload'

const words = [
  { wordAvar: 'Росдал', wordTurkish: 'Köy', wordRussian: 'Село', wordEnglish: 'Village', pronunciation: 'rosdal', partOfSpeech: 'noun', category: 'daily', difficulty: 'beginner', exampleAvar: 'Дир росдал гъоркьаб рукъ буго', exampleTurkish: 'Benim köyümde güzel bir ev var' },
  { wordAvar: 'Эбел', wordTurkish: 'Anne', wordRussian: 'Мать', wordEnglish: 'Mother', pronunciation: 'ebel', partOfSpeech: 'noun', category: 'family', difficulty: 'beginner', exampleAvar: 'Дир эбел цӀуяб нуж йиго', exampleTurkish: 'Annem genç bir kadındır' },
  { wordAvar: 'Эмен', wordTurkish: 'Baba', wordRussian: 'Отец', wordEnglish: 'Father', pronunciation: 'emen', partOfSpeech: 'noun', category: 'family', difficulty: 'beginner', exampleAvar: 'Дир эмен хъвараб чи вуго', exampleTurkish: 'Babam güçlü bir insandır' },
  { wordAvar: 'Рукъ', wordTurkish: 'Ev', wordRussian: 'Дом', wordEnglish: 'House', pronunciation: 'ruq', partOfSpeech: 'noun', category: 'home', difficulty: 'beginner', exampleAvar: 'Гьаб рукъ бакӀараб буго', exampleTurkish: 'Bu ev büyüktür' },
  { wordAvar: 'ЛъикӀ', wordTurkish: 'İyi', wordRussian: 'Хороший', wordEnglish: 'Good', pronunciation: "l'ik'", partOfSpeech: 'adjective', category: 'daily', difficulty: 'beginner', exampleAvar: 'ЛъикӀ буго', exampleTurkish: 'İyidir' },
  { wordAvar: 'Хӏинкъал', wordTurkish: 'Hinkal (geleneksel yemek)', wordRussian: 'Хинкал', wordEnglish: 'Hinkal (traditional dish)', pronunciation: 'hinqal', partOfSpeech: 'noun', category: 'food', difficulty: 'beginner', exampleAvar: 'Эбелалъ хӏинкъал гьабуна', exampleTurkish: 'Annem hinkal yaptı' },
  { wordAvar: 'МацӀ', wordTurkish: 'Dil', wordRussian: 'Язык', wordEnglish: 'Language', pronunciation: "mac'", partOfSpeech: 'noun', category: 'daily', difficulty: 'beginner', exampleAvar: 'Авар мацӀ гӀемераб мацӀ буго', exampleTurkish: 'Avarca zengin bir dildir' },
  { wordAvar: 'Гъуниб', wordTurkish: 'Gunib', wordRussian: 'Гуниб', wordEnglish: 'Gunib', pronunciation: 'gunib', partOfSpeech: 'noun', category: 'travel', difficulty: 'beginner', exampleAvar: 'Гъуниб гъоркьаб мина буго', exampleTurkish: 'Gunib güzel bir yerdir' },
  { wordAvar: 'Салам', wordTurkish: 'Merhaba', wordRussian: 'Привет', wordEnglish: 'Hello', pronunciation: 'salam', partOfSpeech: 'interjection', category: 'greetings', difficulty: 'beginner', exampleAvar: 'Салам алейкум!', exampleTurkish: 'Selam aleyküm!' },
  { wordAvar: 'Баркала', wordTurkish: 'Teşekkürler', wordRussian: 'Спасибо', wordEnglish: 'Thank you', pronunciation: 'barkala', partOfSpeech: 'interjection', category: 'greetings', difficulty: 'beginner', exampleAvar: 'Баркала дуе!', exampleTurkish: 'Sana teşekkürler!' },
]

export async function seedDictionary(payload: Payload) {
  for (const word of words) {
    const existing = await payload.find({
      collection: 'dictionary',
      where: { wordAvar: { equals: word.wordAvar } },
    })

    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'dictionary',
        data: word,
      })
      console.log(`Created word: ${word.wordAvar} = ${word.wordTurkish}`)
    }
  }
}
```

**Step 3: Create main seed runner**

Create `src/seed/index.ts`:

```typescript
import { getPayload } from 'payload'
import config from '@payload-config'
import { seedCategories } from './categories'
import { seedDictionary } from './dictionary'

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding categories...')
  await seedCategories(payload)

  console.log('Seeding dictionary...')
  await seedDictionary(payload)

  console.log('Seeding complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
```

Add to `package.json` scripts:

```json
"seed": "tsx src/seed/index.ts"
```

**Step 4: Install tsx and run seed**

```bash
pnpm add -D tsx
pnpm seed
```

Expected: Categories and 10 dictionary words created.

**Step 5: Verify in admin panel and frontend**

Visit http://localhost:3000/admin/collections/categories — 8 categories
Visit http://localhost:3000/admin/collections/dictionary — 10 words
Visit http://localhost:3000/tr/sozluk — dictionary page shows words

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: add seed data (8 categories + 10 Avar-Turkish dictionary words)"
```

---

## Task 7: Docker Deployment Setup

**Files:**
- Create: `Dockerfile`
- Create: `docker-compose.yml`
- Create: `Caddyfile`
- Create: `.dockerignore`

**Step 1: Create .dockerignore**

Create `.dockerignore`:

```
node_modules
.next
.git
media
*.log
.env.local
```

**Step 2: Create Dockerfile**

Create `Dockerfile`:

```dockerfile
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
```

**Step 3: Create docker-compose.yml**

Create `docker-compose.yml`:

```yaml
services:
  db:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_DB: magarulaw
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD:-changeme}
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  app:
    build: .
    restart: unless-stopped
    depends_on:
      - db
    environment:
      DATABASE_URL: postgresql://postgres:${DB_PASSWORD:-changeme}@db:5432/magarulaw
      PAYLOAD_SECRET: ${PAYLOAD_SECRET:-change-this-secret-in-production-min32}
      NEXT_PUBLIC_SITE_URL: ${SITE_URL:-https://magarulaw.com}
    ports:
      - "3000:3000"
    volumes:
      - media:/app/media

  freshrss:
    image: freshrss/freshrss:latest
    restart: unless-stopped
    environment:
      TZ: Europe/Istanbul
      CRON_MIN: "*/30"
    volumes:
      - freshrss_data:/var/www/FreshRSS/data
      - freshrss_extensions:/var/www/FreshRSS/extensions
    ports:
      - "8080:80"

  caddy:
    image: caddy:2-alpine
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
      - caddy_config:/config
    depends_on:
      - app
      - freshrss

volumes:
  pgdata:
  media:
  freshrss_data:
  freshrss_extensions:
  caddy_data:
  caddy_config:
```

**Step 4: Create Caddyfile**

Create `Caddyfile`:

```
magarulaw.com {
    reverse_proxy app:3000
}

rss.magarulaw.com {
    reverse_proxy freshrss:80
}
```

**Step 5: Add standalone output to next.config.mjs**

Add `output: 'standalone'` to nextConfig:

```javascript
const nextConfig = {
  output: 'standalone',
  experimental: { reactCompiler: false },
  // ... rest of config
}
```

**Step 6: Test Docker build locally**

```bash
docker compose up db -d
docker compose build app
```

Expected: Build completes successfully.

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: add Docker deployment (Dockerfile, docker-compose, Caddy reverse proxy)"
```

---

## Task 8: News Pipeline (FreshRSS + Translation Script)

**Files:**
- Create: `scripts/news-pipeline/requirements.txt`
- Create: `scripts/news-pipeline/fetch_and_translate.py`
- Create: `scripts/news-pipeline/Dockerfile`
- Modify: `docker-compose.yml` (add news-pipeline service)

**Step 1: Create Python requirements**

Create `scripts/news-pipeline/requirements.txt`:

```
requests==2.32.*
google-cloud-translate==3.*
schedule==1.*
```

**Step 2: Create news pipeline script**

Create `scripts/news-pipeline/fetch_and_translate.py`:

```python
"""
News Pipeline: Fetches articles from FreshRSS and translates RU→TR/EN
then creates draft articles in Payload CMS via REST API.
"""
import os
import json
import time
import requests
import schedule
from datetime import datetime, timezone

FRESHRSS_URL = os.getenv("FRESHRSS_URL", "http://freshrss:80")
FRESHRSS_USER = os.getenv("FRESHRSS_USER", "admin")
FRESHRSS_API_KEY = os.getenv("FRESHRSS_API_KEY", "")
PAYLOAD_URL = os.getenv("PAYLOAD_URL", "http://app:3000")
PAYLOAD_API_KEY = os.getenv("PAYLOAD_API_KEY", "")
GOOGLE_TRANSLATE_API_KEY = os.getenv("GOOGLE_TRANSLATE_API_KEY", "")
CATEGORY_ID = os.getenv("NEWS_CATEGORY_ID", "")


def translate_text(text: str, target_lang: str) -> str:
    """Translate text using Google Cloud Translation API."""
    if not text or not GOOGLE_TRANSLATE_API_KEY:
        return text

    url = "https://translation.googleapis.com/language/translate/v2"
    params = {
        "q": text,
        "target": target_lang,
        "source": "ru",
        "key": GOOGLE_TRANSLATE_API_KEY,
        "format": "text",
    }
    try:
        resp = requests.post(url, params=params, timeout=30)
        resp.raise_for_status()
        return resp.json()["data"]["translations"][0]["translatedText"]
    except Exception as e:
        print(f"Translation error: {e}")
        return text


def fetch_freshrss_entries():
    """Fetch unread entries from FreshRSS Fever API."""
    try:
        url = f"{FRESHRSS_URL}/api/greader.php/reader/api/0/stream/contents/reading-list"
        headers = {"Authorization": f"GoogleLogin auth={FRESHRSS_API_KEY}"}
        params = {"n": 20, "xt": "user/-/state/com.google/read"}
        resp = requests.get(url, headers=headers, params=params, timeout=30)
        resp.raise_for_status()
        return resp.json().get("items", [])
    except Exception as e:
        print(f"FreshRSS fetch error: {e}")
        return []


def create_payload_article(title_tr: str, content_tr: str, title_en: str,
                           content_en: str, source: str, source_url: str):
    """Create a draft article in Payload CMS."""
    slug = title_tr[:80].lower().replace(" ", "-").replace("'", "")

    headers = {
        "Content-Type": "application/json",
    }
    if PAYLOAD_API_KEY:
        headers["Authorization"] = f"users API-Key {PAYLOAD_API_KEY}"

    data = {
        "title": title_tr,
        "slug": slug,
        "excerpt": content_tr[:200] + "..." if len(content_tr) > 200 else content_tr,
        "source": source,
        "sourceUrl": source_url,
        "publishedAt": datetime.now(timezone.utc).isoformat(),
        "status": "published",
        "isAutoTranslated": True,
    }

    if CATEGORY_ID:
        data["category"] = CATEGORY_ID

    try:
        # Create with Turkish locale
        resp = requests.post(
            f"{PAYLOAD_URL}/api/articles?locale=tr",
            json=data,
            headers=headers,
            timeout=30,
        )
        resp.raise_for_status()
        article_id = resp.json().get("doc", {}).get("id")

        if article_id and title_en:
            # Update with English translation
            requests.patch(
                f"{PAYLOAD_URL}/api/articles/{article_id}?locale=en",
                json={"title": title_en, "excerpt": content_en[:200] + "..."},
                headers=headers,
                timeout=30,
            )

        print(f"Created article: {title_tr[:60]}...")
        return article_id
    except Exception as e:
        print(f"Payload create error: {e}")
        return None


def run_pipeline():
    """Main pipeline: fetch → translate → create."""
    print(f"[{datetime.now()}] Running news pipeline...")
    entries = fetch_freshrss_entries()
    print(f"Found {len(entries)} new entries")

    for entry in entries:
        title_ru = entry.get("title", "")
        content_ru = entry.get("summary", {}).get("content", "")
        source_url = entry.get("alternate", [{}])[0].get("href", "")
        source = entry.get("origin", {}).get("title", "Unknown")

        if not title_ru:
            continue

        # Translate to Turkish
        title_tr = translate_text(title_ru, "tr")
        content_tr = translate_text(content_ru[:3000], "tr")

        # Translate to English
        title_en = translate_text(title_ru, "en")
        content_en = translate_text(content_ru[:3000], "en")

        create_payload_article(title_tr, content_tr, title_en, content_en,
                               source, source_url)

        time.sleep(1)  # Rate limiting

    print(f"[{datetime.now()}] Pipeline complete.")


if __name__ == "__main__":
    print("Starting news pipeline scheduler...")
    run_pipeline()  # Run immediately on start
    schedule.every(2).hours.do(run_pipeline)

    while True:
        schedule.run_pending()
        time.sleep(60)
```

**Step 3: Create pipeline Dockerfile**

Create `scripts/news-pipeline/Dockerfile`:

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY fetch_and_translate.py .
CMD ["python", "fetch_and_translate.py"]
```

**Step 4: Add news-pipeline to docker-compose.yml**

Add this service to `docker-compose.yml`:

```yaml
  news-pipeline:
    build: ./scripts/news-pipeline
    restart: unless-stopped
    depends_on:
      - app
      - freshrss
    environment:
      FRESHRSS_URL: http://freshrss:80
      FRESHRSS_USER: admin
      FRESHRSS_API_KEY: ${FRESHRSS_API_KEY:-}
      PAYLOAD_URL: http://app:3000
      PAYLOAD_API_KEY: ${PAYLOAD_API_KEY:-}
      GOOGLE_TRANSLATE_API_KEY: ${GOOGLE_TRANSLATE_API_KEY:-}
      NEWS_CATEGORY_ID: ${NEWS_CATEGORY_ID:-}
```

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add automated news pipeline (FreshRSS + Google Translate + Payload)"
```

---

## Task 9: Final Verification and Production Prep

**Files:**
- Create: `.env.example`
- Create: `README.md` (minimal, deployment instructions only)

**Step 1: Create .env.example**

Create `.env.example`:

```env
# Database
DATABASE_URL=postgresql://postgres:changeme@localhost:5432/magarulaw
DB_PASSWORD=changeme

# Payload CMS
PAYLOAD_SECRET=your-secret-here-minimum-32-characters-long

# Site
SITE_URL=https://magarulaw.com
NEXT_PUBLIC_SITE_URL=https://magarulaw.com

# Cloudinary (optional, for CDN media)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Google Cloud Translation API
GOOGLE_TRANSLATE_API_KEY=

# News Pipeline
FRESHRSS_API_KEY=
PAYLOAD_API_KEY=
NEWS_CATEGORY_ID=
```

**Step 2: Run full dev build check**

```bash
pnpm build
```

Expected: Build succeeds with no errors.

**Step 3: Test Docker Compose full stack**

```bash
docker compose up --build -d
```

Expected: All services start — app (3000), db (5432), freshrss (8080), caddy (80/443)

**Step 4: Create admin user**

Visit http://localhost:3000/admin and create the first admin user.

**Step 5: Run seed data**

```bash
pnpm seed
```

**Step 6: Final commit**

```bash
git add -A
git commit -m "feat: production-ready MVP with env config and Docker setup"
```

---

## Summary of Deliverables

After completing all 9 tasks, you will have:

| Component | Status |
|-----------|--------|
| Next.js 15 + Payload CMS 3 project | ✅ |
| 4-language i18n (TR/AV/RU/EN) | ✅ |
| 7 Payload collections (Articles, Dictionary, Gallery, Lessons, Media, Categories, Users) | ✅ |
| Frontend: Homepage, News, Articles, Dictionary, Gallery, About | ✅ |
| Seed data: 8 categories + 10 Avar-Turkish words | ✅ |
| Docker deployment (app + db + FreshRSS + Caddy) | ✅ |
| Automated news pipeline (fetch + translate + publish) | ✅ |
| Language switcher (TR/AV/RU/EN) | ✅ |
| Production-ready config | ✅ |

### Post-MVP Roadmap (not in this plan):
- Faz 2: Interactive language lessons with ts-fsrs flashcards
- Faz 2: Author registration and content submission
- Faz 3: Community forum (Discourse integration)
- Faz 3: Event calendar for diaspora
