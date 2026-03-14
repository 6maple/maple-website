import { onMounted } from 'vue';
import { useClipboard } from '@vueuse/core';

const ignoreSelector = ['twoslash-hover', '.diff.remove'].join(',');
const shellLangs = ['shellscript', 'shell', 'bash', 'sh', 'zsh'];
const isShellLang = (lang: string) => {
  return shellLangs.includes(lang);
};

const useButtonCopy = () => {
  const clipboard = useClipboard();
  onMounted(() => {
    window.addEventListener('click', async (evt) => {
      const el = evt.target as HTMLElement;
      // 处理复制按钮
      if (!el.matches('.md-article pre.shiki > button.copy')) {
        return;
      }
      const codeEl = el.previousElementSibling as HTMLElement;
      if (!codeEl) {
        return;
      }
      // 清理多余的节点
      const node = codeEl.cloneNode(true) as HTMLElement;
      node.querySelectorAll(ignoreSelector).forEach((item) => item.remove());
      node.innerHTML = node.innerHTML.replace(/\n+/g, '\n');
      const lang = el.dataset.lang || '';
      // 提取代码
      let text = node.textContent || '';
      if (isShellLang(lang)) {
        text = text.replace(/^ *(\$|>) /gm, '').trim();
      }
      await clipboard.copy(text);
      // 复制后设置状态
      if (!el.classList.contains('copied')) {
        el.classList.add('copied');
        setTimeout(() => {
          el.classList.remove('copied');
        }, 500);
      }
    });
  });
};

export const useMdArticle = () => {
  useButtonCopy();
};
