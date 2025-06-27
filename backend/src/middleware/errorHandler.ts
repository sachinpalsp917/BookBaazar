import { ErrorRequestHandler } from "express";
import { INTERNAL_SERVER_ERROR } from "../constants/httpStatusCode";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(`PATH: ${req.path}`, err);
  res.status(INTERNAL_SERVER_ERROR).send("Internal server error");
};

export default errorHandler;
