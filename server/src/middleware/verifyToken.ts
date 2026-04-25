import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

interface JwtPayload {
  userId: number;
  iat?: number;
  exp?: number;
}

export const verifyToken = (
  req: Request & { userId?: number },
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No authorization token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    req.userId = decoded.userId;
    next();
  } catch (error: any) {
    console.error(`JWT Error: ${error.message}`);

    return res.status(401).json({
      success: false,
      message: "Unauthorized - invalid or expired token",
    });
  }
};
