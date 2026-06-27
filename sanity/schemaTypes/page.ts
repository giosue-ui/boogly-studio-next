import { defineField, defineType } from 'sanity'

/**
 * Generische Seite — damit neue Unterseiten komplett im CMS angelegt werden können,
 * ohne Code. Erreichbar unter /<slug> via app/[slug]/page.tsx.
 */
export const pageType = defineType({
  name: 'page',
  title: 'Seite',
  type: 'document',
  icon: () => '📄',
  groups: [{ name: 'seo', title: 'SEO' }],
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'URL-Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
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
        { type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({ name: 'seoTitle', title: 'SEO-Titel (optional)', type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'SEO-Beschreibung (optional)', type: 'text', rows: 2, group: 'seo' }),
  ],
  preview: { select: { title: 'title', subtitle: 'slug.current' } },
})
