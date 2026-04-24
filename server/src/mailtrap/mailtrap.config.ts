import { configDotenv } from "dotenv";
configDotenv()
const { MailtrapClient } = require("mailtrap");

const TOKEN = process.env.MAIL_TRAP_TOKEN; ;

export const mailTrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Tri-Scope",
};



