# SCP 基金会中文分部 2027 新春会 · 官网

活动官网。2027 新春会筹备阶段上线，同时归档 2026 年首届新春会的正片与单品。

技术栈：**Astro 7**（静态输出）+ **@lucide/astro**（图标）+ 手写 CSS。

## 开发

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 输出到 dist/
npm run preview
```

> 预览用 `http://localhost:4321` 或 `http://127.0.0.1:4321` 都可以。
> 字体 CDN（ZeoSeven Fonts）会拒绝字面 IP 来源的请求并返回 204 空样式表，导致字体全部静默回退且控制台不报错。
> `BaseLayout.astro` 里已经用 `<meta name="referrer" content="no-referrer">` 把 Referer 去掉，两种主机名下表现一致。
> 如果改动 head 时删掉了这一行，`127.0.0.1` 下字体会掉回系统字体。

## 目录

```
src/
  assets/
    logos/         官方标识（SVG，颜色由 currentColor 控制）
    patterns/      pattern.monster 下载的重复纹样（同上）
  components/      Sidebar / Hero / PageHeader / Countdown / Timeline / VideoCard …
  data/            全部文案与数据，页面只负责排版
  layouts/         BaseLayout（head、侧栏、页脚、全局脚本）
  lib/             格式化工具
  pages/           / · /2026 · /2027 · /join · /announcement
  styles/          tokens.css + base.css + layout.css
public/
  covers/          2026 视频封面（正片与官方物料 880px，节目单缩略图 320px，共 842 KB）
  images/          2027 宣传 PV 封面（1920 / 960 两档）
  favicon.svg
```

## 内容维护

页面不写死文案，所有可变动内容都在 `src/data/`：

| 文件 | 内容 |
|---|---|
| `site.ts` | 站点元信息、导航、外部链接、**首播 / 报名 / 交稿时刻常量**、宣传 PV |
| `videos.ts` | 2026 正片与官方发布物料（4 条） |
| `program.ts` | **2026 完整节目单**（43 项）、未归档节目清单、主持人 |
| `announcements.ts` | 公告栏条目 |
| `schedule.ts` | 2027 时间轴节点与状态推导 |
| `team.ts` | 主办方分工、吉祥物、制作规模 |
| `submission.ts` | 报名流程、交付 / 内容 / 时长 / 质量要求、拒收情形 |

**节目单的两条约定：**

- 标题**逐字照搬 B 站原始标题**，不做清理。方括号里的「新春会单品」是作者自己加的标记。
- 排序由 `components/ProgramList.astro` 按播放量降序统一处理，**数据文件不维护顺序**，往数组里追加即可。

**发布新公告时需要改的几处：**

- 首播时刻：`src/data/site.ts` 的 `CEREMONY_PREMIERE`（当前按 20:00 预置，企划书只写定日期）
- 报名 / 交稿截止：`src/data/site.ts` 的 `REGISTRATION_DEADLINE` / `SUBMISSION_DEADLINE`
  （**两者是独立节点**：先登记报名，后交稿）
- 宣传 PV：`src/data/site.ts` 的 `PV`（BVID、封面路径、首播时刻）
- 时间轴节点：`src/data/schedule.ts` 的 `MILESTONES`；节点状态由 `statusOf()` 按当前日期自动推导，无需手改
- 观看地址：`src/pages/2027.astro` 顶部的 `slots` 数组，占位卡替换为真实链接即可

**数字不要手写。** 播放量、时长这类会变的值走 `src/lib/format.ts` 的 `views()` / `durationText()`，
散落在文案里的硬编码数字迟早和统计卡对不上。

## 数据来源

2026 相关视频的标题、UP、时长、发布日期与播放量均取自 B 站公开接口（`/x/web-interface/view`），取样时间 **2026-09-11**。
可跳转的节目清单以主办方人工过片的节目单为准，见 `src/data/program.ts`。

公告栏里的正式声明保留官方原话，不做改写；来源链接一律指向原始发布位置。
