import { Request, Response } from "express";
export const logOut = (req: Request, res: Response) => {
  req.logOut((err) => {
    console.log("Loging out");
    if (!err) {
      res.redirect("/login");
    }
  });
};
