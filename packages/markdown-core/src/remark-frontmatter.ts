import { parse } from 'yaml';

import type { PluginHandler } from './types.ts';

// 这是一个简单的自定义插件，用于将 frontmatter 挂载到 vfile.data
export function remarkFrontmatterExtractor() {
  return ((tree, file) => {
    // 找到类型为 'yaml' 的节点（remark-frontmatter 生成的）
    const yamlNode = tree.children.find((node) => node.type === 'yaml');
    if (yamlNode) {
      // 解析 YAML 字符串并存入 file.data.matter
      file.data.matter = parse(yamlNode.value);
    }
  }) as PluginHandler;
}
