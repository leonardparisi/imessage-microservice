import { exec } from "node:child_process";
import { addMinutes, isPast, differenceInMilliseconds } from "date-fns";
import { logger } from "./logging";

export function send_text(
  phone_number: string,
  message_options: string[],
  minute_variance = 0,
  date = new Date()
) {
  const date_to_send = addMinutes(date, Math.random() * minute_variance);

  const message_to_send =
    message_options[Math.floor(Math.random() * message_options.length)];

  const delay = isPast(date_to_send)
    ? 0
    : differenceInMilliseconds(date_to_send, new Date());

  logger.info("Sending text", {
    phone_number,
    message: message_to_send,
    date,
    delay,
  });

  setTimeout(() => {
    exec(
      `osascript scripts/send_text.applescript ${phone_number} "${message_to_send}"`,
      (err: any) => {
        if (err) {
          console.error("could not execute command: ", err);
          return;
        }
      }
    );
  }, delay);
}
