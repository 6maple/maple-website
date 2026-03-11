import { startGlobalLoading, stopGlobalLoading } from './global-loading';
import { HEADER_X_ACCESS_TOKEN, getAccessToken, setAccessToken } from './token';
import { i18n } from './i18n';
import { sharedContext } from './shared-context';
import request from './request';
import { useUserStore } from '@/stores/user';

const handleNeedLogin = () => {
  if (sharedContext.pinia == null) {
    return;
  }
  const userStore = useUserStore(sharedContext.pinia);
  userStore.handleNeedLogin();
};

export const setupRequest = () => {
  request.interceptors.request.use(
    (config) => {
      // 可以处理 token
      const token = getAccessToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      startGlobalLoading();
      return config;
    },
    (error) => {
      // 可以处理请求错误
      stopGlobalLoading();
      return Promise.reject(error);
    },
  );

  request.interceptors.response.use(
    (response) => {
      // 可以记录token
      // 可以处理响应，自动显示提示
      stopGlobalLoading();
      const resData: ApiResponseData<any> = response.data;
      if (resData.code === '0') {
        if (response.headers[HEADER_X_ACCESS_TOKEN]) {
          setAccessToken(response.headers[HEADER_X_ACCESS_TOKEN]);
        }
        return resData.data;
      } else {
        ElMessage({
          message: i18n.global.t(resData.message),
          type: 'error',
          duration: 1000,
        });
        return Promise.reject(resData);
      }
    },
    (error) => {
      if (error.response?.status === 401) {
        handleNeedLogin();
      }
      // 可以处理响应错误
      stopGlobalLoading();
      return Promise.reject(error);
    },
  );
};
