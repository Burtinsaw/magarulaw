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
