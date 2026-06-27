import { defineField, defineType } from 'sanity'

const navLink = {
  type: 'object',
  fields: [
    { name: 'label', title: 'Label', type: 'string' },
    { name: 'href', title: 'Link (URL oder /pfad)', type: 'string' },
  ],
  preview: { select: { title: 'label', subtitle: 'href' } },
}

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Website-Einstellungen',
  type: 'document',
  icon: () => '⚙️',
  groups: [
    { name: 'brand', title: 'Marke & Header' },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    defineField({ name: 'brandName', title: 'Markenname (vor .studio)', type: 'string', initialValue: 'boogly', group: 'brand' }),
    defineField({ name: 'brandSuffix', title: 'Suffix', type: 'string', initialValue: '.studio', group: 'brand' }),
    defineField({ name: 'watchCtaLabel', title: 'Header-Button Label', type: 'string', initialValue: '▶ Jetzt schauen', group: 'brand' }),
    defineField({ name: 'watchCtaUrl', title: 'Header-Button Link', type: 'url', initialValue: 'https://youtube.com/@BooglyStudio', group: 'brand' }),
    defineField({
      name: 'nav',
      title: 'Navigation',
      type: 'array',
      group: 'brand',
      description: 'Hauptnavigation. Einträge mit Unterpunkten erscheinen als Dropdown.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'href', title: 'Link (optional, wenn Dropdown)', type: 'string' },
            { name: 'children', title: 'Unterpunkte (Dropdown)', type: 'array', of: [navLink] },
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        },
      ],
    }),
    defineField({ name: 'footerTagline', title: 'Footer-Text (Marke)', type: 'text', rows: 3, group: 'footer' }),
    defineField({
      name: 'footerColumns',
      title: 'Footer-Spalten',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Überschrift', type: 'string' },
            { name: 'links', title: 'Links', type: 'array', of: [navLink] },
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),
    defineField({
      name: 'socials',
      title: 'Social-Links',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Plattform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
          ],
          preview: { select: { title: 'label', subtitle: 'url' } },
        },
      ],
    }),
    defineField({ name: 'copyright', title: 'Copyright-Zeile', type: 'string', initialValue: '© 2026 BOOGLY.STUDIO · ALLE RECHTE VORBEHALTEN', group: 'footer' }),
  ],
  preview: { prepare: () => ({ title: 'Website-Einstellungen' }) },
})
