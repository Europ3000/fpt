"""Play Store feature graphic (1024x500, PNG without alpha) + 512x512 store icon, written to src/store/.
usage: py src/tools/feature_graphic.py   (uses the round badge and the phone screenshots; the font is Cooper Black from Windows, else Arial Bold)
"""
import pathlib
from PIL import Image, ImageDraw, ImageFont
SRC = pathlib.Path(__file__).resolve().parent.parent
OUT = SRC / "store"; OUT.mkdir(exist_ok=True)
def font(size):
    for f in (r"C:\Windows\Fonts\COOPBL.TTF", r"C:\Windows\Fonts\arialbd.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"):
        try: return ImageFont.truetype(f, size)
        except OSError: pass
    return ImageFont.load_default()
W, H = 1024, 500
img = Image.new("RGB", (W, H), "#16a34a")
d = ImageDraw.Draw(img)
for y in range(H):  # soft vertical gradient
    t = y / H; d.line([(0, y), (W, y)], fill=(int(22 - 10 * t), int(163 - 45 * t), int(74 - 25 * t)))
badge = Image.open(SRC / "icons" / "fpt-round.png").convert("RGBA").resize((150, 150), Image.LANCZOS)
img.paste(badge, (64, 70), badge)
d.text((64, 245), "FPT", font=font(96), fill="white")
d.text((64, 355), "Gym-tracker", font=font(40), fill="#f3e8d2")
d.text((64, 415), "Schema's, gewicht en reps", font=font(26), fill="#d9f2e1")
x = 560
for i, n in enumerate(["screenshot-phone.png", "screenshot-phone-2.png"]):
    s = Image.open(SRC / "screenshots" / n).convert("RGB"); w = 250; s = s.resize((w, int(s.height * w / s.width)), Image.LANCZOS)
    y = 60 + i * 40; card = Image.new("RGB", (w + 8, s.height + 8), "#0b3d20"); card.paste(s, (4, 4)); img.paste(card, (x + i * 200, y))
img.save(OUT / "feature-graphic-1024x500.png", optimize=True)
Image.open(SRC / "icons" / "fpt-round.png").convert("RGBA").resize((512, 512), Image.LANCZOS).save(OUT / "store-icon-512.png", optimize=True)
print("wrote", OUT)
