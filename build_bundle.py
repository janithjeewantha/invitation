from pathlib import Path
import shutil, re, json, zipfile

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT.parent
(ROOT / 'music').mkdir(exist_ok=True)
shutil.copy2(SOURCE / 'music' / 'leberch-love-song-590429.mp3', ROOT / 'music' / 'leberch-love-song-590429.mp3')
for origin, target in [('invitation-concepts', 'designs'), ('animation-studies', 'animations')]:
    src, dst = SOURCE / origin, ROOT / target
    dst.mkdir(exist_ok=True)
    shutil.copytree(src / 'assets', dst / 'assets', dirs_exist_ok=True)
    for page in src.rglob('*.html'):
        if 'assets' in page.parts: continue
        out = dst / page.relative_to(src)
        out.parent.mkdir(parents=True, exist_ok=True)
        depth = len(out.relative_to(ROOT).parts) - 1
        prefix = '../' * depth
        nav = f'<nav class="review-nav" aria-label="Review collections"><a href="{prefix}index.html">Review home</a><a href="{prefix}designs/index.html"'+(' aria-current="page"' if target=='designs' else '')+f'>10 designs</a><a href="{prefix}animations/index.html"'+(' aria-current="page"' if target=='animations' else '')+'>25 animations</a></nav>'
        html = page.read_text(encoding='utf-8')
        html = html.replace('</head>', f'<meta name="robots" content="noindex, nofollow"><link rel="stylesheet" href="{prefix}review-nav.css"></head>')
        html = re.sub(r'(<body\b[^>]*>)', lambda m: m[0]+nav, html, count=1)
        html = html.replace('href="SOURCES.md"', 'href="notes.html"')
        if target == 'designs' and depth == 2:
            html = html.replace('</head>', f'<link rel="stylesheet" href="{prefix}music/music.css"><script defer src="{prefix}music/music.js"></script></head>')
        out.write_text(html, encoding='utf-8')

(ROOT / '.nojekyll').touch()
print('Bundled 10 designs and 25 animations.')
