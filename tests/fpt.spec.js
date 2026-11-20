// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
const fs = require("fs");

test.use({ locale: "nl-NL" });   // the source text is Dutch; the toasts below are the Dutch ones

const TABS = ["#viewToday", "#viewTrain", "#viewStats", "#viewPlan"];

async function open(page, { skipWelcome = true } = {}) {
  await page.goto("/index.html");
  if (skipWelcome) {
    await page.locator("#welcomeSkip").click();
    await expect(page.locator("#welcome")).toBeHidden();
  }
}
const log = page => page.evaluate(() => JSON.parse(localStorage.getItem("ppl.log") || "{}"));
const toast = page => page.locator("#toast");

// Logs one set for the first exercise on the Training tab.
async function logSet(page, w, r) {
  await page.locator("#viewTrain").click();
  const form = page.locator("form.sr.act").first();
  await form.locator("input[data-kbm=decimal]").fill(String(w));
  await form.locator("input[data-kbm=numeric]").fill(String(r));
  await form.locator("button[type=submit]").click();
}
const setCount = async page => Object.values(await log(page)).reduce((n, d) => n + Object.values(d.ex || {}).reduce((m, e) => m + e.sets.length, 0), 0);

test("1. first start: welcome wizard, Overslaan closes it, stays away after reload", async ({ page }) => {
  await open(page, { skipWelcome: false });
  await expect(page.locator("#welcome")).toBeVisible();
  await page.locator("#welcomeSkip").click();
  await expect(page.locator("#welcome")).toBeHidden();
  await page.reload();
  await expect(page.locator("#viewTrain")).toBeVisible();
  await expect(page.locator("#welcome")).toBeHidden();
});

test("2. log a set: toast, rest timer, localStorage", async ({ page }) => {
  await open(page);
  await logSet(page, 40, 5);
  await expect(toast(page)).toContainText("Set 1 opgeslagen");
  await expect(page.locator("#restBar")).toBeVisible();
  const l = await log(page);
  const sets = Object.values(l).flatMap(d => Object.values(d.ex).flatMap(e => e.sets));
  expect(sets).toHaveLength(1);
  expect(sets[0]).toMatchObject({ w: 40, r: 5 });
});

test("3. records: heavier set, then more reps at the same weight", async ({ page }) => {
  await open(page);
  await logSet(page, 40, 5);
  await expect(toast(page)).toContainText("Set 1 opgeslagen");
  await logSet(page, 45, 5);
  await expect(toast(page)).toContainText("Nieuw record!");
  await logSet(page, 45, 8);
  await expect(toast(page)).toContainText("Nieuw geschat 1RM-record!");
});

test("4. back-up: download json, wipe, restore", async ({ page }, info) => {
  await open(page);
  await logSet(page, 40, 5);
  await expect(toast(page)).toContainText("Set 1 opgeslagen");
  await page.locator("#settingsBtn").click();
  const [dl] = await Promise.all([page.waitForEvent("download"), page.locator("#backupDl").click()]);
  expect(dl.suggestedFilename()).toMatch(/\.json$/);
  const file = info.outputPath("backup.json");
  await dl.saveAs(file);
  expect(() => JSON.parse(fs.readFileSync(file, "utf8"))).not.toThrow();

  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.locator("#welcomeSkip").click();
  expect(await setCount(page)).toBe(0);
  await page.locator("#settingsBtn").click();
  await page.locator("#backupFile").setInputFiles(file);
  await expect.poll(() => setCount(page)).toBe(1);
});

for (const [name, file, sets, src] of [["Hevy", "hevy.csv", 3, "Hevy"], ["Strong", "strong.csv", 3, "Strong"], ["FitNotes", "fitnotes.csv", 3, "FitNotes"]]) {
  test(`5. csv import: ${name}, and a second time adds nothing`, async ({ page }) => {
    await open(page);
    await page.locator("#settingsBtn").click();
    const fixture = path.join(__dirname, "fixtures", file);
    await page.locator("#csvFile").setInputFiles(fixture);
    await expect(toast(page)).toContainText(`sets uit ${src} geïmporteerd`);
    expect(await setCount(page)).toBe(sets);
    await page.locator("#csvFile").setInputFiles(fixture);
    await expect(toast(page)).toContainText("Alles uit dit bestand staat al in je logboek.");
    expect(await setCount(page)).toBe(sets);
  });
}

test("6. no console errors, no sideways scroll on the four tabs", async ({ page }) => {
  const errors = [];
  page.on("pageerror", e => errors.push(e.message));
  page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  await open(page);
  for (const tab of TABS) {
    await page.locator(tab).click();
    await page.waitForTimeout(300);
    const w = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(w, `scrollWidth on ${tab}`).toBeLessThanOrEqual(375);
  }
  expect(errors).toEqual([]);
});
