# Boogly Studio — Architektur & Setup

## 1. Komplette Architektur

```
Browser
  │
  ├── Next.js App (Vercel)
  │     ├── Static / ISR Pages (Sanity-Inhalte, gecacht)
  │     ├── /api/apply         → Airtable + Brevo
  │     └── /api/contact       → Brevo
  │
  ├── Sanity Studio (/studio)  → CMS für Events und Castings
  │
  ├── Airtable                 → Datenbank für Bewerbungen
  └── Brevo                    → Transaktions-E-Mails
```

### Datenflüsse

**Besucher liest Events:**  
Browser → Vercel (Next.js) → Sanity CDN → gecachte Seite (ISR, 60 Sekunden)

**Besucher bewirbt sich:**  
Formular → POST /api/apply → Airtable (speichert Bewerbung) + Brevo (Bestätigungsmail an Bewerber + Benachrichtigung an euch)

**Du publizierst ein Event:**  
Sanity Studio (boogly.studio/studio) → Sanity API → nächster Seitenaufruf zeigt das neue Event

---

## 2. Alle Dateien und ihre Funktion

```
boogly-studio-next/
│
├── app/                          Next.js App Router (alle Seiten)
│   ├── layout.tsx                Haupt-Layout (Header, Footer, Meta)
│   ├── globals.css               Globale Styles, CSS-Variablen, Tailwind
│   ├── page.tsx                  Startseite (Hero, Featured Events, How It Works)
│   ├── not-found.tsx             404-Seite
│   ├── events/
│   │   ├── page.tsx              Events-Übersicht (aktive + vergangene)
│   │   └── [slug]/page.tsx       Event-Detailseite + Bewerbungsformular
│   ├── ueber-uns/page.tsx        Über uns
│   ├── kontakt/page.tsx          Kontaktseite
│   ├── studio/[[...tool]]/
│   │   └── page.tsx              Sanity Studio (nur auf eigenem Device/hinter Auth)
│   └── api/
│       ├── apply/route.ts        POST: Bewerbung → Airtable + Brevo
│       └── contact/route.ts      POST: Kontaktformular → Brevo
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx            Navigation (sticky, Hamburger-Menu mobil)
│   │   └── Footer.tsx            Footer (Links, Social, Legal)
│   ├── ui/
│   │   └── Button.tsx            Wiederverwendbarer Button (Varianten: primary/secondary/ghost)
│   ├── events/
│   │   └── EventCard.tsx         Karte für ein Event (Bild, Status-Badge, Deadline)
│   └── forms/
│       ├── ApplicationForm.tsx   Bewerbungsformular (react-hook-form + zod)
│       └── ContactForm.tsx       Kontaktformular
│
├── lib/
│   ├── sanity/
│   │   ├── client.ts             Sanity-Client (CDN + Preview)
│   │   ├── queries.ts            Alle GROQ-Queries (getActiveEvents etc.)
│   │   └── types.ts              TypeScript-Typen für Sanity-Dokumente
│   ├── airtable.ts               saveApplication() → Airtable REST API
│   └── brevo.ts                  E-Mail-Funktionen → Brevo API
│
├── sanity/
│   ├── schemaTypes/
│   │   ├── event.ts              Event-Schema (alle Felder)
│   │   └── index.ts              Schema-Export
│   └── sanity.config.ts          Sanity Studio Konfiguration
│
├── .env.example                  Alle benötigten Umgebungsvariablen (Vorlage)
├── next.config.ts                Next.js Konfiguration (Sanity CDN als Image-Domain)
├── tailwind.config.ts            Design-System (Farben, Animationen)
└── tsconfig.json                 TypeScript-Konfiguration
```

---

## 3. Sanity, Airtable und Brevo verbinden

### Schritt 1 — Umgebungsvariablen anlegen

Erstelle eine Datei `.env.local` im Projektordner (niemals in Git committen!):

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=deine_project_id     # Sanity Dashboard → Settings → API
NEXT_PUBLIC_SANITY_DATASET=production

# Airtable
AIRTABLE_API_KEY=pat...                             # Airtable → Account → Personal Access Tokens
AIRTABLE_BASE_ID=app...                             # URL deiner Base: airtable.com/app.../
AIRTABLE_BEWERBUNGEN_TABLE=Bewerbungen              # Exakter Tabellenname

# Brevo
BREVO_API_KEY=xkeysib-...                          # Brevo → Settings → API Keys
BREVO_CONFIRMATION_TEMPLATE_ID=1                   # Template-ID für Bestätigungsmail
BREVO_NOTIFICATION_TEMPLATE_ID=2                   # Template-ID für interne Benachrichtigung
BREVO_NOTIFICATION_EMAIL=deine@email.de            # Wohin die interne Benachrichtigung geht

# Site
NEXT_PUBLIC_SITE_URL=https://boogly.studio
```

### Schritt 2 — Sanity Project aufsetzen

1. Geh auf [sanity.io](https://sanity.io) und erstelle ein Konto (falls noch nicht vorhanden)
2. Erstelle ein neues Projekt: `sanity init` (oder über das Web-Dashboard)
3. Notiere die **Project ID** — sie erscheint im Dashboard und in der URL
4. Dataset: `production` ist der Standard
5. Geh zu **Settings → API → CORS Origins** und füge `http://localhost:3000` und `https://boogly.studio` hinzu
6. Geh zu **Settings → API → Tokens** und erstelle ein Token mit "Editor"-Rechten für die Vorschau (optional, für `previewClient`)

### Schritt 3 — Airtable aufsetzen

1. Deine Airtable-Base heißt "Boogly Studio" und enthält eine Tabelle "Bewerbungen"
2. Die Tabelle muss diese Felder haben:

| Feldname       | Typ                | Hinweis                               |
|----------------|--------------------|---------------------------------------|
| Name           | Einzeiliger Text   |                                       |
| E-Mail         | E-Mail             |                                       |
| Instagram      | Einzeiliger Text   |                                       |
| TikTok         | Einzeiliger Text   | optional                              |
| YouTube        | URL                | optional                              |
| Format         | Einzeiliger Text   | oder Single Select (dann Optionen pflegen!) |
| Vorstellung    | Langer Text        |                                       |
| Motivation     | Langer Text        |                                       |
| Themen         | Langer Text        |                                       |
| Bewerbungsdatum| Datum              |                                       |
| Status         | Single Select      | Optionen: Neu, Gesehen, Eingeladen, Abgelehnt |

3. Erstelle ein **Personal Access Token (PAT)** unter airtable.com/account → Developer Hub
   - Scope: `data.records:write` für die Bewerbungen-Tabelle
4. Trage `AIRTABLE_API_KEY` und `AIRTABLE_BASE_ID` in `.env.local` ein

### Schritt 4 — Brevo aufsetzen

1. Erstelle ein Konto auf [brevo.com](https://brevo.com)
2. Geh zu **Transaktions-E-Mails → Templates** und erstelle zwei Templates:

   **Template 1 — Bewerbungsbestätigung (an den Bewerber):**
   - Betreff: `Deine Bewerbung bei Boogly Studio – {{ params.eventTitle }}`
   - Inhalt: "Hallo {{ params.name }}, vielen Dank für deine Bewerbung für {{ params.eventTitle }}…"
   - Verfügbare Parameter: `name`, `email`, `eventTitle`, `format`

   **Template 2 — Interne Benachrichtigung (an euch):**
   - Betreff: `Neue Bewerbung: {{ params.name }} – {{ params.eventTitle }}`
   - Inhalt: Name, E-Mail, Instagram, Format, Vorstellung, Motivation, Themen

3. Notiere die **Template-IDs** (Zahl in der URL oder in der Template-Liste)
4. Erstelle einen **API-Key** unter Settings → API Keys

---

## 4. Neue Events veröffentlichen

1. Öffne [boogly.studio/studio](https://boogly.studio/studio) (oder lokal: localhost:3000/studio)
2. Klicke in der Sidebar auf **"Events & Castings"**
3. Klicke oben rechts auf **"+"** (Neues Dokument)
4. Fülle die Felder aus:
   - **Titel**: z.B. "Umzingelt – 11. Juli 2026"
   - **Slug**: wird automatisch aus dem Titel generiert (einmal klicken auf "Generate")
   - **Status**: `Aktiv` → Casting erscheint auf der Website und nimmt Bewerbungen an
   - **Kurzbeschreibung**: Für Karten und Meta-Tags (max. 200 Zeichen)
   - **Beschreibung**: Langer Rich-Text mit allen Details
   - **Cover-Bild**: Upload direkt in Sanity (hotspot-aware)
   - **Datum**: Wann findet das Event statt
   - **Bewerbungsfrist**: Danach wird das Formular automatisch gesperrt
   - **Format**: z.B. "Umzingelt" (erscheint als Label auf der Karte und geht an Airtable)
   - **Themen**: Tags, die im Bewerbungsformular als auswählbare Pillen erscheinen
5. Klicke auf **"Veröffentlichen"**
6. Die Website zeigt das neue Event innerhalb von ~60 Sekunden (ISR-Cache-Invalidierung)

### Event-Status im Überblick

| Status     | Effekt                                                          |
|------------|-----------------------------------------------------------------|
| `Aktiv`    | Erscheint auf Website, Bewerbungsformular ist aktiv             |
| `Abgeschlossen` | Erscheint unter "Vergangene Events", Formular ist gesperrt |
| `Entwurf`  | Unsichtbar auf der Website, nur im Studio sichtbar              |

---

## 5. Deployment GitHub → Vercel

### Einmalig einrichten

**Schritt 1 — GitHub Repository erstellen**

```bash
cd boogly-studio-next
git init
git add .
git commit -m "Initial commit: Next.js + Sanity migration"
git remote add origin https://github.com/DEIN_USERNAME/boogly-studio.git
git push -u origin main
```

**Schritt 2 — Vercel mit GitHub verbinden**

1. Geh auf [vercel.com](https://vercel.com) → "Add New Project"
2. Wähle dein GitHub-Repository aus
3. Framework: **Next.js** wird automatisch erkannt
4. Root Directory: `.` (der Projektordner)
5. Umgebungsvariablen eintragen: Alle Werte aus `.env.local` in Vercel unter **Settings → Environment Variables** eintragen
6. Klicke auf **"Deploy"**

Vercel gibt dir eine URL wie `boogly-studio.vercel.app`. Danach kannst du deine eigene Domain (boogly.studio) in Vercel unter **Settings → Domains** verknüpfen.

### Laufender Betrieb

Sobald alles eingerichtet ist, läuft die Pipeline so:

```
Du pushst Code zu GitHub (git push)
       ↓
Vercel erkennt den Push und baut automatisch (CI/CD)
       ↓
Bei Fehler: Vercel zeigt Build-Logs, Deploy wird abgebrochen
Bei Erfolg: Neue Version ist live (Deployment in ~60 Sekunden)
```

**Kein manuelles Deployment nötig.** Jeder `git push` auf den `main`-Branch löst automatisch einen neuen Build aus.

### Lokale Entwicklung

```bash
# 1. Abhängigkeiten installieren
npm install

# 2. .env.local mit deinen Keys anlegen (Vorlage: .env.example)

# 3. Entwicklungsserver starten
npm run dev

# Website läuft auf http://localhost:3000
# Sanity Studio läuft auf http://localhost:3000/studio
```

### Nützliche Befehle

```bash
npm run dev        # Lokaler Server
npm run build      # Produktions-Build (zum Testen vor dem Push)
npm run lint       # Code-Qualität prüfen
```

---

## Checkliste vor dem ersten Go-Live

- [ ] Sanity Project ID in `.env.local` / Vercel eingetragen
- [ ] Airtable PAT mit korrekten Scopes in `.env.local` / Vercel eingetragen
- [ ] Airtable-Tabelle "Bewerbungen" mit allen Feldern angelegt
- [ ] Brevo-Templates (Bestätigung + Benachrichtigung) erstellt und Template-IDs eingetragen
- [ ] Domain `boogly.studio` in Vercel verknüpft
- [ ] Erstes Event in Sanity Studio angelegt und auf "Aktiv" gesetzt
- [ ] Testbewerbung abschicken und in Airtable + Brevo prüfen
- [ ] Sanity Studio-Zugang mit CORS-Origins für boogly.studio abgesichert
