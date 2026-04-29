"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.saveResertToken = exports.verifyMail = exports.signIn = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../config/db");
const register = async (email, password, username) => {
    try {
        const verificationToken = Math.floor(10000 + Math.random() * 30000).toString();
        const tokenExpiration = new Date(Date.now() + 15 * 60 * 1000);
        // Check if user already exists
        const existingUser = await db_1.dataBase.query(`SELECT * FROM users WHERE "userEmail" = $1`, [email]);
        if (existingUser.rows.length > 0) {
            throw { message: "User already exists." };
        }
        // Hash password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Insert new user
        const newUser = await db_1.dataBase.query(`INSERT INTO users ("userEmail", "userName", "hashedUserPassword","verificationToken","tokenExpiration") 
       VALUES ($1, $2, $3,$4,$5) RETURNING *`, [email, username, hashedPassword, verificationToken, tokenExpiration]);
        return newUser.rows[0]; // return the created user
    }
    catch (error) {
        console.error("Registration error:", error);
        throw { message: "Registration failed.", error };
    }
};
exports.register = register;
const signIn = async (email, password) => {
    try {
        const result = await db_1.dataBase.query(`SELECT * FROM users WHERE "userEmail" = $1`, [email]);
        if (result.rows.length === 0) {
            throw { message: "User not found" };
        }
        const user = result.rows[0];
        const match = await bcrypt_1.default.compare(password, user.hashedUserPassword);
        if (!match) {
            throw { message: "Wrong password credentials" };
        }
        return user.userId;
    }
    catch (error) {
        throw error;
    }
};
exports.signIn = signIn;
const verifyMail = async (verificationToken) => {
    try {
        const unverifedUser = await db_1.dataBase.query(`UPDATE  users SET "verifiedUser" =$2 WHERE "verificationToken" = $1 RETURNING *`, [verificationToken, true]);
        if (!unverifedUser)
            return null;
        return unverifedUser.rows[0];
    }
    catch (error) {
        console.error(`Failed to verify user:${error?.message}`);
    }
};
exports.verifyMail = verifyMail;
const saveResertToken = async (resertToken, resertTokenExpiration, userEmail) => {
    try {
        const savedToken = await db_1.dataBase.query(`UPDATE users
          SET "resetToken" = $2,
              "resetTokenExpiration" = $3
          WHERE "userEmail" = $1
          RETURNING *`, [userEmail, resertToken, resertTokenExpiration]);
        return savedToken.rows[0];
    }
    catch (error) {
        throw error;
    }
};
exports.saveResertToken = saveResertToken;
const changePassword = async (password, resertToken) => {
    try {
        const existingUser = await db_1.dataBase.query(`SELECT * FROM users WHERE "resertToken" = $1`, [resertToken]);
        console.log(existingUser);
        if (!existingUser.rows.length) {
            return "Token not found or expired.";
        }
        const oldUserPassword = existingUser.rows[0].hashedUserPassword;
        console.log("old user password ", oldUserPassword);
        const newHashedPassword = await bcrypt_1.default.hash(password, 10);
        if (existingUser.rows.length > 0) {
            const user = await db_1.dataBase.query(`UPDATE users SET "hashedUserPassword"=$1 WHERE "resertToken"=$2 RETURNING *`, [newHashedPassword, resertToken]);
            return user.rows[0];
        }
        else {
            throw "Can't change password , user not registered";
        }
    }
    catch (error) {
        console.error(`Failed to reset password: ${error?.message}`);
    }
};
exports.changePassword = changePassword;
