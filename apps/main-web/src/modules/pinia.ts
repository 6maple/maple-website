import { createPinia } from 'pinia';

import type { UserModule } from '../types';

import { setupPiniaContext } from '@/utils/shared-context';

export const install: UserModule = ({ initialState, app }) => {
  const pinia = createPinia();
  app.use(pinia);
  if (import.meta.env.SSR) {
    initialState.pinia = pinia.state.value;
  } else {
    pinia.state.value = initialState.pinia || {};
  }
  setupPiniaContext(pinia);
};
