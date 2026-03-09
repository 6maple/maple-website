import { computed } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';
import { availableLocales, loadLanguageAsync } from '@/utils/i18n';

export const usePersonalConfigStore = defineStore('personal', () => {
  // 这里不能调用依赖组件的 hooks
  const updateLocale = async (value: string) => {
    await loadLanguageAsync(value);
  };
  const localeKeys = availableLocales;
  const { locale, t } = useI18n();
  const resolveLocaleText = (value: string) => {
    return t(`app.text.locale.${value}`);
  };
  const localeText = computed(() => {
    return resolveLocaleText(locale.value);
  });
  return { localeKeys, updateLocale, localeText, locale, resolveLocaleText };
});

// 确保这段代码只在开发环境下执行
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(usePersonalConfigStore, import.meta.hot),
  );
}
