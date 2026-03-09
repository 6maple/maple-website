export const HEADER_X_ACCESS_TOKEN = 'x-access-token';
export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};
export const setAccessToken = (token: string) => {
  localStorage.setItem('accessToken', token);
};
