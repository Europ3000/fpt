"""Build the Android app (Trusted Web Activity) for Google Play with PWABuilder's packaging service.
Only the public address of the app goes there. The zip (AAB for Play, APK for testing, the signing key and its
passwords) lands OUTSIDE the repo: never commit the key.
usage: py src/tools/android_package.py OUTDIR [versionName versionCode]
   e.g. py src/tools/android_package.py C:/Users/legok/OneDrive/Documents/FPT-store 1.0.0 1
For an update: raise versionCode and sign with the same key (signingMode "mine"; not handled here, use pwabuilder.com).
"""
import json, pathlib, sys, time, urllib.parse, urllib.request, uuid

SITE = "https://fptfit.app/"
SERVICE = "https://pwabuilder-cloudapk.azurewebsites.net"
out = pathlib.Path(sys.argv[1]); version = sys.argv[2] if len(sys.argv) > 2 else "1.0.0"; code = int(sys.argv[3]) if len(sys.argv) > 3 else 1
HEAD = {"content-type": "application/json", "platform-identifier": "PWABuilder", "platform-identifier-version": "1.0.0", "correlation-id": str(uuid.uuid4())}

def call(path, body=None, token=None, raw=False):
    h = dict(HEAD)
    if token: h["Authorization"] = "Bearer " + token
    req = urllib.request.Request(SERVICE + path, data=json.dumps(body).encode() if body is not None else None, headers=h, method="POST" if body is not None else "GET")
    with urllib.request.urlopen(req, timeout=120) as r:
        data = r.read()
    return data if raw else json.loads(data)

m = json.loads(urllib.request.urlopen(SITE + "manifest.webmanifest", timeout=30).read())
color = m["theme_color"]
options = {
    "appVersion": version, "appVersionCode": code,
    "backgroundColor": m["background_color"], "display": "standalone",
    "enableNotifications": False, "enableSiteSettingsShortcut": True, "fallbackType": "customtabs",
    "features": {"locationDelegation": {"enabled": False}, "playBilling": {"enabled": False}},
    "host": "fptfit.app", "iconUrl": SITE + "icon-512.png", "maskableIconUrl": SITE + "icon-maskable-512.png", "monochromeIconUrl": None,
    "includeSourceCode": False, "isChromeOSOnly": False, "isMetaQuest": False,
    "launcherName": m["short_name"], "name": m["name"],
    "navigationColor": color, "navigationColorDark": color, "navigationDividerColor": color, "navigationDividerColorDark": color,
    "orientation": "default", "packageId": "app.fptfit.twa", "shortcuts": [],
    # empty passwords: the service makes strong ones and puts them in the zip (signing-key-info.txt)
    "signing": {"file": None, "alias": "fpt", "fullName": "FPT Admin", "organization": "Fitness Progress Tracker", "organizationalUnit": "App", "countryCode": "BE", "keyPassword": "", "storePassword": ""},
    "signingMode": "new", "splashScreenFadeOutDuration": 300, "startUrl": "/",
    "themeColor": color, "themeColorDark": color,
    "webManifestUrl": SITE + "manifest.webmanifest", "pwaUrl": SITE, "fullScopeUrl": SITE, "minSdkVersion": 24,
}
receipt = call("/enqueuePackageJob", options)
job, token = receipt["id"], receipt["accessToken"]
print("job", job)
for _ in range(120):
    time.sleep(5)
    st = call("/getPackageJob?id=" + urllib.parse.quote(job), token=token)
    print(st["status"], end=" ", flush=True)
    if st["status"] in ("Completed", "Failed"): break
print()
if st["status"] != "Completed" or not st.get("downloadAvailable"):
    raise SystemExit("failed: " + "\n".join(st.get("errors") or st.get("logs", [])[-10:]))
out.mkdir(parents=True, exist_ok=True)
zip_path = out / f"fpt-android-{version}-{code}.zip"
zip_path.write_bytes(call("/downloadPackageZip?id=" + urllib.parse.quote(job), token=token, raw=True))
print("saved", zip_path, zip_path.stat().st_size // 1024, "KB")
