# FPT als native app (Capacitor)

Deze map verpakt de gewone FPT-webapp (de bestanden die `py src/build.py` in de repo-root zet) in een Android- en
een iOS-app. App-id `app.fptfit.twa`, naam FPT. De app laadt de webbestanden van het toestel zelf, niet van
fptfit.app: een nieuwe versie van de web-app komt dus pas in de native app na een nieuwe build en een store-update.

Wat de native app meer kan dan de website:

- **Melding na je rust, ook met het scherm uit.** De melding wordt bij het begin van de rust ingepland op het
  eindtijdstip (`@capacitor/local-notifications`), dus ze komt ook als de app bevroren is.
- **Health Connect (Android) en Apple Health (iPhone), eerste stap: lezen.** Gewicht en activiteiten (lopen, fietsen,
  zwemmen …) komen in het logboek via dezelfde `importActivity` als Strava en intervals.icu. Schrijven (je krachttraining
  naar Health Connect) is nog niet gebouwd.
- **Login komt terug in de app** via `app.fptfit.twa://login` (mail-link, Google) en via app links op `https://fptfit.app/`.

## Stand

| Onderdeel | Stand |
| --- | --- |
| Web-laag (`src/training-log.html`, achter `NATIVE`) | Getest in de browser met een nagebootste Capacitor-bridge: inplannen/annuleren van de melding, Health-import, login-terugkeer. De gewone website gedraagt zich ongewijzigd. |
| Android-project (`android/`) | Bouwt: `npm run apk` geeft een debug-APK van ongeveer 10 MB (JDK 21, Android SDK 36). In de APK nagekeken: alleen de vier lees-permissies van Health Connect, het schema `app.fptfit.twa` en de app link naar fptfit.app, geen `sw.js`. De APK is **niet gestart** op een toestel of emulator. |
| iOS-project (`ios/`) | Aangemaakt op Windows en ingesteld (`Info.plist`). **Bouwen kan alleen op een Mac met Xcode.** HealthKit en Associated Domains moet je daar in Xcode nog aanzetten (zie onder). |
| Op een echt toestel | Niets getest: meldingen met scherm uit, Health Connect-toestemming, de login-redirect. |

## Bouwen

Eenmalig: Node 22 of nieuwer, en in deze map `npm install`.

```
py src/build.py            # in de repo-root: bouwt de web-app
cd native
npm run sync               # kopieert de web-app naar native/www en zet ze in het Android- en iOS-project
```

### Android (Windows, macOS of Linux)

Nodig: een JDK 21 en de Android SDK (platform 36, build-tools 36). Android Studio brengt beide mee; los kan ook
(Temurin-JDK als zip en de command-line tools van Android met `sdkmanager`). Zet `JAVA_HOME` en `ANDROID_HOME`, of open
het project één keer in Android Studio (`npm run open:android`), dat schrijft `android/local.properties`.

```
npm run apk                # debug-APK: android/app/build/outputs/apk/debug/app-debug.apk
```

Installeren op een telefoon met usb-foutopsporing: `adb install -r android/app/build/outputs/apk/debug/app-debug.apk`.

Voor Play (AAB, ondertekend): in Android Studio → Build → Generate Signed App Bundle, met **dezelfde sleutel als de
TWA** (die uit de zip van `src/tools/android_package.py`, staat buiten de repo). Dan klopt
`src/store/assetlinks.json` al en openen links naar fptfit.app in de app. Verhoog `versionCode` in
`android/app/build.gradle` boven die van de TWA die al in Play staat.

### iOS (alleen op een Mac)

```
npm install && npm run sync
npm run open:ios           # opent Xcode
```

In Xcode, target App → Signing & Capabilities:

1. Kies je Team (Apple Developer-account) en controleer de bundle-id (`app.fptfit.twa`; een andere id mag, pas dan
   ook het URL-schema in `Info.plist` en `NATIVE_ID` in `src/training-log.html` aan).
2. **+ Capability → HealthKit** (anders weigert Apple Health elke aanvraag).
3. Optioneel **+ Capability → Associated Domains** met `applinks:fptfit.app`, en zet op de site
   `/.well-known/apple-app-site-association` (met je Team ID). Zonder dit werkt de login nog steeds, via
   `app.fptfit.twa://login`.

De teksten die iOS toont bij de vraag om Gezondheid staan in `ios/App/App/Info.plist`
(`NSHealthShareUsageDescription`).

### Iconen en startscherm

`py native/scripts/icons.py` tekent ze opnieuw uit `src/icons/` (na een nieuw logo).

## Wat er voor de native app is aangepast

- **Service worker**: `sw.js` wordt niet naar `native/www` gekopieerd en de pagina registreert hem niet als
  `window.Capacitor` er is (een overgebleven registratie wordt verwijderd). De bestanden staan al op het toestel; een
  service worker zou na een app-update de oude versie uit zijn cache blijven tonen.
- **CSP** (`src/build.py`): ongewijzigd. `'self'` is in de app `https://localhost` (Android) of
  `capacitor://localhost` (iOS), en de Capacitor-bridge wordt door de app zelf vóór de pagina ingespoten, buiten de CSP
  om. De plugins worden rechtstreeks via die bridge aangeroepen (`Capacitor.nativePromise`), dus er komt geen extra
  script of bundler bij. Let op: een zeer oude Android System WebView (zonder "document start script") krijgt de bridge
  als inline script, en dat blokkeert de CSP; de app werkt dan als gewone website zonder de native extra's.
- **Verhuiskaart en installatieknop**: uit in de app (`location.origin` is daar niet fptfit.app).
- **Passkeys**: verborgen in de app (de Relying Party ID `fptfit.app` hoort niet bij `https://localhost`).
- **Edge Functions** `account` en `strava`: laten nu ook de origins `https://localhost` en `capacitor://localhost`
  toe. **Opnieuw deployen** is nodig, anders werkt *Account verwijderen* niet in de app.
- **Health Connect-permissies**: de plugin vraagt in zijn manifest om bijna alles; `AndroidManifest.xml` haalt alles
  weg behalve lezen van gewicht, trainingen, afstand en actieve calorieën.
- `native/www/privacypolicy.html` is een kopie van `privacy.html`: Health Connect toont die als je in zijn
  toestemmingsscherm op het privacybeleid tikt.

## Login: wat de eigenaar moet instellen

De app vraagt Supabase om terug te sturen naar `app.fptfit.twa://login#access_token=…`.

1. **Supabase-dashboard → Authentication → URL Configuration → Redirect URLs**: voeg toe
   `app.fptfit.twa://login`. Laat Site URL `https://fptfit.app/` en de bestaande redirect-URL's staan. Zonder deze
   regel stuurt Supabase je na de mail-link of Google naar de website in plaats van naar de app.
2. **Google** (Authentication → Providers → Google): niets extra. De app opent Google in de browser van de telefoon
   (Google weigert login in een ingebouwde webview) en Supabase stuurt terug naar de app. In Google Cloud blijft de
   enige redirect-URI die van Supabase (`…supabase.co/auth/v1/callback`).
3. **Android app links** (`https://fptfit.app/…` opent in de app: deel-links, verhuis-links): werkt zodra de build
   ondertekend is met een sleutel waarvan de SHA-256 in `src/store/assetlinks.json` staat. Voor de TWA-sleutel is dat
   al zo. Gebruik je Play App Signing, voeg dan ook de vingerafdruk van Play toe (Play Console → App-integriteit),
   bouw (`py src/build.py`) en zet de site online.
4. **iOS universal links**: optioneel, zie stap 3 bij iOS hierboven.

E-mail met wachtwoord en de code uit de mail werken zonder dit alles.

## Wat de eigenaar zelf moet doen

- [ ] Supabase: redirect-URL `app.fptfit.twa://login` toevoegen; Edge Functions `account` en `strava` opnieuw deployen.
- [ ] De debug-APK op een echt toestel zetten en testen (melding met scherm uit,
      Health Connect koppelen, inloggen met mail-link en met Google).
- [ ] Signing key: de bestaande TWA-sleutel gebruiken (bewaar hem en de wachtwoorden buiten de repo) of een nieuwe
      maken en `assetlinks.json` aanvullen.
- [ ] Play Console: de app-bundel uploaden als update van `app.fptfit.twa`; het formulier **Health apps** invullen
      (Health Connect: waarom gewicht, trainingen, afstand en calorieën worden gelezen) en bij gegevensveiligheid
      gezondheidsgegevens aangeven; `SCHEDULE_EXACT_ALARM` verantwoorden (rusttimer). Link naar het privacybeleid:
      https://fptfit.app/privacy.html.
- [ ] Apple: Apple Developer-account (99 USD per jaar), een Mac met Xcode, HealthKit-capability, app aanmaken in
      App Store Connect, privacy-vragenlijst (gezondheid en fitness) en screenshots.
- [ ] Health Connect verder dan 30 dagen terug lezen vraagt de extra permissie `READ_HEALTH_DATA_HISTORY`
      (nu niet aangevraagd).

## Nog niet gedaan (bekende gaten in de native app)

- Bestanden bewaren (back-up downloaden, .tcx, verhaal-afbeelding): een webview kent geen downloads; daarvoor zijn
  `@capacitor/filesystem` en `@capacitor/share` nodig.
- Strava koppelen vanuit de app: de terugkeer-URL is nu die van de webview. (Strava is op de server nog niet actief.)
- Scherm aan houden tijdens de training hangt af van `navigator.wakeLock` in de webview; niet op een toestel nagekeken.
- Schrijven naar Health Connect / Apple Health (krachttraining als workout).
