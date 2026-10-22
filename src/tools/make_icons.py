"""Round FPT badge: green disc, cream retro ring, white dumbbell + blue arrow, small red retro FPT.
usage: py logo2.py OUTDIR
writes fpt-round.png (transparent corners), fpt-maskable.png (full bleed, content in safe zone), fpt-apple.png
"""
import sys, math, pathlib
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageChops

OUT = pathlib.Path(sys.argv[1])
N = 1024; SS = 3; W = N * SS
GREEN_HI = (34, 197, 94); GREEN = (22, 163, 74); GREEN_LO = (20, 110, 52)
BLUE = (29, 78, 216, 255); WHITE = (255, 255, 255, 255); CREAM = (253, 243, 220, 255)
RED = (224, 49, 49, 255); DARKRED = (122, 24, 24, 255)
FONT = "C:/Windows/Fonts/COOPBL.TTF"


def disc_gradient(size, cx, cy, r):
    """Radial green: light near the upper left, deep at the rim; flat rim colour beyond r."""
    g = Image.new("RGB", (size // 8, size // 8))
    px = g.load(); s = size / 8
    hx, hy = cx - r * 0.35, cy - r * 0.45
    for y in range(g.height):
        for x in range(g.width):
            X, Y = (x + .5) * 8, (y + .5) * 8
            t = min(1, math.hypot(X - hx, Y - hy) / (r * 1.55))
            a, b = (GREEN_HI, GREEN) if t < .5 else (GREEN, GREEN_LO)
            u = t * 2 if t < .5 else (t - .5) * 2
            px[x, y] = tuple(round(a[i] + (b[i] - a[i]) * u) for i in range(3))
    return g.resize((size, size), Image.BICUBIC).convert("RGBA")


def badge(scale, full_bleed):
    """scale: badge radius as share of half the canvas. full_bleed: fill the square (maskable / iOS)."""
    cx = cy = W / 2; R = W / 2 * scale; u = R / 24          # 48-unit design grid inside the disc
    P = lambda x, y: (cx + (x - 24) * u, cy + (y - 24) * u)
    img = disc_gradient(W, cx, cy, R)
    if not full_bleed:
        m = Image.new("L", (W, W), 0); ImageDraw.Draw(m).ellipse([cx - R, cy - R, cx + R, cy + R], fill=255)
        img.putalpha(m)
    d = ImageDraw.Draw(img)
    # soft gloss on the top half
    gl = Image.new("L", (W, W), 0)
    ImageDraw.Draw(gl).ellipse([*P(5, -2), *P(43, 26)], fill=34)
    gl = gl.filter(ImageFilter.GaussianBlur(u * 3))
    if not full_bleed: gl = ImageChops.multiply(gl, img.getchannel("A"))
    img.alpha_composite(Image.merge("RGBA", (*[Image.new("L", (W, W), 255)] * 3, gl)))
    # cream retro ring
    d = ImageDraw.Draw(img)
    rr = 21.4 * u; lw = int(.75 * u)
    d.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], outline=CREAM, width=lw)

    # mark: dumbbell + arrow on a 48 grid, scaled K and lifted to make room for FPT
    K, MX, MY = .66, 24, 20.0
    Q = lambda x, y: P(MX + (x - 24) * K, MY + (y - 24) * K)
    mark = Image.new("RGBA", (W, W), (0, 0, 0, 0)); md = ImageDraw.Draw(mark)
    for (x, y, w, h, r) in [(11, 22, 26, 4, 2), (11, 14.5, 5.5, 19, 2), (31.5, 14.5, 5.5, 19, 2), (7, 18, 4, 12, 1.5), (37, 18, 4, 12, 1.5)]:
        x0, y0 = Q(x, y); x1, y1 = Q(x + w, y + h)
        md.rounded_rectangle([x0, y0, x1, y1], radius=r * K * u, fill=WHITE)
    mark = mark.rotate(-45, resample=Image.BICUBIC, center=Q(24, 24))
    md = ImageDraw.Draw(mark)

    def stroke(pts, width, col):
        w = int(width * K * u)
        for a, b in zip(pts, pts[1:]): md.line([Q(*a), Q(*b)], fill=col, width=w)
        for q in pts:
            x, y = Q(*q); md.ellipse([x - w / 2, y - w / 2, x + w / 2, y + w / 2], fill=col)
    # the arrow cuts through the dumbbell: erase a gap first, then the blue line
    gap = Image.new("L", (W, W), 0); gd = ImageDraw.Draw(gap)
    for a, b in [((9, 39), (40.5, 7.5)), ((33, 7), (41, 7)), ((41, 7), (41, 15))]:
        gd.line([Q(*a), Q(*b)], fill=255, width=int(5.2 * K * u))
    for q in [(9, 39), (33, 7), (41, 7), (41, 15)]:
        x, y = Q(*q); w = 5.2 * K * u; gd.ellipse([x - w / 2, y - w / 2, x + w / 2, y + w / 2], fill=255)
    mark.putalpha(ImageChops.subtract(mark.getchannel("A"), gap))
    md = ImageDraw.Draw(mark)
    stroke([(9, 39), (40.5, 7.5)], 2.6, BLUE); stroke([(33, 7), (41, 7), (41, 15)], 2.6, BLUE)
    # soft drop shadow under the mark for depth
    sh = mark.getchannel("A").filter(ImageFilter.GaussianBlur(u * .9)).point(lambda v: v * .32)
    shadow = Image.new("RGBA", (W, W), (8, 40, 20, 255)); shadow.putalpha(sh)
    img.alpha_composite(shadow, (int(u * .35), int(u * .7)))
    img.alpha_composite(mark)

    # small red retro FPT: cream outline, hard dark-red offset shadow (70s sticker)
    d = ImageDraw.Draw(img)
    font = ImageFont.truetype(FONT, int(7.4 * u))
    tx, ty = P(24, 36.6); off = .55 * u; so = int(.62 * u)
    d.text((tx + off, ty + off), "FPT", font=font, fill=DARKRED, anchor="mm", stroke_width=so, stroke_fill=DARKRED)
    d.text((tx, ty), "FPT", font=font, fill=RED, anchor="mm", stroke_width=so, stroke_fill=CREAM)
    return img.resize((N, N), Image.LANCZOS)


badge(1.0, False).save(OUT / "fpt-round.png")
badge(.80, True).save(OUT / "fpt-maskable.png")      # everything inside the 80% safe circle
badge(.94, True).save(OUT / "fpt-apple.png")         # iOS rounds the corners itself
print("ok")
