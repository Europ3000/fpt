"""Build the stand-alone FPT web app (no Claude needed) from training-log.html.

Source lives in src/ (this folder); the built site is written to the repository root,
which GitHub Pages serves. Run again after every change to training-log.html:  py src/build.py
"""
import json, pathlib, re, time
from PIL import Image

ROOT = pathlib.Path(__file__).parent      # src/: source page and logo
OUT = ROOT.parent                          # repository root: the published site

page = (ROOT / "training-log.html").read_text(encoding="utf-8")
page = page.replace('<meta name="claude:viewport-fit-sides" content="cover">\n', "")
head_end = page.index("<style>")
head_part, body_part = page[:head_end], page[head_end:]
style_end = body_part.index("</style>") + len("</style>")
style, body = body_part[:style_end], body_part[style_end:]

html = f"""<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#16a34a">
<meta name="description" content="Fitness Progress Tracker: schema's, voorstellen voor gewicht en reps, rusttimer en je vooruitgang.">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" type="image/png" href="icon-192.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="FPT">
{head_part.strip()}
<style>:root{{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}}body{{margin:0}}img{{max-width:100%}}[hidden]{{display:none!important}}</style>
{style}
<script>window.FPT_STANDALONE = true;</script>
</head>
<body>
{body.strip()}
</body>
</html>
"""
(OUT / "index.html").write_text(html, encoding="utf-8")

manifest = {
    "name": "Fitness Progress Tracker",
    "short_name": "FPT",
    "description": "Schema's, voorstellen voor gewicht en reps, rusttimer en je vooruitgang.",
    "start_url": "./",
    "scope": "./",
    "display": "standalone",
    "background_color": "#f7f3ee",
    "theme_color": "#16a34a",
    "lang": "nl",
    "icons": [
        {"src": "icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any"},
        {"src": "icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any"},
        {"src": "icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}
    ]
}
(OUT / "manifest.webmanifest").write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")

logo = Image.open(ROOT / "fitness-logo-fpt.png").convert("RGBA")
for size, name in [(192, "icon-192.png"), (512, "icon-512.png"), (180, "apple-touch-icon.png")]:
    logo.resize((size, size), Image.LANCZOS).save(OUT / name)
# Maskable: logo shrunk into the safe zone on the same green, so round or squircle masks never cut FPT off.
mask = Image.new("RGBA", (512, 512), (22, 163, 74, 255))
mask.alpha_composite(logo.resize((420, 420), Image.LANCZOS), (46, 46))
mask.save(OUT / "icon-maskable-512.png")

version = time.strftime("%Y%m%d%H%M%S")
sw = """// Offline support: the app shell is cached; a new version replaces it on the next visit.
const CACHE = "fpt-%s";
const SHELL = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === location.origin){
    // Network first for the page (newest version when online), cache as fallback offline.
    if (req.mode === "navigate"){ e.respondWith(fetch(req).then(r => { caches.open(CACHE).then(c => c.put("index.html", r.clone())); return r; }).catch(() => caches.match("index.html"))); return; }
    e.respondWith(caches.match(req).then(r => r || fetch(req)));
  } else if (url.hostname.endsWith("fonts.googleapis.com") || url.hostname.endsWith("fonts.gstatic.com")){
    e.respondWith(caches.open(CACHE).then(c => c.match(req).then(r => r || fetch(req).then(n => { c.put(req, n.clone()); return n; }))));
  }
});
""" % version
(OUT / "sw.js").write_text(sw, encoding="utf-8")
print("built", OUT, "version", version)
