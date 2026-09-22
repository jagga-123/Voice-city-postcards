/**
 * Typed error shape used by the global error handler. Any thrown/forwarded
 * error may optionally carry a `statusCode`; when it doesn't, the handler
 * falls back to 500. Kept intentionally small — extend as real endpoints
 * are added.
 */
export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

/** Error shape accepted by the error-handling middleware, without resorting to `any`. */
export interface HttpError extends Error {
  statusCode?: number;
}
