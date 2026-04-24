import bcrypt from "bcrypt";
import { dataBase } from "../config/db"; // adjust import to your setup
import { generateToken } from "utils/generateToken.utils";

export const register = async (
  email: string,
  password: string,
  username: string,
) => {
  try {
    const verificationToken = Math.floor(
      10000 + Math.random() * 30000,
    ).toString();
    const tokenExpiration = new Date(Date.now() + 15 * 60 * 1000);

    // Check if user already exists
    const existingUser = await dataBase.query(
      `SELECT * FROM users WHERE "userEmail" = $1`,
      [email],
    );

    if (existingUser.rows.length > 0) {
      throw { message: "User already exists." };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const newUser = await dataBase.query(
      `INSERT INTO users ("userEmail", "userName", "hashedUserPassword","verificationToken","tokenExpiration") 
       VALUES ($1, $2, $3,$4,$5) RETURNING *`,
      [email, username, hashedPassword, verificationToken, tokenExpiration],
    );

    return newUser.rows[0]; // return the created user
  } catch (error) {
    console.error("Registration error:", error);
    throw { message: "Registration failed.", error };
  }
};
export const verifyMail = async (verificationToken: number) => {
  try {
    const unverifedUser = await dataBase.query(
      `UPDATE  users SET "verifiedUser" =$2 WHERE "verificationToken" = $1 RETURNING *`,
      [verificationToken, true],
    );
    if (!unverifedUser) return null;
    return unverifedUser.rows[0];
  } catch (error: any) {
    console.error(`Failed to verify user:${error?.message}`);
  }
};
export const changePassword = async (password: string, userEmail: number) => {
  try {
    const existingUser = await dataBase.query(
      `SELECT * FROM users WHERE "userEmail" = $1 AND "verifiedUser"=$2`,
      [userEmail, true],
    );
    const oldUserPassword = existingUser.rows[0].hashedUserPassword;
    console.log("old user password ", oldUserPassword);
    const newHashedPassword = await bcrypt.hash(password, 10);
    if (existingUser.rows.length > 0) {
      const user = await dataBase.query(
        `UPDATE users SET "hashedUserPassword"=$1 WHERE "userEmail"=$2 RETURNING *`,
        [newHashedPassword, userEmail],
      );

      return user.rows[0];
    } else {
      throw "Can't change password , user not registered";
    }
  } catch (error: any) {
    console.error(`Failed to reset password: ${error?.message}`);
  }
};
