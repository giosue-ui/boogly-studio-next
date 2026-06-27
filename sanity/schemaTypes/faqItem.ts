import { defineField, defineType } from 'sanity'

export const faqItemType = defineType({
  name: 'faqItem',
  title: 'FAQ-Eintrag',
  type: 'document',
  icon: () => '❓',
  fields: [
    defineField({ name: 'question', title: 'Frage', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'answer',
      title: 'Antwort',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: { decorators: [{ title: 'Fett', value: 'strong' }, { title: 'Kursiv', value: 'em' }] },
        },
      ],
    }),
    defineField({ name: 'order', title: 'Reihenfolge', type: 'number', description: 'Kleinere Zahl = weiter oben.' }),
  ],
  orderings: [{ title: 'Reihenfolge', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'question', subtitle: 'order' } },
})
