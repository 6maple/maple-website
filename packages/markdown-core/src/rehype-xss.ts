import { visit } from 'unist-util-visit';

import type { Element } from 'hast';
import type { PluginHandler } from './types.ts';

export function rehypeXSS() {
  const BANNED_TAGS = ['script', 'iframe', 'base'];

  return ((tree) => {
    visit(tree, 'element', (node: Element, index, parent: Element) => {
      // 1. 删除黑名单标签
      if (BANNED_TAGS.includes(node.tagName)) {
        parent.children.splice(index, 1);
        return index;
      }
      // 2. 移除内联脚本属性 (XSS 常见入口)
      if (node.properties) {
        for (const attr in node.properties) {
          if (attr.toLowerCase().startsWith('on')) {
            delete node.properties[attr];
          }
        }
      }
    });
  }) as PluginHandler;
}
