import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import express from 'express';
import { AcceptedDataException } from '../common/accepted-data-exception';
import { ResponseDataImpl } from '../common/response-data';

@Catch(AcceptedDataException)
export class AcceptedDataExceptionFilter implements ExceptionFilter {
  catch(exception: AcceptedDataException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<express.Response>();
    response
      .status(exception.getStatus())
      .json(
        ResponseDataImpl.buildFailure(
          exception.message,
          exception.errorCode.toString(),
        ),
      );
  }
}
