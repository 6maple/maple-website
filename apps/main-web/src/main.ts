import './styles/global';

import { ViteSSG } from 'vite-ssg';
import App from './App.vue';
import { routes } from 'vue-router/auto-routes';
import { setupAppContext } from './utils/shared-context';
import { setupRequest } from './utils/request-setup';
import { loadLanguageAsync } from './utils/i18n';

import type { UserModule } from './types';

setupRequest();

export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  async (ctx) => {
    Object.values(
      import.meta.glob<{ install: UserModule }>('./modules/*.ts', {
        eager: true,
      }),
    ).forEach((i) => i.install?.(ctx));
    await loadLanguageAsync('zh-CN');
    setupAppContext(ctx.app, ctx.router);
  },
);
