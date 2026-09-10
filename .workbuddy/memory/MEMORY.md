# MEMORY.md — SCP 2027 新春会官网

跨会话的长期项目约定。日常记录见同目录 `YYYY-MM-DD.md`。

## 项目性质

SCP 基金会中文分部 2027 新春会的活动官网，同时归档 2026 首届。主办方成员之一（OxygenNine）本人维护。**上线时间在 Logo 投票结束后**，届时主视觉会手动替换。

## 硬约定

1. **文案唯一来源是 `src/data/*.ts`**，页面只负责排版。改内容不要动 `.astro`。
2. **未定案的内部事项一律不写进站点**（审核组名单、致辞嘉宾名单、主线故事、大合唱曲目、互动环节方案、直播可行性预案）。只以「仍在筹备中」列名称，不描述方案。
3. **个人 QQ 号不外露**。联系入口只走 QQ 群（1108484636）+ B 站**官号**（@FoundCeremony）。侧栏与页脚里的 B 站入口指向官号，不是个人号。
4. **两个截止点是分开的**：报名登记截止 2026-10-31 23:59，作品交稿截止 2027-01-01 00:00。写文案时别把两者混成一个「截稿」。
5. **单人投稿上限 3 个、不限类型**（2026-09-10 修订，旧的「最多 2 个且同类型 1 个」已作废）。但某类型作品过多时，即使质量都很高也可能不会全部通过。
6. **2026 单品的收录标准**：以主办方人工过片的节目单为准（现存 41 个单品 + 2 个多视频节目，见 `src/data/program.ts`）。**标题逐字照搬 B 站原文，不删改**——方括号里的「新春会单品」是作者自己加的标记，不要"顺手清理"。
7. **不自己画 SVG**。图形一律用主办方提供的官方标识文件（原件备份在 `.workbuddy/source-assets/`）或公共素材站下载物。
8. **数据一律用计算值，不手写数字**。播放量、时长这类会变的数走 `src/lib/format.ts` 的 `views()` / `durationText()`，硬编码过两次都对不上。
9. **字体 CDN 的 Referer 已在代码层解掉**：ZeoSeven 会对字面 IP 来源返回 204 空样式表（字体静默回退、控制台无报错）。`BaseLayout.astro` 里的 `<meta name="referrer" content="no-referrer">` 负责去掉 Referer，改动 head 时别删。排查字体问题时先看这条，别怀疑沙箱。
10. **站内 5 页**：`/` `/2026` `/2027` `/join` `/announcement`。公告统一进 `/announcement`（数据在 `src/data/announcements.ts`），不要散落到其它页。
11. 浏览器自动化核验走 msedge（Playwright `channel="msedge"`），回归脚本在 `.workbuddy/scripts/e2e_check.py`，改完页面要跑一遍。截图脚本 `.workbuddy/scripts/pageshot.py`。
12. **B 站部分接口会被风控**：`x/space/acc/info`（用户资料）与 `x/polymer/web-dynamic/v1/detail`（动态正文）即使带 buvid3 也常返 -799 / -352。这类取数改用 Playwright 打开页面读文本，别死磕接口。

## 设计系统

墨红底 + 极细金线，金只用在结构线与标记上，不做大面积填充。禁用：emoji、滥用渐变、transform+hover 花活、大圆角（上限 3px）、多层圆角矩形嵌套、磁带未来主义。

- 令牌全部在 `src/styles/tokens.css`，改配色只动这一个文件
- 标题字体得意黑（窄斜，`Smiley Sans Oblique`），正文思源黑体（`Noto Sans CJK`）
- 布局：88px 窄图标侧栏 + 主体，≤960px 降级为顶栏 + 底部标签栏
- 每个页头带一层 3.5% 不透明度的重复纹样做肌理（2026 用麻叶 / 2027 用六边形 / 投稿用青海波）

## 数据来源

2026 相关视频的标题、UP、时长、发布日期、播放量均取自 B 站公开接口（`/x/web-interface/search/type` 与 `/x/web-interface/view`），**取样时间 2026-09-10**。要更新数据需重新拉取，不能凭印象改。

## 关键常量位置

| 要改的东西 | 改哪里 |
|---|---|
| 首播时刻 | `src/data/site.ts` → `CEREMONY_PREMIERE`（现按 20:00 预置，企划书只写定日期） |
| 报名 / 交稿截止 | `src/data/site.ts` → `REGISTRATION_DEADLINE` / `SUBMISSION_DEADLINE` |
| 宣传 PV | `src/data/site.ts` → `PV`（BVID、封面、首播时刻） |
| 时间轴节点 | `src/data/schedule.ts` → `MILESTONES`；状态由 `statusOf()` 自动推导，勿手改 |
| 观看地址占位 | `src/pages/2027.astro` 顶部的 `slots` 数组 |
