# FPT – Fitness Progress Tracker

Phone-first training app (Dutch source text, translated in the page to 10 more languages).

- `src/training-log.html` is the whole app (HTML + CSS + JS in one file).
- `py src/build.py` (or `python src/build.py`) builds the stand-alone PWA into the repo root. GitHub Pages
  serves the root at https://fptfit.app/ (own domain, `CNAME`; the old https://europ3000.github.io/fpt/
  redirects there). The build splits the page so it loads fast:
  `index.html` (markup + CSS), `app.js` (the main script), `i18n/<lang>.js` (one per language, loaded only
  when used; Dutch needs none), `fonts/` (self-hosted, from `src/fonts/`), `sw.js`, `manifest.webmanifest`
  and the icons. Files are referenced as `app.js?v=<hash>`, so a changed file gets a new URL.
- `sw.js` serves the app from its cache (instant start, works offline). A new build changes `sw.js`; the new
  version installs in the background and the app shows "Er is een nieuwe versie van FPT. Vernieuwen".
  When testing locally, reload twice (or use DevTools → Application → Update on reload).
- CSP: no `'unsafe-inline'` for scripts. Only the three inline scripts written by `build.py` run (by hash).
  Never add `onclick="…"`-style attributes or new inline `<script>` blocks; use `.onclick = …` /
  `addEventListener` in the main script.
- Fonts: `py src/tools/fetch_fonts.py` downloads the Google Fonts named in the `<link>` of
  `training-log.html` into `src/fonts/` (run again after changing that link).
- Install as an app: Chrome/Edge/Samsung Internet (Android, Windows, macOS, Linux, ChromeOS) via the
  Installeren button in Instellingen (`beforeinstallprompt`); iPhone/iPad via Safari → Zet op beginscherm;
  Mac Safari via Archief → Voeg toe aan Dock. On PC the column is 720 px wide and the mouse wheel scrolls
  the sideways rows.
- Commit the source and the built files together and push to `main`.
- The claude.ai artifact https://claude.ai/artifact/YALR6JNP2gzcr65ixxeyfA is retired (since 2026-10-23):
  its last version only points to the app. Do not republish it; work on the GitHub app only.

## Own domain: fptfit.app (live since 2026-10-26)

- `build.py`: `DOMAIN` (empty = europ3000.github.io/fpt) and `MOVE_TO = "https://fptfit.app/"`. With `DOMAIN`
  set the build writes `CNAME`, sets `window.FPT_HOME` (used for share links and the story images:
  `APP_HOME` / `APP_HOST`), and GitHub redirects the old address.
- The old address shows "FPT heeft een nieuw adres" (`#moveCard`) once `MOVE_TO` serves FPT (its manifest, read
  with CORS, so a registrar's parking page does not count). "Verhuizen met je gegevens" opens
  `fptfit.app/#move=<packed back-up>`; the new address asks before `restoreItems` takes it over. Only `ppl.*`
  keys travel; the login does not (log in again, the sync then unites both copies).
- Old devices keep the old app from their service-worker cache after the redirect (a redirected `sw.js` cannot
  update), which is what keeps the move card working there.
- Store packages: Android package name `app.fptfit.twa`; `src/store/assetlinks.json` (when present) is published
  as `/.well-known/assetlinks.json` (`_config.yml` includes `.well-known`).

## Account and sync (Supabase)

- The stand-alone app (`window.FPT_STANDALONE`) logs in with Google or an email link and syncs with
  Supabase project https://vcbyebuhmefyydevjsur.supabase.co (EU). The publishable key in the source is
  public by design; row level security keeps each user to their own rows.
- One table `public.fpt_store (user_id, key, value jsonb)`, created by `supabase/schema.sql`. Keys:
  `records`, `prefs`, `layout`, `log/sessions/<date>`. The sync code (`connectStore`, `sbDoc`) uses the
  same document API as the old claude.ai store, so the merge logic is shared.
- `build.py` adds the Supabase URL to the CSP `connect-src`.
- Login links: the app only takes a session from the URL hash without asking when this device asked for a
  login (`fpt.sbWait`); otherwise it asks "Inloggen als …?" (stops someone slipping you their own session).
  Strava's OAuth `state` is random and checked (`fpt.stravaState`).
- Deleting an account (Google Play requires it): Instellingen → Account → Account verwijderen calls the Edge
  Function `supabase/functions/account` (`deleteAccount`): Strava deauthorize, rows in `fpt_links`/`fpt_store`, then
  `auth.admin.deleteUser`. Local data stays; `wipeDevice` (Back-up en gegevens → Wissen) removes all `ppl.*`/`fpt.*`.
- Privacy policy: `src/privacy.html` (Dutch + English, no scripts), copied to https://fptfit.app/privacy.html; linked
  under Back-up en gegevens. Contact privacy@fptfit.app (mail forwarding at the registrar). Keep it in line with what the
  app stores when you add features.
- `supabase/limits.sql` (run once): key/value size limits and at most 20 000 rows per user.
- The Strava function only answers the app's own origin (`https://europ3000.github.io`; optional secret
  `FPT_ORIGINS` to add more, comma-separated). Redeploy it after changing `index.ts`.
- In the Supabase dashboard: Authentication → URL Configuration, Site URL and the only redirect URL
  `https://fptfit.app/`; keep `https://europ3000.github.io/fpt/` as an extra redirect URL for old devices.
- Linked apps (Delen → Gekoppelde apps): Strava runs through the Edge Function
  `supabase/functions/strava` (secrets STRAVA_CLIENT_ID / STRAVA_CLIENT_SECRET, "Verify JWT" off) and the
  table `fpt_links` from `supabase/links.sql` (RLS on, no policies: only the function reaches it). The app
  only keeps `prefs.links.strava = {name, auto, sent, read, pull, got, from}`. Strava works both ways: the
  function's `activities` action (scope `activity:read_all`) hands back new activities, and `stravaPull`
  puts each one in the log as a cardio entry (`src`, `sid`, plus `hrmax`, `elev`, `cad`, `name`, `dev`) under
  the matching cardio scheme day (a run under Lopen). Since June 2026 a Strava API app needs a paid Strava
  subscription; the function and `fpt_links` are deployed, the secrets are not set yet.
- Garmin Connect needs partner approval from Garmin, so Garmin activities come in via intervals.icu (free,
  official Garmin partner): `icuPull` calls the intervals.icu API straight from the browser (CORS allowed;
  `build.py` adds it to `connect-src`) with the user's own API key in `prefs.links.intervals = {id, key, name,
  got, from, pull}`. Activities that intervals.icu got from Strava come back as stubs and are skipped.
  One-off: a .fit/.tcx/.gpx/.zip file (`importFile`). Health Connect (Samsung Health) and Apple Health need
  the native apps (Capacitor).

## Translations

- All visible text is written in Dutch. `src/i18n/*.tsv` holds one line per Dutch string:
  `dutch<TAB>en<TAB>fr<TAB>es<TAB>de<TAB>it<TAB>pt<TAB>ru<TAB>zh<TAB>ar<TAB>hi`.
  Dynamic text uses placeholders: `Set {0} opslaan`.
- After changing text or translations: `python src/tools/i18n_build.py src/training-log.html src/i18n`
  (writes the table into the `<script id="i18n-data">` block), then `python src/build.py`.
- `python src/tools/extract_strings.py src/training-log.html out.txt` lists every text run in the app,
  to find new strings that still need a line in a `.tsv` file.

## Icons

`src/tools/make_icons.py OUTDIR` draws the round badge (uses the Cooper Black font from Windows;
on Linux/Codespaces point `FONT` to another bold serif). Copy the results to `src/icons/`.

## Cloud

The `.devcontainer` lets you open this repo in GitHub Codespaces (Python + Pillow ready) and keep
working there, e.g. with Claude Code in the cloud.
