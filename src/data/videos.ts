/**
 * 2026 年首届新春会的正片与官方发布物料。
 * 数据来源：B 站公开接口（2026-09-11 取数），标题、UP、时长、播放量均为实测值。
 * 节目单品清单见 `program.ts`。
 */

import { PROGRAM } from './program';

export type Video = {
  bvid: string;
  title: string;
  /** 展示用短标题，避免长标题撑破卡片 */
  display: string;
  author: string;
  authorMid: number;
  /** 秒 */
  duration: number;
  views: number;
  /** 发布日期 YYYY-MM-DD */
  published: string;
  cover: string;
  url: string;
  /** 节目类型归类，取自标题中的自述 */
  kind: string;
  note?: string;
  featured?: boolean;
};

const cdn = (bvid: string) => `/covers/${bvid}.jpg`;
const bili = (bvid: string) => `https://www.bilibili.com/video/${bvid}`;

/** 正片 */
export const FEATURE: Video = {
  bvid: 'BV1dGZMBbEUM',
  title: '【SCP基金会】2026中文分部新春会',
  display: '2026 中文分部新春会',
  author: 'FoundCeremony',
  authorMid: 3690997252884642,
  duration: 14351,
  views: 242623,
  published: '2026-02-16',
  cover: cdn('BV1dGZMBbEUM'),
  url: bili('BV1dGZMBbEUM'),
  kind: '正片',
  note: '2026 年除夕发布，全片 3 小时 59 分。',
  featured: true,
};

/** 官方发布的预告、征稿与特别环节 */
export const OFFICIAL: Video[] = [
  {
    bvid: 'BV1kCBXB7EAh',
    title: '第一届SCP新春会开始征稿！',
    display: '开始征稿',
    author: 'OxygenNineIsHere',
    authorMid: 159146024,
    duration: 70,
    views: 67151,
    published: '2025-12-25',
    cover: cdn('BV1kCBXB7EAh'),
    url: bili('BV1kCBXB7EAh'),
    kind: '征稿公告',
  },
  {
    bvid: 'BV1hXFUz3EGV',
    title: '第一届SCP新春会：「定档预告」',
    display: '定档预告',
    author: 'OxygenNineIsHere',
    authorMid: 159146024,
    duration: 76,
    views: 80213,
    published: '2026-02-10',
    cover: cdn('BV1hXFUz3EGV'),
    url: bili('BV1hXFUz3EGV'),
    kind: '定档预告',
  },
  {
    bvid: 'BV19ZfABjEsY',
    title: '【基金会新春会特别单品】新春贺词（纯享版）',
    display: '新春贺词（纯享版）',
    author: 'OxygenNineIsHere',
    authorMid: 159146024,
    duration: 759,
    views: 38891,
    published: '2026-02-22',
    cover: cdn('BV19ZfABjEsY'),
    url: bili('BV19ZfABjEsY'),
    kind: '特别环节',
    note: '新春贺词由主办方定向安排，不在公开投稿范围内——这里收录的是纯享剪辑版。',
  },
];

/** 归档统计 */
export const ARCHIVE_STATS = {
  featureDuration: FEATURE.duration,
  featureViews: FEATURE.views,
  /** 已归档单品总数：节目单单品（program.ts）＋ 特别环节（新春贺词） */
  pieceCount:
    PROGRAM.length + OFFICIAL.filter((v) => v.kind === '特别环节').length,
  fetchedAt: '2026-09-11',
} as const;
