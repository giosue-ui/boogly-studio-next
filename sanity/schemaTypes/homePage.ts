import { defineField, defineType } from 'sanity'

const ctaButton = {
  type: 'object',
  fields: [
    { name: 'label', title: 'Label', type: 'string' },
    { name: 'href', title: 'Link', type: 'string' },
  ],
  options: { collapsible: true, collapsed: false },
}

export const homePageType = defineType({
  name: 'homePage',
  title: 'Startseite',
  type: 'document',
  icon: () => '🏠',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'ticker', title: 'Themen-Ticker' },
    { name: 'about', title: 'Über uns' },
    { name: 'steps', title: 'So läuft es ab' },
    { name: 'cta', title: 'Schluss-CTA' },
    { name: 'faq', title: 'FAQ' },
  ],
  fields: [
    // Hero
    defineField({ name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'Human-Interest-Studio · Stuttgart' }),
    defineField({ name: 'heroHeadline', title: 'Headline (Zeilenumbruch mit Enter)', type: 'text', rows: 2, group: 'hero', initialValue: 'Echte Menschen.\nEchte Begegnungen.' }),
    defineField({ name: 'heroText', title: 'Text', type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'heroPrimaryCta', title: 'Button primär', type: 'object', group: 'hero', fields: ctaButton.fields }),
    defineField({ name: 'heroSecondaryCta', title: 'Button sekundär', type: 'object', group: 'hero', fields: ctaButton.fields }),
    // Ticker
    defineField({ name: 'tickerTopics', title: 'Themen', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, group: 'ticker' }),
    // About
    defineField({ name: 'aboutEyebrow', title: 'Eyebrow', type: 'string', group: 'about', initialValue: 'Über uns' }),
    defineField({ name: 'aboutHeadline', title: 'Headline', type: 'string', group: 'about' }),
    defineField({ name: 'aboutParagraphs', title: 'Absätze', type: 'array', of: [{ type: 'text', rows: 3 }], group: 'about' }),
    defineField({
      name: 'aboutStats',
      title: 'Stats (rechte Spalte)',
      type: 'array',
      group: 'about',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Titel (fett)', type: 'string' },
            { name: 'label', title: 'Untertitel', type: 'string' },
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        },
      ],
    }),
    // Steps
    defineField({ name: 'stepsEyebrow', title: 'Eyebrow', type: 'string', group: 'steps', initialValue: 'So läuft es ab' }),
    defineField({ name: 'stepsHeadline', title: 'Headline', type: 'string', group: 'steps', initialValue: 'Dein Weg ins Format' }),
    defineField({
      name: 'steps',
      title: 'Schritte',
      type: 'array',
      group: 'steps',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'num', title: 'Nummer', type: 'string' },
            { name: 'title', title: 'Titel', type: 'string' },
            { name: 'text', title: 'Text', type: 'text', rows: 2 },
          ],
          preview: { select: { title: 'title', subtitle: 'num' } },
        },
      ],
    }),
    // CTA
    defineField({ name: 'ctaEyebrow', title: 'Eyebrow', type: 'string', group: 'cta', initialValue: 'Mach mit' }),
    defineField({ name: 'ctaHeadline', title: 'Headline', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaText', title: 'Text', type: 'text', rows: 3, group: 'cta' }),
    defineField({ name: 'ctaButton', title: 'Button', type: 'object', group: 'cta', fields: ctaButton.fields }),
    // FAQ
    defineField({ name: 'faqEyebrow', title: 'Eyebrow', type: 'string', group: 'faq', initialValue: 'FAQ' }),
    defineField({ name: 'faqHeadline', title: 'Headline', type: 'string', group: 'faq', initialValue: 'Häufige Fragen' }),
    defineField({
      name: 'faqItems',
      title: 'FAQ-Einträge (auf Startseite)',
      type: 'array',
      group: 'faq',
      of: [{ type: 'reference', to: [{ type: 'faqItem' }] }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Startseite' }) },
})
