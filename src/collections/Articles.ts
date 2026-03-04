import type { CollectionConfig } from 'payload'
import { lexicalEditor, HeadingFeature } from '@payloadcms/richtext-lexical'

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
