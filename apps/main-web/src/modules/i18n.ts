import type { UserModule } from '../types';

import { setupI18nContext } from '@/utils/shared-context';
import { i18n } from '@/utils/i18n';

export const install: UserModule = ({ app }) => {
  app.use(i18n);
  setupI18nContext(i18n);
};
