// Builds the Android debug APK: web files -> native/www -> android project -> gradlew assembleDebug.
// Needs a JDK 21 (JAVA_HOME) and the Android SDK (ANDROID_HOME, or sdk.dir in android/local.properties); Android Studio
// brings both. Without them this script says so and stops.
// usage: npm run apk      (from native/, after `py src/build.py` in the repo root)
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const native = resolve(dirname(fileURLToPath(import.meta.url)), ".."), android = join(native, "android"), win = process.platform === "win32";
const run = (cmd, args, cwd) => { const r = spawnSync(cmd, args, { cwd, stdio: "inherit", shell: win }); if (r.status !== 0) process.exit(r.status || 1); };

const props = join(android, "local.properties");
const sdk = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT || (existsSync(props) && /^sdk\.dir=(.+)$/m.exec(readFileSync(props, "utf8")) || [])[1];
if (!sdk) { console.error("Geen Android SDK gevonden. Installeer Android Studio (of zet ANDROID_HOME), en probeer opnieuw."); process.exit(1); }
if (!process.env.JAVA_HOME && spawnSync("java", ["-version"], { shell: win }).status !== 0) { console.error("Geen Java gevonden. Zet JAVA_HOME naar een JDK 21 (bv. die van Android Studio: <Android Studio>/jbr)."); process.exit(1); }

run("node", [join(native, "scripts", "copy-web.mjs")], native);
run("npx", ["cap", "sync", "android"], native);
run(win ? "gradlew.bat" : "./gradlew", ["assembleDebug"], android);
console.log("APK: " + join(android, "app", "build", "outputs", "apk", "debug", "app-debug.apk"));
