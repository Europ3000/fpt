# FPT — Fitness Progress Tracker

Persoonlijke fitness-app: schema's (push/pull, core, cardio, mobiliteit, yoga), voorstellen voor gewicht en reps, rusttimer en je vooruitgang.
Gegevens blijven op je eigen toestel. Installeer via je browser: "App installeren" / "Toevoegen aan startscherm".

**App:** https://europ3000.github.io/fpt/

## Opbouw

- `src/training-log.html` — de broncode (dezelfde pagina als de claude.ai-versie)
- `src/fitness-logo-fpt.png` — het logo waaruit de iconen gemaakt worden
- `src/build.py` — bouwt de losse app in de hoofdmap
- hoofdmap (`index.html`, `sw.js`, `manifest.webmanifest`, iconen) — wat GitHub Pages online zet

## Bijwerken

1. Pas `src/training-log.html` aan.
2. Bouw opnieuw: `py src/build.py` (nodig: Python met Pillow).
3. Commit en push; GitHub Pages zet de nieuwe versie binnen enkele minuten online.
