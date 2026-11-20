"use strict";
const test = require("node:test"), assert = require("node:assert/strict");
const { loadApp } = require("./harness");

// Een nep-Supabase: één tabel fpt_store (user_id, key, value), bereikbaar via fetch zoals sbRest dat doet.
function server(){
  const rows = new Map();
  const fetch = async (url, o = {}) => {
    const u = new URL(url), q = u.searchParams, method = o.method || "GET", ok = b => ({ ok: true, status: 200, json: async () => b });
    if (!u.pathname.endsWith("/rest/v1/fpt_store")) return { ok: false, status: 404, json: async () => ({}) };
    const key = q.get("key") || "";
    if (method === "GET"){
      if (key.startsWith("eq.")){ const k = key.slice(3); return ok(rows.has(k) ? [{ value: JSON.parse(rows.get(k)) }] : []); }
      const pre = key.slice(5, -1);   // like.<prefix>*
      return ok([...rows].filter(([k]) => k.startsWith(pre)).map(([k, v]) => ({ key: k, value: JSON.parse(v) })));
    }
    if (method === "POST"){ const b = JSON.parse(o.body); rows.set(b.key, JSON.stringify(b.value)); return ok(null); }
    if (method === "DELETE"){ rows.delete(key.slice(3)); return ok(null); }
    return { ok: false, status: 400, json: async () => ({}) };
  };
  return { rows, fetch, doc: k => rows.has(k) ? JSON.parse(rows.get(k)) : undefined };
}
const SESSION = JSON.stringify({ access_token: "t", refresh_token: "r", expires_at: 4e9, user: { id: "u1", email: "a@b.c" } });
const dev = (srv, storage = {}) => loadApp({ standalone: true, fetch: srv.fetch, storage: Object.assign({ "fpt.sb": SESSION }, storage) });
const set = (w, r, t) => ({ w, r, t });
const day = (date, k, name, sets) => ({ date, days: ["Push"], ex: { [k]: { name, order: 0, sets } } });
const sync = async a => { await a.ev("connectStore")(); await a.ev("waitForSync")(); };
const J = x => JSON.parse(JSON.stringify(x));
const T = (d, h) => `${d}T${h}:00:00.000Z`;
const wsets = (d, date, k) => J(d.ev("log"))[date].ex[k].sets.map(s => s.w);

test("eerste toestel schrijft zijn gegevens naar het account", async () => {
  const srv = server();
  const a = await dev(srv, { "ppl.log": JSON.stringify({ "2025-10-01": day("2025-10-01", "bench-press", "Bench Press", [set(80, 5, T("2025-10-01", "10"))]) }),
    "ppl.records": JSON.stringify({ "bench-press": { best: 80, last: 80, date: T("2025-10-01", "10"), name: "Bench Press" } }) });
  await sync(a);
  assert.ok(srv.doc("log/sessions/2025-10-01"), "dag niet geschreven");
  assert.equal(srv.doc("records").lifts["bench-press"].best, 80);
});

test("twee toestellen met verschillende wijzigingen: niets gaat verloren", async () => {
  const srv = server();
  const A = await dev(srv, { "ppl.log": JSON.stringify({ "2025-10-01": day("2025-10-01", "bench-press", "Bench Press", [set(80, 5, T("2025-10-01", "10"))]) }) });
  await sync(A);
  const B = await dev(srv);
  await sync(B);
  assert.deepEqual(wsets(B, "2025-10-01", "bench-press"), [80], "B krijgt de dag van A");

  // A voegt een set toe aan dezelfde dag; B voegt een andere dag toe én een record
  A.ev(`log["2025-10-01"].ex["bench-press"].sets.push({ w: 85, r: 3, t: "${T("2025-10-01", "11")}" }); lsSet(LS_LOG, log)`);
  B.ev(`log["2025-10-02"] = ${JSON.stringify(day("2025-10-02", "back-squat", "Back Squat", [set(100, 5, T("2025-10-02", "09"))]))}; lsSet(LS_LOG, log);
        records["back-squat"] = { best: 100, last: 100, date: "${T("2025-10-02", "09")}", name: "Back Squat" }; lsSet(LS_RECORDS, records)`);
  await sync(A); await sync(B); await sync(A);

  for (const d of [A, B]){
    assert.deepEqual(wsets(d, "2025-10-01", "bench-press"), [80, 85]);
    assert.deepEqual(wsets(d, "2025-10-02", "back-squat"), [100]);
    assert.equal(J(d.ev("records"))["back-squat"].best, 100);
  }
  assert.equal(srv.doc("log/sessions/2025-10-01").ex["bench-press"].sets.length, 2);
});

test("beide toestellen voegen een set toe aan dezelfde dag: beide sets blijven", async () => {
  const srv = server();
  const A = await dev(srv, { "ppl.log": JSON.stringify({ "2025-10-05": day("2025-10-05", "bench-press", "Bench Press", [set(80, 5, T("2025-10-05", "10"))]) }) });
  await sync(A);
  const B = await dev(srv); await sync(B);
  A.ev(`log["2025-10-05"].ex["bench-press"].sets.push({ w: 82.5, r: 5, t: "${T("2025-10-05", "11")}" }); lsSet(LS_LOG, log)`);
  B.ev(`log["2025-10-05"].ex["bench-press"].sets.push({ w: 90, r: 1, t: "${T("2025-10-05", "12")}" }); lsSet(LS_LOG, log)`);
  await sync(A); await sync(B); await sync(A);
  for (const d of [A, B]) assert.deepEqual(wsets(d, "2025-10-05", "bench-press"), [80, 82.5, 90]);
});

test("een dag die op het ene toestel verwijderd is, blijft weg (drieweg-merge)", async () => {
  const srv = server();
  const A = await dev(srv, { "ppl.log": JSON.stringify({ "2025-10-06": day("2025-10-06", "deadlift", "Deadlift", [set(140, 5, T("2025-10-06", "10"))]) }) });
  await sync(A);
  const B = await dev(srv); await sync(B);
  A.ev(`delete log["2025-10-06"]; lsSet(LS_LOG, log)`);
  await sync(A); await sync(B);
  assert.equal(srv.doc("log/sessions/2025-10-06"), undefined);
  assert.equal(J(B.ev("log"))["2025-10-06"], undefined);
});

test("eerste sync van een nieuw toestel met eigen data verenigt beide kanten", async () => {
  const srv = server();
  const A = await dev(srv, { "ppl.log": JSON.stringify({ "2025-10-01": day("2025-10-01", "bench-press", "Bench Press", [set(80, 5, T("2025-10-01", "10"))]) }) });
  await sync(A);
  const B = await dev(srv, { "ppl.log": JSON.stringify({ "2025-10-01": day("2025-10-01", "bench-press", "Bench Press", [set(70, 8, T("2025-10-01", "15"))]),
    "2025-10-03": day("2025-10-03", "row", "Row", [set(60, 8, T("2025-10-03", "10"))]) }) });
  await sync(B); await sync(A);
  for (const d of [A, B]){
    assert.deepEqual(wsets(d, "2025-10-01", "bench-press"), [80, 70]);
    assert.ok(J(d.ev("log"))["2025-10-03"]);
  }
});

test("records: hoogste best blijft, ook als de ander een lager record schrijft", async () => {
  const srv = server();
  const A = await dev(srv, { "ppl.records": JSON.stringify({ "bench-press": { best: 100, last: 100, date: T("2025-10-01", "10"), name: "Bench Press" } }) });
  const B = await dev(srv, { "ppl.records": JSON.stringify({ "bench-press": { best: 90, last: 90, date: T("2025-10-02", "10"), name: "Bench Press" } }) });
  await sync(A); await sync(B); await sync(A);
  for (const d of [A, B]) assert.equal(J(d.ev("records"))["bench-press"].best, 100);
});

test("zonder verbinding blijft alles lokaal en gaat niets verloren", async () => {
  const A = await dev({ fetch: async () => { throw new Error("offline"); } }, { "ppl.log": JSON.stringify({ "2025-10-01": day("2025-10-01", "bench-press", "Bench Press", [set(80, 5, T("2025-10-01", "10"))]) }) });
  await sync(A);
  assert.deepEqual(wsets(A, "2025-10-01", "bench-press"), [80]);
});

test("sbDoc: get/set/delete/collection praten met de juiste rijen", async () => {
  const A = await dev(server());
  await A.ev(`sbDoc("x/y")`).set({ a: 1 });
  assert.deepEqual(J((await A.ev(`sbDoc("x/y")`).get()).data()), { a: 1 });
  await A.ev(`sbDoc("c")`).collection("s").doc("d1").set({ n: 1 });
  await A.ev(`sbDoc("c")`).collection("s").doc("d2").set({ n: 2 });
  const docs = (await A.ev(`sbDoc("c")`).collection("s").limit(10).get()).docs;
  assert.deepEqual(docs.map(d => d.id).sort(), ["d1", "d2"]);
  await A.ev(`sbDoc("x/y")`).delete();
  assert.equal((await A.ev(`sbDoc("x/y")`).get()).exists, false);
});
