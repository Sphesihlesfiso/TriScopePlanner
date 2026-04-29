"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sender = exports.mailTrapClient = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const { MailtrapClient } = require("mailtrap");
const TOKEN = process.env.MAIL_TRAP_TOKEN;
;
exports.mailTrapClient = new MailtrapClient({
    token: TOKEN,
});
exports.sender = {
    email: "hello@demomailtrap.co",
    name: "Tri-Scope",
};
