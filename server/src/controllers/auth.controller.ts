import { NextFunction, Request, Response } from "express";
import {
  changePassword,
  getUserEmail,
  register,
  signIn,
} from "@services/auth.service";
import { generateToken } from "utils/generateToken.utils";
import {
  sendPassowordResertEmail,
  sendPassowordResertSuccessEmail,
  sendVerificationEmail,
} from "../mailtrap/emails";
import { verifyMail, saveResertToken } from "../services/auth.service";

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
      return res
        .status(200)
        .json({ success: true, message: "Successfully verified user email." });
    res.status(401).json({
      success: false,
      message: "Wrong or expired token",
    });
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
    const resetToken = crypto.randomUUID();
    const resetTokenExpiration = new Date(Date.now() + 60 * 60 * 1000);
    saveResertToken(resetToken, resetTokenExpiration, email);
    await sendPassowordResertEmail(
      email,
      `${process.env.CLIENT_URL}/auth/reset-password/${resetToken}`,
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
    const { newPassword } = req.body;
    const { resertToken } = req.params;
    await changePassword(newPassword, resertToken);

    const { userEmail } = await getUserEmail(resertToken);

    await sendPassowordResertSuccessEmail(userEmail);
    res.status(201).json({ success: true, message: "Changed user password." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to reset user password." + error,
    });
  }
};
export const signInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userId = await signIn(email, password);
    await generateToken(res, userId);
    res
      .status(200)
      .json({ success: true, message: "Successfully logged in user." });
  } catch (error: any) {
    console.error(`Failed to log-in user ${error?.message}`);
    res.status(500).json({ success: false, message: "Failed to log in user." });
  }
};
export const signOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res
      .status(200)
      .json({ success: true, message: "Successfully logged out user." });
  } catch (error) {
    console.error(`Failed to logout user ${error}`);
    res
      .status(500)
      .json({ success: false, message: "Failed to log out user." });
  }
};
