import { Request, Response } from "express";
import { register } from "@services/auth.service";
// import { authenticate } from "middleware/passport.middleware";
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;
    await register(email, password, username);

    res
      .status(201)
      .json({ success: true, message: "Successfully registered user." });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to register user." });
  }
};
export const signInUser = async (req: Request, res: Response) => {
  try {
    // authenticate;

    // loginUser;
    console.log("Session after login:", req.session);
    res
      .status(200)
      .json({ success: true, message: "Successfully loged-in user." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to log-in user." });
  }
};
export const signOut = async (req: Request, res: Response) => {
  try {
    // logoutUser;
    console.log("Loged out user");
    res
      .status(200)
      .json({ success: true, message: "Successfully logedout user." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: true, message: "Successfully loged-in user." });
  }
};
