import axios from 'axios';
import { startGlobalLoading, stopGlobalLoading } from './global-loading';

export const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

request.interceptors.request.use(
  (config) => {
    // 可以处理 token
    // 可以读取请求缓存直接返回
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
    return response.data;
  },
  (error) => {
    // 可以处理响应错误
    stopGlobalLoading();
    return Promise.reject(error);
  },
);

export default request;
