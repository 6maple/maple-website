<script setup lang="ts">
import { nextTick, ref, useTemplateRef } from 'vue';
import MdArticle from './MdArticle.vue';
import data from '../../../../packages/llm/output.json';
import { useMasonry } from '@/hooks/useMasonry';

const knowledgeShows = ref(new Array(data.length).fill(false));

const containerTemplateRef = useTemplateRef('container');
const childTemplateRef = useTemplateRef('child');

const { forceLayout } = useMasonry(
  () => containerTemplateRef.value!,
  () => {
    return childTemplateRef.value!;
  },
);

const toggleCard = async (index: number) => {
  knowledgeShows.value[index] = !knowledgeShows.value[index];
  await nextTick();
  forceLayout();
};
</script>

<template>
  <MdArticle>
    <div ref="container" class="relative text-lg">
      <div
        v-for="(item, index) in data"
        ref="child"
        :key="item.question"
        class="relative rounded-md bg-slate-50 pt-2 shadow-md shadow-zinc-300 dark:bg-slate-800 dark:shadow-zinc-900"
      >
        <div
          class="absolute top-2 flex w-full items-center justify-between px-4"
        >
          <div>
            <span class="text-sm text-zinc-500">#{{ index + 1 }}</span>
          </div>
          <div class="flex items-center gap-2">
            <button
              class="cursor-pointer"
              :class="{
                'icon-[lucide--eye]': !knowledgeShows[index],
                'icon-[lucide--eye-off]': knowledgeShows[index],
              }"
              @click="toggleCard(index)"
            >
              toggle
            </button>
          </div>
        </div>
        <div class="my-4 px-4" v-html="item.question"></div>
        <div v-show="!knowledgeShows[index]" class="flex justify-center pb-4">
          <button
            class="cursor-pointer rounded-md bg-indigo-600 px-6 py-1.5 text-sm text-zinc-100 transition-colors hover:bg-indigo-700"
            @click="toggleCard(index)"
          >
            {{ $t('app.text.show_answer') }}
          </button>
        </div>
        <div
          v-show="knowledgeShows[index]"
          class="rounded-b-md border-dashed border-slate-500/50 bg-slate-200/40 px-4 pb-4 text-base dark:bg-slate-900/40"
          :class="{
            'border-t': knowledgeShows[index],
          }"
        >
          <div class="flow-root" v-html="item.answer"></div>
          <div class="flex justify-between">
            <button
              class="flex cursor-pointer items-center rounded-md px-4 py-2 text-sm tracking-wider text-zinc-500 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:bg-zinc-700"
              @click="toggleCard(index)"
            >
              <i class="mr-1 icon-[lucide--undo-2]"></i>
              {{ $t('app.text.hide_answer') }}
            </button>
            <div class="flex items-center gap-2">
              <button
                class="cursor-pointer rounded-md border border-amber-600/50 px-6 py-1.5 text-sm tracking-wider text-amber-600 transition-colors hover:bg-amber-600/10"
              >
                {{ $t('app.text.fuzzy') }}
              </button>
              <button
                class="cursor-pointer rounded-md bg-emerald-600 px-6 py-1.5 text-sm tracking-wider text-zinc-100 transition-colors hover:bg-emerald-700"
              >
                {{ $t('app.text.master') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MdArticle>
</template>

<style lang="scss" scoped></style>
