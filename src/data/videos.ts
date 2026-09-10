/**
 * 2026 年首届新春会的视频归档。
 * 数据来源：B 站公开接口（2026-09-10 取数），标题、UP、时长、播放量均为实测值。
 */

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

/**
 * 单品。收录标准：标题或简介中自行标注为「2026 新春会单品 / 节目」的作品。
 * 未自我标注的同期投稿一律不收录，宁可少收也不误收。
 */
export const PIECES: Video[] = [
  {
    bvid: 'BV1gaZyBpEDt',
    title: '那个基金会人[某会新春会单品]',
    display: '那个基金会人',
    author: 'Odeo_Offiziell',
    authorMid: 667922067,
    duration: 345,
    views: 10295,
    published: '2026-02-17',
    cover: cdn('BV1gaZyBpEDt'),
    url: bili('BV1gaZyBpEDt'),
    kind: '手书',
  },
  {
    bvid: 'BV1D3Z3BoEY2',
    title: '【基金会新春会单品/破晓之时/填词】世末歌者——今日 吾爱 融为一体',
    display: '世末歌者',
    author: '阿良阿砍_',
    authorMid: 0,
    duration: 320,
    views: 25436,
    published: '2026-02-17',
    cover: cdn('BV1D3Z3BoEY2'),
    url: bili('BV1D3Z3BoEY2'),
    kind: '填词',
    note: '取材自「破晓之时」设定线。',
  },
  {
    bvid: 'BV1mCZ5BaEQG',
    title: '该死的同行【2026*会新春会】',
    display: '该死的同行',
    author: '赤发黑羽',
    authorMid: 0,
    duration: 308,
    views: 9558,
    published: '2026-02-17',
    cover: cdn('BV1mCZ5BaEQG'),
    url: bili('BV1mCZ5BaEQG'),
    kind: '小剧场',
  },
  {
    bvid: 'BV1xNZ5BbEJ2',
    title: '基金会新春会小品单品：异常也要过大年',
    display: '异常也要过大年',
    author: '你亲爱的一只傻子',
    authorMid: 0,
    duration: 320,
    views: 3309,
    published: '2026-02-17',
    cover: cdn('BV1xNZ5BbEJ2'),
    url: bili('BV1xNZ5BbEJ2'),
    kind: '小剧场',
  },
  {
    bvid: 'BV15rZ3BTEBA',
    title: '一年没品新闻【2026基金会新春会单品】',
    display: '一年没品新闻',
    author: '神棍学者麦蒂文',
    authorMid: 0,
    duration: 376,
    views: 2120,
    published: '2026-02-17',
    cover: cdn('BV15rZ3BTEBA'),
    url: bili('BV15rZ3BTEBA'),
    kind: 'Memes',
  },
  {
    bvid: 'BV1fgZyBiEh7',
    title: '「新春会单品」莫收容',
    display: '莫收容',
    author: '一个路过的逆模因OvO',
    authorMid: 0,
    duration: 133,
    views: 481,
    published: '2026-02-17',
    cover: cdn('BV1fgZyBiEh7'),
    url: bili('BV1fgZyBiEh7'),
    kind: 'MAD / 混剪',
  },
  {
    bvid: 'BV1cDZyBgENx',
    title: '基金会新春会单品',
    display: '基金会新春会单品',
    author: 'MTF-TUA5',
    authorMid: 0,
    duration: 164,
    views: 196,
    published: '2026-02-17',
    cover: cdn('BV1cDZyBgENx'),
    url: bili('BV1cDZyBgENx'),
    kind: '其他',
    note: '作者自述为「基金会新春会众多节目之一」。',
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
    note: '由主办方定向安排，不在公开投稿范围内。',
  },
];

/** 归档统计 */
export const ARCHIVE_STATS = {
  featureDuration: FEATURE.duration,
  featureViews: FEATURE.views,
  pieceCount: PIECES.length,
  contributors: new Set(PIECES.map((p) => p.author)).size,
  fetchedAt: '2026-09-10',
} as const;
