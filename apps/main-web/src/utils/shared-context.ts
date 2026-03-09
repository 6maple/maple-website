import type { Pinia } from 'pinia';
import type { App } from 'vue';
import type { I18n } from 'vue-i18n';
import type { Router } from 'vue-router';

export interface SharedContext {
  app?: App<Element>;
  router?: Router;
  pinia?: Pinia;
  i18n?: I18n;
}

export const sharedContext: SharedContext = {};

export const setupAppContext = (app: App<Element>, router: Router) => {
  sharedContext.app = app;
  sharedContext.router = router;
};
export const setupPiniaContext = (pinia: Pinia) => {
  sharedContext.pinia = pinia;
};
export const setupI18nContext = (i18n: I18n) => {
  sharedContext.i18n = i18n;
};
