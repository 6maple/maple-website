import type { Root as MdastRoot } from 'mdast';
import type { Root as HastRoot } from 'hast';
import type { VFile } from 'vfile';

export interface RemarkPluginHandler {
  (tree: MdastRoot, file: VFile): void;
}

export interface RehypePluginHandler {
  (tree: HastRoot, file: VFile): void;
}
