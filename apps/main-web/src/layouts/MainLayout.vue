<script setup lang="tsx">
import { useDark } from '@vueuse/core';
import { Moon, Sunny } from '@element-plus/icons-vue';

const isDark = useDark();
const toggleTheme = () => {
  isDark.value = !isDark.value;
};
</script>

<template>
  <div class="main-layout" :class="{ dark: isDark }">
    <div
      class="main-container min-h-screen bg-white text-zinc-900 transition-colors duration-300 selection:bg-indigo-500 selection:text-white dark:bg-[#09090b] dark:text-zinc-100"
    >
      <header
        :class="`fixed top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md transition-all dark:border-zinc-800 dark:bg-zinc-950/80`"
      >
        <div
          class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6"
        >
          <div class="group flex items-center space-x-2">
            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-black text-white transition-transform group-hover:rotate-6"
            >
              Y
            </div>
            <span class="font-bold tracking-tight"
              >杨杰
              <span class="font-medium text-zinc-400">/ Portfolio</span></span
            >
          </div>

          <nav
            class="hidden items-center space-x-8 text-sm font-medium text-zinc-500 md:flex dark:text-zinc-400"
          >
            <a
              href="/"
              class="transition-colors hover:text-indigo-600 dark:hover:text-white"
              >首页</a
            >
          </nav>

          <div class="flex items-center space-x-4">
            <button
              class="cursor-pointer rounded-full p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900"
              @click="toggleTheme"
            >
              <ElIcon v-if="isDark" class="h-4 w-4">
                <Sunny />
              </ElIcon>
              <ElIcon v-else class="h-4 w-4">
                <Moon />
              </ElIcon>
            </button>
            <button
              class="cursor-pointer rounded-full bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-700"
            >
              获取简历
            </button>
          </div>
        </div>
      </header>
      <main class="pt-32">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
