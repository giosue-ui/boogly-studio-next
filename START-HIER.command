#!/bin/bash
# Doppelklick startet Installation + Entwicklungsserver der Boogly-Website.
cd "$(dirname "$0")" || exit 1
echo "──────────────────────────────────────────────"
echo "  Boogly Studio — Setup wird gestartet"
echo "──────────────────────────────────────────────"
echo ""
echo "[1/2] Installiere Pakete (npm install)…"
npm install
echo ""
echo "[2/2] Starte Entwicklungsserver…"
echo "  → Website:  http://localhost:3000"
echo "  → Studio:   http://localhost:3000/studio"
echo "  (Dieses Fenster offen lassen. Zum Stoppen: Strg+C)"
echo ""
npm run dev
