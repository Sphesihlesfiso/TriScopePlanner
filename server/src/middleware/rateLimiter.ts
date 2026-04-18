import { NextFunction, Request, Response } from "express";
import { rateLimit } from "../config/upstash";
export const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { success } = await rateLimit.limit("user-id");
    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many request please try again later." });
    }
    next();
  } catch (error) {
    console.error("Error in the rate limiting middleware", error);
  }
};
