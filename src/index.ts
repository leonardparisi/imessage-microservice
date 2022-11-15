import express from "express";
import winston from "winston";
import { logger } from "./helpers/logging";
import { setup_routes } from "./routes";
const app = express();
const port = 3000;
app.use(express.json());
setup_routes(app);
app.listen(port, () => {
  logger.info(`App listening`, { port });
});
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.prettyPrint()
      ),
    })
  );
}
