import { SetMetadata } from '@nestjs/common';

export interface AuthPayload {
  user: string;
  exp?: number;
}

export const CONFIG_JWT_SECRET = 'JWT_SECRET';

export const HEADER_X_ACCESS_TOKEN = 'x-access-token';
export const COOKIE_REFRESH_TOKEN = 'at_refresh_token';

/** 刷新阈值，10 分钟 */
export const REFRESH_THRESHOLD = 10 * 60;
/** refresh token过期时间，7天 */
export const REFRESH_TOKEN_EXPIRE = 7 * 24 * 60 * 60;

export const IS_AUTH_PUBLIC_KEY = 'isAuthPublic';
export const AuthPublic = () => SetMetadata(IS_AUTH_PUBLIC_KEY, true);
