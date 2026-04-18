import { dataBase } from "config/db";
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";

export const registerUser = async (
  email: string,
  password: any,
  username: string,
) => {
  try {
    const registerd = await dataBase.query(
      `SELECT * FROM users WHERE email=$1 RETURNING *`,
      [email],
    );
    if (registerd.rows.length == 0) {
      const hashedPassword = await bcrypt.hash(password, 10);
      if (hashedPassword) {
        dataBase.query(
          `INSERT INTO users  ("userEmail","userName","hashedUserPassword") VALUES ($1,$2,$3)`,
          [email, username, hashedPassword],
        );
      }
    }
    throw { message: "User already exist." };
  } catch (error) {
    throw { message: "Failed to hash password." };
  }
};

export const signIn = async () => {
  passport.use(
    "local",
    new Strategy(async function verify(username, password, cb) {
      try {
        const result = await dataBase.query(
          "SELECT * FROM users WHERE email = $1 ",
          [username],
        );
        if (result.rows.length > 0) {
          const storedHashedPassword = result.rows[0].password;
          bcrypt.compare(password, storedHashedPassword, (err, valid) => {
            if (err) {
              //Error with password check
              console.error("Error comparing passwords:", err);
              return cb(err);
            } else {
              if (valid) {
                //Passed password check
                return cb(null, result.rows[0]);
              } else {
                //Did not pass password check
                return cb(null, false);
              }
            }
          });
        } else {
          return cb("User not found");
        }
      } catch (error) {
        throw { message: "Failed to query to the db" };
      }
    }),
  );
};
