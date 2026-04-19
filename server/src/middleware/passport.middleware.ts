import { dataBase } from "config/db";
import passport from "passport";
import session from "express-session";

import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import { configDotenv } from "dotenv";
configDotenv();

export const sessionInitializer = session({
  secret: "sphesihle",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 5 },
});
passport.serializeUser((user: any, cb) => {
  cb(null, user.userId);
});

passport.deserializeUser(async (userId: number, cb) => {
  const result = await dataBase.query(
    `SELECT * FROM users WHERE "userId" = $1`,
    [userId],
  );
  cb(null, result.rows[0]);
});
passport.use(
  new Strategy(
  {
    usernameField: "userEmail", // 🔥 REQUIRED
  },
  async (email, password, cb) => {
    console.log("EMAIL RECEIVED:", email);

    const result = await dataBase.query(
      `SELECT * FROM users WHERE "UserEmail" = $1`,
      [email]
    );
    console.log("EMAIL RECEIVED:", result);

    if (result.rows.length === 0) {
      return cb(null, false, { message: "User not found" });
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return cb(null, false, { message: "Wrong password" });
    }

    return cb(null, user);
  }
)
)
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
