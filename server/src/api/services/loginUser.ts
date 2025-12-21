import { Request, Response } from "express";



import passport from "config/passport"
export const loginUser = async (req: Request, res: Response) => {
  passport.authenticate("local", {
    successRedirect: "/googlecalender/task/:id",
    failureRedirect: "/login",
  });
};
passport.serializeUser((user,cb)=>{
    cb(null,user)
})
passport.deserializeUser((user :any,cb)=>{
    cb(null,user)
})
