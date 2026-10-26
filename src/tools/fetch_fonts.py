"""Download the Google Fonts the app uses into src/fonts/, so the app serves them itself.
Faster (no extra servers to reach), works offline from the first visit, and no visitor IP goes to Google.
Run once, or again when the font link in training-log.html changes:  py src/tools/fetch_fonts.py
build.py puts fonts/fonts.css into the page and copies the .woff2 files next to it.
"""
import hashlib, pathlib, re, urllib.request

SRC = pathlib.Path(__file__).resolve().parent.parent
OUT = SRC / "fonts"
page = (SRC / "training-log.html").read_text(encoding="utf-8")
url = re.search(r'<link rel="stylesheet" href="(https://fonts\.googleapis\.com/css2\?[^"]+)"', page).group(1).replace("&amp;", "&")
# A current Chrome gets woff2 with unicode-range subsets: the browser only loads the subsets a page shows.
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"
get = lambda u: urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": UA}), timeout=30).read()

css = get(url).decode("utf-8")
OUT.mkdir(exist_ok=True)
for old in OUT.glob("*.woff2"): old.unlink()
names = {}
def local(m):
    u = m.group(1)
    if u not in names:
        data = get(u)
        if not u.startswith("https://fonts.gstatic.com/") or data[:4] != b"wOF2": raise SystemExit("unexpected font file: " + u)
        family = re.sub(r"[^a-z0-9]+", "-", u.split("/s/")[1].split("/")[0])
        names[u] = f"{family}-{hashlib.sha256(data).hexdigest()[:10]}.woff2"
        (OUT / names[u]).write_bytes(data)
    return f"url(fonts/{names[u]})"
css = re.sub(r"url\((https://[^)]+)\)", local, css)
css = re.sub(r"/\*.*?\*/\s*", "", css)          # the subset comments
css = re.sub(r"\s*\n\s*", "", css).replace(": ", ":").replace("; ", ";")
(OUT / "fonts.css").write_text(css + "\n", encoding="utf-8")
print(len(names), "font files,", sum((OUT / n).stat().st_size for n in names.values()) // 1024, "KB in", OUT)
