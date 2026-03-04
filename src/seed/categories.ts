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
      const created = await payload.create({
        collection: 'categories',
        locale: 'tr',
        data: { slug: cat.slug, name: cat.name.tr, icon: cat.icon },
      })
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
