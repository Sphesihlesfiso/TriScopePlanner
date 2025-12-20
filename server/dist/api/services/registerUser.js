"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const db_1 = require("../../config/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const registerUser = async (req, res) => {
    const { user_email, user_name, plain_user_password } = req.body;
    console.log(req.body);
    try {
        const result = await db_1.dataBase.query("SELECT * FROM users WHERE user_email=$1", [user_email]);
        if (result.rows.length == 0) {
            try {
                bcrypt_1.default.hash(plain_user_password, saltRounds, async function (err, hash) {
                    // Store hash in your password DB.
                    if (!err) {
                        const results = await db_1.dataBase.query("INSERT INTO users (user_email, user_name, hashed_user_password) VALUES($1,$2,$3)", [user_email, user_name, hash]);
                        res.send(results);
                    }
                });
            }
            catch (error) {
                console.error(error);
                console.log("Failed to insert user into dataBase");
            }
        }
        else {
            res.send("<p>Email is already registerd please log in!</p>");
        }
    }
    catch (error) {
        console.error(error);
        res.send("Failed to register user.");
    }
};
exports.registerUser = registerUser;
