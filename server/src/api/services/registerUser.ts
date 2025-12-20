import { Request, Response } from "express";
import { dataBase } from "../../config/db";
import bcrypt from "bcrypt";

const saltRounds = 10;
export const registerUser = async (req: Request, res: Response) => {
  const { user_email, user_name, plain_user_password } = req.body;
  console.log(req.body);
  try {
    const result = await dataBase.query(
      "SELECT * FROM users WHERE user_email=$1",
      [user_email]
    );

    if (result.rows.length == 0) {
      try {
        bcrypt.hash(
          plain_user_password,
          saltRounds,
          async function (err, hash) {
            // Store hash in your password DB.
            if (!err) {
              const results = await dataBase.query(
                "INSERT INTO users (user_email, user_name, hashed_user_password) VALUES($1,$2,$3)",
                [user_email, user_name, hash]
              );
              res.send(results);
            }
          }
        );
      } catch (error) {
        console.error(error);
        console.log("Failed to insert user into dataBase");
      }
    } else {
      res.send("<p>Email is already registerd please log in!</p>");
    }
  } catch (error) {
    console.error(error);
    res.send("Failed to register user.");
  }
};
