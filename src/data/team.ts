/** 2027 新春会主办方分工。取自企划书「分工」一节。 */

export type MemberRole = {
  name: string;
  detail: string;
};

export type Member = {
  /** 圈名 / 常用 ID */
  handle: string;
  /** 中文名或备用称呼 */
  alias: string;
  roles: MemberRole[];
};

export const TEAM: Member[] = [
  {
    handle: 'Roger_F XL',
    alias: '屑懒',
    roles: [{ name: '统筹', detail: '所有的统筹、咨询等杂项。' }],
  },
  {
    handle: 'OxygenNine',
    alias: 'O9',
    roles: [
      { name: '视频制作', detail: '正片剪辑、包装与成片输出。' },
      {
        name: '网站开发',
        detail: '本活动官网的设计与开发（with WorkBuddy DeepSeek V4.1 Flash）。',
      },
    ],
  },
  {
    handle: 'breaddddd',
    alias: '面包',
    roles: [{ name: '美工', detail: '主视觉、节目包装与平面素材。' }],
  },
  {
    handle: 'Re_Spectators',
    alias: '大R',
    roles: [{ name: '小剧场文案', detail: '穿插小剧场的剧本撰写。' }],
  },
  {
    handle: 'Odeo',
    alias: '欧豆',
    roles: [{ name: '小剧场文案', detail: '穿插小剧场的剧本撰写。' }],
  },
];

/**
 * 吉祥物尚未完成设计，形象与名称都未定案，暂不对外展示。
 * 上一版占位（SKIPPY 名称 + 企划书里的形象描述）已移除——形象画好前不占位，
 * 避免把内部设定当成已公开信息。形象落定后在此补回，并在 /2027 的规模区块里展示。
 */

/**
 * 制作规模。均为企划书明确写定的公开信息。
 * 未敲定的（审核组名单、致辞嘉宾、大合唱曲目、主线故事、互动环节方案）不在此列。
 */
export const PRODUCTION = {
  programTarget: '30 ~ 35',
  reviewers: '7 ~ 8 人',
  reviewerNote: '审核组涵盖不同 SCP 社群，独立打分；名单待定。',
  programNote: '除开场混剪与新春贺词外，收录约 30 ~ 35 个节目，视情况浮动。',
} as const;
