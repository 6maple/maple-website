<script setup lang="ts">
import { useMdArticle } from './md-article';

useMdArticle();
</script>

<template>
  <article
    class="md-article relative mx-auto prose max-w-7xl space-y-3 p-10 text-zinc-800 transition-all duration-50 animate-in fade-in md:p-16 lg:prose-lg dark:text-zinc-100 dark:prose-invert prose-code:rounded-md prose-code:border prose-code:border-zinc-300 prose-code:bg-zinc-200 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:text-purple-600 prose-code:before:content-[''] prose-code:after:content-[''] prose-code:dark:border-zinc-700 prose-code:dark:bg-zinc-800 prose-code:dark:text-purple-400"
  >
    <slot> <RouterView /></slot>
  </article>
</template>
