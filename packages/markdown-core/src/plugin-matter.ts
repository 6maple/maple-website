import grayMatter from 'gray-matter';

import type { PluginSimple } from 'markdown-it-async';

export const markdownItMatter: PluginSimple = (md) => {
  const parse = md.parse.bind(md);
  md.parse = (src, env = {}) => {
    const { data, content, excerpt } = grayMatter(src);
    env.content = content;
    env.frontMatter = {
      ...env.frontMatter,
      ...data,
    };
    // 摘要不做渲染
    env.excerpt = excerpt;
    return parse(content, env);
  };
};
