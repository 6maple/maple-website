import path from 'path';
import { createProcessor } from './processor.ts';
import pm from 'picomatch';

import type { Plugin } from 'vite';

export interface ViteMDPluginOptions {
  includes?: string[];
}

export const createViteVueMDPlugin = (options: ViteMDPluginOptions = {}) => {
  const { includes = ['**/*.md'] } = options;
  let root = process.cwd();
  const checkList = includes.map((pattern) => pm(pattern));
  const filter = (id: string) => {
    const file = path.relative(root, id).replace(/\\/g, '/');
    return checkList.some((item) => item(file));
  };
  const processor = createProcessor();
  const convert = async (_filePath: string, code: string) => {
    const file = await processor.process(code);
    file.data.matter;
    return {
      code: `<script lang="js">export const matter = ${JSON.stringify(file.data.matter)}</script><template>${file.toString()}</template>`,
      map: null,
    };
  };
  return {
    name: 'vite-plugin-vue-md',
    enforce: 'pre',
    configResolved(config) {
      root = config.root;
    },
    async transform(code, id) {
      if (!filter(id)) {
        return;
      }
      const res = await convert(id, code);
      return res.code;
    },
    async handleHotUpdate(ctx) {
      if (!filter(ctx.file)) {
        return;
      }
      const defaultRead = ctx.read;
      ctx.read = async function () {
        return (await convert(ctx.file, await defaultRead())).code;
      };
    },
  } as Plugin;
};
