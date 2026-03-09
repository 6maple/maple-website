import { HttpException, HttpStatus } from '@nestjs/common';

export class AcceptedDataException extends HttpException {
  errorCode: number;
  constructor(message: string, errorCode: number = 1) {
    super({ message }, HttpStatus.ACCEPTED);
    this.errorCode = errorCode;
  }
}
