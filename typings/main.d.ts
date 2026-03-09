declare interface ApiLoginQuery {
  user: string;
  pwd: string;
}

type ApiLoginResult = ApiUserProfileResult;
declare interface ApiUserProfileResult {
  user: string;
}

declare interface ApiAuthCheckResult {
  needRefresh: boolean;
}

declare type ApiRegisterQuery = ApiLoginQuery;

declare interface ApiResponseData<T = unknown> {
  code: string;
  message: string;
  data: T | null;
}
