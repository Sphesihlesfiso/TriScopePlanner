import { configDotenv } from "dotenv";
configDotenv();

import { MailtrapClient } from "mailtrap";

const TOKEN = process.env.MAIL_TRAP_TOKEN!;

export const mailTrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "noreply@triscopeplaner.xyz",
  name: "Tri-Scope",
};
