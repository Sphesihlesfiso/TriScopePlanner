"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPassowordResertSuccessEmail = exports.sendPassowordResertEmail = exports.sendVerificationEmail = void 0;
const emailTemplates_1 = require("./emailTemplates");
const mailtrap_config_1 = require("./mailtrap.config");
const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrap_config_1.mailTrapClient.send({
            from: mailtrap_config_1.sender,
            to: recipient,
            subject: "Verify your email",
            html: emailTemplates_1.VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email verification",
        });
    }
    catch (error) {
        throw new Error(`Email failed: ${error.message}`);
    }
};
exports.sendVerificationEmail = sendVerificationEmail;
const sendPassowordResertEmail = async (email, resetUrl) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrap_config_1.mailTrapClient.send({
            from: mailtrap_config_1.sender,
            to: recipient,
            subject: "Resert your password",
            html: emailTemplates_1.PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
            category: "Email password resert",
        });
    }
    catch (error) {
        throw new Error(`Email failed: ${error.message}`);
    }
};
exports.sendPassowordResertEmail = sendPassowordResertEmail;
const sendPassowordResertSuccessEmail = async (email) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrap_config_1.mailTrapClient.send({
            from: mailtrap_config_1.sender,
            to: recipient,
            subject: "Successfull password resert",
            html: emailTemplates_1.PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Email confirmation",
        });
    }
    catch (error) {
        throw new Error(`Email failed: ${error.message}`);
    }
};
exports.sendPassowordResertSuccessEmail = sendPassowordResertSuccessEmail;
