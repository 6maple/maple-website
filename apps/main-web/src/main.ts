import './styles/global';

import { ViteSSG } from 'vite-ssg';
import App from './App.vue';
import { routes } from 'vue-router/auto-routes';

import type { UserModule } from './types';

export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    Object.values(
      import.meta.glob<{ install: UserModule }>('./modules/*.ts', {
        eager: true,
      }),
    ).forEach((i) => i.install?.(ctx));
  },
);
