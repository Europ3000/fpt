"""Put the translations into training-log.html.
Translation files: i18n/*.tsv, one line per Dutch string:  dutch<TAB>en<TAB>fr<TAB>es<TAB>de<TAB>it<TAB>pt<TAB>ru<TAB>zh<TAB>ar<TAB>hi
An empty cell (or "=") keeps the Dutch/original text. Placeholders {0} {1} must survive in every language.
usage: py i18n_build.py training-log.html i18n_dir
"""
import sys, re, json, pathlib

page_path, d = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
LANGS = ["en", "fr", "es", "de", "it", "pt", "ru", "zh", "ar", "hi"]
rows, problems = {}, []
for f in sorted(d.glob("*.tsv")):
    for ln, line in enumerate(f.read_text(encoding="utf-8").splitlines(), 1):
        if not line.strip() or line.startswith("#"): continue
        cells = line.split("\t")
        if len(cells) != 1 + len(LANGS):
            problems.append(f"{f.name}:{ln}: {len(cells)} cells"); continue
        src, tr = cells[0], cells[1:]
        ph = sorted(re.findall(r"\{\d\}", src))
        for L, t in zip(LANGS, tr):
            if t and t != "=" and sorted(re.findall(r"\{\d\}", t)) != ph:
                problems.append(f"{f.name}:{ln}: placeholders differ in {L}: {t}")
        rows[src] = tr

src = list(rows)
data = {"langs": LANGS, "src": src}
for i, L in enumerate(LANGS):
    data[L] = [("" if rows[s][i] in ("", "=") else rows[s][i]) for s in src]
js = json.dumps(data, ensure_ascii=False, separators=(",", ":"))

page = page_path.read_text(encoding="utf-8")
a = page.index('<script id="i18n-data">'); b = page.index("</script>", a) + len("</script>")
page = page[:a] + '<script id="i18n-data">window.FPT_I18N = ' + js + ';</script>' + page[b:]
page_path.write_text(page, encoding="utf-8")

# coverage report against the extracted source list
want = [l.split("\t", 1)[1].rstrip("\n") for l in open(d / "src2.txt", encoding="utf-8")] if (d / "src2.txt").exists() else []
missing = [w for w in want if w not in rows]
print(f"{len(src)} strings × {len(LANGS)} languages, {len(js)//1024} KB; missing from tsv: {len(missing)}; problems: {len(problems)}")
for p in problems[:40]: print("  ", p)
if missing: (d / "missing.txt").write_text("\n".join(missing), encoding="utf-8")
