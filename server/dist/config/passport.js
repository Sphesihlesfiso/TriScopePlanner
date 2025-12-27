"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
passport_1.default.use(new passport_local_1.Strategy(async function verify(username, password, cb) {
    try {
        const result = await db_1.dataBase.query("SELECT * FROM users WHERE user_email=$1", [username]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            bcrypt_1.default.compare(password, user.hashed_user_password, (err, result) => {
                // result == true
                if (result) {
                    return cb(null, user);
                }
                else {
                    return cb(null, false);
                }
            });
        }
        else {
            return cb(null, false);
        }
    }
    catch (error) {
        console.error(error);
        return cb("User not found.");
    }
}));
exports.default = passport_1.default;
