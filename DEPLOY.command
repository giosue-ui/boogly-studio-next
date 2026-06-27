#!/bin/bash
# Entfernt die Token-Datei git-push.command aus dem Commit und pusht einen sauberen Commit.
cd "/Users/giosuele/Desktop/FINAL BS/boogly-studio-next" || exit 1
export GIT_PAGER=cat
export GIT_EDITOR=true
rm -f .git/index.lock .git/HEAD.lock 2>/dev/null

echo "──────────────────────────────────────────────"
echo "  Boogly Studio — Deployment (bereinigt)"
echo "──────────────────────────────────────────────"
git fetch origin main 2>&1 | tail -1

# HEAD auf Remote-Stand setzen, Arbeitsdateien (gemergt) behalten:
git reset --soft origin/main

# Gefährliche Token-Datei entfernen (enthielt den GitHub-Token):
git rm --cached --ignore-unmatch git-push.command >/dev/null 2>&1
rm -f git-push.command

# Sauberen Einzel-Commit erstellen (ohne Token-Datei):
git add -A
git commit -m "Design A live: Self-Hosting Fonts, DSGVO, Sicherheits-Haertung, neue Seiten" 2>&1 | tail -2

echo "Lade zu GitHub hoch…"
PUSH_OUT=$(git push origin main 2>&1)
echo "$PUSH_OUT" | tail -6
echo ""
if echo "$PUSH_OUT" | grep -qiE "rejected|error|violation"; then
  echo "⚠️  Push NICHT erfolgreich — bitte Claude die Meldung oben zeigen."
else
  echo "✅ ERFOLG: Code ist auf GitHub. Vercel deployt jetzt automatisch."
fi
echo ""
read -p "Enter zum Schließen…"
