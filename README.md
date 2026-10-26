# FPT — Fitness Progress Tracker

Persoonlijke fitness-app: schema's (push/pull, core, cardio, mobiliteit, yoga), voorstellen voor gewicht en reps, rusttimer en je vooruitgang.
Werkt op elke smartphone (Android en iPhone), tablet en pc, ook zonder internet.

- **Als website:** open https://fptfit.app/ in elke browser.
- **Als app op je telefoon:** Android (Chrome, Samsung Internet): Instellingen → App installeren in FPT, of het menu van je browser → App installeren. iPhone/iPad: Safari → Deel → Zet op beginscherm.
- **Als app op je pc:** Windows, macOS, Linux, ChromeOS: open de pagina in Chrome of Edge en klik op het installeer-icoon in de adresbalk (of Instellingen → App installeren in FPT). Mac met Safari: Archief → Voeg toe aan Dock. FPT opent dan in een eigen venster en staat bij je andere programma's.

**App:** https://fptfit.app/

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

## App-winkels

De pakketten en de ondertekeningssleutel staan **buiten** deze repo, in `Documenten\FPT-store` (OneDrive). Zet de sleutel nooit in GitHub.

### Google Play (Android)

Gemaakt met `py src/tools/android_package.py <map> <versie> <versiecode>` (PWABuilder). Package name: `app.fptfit.twa` (vast, nooit meer te wijzigen).

In `FPT-store\android-1.0.0-1`:
- `Fitness Progress Tracker.aab` — dit upload je naar Google Play
- `Fitness Progress Tracker.apk` — om zelf te testen op een Android-telefoon
- `signing.keystore` + `signing-key-info.txt` — je uploadsleutel en wachtwoorden: bewaren, nooit delen

Wat jij doet:
1. Maak een ontwikkelaarsaccount op https://play.google.com/console (eenmalig 25 dollar, identiteitscontrole).
2. Maak de app aan (Nederlands, gratis) en upload het `.aab`-bestand eerst naar **Interne test**.
   Een nieuw persoonlijk account moet eerst 14 dagen een gesloten test doen met minstens 12 testers voor de app openbaar mag.
3. Google ondertekent de app opnieuw met een eigen sleutel (Play App Signing). Kopieer bij **Testen en releasen → App-integriteit → App-ondertekening** de SHA-256 van de *app-ondertekeningssleutel* en geef die door: die komt dan bij in `src/store/assetlinks.json`. Anders toont de app bovenaan een kleine browserbalk.
4. Winkelvermelding: icoon (`icon-512.png`), telefoonscreenshots (`src/screenshots/screenshot-phone*.png`), privacybeleid: https://fptfit.app/privacy.html, en het formulier Gegevensveiligheid.
5. Gegevensveiligheid → account verwijderen: in de app via Instellingen → Account → Account verwijderen; als weblink: https://fptfit.app/privacy.html#verwijderen

Een update: verhoog de versiecode en onderteken met dezelfde sleutel (op pwabuilder.com: "Use mine" met `signing.keystore`).

### Microsoft Store (Windows)

1. Maak een ontwikkelaarsaccount aan in Partner Center: https://partner.microsoft.com/dashboard (voor particulieren gratis).
2. Reserveer de naam van de app (bv. "Fitness Progress Tracker").
3. Kopieer bij **Product-identiteit**: *Package/Identity/Name*, *Package/Identity/Publisher* (begint met `CN=`) en *Package/Properties/PublisherDisplayName*. Daarmee wordt het MSIX-pakket gemaakt.
4. Upload het pakket met de pc-screenshots (`src/screenshots/screenshot-wide*.png`) en het privacybeleid: https://fptfit.app/privacy.html
