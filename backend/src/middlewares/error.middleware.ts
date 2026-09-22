import type { Request, Response, NextFunction } from 'express';
import type { HttpError } from '../utils/ApiError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Express only
// recognizes 4-arg middleware as an error handler; `next` must stay in the
// signature even though it is never called (there is nothing after this
// handler in the chain).
export const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
