import { type Locale, createI18n } from 'vue-i18n';

export const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../../../locales/*.json')).map(([path, loadLocale]) => [
    path.match(/([\w-]*)\.json$/)?.[1],
    loadLocale,
  ]),
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>;

export const availableLocales = Object.keys(localesMap);

export const i18n = createI18n({
  legacy: false,
  locale: '',
  fallbackLocale: 'zh-CN',
  messages: {},
});

const loadedLanguages: string[] = [];

function setI18nLanguage(lang: Locale) {
  i18n.global.locale.value = lang as any;
  if (typeof document !== 'undefined') {
    document.querySelector('html')?.setAttribute('lang', lang);
  }
  return lang;
}

export async function loadLanguageAsync(lang: string): Promise<Locale> {
  // 一样的语言
  if (i18n.global.locale.value === lang) {
    return setI18nLanguage(lang);
  }

  // 是否已经加载
  if (loadedLanguages.includes(lang)) {
    return setI18nLanguage(lang);
  }

  // 没加载，调用 localesMap 进行异步加载
  const messages = await localesMap[lang]!();
  i18n.global.setLocaleMessage(lang, messages.default);
  loadedLanguages.push(lang);
  return setI18nLanguage(lang);
}
