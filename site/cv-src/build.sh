#!/usr/bin/env bash
# Gera os PDFs do currículo a partir dos HTMLs desta pasta.
# Uso: ./build.sh   (precisa do Brave ou de outro navegador Chromium)
set -euo pipefail
cd "$(dirname "$0")"
BROWSER="${BROWSER:-brave-browser}"
mkdir -p out ../public/cv
for lang in pt en; do
  "$BROWSER" --headless --disable-gpu --no-pdf-header-footer \
    --print-to-pdf="out/caique-nerivan-cv-$lang.pdf" "file://$PWD/cv-$lang.html" 2>/dev/null
done
cp out/*.pdf ../public/cv/
ls -la out
