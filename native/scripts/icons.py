"""App icons and splash screens of the native apps, from the same badge as the web app (src/icons/).
Run again after changing the logo:  py native/scripts/icons.py
Android: launcher icons (round badge; adaptive icon from the full-bleed one) and every splash.png.
iOS: the 1024 px app icon and the splash images. Existing files are replaced at their own size.
"""
import pathlib
from PIL import Image

HERE = pathlib.Path(__file__).resolve().parent
SRC = HERE.parent.parent / "src" / "icons"
RES = HERE.parent / "android" / "app" / "src" / "main" / "res"
IOS = HERE.parent / "ios" / "App" / "App" / "Assets.xcassets"
BG = (0xf3, 0xe8, 0xd2)   # background_color of the web manifest

round_logo = Image.open(SRC / "fpt-round.png").convert("RGBA")
maskable = Image.open(SRC / "fpt-maskable.png").convert("RGBA")
apple = Image.open(SRC / "fpt-apple.png").convert("RGB")
edge = maskable.getpixel((3, 3))[:3]   # the colour the full-bleed icon runs out to

# Launcher icons. Adaptive (Android 8+): 108 dp layer of which the launcher shows the middle 66 dp; a maskable web icon
# keeps its content in the middle 80 %, so it is drawn a little smaller on its own edge colour.
for dpi, px in [("mdpi", 48), ("hdpi", 72), ("xhdpi", 96), ("xxhdpi", 144), ("xxxhdpi", 192)]:
    d = RES / f"mipmap-{dpi}"
    icon = round_logo.resize((px, px), Image.LANCZOS)
    icon.save(d / "ic_launcher.png", optimize=True)
    icon.save(d / "ic_launcher_round.png", optimize=True)
    full = px * 108 // 48
    inner = round(full * 0.84)
    fg = Image.new("RGBA", (full, full), edge + (255,))
    fg.paste(maskable.resize((inner, inner), Image.LANCZOS), ((full - inner) // 2, (full - inner) // 2))
    fg.save(d / "ic_launcher_foreground.png", optimize=True)
(RES / "values" / "ic_launcher_background.xml").write_text(
    '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">#%02X%02X%02X</color>\n</resources>\n' % edge, encoding="utf-8")

def splash(path):
    w, h = Image.open(path).size
    im = Image.new("RGB", (w, h), BG)
    s = round(min(w, h) * 0.3)
    logo = round_logo.resize((s, s), Image.LANCZOS)
    im.paste(logo, ((w - s) // 2, (h - s) // 2), logo)
    im.save(path, optimize=True)

for p in sorted(RES.glob("drawable*/splash.png")): splash(p)
if IOS.exists():
    for p in sorted((IOS / "Splash.imageset").glob("*.png")): splash(p)
    for p in sorted((IOS / "AppIcon.appiconset").glob("*.png")):
        apple.resize(Image.open(p).size, Image.LANCZOS).save(p, optimize=True)
print("icons and splash screens written")
