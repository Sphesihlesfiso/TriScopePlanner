import { dataBase } from "config/db";
import { Response, Request } from "express";
export const registerUser = async (req: Request, res: Response) => {
  const { user_email, user_name, hashed_user_password } = req.body;
  try {
    const result = await dataBase.query(
      "SELECT * FROM users WHERE user_email=$1",
      [user_email]
    );
    if (result.rows.length == 0) {
      try {
        const results = await dataBase.query(
          "INSERT INTO users VALUES($1,$2,$3)",
          [user_email, user_name, hashed_user_password]
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      res.send("<p>Email is already registerd please log in!</p>");
    }
  } catch (error) {
    console.error(error);
  }
};
