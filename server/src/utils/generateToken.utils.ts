import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();
// import type {User} from "../../../client/src/types/index"
import { Response } from "express";
export const generateToken = async (res: Response, userId: string | number) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true, //css attacks ,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
};
