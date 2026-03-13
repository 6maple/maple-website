import { visit } from 'unist-util-visit';

import type { PluginHandler } from './types.ts';

const TYPE_LIST = ['info', 'warning', 'tip', 'danger'];

// 这是一个自定义的转换插件
export function remarkDirectivePlugin() {
  return ((tree) => {
    visit(tree, (node) => {
      // 检查是否是容器指令 (::: 类型)
      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        const data = node.data || (node.data = {});
        const tagName = node.name!;
        // 只处理 info warning tip danger
        if (TYPE_LIST.includes(tagName)) {
          // 将节点转换为 HTML 标签
          data.hName = 'div';
          data.hProperties = {
            class: `custom-container ${tagName}`,
          };
        }
      }
    });
  }) as PluginHandler;
}
