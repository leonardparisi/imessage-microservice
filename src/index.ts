import express from "express";
import winston from "winston";
import { api_key } from "./helpers/api_key_middleware";
import { logger } from "./helpers/logging";
import { openTunnel, updateTunnelURL } from "./helpers/tunnels";
import { setup_routes } from "./routes";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// public route to ensure the app is running
app.get("/", (req, res) => {
  res.send({
    environment: process.env.NODE_ENV ?? "development",
  });
});

app.use(api_key());

setup_routes(app);

app.listen(port, () => {
  logger.info(`App listening`, { port });
});

if (process.env.NODE_ENV === "production") {
  (async () => {
    const tunnelURL = await openTunnel();
    app.set("tunnel_url", tunnelURL);
    updateTunnelURL(tunnelURL);
  })();
}

// If we're not in production then log to the `console`
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
