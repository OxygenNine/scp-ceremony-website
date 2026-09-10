/**
 * 公告栏。
 * 只放主办方已公开发布过的事件与声明；文案以官方原话为准，不代为解释。
 */

export type Announcement = {
  id: string;
  /** 发布日 */
  date: string;
  /** 展示用日期 */
  label: string;
  /** 分类：event 活动节点 / notice 事务通知 / statement 正式声明 */
  kind: 'event' | 'notice' | 'statement';
  title: string;
  /** 出自哪一方，声明类必填 */
  source?: string;
  body: string[];
  links?: { label: string; url: string; external?: boolean }[];
  /** 置顶 */
  pinned?: boolean;
};

const KIND_LABEL: Record<Announcement['kind'], string> = {
  event: '活动节点',
  notice: '事务通知',
  statement: '正式声明',
};

export { KIND_LABEL };

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: '2027-pv',
    date: '2026-09-11',
    label: '2026.09.11',
    kind: 'event',
    title: '2027 新春会宣传 PV 公开',
    body: [
      '2027 新春会宣传 PV 已于 2026 年 9 月 11 日 18:00 在 B 站公开。',
      '本活动官网同步上线，包含本届筹备进度、投稿要求与 2026 首届的完整节目单归档。',
    ],
    links: [
      { label: '在 B 站观看 PV', url: 'https://www.bilibili.com/video/BV1ssYu6XEWC/', external: true },
    ],
    pinned: true,
  },
  {
    id: '2027-signup',
    date: '2026-09-11',
    label: '2026.09.11',
    kind: 'notice',
    title: '2027 新春会报名开放',
    body: [
      '2027 新春会 QQ 群与共创表格已于 2026 年 9 月 11 日开放。报名与作品交付均在群内进行。',
      '报名截止 2026 年 10 月 31 日 23:59，作品交稿截止 2027 年 1 月 1 日 00:00。这是两个独立的截止点——先登记，后交稿。',
      '本届计划收录约 30 ~ 35 个节目（不含开场混剪与新春贺词）。',
    ],
    links: [{ label: '查看投稿要求', url: '/join/' }],
    pinned: true,
  },
  {
    id: '2026-plagiarism',
    date: '2026-02-17',
    label: '2026.02.17',
    kind: 'statement',
    title: '关于《机动特遣队·乡里愚人×为什么》抄袭问题的处理声明',
    source: '主办方 · FoundCeremony',
    body: [
      '经核实，江山行于舟（UID：3493132102535947）在新春会投稿的视频《机动特遣队·乡里愚人×为什么》抄袭自音符 MAKU（音符号：MAKU.050，B 站 MAKU_050）发布的视频。',
      '考虑到目前已经产生的曝光，我们决定将该节目的作者修改为 MAKU_050，并在此后的新春会中不再接受江山行于舟的投稿。',
      '基金会社区一向尊重原创，对抄袭现象保持零容忍态度，还请各位引以为戒。',
      '视频将在不久后换源，一并修复其它剪辑失误。欢迎私信反馈其它节目可能的原创性问题。',
    ],
    links: [
      {
        label: '查看原公告（B 站动态）',
        url: 'https://www.bilibili.com/opus/1170245315383525417',
        external: true,
      },
    ],
  },
];
