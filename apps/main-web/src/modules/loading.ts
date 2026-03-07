import type { UserModule } from '../types';

import {
  setupGlobalLoading,
  startGlobalLoading,
  stopGlobalLoading,
} from '@/utils/global-loading';

export const install: UserModule = ({ router }) => {
  if (!import.meta.env.SSR) {
    setupGlobalLoading();
    router.beforeEach((to, from) => {
      if (to.path !== from.path) {
        startGlobalLoading();
      }
    });
    router.afterEach(() => {
      stopGlobalLoading();
    });
  }
};
