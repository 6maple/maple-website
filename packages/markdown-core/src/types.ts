import type { Root } from 'mdast';
import type { VFile } from 'vfile';

export interface PluginHandler {
  (tree: Root, file: VFile): void;
}
