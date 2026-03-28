import markdownItAnchor from 'markdown-it-anchor';
import markdownItCjkFriendly from 'markdown-it-cjk-friendly';
import markdownItContainer from 'markdown-it-container';
import { full as markdownItEmoji } from 'markdown-it-emoji';
import markdownItMathjax3 from 'markdown-it-mathjax3';
import { fromAsyncCodeToHtml } from '@shikijs/markdown-it/async';
import { codeToHtml } from 'shiki';
import { markdownItMatter } from './plugin-matter.ts';
import { shikiTransformers } from './shiki.ts';

import type { ContainerOpts } from 'markdown-it-container';
import type { MarkdownItAsync } from 'markdown-it-async';

export const setupMD = (md: MarkdownItAsync) => {
  // markdown-it-anchor: 为标题添加锚点 ID，并生成可点击的链接
  md.use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.headerLink(), // 在标题旁添加链接符号
    slugify: (s) => s.toLowerCase().replace(/\s+/g, '-'), // 自定义 slug 生成规则 空格转 -
  });
  // markdown-it-cjk-friendly: 优化中日韩文字的排版（自动添加空格等）
  md.use(markdownItCjkFriendly);
  // markdown-it-emoji: 将 :emoji: 转换为 emoji 字符
  md.use(markdownItEmoji);
  md.use(markdownItMatter);
  md.use(
    fromAsyncCodeToHtml(codeToHtml, {
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
      // 让内联代码保持原样，不破坏原有的特殊语法标记
      defaultColor: false,
      transformers: shikiTransformers,
    }),
  );
  // markdown-it-mathjax3: 渲染 LaTeX 数学公式
  md.use(markdownItMathjax3, {
    // MathJax 3 的配置项，例如加载的包、输出格式等
    options: {
      tex: {
        inlineMath: [
          ['$', '$'],
          ['\\(', '\\)'],
        ],
      },
    },
  });
  // markdown-it-container: 自定义容器
  md.use(markdownItContainer, 'tip', {
    validate: (params) => {
      return params.trim().match(/^tip\s+(.*)$/) !== null;
    },
    render: (tokens, idx) => {
      const token = tokens[idx];
      if (token.nesting === 1) {
        // 开始标签
        const match = token.info.trim().match(/^tip\s+(?:(.*))?$/);
        const title = match && match[1] ? match[1] : '提示';
        return `<div class="custom-block tip"><p class="custom-block-title">${title}</p>\n`;
      } else {
        // 结束标签
        return '</div>\n';
      }
    },
  } as ContainerOpts);
};
