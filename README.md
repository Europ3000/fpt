# FPT — Fitness Progress Tracker

Persoonlijke fitness-app: schema's (push/pull, core, cardio, mobiliteit, yoga), voorstellen voor gewicht en reps, rusttimer en je vooruitgang.
Werkt op elke smartphone (Android en iPhone), tablet en pc, ook zonder internet.

- **Als website:** open https://europ3000.github.io/fpt/ in elke browser.
- **Als app op je telefoon:** Android (Chrome, Samsung Internet): Instellingen → App installeren in FPT, of het menu van je browser → App installeren. iPhone/iPad: Safari → Deel → Zet op beginscherm.
- **Als app op je pc:** Windows, macOS, Linux, ChromeOS: open de pagina in Chrome of Edge en klik op het installeer-icoon in de adresbalk (of Instellingen → App installeren in FPT). Mac met Safari: Archief → Voeg toe aan Dock. FPT opent dan in een eigen venster en staat bij je andere programma's.

**App:** https://europ3000.github.io/fpt/

## Opbouw

- `src/training-log.html` — de broncode (dezelfde pagina als de claude.ai-versie)
- `src/fitness-logo-fpt.png` — het logo waaruit de iconen gemaakt worden
- `src/build.py` — bouwt de losse app in de hoofdmap
- `src/fonts/` — de lettertypes (`py src/tools/fetch_fonts.py`), zodat de app ze zelf levert
- hoofdmap (`index.html`, `app.js`, `i18n/`, `fonts/`, `sw.js`, `manifest.webmanifest`, iconen) — wat GitHub Pages online zet

## Bijwerken

1. Pas `src/training-log.html` aan.
2. Bouw opnieuw: `py src/build.py` (nodig: Python met Pillow).
3. Commit en push; GitHub Pages zet de nieuwe versie binnen enkele minuten online.
