import { defineField, defineType } from 'sanity'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'Über uns (Seite)',
  type: 'document',
  icon: () => '🙋',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Über uns' }),
    defineField({ name: 'title', title: 'Titel', type: 'string' }),
    defineField({
      name: 'body',
      title: 'Inhalt',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          marks: { decorators: [{ title: 'Fett', value: 'strong' }, { title: 'Kursiv', value: 'em' }] },
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt-Text', type: 'string' })],
    }),
  ],
  preview: { prepare: () => ({ title: 'Über uns' }) },
})
