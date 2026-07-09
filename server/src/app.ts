import express from 'express';
import requestId from './middleware/request-id';
import compressionMiddleware from './middleware/compression';
import securityMiddleware from './middleware/security';
import requestLogger from './middleware/req-logger';
import errorHandler from './errors/middleware';
import { NotFoundError } from './errors/app-error';
import { env } from './config/env';

const app = express();

// Set up correlation IDs, compression, security settings, and body parsers
app.use(requestId);
app.use(compressionMiddleware);
app.use(securityMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Attach HTTP request logs tracker
app.use(requestLogger);

// Foundational Route: GET /health
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'healthy',
    version: '1.0.0',
    environment: env.NODE_ENV,
    uptime: `${process.uptime().toFixed(3)}s`,
    timestamp: new Date().toISOString(),
  });
});

// Fallback catch-all route yielding NotFoundError
app.use((req, _res, next) => {
  next(new NotFoundError(`Cannot ${req.method} ${req.originalUrl}`));
});

// Attach centralized global error handler middleware
app.use(errorHandler);

export default app;
