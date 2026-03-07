import nprogress from 'nprogress';

let loadingCount: number = 0;
let loadingConfigured: boolean = false;

export const setupGlobalLoading = () => {
  if (loadingConfigured) {
    return;
  }
  nprogress.configure({ showSpinner: false });
  loadingConfigured = true;
  loadingCount = 0;
};

export const startGlobalLoading = (force: boolean = false) => {
  if (!loadingConfigured) {
    return;
  }
  loadingCount += 1;
  if (loadingCount === 1 || force) {
    nprogress.start();
  }
};

export const stopGlobalLoading = (force: boolean = false) => {
  if (!loadingConfigured || loadingCount < 1) {
    return;
  }
  loadingCount -= 1;
  if (loadingCount < 1 || force) {
    loadingCount = 0;
    nprogress.done();
  }
};
