

import bcrypt from "bcrypt";
import { dataBase } from "../config/db"; // adjust import to your setup

export const register = async (
  email: string,
  password: string,
  username: string,
) => {
  try {
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
      `INSERT INTO users ("userEmail", "userName", "hashedUserPassword") 
       VALUES ($1, $2, $3) RETURNING *`,
      [email, username, hashedPassword],
    );

    return newUser.rows[0]; // return the created user
  } catch (error) {
    console.error("Registration error:", error);
    throw { message: "Registration failed.", error };
  }
};

