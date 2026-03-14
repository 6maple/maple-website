<script setup lang="ts">
import { useMdArticle } from './md-article';

useMdArticle();
</script>

<template>
  <article
    class="md-article relative mx-auto prose max-w-7xl space-y-3 p-10 pt-6 text-zinc-800 transition-all animate-in fade-in md:p-16 md:pt-10 lg:prose-lg dark:text-zinc-100 dark:prose-invert"
  >
    <RouterView />
  </article>
</template>
