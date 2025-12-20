import { Request, Response } from "express";
import { dataBase } from "./db";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";


passport.use(
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await dataBase.query(
        "SELECT * FROM users WHERE user_email=$1",
        [username]
      );
      if (result.rows.length > 0) {
        const user = result.rows[0];

        bcrypt.compare(
          password,
          user.hashed_user_password,
          function (err, result) {
            // result == true
            if (result) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        );
      } else {
        return cb(null, false);
      }
    } catch (error) {
      console.error(error);
      return cb(error);
    }
  })
);
export default passport