import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkExtractToc from 'remark-extract-toc';
import remarkDirective from 'remark-directive';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import remarkEmoji from 'remark-emoji';
import rehypeShiki from '@shikijs/rehype';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { unified } from 'unified';
import remarkFrontmatter from 'remark-frontmatter';
import { remarkDirectivePlugin } from './remark-directive.ts';
import { remarkFrontmatterExtractor } from './remark-frontmatter.ts';
import { rehypeXSS } from './rehype-xss.ts';
import { shikiTransformers } from './shiki.ts';
import { remarkListTitle } from './remark-list-item.ts';

export interface ProcessorOptions {
  /**
   * @default false
   */
  outputFullHTML?: boolean;
}

export const createProcessor = (options: ProcessorOptions = {}) => {
  const { outputFullHTML = false } = options;
  const processor = unified()
    // 1. 解析 markdown
    .use(remarkParse)
    // 2. remark 插件：扩展语法、转换 MDAST
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkFrontmatterExtractor)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkEmoji)
    .use(remarkExtractToc)
    .use(remarkDirective)
    // 3. 自定义指令处理插件（必须，否则指令不会被渲染）
    .use(remarkDirectivePlugin) // 自定义 directive 插件
    .use(remarkListTitle)
    // 4. 转换 MDAST 到 HAST
    .use(remarkRehype, { allowDangerousHtml: true })
    // 5. rehype 插件：处理 HAST，增强 HTML
    .use(rehypeShiki, {
      // 代码高亮
      themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
      // 让内联代码保持原样，不破坏原有的特殊语法标记
      inline: 'tailing-curly-colon',
      defaultColor: false,
      transformers: shikiTransformers,
    })
    .use(rehypeRaw) // 解析保留的原始 HTML
    .use(rehypeSlug) // 为标题添加 id（如果没使用 remark-slug）
    .use(rehypeKatex) // 渲染数学公式
    .use(rehypeAutolinkHeadings) // 添加标题锚点链接
    // 6. 清理 HTML（防止 XSS）
    .use(rehypeXSS);

  if (outputFullHTML) {
    // 7. 包装为完整 HTML 文档
    processor.use(rehypeDocument, { title: '👋🌍' });
  }

  processor
    // 8. 格式化输出（可选，仅开发环境）
    .use(rehypeFormat)
    // 9. 序列化为字符串
    .use(rehypeStringify);

  return processor;
};
