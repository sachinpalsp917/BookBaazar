import { BAD_REQUEST } from "../constants/httpStatusCode";

abstract class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    public message: string
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends AppError {
  constructor(message: string = "Bad request") {
    super(BAD_REQUEST, "BAD_REQUEST", message);
  }
}

export { AppError, BadRequestError };
