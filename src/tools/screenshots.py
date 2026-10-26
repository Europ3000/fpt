"""Screenshots of the app with demo data, for the install window (manifest) and the app stores.
Uses Edge or Chrome without a window (DevTools protocol); no extra Python packages needed.
Run after py src/build.py:  py src/tools/screenshots.py   (writes src/screenshots/*.png; build again afterwards)
The demo data only lives in a temporary browser profile: 6 weeks of Push / Pull / Legs, body weight, a profile.
"""
import base64, functools, http.server, json, os, pathlib, shutil, socket, struct, subprocess, tempfile, threading, time, urllib.request

SRC = pathlib.Path(__file__).resolve().parent.parent
SITE, OUT = SRC.parent, SRC / "screenshots"
BROWSERS = [r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe", r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
            r"C:\Program Files\Google\Chrome\Application\chrome.exe", "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"]
# name, css width, height, scale, page:  phones 1080x1920 (9:16), PC 1920x1080 (16:9)
SHOTS = [("screenshot-phone.png", 360, 640, 3, "today"), ("screenshot-phone-2.png", 360, 640, 3, "train"),
         ("screenshot-phone-3.png", 360, 640, 3, "stats"), ("screenshot-wide.png", 1280, 720, 1.5, "stats"),
         ("screenshot-wide-2.png", 1280, 720, 1.5, "train")]

DEMO = r"""(() => {
  const s = SCHEMES.find(x => x.id === "ppl");
  const start = { "Bench Press": 70, "Overhead Press": 42.5, "Incline Dumbbell Press": 24, "Dips": 0, "Lateral Raise": 10, "Overhead Triceps Extension": 22.5,
    "Deadlift": 120, "Lat Pulldown": 60, "Seated Cable Row": 57.5, "Face Pull": 20, "Barbell Curl": 30, "Hammer Curl": 14, "Back Squat": 95,
    "Romanian Deadlift": 80, "Leg Press": 160, "Leg Curl": 40, "Walking Lunge": 16, "Standing Calf Raise": 60 };
  const iso = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const L = {}, R = {}; let n = 0;
  for (let i = 43; i >= 1; i--){
    const d = new Date(); d.setHours(18, 5, 0, 0); d.setDate(d.getDate() - i);
    if (![0, 2, 4, 5].includes((d.getDay() + 6) % 7)) continue;
    const day = s.days[n++ % 3], wk = Math.floor((43 - i) / 7), date = iso(d), ex = {};
    day.ex.forEach((e, o) => {
      const name = e[0], base = start[name] || 0, w = base ? Math.round(base * (1 + wk * 0.025) / 2.5) * 2.5 : 0, reps = parseInt(e[2]) || 10, sets = [];
      for (let j = 0; j < +e[1]; j++){ d.setMinutes(d.getMinutes() + 3); sets.push({ w, t: d.toISOString(), r: reps + (j === 0 ? 2 : j === +e[1] - 1 ? 0 : 1) }); }
      const k = keyOf(name); ex[k] = { name, order: o, sets };
      R[k] = { best: Math.max((R[k] || {}).best || 0, w), last: w, date: sets[sets.length - 1].t };
    });
    L[date] = { date, days: ["Push / Pull / Legs · " + day.name], ex };
  }
  const body = {}; for (let i = 42, kg = 82.4; i >= 0; i -= 7, kg -= 0.35){ const d = new Date(); d.setDate(d.getDate() - i); body[iso(d)] = Math.round(kg * 10) / 10; }
  const P = Object.assign({}, prefs, { body, daysPerWeek: 4, planDays: [0, 2, 4, 5], sex: "man", profile: { birth: "1994-05-12", height: 180 }, lang: "nl", savedAt: Date.now() });
  localStorage.setItem("ppl.log", JSON.stringify(L)); localStorage.setItem("ppl.records", JSON.stringify(R)); localStorage.setItem("ppl.prefs", JSON.stringify(P));
  localStorage.setItem("ppl.welcomed", "true"); localStorage.setItem("ppl.lang", '"nl"'); localStorage.setItem("ppl.style", '"plain"'); localStorage.setItem("ppl.theme", '"light"');
  return Object.keys(L).length;
})()"""

class WS:
    """Just enough WebSocket (RFC 6455) for the DevTools protocol: text frames, client-side masking."""
    def __init__(self, url):
        hostport, path = url[len("ws://"):].split("/", 1)
        host, port = hostport.split(":")
        self.s = socket.create_connection((host, int(port)), timeout=60)
        key = base64.b64encode(os.urandom(16)).decode()
        self.s.sendall(f"GET /{path} HTTP/1.1\r\nHost: {hostport}\r\nUpgrade: websocket\r\nConnection: Upgrade\r\n"
                       f"Sec-WebSocket-Key: {key}\r\nSec-WebSocket-Version: 13\r\n\r\n".encode())
        self.buf = bytearray()
        while b"\r\n\r\n" not in self.buf: self.buf += self.s.recv(4096)
        head, _, rest = bytes(self.buf).partition(b"\r\n\r\n")
        if b" 101 " not in head.split(b"\r\n")[0]: raise SystemExit("no websocket: " + head.decode(errors="replace"))
        self.buf, self.n = bytearray(rest), 0
    def _read(self, n):
        while len(self.buf) < n:
            chunk = self.s.recv(1 << 20)
            if not chunk: raise SystemExit("browser closed the connection")
            self.buf += chunk
        out = bytes(self.buf[:n]); del self.buf[:n]; return out
    def send(self, text):
        data, mask = text.encode(), os.urandom(4)
        n = len(data)
        head = bytes([0x81]) + (bytes([0x80 | n]) if n < 126 else bytes([0x80 | 126]) + struct.pack(">H", n) if n < 65536 else bytes([0x80 | 127]) + struct.pack(">Q", n))
        self.s.sendall(head + mask + bytes(b ^ mask[i % 4] for i, b in enumerate(data)))
    def recv(self):
        msg = bytearray()
        while True:
            b0, b1 = self._read(2)
            n = b1 & 127
            if n == 126: n = struct.unpack(">H", self._read(2))[0]
            elif n == 127: n = struct.unpack(">Q", self._read(8))[0]
            mask = self._read(4) if b1 & 128 else None
            data = self._read(n)
            if mask: data = bytes(b ^ mask[i % 4] for i, b in enumerate(data))
            if b0 & 15 == 8: raise SystemExit("browser closed the connection")
            if b0 & 15 in (9, 10): continue
            msg += data
            if b0 & 128: return msg.decode("utf-8")
    def call(self, method, **params):
        self.n += 1
        self.send(json.dumps({"id": self.n, "method": method, "params": params}))
        while True:
            m = json.loads(self.recv())
            if m.get("id") == self.n:
                if "error" in m: raise SystemExit(f"{method}: {m['error']}")
                return m.get("result", {})

def run():
    browser = next((b for b in BROWSERS if os.path.exists(b)), None)
    if not browser: raise SystemExit("Edge or Chrome not found")
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
        def handle(self):
            try: super().handle()
            except ConnectionResetError: pass   # the browser closing a spare connection
    handler = functools.partial(Quiet, directory=str(SITE))
    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    url = f"http://127.0.0.1:{server.server_address[1]}/"
    profile = tempfile.mkdtemp(prefix="fpt-shots-")
    with socket.socket() as s: s.bind(("127.0.0.1", 0)); port = s.getsockname()[1]
    proc = subprocess.Popen([browser, "--headless=new", f"--remote-debugging-port={port}", f"--user-data-dir={profile}", "--no-first-run",
                             "--no-default-browser-check", "--hide-scrollbars", "--lang=nl", "about:blank"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        for _ in range(100):
            try:
                pages = [t for t in json.load(urllib.request.urlopen(f"http://127.0.0.1:{port}/json/list")) if t["type"] == "page"]
                if pages: break
            except OSError: pass
            time.sleep(0.2)
        ws = WS(pages[0]["webSocketDebuggerUrl"])
        js = lambda expr: ws.call("Runtime.evaluate", expression=expr, awaitPromise=True, returnByValue=True).get("result", {}).get("value")
        def load(w, h, scale):
            ws.call("Emulation.setDeviceMetricsOverride", width=w, height=h, deviceScaleFactor=scale, mobile=w < 600)
            ws.call("Page.navigate", url=url)
            for _ in range(100):
                if js("typeof SCHEMES !== 'undefined' && document.readyState === 'complete'"): break
                time.sleep(0.1)
            js("document.fonts.ready.then(() => new Promise(r => setTimeout(r, 600)))")
        load(360, 640, 1)
        print("demo trainings:", js(DEMO))
        OUT.mkdir(exist_ok=True)
        for name, w, h, scale, page in SHOTS:
            load(w, h, scale)
            js(f"""(async () => {{ document.getElementById({json.dumps('view' + page.capitalize())}).click(); window.scrollTo(0, 0);
                 document.getElementById("toast").classList.remove("show"); await new Promise(r => setTimeout(r, 900)); }})()""")
            png = base64.b64decode(ws.call("Page.captureScreenshot", format="png")["data"])
            (OUT / name).write_bytes(png)
            print(name, f"{int(w * scale)}x{int(h * scale)}")
    finally:
        proc.terminate()
        try: proc.wait(10)
        except subprocess.TimeoutExpired: proc.kill()
        server.shutdown()
        shutil.rmtree(profile, ignore_errors=True)

if __name__ == "__main__":
    run()
