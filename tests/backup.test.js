"use strict";
const test = require("node:test"), assert = require("node:assert/strict");
const { loadApp } = require("./harness");

const J = x => JSON.parse(JSON.stringify(x));
const LOG = { "2025-10-01": { date: "2025-10-01", days: ["Push"], ex: { "bench-press": { name: "Bench Press", order: 0, sets: [{ w: 80, r: 5, t: "2025-10-01T10:00:00.000Z" }] } } } };
const REC = { "bench-press": { best: 80, last: 80, date: "2025-10-01T10:00:00.000Z", name: "Bench Press" } };
const seed = { "ppl.log": JSON.stringify(LOG), "ppl.records": JSON.stringify(REC) };
const sleep = ms => new Promise(r => setTimeout(r, ms));

test("backupData bevat alleen ppl.-sleutels", async () => {
  const a = await loadApp({ storage: Object.assign({ "fpt.sb": "{}", "fpt.synced": "{}", "andere": "x" }, seed) });
  const d = J(a.ev("backupData()"));
  assert.equal(d.app, "FPT");
  assert.ok(Object.keys(d.items).every(k => k.startsWith("ppl.")));
  assert.equal(d.items["ppl.log"], seed["ppl.log"]);
});

test("back-up en herstel: gegevens komen onveranderd terug op een leeg toestel", async () => {
  const a = await loadApp({ storage: seed });
  const data = a.ev("backupData()");
  const b = await loadApp({});
  assert.equal(b.ev(`restoreItems(${JSON.stringify(data)})`), true);
  assert.equal(b.storage.getItem("ppl.log"), seed["ppl.log"]);
  assert.equal(b.storage.getItem("ppl.records"), seed["ppl.records"]);
});

test("restoreItems wist de synchronisatiestand (herstel telt niet als verwijderen)", async () => {
  const a = await loadApp({ storage: { "fpt.synced": '{"uid":"u","docs":{}}' } });
  assert.equal(a.ev(`restoreItems({ app: "FPT", items: { "ppl.log": "{}" } })`), true);
  assert.equal(a.storage.getItem("fpt.synced"), null);
});

test("restoreItems weigert ongeldige back-ups en laat de opslag ongemoeid", async () => {
  const a = await loadApp({ storage: seed });
  const bad = [null, {}, { app: "ANDERS", items: { "ppl.log": "{}" } }, { app: "FPT" }, { app: "FPT", items: {} },
    { app: "FPT", items: { "ppl.log": "{kapot" } },                       // ongeldige JSON
    { app: "FPT", items: { "ppl.log": "{}", "ppl.records": "{kapot" } },    // één kapotte waarde: niets schrijven
    { app: "FPT", items: { "fpt.sb": "{}", "evil": "{}", "ppl.x": 5 } }];   // vreemde sleutels / geen tekst
  for (const d of bad){
    assert.equal(a.ev(`restoreItems(${JSON.stringify(d)})`), false, JSON.stringify(d));
    assert.equal(a.storage.getItem("ppl.log"), seed["ppl.log"]);
    assert.equal(a.storage.getItem("ppl.records"), seed["ppl.records"]);
    assert.equal(a.storage.getItem("evil"), null);
  }
});

test("restoreItems negeert vreemde sleutels maar neemt de eigen over", async () => {
  const a = await loadApp({});
  assert.equal(a.ev(`restoreItems({ app: "FPT", items: { "ppl.log": "{}", "fpt.sb": "{\\"x\\":1}", "evil": "1" } })`), true);
  assert.equal(a.storage.getItem("fpt.sb"), null);
  assert.equal(a.storage.getItem("evil"), null);
  assert.equal(a.storage.getItem("ppl.log"), "{}");
});

test("packShare/unpackShare: rondreis voor een back-up", async () => {
  const a = await loadApp({ storage: seed });
  const data = J(a.ev("backupData()"));
  const packed = await a.ev("packShare")(data);
  assert.match(packed, /^[zj][A-Za-z0-9_-]+$/);
  assert.deepEqual(J(await a.ev("unpackShare")(packed, 20e6)), data);
});

test("#move=: gegevens van het oude adres worden na bevestiging overgenomen", async () => {
  const a = await loadApp({ storage: seed });
  const packed = await a.ev("packShare")(a.ev("backupData()"));
  let asked = 0;
  const b = await loadApp({ hash: "#move=" + packed, confirm: () => (asked++, true) });
  await sleep(150);
  assert.equal(asked, 1);
  assert.equal(b.storage.getItem("ppl.log"), seed["ppl.log"]);
  assert.equal(b.storage.getItem("ppl.records"), seed["ppl.records"]);
});

test("#move=: bij 'Annuleren' verandert er niets", async () => {
  const a = await loadApp({ storage: seed });
  const packed = await a.ev("packShare")(a.ev("backupData()"));
  const b = await loadApp({ hash: "#move=" + packed, confirm: () => false, storage: { "ppl.log": "{}" } });
  await sleep(150);
  assert.equal(b.storage.getItem("ppl.log"), "{}");
});

test("#move=: een verhuislink van een ander programma of met rommel doet niets", async () => {
  const a = await loadApp({});
  const packed = await a.ev("packShare")({ app: "ANDERS", items: { "ppl.log": "{}" } });
  const b = await loadApp({ hash: "#move=" + packed, storage: seed });
  await sleep(150);
  assert.equal(b.storage.getItem("ppl.log"), seed["ppl.log"]);
  const c = await loadApp({ hash: "#move=jaaaaa", storage: seed });
  await sleep(150);
  assert.equal(c.storage.getItem("ppl.log"), seed["ppl.log"]);
});

// ---------- records en geschat 1RM ----------
test("e1rm: Epley-schatting uit gewicht × reps", async () => {
  const a = await loadApp({});
  assert.equal(a.ev("e1rm({ w: 100, r: 5 })"), 100 * (1 + 5 / 30));
  assert.equal(a.ev("e1rm({ w: 100 })"), 100);          // zonder reps: het gewicht zelf
  assert.ok(a.ev("e1rm({ w: 80, r: 10 })") > a.ev("e1rm({ w: 100, r: 1 })") === (80 * (1 + 10 / 30) > 100 * (1 + 1 / 30)));
});

async function lift(a, name, w, reps){
  const msgs = [];
  a.ev(`toast = m => globalThis.__msgs.push(m)`);
  a.ctx.__msgs = msgs;
  a.ev(`saveWeight(${JSON.stringify(name)}, ${JSON.stringify(String(w))}, ${JSON.stringify(String(reps))}, "")`);
  return msgs[msgs.length - 1] || "";
}

test("saveWeight: nieuw record bij zwaarder gewicht, geschat-1RM-record bij meer reps", async () => {
  const a = await loadApp({});
  assert.match(await lift(a, "Bench Press", 100, 5), /Set 1 opgeslagen/);              // eerste keer: geen "record"
  assert.match(await lift(a, "Bench Press", 100, 8), /Nieuw geschat 1RM-record/);      // zelfde gewicht, meer reps
  assert.match(await lift(a, "Bench Press", 100, 6), /Set 3 opgeslagen/);              // minder: geen record
  assert.match(await lift(a, "Bench Press", 105, 1), /Nieuw record! 105/);             // zwaarder gewicht
  assert.equal(a.ev(`records["bench-press"].best`), 105);
  assert.equal(a.ev(`records["bench-press"].last`), 105);
});

test("saveWeight: ongeldige invoer schrijft niets weg", async () => {
  const a = await loadApp({});
  await lift(a, "Bench Press", -5, 5); await lift(a, "Bench Press", 2000, 5); await lift(a, "Bench Press", 50, 500); await lift(a, "Bench Press", "abc", 5);
  assert.equal(Object.keys(a.ev("log")).length, 0);
  assert.equal(Object.keys(a.ev("records")).length, 0);
});

test("saveWeight: record blijft behouden na een lichtere set (best daalt niet)", async () => {
  const a = await loadApp({});
  await lift(a, "Squat", 120, 3); await lift(a, "Squat", 90, 10);
  assert.equal(a.ev(`records["squat"].best`), 120);
  assert.equal(a.ev(`records["squat"].last`), 90);
  assert.equal(J(a.ev("log"))[a.ev("today()")].ex["squat"].sets.length, 2);
});

test("merge (records): hoogste best, meest recente last", async () => {
  const a = await loadApp({});
  const r = J(a.ev(`merge({ x: { best: 100, last: 90, date: "2025-01-02", name: "X" } }, { x: { best: 95, last: 95, date: "2025-01-05", name: "X" }, y: { best: 1, last: 1, date: "2025-01-01" } })`));
  assert.deepEqual(r.x, { best: 100, last: 95, date: "2025-01-05", name: "X" });
  assert.ok(r.y);
});
