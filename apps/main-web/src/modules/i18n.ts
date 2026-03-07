import type { UserModule } from '../types';

import { i18n, loadLanguageAsync } from '@/utils/i18n';

export const install: UserModule = ({ app }) => {
  app.use(i18n);
  loadLanguageAsync('zh-CN');
};
