"""Build the stand-alone FPT web app (no Claude needed) from training-log.html.

Source lives in src/ (this folder); the built site is written to the repository root,
which GitHub Pages serves. Run again after every change to training-log.html:  py src/build.py

The page is split so it loads fast on a phone:
- index.html: markup, CSS and three small inline scripts (allowed by hash in the CSP, nothing else inline runs)
- app.js: the app itself (an external script, so the browser can keep it compiled between visits)
- i18n/<lang>.js: one file per language, loaded only when you use that language (Dutch needs none)
- fonts/: the fonts, served from here instead of Google (tools/fetch_fonts.py)
sw.js keeps all of it offline and serves the app from the cache, so it opens at once, also without network.
"""
import base64, hashlib, json, pathlib, shutil, time
from PIL import Image

ROOT = pathlib.Path(__file__).parent      # src/: source page and logo
OUT = ROOT.parent                          # repository root: the published site
SB = "https://vcbyebuhmefyydevjsur.supabase.co"
short_hash = lambda text: hashlib.sha256(text.encode("utf-8")).hexdigest()[:10]
csp_hash = lambda js: "'sha256-" + base64.b64encode(hashlib.sha256(js.encode("utf-8")).digest()).decode() + "'"

page = (ROOT / "training-log.html").read_text(encoding="utf-8")
page = page.replace('<meta name="claude:viewport-fit-sides" content="cover">\n', "")

# Fonts: from this site instead of fonts.googleapis.com.
font_links = [l for l in page.splitlines(True) if "fonts.googleapis.com" in l or "fonts.gstatic.com" in l]
assert len(font_links) == 3, "expected the two preconnects and the Google Fonts stylesheet"
for l in font_links: page = page.replace(l, "")
fonts_css = (ROOT / "fonts" / "fonts.css").read_text(encoding="utf-8").strip()
(OUT / "fonts").mkdir(exist_ok=True)
font_files = sorted(p.name for p in (ROOT / "fonts").glob("*.woff2"))
for old in (OUT / "fonts").glob("*.woff2"):
    if old.name not in font_files: old.unlink()
for name in font_files: shutil.copyfile(ROOT / "fonts" / name, OUT / "fonts" / name)

# Translations: out of the page, one file per language.
start = '<script id="i18n-data">window.FPT_I18N = '
a = page.index(start); b = page.index("</script>", a)
i18n = json.loads(page[a + len(start):b].strip().rstrip(";"))
page = page[:a] + page[b + len("</script>"):]
(OUT / "i18n").mkdir(exist_ok=True)
lang_files = {}
for L in i18n["langs"]:
    js = "Object.assign(window.FPT_I18N, " + json.dumps({"src": i18n["src"], L: i18n[L]}, ensure_ascii=False, separators=(",", ":")) + ");\n"
    (OUT / "i18n" / f"{L}.js").write_text(js, encoding="utf-8")
    lang_files[L] = f"i18n/{L}.js?v={short_hash(js)}"

# The app's script: the last <script> of the page, as its own file.
a = page.rindex("<script>"); b = page.rindex("</script>")
app_js = page[a + len("<script>"):b].strip("\n") + "\n"
page = page[:a] + page[b + len("</script>"):]
(OUT / "app.js").write_text(app_js, encoding="utf-8")
app_src = f"app.js?v={short_hash(app_js)}"

head_end = page.index("<style>")
head_part, body_part = page[:head_end], page[head_end:]
style_end = body_part.index("</style>") + len("</style>")
style, body = body_part[:style_end], body_part[style_end:]
theme_js = head_part[head_part.index("<script>") + len("<script>"):head_part.index("</script>")]

boot_js = """window.FPT_STANDALONE = true;
window.FPT_I18N = %s;
window.FPT_I18N_FILES = %s;
(() => {
  // Not inside someone else's page (clickjacking): break out, or show nothing.
  if (top !== self){ try { top.location.replace(location.href); } catch {} document.documentElement.style.display = "none"; }
  // iPhone and iPad zoom into every field with text under 16px; maximum-scale stops that (pinch zoom keeps working there).
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)){ const v = document.querySelector('meta[name="viewport"]'); v.content += ",maximum-scale=1"; }
  // The browser may offer installing before the app runs: keep that offer for the Installeren button.
  addEventListener("beforeinstallprompt", e => { window.FPT_INSTALL = e; });
  // Your language (or, on a first visit, the one of your device) is fetched now, alongside the app.
  let l = ""; try { l = JSON.parse(localStorage.getItem("ppl.lang")) || ""; } catch {}
  if (!l) l = (navigator.languages || [navigator.language || ""]).map(x => String(x).slice(0, 2).toLowerCase()).find(x => x === "nl" || FPT_I18N_FILES[x]) || "nl";
  window.FPT_LANG_FILE = FPT_I18N_FILES[l] || "";
  if (FPT_LANG_FILE){ const k = document.createElement("link"); k.rel = "preload"; k.as = "script"; k.href = FPT_LANG_FILE; document.head.appendChild(k); }
})();""" % (json.dumps({"langs": i18n["langs"]}), json.dumps(lang_files))
# At the end of the page: the language (if any) and then the app, in that order.
load_js = """[window.FPT_LANG_FILE, %s].forEach(src => { if (!src) return; const s = document.createElement("script"); s.src = src; s.async = false; document.body.appendChild(s); });""" % json.dumps(app_src)

csp = "; ".join([
    "default-src 'self'",
    "script-src 'self' " + " ".join(csp_hash(js) for js in (theme_js, boot_js, load_js)),
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "img-src 'self' data: blob:",
    "media-src 'self' data: blob:",
    f"connect-src 'self' {SB} https://intervals.icu",
    "worker-src 'self'",
    "manifest-src 'self'",
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'none'",
])

html = f"""<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="{csp}">
<meta name="referrer" content="no-referrer">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#16a34a">
<meta name="format-detection" content="telephone=no">
<meta name="description" content="Fitness Progress Tracker: schema's, voorstellen voor gewicht en reps, rusttimer en je vooruitgang.">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32.png">
<link rel="icon" type="image/png" sizes="192x192" href="icon-192.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="FPT">
<meta name="application-name" content="FPT">
<link rel="preload" as="script" href="{app_src}">
<script>{boot_js}</script>
{head_part.strip()}
<style>{fonts_css}</style>
<style>:root{{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}}body{{margin:0}}img{{max-width:100%}}[hidden]{{display:none!important}}</style>
{style}
</head>
<body>
{body.strip()}
<script>{load_js}</script>
</body>
</html>
"""
(OUT / "index.html").write_text(html, encoding="utf-8")

manifest = {
    "id": "./",
    "name": "Fitness Progress Tracker",
    "short_name": "FPT",
    "description": "Schema's, voorstellen voor gewicht en reps, rusttimer en je vooruitgang.",
    "start_url": "./",
    "scope": "./",
    "display": "standalone",
    "background_color": "#f3e8d2",
    "theme_color": "#16a34a",
    "lang": "nl",
    "dir": "ltr",
    "categories": ["health", "fitness", "sports"],
    "prefer_related_applications": False,
    "icons": [
        {"src": "icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any"},
        {"src": "icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any"},
        {"src": "icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}
    ]
}
# Optional: screenshots in src/screenshots/ (a phone one, about 1080x1920, and a wide one, about 1920x1080)
# give the richer install window in Chrome and Edge, on phones and on PCs.
shots = [("screenshot-phone.png", "narrow", "Vandaag: je volgende training en je week"), ("screenshot-wide.png", "wide", "FPT op een pc")]
for name, form, label in shots:
    if (ROOT / "screenshots" / name).exists():
        shutil.copyfile(ROOT / "screenshots" / name, OUT / name)
        w, h = Image.open(OUT / name).size
        manifest.setdefault("screenshots", []).append({"src": name, "sizes": f"{w}x{h}", "type": "image/png", "form_factor": form, "label": label})
(OUT / "manifest.webmanifest").write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")

# Round badge (made by tools/make_icons.py): round for "any", full-bleed for maskable launchers and iOS.
icons = ROOT / "icons"
round_logo = Image.open(icons / "fpt-round.png").convert("RGBA")
for size, name in [(32, "favicon-32.png"), (192, "icon-192.png"), (512, "icon-512.png")]:
    round_logo.resize((size, size), Image.LANCZOS).save(OUT / name, optimize=True)
Image.open(icons / "fpt-maskable.png").convert("RGBA").resize((512, 512), Image.LANCZOS).save(OUT / "icon-maskable-512.png", optimize=True)
Image.open(icons / "fpt-apple.png").convert("RGB").resize((180, 180), Image.LANCZOS).save(OUT / "apple-touch-icon.png", optimize=True)

version = time.strftime("%Y%m%d%H%M%S")
shell = ["./", app_src, "manifest.webmanifest", "favicon-32.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png"]
kept = [f"fonts/{n}" for n in font_files] + list(lang_files.values())
sw = """// Offline support. The app opens from the cache at once (also without network); a new version is fetched in
// the background as soon as this file changes, and the app offers to reload into it.
const CACHE = "fpt-%s", FILES = "fpt-files";
const SHELL = %s;
// Fonts and languages: fetched when the page needs them, then kept (their names change when their content does).
const KEPT = new Set(%s.map(u => new URL(u, location).href));
const HOME = new URL("./", location).pathname;
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: "no-cache" })))).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k !== CACHE && k !== FILES) await caches.delete(k);
  const files = await caches.open(FILES);
  for (const r of await files.keys()) if (!KEPT.has(r.url)) await files.delete(r);
  await self.clients.claim();
})()); });
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  if (req.mode === "navigate"){
    if (url.pathname !== HOME && url.pathname !== HOME + "index.html") return;
    e.respondWith(caches.open(CACHE).then(c => c.match("./")).then(r => r || fetch(req)).catch(() => fetch(req)));
    return;
  }
  e.respondWith(caches.match(req).then(r => r || fetch(req).then(n => {
    if (n.ok && KEPT.has(url.href)){ const copy = n.clone(); caches.open(FILES).then(c => c.put(req, copy)); }
    return n;
  })));
});
""" % (version, json.dumps(shell), json.dumps(kept))
(OUT / "sw.js").write_text(sw, encoding="utf-8")
print("built", OUT, "version", version, "| index.html", (OUT / "index.html").stat().st_size // 1024, "KB, app.js", (OUT / "app.js").stat().st_size // 1024, "KB")
