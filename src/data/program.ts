/**
 * 2026 首届新春会节目单。
 *
 * 收录范围：主办方人工过片后确认的全部单品（41 个），其标题、作者、时长、播放量、
 * 发布日期均取自 B 站公开接口，取样时间 2026-09-11。
 * 标题逐字照搬 B 站原始标题，未做删改——方括号里的「新春会单品」等标记是作者自己加的。
 *
 * 排序：按 B 站播放量降序。这只是方便浏览，不代表节目评价或正片顺序。
 */

const BILI = 'https://www.bilibili.com/video/';

/** 封面统一按 id 从 public/covers 取 */
export const coverOf = (id: string) => `/covers/${id}.jpg`;

export type ProgramItem = {
  id: string;
  /** B 站原始标题，逐字照搬 */
  title: string;
  author: string;
  /** 秒 */
  duration: number;
  views: number;
  published: string;
  url: string;
  /** 一个节目对应多个视频时（合并收录、多版本），除 url 之外的其余链接 */
  extraLinks?: { label: string; url: string }[];
  /** 需要说明的情况 */
  note?: string;
  /** 状态标记 */
  flag?: 'collective' | 'ai';
  /** 参与作者（合并收录的节目不止一人） */
  contributors?: string[];
};

export const PROGRAM: ProgramItem[] = [
  {
    id: 'BV1TCZ5BYEpJ',
    title: '【MC动画】Eve.AIC的I Can\'t Wait（新春会单品）',
    author: 'OxygenNineIsHere',
    duration: 96,
    views: 115572,
    published: '2026-02-17',
    url: BILI + 'BV1TCZ5BYEpJ',
  },
  {
    id: 'BV1vDZ6BXEQE',
    title: '【SCP新春会单品】全22中分GOI填词一首《好字唯之》（填词/混剪pv）',
    author: '阿泉君LIN',
    duration: 207,
    views: 84494,
    published: '2026-02-20',
    url: BILI + 'BV1vDZ6BXEQE',
  },
  {
    id: 'BV1YMZ1BoEMd',
    title: '哈基米：爱死基米秘密实验室【2026基金会新春会单品】',
    author: '西西西柚秀',
    duration: 43,
    views: 81831,
    published: '2026-02-17',
    url: BILI + 'BV1YMZ1BoEMd',
  },
  {
    id: 'BV1D3Z3BoEY2',
    title: '【基金会新春会单品/破晓之时/填词】世末歌者——今日 吾爱 融为一体',
    author: '阿良阿砍_',
    duration: 320,
    views: 25449,
    published: '2026-02-17',
    url: BILI + 'BV1D3Z3BoEY2',
  },
  {
    id: 'BV1jUFtzWE37',
    title: '[基金会拜年祭单品] SCPSL的谎言马卡龙',
    author: 'chI0rine',
    duration: 35,
    views: 19515,
    published: '2026-02-08',
    url: BILI + 'BV1jUFtzWE37',
  },
  {
    id: 'BV1AGZ5B9Eg1',
    title: '《【朗诵】关于新增迭代页（offset）及内容限制的说明（重制版）》【基金会新春会单品】',
    author: '_AAAkeliniper_',
    duration: 314,
    views: 16875,
    published: '2026-02-17',
    url: BILI + 'BV1AGZ5B9Eg1',
  },
  {
    id: 'BV1gaZyBpEDt',
    title: '那个基金会人[某会新春会单品]',
    author: 'Odeo_Offiziell',
    duration: 345,
    views: 10301,
    published: '2026-02-17',
    url: BILI + 'BV1gaZyBpEDt',
  },
  {
    id: 'BV1mCZ5BaEQG',
    title: '该死的同行【2026*会新春会】———哎呀，这个同行怎么这么坏呀！',
    author: '赤发黑羽',
    duration: 308,
    views: 9563,
    published: '2026-02-17',
    url: BILI + 'BV1mCZ5BaEQG',
  },
  {
    id: 'BV1AKZyBgENv',
    title: '【基金会新春会单品】伦理道德委员会 VS 遏火部',
    author: '画鼠',
    duration: 307,
    views: 9334,
    published: '2026-02-17',
    url: BILI + 'BV1AKZyBgENv',
  },
  {
    id: 'BV16DZgB3Eop',
    title: '中分新春会单品：论一个清洁工是怎么从Apollyon级手中拯救世界五次的（伪）',
    author: 'ACG_Cat',
    duration: 243,
    views: 9239,
    published: '2026-02-17',
    url: BILI + 'BV16DZgB3Eop',
  },
  {
    id: 'BV1VxZ2BNE2T',
    title: '【基金会新春会/我于万物之中《人是_》填词】“万物自我起，万物拱我旁”（单品）（重投）',
    author: '宁静Claire',
    duration: 266,
    views: 8088,
    published: '2026-02-18',
    url: BILI + 'BV1VxZ2BNE2T',
  },
  {
    id: 'BV1xnZVBbEdo',
    title: '[新春会单品]「火箭鞋」de起源',
    author: '_爱喝茶的猫_',
    duration: 46,
    views: 7726,
    published: '2026-02-17',
    url: BILI + 'BV1xnZVBbEdo',
  },
  {
    id: 'BV1EYZ3BkEuP',
    title: '【S█P基金会拜年祭单品/删减版】那什么的scp基金会',
    author: 'xie_fox',
    duration: 103,
    views: 7200,
    published: '2026-02-17',
    url: BILI + 'BV1EYZ3BkEuP',
  },
  {
    id: 'BV1QdcpzTEY5',
    title: '【SCP新春会单品之下山】梦华佳人霜雪天，笛声藏国梦（填词）',
    author: 'NPC小石君',
    duration: 156,
    views: 7140,
    published: '2026-02-16',
    url: BILI + 'BV1QdcpzTEY5',
  },
  {
    id: 'BV1eFZuB4E6Z',
    title: '【SCP|千秋入画】新气迎春，无不入画 - 2026基金会新春会',
    author: '一只话痨的顶点',
    duration: 226,
    views: 6968,
    published: '2026-02-17',
    url: BILI + 'BV1eFZuB4E6Z',
  },
  {
    id: 'BV1NKZ5BZEWP',
    title: '【基金会新春会】节目单品--clef和kondraki的天天天国地狱国',
    author: 'Dr_FlaMing',
    duration: 88,
    views: 6659,
    published: '2026-02-17',
    url: BILI + 'BV1NKZ5BZEWP',
  },
  {
    id: 'BV17vZ3B3Eb6',
    title: '〖新春会〗开场混剪 我们为何热爱SCP？',
    author: 'Az_Xiangjiao',
    duration: 268,
    views: 6346,
    published: '2026-02-17',
    url: BILI + 'BV17vZ3B3Eb6',
  },
  {
    id: 'BV1WWZ3BUEay',
    title: '基金会新春会单品：O5-3倾情献舞《恭喜发财》！',
    author: '昭星流光',
    duration: 208,
    views: 6262,
    published: '2026-02-17',
    url: BILI + 'BV1WWZ3BUEay',
  },
  {
    id: 'BV1raZ3BVEEu',
    title: '【Maybe I\'m psycho】3549/手书/scp',
    author: 'Plastic_Ender',
    duration: 109,
    views: 6087,
    published: '2026-02-17',
    url: BILI + 'BV1raZ3BVEEu',
  },
  {
    id: 'BV1WPvoBSEAQ',
    title: '“终夜•SCP-CN-4001-传汐引潮”（4k竞赛|洛天依|人类屹立在大地之上。  历史，从现在开始，将继续前进。）',
    author: '言流还没睡',
    duration: 227,
    views: 5999,
    published: '2026-01-02',
    url: BILI + 'BV1WPvoBSEAQ',
  },
  {
    id: 'BV1CyfjBYEhV',
    title: '【2026基金会新春会单品】常态主义【数据删除】',
    author: 'Allied-Commander',
    duration: 183,
    views: 5122,
    published: '2026-02-21',
    url: BILI + 'BV1CyfjBYEhV',
  },
  {
    id: 'BV1SaZgBWETL',
    title: '【SCP新春会】节目单品——《你们这群人在食堂煮什么呢喂？！》',
    author: '九斯基琪露诺',
    duration: 424,
    views: 4792,
    published: '2026-02-17',
    url: BILI + 'BV1SaZgBWETL',
  },
  {
    id: 'BV1YAZ3BAEBH',
    title: '【琵琶行/缢王诗行】“斯城复谑欢，斯谑永无央。 四岳皆同跪，跪朝受缢王。”',
    author: 'QunGuan_',
    duration: 327,
    views: 3670,
    published: '2026-02-17',
    url: BILI + 'BV1YAZ3BAEBH',
  },
  {
    id: 'BV1xNZ5BbEJ2',
    title: '基金会新春会小品单品：异常也要过大年',
    author: '你亲爱的一只傻子',
    duration: 320,
    views: 3309,
    published: '2026-02-17',
    url: BILI + 'BV1xNZ5BbEJ2',
  },
  {
    id: 'BV1hnZSBNEJP',
    title: '[新春会单品][O5-3]拼凑的断音[mmd]',
    author: 'LF_Y-909',
    duration: 253,
    views: 3295,
    published: '2026-02-18',
    url: BILI + 'BV1hnZSBNEJP',
  },
  {
    id: 'BV1aYZ5BgEid',
    title: '【新春会单品】破晓之时--太空前哨站和O5议会',
    author: '不秀海鸥',
    duration: 284,
    views: 2780,
    published: '2026-02-17',
    url: BILI + 'BV1aYZ5BgEid',
  },
  {
    id: 'BV1rbZ3BLEoZ',
    title: '【破碎之神教会/Hedwig中心向手书/新春会单品】Alive',
    author: 'Gunnfoder',
    duration: 260,
    views: 2523,
    published: '2026-02-17',
    url: BILI + 'BV1rbZ3BLEoZ',
  },
  {
    id: 'BV1nsZuBgEh6',
    title: '【Scp基金会/新春会单品】阿拉卡达野史之缢王',
    author: '关于缢王尸块的全合成',
    duration: 198,
    views: 2197,
    published: '2026-02-16',
    url: BILI + 'BV1nsZuBgEh6',
  },
  {
    id: 'BV15rZ3BTEBA',
    title: '一年没品新闻【2026基金会新春会单品】',
    author: '神棍学者麦蒂文',
    duration: 376,
    views: 2120,
    published: '2026-02-17',
    url: BILI + 'BV15rZ3BTEBA',
  },
  {
    id: 'BV1k6ZMBgEH3',
    title: '基金会相声 - 我要穿越',
    author: '是呆瑞呦',
    duration: 752,
    views: 1992,
    published: '2026-02-16',
    url: BILI + 'BV1k6ZMBgEH3',
  },
  {
    id: 'BV1AGZ5B9EE9',
    title: '【新春会单品】代替我（没有人可以代替我与你们）',
    author: '言流还没睡',
    duration: 205,
    views: 1920,
    published: '2026-02-17',
    url: BILI + 'BV1AGZ5B9EE9',
  },
  {
    id: 'BV1q9ZMBhE6n',
    title: '【SCP|手书】Last Dance - 2026基金会新春会',
    author: '一只话痨的顶点',
    duration: 79,
    views: 1776,
    published: '2026-02-17',
    url: BILI + 'BV1q9ZMBhE6n',
  },
  {
    id: 'BV1spZ3BJEHV',
    title: '【Scp基金会拜年祭单品】Facility23也要过春节！',
    author: '啤酒牧师',
    duration: 1060,
    views: 1738,
    published: '2026-02-17',
    url: BILI + 'BV1spZ3BJEHV',
  },
  {
    id: 'BV1hVZVBPEMi',
    title: '2026-SCP新春会单品-O5-[数据删除]-世界悲歌-维度撕裂',
    author: '末世覆滅-爱衣魂钢',
    duration: 281,
    views: 1341,
    published: '2026-02-17',
    url: BILI + 'BV1hVZVBPEMi',
  },
  {
    id: 'BV1KeZMBLE85',
    title: '【基金会新春会单品】「四海五洲」Site-CN-44站点向填词',
    author: '夏鸿winter',
    duration: 197,
    views: 1249,
    published: '2026-02-17',
    url: BILI + 'BV1KeZMBLE85',
  },
  {
    id: 'BV1FVZGBLEFh',
    title: '【基金会单品】我的兄弟叫林南之我拿格调画出来的',
    author: '烁NaOHShin_',
    duration: 89,
    views: 1193,
    published: '2026-02-17',
    url: BILI + 'BV1FVZGBLEFh',
  },
  {
    id: 'BV14GZuBEEUV',
    title: '【第一届SCP基金会新春会单品】NaglazGYamiZaleD - ......And I Whisper Your Name Like a Curse',
    author: 'M1kageThordendal',
    duration: 570,
    views: 852,
    published: '2026-02-17',
    url: BILI + 'BV14GZuBEEUV',
  },
  {
    id: 'BV1WWZ3BUEVw',
    title: '[新春会单品]大阿伽，是我的家乡',
    author: '2747-非存在之主',
    duration: 98,
    views: 650,
    published: '2026-02-17',
    url: BILI + 'BV1WWZ3BUEVw',
  },
  {
    id: 'BV1fgZyBiEh7',
    title: '「新春会单品」莫收容',
    author: '一个路过的逆模因OvO',
    duration: 133,
    views: 481,
    published: '2026-02-17',
    url: BILI + 'BV1fgZyBiEh7',
  },
  {
    id: 'BV1cDZyBgENx',
    title: '基金会新春会单品',
    author: 'MTF-TUA5',
    duration: 164,
    views: 197,
    published: '2026-02-17',
    url: BILI + 'BV1cDZyBgENx',
  },
  {
    id: 'BV1SiZ5BTEyQ',
    title: 's■p基金会新春会单品/入■送wifi',
    author: 'Akeyincog',
    duration: 96,
    views: 165,
    published: '2026-02-17',
    url: BILI + 'BV1SiZ5BTEyQ',
  },
  /* ---- 以下两条不是单个 B 站投稿：一个是三篇合并成一个节目，一个是同曲多版本 ----
     排序由 components/ProgramList.astro 按 views 统一处理，这里的位置不影响展示。
     播放量取法：三篇合并的取三支之和（内容不重叠）；中分之歌取官方 MV 一支（另一支是同曲的合唱录制版）。 */
  {
    id: 'BV1YFZuB4E8G',
    title: '基金会也要过春节（假如基金会有群聊）',
    author: '堂吉诃德-骑士-',
    duration: 626,
    views: 3011 + 2618 + 3661,
    published: '2026-02-17',
    url: BILI + 'BV1YFZuB4E8G',
    extraLinks: [
      { label: '组织篇', url: BILI + 'BV1YFZuB4E8G' },
      { label: '异常篇', url: BILI + 'BV19ZZMBZEZD' },
      { label: '至高神性篇', url: BILI + 'BV1eZZMBZEaA' },
    ],
    flag: 'collective',
  },
  {
    id: 'BV1Ev1YBqEsn',
    title: '［MV］中分之歌 / 新春会中分之歌合唱',
    author: 'Roger_F',
    duration: 139,
    views: 58288,
    published: '2026-02-16',
    url: BILI + 'BV1Ev1YBqEsn',
    extraLinks: [{ label: '合唱录制版 · 不秀海鸥', url: BILI + 'BV1yqZMBGEbH' }],
    contributors: ['不秀海鸥'],
    note: '《中分之歌》是 AI 生成的跑调梗曲。大合唱版未见官方投稿，此处一并收录投稿者不秀海鸥录制的版本。',
    flag: 'ai',
  },
];

/** 2026 正片里出现过、但没有单独发布单品视频的节目。 */
export type MissingItem = {
  author: string;
  title: string;
  /** not-posted = 作者在 B 站有号但没有单独投稿；no-account = 未能找到对应账号 */
  reason: 'not-posted' | 'no-account';
  note?: string;
  /** 需要指向站内说明时给出 */
  link?: { label: string; href: string };
};

export const MISSING: MissingItem[] = [
  { author: 'Etrops', title: '【CN-2000中心向】Who are you, really', reason: 'no-account' },
  {
    author: '酸性海蓝色 / Ehs爱玩三角洲的浩南',
    title: '【SCP-105】被生命所厌恶。',
    reason: 'not-posted',
  },
  { author: 'Ehs爱玩三角洲的浩南', title: '九尾狐和混沌分裂者的脱口秀', reason: 'no-account' },
  { author: 'MR_DEMO伤昼', title: '昧谷队也要过大年', reason: 'not-posted' },
  { author: '时代唯一神杨戬', title: '金山银山', reason: 'no-account' },
  { author: '时代唯一神杨戬', title: '一点小动画', reason: 'no-account' },
  { author: 'parrot563KB', title: '中分新春会广告·一', reason: 'not-posted' },
  { author: 'parrot563KB', title: '中分新春会广告·二', reason: 'not-posted' },
  { author: '艾尔洛夫', title: '基金会超人', reason: 'no-account' },
  { author: 'Dyosme', title: 'DD让梨？', reason: 'not-posted' },
  { author: '芥墨孑子', title: '舞动吧中分！', reason: 'not-posted' },
  { author: '游画师球', title: '春节前的 Site-CN-52', reason: 'not-posted' },
  {
    author: '喜欢神秘侧的纳铃言',
    title: '友谊地久天长——献给热爱 SCP 的大家',
    reason: 'not-posted',
  },
  { author: '觉觉睡一会', title: '难忘今宵翻唱', reason: 'not-posted' },
  {
    author: '江山行于舟',
    title: '机动特遣队·乡里愚人×为什么',
    reason: 'not-posted',
    note: '经核实为抄袭作品，作者已改署为 MAKU_050。',
    link: { label: '查看处理声明', href: '/announcement/#2026-plagiarism' },
  },
];

/** 2026 首届新春会主持人。 */
export const HOSTS = [
  { name: '阿雨不忘初心', mid: 631645354, url: 'https://space.bilibili.com/631645354' },
  { name: '筱洛Serov', mid: 21154649, url: 'https://space.bilibili.com/21154649' },
] as const;

/** 归档统计 */
export const PROGRAM_STATS = {
  /** 41 个单品 + 2 个多视频节目 */
  count: PROGRAM.length,
  contributors: new Set(PROGRAM.flatMap((p) => [p.author, ...(p.contributors ?? [])])).size,
  missing: MISSING.length,
  fetchedAt: '2026-09-11',
} as const;
