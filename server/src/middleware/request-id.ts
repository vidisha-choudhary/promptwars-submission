import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const requestId = (req: Request, res: Response, next: NextFunction) => {
  const headerName = 'x-request-id';
  const id = (req.headers[headerName] || uuidv4()) as string;
  req.headers[headerName] = id;
  res.setHeader(headerName, id);
  next();
};
export default requestId;
