"use strict";
const test = require("node:test"), assert = require("node:assert/strict");
const { loadApp } = require("./harness");

const file = text => ({ size: text.length, text: async () => text });
const HEVY = [
  'title,start_time,end_time,description,exercise_title,superset_id,exercise_notes,set_index,set_type,weight_kg,reps,distance_km,duration_seconds,rpe',
  '"Push dag","20 Oct 2025, 18:30","20 Oct 2025, 19:30","","Bench Press (Barbell)",,"",0,warmup,40,10,,,',
  '"Push dag","20 Oct 2025, 18:30","20 Oct 2025, 19:30","","Bench Press (Barbell)",,"",1,normal,80,5,,,',
  '"Push dag","20 Oct 2025, 18:30","20 Oct 2025, 19:30","","Bench Press (Barbell)",,"",2,normal,82.5,4,,,',
  '"Push dag","20 Oct 2025, 18:30","20 Oct 2025, 19:30","","Plank",,"",0,normal,,,,60,'
].join("\n");
const STRONG = [
  'Date,Workout Name,Duration,Exercise Name,Set Order,Weight,Reps,Distance,Seconds,Notes,Workout Notes,RPE',
  '2025-10-21 07:15:00,Legs,45m,Squat (Barbell),W,60,8,0,0,,,',
  '2025-10-21 07:15:00,Legs,45m,Squat (Barbell),1,100,5,0,0,,,',
  '2025-10-21 07:15:00,Legs,45m,Squat (Barbell),Rest Timer,0,0,0,90,,,',
  '2025-10-21 07:15:00,Legs,45m,Squat (Barbell),2,105,3,0,0,,,'
].join("\n");
const FITNOTES = [
  'Date,Exercise,Category,Weight (kg),Reps,Distance,Distance Unit,Time',
  '2025-10-22,Deadlift,Back,140,5,,,',
  '2025-10-22,Deadlift,Back,150,3,,,'
].join("\n");
const JEFIT = [
  '### JEFIT EXPORT',
  '# EXERCISE LOGS',
  'mydate,ename,logs,belongsession',
  '2025-10-23,Barbell Curl,"40x8,40x8,42.5x6",1',
  '2025-10-23,Lat Pulldown,"60x10",1'
].join("\n");

async function app(){ return loadApp({ standalone: true }); }
const daySets = (a, d, k) => a.ev(`log[${JSON.stringify(d)}].ex[${JSON.stringify(k)}].sets`);

test("csvRows leest aanhalingstekens, komma's en regeleinden", async () => {
  const a = await app();
  const rows = a.ev(`csvRows(${JSON.stringify('a,"b,c",d\r\n"x ""y""",2,3\n')})`);
  assert.deepEqual(JSON.parse(JSON.stringify(rows.slice(0, 2))), [["a", "b,c", "d"], ['x "y"', "2", "3"]]);
});

test("Hevy: warm-upset wordt overgeslagen, tijdset blijft", async () => {
  const a = await app();
  const r = a.ev(`csvSets(csvRows(${JSON.stringify(HEVY)}))`);
  assert.equal(r.src, "Hevy");
  const s = JSON.parse(JSON.stringify(r.sets));
  assert.equal(s.length, 3);   // 2 werksets + plank
  assert.deepEqual(s.filter(x => x.r).map(x => [x.w, x.r]).slice(0, 2), [[80, 5], [82.5, 4]]);
  assert.ok(s.some(x => x.sec === 60 && x.w === 0));
  assert.equal(s[0].date, "2025-10-20");
});

test("Strong: warm-up en rusttimer overgeslagen", async () => {
  const a = await app();
  const r = a.ev(`csvSets(csvRows(${JSON.stringify(STRONG)}))`);
  assert.equal(r.src, "Strong");
  assert.deepEqual(JSON.parse(JSON.stringify(r.sets)).map(x => [x.w, x.r]), [[100, 5], [105, 3]]);
});

test("FitNotes en JEFIT worden herkend", async () => {
  const a = await app();
  const f = a.ev(`csvSets(csvRows(${JSON.stringify(FITNOTES)}))`);
  assert.equal(f.src, "FitNotes"); assert.equal(f.sets.length, 2);
  const j = a.ev(`csvSets(csvRows(${JSON.stringify(JEFIT)}))`);
  assert.equal(j.src, "JEFIT"); assert.equal(j.sets.length, 4);
  assert.equal(j.sets[2].w, 42.5);
});

test("onbekend bestand geeft null", async () => {
  const a = await app();
  assert.equal(a.ev(`csvSets(csvRows(${JSON.stringify("foo,bar\n1,2")}))`), null);
});

test("importName koppelt aan FPT-oefeningen", async () => {
  const a = await app();
  assert.equal(a.ev(`importName("Bench Press (Barbell)")`), "Bench Press");
  assert.equal(a.ev(`importName("Squat (Barbell)")`), "Back Squat");
  assert.equal(a.ev(`importName("Iets Onbekends")`), "Iets Onbekends");
});

for (const [naam, csv, dag, sleutel, aantal] of [["Hevy", HEVY, "2025-10-20", "bench-press", 2], ["Strong", STRONG, "2025-10-21", "back-squat", 2],
  ["FitNotes", FITNOTES, "2025-10-22", "deadlift", 2], ["JEFIT", JEFIT, "2025-10-23", "barbell-curl", 3]]){
  test(`importCsv ${naam}: zet sets in het logboek en twee keer importeren voegt niets toe`, async () => {
    const a = await app();
    await a.ev(`importCsv`)(file(csv));
    const s = daySets(a, dag, sleutel);
    assert.equal(s.length, aantal);
    const eerste = JSON.stringify(a.ev("log")), rec = JSON.stringify(a.ev("records"));
    await a.ev(`importCsv`)(file(csv));
    assert.equal(JSON.stringify(a.ev("log")), eerste, "log veranderd na tweede import");
    assert.equal(JSON.stringify(a.ev("records")), rec);
    assert.ok(a.storage.getItem("ppl.log") || [...a.storage._m.keys()].some(k => k.startsWith("ppl.")), "niets opgeslagen");
  });
}

test("importCsv laat bestaande oefening van die dag ongemoeid", async () => {
  const a = await app();
  a.ev(`log["2025-10-22"] = { date: "2025-10-22", days: ["Pull"], ex: { "deadlift": { name: "Deadlift", order: 0, sets: [{ w: 100, r: 5, t: "2025-10-22T10:00:00.000Z" }] } } }`);
  await a.ev(`importCsv`)(file(FITNOTES));
  assert.equal(daySets(a, "2025-10-22", "deadlift").length, 1);
});

test("importCsv: records krijgen hoogste gewicht", async () => {
  const a = await app();
  await a.ev(`importCsv`)(file(HEVY));
  assert.equal(a.ev(`records["bench-press"].best`), 82.5);
});

test("importCsv: bestand zonder trainingen wijzigt niets", async () => {
  const a = await app();
  await a.ev(`importCsv`)(file("foo,bar\n1,2"));
  assert.equal(Object.keys(a.ev("log")).length, 0);
});
