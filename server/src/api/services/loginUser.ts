import { Request, Response } from "express";

import passport from "../../config/passport";

import { NextFunction } from "express";

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (err: any, user: any, info: any) => {
    console.log("Inside login");
    if (err) {
      return next(err); // Pass errors to Express error handler
    }
    if (!user) {
      return res.status(401).json({ message: info?.message || "Login failed" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.json({ message: "Login successful", user });
    });
  })(req, res, next);
};

passport.serializeUser((user: any, cb) => {
  cb(null, user); // or user._id
});

passport.deserializeUser((user: any, cb) => {
  cb(null, user);
});
