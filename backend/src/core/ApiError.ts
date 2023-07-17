import { Response } from 'express';
import { environment } from '../config';
import { InternalErrorResponse } from './ApiResponse';

export enum ErrorType {
  INTERNAL = 'InternalError',
  NOT_FOUND = 'NotFoundError',
}

export abstract class ApiError extends Error {
  constructor(public type: ErrorType, public message: string = 'error') {
    super(type);
  }

  public static handle(err: ApiError, res: Response): Response {
    switch (err.type) {
      case ErrorType.INTERNAL:
        return new InternalErrorResponse(err.message).send(res);
      case ErrorType.NOT_FOUND:
      default: {
        let message = err.message;
        // Do not send failure message in production as it may send sensitive data
        if (environment === 'production') message = 'Something wrong happened.';
        return new InternalErrorResponse(message).send(res);
      }
    }
  }
}

export class InternalError extends ApiError {
  constructor(message = 'Internal error') {
    super(ErrorType.INTERNAL, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Not Found') {
    super(ErrorType.NOT_FOUND, message);
  }
}
