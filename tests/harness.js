// Laadt het hoofdscript van FPT (de laatste <script> in src/training-log.html, net zoals build.py) in een
// Node-vm met een nep-DOM, zodat de gegevenslogica getest kan worden zonder browser en zonder de app te wijzigen.
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const SRC = process.env.FPT_SRC || path.join(__dirname, "..", "src", "training-log.html");

function stub(){
  // Een stuk "DOM" dat alles slikt: elke eigenschap is weer een stub, elke aanroep geeft een stub.
  const fn = function(){};
  const p = new Proxy(fn, {
    get(_, k){
      if (k === Symbol.toPrimitive) return () => "";
      if (k === "then") return undefined;
      if (k === "length") return 0;
      if (k === "nodeType") return 1;
      if (k === "dataset") return stubObj();
      if (["hidden", "checked", "disabled"].includes(k)) return false;
      if (["value", "textContent", "innerHTML", "className", "id"].includes(k)) return "";
      if (k === "children" || k === "childNodes") return []; if (k === "querySelectorAll") return () => [];
      if (k === "matches") return () => false;
      return p;
    },
    set(){ return true; },
    apply(){ return p; },
    construct(){ return p; },
    has(){ return true; }
  });
  return p;
}
function stubObj(){ return new Proxy({}, { get: (t, k) => k in t ? t[k] : "", set: (t, k, v) => (t[k] = v, true) }); }

function memStorage(init){
  const m = new Map(Object.entries(init || {}));
  return {
    get length(){ return m.size; },
    key: i => [...m.keys()][i] ?? null,
    getItem: k => m.has(k) ? m.get(k) : null,
    setItem: (k, v) => void m.set(String(k), String(v)),
    removeItem: k => void m.delete(k),
    clear: () => m.clear(),
    _m: m
  };
}

let scriptCache;
function appScript(){
  if (scriptCache) return scriptCache;
  const html = fs.readFileSync(SRC, "utf8");
  const a = html.lastIndexOf("<script>"), b = html.lastIndexOf("</script>");
  return scriptCache = html.slice(a + 8, b);
}

// opts: { storage: {k:v}, standalone: bool, hash: "#move=…", now: Date.parse(...) }
async function loadApp(opts = {}){
  const storage = memStorage(Object.assign({ "ppl.welcomed": "true" }, opts.storage)), toasts = [], fetchLog = [];
  const document = stubObj(), doc = stub();
  const win = {};
  const ctx = {
    console, setTimeout, clearTimeout, setInterval: () => 0, clearInterval: () => {}, Promise, JSON, Math, Date, URL, TextEncoder, TextDecoder, Blob, Response,
    CompressionStream, DecompressionStream, atob, btoa, structuredClone, Uint8Array, Intl, encodeURIComponent, decodeURIComponent,
    localStorage: storage, sessionStorage: memStorage(), document: doc, navigator: { language: "nl-NL", languages: ["nl-NL"], userAgent: "node" },
    location: { hash: opts.hash || "", pathname: "/", search: "", href: "https://fptfit.app/", reload(){ ctx.__reloaded = true; } },
    history: { replaceState(){} }, matchMedia: () => ({ matches: false, addEventListener(){}, addListener(){} }),
    confirm: opts.confirm || (() => true), alert(){}, prompt: () => null,
    MutationObserver: function(){ return { observe(){}, disconnect(){} }; }, IntersectionObserver: function(){ return { observe(){}, disconnect(){} }; },
    ResizeObserver: function(){ return { observe(){}, disconnect(){} }; }, requestAnimationFrame: f => 0, cancelAnimationFrame(){},
    fetch: opts.fetch || (async (u, o) => { fetchLog.push([u, o]); throw new Error("offline"); }),
    Notification: undefined, performance: { now: () => Date.now() }, devicePixelRatio: 1, innerWidth: 400, innerHeight: 800,
    addEventListener(){}, removeEventListener(){}, dispatchEvent(){}, getComputedStyle: () => ({ fontSize: "16px", getPropertyValue: () => "" }), scrollTo(){}, open(){}, print(){}, screen: {}, visualViewport: null, speechSynthesis: undefined, caches: undefined,
    FileReader: function(){ }, FormData: function(){}, Image: function(){ return stub(); }, Audio: function(){ return stub(); },
    URLSearchParams, setImmediate, queueMicrotask, Symbol, Map, Set, Number, String, Array, Object, RegExp, Error, parseFloat, parseInt, isFinite, isNaN, CSS: { escape: s => String(s), supports: () => false }, AbortController, Event: function(){}, CustomEvent: function(){}, WebSocket: function(){}
  };
  ctx.window = ctx; ctx.self = ctx; ctx.globalThis = ctx;
  if (opts.standalone) ctx.FPT_STANDALONE = true;
  vm.createContext(ctx);
  // De app roept connectStore() aan het eind aan; die geven we pas op eigen verzoek vrij (zie opts.autoConnect).
  const code = appScript() + "\n;globalThis.__ev = c => eval(c);\n";
  vm.runInContext(code, ctx, { filename: "training-log.html<script>" });
  const ev = c => ctx.__ev(c);
  await new Promise(r => setTimeout(r, 20));   // laat de start-up-promises (connectStore, #move) uitlopen
  return { ctx, ev, storage, fetchLog, get: n => ev(n), run: (c) => ev(c) };
}

module.exports = { loadApp, memStorage };
