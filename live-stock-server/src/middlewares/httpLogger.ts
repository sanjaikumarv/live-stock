import morgan from "morgan";
import logger from "../lib/logger";

logger.stream = {
  write: (message) =>
    logger.info(message.substring(0, message.lastIndexOf("\n"))),
} as any;

export default morgan(
  ":method :url :status :response-time ms - :res[content-length]" as any,
  // @ts-ignore
  { stream: logger.stream }
);
