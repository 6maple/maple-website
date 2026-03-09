import request from '@/utils/request';

export const login = async (query: ApiLoginQuery): Promise<ApiLoginResult> => {
  return request.post('/auth/login', query);
};

export const check = async (): Promise<ApiAuthCheckResult> => {
  return request.get('/auth/check');
};

export const refresh = async (): Promise<unknown> => {
  return request.post('/auth/refresh');
};
