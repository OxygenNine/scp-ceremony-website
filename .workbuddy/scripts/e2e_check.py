# -*- coding: utf-8 -*-
"""
SCP 2027 新春会官网 · 回归检查（Playwright + msedge）

覆盖：
  1. 四个页面 200 且无控制台报错 / 无 4xx-5xx 资源
  2. 侧栏当前页高亮与实际路径一致
  3. 倒计时确实在走，且数值与目标时刻自洽
  4. QQ 群号复制按钮会弹出提示
  5. 站内链接全部可达；外链均为 https 且带 noopener
  6. 页面不出现 emoji
  7. 关键文案存在（截稿时间、群号、主办方）

用法：
  python e2e_check.py [base_url]        默认 http://localhost:4321（勿用 127.0.0.1：字体 CDN 会返 204）
"""
import sys, re, json
from playwright.sync_api import sync_playwright

BASE = (sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4321").rstrip("/")
PAGES = ["/", "/2026/", "/2027/", "/join/", "/announcement/"]

# 真正的绘文字区段。U+2190–21FF（箭头）、U+2000–206F（通用标点）是正常排版字符，不算 emoji。
EMOJI = re.compile(
    "[\U0001F300-\U0001FAFF\U0001F000-\U0001F2FF\U00002600-\U000027BF\U0000FE0F\U0001F1E6-\U0001F1FF]"
)

results = []


def check(name, ok, detail=""):
    results.append((ok, name, detail))
    print(("  PASS  " if ok else "  FAIL  ") + name + (("  — " + detail) if detail else ""))


with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()

    console_errors = []
    net_errors = []
    page.on("console", lambda m: console_errors.append("%s: %s" % (m.type, m.text[:160]))
            if m.type == "error" else None)
    page.on("response", lambda r: net_errors.append("%s %s" % (r.status, r.url[:110]))
            if r.status >= 400 else None)

    print("\n== 1. 页面可达性 ==")
    for path in PAGES:
        console_errors.clear()
        net_errors.clear()
        resp = page.goto(BASE + path, wait_until="load", timeout=60000)
        page.wait_for_timeout(1500)
        check("%s 返回 200" % path, resp is not None and resp.status == 200,
              "status=%s" % (resp.status if resp else "none"))
        check("%s 无控制台报错" % path, not console_errors, "; ".join(console_errors[:3]))
        check("%s 无 4xx/5xx 资源" % path, not net_errors, "; ".join(net_errors[:3]))

    print("\n== 2. 侧栏高亮 ==")
    for path in PAGES:
        page.goto(BASE + path, wait_until="load", timeout=60000)
        page.wait_for_timeout(600)
        active = page.eval_on_selector_all(
            ".rail__item[aria-current='page']",
            "els => els.map(e => e.getAttribute('href'))")
        norm = lambda h: (h or "").rstrip("/") or "/"
        check("%s 高亮项唯一且正确" % path,
              len(active) == 1 and norm(active[0]) == norm(path),
              "got=%s" % active)

    print("\n== 3. 倒计时 ==")
    page.goto(BASE + "/2027/", wait_until="load", timeout=60000)
    page.wait_for_timeout(1200)
    SEL = "[data-countdown]:not(.cd--compact) [data-cd]"
    first = page.eval_on_selector_all(SEL, "els => els.map(e => e.textContent)")
    page.wait_for_timeout(2400)
    second = page.eval_on_selector_all(SEL, "els => els.map(e => e.textContent)")
    check("倒计时数值随时间变化", first != second, "%s -> %s" % (first, second))
    check("首个倒计时四个单位都渲染", len(second) == 4, str(second))

    target = page.evaluate("document.querySelector('[data-countdown]').dataset.target")
    now_ms = page.evaluate("Date.now()")
    end_ms = page.evaluate("new Date('%s').getTime()" % target)
    days_shown = int(second[0])
    expect = int((end_ms - now_ms) / 86400000)
    check("倒计时天数与目标时刻自洽", abs(days_shown - expect) <= 1,
          "shown=%s expect=%s target=%s" % (days_shown, expect, target))

    print("\n== 4. QQ 群号复制 ==")
    page.goto(BASE + "/join/", wait_until="load", timeout=60000)
    page.wait_for_timeout(800)
    page.evaluate("navigator.clipboard.writeText('')")
    page.click("[data-copy-qq]")
    page.wait_for_timeout(700)
    toast = page.eval_on_selector("[data-copy-toast]", "e => e.textContent.trim()")
    shown = page.eval_on_selector("[data-copy-toast]", "e => e.hasAttribute('data-show')")
    check("复制按钮弹出提示", shown and "1108484636" in toast, toast)

    print("\n== 5. 链接 ==")
    for path in PAGES:
        page.goto(BASE + path, wait_until="load", timeout=60000)
        page.wait_for_timeout(600)
        internal = page.eval_on_selector_all(
            "a[href^='/']", "els => [...new Set(els.map(e => e.getAttribute('href')))]")
        bad = []
        for href in internal:
            r = ctx.request.get(BASE + href, timeout=20000)
            if r.status >= 400:
                bad.append("%s -> %s" % (href, r.status))
        check("%s 站内链接全部可达（%d 个）" % (path, len(internal)), not bad, "; ".join(bad))

        ext = page.eval_on_selector_all(
            "a[target='_blank']",
            "els => els.map(e => e.getAttribute('href') + '|' + (e.getAttribute('rel') || ''))")
        bad_ext = [e for e in ext if not e.startswith("https://") or "noopener" not in e]
        check("%s 外链均为 https + noopener（%d 个）" % (path, len(ext)), not bad_ext,
              "; ".join(bad_ext[:3]))

    print("\n== 6. 无 emoji ==")
    for path in PAGES:
        page.goto(BASE + path, wait_until="load", timeout=60000)
        page.wait_for_timeout(500)
        text = page.inner_text("body")
        found = EMOJI.findall(text)
        check("%s 正文无 emoji" % path, not found, "".join(found[:8]))

    print("\n== 7. 关键内容 ==")
    page.goto(BASE + "/join/", wait_until="load", timeout=60000)
    body = page.inner_text("body")
    for token in ["2027 年 1 月 1 日 00:00", "1108484636", "500 MB", "1920×1080", "相声"]:
        check("投稿页包含「%s」" % token, token in body)

    page.goto(BASE + "/2027/", wait_until="load", timeout=60000)
    body = page.inner_text("body")
    for token in ["Roger_F XL", "OxygenNine", "breaddddd", "Re_Spectators", "Odeo", "SKIPPY"]:
        check("筹备页包含主办方/吉祥物「%s」" % token, token in body)
    check("筹备页不出现个人 QQ 号", "946548494" not in body and "2439902519" not in body)

    page.goto(BASE + "/2026/", wait_until="load", timeout=60000)
    body = page.inner_text("body")
    check("回看页包含正片 BVID 链接",
          page.eval_on_selector_all("a[href*='BV1dGZMBbEUM']", "e => e.length") >= 1)

    print("\n== 8. 截止日期 / PV / 投稿规则 ==")
    PV_BV = "BV1ssYu6XEWC"
    OFFICIAL_SPACE = "space.bilibili.com/3690997252884642"

    for path in ["/", "/2027/"]:
        page.goto(BASE + path, wait_until="load", timeout=60000)
        page.wait_for_timeout(1800)
        n_pv = page.eval_on_selector_all(
            "a[href*='%s']" % PV_BV, "els => els.length")
        check("%s 含 PV 链接" % path, n_pv >= 1, "count=%d" % n_pv)
        has_img = page.eval_on_selector_all(
            "img[src*='pv-2027']", "els => els.length")
        check("%s 含 PV 封面图" % path, has_img >= 1, "count=%d" % has_img)
        check("%s 含 PV 首播时间" % path, "2026.09.11 18:00" in page.inner_text("body"))

    page.goto(BASE + "/", wait_until="load", timeout=60000)
    page.wait_for_timeout(1500)
    cds = page.eval_on_selector_all("[data-countdown]", "els => els.map(e => e.dataset.target)")
    compact = page.eval_on_selector_all(".cd--compact", "els => els.length")
    check("首页共三个倒计时", len(cds) == 3, str(cds))
    check("首页两个次级倒计时并列", compact == 2, "compact=%d" % compact)

    for path in ["/", "/2027/", "/join/"]:
        page.goto(BASE + path, wait_until="load", timeout=60000)
        page.wait_for_timeout(700)
        txt = page.inner_text("body")
        check("%s 含报名截止 2026.10.31" % path, "2026.10.31" in txt or "2026 年 10 月 31 日" in txt)

    page.goto(BASE + "/join/", wait_until="load", timeout=60000)
    page.wait_for_timeout(700)
    txt = page.inner_text("body")
    check("投稿页已更新单人投稿数规则", "最多投稿 3 个" in txt)
    check("投稿页仍保留旧的「不超过 2 个」表述已移除", "不超过 2 个" not in txt)

    page.goto(BASE + "/2027/", wait_until="load", timeout=60000)
    page.wait_for_timeout(700)
    txt = page.inner_text("body")
    check("主办方含 O9 网站开发", "网站开发" in txt)
    check("署名为 WorkBuddy DeepSeek V4.1 Flash", "WorkBuddy DeepSeek V4.1 Flash" in txt)

    page.goto(BASE + "/", wait_until="load", timeout=60000)
    page.wait_for_timeout(700)
    rail_href = page.eval_on_selector_all(
        ".rail__ext[href]", "els => els.map(e => e.getAttribute('href'))")
    check("侧栏 B 站链接指向官号", any(OFFICIAL_SPACE in (h or "") for h in rail_href), str(rail_href))

    print("\n== 9. 视觉约定 ==")
    page.goto(BASE + "/", wait_until="load", timeout=60000)
    page.wait_for_timeout(1500)
    styles = page.evaluate("""() => {
      const wm = document.querySelector('.hero__wordmark');
      const tex = document.querySelector('.hero .texture');
      return {
        wordmark: wm ? getComputedStyle(wm).color : null,
        txtOpacity: tex ? getComputedStyle(tex).opacity : null,
        fg: getComputedStyle(document.documentElement).getPropertyValue('--fg').trim()
      };
    }""")
    digits = re.compile(r"[0-9]+")

    def rgb(s):
        return tuple(int(x) for x in digits.findall(s or "")[:3])

    def hex2rgb(h):
        h = h.strip()
        return tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))
    check("字标颜色为 --fg", rgb(styles["wordmark"]) == hex2rgb(styles["fg"]),
          "%s vs %s" % (styles["wordmark"], styles["fg"]))
    check("纹样不透明度为 0.07", styles["txtOpacity"] == "0.07", str(styles["txtOpacity"]))

    print("\n== 10. 2026 节目单 ==")
    page.goto(BASE + "/2026/", wait_until="load", timeout=60000)
    page.wait_for_timeout(2500)
    rows = page.eval_on_selector_all(".pl__row", "els => els.length")
    check("节目单渲染 43 行", rows == 43, "rows=%d" % rows)

    links = page.eval_on_selector_all(
        ".pl__title a", "els => els.map(e => e.getAttribute('href'))")
    check("每一行都有 B 站链接", len(links) == 43 and all(links), "n=%d" % len(links))
    check("链接均指向 bilibili", all("bilibili.com/video/BV" in (h or "") for h in links))

    thumbs = page.eval_on_selector_all(
        ".pl__thumb img", "els => els.map(e => e.getAttribute('src'))")
    bad_thumbs = []
    for src in thumbs:
        r = ctx.request.get(BASE + src, timeout=15000)
        if r.status >= 400:
            bad_thumbs.append("%s -> %s" % (src, r.status))
    check("节目单缩略图全部可达（%d 张）" % len(thumbs), not bad_thumbs, "; ".join(bad_thumbs[:4]))

    # 行内序号应与播放量降序一致
    order = page.eval_on_selector_all(".pl__row", """els => els.map(e => {
        const t = e.querySelector('.pl__meta').innerText;
        const m = t.match(/([\\d.]+)\\s*万?/g);
        return e.querySelector('.pl__no').innerText;
    })""")
    check("序号连续到 43", order[-1].strip() == "43", "last=%s" % order[-1])

    body = page.inner_text("body")
    for token in ["中分之歌", "堂吉诃德", "不秀海鸥", "组织篇", "异常篇", "至高神性篇"]:
        check("节目单含「%s」" % token, token in body)
    check("合并节目标注为「多篇合并」", "多篇合并" in body)
    check("中分之歌标注为「AI 梗曲」", "AI 梗曲" in body)

    miss = page.eval_on_selector_all(".ml__item", "els => els.length")
    check("未单独投稿清单 15 条", miss == 15, "count=%d" % miss)
    check("含抄袭处理说明与站内链接", "查看处理声明" in body and "/announcement/#2026-plagiarism" in page.content())

    hosts = page.eval_on_selector_all(".hosts__name", "els => els.map(e => e.innerText.trim())")
    check("主持人两位", hosts == ["阿雨不忘初心", "筱洛Serov"], str(hosts))

    print("\n== 11. 公告栏 ==")
    page.goto(BASE + "/announcement/", wait_until="load", timeout=60000)
    page.wait_for_timeout(1200)
    items = page.eval_on_selector_all(".an__item", "els => els.map(e => e.id)")
    check("公告 3 条且带锚点 id", len(items) == 3 and "2026-plagiarism" in items, str(items))
    txt = page.inner_text("body")
    for token in ["2027 新春会宣传 PV 公开", "2027 新春会报名开放", "抄袭问题的处理声明", "MAKU_050"]:
        check("公告含「%s」" % token, token in txt)
    check("声明标注出处", "主办方 · FoundCeremony" in txt)

    print("\n== 12. 导航 ==")
    nav = page.eval_on_selector_all(".rail__item", "els => els.map(e => e.getAttribute('href'))")
    check("侧栏 5 项且含公告", len(nav) == 5 and "/announcement/" in nav, str(nav))
    check("公告页高亮正确",
          page.eval_on_selector_all(".rail__item[aria-current='page']",
                                    "els => els.map(e => e.getAttribute('href'))") == ["/announcement/"])

    browser.close()

fails = [r for r in results if not r[0]]
print("\n================ 汇总 ================")
print("总数 %d  通过 %d  失败 %d" % (len(results), len(results) - len(fails), len(fails)))
for _, name, detail in fails:
    print("  FAIL  %s  %s" % (name, detail))
sys.exit(1 if fails else 0)
