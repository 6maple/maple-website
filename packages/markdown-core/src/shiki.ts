import { rendererRich, transformerTwoslash } from '@shikijs/twoslash';
import { transformerNotationHighlight, transformerRenderIndentGuides } from '@shikijs/transformers';

import type { ShikiTransformer } from '@shikijs/types';

export const transformerNotProse = (): ShikiTransformer => {
  return {
    name: 'not-prose',
    pre(node) {
      this.addClassToHast(node, 'not-prose');
    },
  };
};

export const transformerCopyButton = (): ShikiTransformer => {
  return {
    name: 'copy-button',
    pre(node) {
      // const rawCode = this.source;
      const lang = this.options.lang;
      const button: (typeof node.children)[0] = {
        type: 'element',
        tagName: 'button',
        properties: {
          class: ['copy'],
          // 'data-code': rawCode,
          'data-lang': lang,
          title: 'Copy code',
        },
        children: [{ type: 'text', value: 'Copy' }],
      };
      node.children.push(button);
    },
  };
};

export const shikiTransformers: ShikiTransformer[] = [
  transformerTwoslash({
    explicitTrigger: true,
    renderer: rendererRich(),
  }),
  transformerNotationHighlight(),
  transformerRenderIndentGuides(),
  transformerNotProse(),
  transformerCopyButton(),
];
