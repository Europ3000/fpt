// Offline support. The app opens from the cache at once (also without network); a new version is fetched in
// the background as soon as this file changes, and the app offers to reload into it.
const CACHE = "fpt-20261101122510", FILES = "fpt-files";
const SHELL = ["./", "app.js?v=d7a370d1f0", "manifest.webmanifest", "favicon-32.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png"];
// Fonts and languages: fetched when the page needs them, then kept (their names change when their content does).
const KEPT = new Set(["fonts/barlowcondensed-3787a5a419.woff2", "fonts/barlowcondensed-3ce6b38d56.woff2", "fonts/barlowcondensed-3e91132781.woff2", "fonts/barlowcondensed-41897978bd.woff2", "fonts/barlowcondensed-59b4810062.woff2", "fonts/barlowcondensed-62bb43f8f7.woff2", "fonts/barlowcondensed-6c554f2dec.woff2", "fonts/barlowcondensed-6ed202b930.woff2", "fonts/barlowcondensed-9d351bd922.woff2", "fonts/fraunces-5847b622f5.woff2", "fonts/fraunces-7e74484902.woff2", "fonts/fraunces-e9521563d0.woff2", "fonts/inter-1be3448e29.woff2", "fonts/inter-3100e775e8.woff2", "fonts/inter-34b9c504ca.woff2", "fonts/inter-5c66f9e07e.woff2", "fonts/inter-6e9e020a25.woff2", "fonts/inter-71d5ee93cc.woff2", "fonts/inter-ca15706333.woff2", "fonts/orbitron-c25a9f9da5.woff2", "fonts/pressstart2p-3c7df3a15e.woff2", "fonts/pressstart2p-954380ff6f.woff2", "fonts/pressstart2p-afec86997f.woff2", "fonts/pressstart2p-c2a20dcb95.woff2", "fonts/pressstart2p-fb54a8f8c2.woff2", "i18n/en.js?v=bc563bebd7", "i18n/fr.js?v=f296b794fc", "i18n/es.js?v=d9a915b482", "i18n/de.js?v=fda8ef0019", "i18n/it.js?v=20bbbde643", "i18n/pt.js?v=0a7f8776b1", "i18n/ru.js?v=71bfe14d47", "i18n/zh.js?v=e1d467b185", "i18n/ar.js?v=1ce97563f2", "i18n/hi.js?v=c3872e57a9"].map(u => new URL(u, location).href));
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
