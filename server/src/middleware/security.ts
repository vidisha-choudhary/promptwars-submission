import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from '../config/env';

export const securityMiddleware = [
  helmet(),
  cors(),
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: env.NODE_ENV === 'test' ? 10000 : 100, // High rate limit threshold in test environments
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      error: {
        message: 'Too many requests from this IP, please try again after 15 minutes',
      },
    },
  }),
];
export default securityMiddleware;
