import { Request, Response, NextFunction } from 'express';
import { AppError, ValidationError } from './app-error';
import { logger } from '../utils/logger';
import { env } from '../config/env';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  const requestId = req.headers['x-request-id'] as string;
  let statusCode = 500;
  let message = 'Internal Server Error';
  let details: unknown = undefined;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    if (err instanceof ValidationError) {
      details = err.details;
    }
  }

  // Log the error
  logger.error(err.message, {
    requestId,
    stack: err.stack,
    statusCode,
    url: req.originalUrl,
    method: req.method,
  });

  const errorPayload: Record<string, unknown> = {
    message,
  };

  if (details !== undefined) {
    errorPayload.details = details;
  }

  if (env.NODE_ENV === 'development') {
    errorPayload.stack = err.stack;
  }

  const responsePayload = {
    success: false,
    error: errorPayload,
  };

  res.status(statusCode).json(responsePayload);
};
export default errorHandler;
