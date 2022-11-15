import { send_text } from "./helpers/send_text";

export function setup_routes(app: any) {
  app.post("/send_text", (req: any, res: any) => {
    const { phone_number, message, minute_variance, date_to_send } = req.body;
    send_text(
      phone_number,
      Array.isArray(message) ? message : [message],
      minute_variance,
      date_to_send
    );
    res.send("ok");
  });

  app.get("/tunnel_url", (req: any, res: any) => {
    res.send(app.get("tunnel_url"));
  });
}
