"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionInitializer = void 0;
const db_1 = require("config/db");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const passport_local_1 = require("passport-local");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
exports.sessionInitializer = (0, express_session_1.default)({
    secret: "sphesihle",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 5 },
});
passport_1.default.serializeUser((user, cb) => {
    console.log("SERIALIZE USER:", user);
    cb(null, user.userId);
});
passport_1.default.deserializeUser(async (userId, cb) => {
    const result = await db_1.dataBase.query(`SELECT * FROM users WHERE "userId" = $1`, [userId]);
    console.log(result);
    cb(null, result.rows[0]);
});
passport_1.default.use(new passport_local_1.Strategy({ usernameField: "email" }, async (email, password, cb) => {
    const result = await db_1.dataBase.query(`SELECT * FROM users WHERE "userEmail" = $1`, [email]);
    if (result.rows.length === 0) {
        return cb(null, false, { message: "User not found" });
    }
    const user = result.rows[0];
    const match = await bcrypt_1.default.compare(password, user.hashedUserPassword);
    if (!match) {
        return cb(null, false, { message: "Wrong password" });
    }
    return cb(null, user);
}));
// export const authenticate= passport.authenticate("local",{
//     successRedirect:"/",
//     failureRedirect:"/sign-in"
// })
// passport.use(new GoogleStrategy({
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.SERVER_URL + "/auth/google/callback"
//   },
//   async (accessToken, refreshToken, profile, cb) => {
//         // profile contains user info from Google
//         let newUser;
//         try {
//         const result =await dataBase.query("SELECT * FROM users WHERE email=$1",[profile.emails[0].value])
//         if (result.rows.length ===0){
//           newUser =await dataBase.query("INSERT INTO users (email,password) VALUES ($1,$2)",[profile.emails[0].value,"google"])
//           cb(null,newUser.rows[0])
//         }else{
//           cb(null,result.rows[0])
//         }
//         } catch (error) {
//           cb(error)
//         }
//       }
//     )
// )
