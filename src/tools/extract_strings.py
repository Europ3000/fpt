"""Collect every Dutch UI string from training-log.html (static HTML + JS literals/templates).
A real JS tokenizer: strings, templates (with nested ${...} code), comments and regex literals.
Template interpolations become {0}, {1}…; HTML tags split text into separate runs.
usage: py extract2.py training-log.html out.txt
"""
import re, sys, html as H

src = open(sys.argv[1], encoding="utf-8").read()
src = re.sub(r'<script id="i18n-data">.*?</script>', "", src, flags=re.S)
body = src[src.index("</style>"):]
si = body.index("<script>")
markup, js = body[:si], body[si + 8:body.rindex("</script>")]
runs = []

def add_run(t):
    t = re.sub(r"\s+", " ", H.unescape(t)).strip()
    if t: runs.append(t)

def split_markup(s):
    for m in re.finditer(r'(?:placeholder|aria-label|title|alt)="([^"]*)"', s): add_run(m.group(1))
    for part in re.sub(r"<[^>]*>", "\x01", s).split("\x01"): add_run(part)

split_markup(markup)

n = len(js)
REGEX_PREV = set("( , = : [ ! & | ? { } ; + - * % < > ~ ^".split()) | {"", "return", "typeof", "=>", "case", "in", "of", "delete", "void", "new"}

def read_string(i, q):
    out = []; i += 1
    while i < n and js[i] != q:
        if js[i] == "\\":
            out.append({"n": "\n", "t": "\t"}.get(js[i + 1], js[i + 1])); i += 2; continue
        out.append(js[i]); i += 1
    return "".join(out), i + 1

def read_template(i):
    out = []; i += 1
    while i < n and js[i] != "`":
        c = js[i]
        if c == "\\": out.append(js[i + 1]); i += 2; continue
        if c == "$" and js[i + 1] == "{":
            i = scan(i + 2, True); out.append("\x00"); continue
        out.append(c); i += 1
    return "".join(out), i + 1

def number_ph(part):
    k = [0]
    def r(_):
        v = "{%d}" % k[0]; k[0] += 1; return v
    return re.sub("\x00", r, part)

def handle_template(t):
    for m in re.finditer(r'(?:placeholder|aria-label|title|alt)="([^"]*)"', t): add_run(number_ph(m.group(1)))
    for part in re.sub(r"<[^>]*>", "\x01", t).split("\x01"): add_run(number_ph(part))

def handle_literal(s):
    if "<" in s and ">" in s: split_markup(s)
    else: add_run(s)

def scan(i, until_brace):
    """Tokenize code from i; if until_brace, stop after the unmatched '}' and return the index after it."""
    prev, depth = "", 0
    while i < n:
        c = js[i]
        if c == "/" and js[i + 1] == "/": i = js.index("\n", i); continue
        if c == "/" and js[i + 1] == "*": i = js.index("*/", i) + 2; continue
        if c in "\"'":
            s, i = read_string(i, c); handle_literal(s); prev = "x"; continue
        if c == "`":
            t, i = read_template(i); handle_template(t); prev = "x"; continue
        if c == "/" and prev in REGEX_PREV:
            i += 1; cls = False
            while i < n:
                ch = js[i]
                if ch == "\\": i += 2; continue
                if ch == "[": cls = True
                elif ch == "]": cls = False
                elif ch == "/" and not cls: break
                i += 1
            i += 1
            while i < n and js[i].isalpha(): i += 1
            prev = "x"; continue
        if c.isspace(): i += 1; continue
        if c.isalnum() or c in "_$":
            j = i
            while j < n and (js[j].isalnum() or js[j] in "_$."): j += 1
            word = js[i:j]; prev = word if word in REGEX_PREV else "x"; i = j; continue
        if c == "=" and js[i + 1] == ">": prev = "=>"; i += 2; continue
        if c == "{": depth += 1
        if c == "}":
            if until_brace and depth == 0: return i + 1
            depth -= 1
        prev = c if c not in ")]" else "x"
        i += 1
    return i

scan(0, False)

seen, out = set(), []
for t in runs:
    if t in seen or not re.search(r"[A-Za-zÀ-ÿ]{2}", t): continue
    seen.add(t); out.append(t)
with open(sys.argv[2], "w", encoding="utf-8") as f:
    for t in out: f.write(t + "\n")
print(len(out), "runs")
