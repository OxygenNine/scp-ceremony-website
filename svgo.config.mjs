/**
 * svgo 配置：只做无损瘦身，保留两件东西——
 *   1. 各文件里已经命名空间化过的 id（不能合并，否则同页多个内联 SVG 会互相串用）
 *   2. fill="none"（颜色由 CSS 的 currentColor 接管，这里不动结构）
 */
export default {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupIds: false,
          removeUnknownsAndDefaults: false,
          removeUselessStrokeAndFill: false,
          collapseGroups: false,
          convertShapeToPath: false,
        },
      },
    },
    'sortAttrs',
  ],
};
