#!/usr/bin/env bash
# MkDocs 빌드 전처리: 루트의 README/CHANGELOG/GUIDELINE/assets를 docs_dir(docs/)로
# 복사한다. 원본은 GitHub 웹 뷰 기준 경로(](docs/...))를 쓰므로 복사본에서만
# 사이트 기준 상대 경로로 보정한다. 산출물은 .gitignore 대상 — 원본이 단일 소스.
set -euo pipefail
cd "$(dirname "$0")/.."

rewrite() {
    # ](docs/... -> ](...  /  CHANGELOG.md, GUIDELINE.md 루트 링크 -> 복사본 파일명
    sed -e 's#](docs/#](#g' \
        -e 's#](CHANGELOG.md#](changelog.md#g' \
        -e 's#](GUIDELINE.md#](guideline.md#g' \
        "$1" > "$2"
}

rewrite README.md docs/index.md
rewrite CHANGELOG.md docs/changelog.md
rewrite GUIDELINE.md docs/guideline.md

rm -rf docs/assets
cp -R assets docs/assets

echo "docs-prep done: index.md changelog.md guideline.md assets/"
