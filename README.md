---
created: 2026-07-20T19:57
updated: 2026-07-20T19:57
---
# GitHub Pages 배포 상태·404 원인 분석

Alex LAB 검수용 정적 HTML 보고서입니다.

## 공개 번들

- `index.html` — 보고서 본문
- `styles.css` — Alex LAB 아티클 스타일
- `cover.jpg` — 카카오톡 공유용 1200×630 Open Graph 커버
- `.nojekyll` — 정적 파일 직접 제공 설정

## 검수 기준

- GitHub Pages Actions Success
- Pages URL HTTP 200
- `cover.jpg` HTTP 200 / `image/jpeg`
- `index.html`의 Open Graph 이미지 절대 HTTPS URL
