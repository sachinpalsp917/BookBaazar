import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodRawShape } from "zod";
import { BadRequestError } from "../lib/errors";

const validate = (
  schema: ZodObject<ZodRawShape>,
  validateQuery: boolean = false
) => {
  return (req: Request, _: Response, next: NextFunction) => {
    const input = validateQuery ? req.query : req.body;
    const result = schema.safeParse(input);

    if (!result.success) {
      const message = result.error.errors[0]?.message || "Invalid request";
      throw new BadRequestError(message);
    }

    if (validateQuery) {
      req.query = result.data;
    } else {
      req.body = result.data;
    }

    next();
  };
};

export default validate;
