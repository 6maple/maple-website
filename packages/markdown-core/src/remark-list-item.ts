import { visit } from 'unist-util-visit';

import type { PhrasingContent } from 'mdast';
import type { RemarkPluginHandler } from './types.ts';

// TODO 暂时关闭该功能
const ENABLE_LIST_TITLE = false;

const tryResolveText = (value: PhrasingContent) => {
  if (value.type === 'text') {
    return value.value;
  }
  return '';
};

export const remarkListTitle = () => {
  return ((tree, file) => {
    if (!ENABLE_LIST_TITLE) {
      return;
    }
    // 遍历所有的 listItem 节点
    visit(tree, 'listItem', (node) => {
      // 检查第一个子节点通常是 paragraph
      const firstChild = node.children[0];
      if (!firstChild || firstChild.type !== 'paragraph') {
        return;
      }
      // 正则匹配：以“文本:”开头的内容
      let text = '';
      for (const textNode of firstChild.children) {
        let v = '';
        if (textNode.type === 'strong') {
          v = tryResolveText(textNode.children[0]);
        } else if (textNode.type === 'emphasis') {
          v = tryResolveText(textNode.children[0]);
        } else {
          v = tryResolveText(textNode);
        }
        if (v === '') {
          break;
        }
        text += v;
      }
      const match = text.match(/^(.*?[：:])/);
      if (match) {
        // 将该段落转换为 span 并添加类名
        // remark-rehype 会识别 hName 和 hProperties
        firstChild.data = firstChild.data || {};
        firstChild.data.hName = 'span';
        firstChild.data.hProperties = {
          className: ['list-title'],
        };
      }
    });
  }) as RemarkPluginHandler;
};
