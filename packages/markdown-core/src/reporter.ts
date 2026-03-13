import { reporter } from 'vfile-reporter';

import type { VFile } from 'vfile';

export const getReportMessage = (file: VFile) => {
  return reporter(file);
};
