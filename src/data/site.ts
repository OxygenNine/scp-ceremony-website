/**
 * 站点级常量与外部链接。
 * 注意：企划书中的个人 QQ 号一律不外露，联系入口统一收敛到官方 QQ 群与 B 站账号。
 */

export const SITE = {
  title: 'SCP基金会中文分部 2027 新春会',
  shortTitle: '2027 新春会',
  description:
    'SCP 基金会中文分部新春会官方网站。2027 新春会正在筹备，投稿自 2026 年 9 月 11 日起开放；同时可回看 2026 年首届新春会的正片与单品。',
  org: 'SCP基金会中文分部',
  edition: '第二届',
  year: '2027',
  locale: 'zh-CN',
} as const;

/** 2027 新春会发布时刻。企划书只写定「2027 年 2 月 5 日」，具体时刻未敲定——此处按 20:00 预置，届时以官方公告为准。 */
export const CEREMONY_PREMIERE = '2027-02-05T20:00:00+08:00';

/** 报名截止：先报名登记，后交稿，是两个不同的截止点。 */
export const REGISTRATION_DEADLINE = '2026-10-31T23:59:00+08:00';

/** 2027 交稿截止时刻，企划书明确写死。 */
export const SUBMISSION_DEADLINE = '2027-01-01T00:00:00+08:00';

/** 上一届（2026）正片首播日期。 */
export const EDITION_2026_RELEASE = '2026-02-16';

/** 2027 新春会宣传 PV。 */
export const PV = {
  bvid: 'BV1ssYu6XEWC',
  url: 'https://www.bilibili.com/video/BV1ssYu6XEWC/',
  title: '2027 新春会宣传 PV',
  cover: '/images/pv-2027.jpg',
  coverSmall: '/images/pv-2027-960.jpg',
  /** 首播时刻 */
  publishedAt: '2026-09-11T18:00:00+08:00',
  /** 展示用 */
  publishedLabel: '2026.09.11 18:00',
} as const;

export const LINKS = {
  /** 2026 新春会正片（B 站） */
  ceremony2026: 'https://www.bilibili.com/video/BV1dGZMBbEUM',
  /** 2027 新春会 QQ 群（群号即入口，不做跳转链接，避免伪造加群 URL） */
  qqGroup: '1108484636',
  bilibili: {
    /** 新春会官号：正片与官方物料发布账号 */
    official: { name: 'FoundCeremony', url: 'https://space.bilibili.com/3690997252884642' },
    /** 主办方成员个人账号 */
    oxygenNine: { name: 'OxygenNineIsHere', url: 'https://space.bilibili.com/159146024' },
  },
} as const;

export type NavItem = {
  href: string;
  label: string;
  /** 侧栏副标签（拉丁字母，做小字用） */
  kicker: string;
  icon: string;
  summary: string;
};

export const NAV: NavItem[] = [
  {
    href: '/',
    label: '首页',
    kicker: 'Index',
    icon: 'house',
    summary: '新春会简介与本届概览',
  },
  {
    href: '/2026/',
    label: '2026 回看',
    kicker: 'Archive',
    icon: 'archive',
    summary: '首届正片、预告与单品归档',
  },
  {
    href: '/2027/',
    label: '2027 筹备',
    kicker: 'In Progress',
    icon: 'hourglass',
    summary: '倒计时、时间轴与主办方',
  },
  {
    href: '/join/',
    label: '投稿参与',
    kicker: 'Submission',
    icon: 'file-pen',
    summary: '报名方式与投稿要求',
  },
  {
    href: '/announcement/',
    label: '公告',
    kicker: 'Notice',
    icon: 'megaphone',
    summary: '活动节点、事务通知与正式声明',
  },
];
