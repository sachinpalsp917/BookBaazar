import { BAD_REQUEST, CONFLICT } from "../constants/httpStatusCode";

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

class ConflictError extends AppError {
  constructor(message: string = "Conflict") {
    super(CONFLICT, "CONFLICT", message);
  }
}

export { AppError, BadRequestError, ConflictError };
