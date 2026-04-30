import bcrypt from "bcrypt";
import { dataBase } from "../config/db";
import { json } from "stream/consumers";

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
export const signIn = async (email: string, password: string) => {
  try {
    const result = await dataBase.query(
      `SELECT * FROM users WHERE "userEmail" = $1`,
      [email],
    );

    if (result.rows.length === 0) {
      throw { message: "User not found" };
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.hashedUserPassword);

    if (!match) {
      throw { message: "Wrong password credentials" };
    }

    return user.userId;
  } catch (error) {
    throw error;
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
export const saveResertToken = async (
  resertToken: string,
  resertTokenExpiration: Date,
  userEmail: string,
) => {
  try {
    const savedToken = await dataBase.query(
      `UPDATE users
          SET "resetToken" = $2,
              "resetTokenExpiration" = $3
          WHERE "userEmail" = $1
          RETURNING *`,
      [userEmail, resertToken, resertTokenExpiration],
    );
    return savedToken.rows[0];
  } catch (error) {
    throw error;
  }
};
export const changePassword = async (password: string, resertToken: string) => {
  try {
    const existingUser = await dataBase.query(
      `SELECT * FROM users WHERE "resetToken" = $1`,
      [resertToken],
    );

    if (!existingUser.rows.length) {
      return "Token not found or expired.";
    }

    const newHashedPassword = await bcrypt.hash(password, 10);
    if (existingUser.rows.length > 0) {
      const user = await dataBase.query(
        `UPDATE users SET "hashedUserPassword"=$1 WHERE "resetToken"=$2 RETURNING *`,
        [newHashedPassword, resertToken],
      );

      return user.rows[0];
    } else {
      throw "Can't change password , user not registered";
    }
  } catch (error: any) {
    console.error(`Failed to reset password: ${error?.message}`);
  }
};
export const getUserEmail = async (token: string) => {
  try {
    const user = await dataBase.query(
      `SELECT from users WHERE "resetToken"=$1`,
      [token],
    );
    console.log(`this is the user ${user}`);
    return user.rows[0];
  } catch (error) {
    console.error(`Failed to get email using token error ${error}`);
  }
};
