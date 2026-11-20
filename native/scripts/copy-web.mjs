// Copies the built web app (repo root, made by `py src/build.py`) into native/www, the folder Capacitor packs into the apps.
// Left out on purpose: sw.js (the app's files are already on the device; the page does not register it in the native app),
// CNAME, .well-known and the store screenshots. privacy.html is also copied as privacypolicy.html: Health Connect shows that
// file when you tap "Privacybeleid" in its permission screen.
// usage: node scripts/copy-web.mjs      (from native/, or: npm run web)
import { cpSync, rmSync, mkdirSync, existsSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..", ".."), www = resolve(here, "..", "www");
const FILES = ["index.html", "app.js", "privacy.html", "manifest.webmanifest", "favicon-32.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png"];
const DIRS = ["i18n", "fonts"];

for (const f of ["index.html", "app.js"]) if (!existsSync(join(root, f))) { console.error(`${f} ontbreekt in ${root}. Bouw eerst: py src/build.py`); process.exit(1); }
rmSync(www, { recursive: true, force: true });
mkdirSync(www, { recursive: true });
for (const f of FILES) cpSync(join(root, f), join(www, f));
for (const d of DIRS) cpSync(join(root, d), join(www, d), { recursive: true });
cpSync(join(root, "privacy.html"), join(www, "privacypolicy.html"));
writeFileSync(join(www, ".gitkeep"), "");

const size = dir => readdirSync(dir).reduce((n, f) => { const p = join(dir, f), s = statSync(p); return n + (s.isDirectory() ? size(p) : s.size); }, 0);
console.log(`www: ${Math.round(size(www) / 1024)} KB uit ${root}`);
