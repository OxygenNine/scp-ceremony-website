/**
 * 2027 新春会时间轴。
 * 仅收录企划书里已明确写定的节点；审核组名单、致辞名单、大合唱曲目、主线故事等
 * 标注为「待定」的内部事项一律不进入站点。
 */

export type Milestone = {
  date: string;
  /** 展示用日期 */
  label: string;
  title: string;
  detail: string;
  /** 阶段：prep 筹备 / submit 征稿 / review 审核 / produce 制作 / live 发布 */
  phase: 'prep' | 'submit' | 'review' | 'produce' | 'live';
  /** 是否为一个需要用户注意的截止点 */
  deadline?: boolean;
};

export const MILESTONES: Milestone[] = [
  {
    date: '2026-09-10',
    label: '2026.09.10',
    title: '预热启动',
    detail: '在 B 站发布 2027 新春会预热帖。',
    phase: 'prep',
  },
  {
    date: '2026-09-11',
    label: '2026.09.11',
    title: '宣传与问卷开放',
    detail:
      '发布宣传视频，同日开放 2027 新春会 QQ 群与筹备问卷。问卷征集对新春会的建议、想看的作品类型、时长倾向与发布时间偏好。',
    phase: 'prep',
  },
  {
    date: '2026-09-14',
    label: '2026.09.11 – 09.14',
    title: '问卷征集期',
    detail: '四天窗口，问卷结束后进入正式的节目共创阶段。',
    phase: 'prep',
  },
  {
    date: '2027-01-01',
    label: '2027.01.01',
    title: '截稿',
    detail: '所有作品须于 2027 年 1 月 1 日 00:00 前完成上传，逾期不候。',
    phase: 'submit',
    deadline: true,
  },
  {
    date: '2027-01-05',
    label: '2027.01.05',
    title: '审核截止',
    detail: '由审核组对交付节目逐一独立打分，产出最终节目单。',
    phase: 'review',
  },
  {
    date: '2027-02-01',
    label: '2027.02.01',
    title: '成片完成',
    detail: '全部节目完成剪辑、字幕与混流，正片定版。',
    phase: 'produce',
  },
  {
    date: '2027-02-05',
    label: '2027.02.05',
    title: '正式发布',
    detail: '除夕当天上线。2027 年正月初一为 2 月 6 日。',
    phase: 'live',
  },
];

/** 按当前时间推导节点状态：done / current / upcoming */
export function statusOf(m: Milestone, now = new Date()): 'done' | 'current' | 'upcoming' {
  const d = new Date(m.date + 'T00:00:00+08:00');
  const day = 86400000;
  if (now.getTime() >= d.getTime() + 2 * day) return 'done';
  if (now.getTime() >= d.getTime()) return 'current';
  return 'upcoming';
}
