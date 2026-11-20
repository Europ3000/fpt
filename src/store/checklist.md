# FPT in Google Play: wat jij zelf moet doen, in volgorde

Stand van de code (20 november 2026): manifest, accountverwijderpagina, schermafbeeldingen, feature graphic en teksten staan klaar (zie `listing.md`). Wat hieronder staat, kan alleen jij: het gaat om je Google-account, je identiteit, de ondertekeningssleutel en testers.

Eisen die hieraan ten grondslag liggen (zelf nagekeken, niet uit geheugen):
- Doel-API: sinds 31 augustus 2026 moeten nieuwe apps en updates **API-niveau 36 (Android 16) of hoger** targeten ([Google](https://developer.android.com/google/play/requirements/target-sdk)).
- Nieuwe persoonlijke ontwikkelaarsaccounts: eerst een **gesloten test met minstens 12 testers die 14 dagen na elkaar meedoen**, daarna productietoegang aanvragen ([Google](https://support.google.com/googleplay/android-developer/answer/14151465)).
- Accountverwijdering: in de app **én** een web-URL, in te vullen bij Gegevensveiligheid ([Google](https://support.google.com/googleplay/android-developer/answer/13327111)).
- Gezondheidsverklaring (en bij Health Connect-rechten ook de Health Connect-vragen): verplicht voor elke app ([Google](https://support.google.com/googleplay/android-developer/answer/14738291)).

## 0. Wat al klaar is (niets te doen, alleen weten)
- `https://fptfit.app/manifest.webmanifest`: `id`, `categories` (health, fitness, sports), `icons` (192, 512, maskable 512), `screenshots` (3× smal 1080×1920, 2× breed 1920×1080) en `shortcuts` (Training, Vandaag, Analytics, Planning; de app opent bij `?tab=…` op die pagina).
- Pagina's: `/privacy.html` en `/delete-account.html` (nieuw, NL + EN, werkt zonder app of account).
- `src/store/feature-graphic-1024x500.png` en `src/store/store-icon-512.png`.
- Lighthouse: het PWA-onderdeel bestaat sinds Lighthouse 12 niet meer; controleer in Chrome DevTools → Application → Manifest dat er geen waarschuwingen staan en dat "Installability" groen is.

## 1. Ontwikkelaarsaccount
1. Maak een account op https://play.google.com/console (eenmalig 25 USD). Kies **persoonlijk** of **organisatie**. Persoonlijk betekent: identiteitscontrole en de regel van 12 testers × 14 dagen (stap 6). Een organisatieaccount (met D-U-N-S-nummer) is van die testregel vrijgesteld, maar vraagt een bedrijf.
2. Doorloop de verificatie (identiteitsbewijs, adres, telefoon, betaalmethode). Dat kan dagen duren; begin hier eerst mee.

## 2. Testers vinden (begin nu, het is de bottleneck)
Verzamel **minstens 12, liever 15–20** mensen met een Google-account (Gmail), in Europa/waar je de app aanbiedt. Ze hoeven pas in stap 6 mee te doen, maar je moet ze nu al vragen. Ze moeten 14 dagen lang ingeschreven blijven; schrijft er iemand uit en zakt je aantal onder 12, dan loopt de teller vast.

## 3. Pakket bouwen (Android App Bundle)
1. `py src/tools/android_package.py C:/Users/legok/OneDrive/Documents/FPT-store 1.0.0 1` (zet de uitvoer **buiten** de repo). Het script print `targetSdkVersion in the package: …`.
2. **Moet 36 of hoger zijn** (de native app uit Route B is dat al). PWABuilder's sjabloon stond volgens een openstaande melding (pwa-builder/pwabuilder#6160) nog op 35; ik kon niet bevestigen dat dit al opgelost is. Print het script een lager getal, doe dan een van deze twee:
   - Wacht op / vraag een bijgewerkte PWABuilder (https://pwabuilder.com → Android), of
   - Bouw lokaal met Bubblewrap (`npm i -g @bubblewrap/cli`, `bubblewrap init --manifest https://fptfit.app/manifest.webmanifest`, zet `targetSdkVersion` op 36 in de gegenereerde `build.gradle`/`twa-manifest.json`, `bubblewrap build`).
3. De zip bevat de `.aab` (voor Play), een `.apk` (voor testen op je telefoon), de sleutel `signing.keystore` en `signing-key-info.txt` met de wachtwoorden. **Bewaar deze op een veilige plek en commit ze nooit.** Raak je de uploadsleutel kwijt, dan kan alleen Google-support die vervangen.
4. Pakketnaam is `app.fptfit.twa` en kan na de eerste upload niet meer wijzigen. Het icoon, de naam ("FPT") en de snelkoppelingen komen uit het manifest. Meldingen in de app (rustmelding) staan aan (`enableNotifications`).
5. Test de `.apk` op je telefoon: opent zonder adresbalk, snelkoppelingen (lang drukken op het icoon) werken. **Zie je wél een adresbalk, dan klopt `assetlinks.json` nog niet: stap 5.**

### Route B: meteen de native Capacitor-app uploaden (aanbevolen als PWABuilder op 35 blijft)
De repo bevat sinds kort `native/` (Capacitor, zelfde pakketnaam `app.fptfit.twa`, `targetSdkVersion 36`, `minSdk 26`, zie `native/README.md`). Die voldoet dus al aan het doel-API-niveau en heeft de rustmelding met scherm uit. Bouw een ondertekend `.aab` (Android Studio → Build → Generate Signed App Bundle) en gebruik dat in stap 6 in plaats van de TWA. Let op:
- Hij leest Health Connect (gewicht, training, afstand, actieve calorieën): vul de **Health Connect-vragen in de gezondheidsverklaring** in (doel: Fitness en welzijn; leesrechten READ_WEIGHT, READ_EXERCISE, READ_DISTANCE, READ_ACTIVE_CALORIES_BURNED; schrijft niets terug) en pas Gegevensveiligheid aan (zie `listing.md`, blok "Als je de native app uploadt"). Zonder die verklaring weigert Play een build met health-rechten.
- Hij vraagt ook `POST_NOTIFICATIONS` en `SCHEDULE_EXACT_ALARM` (wekkers en herinneringen); Play vraagt bij exacte alarmen soms een verklaring: kies "rustmelding/timer voor training".
- De app laadt de webbestanden van het toestel: een webwijziging bereikt gebruikers pas via een nieuwe store-versie (de TWA-route heeft dat nadeel niet).
- `native/README.md` heeft de rest van de lijst (nog nooit op een echt toestel getest).

## 4. App aanmaken in Play Console
1. Alle apps → App maken: naam, taal Nederlands, **App**, **Gratis**, verklaringen aanvinken.
2. Release → Instellen → **Play App Signing**: laat Google de app-sleutel beheren (standaard en verplicht voor `.aab`). Jouw `signing.keystore` is dan de *uploadsleutel*.

## 5. `assetlinks.json` met de juiste vingerafdruk (anders adresbalk in de app)
Digital Asset Links koppelt `fptfit.app` aan het pakket. Met Play App Signing ondertekent Google de installaties met **zijn** sleutel, dus die vingerafdruk moet in het bestand.
1. Play Console → je app → Testen en uitrollen → **App-integriteit** (of Instellen → App-ondertekening) → kopieer **SHA-256-certificaatvingerafdruk** van de *App-ondertekeningssleutel*.
2. Zet die in `src/store/assetlinks.json` bij `sha256_cert_fingerprints`. Laat de bestaande vingerafdruk (`60:11:75:F9:…:6E:E0`, uit een eerdere PWABuilder-run; ik kan niet nagaan van welke sleutel) staan als tweede item als dat je uploadsleutel is: dan werkt ook je lokale `.apk`. Staat er een vingerafdruk van een sleutel die je niet meer hebt, haal die dan weg.
3. `py src/build.py`, commit en push (bron en gebouwde bestanden samen, naar `main`).
4. Controleer na een paar minuten: https://fptfit.app/.well-known/assetlinks.json moet de JSON tonen (GitHub Pages neemt `.well-known` mee via `_config.yml`), en https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://fptfit.app&relation=delegate_permission/common.handle_all_urls moet je pakket tonen.

## 6. Gesloten test (verplicht bij een persoonlijk account)
1. Testen en uitrollen → **Gesloten testen** → track maken → testers: een e-maillijst (Google Group of een lijst e-mailadressen) toevoegen.
2. Upload het `.aab` (versionCode 1) en rol uit. Eerste beoordeling duurt vaak enkele dagen.
3. Stuur de testers de **opt-in-link** (Testers-tabblad). Elke tester klikt, keurt goed en installeert de app via Play.
4. **12 testers, 14 dagen aaneen.** Open testen telt niet mee. Verander niets aan de testerslijst die het aantal onder 12 brengt. Vraag ze de app echt te gebruiken en feedback te geven: dat helpt bij de aanvraag.
5. Na 14 dagen: Dashboard → **Productietoegang aanvragen**, en beantwoord de vragen (wat testers deden, wat je veranderde). Wordt de aanvraag afgewezen, dan start de teller opnieuw met dezelfde testers.

## 7. Winkelvermelding (Groeien → Winkelvermelding)
Plak uit `listing.md`: titel, korte en volledige beschrijving (NL standaard, EN als vertaling), upload app-icoon 512, feature graphic 1024×500 en de 3 telefoonschermafbeeldingen (`src/screenshots/screenshot-phone*.png`). Categorie Gezondheid en fitness, contact-e-mail, website https://fptfit.app/.

## 8. App-inhoud (Beleid → App-inhoud), alles invullen
Alle antwoorden staan in `listing.md`:
- Privacybeleid: https://fptfit.app/privacy.html
- Advertenties: nee · App-toegang: geen login nodig · Doelgroep: 13+ · Inhoudsclassificatie (vragenlijst) · Advertentie-ID: nee
- **Gegevensveiligheid** (inclusief de URL https://fptfit.app/delete-account.html bij accountverwijdering)
- **Gezondheidsapps**: Activiteit en fitness
- Financiële functies, nieuws, overheid, COVID-19: nee

Alles moet kloppen met `src/privacy.html`. Voeg je later een functie toe die iets nieuws bewaart (bijv. locatie, Health Connect), pas dan privacybeleid, Gegevensveiligheid en deze verklaringen aan.

## 9. Productie en updates
1. Zodra productietoegang is goedgekeurd: Productie → nieuwe release → kies het geteste `.aab` → landen kiezen → beoordeling indienen. Eerste beoordeling kan enkele dagen duren.
2. Webinhoud (de app zelf) update je gewoon via `git push`: de TWA laadt fptfit.app, dus geen nieuwe Play-versie nodig. Een nieuw `.aab` is alleen nodig voor wijzigingen aan het pakket (icoon, naam, snelkoppelingen, doel-API-niveau). Verhoog dan `versionCode` en teken met dezelfde uploadsleutel (pwabuilder.com, "ik heb al een sleutel").
3. Doel-API-niveau verandert jaarlijks (rond 31 augustus): zonder bijgewerkt pakket kun je geen updates meer indienen.

## Open punten die ik niet kon controleren
- Of de huidige vingerafdruk in `assetlinks.json` bij je uploadsleutel of een weggegooide sleutel hoort.
- Of PWABuilder's pakket nu al op API 36 uitkomt (het script meldt het na de build).
- Of Play je categorie "Gezondheidsapps" nog verder bevraagt: de declaratiepagina's wijzigen vaak; Play Console is leidend.
