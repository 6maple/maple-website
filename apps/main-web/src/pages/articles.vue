<script setup lang="ts">
import { onMounted } from 'vue';
import { useClipboard } from '@vueuse/core';

const clipboard = useClipboard();
const ignoreSelector = ['twoslash-hover', '.diff.remove'].join(',');
const shellLangs = ['shellscript', 'shell', 'bash', 'sh', 'zsh'];
const isShellLang = (lang: string) => {
  return shellLangs.includes(lang);
};

onMounted(() => {
  window.addEventListener('click', async (evt) => {
    const el = evt.target as HTMLElement;
    if (!el.matches('.md-article pre.shiki > button.copy')) {
      return;
    }
    const codeEl = el.previousElementSibling as HTMLElement;
    if (!codeEl) {
      return;
    }
    const node = codeEl.cloneNode(true) as HTMLElement;
    node.querySelectorAll(ignoreSelector).forEach((item) => item.remove());
    node.innerHTML = node.innerHTML.replace(/\n+/g, '\n');
    const lang = el.dataset.lang || '';
    let text = node.textContent || '';
    if (isShellLang(lang)) {
      text = text.replace(/^ *(\$|>) /gm, '').trim();
    }
    await clipboard.copy(text);
    if (!el.classList.contains('copied')) {
      el.classList.add('copied');
      setTimeout(() => {
        el.classList.remove('copied');
      }, 500);
    }
  });
});
</script>

<template>
  <article
    class="md-article not-last-of-type: \ relative mx-auto prose max-w-7xl space-y-3 p-10 pt-6 text-zinc-800 transition-all animate-in fade-in md:p-16 md:pt-10 lg:prose-lg dark:text-zinc-100 dark:prose-invert"
  >
    <RouterView />
  </article>
</template>
