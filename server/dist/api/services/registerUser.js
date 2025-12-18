"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const db_1 = require("config/db");
const registerUser = async (req, res) => {
    const { user_email, user_name, hashed_user_password } = req.body;
    try {
        const result = await db_1.dataBase.query("SELECT * FROM users WHERE user_email=$1", [user_email]);
        if (result.rows.length == 0) {
            try {
                const results = await db_1.dataBase.query("INSERT INTO users VALUES($1,$2,$3)", [user_email, user_name, hashed_user_password]);
            }
            catch (error) {
                console.error(error);
            }
        }
        else {
            res.send("<p>Email is already registerd please log in!</p>");
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.registerUser = registerUser;
