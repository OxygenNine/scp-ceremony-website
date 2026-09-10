# -*- coding: utf-8 -*-
"""Viewport-by-viewport screenshots + console/network error report."""
import sys, os, json
from playwright.sync_api import sync_playwright

url = sys.argv[1]
prefix = sys.argv[2]
width = int(sys.argv[3]) if len(sys.argv) > 3 else 1440
height = int(sys.argv[4]) if len(sys.argv) > 4 else 900

os.makedirs(os.path.dirname(prefix) or '.', exist_ok=True)

with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    ctx = b.new_context(viewport={"width": width, "height": height}, device_scale_factor=1)
    pg = ctx.new_page()
    console = []
    failed = []
    pg.on("console", lambda m: console.append("%s: %s" % (m.type, m.text[:200])) if m.type in ("error", "warning") else None)
    pg.on("requestfailed", lambda r: failed.append("%s %s" % (r.url[:120], r.failure)))
    pg.on("response", lambda r: failed.append("HTTP %s %s" % (r.status, r.url[:120])) if r.status >= 400 else None)
    pg.goto(url, wait_until="load", timeout=60000)
    pg.wait_for_timeout(2200)
    # scroll through so lazy images load
    h = pg.evaluate("document.body.scrollHeight")
    y = 0
    while y < h:
        pg.evaluate("window.scrollTo(0, %d)" % y)
        pg.wait_for_timeout(280)
        y += height
        h = pg.evaluate("document.body.scrollHeight")
    pg.evaluate("window.scrollTo(0,0)")
    pg.wait_for_timeout(600)

    total = pg.evaluate("document.body.scrollHeight")
    pages = (total + height - 1) // height
    for i in range(pages):
        pg.evaluate("window.scrollTo(0, %d)" % (i * height))
        pg.wait_for_timeout(420)
        pg.screenshot(path="%s-%02d.png" % (prefix, i))
    print("SHOTS", pages, "height", total)
    print("CONSOLE", json.dumps(console[:15], ensure_ascii=False, indent=1))
    print("FAILED", json.dumps(sorted(set(failed))[:15], ensure_ascii=False, indent=1))
    b.close()
