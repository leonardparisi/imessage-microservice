import axios from "axios";
import localtunnel from "localtunnel";
import { logger } from "./logging";
import { AxiosRequestConfig } from "axios";

export async function openTunnel() {
  const tunnel = await localtunnel({ port: Number(process.env.PORT!) });
  logger.info("Opened tunnel", { url: tunnel.url });
  tunnel.on("close", () => {
    logger.info("Closed tunnel");
  });
  return tunnel.url;
}

export async function updateTunnelURL(tunnelUrl: string) {
  var data = JSON.stringify({
    id: process.env.AIRPLANE_ID,
    name: "iMessage API",
    slug: "imessage_api",
    kind: "rest",
    resource: {
      baseURL: tunnelUrl,
      headers: {
        "API-Key": process.env.API_KEY,
      },
      secretHeaders: [],
      auth: null,
    },
    isPrivate: false,
    permissions: [],
  });

  var config: AxiosRequestConfig = {
    method: "post",
    url: "https://api.airplane.dev/i/resources/update",
    headers: {
      authority: "api.airplane.dev",
      accept: "application/json",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      cookie: process.env.AIRPLANE_COOKIE,
      origin: "https://app.airplane.dev",
      referer: "https://app.airplane.dev/",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
      "x-airplane-env-id": process.env.AIRPLANE_ENV_ID,
      "x-team-id": process.env.AIRPLANE_TEAM_ID,
    },
    data: data,
  };

  axios(config)
    .then(function (response: any) {
      logger.info("Updated tunnel URL on Airplane.dev");
    })
    .catch(function (error: any) {
      console.log(error);
    });
}
