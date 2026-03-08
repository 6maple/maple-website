import { acceptHMRUpdate, defineStore } from 'pinia';
import { availableLocales, loadLanguageAsync } from '@/utils/i18n';

export const usePersonalConfigStore = defineStore('personal', () => {
  // 这里不能调用依赖组件的 hooks
  const updateLocale = async (value: string) => {
    await loadLanguageAsync(value);
  };
  return { localeKeys: availableLocales, updateLocale };
});

// 确保这段代码只在开发环境下执行
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(usePersonalConfigStore, import.meta.hot),
  );
}
