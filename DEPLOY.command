#!/bin/bash
# Lädt Änderungen zu GitHub hoch → Vercel deployt automatisch.
cd "/Users/giosuele/Desktop/FINAL BS/boogly-studio-next" || exit 1
export GIT_PAGER=cat
export GIT_EDITOR=true
rm -f .git/index.lock .git/HEAD.lock 2>/dev/null
echo "──────────────────────────────────────────────"
echo "  Boogly Studio — Deployment"
echo "──────────────────────────────────────────────"
git add -A
git commit -m "Google Search Console Verifizierung + Canonical auf www.boogly.studio" 2>&1 | tail -2
git fetch origin main 2>&1 | tail -1
git merge -X ours --no-edit origin/main >/dev/null 2>&1
echo "Lade zu GitHub hoch…"
PUSH_OUT=$(git push origin main 2>&1)
echo "$PUSH_OUT" | tail -5
echo ""
if echo "$PUSH_OUT" | grep -qiE "rejected|error|violation|fatal|fail|not supported"; then
  echo "⚠️  Push NICHT erfolgreich — bitte Claude zeigen."
else
  echo "✅ ERFOLG: Auf GitHub. Vercel deployt jetzt automatisch."
fi
echo ""
read -p "Enter zum Schließen…"
