import winston from 'winston';
import { env } from '../config/env';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const developmentFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => {
    const { timestamp, level, message, stack, requestId, ...meta } = info;
    const reqInfo = requestId ? ` [ReqID: ${requestId}]` : '';
    const metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level}]${reqInfo}: ${message}${metaString}${stack ? `\n${stack}` : ''}`;
  }),
);

const productionFormat = winston.format.combine(
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  env.NODE_ENV === 'development' ? developmentFormat : productionFormat,
);

const transports = [
  new winston.transports.Console({
    silent: env.NODE_ENV === 'test', // Suppress console logs during automated test runs
  }),
];

export const logger = winston.createLogger({
  level: env.NODE_ENV === 'development' ? 'debug' : 'info',
  levels,
  format,
  transports,
});
export default logger;
