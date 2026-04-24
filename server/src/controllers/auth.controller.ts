import { NextFunction, Request, Response } from "express";
import { changePassword, register } from "@services/auth.service";
import passport from "passport";
import { generateToken } from "utils/generateToken.utils";
import {
  sendPassowordResertEmail,
  sendPassowordResertSuccessEmail,
  sendVerificationEmail,
} from "mailtrap/emails";
import { verifyMail } from "../services/auth.service";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;
    const { userId, verificationToken, userEmail } = await register(
      email,
      password,
      username,
    );
    await generateToken(res, userId);
    await sendVerificationEmail(userEmail, verificationToken);

    res
      .status(201)
      .json({ success: true, message: "Successfully registered user." });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to register user.", error });
  }
};
export const verifyUserEmail = async (req: Request, res: Response) => {
  const { verificationToken } = req.body;

  try {
    const user = await verifyMail(verificationToken);
    if (user)
      res
        .status(204)
        .json({ success: true, message: "Successfully verified user email." });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to verified user email." + error,
    });
  }
};
export const sendPasswordresertEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    await sendPassowordResertEmail(
      email,
      "http://localhost:3000/auth/reset-password",
    );
    res.status(200).json({
      success: true,
      message: "Successfully sent user password resert link.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send reset user password link." + error,
    });
  }
};
export const makeNewUserPassword = async (req: Request, res: Response) => {
  try {
    const { newPassword, email } = req.body;
    await changePassword(newPassword, email);
    await sendPassowordResertSuccessEmail(email)
    res.status(201).json({ success: true, message: "Changed user password." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to reset user password." + error,
    });
  }
};
export const signInUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate("local", (err: any, user: any) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({ message: "Login failed" });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);

      res.json({
        success: true,
        user,
      });
    });
  })(req, res, next);
};
export const signOut = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // If no user is logged in, respond immediately
  if (!req.user) {
    return res
      .status(200)
      .json({ success: true, message: "No active session." });
  }

  // Passport 0.6+ requires a callback
  req.logOut((err) => {
    if (err) return next(err);

    // Destroy session on server and clear cookie on client
    req.session?.destroy((err) => {
      if (err) return next(err);

      res.clearCookie("connect.sid"); // or your session cookie name
      return res
        .status(200)
        .json({ success: true, message: "Successfully logged out." });
    });
  });
};
