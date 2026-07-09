import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime();
  const requestId = req.headers['x-request-id'] as string;

  res.on('finish', () => {
    const diff = process.hrtime(start);
    const durationMs = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(3);
    const { method, originalUrl } = req;
    const { statusCode } = res;

    logger.info(`${method} ${originalUrl} ${statusCode} - ${durationMs}ms`, {
      requestId,
      method,
      url: originalUrl,
      status: statusCode,
      responseTime: parseFloat(durationMs),
    });
  });

  next();
};
export default requestLogger;
