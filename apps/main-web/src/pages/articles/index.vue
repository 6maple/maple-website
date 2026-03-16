<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const data = import.meta.glob('./**/*.md', { import: 'matter', eager: true });
const { locale } = useI18n();
const articleList = computed(() => {
  return Object.entries(data)
    .filter(([_path, item]) => Boolean(item))
    .map(([path, item]) => {
      const routePath = `/articles/${path.slice(2, -3)}`;
      return {
        ...(item as {
          title?: string;
          description?: string;
          date?: string;
          tag?: Record<string, string>;
        }),
        key: path,
        route: { path: routePath },
      };
    });
});
</script>

<template>
  <div class="not-prose group flex flex-col gap-4">
    <div
      v-for="item in articleList"
      :key="item.key"
      class="flex transition-opacity duration-300 group-hover:opacity-40 hover:opacity-100"
    >
      <RouterLink
        class="h-32 w-full space-y-2 rounded-lg border border-transparent bg-zinc-50 px-5 py-4 shadow-xs transition-shadow duration-500 hover:border-zinc-300 hover:shadow-md dark:bg-zinc-800 dark:shadow-zinc-700/80 dark:hover:border-zinc-700"
        :to="item.route"
      >
        <div class="flex justify-between">
          <div
            class="flex items-center space-x-4 border-l-4 border-sky-400 pl-4 dark:border-sky-600"
          >
            <h2 class="text-2xl font-black tracking-wider">{{ item.title }}</h2>
          </div>
          <div class="space-x-4">
            <span
              class="rounded-md bg-teal-100 px-2.5 py-0.5 text-xs dark:bg-teal-950"
              >{{ item.tag?.[locale] || $t('app.article.tech_blog') }}</span
            >
            <span class="text-sm text-zinc-500">{{ item.date }}</span>
          </div>
        </div>
        <div class="line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
          {{ item.description }}
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
