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
