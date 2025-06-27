import express, { Application } from "express";
import cors from "cors";
import { APP_ORIGIN } from "./constants/env";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { morganMiddleware } from "./utils/logging";
import { OK } from "./constants/httpStatusCode";
import errorHandler from "./middleware/errorHandler";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(helmet());
app.use(morganMiddleware);

app.get("/health", (_, res) => {
  res.status(OK).send("Healthy");
});

app.use(errorHandler);
export default app;
