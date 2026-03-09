export class ResponseDataImpl<T = unknown> implements ApiResponseData<T> {
  code: string;
  message: string;
  data: T | null;
  constructor(data: T | null = null, code: string = '0', message: string = '') {
    this.code = code;
    this.message = message;
    this.data = data;
  }
  static buildFailure<DT = unknown>(
    message: string = '',
    code: string = '1',
    data: DT | null = null,
  ) {
    return new ResponseDataImpl<DT>(data, code, message);
  }
  static buildSuccess<DT = unknown>(
    data: DT | null = null,
    message: string = '',
    code: string = '0',
  ) {
    return new ResponseDataImpl<DT>(data, code, message);
  }
}
