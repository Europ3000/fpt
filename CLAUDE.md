# FPT – Fitness Progress Tracker

Phone-first training app (Dutch source text, translated in the page to 10 more languages).

- `src/training-log.html` is the whole app (HTML + CSS + JS in one file). The same file is the
  claude.ai artifact https://claude.ai/artifact/YALR6JNP2gzcr65ixxeyfA (published from a Claude session).
- `py src/build.py` (or `python src/build.py`) builds the stand-alone PWA into the repo root:
  `index.html`, `manifest.webmanifest`, `sw.js` and the icons. GitHub Pages serves the root:
  https://europ3000.github.io/fpt/
- Commit the source and the built files together and push to `master`.

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
