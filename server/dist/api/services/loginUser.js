"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const db_1 = require("../../config/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const express_session_1 = __importDefault(require("express-session"));
const app_1 = __importDefault(require("../../app"));
app_1.default.use((0, express_session_1.default)({
    secret: "super-secret-key", // ✅ this is valid
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60,
    },
}));
app_1.default.use(passport_1.default.session());
const loginUser = async (req, res) => {
    passport_1.default.authenticate("local", {
        successRedirect: "/googlecalender/task/:id",
        failureRedirect: "/login",
    });
};
exports.loginUser = loginUser;
passport_1.default.use(new passport_local_1.Strategy(async function verify(username, password, cb) {
    try {
        const result = await db_1.dataBase.query("SELECT * FROM users WHERE user_email=$1", [username]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            bcrypt_1.default.compare(password, user.hashed_user_password, function (err, result) {
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
        return cb(error);
    }
}));
