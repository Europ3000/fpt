# FPT – Play Store-vermelding

Alles hieronder is bedoeld om in Play Console te plakken. Tekenlimieten (titel 30, korte beschrijving 80, volledige beschrijving 4000) zijn nagerekend; Play Console toont zelf de teller en blijft leidend.

- Categorie: **Gezondheid en fitness** (Health & Fitness). Tags: Fitness, Workout-trackers.
- Contact e-mail: privacy@fptfit.app · Website: https://fptfit.app/
- Privacybeleid-URL: https://fptfit.app/privacy.html
- URL voor accountverwijdering: https://fptfit.app/delete-account.html
- Prijs: gratis, geen advertenties, geen aankopen in de app.
- Afbeeldingen: `src/store/store-icon-512.png` (app-icoon 512×512), `src/store/feature-graphic-1024x500.png` (opnieuw maken: `py src/tools/feature_graphic.py`). Telefoonschermafbeeldingen: `src/screenshots/screenshot-phone*.png` (1080×1920, 3 stuks; Play wil min. 2, max. 8). Tablet-schermafbeeldingen zijn optioneel; de brede `screenshot-wide*.png` (1920×1080) kunnen daarvoor dienen.
- Zet de zoekwoorden in de titel **en** in de eerste zin van de beschrijving: Play weegt beide zwaar. Geen emoji, hoofdletters of woorden als "beste/#1/gratis" in de titel (metadatabeleid).

## Nederlands (standaardtaal)

**Titel (27 tekens)**
```
FPT: Gym- en workoutlogboek
```

**Korte beschrijving (≤ 80 tekens)**
```
Gym-tracker: schema's, gewicht en reps, rusttimer en je vooruitgang.
```

**Volledige beschrijving**
```
FPT is je gym-tracker en workoutlogboek voor krachttraining, cardio en conditie. Kies een schema, log je sets in een paar tikken en zie waar je beter in wordt. Geen account nodig, geen advertenties, geen abonnement.

WAT FPT VOOR JE DOET
• Schema's: Push / Pull / Legs, Upper / Lower, full body en meer, of stel je eigen programma samen.
• Voorstel voor gewicht en reps: FPT kijkt naar je vorige training en stelt voor wat je nu kunt doen (progressieve overload).
• Snel loggen: eigen cijfertoetsenbord voor kg en reps, makkelijk met één hand in de gym.
• Rusttimer, ook met melding als je rust voorbij is.
• Records en geschat 1RM: zie je beste sets per oefening.
• Analytics: sets per spiergroep en je vooruitgang over weken en maanden.
• Planning: kalender en een heatmap van je trainingsjaar.
• Oefeningen met uitleg en animaties, plus cardio, groepslessen, kinesitherapie-oefeningen en ademhaling.
• Lichaamsmetingen: gewicht en tailleomtrek bijhouden.

KOPPELINGEN EN BACK-UP
• Strava: je trainingen gaan er automatisch naartoe en je Strava-activiteiten komen in je logboek.
• intervals.icu: haal Garmin-activiteiten, slaap, hartslag en gewicht op.
• Importeer je geschiedenis uit Hevy, Strong, FitNotes of JEFIT (csv).
• Back-up als bestand, of log in en je gegevens staan op al je toestellen.

JOUW GEGEVENS
• Alles blijft op je toestel zolang je niet inlogt. Inloggen met e-mail en wachtwoord, e-maillink, Google, Facebook of passkey is optioneel.
• Geen advertenties, geen trackers, geen verkoop van gegevens. Databank in de EU.
• Je account verwijderen kan in de app of via https://fptfit.app/delete-account.html.

HANDIG
• Werkt ook zonder internet.
• In 11 talen: Nederlands, Engels, Frans, Spaans, Duits, Italiaans, Portugees, Russisch, Chinees, Arabisch en Hindi.
• Licht en donker thema.

FPT is een hulpmiddel om te trainen en bij te houden, geen medisch hulpmiddel en geen vervanging voor advies van een arts of kinesitherapeut. Twijfel je over je gezondheid of een blessure, praat dan eerst met een zorgverlener.

Vragen of ideeën? privacy@fptfit.app
```

## English

**Title (26 characters)**
```
FPT: Gym & Workout Tracker
```

**Short description (≤ 80 characters)**
```
Gym tracker: workout plans, weight and rep tips, rest timer, your progress.
```

**Full description**
```
FPT is your gym tracker and workout log for strength training, cardio and fitness. Pick a program, log your sets in a few taps and see what you are getting better at. No account needed, no ads, no subscription.

WHAT FPT DOES FOR YOU
• Programs: Push / Pull / Legs, Upper / Lower, full body and more, or build your own.
• Weight and rep suggestions: FPT looks at your last workout and suggests what to do now (progressive overload).
• Fast logging: a custom number pad for kg and reps, easy with one hand in the gym.
• Rest timer, with a notification when your rest is over.
• Records and estimated 1RM: see your best sets per exercise.
• Analytics: sets per muscle group and your progress over weeks and months.
• Planning: a calendar and a heatmap of your training year.
• Exercises with instructions and animations, plus cardio, group classes, physio exercises and breathing.
• Body measurements: keep track of weight and waist.

LINKS AND BACKUP
• Strava: your workouts go there automatically and your Strava activities come into your log.
• intervals.icu: fetch Garmin activities, sleep, heart rate and weight.
• Import your history from Hevy, Strong, FitNotes or JEFIT (csv).
• Back up to a file, or log in and your data is on all your devices.

YOUR DATA
• Everything stays on your device as long as you do not log in. Logging in with email and password, email link, Google, Facebook or a passkey is optional.
• No ads, no trackers, no selling of data. Database in the EU.
• You can delete your account in the app or at https://fptfit.app/delete-account.html.

HANDY
• Works without internet.
• In 11 languages: Dutch, English, French, Spanish, German, Italian, Portuguese, Russian, Chinese, Arabic and Hindi.
• Light and dark theme.

FPT is a tool for training and tracking, not a medical device and no replacement for advice from a doctor or physiotherapist. If you doubt your health or an injury, talk to a healthcare professional first.

Questions or ideas? privacy@fptfit.app
```

Andere talen: laat Play Console vertalen of plak de Engelse tekst (de app zelf kent 11 talen). Houd de titel per taal ≤ 30 tekens.

---

# Gegevensveiligheid (Data safety): antwoorden

Afgeleid uit wat de app echt doet (`src/privacy.html`, `supabase/schema.sql`, `supabase/functions/*`, `prefs.links.*`). Zonder account blijft alles op het toestel (dat is in Play-termen niet "verzameld"); met account gaat het naar Supabase (EU). Er zit geen reclame-, statistiek- of crash-SDK in, geen cookies van derden, en lettertypen en bestanden komen van fptfit.app zelf.

## Vragen vooraf
| Vraag | Antwoord |
|---|---|
| Verzamelt of deelt de app gebruikersgegevens? | **Ja** (bij inloggen en koppelen; zonder account niets, maar het kan, dus Ja) |
| Alle gegevens versleuteld tijdens verzending? | **Ja** (alleen HTTPS; de CSP laat alleen fptfit.app, Supabase en intervals.icu toe) |
| Kunnen gebruikers verwijdering aanvragen? | **Ja**, URL: https://fptfit.app/delete-account.html (in de app: Instellingen → Account → Account verwijderen) |
| Onafhankelijke beveiligingscontrole? | Nee |

## Per gegevenstype
"Verzameld" = naar Supabase gestuurd en daar bewaard tot de gebruiker verwijdert (dus **niet** "tijdelijk verwerkt"). Supabase is verwerker voor FPT en telt volgens Play niet als delen.

| Categorie → type | Verzameld | Gedeeld | Verplicht/optioneel | Doel |
|---|---|---|---|---|
| Persoonlijke gegevens → **E-mailadres** | Ja | Nee | Optioneel (bij inloggen) | App-functionaliteit, Accountbeheer |
| Persoonlijke gegevens → **Gebruikers-ID's** (Supabase-ID) | Ja | Nee | Optioneel | App-functionaliteit, Accountbeheer |
| Persoonlijke gegevens → **Overige gegevens** (geboortedatum, geslacht, als ingevuld) | Ja | Nee | Optioneel | App-functionaliteit |
| Gezondheid en fitness → **Fitnessgegevens** (trainingen, sets, records, cardio, Strava-activiteiten, stappen) | Ja | Zie opmerking | Optioneel | App-functionaliteit |
| Gezondheid en fitness → **Gezondheidsgegevens** (lichaamsgewicht, tailleomtrek, lengte; via intervals.icu ook slaap, hartslag, hartslagvariatie, ademhaling, bloeddruk) | Ja | Nee | Optioneel | App-functionaliteit |
| App-activiteit → **Overige door gebruikers gegenereerde content** (notities, eigen schema's, doelen) | Ja | Nee | Optioneel | App-functionaliteit |
| Locatie, contacten, foto's/video's, audio, bestanden, agenda, berichten, financiële gegevens, surfgedrag, app-prestaties (crashlogs, diagnose), apparaat- of andere ID's | **Nee** | – | – | – |

**Opmerking over delen (Strava/intervals.icu):** de gebruiker zet de koppeling zelf aan. FPT stuurt dan trainingen naar Strava (de Strava-sleutels staan alleen op de server) en de gebruiker geeft zijn intervals.icu-API-sleutel zelf in. Een overdracht die de gebruiker zelf start en in de app duidelijk uitgelegd krijgt, telt volgens Play niet als delen. Wil je geen enkel risico: vink bij **Fitnessgegevens → Gedeeld: Ja** aan (ontvanger Strava, doel App-functionaliteit, optioneel). Dat is nooit fout; mijn advies is dit te doen omdat de privacytekst Strava noemt.

Het IP-adres ziet elke server (GitHub Pages, Supabase) technisch; FPT bewaart of gebruikt het niet.

## Andere verklaringen (Beleid → App-inhoud)
| Onderdeel | Antwoord |
|---|---|
| Privacybeleid | https://fptfit.app/privacy.html |
| Advertenties | Nee |
| App-toegang | Alles werkt zonder account; geen inloggegevens nodig voor de reviewer. Zet in de instructies: "Account is optional. All functions work without logging in." |
| Doelgroep | 13 jaar en ouder; niet gericht op kinderen (het privacybeleid zegt: onder 13 geen account zonder ouder) |
| Inhoudsclassificatie (IARC) | Categorie hulpprogramma/referentie; geen geweld, seks, gokken, drugs. Geen inhoud van gebruikers die anderen zien (delen gebeurt via een link) |
| Advertentie-ID | De app gebruikt de advertentie-ID niet: antwoord Nee |
| Financiële functies, nieuws, overheid, COVID-19 | Nee |

## Verklaring voor gezondheidsapps (Beleid → App-inhoud → Gezondheidsapps)
- Heeft de app gezondheidsfuncties? **Ja.**
- Kies **Activiteit en fitness** (workouts, oefenroutines, cardio, lichaamsgewicht, hartslag).
- Niet kiezen: Voeding en gewichtsbeheer (er is geen voedingslogboek), Medische gegevens, Menstruatie, Klinisch onderzoek. Slaap en hartslag komen alleen binnen als de gebruiker intervals.icu koppelt; twijfel je, vink dan ook **Slaapbeheer** aan: een te ruime verklaring kost niets, een te smalle kan een afwijzing geven.
- **Health Connect: bij de TWA niet gebruikt** (die vraagt geen Health Connect-rechten); laat die vragen dan leeg. Bij de native app: zie het blok hieronder.
- De app is geen medisch hulpmiddel: de beschrijving bevat de disclaimer. Vermijd claims als "geneest", "behandelt" of "diagnose"; de kinesitherapie- en ademhalingsoefeningen blijven algemene oefeningen.

## Als je de native app uploadt (`native/`, Health Connect)
De native Android-app leest, alleen op verzoek van de gebruiker, via Health Connect: gewicht, trainingen (soort, duur), afstand en actieve calorieën. Ze schrijft niets terug (zie `native/README.md` en `src/privacy.html`). Pas dan aan:
- **Gezondheidsverklaring → Health Connect-vragen:** gegevenstypen Gewicht, Training/oefening, Afstand, Actieve calorieën, alleen lezen. Doel: *Fitness en welzijn* (trainingen en gewicht in het logboek tonen). Geen reclame, geen doorgifte aan derden, geen verkoop. Privacybeleid benoemt dit al (sectie "Wat FPT bewaart").
- **Gegevensveiligheid:** "Fitnessgegevens" en "Gezondheidsgegevens" staan al op Ja. Zorg dat de doelen kloppen (App-functionaliteit) en dat "Gedeeld: Nee" blijft voor Health Connect-gegevens (Play eist: geen delen met derden, behalve de wettelijke uitzonderingen).
- **Machtigingen:** `POST_NOTIFICATIONS` en `SCHEDULE_EXACT_ALARM` (rustmelding). Play kan een verklaring voor exacte alarmen vragen: "timer voor training die de gebruiker zelf start".
- Zet in de beschrijving de zin "Leest op jouw verzoek gewicht en activiteiten uit Health Connect." erbij.
