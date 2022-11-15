import { logger } from "./helpers/logging";
import { send_text } from "./helpers/send_text";

export function setup_routes(app: any) {
  app.post("/send_text", (req: any, res: any) => {
    logger.info("Send text recieved", { body: req.body });
    const { phone_number, message, minute_variance, date_to_send } = req.body;
    const message_options = message.split(" * ");
    send_text(phone_number, message_options, minute_variance, date_to_send);
    res.send("ok");
  });

  app.get("/tunnel_url", (req: any, res: any) => {
    res.send(app.get("tunnel_url"));
  });
}
