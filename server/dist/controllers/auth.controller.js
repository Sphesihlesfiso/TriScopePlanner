"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.signInUser = exports.makeNewUserPassword = exports.sendPasswordresertEmail = exports.verifyUserEmail = exports.registerUser = void 0;
const auth_service_1 = require("@services/auth.service");
const generateToken_utils_1 = require("utils/generateToken.utils");
const emails_1 = require("mailtrap/emails");
const auth_service_2 = require("../services/auth.service");
const registerUser = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const { userId, verificationToken, userEmail } = await (0, auth_service_1.register)(email, password, username);
        await (0, generateToken_utils_1.generateToken)(res, userId);
        await (0, emails_1.sendVerificationEmail)(userEmail, verificationToken);
        res
            .status(201)
            .json({ success: true, message: "Successfully registered user." });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Failed to register user.", error });
    }
};
exports.registerUser = registerUser;
const verifyUserEmail = async (req, res) => {
    const { verificationToken } = req.body;
    try {
        const user = await (0, auth_service_2.verifyMail)(verificationToken);
        if (user)
            return res
                .status(200)
                .json({ success: true, message: "Successfully verified user email." });
        res.status(401).json({
            success: false,
            message: "Wrong or expired token",
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to verified user email." + error,
        });
    }
};
exports.verifyUserEmail = verifyUserEmail;
const sendPasswordresertEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const resetToken = crypto.randomUUID();
        const resetTokenExpiration = new Date(Date.now() + 60 * 60 * 1000);
        (0, auth_service_2.saveResertToken)(resetToken, resetTokenExpiration, email);
        await (0, emails_1.sendPassowordResertEmail)(email, `${process.env.CLIENT_URL}/auth/reset-password/${resetToken}`);
        res.status(200).json({
            success: true,
            message: "Successfully sent user password resert link.",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to send reset user password link." + error,
        });
    }
};
exports.sendPasswordresertEmail = sendPasswordresertEmail;
const makeNewUserPassword = async (req, res) => {
    try {
        const { newPassword, email } = req.body;
        const { resertToken } = req.params;
        await (0, auth_service_1.changePassword)(newPassword, resertToken);
        await (0, emails_1.sendPassowordResertSuccessEmail)(email);
        res.status(201).json({ success: true, message: "Changed user password." });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to reset user password." + error,
        });
    }
};
exports.makeNewUserPassword = makeNewUserPassword;
const signInUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userId = await (0, auth_service_1.signIn)(email, password);
        await (0, generateToken_utils_1.generateToken)(res, userId);
        res
            .status(200)
            .json({ success: true, message: "Successfully logged in user." });
    }
    catch (error) {
        console.error(`Failed to log-in user ${error?.message}`);
        res.status(500).json({ success: false, message: "Failed to log in user." });
    }
};
exports.signInUser = signInUser;
const signOut = async (req, res) => {
    try {
        res.clearCookie("token");
        res
            .status(200)
            .json({ success: true, message: "Successfully logged out user." });
    }
    catch (error) {
        console.error(`Failed to logout user ${error}`);
        res
            .status(500)
            .json({ success: false, message: "Failed to log out user." });
    }
};
exports.signOut = signOut;
