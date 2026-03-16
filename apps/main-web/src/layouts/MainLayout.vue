<script setup lang="tsx">
import { useDark } from '@vueuse/core';
import { Moon, Sunny } from '@element-plus/icons-vue';
import { useMainLayout } from './main-layout';
import { usePersonalConfigStore } from '@/stores/personal-config';

const isDark = useDark({ disableTransition: false });
const toggleTheme = () => {
  isDark.value = !isDark.value;
};
const personalConfigStore = usePersonalConfigStore();
const { menuConfigs, menuIndex, handleSelect } = useMainLayout();
</script>

<template>
  <div
    class="main-layout min-h-screen bg-zinc-100 text-zinc-900 transition-colors duration-300 selection:bg-indigo-500 selection:text-white dark:bg-zinc-900 dark:text-zinc-100"
  >
    <header
      class="fixed top-0 z-50 w-full border-b border-zinc-200 bg-white/70 backdrop-blur-md transition-all dark:border-zinc-800 dark:bg-zinc-950/70"
    >
      <div
        class="mx-auto flex h-16 max-w-7xl items-center justify-between px-2"
      >
        <div class="flex items-center">
          <div class="group flex items-center space-x-2">
            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-black text-white transition-transform group-hover:rotate-6"
            >
              Y
            </div>
            <span class="font-bold tracking-wider">
              {{ $t('app.text.site_name') }}
            </span>
          </div>
          <div class="ml-16 w-64">
            <ElMenu
              class="w-full"
              :default-active="menuIndex"
              mode="horizontal"
              @select="handleSelect"
            >
              <ElMenuItem
                v-for="item in menuConfigs"
                :key="item.key"
                :index="item.key"
              >
                {{ $t(item.labelKey) }}
              </ElMenuItem>
            </ElMenu>
          </div>
        </div>

        <div class="flex items-center">
          <div class="flex items-center">
            <ElDropdown @command="personalConfigStore.updateLocale">
              <button
                class="flex cursor-pointer items-center rounded-full px-3 py-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <i class="mr-1">Aa /</i>{{ personalConfigStore.localeText }}
              </button>
              <template #dropdown>
                <ElDropdownMenu>
                  <ElDropdownItem
                    v-for="item in personalConfigStore.localeKeys"
                    :key="item"
                    :command="item"
                    :disabled="item === personalConfigStore.locale"
                    >{{
                      personalConfigStore.resolveLocaleText(item)
                    }}</ElDropdownItem
                  >
                </ElDropdownMenu>
              </template>
            </ElDropdown>
          </div>
          <button
            class="flex cursor-pointer items-center rounded-full px-3 py-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900"
            @click="toggleTheme"
          >
            <ElIcon v-if="isDark">
              <Sunny />
            </ElIcon>
            <ElIcon v-else>
              <Moon />
            </ElIcon>
          </button>
        </div>
      </div>
    </header>
    <main class="pt-32">
      <slot></slot>
    </main>
    <footer class="min-h-16"></footer>
  </div>
</template>

<style lang="scss" scoped>
.el-menu {
  --el-menu-bg-color: transparent;
  --el-menu-border-color: transparent;
  --el-menu-text-color: var(--color-zinc-900);
  --el-menu-hover-bg-color: var(--color-zinc-100);
  --el-menu-active-color: var(--color-indigo-700);
}
.dark .el-menu {
  --el-menu-text-color: var(--color-zinc-300);
  --el-menu-hover-bg-color: var(--color-zinc-900);
  --el-menu-active-color: var(--color-indigo-400);
}
</style>
