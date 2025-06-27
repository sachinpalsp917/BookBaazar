import winston from "winston";
import morgan from "morgan";
import path from "path";

const logDir = path.join(__dirname, "..", "logs");

const { combine, timestamp, json, colorize, simple } = winston.format;

//create a logger for general logs
export const infoLogger = winston.createLogger({
  level: "info",
  format: combine(timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }), json()),
  transports: [
    // save logs to file
    new winston.transports.File({
      filename: path.join(logDir, "info.log"),
      level: "info",
    }),
    //Also log to console
    new winston.transports.Console({
      format: combine(
        timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }),
        colorize(),
        simple()
      ),
    }),
  ],
});

export const errorLogger = winston.createLogger({
  level: "error",
  format: combine(timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }), json()),
  transports: [
    // save logs to file
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),
    //Also log to console
    new winston.transports.Console({
      format: combine(
        timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }),
        colorize(),
        simple()
      ),
    }),
  ],
});

// morgan middleware for logging HTTP request using winston
export const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    stream: {
      write: (message) => {
        const status = parseInt(message.split(" ")[2], 10);
        if (status >= 400) {
          errorLogger.error(message.trim());
        } else {
          infoLogger.info(message.trim());
        }
      },
    },
  }
);

process.on("exit", () => {
  errorLogger.end();
  infoLogger.end();
});
