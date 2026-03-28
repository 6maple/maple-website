import MarkdownItAsync from 'markdown-it-async';

export const createMD = () => {
  return MarkdownItAsync({
    html: true, // 允许内嵌 HTML
    linkify: true, // 自动识别 URL
    typographer: true, // 启用一些语言中性的替换，如引号
  });
};
