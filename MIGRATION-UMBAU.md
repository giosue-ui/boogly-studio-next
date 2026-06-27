# Umbau abgeschlossen — Design A in Struktur B/C

Das Design von **Website A** (`boogly-startseite.html`) wurde vollständig in dieses Next.js-Projekt
übernommen und alle Inhalte CMS-fähig gemacht. Die bewährte Infrastruktur (Sanity-Client, Airtable,
Brevo, Routing, ISR) blieb unangetastet.

## Nächste Schritte (auf deinem Mac)

```bash
cd "FINAL BS/boogly-studio-next"
npm install          # holt u. a. @sanity/vision (fehlte in node_modules)
npm run dev          # Website: localhost:3000 · Studio: localhost:3000/studio
```

> Hinweis: Im Sandbox konnte ich keinen vollen `npm run build` ausführen (kein npm-Registry-/Linux-
> Binary-Zugriff). Der TypeScript-Typecheck lief sauber durch — der einzige offene Punkt ist die
> fehlende Dependency `@sanity/vision`, die `npm install` automatisch nachzieht.

## Was sich geändert hat

**Design-Fundament**
- `tailwind.config.ts`, `app/globals.css` — Farben (Blau `#3B6EF6` / Grün `#54D98C`) & Fonts
  (Bricolage Grotesque, Hanken Grotesk, JetBrains Mono) von Website A.

**Neue Komponenten**
- `components/ui/`: `GooglyEyes.tsx` (Augen folgen Maus), `Logo.tsx`, `Eyebrow.tsx`, `SectionHeading.tsx`; `Button.tsx` neue Varianten (`primary`/`green`/`ghost`).
- `components/sections/`: `Hero`, `Ticker`, `AboutCard`, `Steps`, `FinalCta`, `FaqSection` — jede Sektion datengetrieben mit sinnvollem Fallback-Inhalt.
- `components/layout/Header.tsx` (Googly-Logo + Dropdown), `Footer.tsx` (Tape-Streifen).

**CMS (Sanity) — neu pflegbar**
- `sanity/schemaTypes/`: `siteSettings` (Header/Footer/Navigation/Social), `homePage` (alle Startseiten-Sektionen), `faqItem`, `aboutPage`, `page` (generische Seiten).
- Studio-Struktur mit fixierten Singletons (`sanity/sanity.config.ts`).
- Queries/Typen/Image-Helper in `lib/sanity/`.

**Seiten**
- `app/page.tsx` komplett aus Sektionen komponiert (inkl. dynamischer Castings-Grid).
- `app/faq/page.tsx` & `app/ueber-uns/page.tsx` jetzt CMS-gestützt.
- `app/[slug]/page.tsx` — neue Seiten komplett im CMS anlegbar, ohne Code.

## Wichtig: ohne CMS funktioniert alles trotzdem

Alle Sektionen haben die Texte von Website A als **Fallback** fest hinterlegt. Die Seite sieht also
sofort korrekt aus — und sobald du Felder im Studio befüllst, überschreiben diese die Fallbacks
Feld für Feld.

## Inhalte einpflegen

1. `localhost:3000/studio` öffnen (oder später `boogly.studio/studio`).
2. **Website-Einstellungen**, **Startseite**, **Über uns** befüllen; **FAQ-Einträge** & **Events** anlegen.
3. Neue Unterseite: unter **Seiten** ein `page`-Dokument mit Slug anlegen → live unter `/<slug>`.

## Domains (Phase 8 — gemeinsam in Vercel)

`boogly.studio` als Primärdomain; `booglystudio.com` und `booglystudio.de` demselben Vercel-Projekt
hinzufügen und auf **„Redirect to boogly.studio (301/308)"** stellen. Das machen wir zusammen, wenn die
Seite live geht.
