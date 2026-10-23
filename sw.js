// Offline support: the app shell is cached; a new version replaces it on the next visit.
const CACHE = "fpt-20261023220627";
const SHELL = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === location.origin){
    // Network first for the page (newest version when online), cache as fallback offline.
    if (req.mode === "navigate"){ e.respondWith(fetch(req.url, { cache: "no-cache", redirect: "manual" }).then(r => { if (r.ok) caches.open(CACHE).then(c => c.put("index.html", r.clone())); return r; }).catch(() => caches.match("index.html"))); return; }
    e.respondWith(caches.match(req).then(r => r || fetch(req)));
  } else if (url.hostname.endsWith("fonts.googleapis.com") || url.hostname.endsWith("fonts.gstatic.com")){
    e.respondWith(caches.open(CACHE).then(c => c.match(req).then(r => r || fetch(req).then(n => { c.put(req, n.clone()); return n; }))));
  }
});
