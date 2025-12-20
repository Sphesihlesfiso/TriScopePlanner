import { Request, Response } from "express";
import { dataBase } from "../../config/db";
import bcrypt from "bcrypt";

import passport from "config/passport"
export const loginUser = async (req: Request, res: Response) => {
  passport.authenticate("local", {
    successRedirect: "/googlecalender/task/:id",
    failureRedirect: "/login",
  });
};
