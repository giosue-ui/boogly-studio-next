import { defineField, defineType } from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Event / Casting',
  type: 'document',
  icon: () => '🎬',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'URL-Slug',
      type: 'slug',
      description: 'Wird automatisch aus dem Titel generiert. Wird in der URL verwendet.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: '🟢 Aktiv – Bewerbungen offen', value: 'active' },
          { title: '🔴 Abgeschlossen', value: 'completed' },
          { title: '🟡 Entwurf – noch nicht veröffentlicht', value: 'draft' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Kurzbeschreibung',
      type: 'text',
      rows: 3,
      description: 'Wird auf der Events-Übersichtsseite und in SEO-Tags verwendet (max. 160 Zeichen).',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'description',
      title: 'Vollständige Beschreibung',
      type: 'array',
      description: 'Ausführliche Beschreibung des Events. Unterstützt Rich Text.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Fett', value: 'strong' },
              { title: 'Kursiv', value: 'em' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Titelbild',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt-Text (für Barrierefreiheit & SEO)',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'date',
      title: 'Event-Datum',
      type: 'datetime',
      options: { dateFormat: 'DD.MM.YYYY', timeFormat: 'HH:mm' },
    }),
    defineField({
      name: 'location',
      title: 'Ort',
      type: 'string',
      placeholder: 'z.B. Stuttgart, Baden-Württemberg',
    }),
    defineField({
      name: 'applicationDeadline',
      title: 'Bewerbungsfrist',
      type: 'datetime',
      description: 'Bis wann können sich Personen bewerben?',
      options: { dateFormat: 'DD.MM.YYYY', timeFormat: 'HH:mm' },
    }),
    defineField({
      name: 'format',
      title: 'Format-Name',
      type: 'string',
      description: 'z.B. „Ansichtssache", „Umzingelt". Wird im Bewerbungsformular als Format-Wert gespeichert.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'requirements',
      title: 'Voraussetzungen / Was wir suchen',
      type: 'text',
      rows: 4,
      description: 'Kurze Stichpunkte zu Voraussetzungen für Bewerber.',
    }),
    defineField({
      name: 'themes',
      title: 'Themen (Checkboxen im Bewerbungsformular)',
      type: 'array',
      description: 'Diese Themen werden als Checkboxen im Bewerbungsformular angezeigt.',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'maxParticipants',
      title: 'Max. Teilnehmerzahl',
      type: 'number',
      description: 'Optional. Für interne Planung.',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO-Titel (optional)',
      type: 'string',
      description: 'Wenn leer, wird der Event-Titel verwendet.',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO-Beschreibung (optional)',
      type: 'text',
      rows: 2,
      description: 'Wenn leer, wird die Kurzbeschreibung verwendet.',
      group: 'seo',
    }),
  ],
  groups: [
    { name: 'seo', title: 'SEO' },
  ],
  orderings: [
    {
      title: 'Datum (neueste zuerst)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      date: 'date',
      media: 'coverImage',
    },
    prepare({ title, status, date, media }) {
      const statusEmoji = status === 'active' ? '🟢' : status === 'completed' ? '🔴' : '🟡'
      const dateStr = date ? new Date(date).toLocaleDateString('de-DE') : 'Kein Datum'
      return {
        title: `${statusEmoji} ${title}`,
        subtitle: dateStr,
        media,
      }
    },
  },
})
