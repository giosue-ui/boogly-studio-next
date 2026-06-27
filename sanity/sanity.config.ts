import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

// Dokumenttypen, die als Singleton im Studio erscheinen (nicht „neu/löschen")
const SINGLETONS = ['siteSettings', 'homePage', 'aboutPage']

export default defineConfig({
  name: 'boogly-studio',
  title: 'Boogly Studio CMS',
  basePath: '/studio',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Boogly Studio')
          .items([
            // ── Singletons ───────────────────────────────
            S.listItem()
              .title('Startseite')
              .icon(() => '🏠')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.listItem()
              .title('Über uns')
              .icon(() => '🙋')
              .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.listItem()
              .title('Website-Einstellungen')
              .icon(() => '⚙️')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            // ── Sammlungen ───────────────────────────────
            S.listItem()
              .title('Events & Castings')
              .icon(() => '🎬')
              .child(
                S.documentList()
                  .title('Alle Events')
                  .filter('_type == "event"')
                  .defaultOrdering([{ field: 'date', direction: 'desc' }])
              ),
            S.listItem()
              .title('FAQ-Einträge')
              .icon(() => '❓')
              .child(
                S.documentList()
                  .title('Alle FAQ')
                  .filter('_type == "faqItem"')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),
            S.listItem()
              .title('Seiten')
              .icon(() => '📄')
              .child(S.documentList().title('Alle Seiten').filter('_type == "page"')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Singletons aus „Neues Dokument erstellen" entfernen
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },

  document: {
    // Verhindert das Löschen/Duplizieren von Singletons
    actions: (input, context) =>
      SINGLETONS.includes(context.schemaType)
        ? input.filter(({ action }) => action !== 'unpublish' && action !== 'delete' && action !== 'duplicate')
        : input,
  },
})
